package com.nyaya.backend.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class GuardrailService {
    private static final List<String> HIGH_RISK_KEYWORDS = List.of(
            "suicide", "kill myself", "end my life", "die", "self harm",
            "khudkushi", "jaan de dunga", "marne ka", "mar jana", "suicide karna"
    );

    private static final String EMERGENCY_RESPONSE = 
            "I am an AI, but I am hearing that you are in a lot of pain right now. " +
                "Please know that you are not alone and help is available immediately. " +
                "Please call the National Mental Health Helpline (Tele MANAS) at 1800-891-4416, " +
                "or at 14416. Stay calm, and please reach out to a professional or a loved one.";

    public String checkAndIntercept(String query) {
        if (query == null) return null;
        
        String normalizedQuery = query.toLowerCase();
        
        for (String keyword : HIGH_RISK_KEYWORDS) {
            if (normalizedQuery.contains(keyword)) {
                return EMERGENCY_RESPONSE;
            }
        }
        
        return null;
    }
}