import { useState, useEffect, useRef } from 'react';
import { chatApi } from '@/app/models/api/chatApi';

export type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  isStreaming?: boolean;
};

export function useChatViewModel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CACHING: Load chat history on mount
  useEffect(() => {
    const cachedChat = localStorage.getItem('nyaya_chat_history');
    if (cachedChat) {
      try {
        setMessages(JSON.parse(cachedChat));
      } catch (e) {
        console.error("Failed to parse cached chat history");
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('nyaya_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('nyaya_chat_history');
    setError(null);
  };

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    const aiMessageId = (Date.now() + 1).toString();
    
    setMessages(prev => [...prev, userMessage, { id: aiMessageId, role: 'ai', content: '', isStreaming: true }]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      await chatApi.streamChat(userMessage.content, (chunk) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, content: msg.content + chunk } 
              : msg
          )
        );
      });

      // Mark streaming as complete
      setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, isStreaming: false } : msg));

    } catch (err: any) {
      setError(err.message || "An error occurred while communicating with Nyaya-AI.");
      setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, input, setInput, sendMessage, isLoading, error, clearChat };
}