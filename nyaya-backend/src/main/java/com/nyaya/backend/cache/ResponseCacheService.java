package com.nyaya.backend.cache;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class ResponseCacheService {
    private final Map<String, String> cache = new ConcurrentHashMap<>();

    public String getCachedResponse(String question) {
        String normalized = question.toLowerCase().trim().replaceAll("\\s+", " ");
        return cache.get(normalized);
    }

    public void saveToCache(String question, String response) {
        String normalized = question.toLowerCase().trim().replaceAll("\\s+", " ");
        cache.put(normalized, response);
    }
}