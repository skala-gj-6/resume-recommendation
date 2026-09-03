package com.be.be.recommendation;

import com.be.be.recommendation.RecommendationDtos.ItemDetailResponse;
import com.be.be.recommendation.RecommendationDtos.RunResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/recommendations")
public class RecommendationController {

    private final RecommendationService service;

    public RecommendationController(RecommendationService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RunResponse generate() {
        return service.generate();
    }

    @GetMapping("/latest")
    public RunResponse latest() {
        return service.latest();
    }

    @GetMapping("/runs/{runId}")
    public RunResponse getRun(@PathVariable Long runId) {
        return service.getRun(runId);
    }

    @GetMapping("/items/{itemId}")
    public ItemDetailResponse getItem(@PathVariable Long itemId) {
        return service.getItem(itemId);
    }
}
