"use client";
import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('nyaya_consent');
    if (!hasConsented) setIsOpen(true);
  }, []);

  const acceptDisclaimer = () => {
    localStorage.setItem('nyaya_consent', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-4">
      <div className="bg-background border border-border p-8 rounded-2xl max-w-lg shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex items-center gap-3 mb-4 text-destructive">
          <AlertTriangle size={32} />
          <h2 className="text-2xl font-bold font-heading">Legal Disclaimer</h2>
        </div>
        <p className="text-foreground/80 mb-6 leading-relaxed">
          Nyaya-AI is an artificial intelligence tool, not a human legal authority or a registered advocate of the Indian Courts. 
          It provides factual information based on Indian laws and defines possibilities for genuine case filings. 
          <br/><br/>
          <strong>It cannot make binding judgements.</strong> For actionable legal representation, we strongly suggest consulting a registered lawyer.
        </p>
        <button 
          onClick={acceptDisclaimer}
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
        >
          I Understand & Agree
        </button>
      </div>
    </div>
  );
}