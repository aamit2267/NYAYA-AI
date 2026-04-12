package com.nyaya.backend.controller;

import com.nyaya.backend.dto.ApiResponse;
import com.nyaya.backend.service.IngestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin Ingestion", description = "Endpoints to populate the Nyaya-AI Vector Knowledge Base")
public class AdminController {

    private final IngestionService ingestionService;

    public AdminController(IngestionService ingestionService) {
        this.ingestionService = ingestionService;
    }

    @PostMapping(value = "/ingest/pdf", consumes = {"multipart/form-data"})
    @Operation(summary = "Ingest a PDF file")
    public ResponseEntity<ApiResponse> ingestPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "source", required = false) String sourceName) throws IOException {
        
        String finalName = (sourceName != null) ? sourceName : file.getOriginalFilename();
        ingestionService.ingestPdf(file.getInputStream(), finalName);
        
        
        return ResponseEntity.accepted().body(
            new ApiResponse("processing", "PDF uploaded successfully. Vectorization is running.")
        );
    }

    @PostMapping(
        value = "/ingest/text", 
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    @Operation(summary = "Ingest raw legal text")
    public ResponseEntity<ApiResponse> ingestText(@RequestBody java.util.Map<String, String> request) {
        String content = request.get("content");
        String source = request.getOrDefault("source", "Manual Entry");
        
        ingestionService.ingestText(content, source);
        
        
        return ResponseEntity.ok(
            new ApiResponse("success", "Text successfully vectorized and stored.")
        );
    }
}