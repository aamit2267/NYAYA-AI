package com.nyaya.backend.config;

import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.chat.StreamingChatLanguageModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.ollama.OllamaChatModel;
import dev.langchain4j.model.ollama.OllamaEmbeddingModel;
import dev.langchain4j.model.ollama.OllamaStreamingChatModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.pgvector.PgVectorEmbeddingStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class AiConfig {
    @Value("${nyaya.ai.ollama.base-url}") String ollamaBaseUrl;
    @Value("${nyaya.ai.ollama.chat-model}") String chatModelName;
    @Value("${nyaya.ai.ollama.embedding-model}") String embeddingModelName;
    
    @Value("${spring.datasource.url}") String dbUrl;
    @Value("${spring.datasource.username}") String dbUser;
    @Value("${spring.datasource.password}") String dbPassword;
    @Value("${HOST_DB_PORT:5432}") Integer dbPort;
    @Value("${POSTGRES_DB:nyaya_db}") String dbName;

    @Bean
    public ChatLanguageModel chatLanguageModel() {
        return OllamaChatModel.builder()
                .baseUrl(ollamaBaseUrl)
                .modelName(chatModelName)
                .timeout(Duration.ofMinutes(2)) // Give local LLM time to think
                .build();
    }

    @Bean
    public EmbeddingModel embeddingModel() {
        return OllamaEmbeddingModel.builder()
                .baseUrl(ollamaBaseUrl)
                .modelName(embeddingModelName)
                .build();
    }

    @Bean
    public EmbeddingStore<TextSegment> embeddingStore() {
        return PgVectorEmbeddingStore.builder()
                .host("localhost")
                .port(dbPort)
                .database(dbName)
                .user(dbUser)
                .password(dbPassword)
                .table("legal_documents")
                .dimension(768)
                .build();
    }

    @Bean
    public StreamingChatLanguageModel streamingChatLanguageModel() {
        return OllamaStreamingChatModel.builder()
                .baseUrl(ollamaBaseUrl)
                .modelName(chatModelName)
                .timeout(Duration.ofMinutes(2))
                .build();
    }
}