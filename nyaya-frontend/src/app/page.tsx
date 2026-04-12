"use client";
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { Scale, ShieldCheck, MessageSquare, PhoneCall, Globe, Moon, Sun, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { useSettingsViewModel } from '@/app/viewmodels/useSettingsViewModel';
import DisclaimerModal from '@/components/ui/DisclaimerModal';
import Footer from '@/components/layout/Footer';

const dict = {
  en: {
    tag: "Empowering Citizens with Nyaya-AI",
    title1: "Legal Guidance for",
    title2: "Every Indian Citizen.",
    desc: "Navigate the complexities of Indian law with ease. From Property Disputes to Consumer Rights, get empathetic, AI-driven legal information.",
    btnChat: "Start Consulting",
    btnAdmin: "Admin Portal",
    cardsTitle: "Official Indian Helplines",
    cards: [
      { title: "Cyber Crime Department", desc: "Report online financial fraud, identity theft, and cyber bullying immediately.", number: "1930", link: "https://cybercrime.gov.in", isEmergency: false },
      { title: "National Consumer Helpline", desc: "File grievances regarding defective products, e-commerce frauds, and service deficiency.", number: "1915", link: "https://consumerhelpline.gov.in", isEmergency: false },
      { title: "Mental Health Crisis (KIRAN)", desc: "Government helpline for anxiety, stress, or psychological support.", number: "1800-599-0019", link: "#", isEmergency: true },
      { title: "Women Helpline (NCW)", desc: "Immediate emergency response for women facing domestic violence or harassment.", number: "1091", link: "https://wcdhry.gov.in/", isEmergency: true },
      { title: "Childline India", desc: "24/7 emergency phone outreach service for children in need of care and protection.", number: "1098", link: "https://childlineindia.org", isEmergency: true },
      { title: "Elderline (Senior Citizens)", desc: "National helpline providing information, guidance, and emotional support to elders.", number: "14567", link: "#", isEmergency: false },
      { title: "Anti-Corruption Helpline", desc: "Report demands for bribes or corruption by public servants directly to the authorities.", number: "1064", link: "#", isEmergency: false },
      { title: "UPI / Digital Payment Fraud", desc: "Official NPCI redressal for failed transactions or unauthorized UPI deductions.", number: "1800-120-1740", link: "mailto:upihelp@npci.org.in", isEmergency: false }
    ]
  },
  hi: {
    tag: "न्याय-एआई के साथ नागरिकों का सशक्तिकरण",
    title1: "हर भारतीय नागरिक के लिए",
    title2: "कानूनी मार्गदर्शन।",
    desc: "भारतीय कानून की जटिलताओं को आसानी से नेविगेट करें। संपत्ति विवादों से लेकर उपभोक्ता अधिकारों तक, सहानुभूतिपूर्ण, एआई-संचालित कानूनी जानकारी प्राप्त करें।",
    btnChat: "परामर्श शुरू करें",
    btnAdmin: "व्यवस्थापक पोर्टल",
    cardsTitle: "आधिकारिक भारतीय हेल्पलाइन",
    cards: [
      { title: "साइबर क्राइम विभाग", desc: "ऑनलाइन वित्तीय धोखाधड़ी, पहचान की चोरी और साइबर बुलिंग की तुरंत रिपोर्ट करें।", number: "1930", link: "https://cybercrime.gov.in", isEmergency: false },
      { title: "राष्ट्रीय उपभोक्ता हेल्पलाइन", desc: "दोषपूर्ण उत्पादों, ई-कॉमर्स धोखाधड़ी और सेवा की कमी के संबंध में शिकायत दर्ज करें।", number: "1915", link: "https://consumerhelpline.gov.in", isEmergency: false },
      { title: "मानसिक स्वास्थ्य संकट (KIRAN)", desc: "चिंता, तनाव या मनोवैज्ञानिक सहायता के लिए सरकारी हेल्पलाइन।", number: "1800-599-0019", link: "#", isEmergency: true },
      { title: "महिला हेल्पलाइन (NCW)", desc: "घरेलू हिंसा या उत्पीड़न का सामना कर रही महिलाओं के लिए तत्काल आपातकालीन प्रतिक्रिया।", number: "1091", link: "https://ncw.nic.in", isEmergency: true },
      { title: "चाइल्डलाइन इंडिया", desc: "देखभाल और सुरक्षा की आवश्यकता वाले बच्चों के लिए 24/7 आपातकालीन फोन आउटरीच सेवा।", number: "1098", link: "https://childlineindia.org", isEmergency: true },
      { title: "एल्डरलाइन (वरिष्ठ नागरिक)", desc: "बुजुर्गों को सूचना, मार्गदर्शन और भावनात्मक सहायता प्रदान करने वाली राष्ट्रीय हेल्पलाइन।", number: "14567", link: "#", isEmergency: false },
      { title: "भ्रष्टाचार निरोधक हेल्पलाइन", desc: "लोक सेवकों द्वारा रिश्वत या भ्रष्टाचार की मांगों की रिपोर्ट सीधे अधिकारियों को करें।", number: "1064", link: "#", isEmergency: false },
      { title: "यूपीआई / डिजिटल भुगतान धोखाधड़ी", desc: "विफल लेनदेन या अनधिकृत यूपीआई कटौती के लिए आधिकारिक एनपीसीआई निवारण।", number: "1800-120-1740", link: "mailto:upihelp@npci.org.in", isEmergency: false }
    ]
  }
};

export default function LandingPage() {
  const { theme, applyTheme, language, toggleLanguage } = useSettingsViewModel();
  const t = dict[language];

  return (
    // STRICT 100vh and 100vw container. Overflow hidden prevents full-page scrolling.
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden transition-colors duration-300">
      <DisclaimerModal />

      {/* Header - Fixed Height */}
      <header className="flex-none flex justify-between items-center p-4 lg:p-6 border-b border-border bg-card">
        <div className="flex items-center gap-2 font-bold text-xl lg:text-2xl font-heading">
          <img src="/logo.png" alt="Nyaya AI Logo" className="w-8 h-8 lg:w-10 lg:h-10" />
          Nyaya AI
        </div>
        <div className="flex gap-2 lg:gap-4">
          <button onClick={toggleLanguage} className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold border border-border rounded-lg hover:bg-accent transition">
            {language === 'en' ? 'हिन्दी' : 'English'}
          </button>
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button onClick={() => applyTheme('light')} className={`p-2 ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`} title="Light Mode"><Sun size={16}/></button>
            <button onClick={() => applyTheme('dark')} className={`p-2 ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`} title="Dark Mode"><Moon size={16}/></button>
            <button onClick={() => applyTheme('color-blind')} className={`p-2 ${theme === 'color-blind' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`} title="Color-Blind Mode"><Eye size={16}/></button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Takes remaining height, allows internal flex areas to scroll */}
      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto overflow-hidden p-4 lg:p-8 gap-6 lg:gap-12">
        
        {/* Left Side: Hero Section (Scrolls independently on small mobile screens if text is too large) */}
        <section className="flex-1 flex flex-col justify-center overflow-y-auto lg:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-xs lg:text-sm font-bold mb-4 lg:mb-6 border border-primary/20 w-fit">
            <Scale size={16} /> <span>{t.tag}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-4 lg:mb-6 leading-tight">
            {t.title1} <span className="text-primary block lg:inline">{t.title2}</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-foreground/70 max-w-xl mb-8 lg:mb-10 leading-relaxed font-medium">
            {t.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full max-w-md">
            <Link href="/chat" className="flex items-center justify-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              {t.btnChat} <MessageSquare size={18} />
            </Link>
            <Link href="/admin" className="flex items-center justify-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-secondary text-secondary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-secondary/20">
              {t.btnAdmin} <ShieldCheck size={18} />
            </Link>
          </div>
        </section>

        {/* Right Side: Scrollable Helpline Carousel */}
        <aside className="h-[45vh] lg:h-full lg:w-[400px] flex flex-col flex-none">
          <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-2 lg:mb-4 flex-none">{t.cardsTitle}</h3>
          <HelplineCarousel cards={t.cards} />
        </aside>
      </main>

      {/* Footer - Fixed Height */}
      <div className="flex-none">
        <Footer />
      </div>
    </div>
  );
}

function HelplineCarousel({ cards }: { cards: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(Math.ceil(scrollTop + clientHeight) < scrollHeight - 2);
    }
  };

  useEffect(() => {
    checkScroll(); 
    window.addEventListener('resize', checkScroll); 
    return () => window.removeEventListener('resize', checkScroll);
  }, [cards]);

  const scrollByAmount = (direction: 'up' | 'down') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientHeight * 0.5;
      scrollRef.current.scrollBy({
        top: direction === 'down' ? amount : -amount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative flex-1 overflow-hidden rounded-xl bg-card border border-border flex flex-col">
      
      {canScrollUp && (
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-card to-transparent z-10 flex justify-center pointer-events-none">
          <button 
            onClick={() => scrollByAmount('up')}
            className="mt-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg pointer-events-auto animate-bounce hover:opacity-80 transition"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      )}

      {/* Hidden Scrollbar Container */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex-1 overflow-y-auto scroll-smooth p-4 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, index) => (
          <div key={index} className={`p-5 rounded-xl border ${card.isEmergency ? 'border-destructive/50 bg-destructive/5' : 'border-border bg-background'} transition-shadow`}>
            <h4 className={`text-lg font-bold font-heading mb-1 ${card.isEmergency ? 'text-destructive' : 'text-primary'}`}>{card.title}</h4>
            <p className="text-sm text-foreground/70 mb-4">{card.desc}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
              <a href={`tel:${card.number}`} className="flex items-center gap-1.5 text-foreground hover:text-primary whitespace-nowrap">
                <PhoneCall size={16} /> {card.number}
              </a>
              {card.link !== '#' && (
                <a href={card.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-foreground hover:text-primary whitespace-nowrap">
                  <Globe size={16} /> Portal
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic DOWN Arrow */}
      {canScrollDown && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent z-10 flex items-end justify-center pointer-events-none">
          <button 
            onClick={() => scrollByAmount('down')}
            className="mb-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg pointer-events-auto animate-bounce hover:opacity-80 transition"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      )}
    </div>
  );
}