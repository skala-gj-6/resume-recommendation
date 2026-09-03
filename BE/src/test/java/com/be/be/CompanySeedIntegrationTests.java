package com.be.be;

import com.be.be.company.CompanyInfoRepository;
import com.be.be.company.CompanyRepository;
import com.be.be.seed.CompanySeedService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class CompanySeedIntegrationTests {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyInfoRepository companyInfoRepository;

    @Autowired
    private CompanySeedService companySeedService;

    @Test
    void companySeedIsCompleteAndIdempotent() {
        assertEquals(30, companyRepository.count());
        assertEquals(60, companyInfoRepository.count());

        CompanySeedService.SeedResult firstRepeat = companySeedService.seed();
        CompanySeedService.SeedResult secondRepeat = companySeedService.seed();

        assertEquals(0, firstRepeat.companiesCreated());
        assertEquals(0, firstRepeat.companyInfosCreated());
        assertEquals(0, secondRepeat.companiesCreated());
        assertEquals(0, secondRepeat.companyInfosCreated());
        assertEquals(30, companyRepository.count());
        assertEquals(60, companyInfoRepository.count());
    }
}
