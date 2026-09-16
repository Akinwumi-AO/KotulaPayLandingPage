import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface TypeScale {
  name: string;
  size: string;
  lineHeight: string;
  weight: string;
  usage: string;
  className: string;
}

export function TypographySection() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const typeScales: TypeScale[] = [
    {
      name: 'Display Large',
      size: '72px',
      lineHeight: '80px',
      weight: 'Bold (700)',
      usage: 'Hero headlines, landing pages',
      className: 'text-[72px] leading-[80px] font-bold'
    },
    {
      name: 'Display Medium',
      size: '60px',
      lineHeight: '68px',
      weight: 'Bold (700)',
      usage: 'Section headers, page titles',
      className: 'text-[60px] leading-[68px] font-bold'
    },
    {
      name: 'Heading 1',
      size: '48px',
      lineHeight: '56px',
      weight: 'Bold (700)',
      usage: 'Main page headings',
      className: 'text-5xl leading-[56px] font-bold'
    },
    {
      name: 'Heading 2',
      size: '36px',
      lineHeight: '44px',
      weight: 'Bold (700)',
      usage: 'Section headings',
      className: 'text-4xl leading-[44px] font-bold'
    },
    {
      name: 'Heading 3',
      size: '30px',
      lineHeight: '38px',
      weight: 'Medium (500)',
      usage: 'Subsection headings',
      className: 'text-3xl leading-[38px] font-medium'
    },
    {
      name: 'Heading 4',
      size: '24px',
      lineHeight: '32px',
      weight: 'Medium (500)',
      usage: 'Card titles, components',
      className: 'text-2xl leading-8 font-medium'
    },
    {
      name: 'Heading 5',
      size: '20px',
      lineHeight: '28px',
      weight: 'Medium (500)',
      usage: 'Small headings, labels',
      className: 'text-xl leading-7 font-medium'
    },
    {
      name: 'Body Large',
      size: '18px',
      lineHeight: '28px',
      weight: 'Book (400)',
      usage: 'Large body text, introductions',
      className: 'text-lg leading-7 font-normal'
    },
    {
      name: 'Body',
      size: '16px',
      lineHeight: '24px',
      weight: 'Book (400)',
      usage: 'Default body text, paragraphs',
      className: 'text-base leading-6 font-normal'
    },
    {
      name: 'Body Small',
      size: '14px',
      lineHeight: '20px',
      weight: 'Book (400)',
      usage: 'Secondary text, descriptions',
      className: 'text-sm leading-5 font-normal'
    },
    {
      name: 'Caption',
      size: '12px',
      lineHeight: '16px',
      weight: 'Book (400)',
      usage: 'Captions, footnotes, metadata',
      className: 'text-xs leading-4 font-normal'
    },
    {
      name: 'Overline',
      size: '12px',
      lineHeight: '16px',
      weight: 'Bold (700)',
      usage: 'Labels, tags, eyebrows',
      className: 'text-xs leading-4 font-bold uppercase tracking-wider'
    }
  ];

  const fontWeights = [
    { name: 'Book', weight: '400', style: 'font-normal' },
    { name: 'Medium', weight: '500', style: 'font-medium' },
    { name: 'Bold', weight: '700', style: 'font-bold' }
  ];

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand('copy');
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }

    document.body.removeChild(textarea);
  };

  return (
    <div className="space-y-12">
      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-lg text-gray-700 leading-relaxed">
          The Typography section of a brand book outlines the fonts and typography that are associated with the brand,
          and how they should be used across various media and contexts.
        </p>
      </motion.div>

      {/* Font Family Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#001c26] to-[#04403a] p-12"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#c5e063] mb-2 uppercase tracking-wider">Primary Typeface</p>
              <h3 className="text-5xl font-bold text-white">Circular Std</h3>
            </div>
            <button
              onClick={() => copyToClipboard('Circular Std')}
              className="flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/20"
            >
              {copiedText === 'Circular Std' ? (
                <>
                  <Check className="size-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy Font Name
                </>
              )}
            </button>
          </div>

          {/* Character Set */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-6xl text-white font-bold mb-4">AaBbCc</p>
            <p className="text-xl text-white/80 leading-relaxed">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              0123456789 !@#$%^&*()
            </p>
          </div>
        </div>
      </motion.div>

      {/* Font Weights */}
      <div>
        <h3 className="text-2xl font-bold text-[#001c26] mb-6">Font Weights</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {fontWeights.map((weight, index) => (
            <motion.div
              key={weight.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{weight.name}</p>
                  <p className="text-xs font-mono text-gray-400">{weight.weight}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(weight.weight)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-[#001c26] transition-all"
                >
                  {copiedText === weight.weight ? (
                    <Check className="size-4 text-green-600" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
              <p className={`text-4xl text-[#001c26] ${weight.style}`}>Aa</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Type Scale */}
      <div>
        <h3 className="text-2xl font-bold text-[#001c26] mb-6">Type Scale</h3>
        <div className="space-y-4">
          {typeScales.map((scale, index) => (
            <motion.div
              key={scale.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group rounded-xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Sample Text */}
                <div className="flex-1">
                  <p className={`${scale.className} text-[#001c26]`}>
                    {scale.name}
                  </p>
                </div>

                {/* Specifications */}
                <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs mb-1">Size</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono font-semibold text-gray-900">{scale.size}</p>
                      <button
                        onClick={() => copyToClipboard(scale.size)}
                        className="p-1 rounded text-gray-400 hover:bg-gray-100 hover:text-[#001c26] transition-all opacity-0 group-hover:opacity-100"
                      >
                        {copiedText === scale.size ? (
                          <Check className="size-3 text-green-600" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-500 text-xs mb-1">Line Height</p>
                    <p className="font-mono font-semibold text-gray-900">{scale.lineHeight}</p>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-500 text-xs mb-1">Weight</p>
                    <p className="font-medium text-gray-900">{scale.weight}</p>
                  </div>

                  <div className="text-sm lg:w-48">
                    <p className="text-gray-500 text-xs mb-1">Usage</p>
                    <p className="text-xs text-gray-700">{scale.usage}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Usage Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-gray-50 p-8"
      >
        <h3 className="text-2xl font-bold text-[#001c26] mb-6">Typography in Context</h3>
        <div className="space-y-6 max-w-3xl">
          <div>
            <h1 className="text-5xl font-bold text-[#001c26] mb-4">
              Payment Solutions for Africa
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Enterprise-grade payment infrastructure built for modern businesses. Accept cards,
              mobile money, and local payment methods through a single API.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Kotulapay provides seamless integration with major payment providers across the continent,
              offering your customers a secure and reliable payment experience.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
