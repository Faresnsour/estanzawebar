'use client';

import React, { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import EstanzaLogo from './EstanzaLogo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-3 z-50 max-w-5xl mx-auto px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-full border border-emerald-950/10 shadow-sm py-2 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Right: Estanza Brand */}
        <a href="#" className="flex items-center gap-2.5">
          <EstanzaLogo className="w-8 h-8" showBadge={true} />
          <span className="font-extrabold text-xl text-[#05221C] tracking-tight">Estanza</span>
        </a>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-[#008774] transition-colors">المميزات</a>
          <a href="#how-it-works" className="hover:text-[#008774] transition-colors">كيف يعمل؟</a>
          <a href="#pricing" className="hover:text-[#008774] transition-colors">الأسعار</a>
          
        </nav>

        {/* Left: Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Estanza%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AA%D8%AC%D9%87%D9%8A%D8%B2%20%D9%86%D8%B8%D8%A7%D9%85%20%D8%A7%D9%84%D8%AD%D8%AC%D9%88%D8%B2%D8%A7%D8%AA"
            target="_blank"
            rel="noreferrer"
            className="bg-[#05221C] text-white hover:bg-[#008774] text-xs sm:text-sm font-semibold py-2 px-4 rounded-full transition-all inline-flex items-center gap-1.5 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">تواصل عبر واتساب</span>
            <span className="sm:hidden">واتساب</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-md border border-emerald-950/10 rounded-2xl p-4 shadow-xl space-y-2 text-right">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-700 hover:text-[#008774] border-b border-slate-100">المميزات</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-700 hover:text-[#008774] border-b border-slate-100">كيف يعمل؟</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-700 hover:text-[#008774] border-b border-slate-100">الأسعار</a>
          
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-[#008774]">تواصل معنا الآن</a>
        </div>
      )}
    </header>
  );
} 