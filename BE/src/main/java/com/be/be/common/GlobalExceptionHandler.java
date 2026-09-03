package com.be.be.common;

import com.be.be.recruitment.exception.PostingNotFoundException;
import com.be.be.recruitment.exception.RecruitmentProviderInvalidResponseException;
import com.be.be.recruitment.exception.RecruitmentProviderUnavailableException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.UUID;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    ResponseEntity<ApiErrorResponse> handleApiException(ApiException exception) {
        return response(exception.getStatus(), exception.getCode(), exception.getMessage());
    }

    @ExceptionHandler(PostingNotFoundException.class)
    ResponseEntity<ApiErrorResponse> handlePostingNotFound(PostingNotFoundException exception) {
        return response(HttpStatus.NOT_FOUND, "POSTING_NOT_FOUND", exception.getMessage());
    }

    @ExceptionHandler(RecruitmentProviderUnavailableException.class)
    ResponseEntity<ApiErrorResponse> handleProviderUnavailable(RecruitmentProviderUnavailableException exception) {
        return response(HttpStatus.BAD_GATEWAY, "RECRUITMENT_PROVIDER_UNAVAILABLE", "채용 정보 제공자를 사용할 수 없습니다.");
    }

    @ExceptionHandler(RecruitmentProviderInvalidResponseException.class)
    ResponseEntity<ApiErrorResponse> handleProviderInvalid(RecruitmentProviderInvalidResponseException exception) {
        return response(HttpStatus.BAD_GATEWAY, "RECRUITMENT_PROVIDER_INVALID_RESPONSE", "채용 정보 제공자의 응답 형식이 올바르지 않습니다.");
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    ResponseEntity<ApiErrorResponse> handleValidation(Exception exception) {
        String message = exception instanceof MethodArgumentNotValidException validation
                ? validation.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(error -> error.getField() + " " + error.getDefaultMessage())
                .orElse("요청값이 올바르지 않습니다.")
                : exception.getMessage();
        return response(HttpStatus.UNPROCESSABLE_ENTITY, "VALIDATION_FAILED", message);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    ResponseEntity<ApiErrorResponse> handleUnreadable(HttpMessageNotReadableException exception) {
        return response(HttpStatus.BAD_REQUEST, "INVALID_REQUEST_BODY", "요청 본문을 읽을 수 없습니다.");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<ApiErrorResponse> handleIllegalArgument(IllegalArgumentException exception) {
        return response(HttpStatus.UNPROCESSABLE_ENTITY, "VALIDATION_FAILED", exception.getMessage());
    }

    private static ResponseEntity<ApiErrorResponse> response(HttpStatus status, String code, String message) {
        String traceId = UUID.randomUUID().toString().substring(0, 8);
        return ResponseEntity.status(status).body(new ApiErrorResponse(status.value(), code, message, traceId));
    }
}
