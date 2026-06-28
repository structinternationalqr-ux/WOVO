import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Settings from './pages/Settings';
import { supabase } from './lib/supabase';

function LanguageHandler() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language;
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else if (lang === 'tr') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'tr';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [i18n.language]);

  return null;
}

function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    async function logVisit() {
      try {
        await supabase.from('visitor_logs').insert([{ page: location.pathname }]);
      } catch {
        // Silently fail - visitor tracking is non-critical
      }
    }
    logVisit();
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-void text-platinum">
        <LanguageHandler />
        <VisitorTracker />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
