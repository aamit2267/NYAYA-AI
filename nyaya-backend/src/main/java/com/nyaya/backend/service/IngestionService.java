package com.nyaya.backend.service;

import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.DocumentParser;
import dev.langchain4j.data.document.parser.apache.pdfbox.ApachePdfBoxDocumentParser;
import dev.langchain4j.data.document.splitter.DocumentSplitters;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import dev.langchain4j.data.segment.TextSegment;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.io.InputStream;

@Slf4j
@Service
public class IngestionService {

    private final EmbeddingStore<TextSegment> embeddingStore;
    private final EmbeddingModel embeddingModel;

    public IngestionService(EmbeddingStore<TextSegment> embeddingStore, EmbeddingModel embeddingModel) {
        this.embeddingStore = embeddingStore;
        this.embeddingModel = embeddingModel;
    }

    public void ingestText(String content, String sourceName) {
        Document document = Document.from(content);
        document.metadata().put("source", sourceName);
        processDocument(document, sourceName);
    }
    
    @Async
    public void ingestPdf(InputStream pdfStream, String sourceName) {
        DocumentParser parser = new ApachePdfBoxDocumentParser();
        Document document = parser.parse(pdfStream);
        document.metadata().put("source", sourceName);
        processDocument(document, sourceName);
    }

    @Transactional(rollbackFor = Exception.class)
    private void processDocument(Document document, String documentName) {
        log.info("Starting ingestion process for document: {}", documentName);
        EmbeddingStoreIngestor ingestor;
        try {
            ingestor = EmbeddingStoreIngestor.builder()
                    .documentSplitter(DocumentSplitters.recursive(500, 50))
                    .embeddingModel(embeddingModel)
                    .embeddingStore(embeddingStore)
                    .build();
            ingestor.ingest(document);
            log.info("Successfully vectorized and stored document: {}", documentName);
        } catch (Exception e) {
            log.error("Failed to ingest document: {}. Reason: {}", documentName, e.getMessage(), e);
            throw e;
        }
    }
}