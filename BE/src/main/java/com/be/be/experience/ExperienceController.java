package com.be.be.experience;

import com.be.be.common.PageResponse;
import com.be.be.experience.ExperienceDtos.CreatedResponse;
import com.be.be.experience.ExperienceDtos.DetailResponse;
import com.be.be.experience.ExperienceDtos.ListItemResponse;
import com.be.be.experience.ExperienceDtos.SaveRequest;
import com.be.be.experience.ExperienceDtos.StructureRequest;
import com.be.be.experience.ExperienceDtos.StructureResponse;
import com.be.be.experience.ExperienceDtos.UpdateRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/experiences")
public class ExperienceController {

    private final ExperienceService service;

    public ExperienceController(ExperienceService service) {
        this.service = service;
    }

    @PostMapping("/structure")
    public StructureResponse structure(@Valid @RequestBody StructureRequest request) {
        return service.structure(request.originalText());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CreatedResponse create(@Valid @RequestBody SaveRequest request) {
        return service.create(request);
    }

    @GetMapping
    public PageResponse<ListItemResponse> list(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size
    ) {
        return service.list(page, size);
    }

    @GetMapping("/{experienceId}")
    public DetailResponse get(@PathVariable Long experienceId) {
        return service.get(experienceId);
    }

    @PatchMapping("/{experienceId}")
    public DetailResponse update(
            @PathVariable Long experienceId,
            @Valid @RequestBody UpdateRequest request
    ) {
        return service.update(experienceId, request);
    }
}
