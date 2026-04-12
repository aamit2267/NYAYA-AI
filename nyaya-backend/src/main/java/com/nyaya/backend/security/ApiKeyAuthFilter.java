package com.nyaya.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.core.annotation.Order;
import org.springframework.core.Ordered;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 1)
public class ApiKeyAuthFilter extends OncePerRequestFilter {

    @Value("${ADMIN_API_KEY:default_secret}")
    private String adminApiKey;

    @Value("${nyaya.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {
        
        
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }
        
        String path = request.getRequestURI();
        
        
        if (path.startsWith("/api/admin")) {
            String providedKey = request.getHeader("X-API-KEY");
            
            
            if (providedKey == null || !providedKey.equals(adminApiKey)) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setHeader("Access-Control-Allow-Origin", frontendUrl);
                response.setHeader("Access-Control-Allow-Credentials", "true");
                response.setContentType("application/json;charset=UTF-8");
                
                
                response.getWriter().write("{\"status\":\"error\",\"message\":\"Unauthorized API Key\"}");
                return; 
            }
        }
        
        
        
        filterChain.doFilter(request, response);
    }
}