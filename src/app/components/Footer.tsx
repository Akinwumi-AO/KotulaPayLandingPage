import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { Logo } from './Logo';

export function Footer() {
  const footerSections = [
    {
      title: 'Developers',
      links: [
        { label: 'Documentation', path: '/resources/documentation' },
        { label: 'API Reference', path: '/resources/api-reference' },
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Brand Guidelines', path: '/brand-guidelines' },
        { label: 'Careers', path: '/careers' },
        { label: 'Blog', path: '/resources/blogs' },
        { label: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/support/help-center' },
        { label: 'Community', path: '/support/community' },
        { label: 'Contact Support', path: '/contact' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Linkedin className="size-5" />, href: 'https://www.linkedin.com/company/kotula-pay', label: 'LinkedIn' },
    { icon: <Mail className="size-5" />, href: 'mailto:info@kotulapay.com', label: 'Email' }
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#001c26] to-[#000810] pt-20 pb-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(197, 224, 99, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Main Footer Content */}
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <Logo variant="light" />
              </div>
              <p className="mb-6 max-w-sm text-gray-400 leading-relaxed">
                Enterprise-grade payment infrastructure built for Africa. 
                Accept cards, mobile money, and local payment methods through a single API.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 backdrop-blur-sm transition-all hover:border-[#c5e063]/30 hover:bg-[#c5e063]/10 hover:text-[#c5e063]"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 transition-colors hover:text-[#c5e063]"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-gray-500">
              © 2026 KotulaPay. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <Link to="/privacy-policy" className="transition-colors hover:text-[#c5e063]">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="transition-colors hover:text-[#c5e063]">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c5e063]/50 to-transparent" />
    </footer>
  );
}