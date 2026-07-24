import { Link } from 'react-router';
import { Moon, Sun } from 'lucide-react';
import { Logo } from '../Logo';

interface TermsHeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function TermsHeader({ isDarkMode, onToggleDarkMode }: TermsHeaderProps) {
  return (
    <header className={`fixed left-0 right-0 top-0 z-50 border-b ${
      isDarkMode ? 'border-gray-800 bg-[#1a1a1a]' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <Logo variant={isDarkMode ? 'light' : 'dark'} />
        </Link>

        <div className="flex items-center gap-3">
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

          <Link to="/contact">
            <button className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              isDarkMode
                ? 'bg-[#c5e063] text-[#0a3d3d] hover:opacity-90'
                : 'bg-[#001c26] text-white hover:opacity-90'
            }`}>
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
