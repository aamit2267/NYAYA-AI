package com.nyaya.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ApiResponse(
    @JsonProperty("status") String status, 
    @JsonProperty("message") String message, 
    @JsonProperty("details") String details
) {
    public ApiResponse(String status, String message) {
        this(status, message, null);
    }
}