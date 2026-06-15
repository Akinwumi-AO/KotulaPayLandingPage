import { useState } from 'react';
import { CodeBlock } from './CodeBlock';

interface CodeExample {
  language: string;
  code: string;
}

interface CodeTabsProps {
  examples: CodeExample[];
  isDarkMode?: boolean;
}

export function CodeTabs({ examples, isDarkMode = false }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (examples.length === 0) return null;

  return (
    <div className={`rounded-lg border overflow-hidden ${
      isDarkMode
        ? 'border-gray-700 bg-gray-800'
        : 'border-gray-200 bg-white'
    }`}>
      <div className={`flex gap-1 border-b p-2 ${
        isDarkMode
          ? 'border-gray-700 bg-gray-900'
          : 'border-gray-200 bg-gray-50'
      }`}>
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === index
                ? isDarkMode
                  ? 'bg-gray-800 text-[#c5e063] shadow-sm'
                  : 'bg-white text-[#001c26] shadow-sm'
                : isDarkMode
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {example.language}
          </button>
        ))}
      </div>
      <div className="p-4">
        <CodeBlock code={examples[activeTab].code} language={examples[activeTab].language.toLowerCase()} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
