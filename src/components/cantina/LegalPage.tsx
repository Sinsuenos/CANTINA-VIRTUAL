'use client';

import { useState, useEffect } from 'react';

type Lang = 'en' | 'es';

interface LegalPageProps {
  titleEn: string;
  titleEs: string;
  en: string[];
  es: string[];
}

export function LegalPage({ titleEn, titleEs, en, es }: LegalPageProps) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const savedLang = sessionStorage.getItem('cv_lang');
    if (savedLang === 'en' || savedLang === 'es') {
      setLang(savedLang);
    }
  }, []);

  const handleToggle = () => {
    const next = lang === 'en' ? 'es' : 'en';
    setLang(next);
    sessionStorage.setItem('cv_lang', next);
  };
  const content = lang === 'en' ? en : es;
  const title = lang === 'en' ? titleEn : titleEs;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-deep, #0a0e17)',
      color: 'var(--text-primary, #e8e0d4)',
      fontFamily: "'Courier New', 'Lucida Console', monospace",
      padding: '60px 24px 40px',
      maxWidth: '640px',
      margin: '0 auto',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <a href="/" style={{
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: 'var(--amber, #dab12a)',
          textDecoration: 'none',
        }}>
          &larr; Cantina Virtual
        </a>
        <button
          onClick={handleToggle}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '2px',
            color: 'var(--text-dim, #7a7570)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            padding: '4px 10px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {lang === 'en' ? 'ES' : 'EN'}
        </button>
      </div>

      <h1 style={{
        fontSize: '18px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: 'var(--amber, #dab12a)',
        marginBottom: '32px',
      }}>
        {title}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {content.map((paragraph, i) => {
          const isEmail = paragraph.includes('@') && !paragraph.startsWith('1') && !paragraph.startsWith('2') && !paragraph.startsWith('3') && !paragraph.startsWith('4') && !paragraph.startsWith('5') && !paragraph.startsWith('6') && paragraph.trim().length < 80;
          return (
            <p key={i} style={{
              fontSize: '13px',
              lineHeight: '1.8',
              color: isEmail ? 'var(--amber, #dab12a)' : 'var(--text-muted, #9a9385)',
              margin: 0,
              whiteSpace: 'pre-line',
            }}>
              {isEmail ? (
                <a href={`mailto:${paragraph.trim()}`} style={{ color: 'inherit', textDecoration: 'none' }}>{paragraph}</a>
              ) : paragraph}
            </p>
          );
        })}
      </div>

      <div style={{ marginTop: '48px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '20px' }}>
        <a href="/" style={{
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: 'var(--amber-dim, #b08a1a)',
          textDecoration: 'none',
        }}>
          &larr; {lang === 'en' ? 'Back to Cantina Virtual' : 'Volver a Cantina Virtual'}
        </a>
      </div>
    </div>
  );
}