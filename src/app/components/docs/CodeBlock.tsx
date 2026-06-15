import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  isDarkMode: boolean;
}

export function CodeBlock({ code, language = 'bash', isDarkMode }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative rounded-lg ${isDarkMode ? 'bg-[#161b22]' : 'bg-gray-50'} my-4 overflow-hidden`}>
      <div className={`flex items-center justify-between border-b px-4 py-2 ${
        isDarkMode ? 'border-gray-700 bg-[#0d1117]' : 'border-gray-200 bg-gray-100'
      }`}>
        <span className={`text-xs font-medium uppercase ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-colors ${
            isDarkMode
              ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
          }`}
        >
          {copied ? (
            <>
              <Check className="size-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto scrollbar-visible">
        <pre className={`p-4 text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-800'
        }`}>
          <code className="whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  );
}