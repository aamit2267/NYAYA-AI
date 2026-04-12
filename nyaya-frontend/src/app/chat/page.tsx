"use client";
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Trash2, ShieldAlert, Bot, User, Loader2, Scale } from 'lucide-react';
import { useSettingsViewModel } from '@/app/viewmodels/useSettingsViewModel';
import { useChatViewModel } from '@/app/viewmodels/useChatViewModel';

const dict = {
  en: {
    title: "Nyaya AI Consultation",
    disclaimer: "AI is not a lawyer. Verify critical information.",
    placeholder: "Describe your legal issue (e.g., 'What are my rights if my landlord...')...",
    send: "Send",
    clear: "Clear Chat",
    emptyTitle: "How can I assist you with Indian Law today?",
    emptySub: "Ask about property, consumer rights, or legal procedures.",
    errorStr: "Connection Error. Please try again."
  },
  hi: {
    title: "न्याय एआई परामर्श",
    disclaimer: "एआई वकील नहीं है। महत्वपूर्ण जानकारी सत्यापित करें।",
    placeholder: "अपनी कानूनी समस्या का वर्णन करें...",
    send: "भेजें",
    clear: "चैट साफ़ करें",
    emptyTitle: "आज मैं भारतीय कानून के संबंध में आपकी कैसे सहायता कर सकता हूँ?",
    emptySub: "संपत्ति, उपभोक्ता अधिकारों या कानूनी प्रक्रियाओं के बारे में पूछें।",
    errorStr: "कनेक्शन त्रुटि। कृपया पुनः प्रयास करें।"
  }
};

export default function ChatPage() {
  const { language } = useSettingsViewModel();
  const t = dict[language];
  const { messages, input, setInput, sendMessage, isLoading, error, clearChat } = useChatViewModel();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-screen bg-background text-foreground overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="flex-none flex justify-between items-center p-4 border-b border-border bg-card shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-accent rounded-full transition-colors text-foreground/70 hover:text-primary">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-bold font-heading text-lg flex items-center gap-2">
              <Bot size={20} className="text-primary" /> {t.title}
            </h1>
            <p className="text-xs text-foreground/50 flex items-center gap-1 font-medium">
              <ShieldAlert size={12} className="text-destructive" /> {t.disclaimer}
            </p>
          </div>
        </div>
        
        {messages.length > 0 && (
          <button onClick={clearChat} className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-destructive/20">
            <Trash2 size={16} /> <span className="hidden sm:inline">{t.clear}</span>
          </button>
        )}
      </header>

      {/* --- CHAT HISTORY AREA --- */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 [scrollbar-width:thin]">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full mt-20 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Scale size={40} />
              </div>
              <h2 className="text-2xl font-bold font-heading mb-2">{t.emptyTitle}</h2>
              <p className="text-foreground/60 max-w-md">{t.emptySub}</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-4 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`flex-none w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'}`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-secondary text-secondary-foreground rounded-tr-sm' : 'bg-card border border-border text-foreground rounded-tl-sm shadow-sm'}`}>
                    {/* CSS FIX APPLIED HERE */}
                    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap break-words [word-break:break-word] overflow-x-hidden">
                      {msg.content}
                      {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />}
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
          
          {/* Error State */}
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl text-center font-bold text-sm max-w-md mx-auto">
              {error}
            </div>
          )}
          
          <div ref={messagesEndRef} className="h-4" /> {/* Auto-scroll anchor */}
        </div>
      </main>

      {/* --- INPUT AREA --- */}
      <footer className="flex-none p-4 sm:p-6 bg-background border-t border-border z-10">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto relative flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={t.placeholder}
            className="w-full max-h-32 min-h-[56px] bg-card border border-border rounded-xl pl-4 pr-16 py-4 focus:outline-none focus:ring-2 focus:ring-primary resize-none [scrollbar-width:none]"
            rows={1}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 p-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title={t.send}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
        <p className="text-center text-xs text-foreground/40 mt-3 font-medium">
          Nyaya-AI can make mistakes. Consider verifying legal facts.
        </p>
      </footer>
    </div>
  );
}