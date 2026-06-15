import logoLight from 'figma:asset/26fbaf38c7433afbd2ffe8f6a4fe4931a5e83adf.png';
import logoDark from 'figma:asset/ad0d9c8f17de58c9a22e2bf90dabb9f49818be5d.png';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function Logo({ variant = 'light', className = '' }: LogoProps) {
  const logoSrc = variant === 'light' ? logoLight : logoDark;
  
  return (
    <img 
      src={logoSrc} 
      alt="KotulaPay" 
      className={`h-8 w-auto ${className}`}
    />
  );
}
