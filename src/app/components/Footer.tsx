import { Link } from 'react-router';
import logoWhite from 'figma:asset/26fbaf38c7433afbd2ffe8f6a4fe4931a5e83adf.png';

function FooterLogo() {
  return (
    <img src={logoWhite} alt="Kotulapay" className="h-10 w-auto" />
  );
}

export function Footer() {
  return (
    <footer className="bg-[#001c26] border-t border-[#074961] pt-16 pb-10">
      <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-10 mb-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <FooterLogo />
            <p className="mt-5 max-w-[360px] text-[#cdced7] text-base leading-relaxed">
              Enterprise-grade payment infrastructure built for Africa. Accept cards, mobile money, and local payment methods through a single API.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 font-bold text-[#cdced7] text-xl">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us',         to: '/about' },
                { label: 'Services',         to: '/services' },
                { label: 'Brand Guidelines', to: '/brand-guidelines' },
                { label: 'Careers',          to: '/careers' },
                { label: 'Contact',          to: '/contact' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-[#cdced7] text-base hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Resource Center */}
          <div>
            <h4 className="mb-5 font-bold text-[#cdced7] text-xl">Partner Resource Center</h4>
            <ul className="space-y-3">
              {[
                { label: 'Documentation', to: '/resources/documentation' },
                { label: 'API Reference',  to: '/resources/api-reference' },
                { label: 'Videos',         to: '/resources/videos' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-[#cdced7] text-base hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://blog.kotulapay.com/" target="_blank" rel="noreferrer" className="text-[#cdced7] text-base hover:text-white transition-colors">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-5 font-bold text-[#cdced7] text-xl">Legal</h4>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy',   to: '/privacy-policy' },
                { label: 'Terms of Service', to: '/terms-of-service' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-[#cdced7] text-base hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 border-t border-[#074961]" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="text-[#cdced7] text-base">© 2026 Kotulapay. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="http://linkedin.com/company/kotulapay/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a href="https://x.com/Kotulapay" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="text-white/60 hover:text-white transition-colors">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/kotulapay/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="mailto:support@kotulapay.com" aria-label="Email" className="text-white/60 hover:text-white transition-colors">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
