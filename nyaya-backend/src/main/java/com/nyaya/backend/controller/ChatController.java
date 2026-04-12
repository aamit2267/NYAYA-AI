package com.nyaya.backend.controller;

import com.nyaya.backend.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping(produces = "text/event-stream;charset=UTF-8")
    public SseEmitter chat(@RequestBody Map<String, String> request) {
        String userQuestion = request.get("question");
        
        if (userQuestion == null || userQuestion.trim().isEmpty()) {
            log.warn("Received empty chat request.");
            SseEmitter emitter = new SseEmitter();
            emitter.completeWithError(new IllegalArgumentException("Question cannot be empty"));
            return emitter;
        }

        return chatService.streamAnswer(userQuestion);
    }
}