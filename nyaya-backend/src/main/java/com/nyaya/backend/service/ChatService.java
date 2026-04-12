package com.nyaya.backend.service;

import com.nyaya.backend.agent.LegalAssistant;
import com.nyaya.backend.cache.ResponseCacheService;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.chat.StreamingChatLanguageModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.rag.content.retriever.EmbeddingStoreContentRetriever;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.service.TokenStream;
import dev.langchain4j.store.embedding.EmbeddingStore;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Slf4j
@Service
public class ChatService {

    private final StreamingChatLanguageModel streamingChatModel;
    private final EmbeddingModel embeddingModel;
    private final EmbeddingStore<TextSegment> embeddingStore;
    private final ResponseCacheService cacheService;
    private final GuardrailService guardrailService;
    
    private LegalAssistant legalAssistant;

    public ChatService(StreamingChatLanguageModel streamingChatModel,
                       EmbeddingModel embeddingModel,
                       EmbeddingStore<TextSegment> embeddingStore,
                       ResponseCacheService cacheService,
                       GuardrailService guardrailService) {
        this.streamingChatModel = streamingChatModel;
        this.embeddingModel = embeddingModel;
        this.embeddingStore = embeddingStore;
        this.cacheService = cacheService;
        this.guardrailService = guardrailService;
    }

    @PostConstruct
    public void init() {
        ContentRetriever contentRetriever = EmbeddingStoreContentRetriever.builder()
                .embeddingStore(embeddingStore)
                .embeddingModel(embeddingModel)
                .maxResults(3)
                .build();

        this.legalAssistant = AiServices.builder(LegalAssistant.class)
                .streamingChatLanguageModel(streamingChatModel)
                .contentRetriever(contentRetriever)
                .chatMemory(MessageWindowChatMemory.withMaxMessages(10))
                .build();
    }

    public SseEmitter streamAnswer(String question) {
        SseEmitter emitter = new SseEmitter(120000L);
        
        String guardrailInterception = guardrailService.checkAndIntercept(question);
        if (guardrailInterception != null) {
            log.warn("Guardrail triggered for query. Short-circuiting to emergency response.");
            streamStaticString(emitter, guardrailInterception);
            return emitter;
        }

        String cachedResponse = cacheService.getCachedResponse(question);
        if (cachedResponse != null) {
            log.info("Cache hit for query. Streaming cached response.");
            streamStaticString(emitter, cachedResponse);
            return emitter;
        }

        log.info("Processing query via LLM RAG pipeline.");
        TokenStream stream = legalAssistant.chatStream(question);
        StringBuilder fullResponse = new StringBuilder();

        stream.onNext(token -> {
            try {
                fullResponse.append(token);
                emitter.send(token); 
            } catch (IOException e) {
                log.error("Error streaming token to client", e);
                emitter.completeWithError(e);
            }
        })
        .onComplete(response -> {
            cacheService.saveToCache(question, fullResponse.toString());
            emitter.complete();
        })
        .onError(error -> {
            log.error("LLM Generation failed", error);
            emitter.completeWithError(error);
        })
        .start();

        return emitter;
    }

    private void streamStaticString(SseEmitter emitter, String text) {
        new Thread(() -> {
            try {
                String[] words = text.split(" ");
                for (String word : words) {
                    emitter.send(word + " ");
                    Thread.sleep(50);
                }
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        }).start();
    }
}