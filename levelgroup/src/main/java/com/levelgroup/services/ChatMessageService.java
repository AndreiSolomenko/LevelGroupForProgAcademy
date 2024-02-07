package com.levelgroup.services;

import com.levelgroup.model.ChatMessage;
import com.levelgroup.repo.ChatMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    @Transactional
    public void add(ChatMessage chatMessage) {
        chatMessageRepository.save(chatMessage);
    }

    @Transactional(readOnly = true)
    public ArrayList<ChatMessage> get() {

        var messages = chatMessageRepository.findAll();
        var result = new ArrayList<ChatMessage>();

        messages.forEach(message -> result.add(message));
        return result;

    }

    @Transactional
    public void cleanupOldMessages() {
        LocalDate today = LocalDate.now();
        chatMessageRepository.deleteByMessageDateBefore(today.atStartOfDay());
    }
}