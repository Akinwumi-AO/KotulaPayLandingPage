import { Link } from 'react-router';
import { Moon, Sun, Search, ChevronDown, Code } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Logo } from '../Logo';

interface DocsHeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

export function DocsHeader({ isDarkMode, onToggleDarkMode, selectedLanguage = 'cURL', onLanguageChange }: DocsHeaderProps) {
  const languages = ['cURL', 'Python', 'PHP', 'Java'];
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 border-b ${
      isDarkMode ? 'border-gray-800 bg-[#1a1a1a]' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <Logo variant={isDarkMode ? 'light' : 'dark'} />
        </Link>

        {/* Center - Language Tabs (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange?.(lang)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedLanguage === lang
                  ? isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#001c26]'
                  : isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Center - Language Dropdown (mobile) */}
        <div className="relative md:hidden" ref={dropdownRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              isDarkMode
                ? 'border-gray-700 bg-gray-800 text-[#c5e063] hover:bg-gray-700'
                : 'border-gray-200 bg-gray-100 text-[#001c26] hover:bg-gray-200'
            }`}
          >
            <Code className="size-4 flex-shrink-0" />
            <span>{selectedLanguage}</span>
            <ChevronDown className={`size-4 flex-shrink-0 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className={`absolute left-1/2 top-full mt-2 w-36 -translate-x-1/2 rounded-lg border shadow-lg overflow-hidden ${
              isDarkMode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-white'
            }`}>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => { onLanguageChange?.(lang); setIsLangOpen(false); }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    selectedLanguage === lang
                      ? isDarkMode ? 'bg-gray-800 text-[#c5e063]' : 'bg-gray-100 text-[#001c26] font-medium'
                      : isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {lang}
                  {selectedLanguage === lang && (
                    <span className={`size-1.5 rounded-full ${isDarkMode ? 'bg-[#c5e063]' : 'bg-[#001c26]'}`} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search - hidden on mobile */}
          <div className="relative hidden md:block">
            <Search className={`absolute left-3 top-1/2 size-4 -translate-y-1/2 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Find something..."
              className={`w-56 rounded-lg border py-2 pl-10 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500 focus:border-[#c5e063] focus:ring-[#c5e063]/20'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[#001c26] focus:ring-[#001c26]/20'
              }`}
            />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
