package com.be.be.ai;

import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.ai.converter.StructuredOutputConverter;

final class SchemaStructuredOutputConverter<T> implements StructuredOutputConverter<T> {

    private final BeanOutputConverter<T> delegate;
    private final String jsonSchema;

    SchemaStructuredOutputConverter(Class<T> responseType, String jsonSchema) {
        if (responseType == null) {
            throw new IllegalArgumentException("responseType must not be null");
        }
        if (jsonSchema == null || jsonSchema.isBlank()) {
            throw new IllegalArgumentException("jsonSchema must not be blank");
        }
        this.delegate = new BeanOutputConverter<>(responseType);
        this.jsonSchema = jsonSchema.trim();
    }

    @Override
    public T convert(String source) {
        return delegate.convert(source);
    }

    @Override
    public String getFormat() {
        return "Return one JSON object that conforms to this JSON Schema: " + jsonSchema;
    }

    @Override
    public String getJsonSchema() {
        return jsonSchema;
    }
}
