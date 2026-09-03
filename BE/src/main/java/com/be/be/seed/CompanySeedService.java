package com.be.be.seed;

import com.be.be.company.Company;
import com.be.be.company.CompanyInfo;
import com.be.be.company.CompanyInfoRepository;
import com.be.be.company.CompanyInfoType;
import com.be.be.company.CompanyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CompanySeedService {

    private static final Logger log = LoggerFactory.getLogger(CompanySeedService.class);
    private static final DateTimeFormatter COLLECTED_AT_FORMAT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final ObjectMapper objectMapper;
    private final CompanyRepository companyRepository;
    private final CompanyInfoRepository companyInfoRepository;
    private final Resource companiesResource;
    private final Resource companyInfosResource;

    public CompanySeedService(
            ObjectMapper objectMapper,
            CompanyRepository companyRepository,
            CompanyInfoRepository companyInfoRepository,
            @Value("${app.company-seed.companies}") Resource companiesResource,
            @Value("${app.company-seed.company-infos}") Resource companyInfosResource
    ) {
        this.objectMapper = objectMapper;
        this.companyRepository = companyRepository;
        this.companyInfoRepository = companyInfoRepository;
        this.companiesResource = companiesResource;
        this.companyInfosResource = companyInfosResource;
    }

    @Transactional
    public SeedResult seed() {
        List<CompanySeed> companySeeds = readArray(companiesResource, CompanySeed[].class);
        List<CompanyInfoSeed> companyInfoSeeds = readArray(companyInfosResource, CompanyInfoSeed[].class);
        validateSeeds(companySeeds, companyInfoSeeds);

        Map<String, Company> existingCompanies = companyRepository.findAll().stream()
                .collect(Collectors.toMap(Company::getExternalCompanyId, Function.identity()));
        Map<Long, Company> companiesBySeedId = new HashMap<>();
        int companiesCreated = 0;

        for (CompanySeed seed : companySeeds) {
            Company company = existingCompanies.get(seed.external_company_id());
            if (company == null) {
                company = new Company(seed.company_name(), seed.external_company_id());
                companiesCreated++;
            } else {
                company.rename(seed.company_name());
            }
            companiesBySeedId.put(seed.company_id(), companyRepository.save(company));
        }
        companyRepository.flush();

        Map<CompanyInfoNaturalKey, CompanyInfo> existingInfos = new LinkedHashMap<>();
        for (CompanyInfo info : companyInfoRepository.findAll()) {
            existingInfos.putIfAbsent(CompanyInfoNaturalKey.from(info), info);
        }

        int companyInfosCreated = 0;
        for (CompanyInfoSeed seed : companyInfoSeeds) {
            Company company = companiesBySeedId.get(seed.company_id());
            CompanyInfoType infoType = parseInfoType(seed.info_type());
            LocalDate referenceDate = parseDate(seed.reference_date());
            String sourceUrl = normalize(seed.source_url());
            CompanyInfoNaturalKey key = new CompanyInfoNaturalKey(
                    company.getExternalCompanyId(),
                    infoType,
                    requireText(seed.title(), "title"),
                    sourceUrl,
                    referenceDate
            );

            CompanyInfo info = existingInfos.get(key);
            LocalDateTime collectedAt = parseCollectedAt(seed.collected_at());
            if (info == null) {
                info = new CompanyInfo(
                        company,
                        infoType,
                        seed.title(),
                        seed.content(),
                        sourceUrl,
                        referenceDate,
                        collectedAt
                );
                existingInfos.put(key, info);
                companyInfosCreated++;
            } else {
                info.updateContent(seed.content(), collectedAt);
            }
            companyInfoRepository.save(info);
        }

        SeedResult result = new SeedResult(
                companySeeds.size(),
                companiesCreated,
                companyInfoSeeds.size(),
                companyInfosCreated
        );
        log.info(
                "Company seed complete: companies={} (created={}), companyInfos={} (created={})",
                result.companiesProcessed(),
                result.companiesCreated(),
                result.companyInfosProcessed(),
                result.companyInfosCreated()
        );
        return result;
    }

    private <T> List<T> readArray(Resource resource, Class<T[]> arrayType) {
        try (InputStream inputStream = resource.getInputStream()) {
            return Arrays.asList(objectMapper.readValue(inputStream, arrayType));
        } catch (IOException exception) {
            throw new IllegalStateException("Failed to read seed resource: " + resource, exception);
        }
    }

    private static void validateSeeds(List<CompanySeed> companies, List<CompanyInfoSeed> companyInfos) {
        if (companies.isEmpty()) {
            throw new IllegalStateException("Company seed must not be empty");
        }

        Map<Long, CompanySeed> companiesById = new HashMap<>();
        Map<String, CompanySeed> companiesByExternalId = new HashMap<>();
        for (CompanySeed company : companies) {
            requireText(company.company_name(), "company_name");
            String externalId = requireText(company.external_company_id(), "external_company_id");
            if (companiesById.put(company.company_id(), company) != null) {
                throw new IllegalStateException("Duplicate company_id in company seed: " + company.company_id());
            }
            if (companiesByExternalId.put(externalId, company) != null) {
                throw new IllegalStateException("Duplicate external_company_id in company seed: " + externalId);
            }
        }

        for (CompanyInfoSeed companyInfo : companyInfos) {
            if (!companiesById.containsKey(companyInfo.company_id())) {
                throw new IllegalStateException(
                        "Unknown company_id in company info seed: " + companyInfo.company_id()
                );
            }
            parseInfoType(companyInfo.info_type());
            requireText(companyInfo.title(), "title");
            requireText(companyInfo.content(), "content");
            LocalDate referenceDate = parseDate(companyInfo.reference_date());
            if (normalize(companyInfo.source_url()) == null && referenceDate == null) {
                throw new IllegalStateException(
                        "Company info seed requires source_url or reference_date: " + companyInfo.company_info_id()
                );
            }
            parseCollectedAt(companyInfo.collected_at());
        }
    }

    private static CompanyInfoType parseInfoType(String value) {
        try {
            return CompanyInfoType.valueOf(requireText(value, "info_type"));
        } catch (IllegalArgumentException exception) {
            throw new IllegalStateException("Unsupported company info type: " + value, exception);
        }
    }

    private static LocalDate parseDate(String value) {
        String normalized = normalize(value);
        return normalized == null ? null : LocalDate.parse(normalized);
    }

    private static LocalDateTime parseCollectedAt(String value) {
        return LocalDateTime.parse(requireText(value, "collected_at"), COLLECTED_AT_FORMAT);
    }

    private static String requireText(String value, String field) {
        String normalized = normalize(value);
        if (normalized == null) {
            throw new IllegalStateException(field + " must not be blank");
        }
        return normalized;
    }

    private static String normalize(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    private record CompanySeed(long company_id, String company_name, String external_company_id) {
    }

    private record CompanyInfoSeed(
            long company_info_id,
            long company_id,
            String info_type,
            String title,
            String content,
            String source_url,
            String reference_date,
            String collected_at
    ) {
    }

    private record CompanyInfoNaturalKey(
            String externalCompanyId,
            CompanyInfoType infoType,
            String title,
            String sourceUrl,
            LocalDate referenceDate
    ) {
        static CompanyInfoNaturalKey from(CompanyInfo info) {
            return new CompanyInfoNaturalKey(
                    info.getCompany().getExternalCompanyId(),
                    info.getInfoType(),
                    info.getTitle(),
                    info.getSourceUrl(),
                    info.getReferenceDate()
            );
        }
    }

    public record SeedResult(
            int companiesProcessed,
            int companiesCreated,
            int companyInfosProcessed,
            int companyInfosCreated
    ) {
    }
}
