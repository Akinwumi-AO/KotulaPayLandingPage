import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, ChevronDown, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Logo } from './Logo';
import { LogoMark } from './LogoMark';

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesHovered, setIsResourcesHovered] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);

  const isOnResourcesPage = location.pathname.startsWith('/resources') || location.pathname === '/brand-guidelines';
  const isResourcesOpen = isResourcesHovered;

  useEffect(() => {
    setIsResourcesHovered(false);
    setIsMobileResourcesOpen(false);
  }, [location.pathname]);

  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 80],
    ['rgba(0, 28, 38, 0)', 'rgba(0, 28, 38, 0.92)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'About Us', href: '/about', isRoute: true },
    { label: 'Services', href: '/services', isRoute: true },
    { 
      label: 'Resources', 
      href: '#resources',
      isRoute: false,
      hasDropdown: true,
      dropdownColumns: [
        {
          title: 'INSIGHTS',
          items: [
            { label: 'Blogs', href: '/resources/blogs' },
            { label: 'Videos', href: '/resources/videos' }
          ]
        },
        {
          title: 'DOCUMENTATION',
          items: [
            { label: 'Documentation', href: '/resources/documentation' },
            { label: 'API reference', href: '/resources/api-reference' },
            { label: 'Partner resource center', href: '/resources/partner-resources' },
            { label: 'Brand guidelines', href: '/brand-guidelines' },
            { label: 'FAQ', href: '/resources/faq' }
          ]
        }
      ]
    },
    { label: 'Contact', href: '/contact', isRoute: true }
  ];

  return (
    <motion.header
      style={{ backgroundColor: headerBackground }}
      className={`fixed left-0 right-0 top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'border-b border-white/10' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
<Link to="/"><Logo variant="light" /></Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={() => item.hasDropdown && setIsResourcesHovered(true)}
                onMouseLeave={() => item.hasDropdown && setIsResourcesHovered(false)}
              >
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    style={location.pathname === item.href ? { backgroundColor: '#D4F291' } : {}}
                    className={`flex items-center gap-1 text-sm font-medium transition-all duration-200 rounded-full px-4 py-2 ${
                      location.pathname === item.href
                        ? 'text-[#0a3d3d] font-semibold'
                        : 'text-gray-300 hover:text-[#c5e063]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    style={isOnResourcesPage ? { backgroundColor: '#D4F291' } : {}}
                    className={`flex items-center gap-1 text-sm font-medium transition-all duration-200 rounded-full px-4 py-2 ${
                      isOnResourcesPage
                        ? 'text-[#0a3d3d] font-semibold'
                        : 'text-gray-300 hover:text-[#c5e063]'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className={`size-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                    )}
                  </a>
                )}
                {item.hasDropdown && item.dropdownColumns && (
                  <div
                    className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-300 ${
                      isResourcesOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                    onMouseEnter={() => setIsResourcesHovered(true)}
                    onMouseLeave={() => setIsResourcesHovered(false)}
                  >
                    <div className="grid grid-cols-2 gap-12 rounded-lg border border-gray-200 bg-white p-8 shadow-2xl min-w-[500px]">
                      {item.dropdownColumns.map((column) => (
                        <div key={column.title}>
                          <div className="mb-4 flex items-center gap-2">
                            <Play className="size-3 fill-[#c5e063] text-[#c5e063]" />
                            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#c5e063]">
                              {column.title}
                            </h5>
                          </div>
                          <div className="space-y-3">
                            {column.items.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                to={dropdownItem.href}
                                onClick={() => setIsResourcesHovered(false)}
                                className="block rounded-md px-3 py-2 text-base text-gray-700 transition-all duration-200 hover:bg-[#c5e063]/10 hover:text-[#0a3d3d] hover:pl-4"
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-[#c5e063] px-6 py-2.5 text-sm font-semibold text-[#0a3d3d] shadow-lg shadow-[#c5e063]/20 transition-all hover:shadow-xl hover:shadow-[#c5e063]/30"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center text-white lg:hidden"
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden lg:hidden"
        >
          <div className="space-y-4 pb-6 pt-4">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-[#c5e063] font-semibold'
                      : 'text-gray-300 hover:text-[#c5e063]'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <div key={item.label}>
                  <button
                    onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                    className={`flex w-full items-center justify-between transition-colors duration-200 ${
                      isOnResourcesPage
                        ? 'text-[#c5e063] font-semibold'
                        : 'text-gray-300 hover:text-[#c5e063]'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`size-4 transition-transform ${isMobileResourcesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileResourcesOpen && item.dropdownColumns && (
                    <div className="mt-3 space-y-4 border-l-2 border-[#c5e063]/30 pl-4">
                      {item.dropdownColumns.map((column) => (
                        <div key={column.title}>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#c5e063]/70">
                            {column.title}
                          </p>
                          <div className="space-y-2">
                            {column.items.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                to={dropdownItem.href}
                                onClick={() => { setIsMobileMenuOpen(false); setIsMobileResourcesOpen(false); }}
                                className="block text-sm text-gray-400 transition-colors hover:text-[#c5e063]"
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <button className="rounded-full bg-[#c5e063] px-6 py-2.5 text-sm font-semibold text-[#0a3d3d]">
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}