'use client';
import { useState } from 'react';

export default function LanguageSwitcher({ currentLang, setLang }: { currentLang: 'ar' | 'am', setLang: (l: 'ar' | 'am') => void }) {
  return (
    <div className="flex gap-2 items-center bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm text-sm">
      <button 
        onClick={() => setLang('ar')}
        className={`px-3 py-1 rounded-full font-medium transition-colors ${currentLang === 'ar' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
      >
        العربية
      </button>
      <button 
        onClick={() => setLang('am')}
        className={`px-3 py-1 rounded-full font-medium transition-colors ${currentLang === 'am' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
      >
        አማርኛ
      </button>
    </div>
  );
}
