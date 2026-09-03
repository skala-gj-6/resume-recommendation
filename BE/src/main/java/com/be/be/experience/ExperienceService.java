package com.be.be.experience;

import com.be.be.common.ApiException;
import com.be.be.common.PageResponse;
import com.be.be.experience.ExperienceDtos.CreatedResponse;
import com.be.be.experience.ExperienceDtos.DetailResponse;
import com.be.be.experience.ExperienceDtos.ListItemResponse;
import com.be.be.experience.ExperienceDtos.SaveRequest;
import com.be.be.experience.ExperienceDtos.StructureResponse;
import com.be.be.experience.ExperienceDtos.UpdateRequest;
import com.be.be.user.DemoUserService;
import com.be.be.user.UserAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository repository;
    private final DemoUserService demoUserService;
    private final ExperienceStructurer structurer;

    public ExperienceService(
            ExperienceRepository repository,
            DemoUserService demoUserService,
            ExperienceStructurer structurer
    ) {
        this.repository = repository;
        this.demoUserService = demoUserService;
        this.structurer = structurer;
    }

    public StructureResponse structure(String originalText) {
        return structurer.structure(originalText);
    }

    @Transactional
    public CreatedResponse create(SaveRequest request) {
        UserAccount user = demoUserService.currentUser();
        Experience experience = new Experience(
                user, request.title(), request.originalText(), request.situation(), request.task(), request.action(),
                request.result(), request.quantitativeResult(), request.learning(), request.startDate(), request.endDate()
        );
        experience.replaceKeywords(request.keywords().stream().map(ExperienceDtos.KeywordRequest::toValue).toList());
        repository.save(experience);
        return new CreatedResponse(experience.getId(), experience.getCreatedAt());
    }

    @Transactional(readOnly = true)
    public PageResponse<ListItemResponse> list(int page, int size) {
        Long userId = demoUserService.currentUser().getId();
        Page<ListItemResponse> result = repository.findAllByUserId(
                        userId,
                        PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"))
                )
                .map(ListItemResponse::from);
        return PageResponse.from(result);
    }

    @Transactional(readOnly = true)
    public DetailResponse get(Long id) {
        return DetailResponse.from(owned(id));
    }

    @Transactional
    public DetailResponse update(Long id, UpdateRequest request) {
        Experience experience = owned(id);
        experience.update(
                value(request.title(), experience.getTitle()),
                request.originalText() == null ? experience.getOriginalText() : request.originalText(),
                value(request.situation(), experience.getSituation()),
                value(request.task(), experience.getTask()),
                value(request.action(), experience.getAction()),
                value(request.result(), experience.getResult()),
                request.quantitativeResult() == null ? experience.getQuantitativeResult() : request.quantitativeResult(),
                request.learning() == null ? experience.getLearning() : request.learning(),
                request.startDate() == null ? experience.getStartDate() : request.startDate(),
                request.endDate() == null ? experience.getEndDate() : request.endDate()
        );
        if (request.keywords() != null) {
            experience.replaceKeywords(request.keywords().stream().map(ExperienceDtos.KeywordRequest::toValue).toList());
        }
        return DetailResponse.from(experience);
    }

    @Transactional(readOnly = true)
    public List<Experience> allOwned() {
        return repository.findAllByUserIdOrderByUpdatedAtDesc(demoUserService.currentUser().getId());
    }

    private Experience owned(Long id) {
        Long userId = demoUserService.currentUser().getId();
        return repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "EXPERIENCE_NOT_FOUND", "경험을 찾을 수 없습니다."));
    }

    private static String value(String requested, String current) {
        return requested == null ? current : requested;
    }
}
