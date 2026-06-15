import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ColorItem {
  name: string;
  hex: string;
  rgb?: string;
  usage: string;
}

export function ColorPaletteSection() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors: ColorItem[] = [
    {
      name: 'Primary Green',
      hex: '#99D261',
      rgb: 'RGB(153, 210, 97)',
      usage: 'Primary brand color, CTAs, highlights, and interactive elements'
    },
    {
      name: 'Dark Teal',
      hex: '#001C26',
      rgb: 'RGB(0, 28, 38)',
      usage: 'Primary text, headers, and dark backgrounds'
    },
    {
      name: 'Deep Teal',
      hex: '#04403A',
      rgb: 'RGB(4, 64, 58)',
      usage: 'Secondary backgrounds and accent elements'
    },
    {
      name: 'Forest Green',
      hex: '#014029',
      rgb: 'RGB(1, 64, 41)',
      usage: 'Hover states and secondary accents'
    },
    {
      name: 'Light Green',
      hex: '#B8F27E',
      rgb: 'RGB(184, 242, 126)',
      usage: 'Subtle highlights and secondary CTAs'
    },
    {
      name: 'Pale Green',
      hex: '#D4F291',
      rgb: 'RGB(212, 242, 145)',
      usage: 'Backgrounds and subtle accents'
    }
  ];

  const copyToClipboard = (text: string) => {
    // Fallback method that works in iframe environments
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
      setCopiedColor(text);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }

    document.body.removeChild(textarea);
  };

  return (
    <div className="space-y-8">
      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-lg text-gray-700 leading-relaxed">
          The Color Palette section of a brand book outlines the colors that are associated with the brand,
          and how they should be used across various media and contexts. This section is particularly important
          to ensure that the brand's visual identity remains consistent and recognizable.
        </p>
      </motion.div>

      {/* Primary Color - Large Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="bg-[#99D261] h-64 flex items-end p-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-[#001c26]">Primary Green</h3>
            <div className="flex items-center gap-3">
              <span className="text-xl font-mono text-[#001c26] font-semibold">#99D261</span>
              <button
                onClick={() => copyToClipboard('#99D261')}
                className="flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-[#001c26] transition-all hover:bg-white hover:shadow-lg"
              >
                {copiedColor === '#99D261' ? (
                  <>
                    <Check className="size-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-[#001c26]/80 max-w-md">
              Primary brand color, CTAs, highlights, and interactive elements
            </p>
          </div>
        </div>
      </motion.div>

      {/* Secondary Colors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {colors.slice(1).map((color, index) => (
          <motion.div
            key={color.hex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Color Swatch */}
            <div
              className="h-40 relative"
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>

            {/* Color Info */}
            <div className="bg-white p-5 space-y-3">
              <h4 className="text-lg font-bold text-[#001c26]">{color.name}</h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-gray-900">
                    {color.hex}
                  </span>
                  <button
                    onClick={() => copyToClipboard(color.hex)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#001c26] transition-all"
                    title="Copy HEX"
                  >
                    {copiedColor === color.hex ? (
                      <Check className="size-4 text-green-600" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-600">
                    {color.rgb}
                  </span>
                  <button
                    onClick={() => copyToClipboard(color.rgb || '')}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#001c26] transition-all"
                    title="Copy RGB"
                  >
                    {copiedColor === color.rgb ? (
                      <Check className="size-4 text-green-600" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                {color.usage}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
