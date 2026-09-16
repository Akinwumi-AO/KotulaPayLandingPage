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
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
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
