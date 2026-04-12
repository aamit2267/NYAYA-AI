"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, FileText, Upload, ArrowLeft, CheckCircle2, AlertCircle, Loader2, AlertOctagon, Info } from 'lucide-react';
import { useSettingsViewModel } from '@/app/viewmodels/useSettingsViewModel';
import { useAdminViewModel } from '@/app/viewmodels/useAdminViewModel';

const dict = {
  en: {
    title: "Admin Knowledge Base",
    desc: "Securely ingest Indian legal acts, gazettes, and documents into the Vector DB.",
    apiKey: "Admin API Key",
    sourceName: "Document Source / Name (Optional)",
    rawText: "Raw Text Entry",
    pdfUpload: "PDF Upload",
    textContent: "Paste Legal Content Here...",
    selectPdf: "Select PDF File",
    processBtn: "Process & Ingest Document",
    processing: "Vectorizing...",
    back: "Back to Dashboard",
    // NEW: Modal Translations
    warnTitle: "SECURITY VIOLATION DETECTED",
    warnDesc: "Your attempt to access the Nyaya-AI core database with an invalid cryptographic key has been flagged. Unauthorized manipulation of legal vectors is a strict violation of system protocols.",
    warnBtn: "I Understand",
    reliefTitle: "System Notice",
    reliefDesc: "Relax. No punitive action or IP logging has been executed against you. This is a standard security perimeter check. Please ensure you are an authorized administrator and verify your credentials before proceeding.",
    reliefBtn: "Dismiss & Try Again"
  },
  hi: {
    title: "व्यवस्थापक ज्ञानकोश",
    desc: "वेक्टर डीबी में भारतीय कानूनी कृत्यों और दस्तावेजों को सुरक्षित रूप से इंजेस्ट करें।",
    apiKey: "एडमिन एपीआई कुंजी",
    sourceName: "दस्तावेज़ स्रोत / नाम (वैकल्पिक)",
    rawText: "मूल पाठ प्रविष्टि",
    pdfUpload: "पीडीएफ अपलोड",
    textContent: "कानूनी सामग्री यहाँ चिपकाएँ...",
    selectPdf: "पीडीएफ फ़ाइल चुनें",
    processBtn: "दस्तावेज़ को प्रोसेस करें",
    processing: "वेक्टराइजिंग...",
    back: "डैशबोर्ड पर वापस जाएं",
    // NEW: Modal Translations Hindi
    warnTitle: "सुरक्षा उल्लंघन का पता चला",
    warnDesc: "अमान्य क्रिप्टोग्राफ़िक कुंजी के साथ न्याय-एआई कोर डेटाबेस तक पहुंचने के आपके प्रयास को फ़्लैग किया गया है। कानूनी डेटा का अनधिकृत हेरफेर सिस्टम प्रोटोकॉल का सख्त उल्लंघन है।",
    warnBtn: "मैं समझता हूँ",
    reliefTitle: "सिस्टम सूचना",
    reliefDesc: "आराम करें। आपके खिलाफ कोई दंडात्मक कार्रवाई या आईपी लॉगिंग निष्पादित नहीं की गई है। यह एक मानक सुरक्षा जांच है। कृपया सुनिश्चित करें कि आप एक अधिकृत व्यवस्थापक हैं और आगे बढ़ने से पहले अपनी साख सत्यापित करें।",
    reliefBtn: "खारिज करें और पुनः प्रयास करें"
  }
};

export default function AdminPage() {
  const { language } = useSettingsViewModel();
  const t = dict[language];
  const { 
    apiKey, handleApiKeyChange, submitText, submitPdf, loading, status,
    showWarningModal, showReliefModal, acknowledgeWarning, dismissRelief 
  } = useAdminViewModel();

  const [activeTab, setActiveTab] = useState<'text' | 'pdf'>('text');
  const [source, setSource] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'text') submitText(content, source);
    else submitPdf(file, source);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center justify-center">
      
      {/* 🛑 MODAL 1: The Scary Warning 🛑 */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md px-4 animate-in fade-in">
          <div className="bg-destructive border-2 border-red-900 p-8 rounded-2xl max-w-lg shadow-[0_0_50px_rgba(220,38,38,0.5)] animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4 text-white">
              <AlertOctagon size={40} className="animate-pulse" />
              <h2 className="text-2xl font-bold font-heading tracking-widest uppercase">{t.warnTitle}</h2>
            </div>
            <p className="text-white/90 mb-8 leading-relaxed font-mono text-sm">
              {t.warnDesc}
            </p>
            <button 
              onClick={acknowledgeWarning}
              className="w-full py-4 bg-white text-destructive rounded-xl font-bold hover:bg-gray-100 transition-colors uppercase tracking-widest"
            >
              {t.warnBtn}
            </button>
          </div>
        </div>
      )}

      {/* 🟢 MODAL 2: The Relief 🟢 */}
      {showReliefModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm px-4 animate-in fade-in">
          <div className="bg-card border border-border p-8 rounded-2xl max-w-lg shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Info size={32} />
              <h2 className="text-2xl font-bold font-heading">{t.reliefTitle}</h2>
            </div>
            <p className="text-foreground/80 mb-8 leading-relaxed">
              {t.reliefDesc}
            </p>
            <button 
              onClick={dismissRelief}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              {t.reliefBtn}
            </button>
          </div>
        </div>
      )}

      {/* --- Existing Admin UI Below --- */}
      <div className="w-full max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:opacity-80 font-bold mb-8 transition-opacity">
          <ArrowLeft size={20} /> {t.back}
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert size={32} className="text-primary" />
            <h1 className="text-4xl font-bold font-heading">{t.title}</h1>
          </div>
          <p className="text-foreground/60">{t.desc}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-border bg-background/50">
            <button onClick={() => setActiveTab('text')} className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold transition-colors ${activeTab === 'text' ? 'border-b-2 border-primary text-primary' : 'text-foreground/50 hover:text-foreground'}`}>
              <FileText size={18} /> {t.rawText}
            </button>
            <button onClick={() => setActiveTab('pdf')} className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold transition-colors ${activeTab === 'pdf' ? 'border-b-2 border-primary text-primary' : 'text-foreground/50 hover:text-foreground'}`}>
              <Upload size={18} /> {t.pdfUpload}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/70">{t.apiKey} *</label>
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                  placeholder="nyaya_super_secret..."
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/70">{t.sourceName}</label>
                <input 
                  type="text" 
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {activeTab === 'text' ? (
              <div className="space-y-2 animate-in fade-in">
                <label className="text-sm font-bold text-foreground/70">{t.textContent} *</label>
                <textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none" required={activeTab === 'text'} />
              </div>
            ) : (
              <div className="space-y-2 animate-in fade-in">
                <label className="text-sm font-bold text-foreground/70">{t.selectPdf} *</label>
                <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full bg-background border border-border rounded-lg px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary cursor-pointer" required={activeTab === 'pdf'} />
              </div>
            )}

            {status.type === 'success' && (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-success/10 text-success border border-success/20 font-bold">
                <CheckCircle2 size={20} /> {status.message}
              </div>
            )}
            {status.type === 'error' && !showWarningModal && (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 font-bold">
                <AlertCircle size={20} /> {status.message}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full py-4 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 disabled:opacity-50">
              {loading ? <Loader2 size={20} className="animate-spin" /> : <ShieldAlert size={20} />}
              {loading ? t.processing : t.processBtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}