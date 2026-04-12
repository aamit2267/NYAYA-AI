package com.nyaya.backend.controller;

import com.nyaya.backend.service.IngestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

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
    public ResponseEntity<Map<String, String>> ingestPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "source", required = false) String sourceName) throws IOException {
        
        String finalName = (sourceName != null) ? sourceName : file.getOriginalFilename();
        ingestionService.ingestPdf(file.getInputStream(), finalName);
        
        return ResponseEntity.accepted().body(Map.of(
                "status", "processing", 
                "message", "PDF uploaded successfully. Vectorization is running in the background."
        ));
    }

    @PostMapping("/ingest/text")
    @Operation(summary = "Ingest raw legal text")
    public ResponseEntity<Map<String, String>> ingestText(@RequestBody Map<String, String> request) {
        String content = request.get("content");
        String source = request.getOrDefault("source", "Manual Entry");
        
        ingestionService.ingestText(content, source);
        
        return ResponseEntity.ok(Map.of("status", "Text Ingested successfully"));
    }
}