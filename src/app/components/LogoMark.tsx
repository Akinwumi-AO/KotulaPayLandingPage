import logoMarkGreen from '../../imports/Frame_2147206468.svg';
import logoMarkDark from '../../imports/Frame_2147206469.svg';
import logoMarkLight from '../../imports/Frame_2147206470.svg';

interface LogoMarkProps {
  variant?: 'green' | 'dark' | 'light';
  className?: string;
  size?: number;
}

export function LogoMark({ variant = 'green', className = '', size = 48 }: LogoMarkProps) {
  const logoMarkSrc = variant === 'green' ? logoMarkGreen : variant === 'dark' ? logoMarkDark : logoMarkLight;

  return (
    <img
      src={logoMarkSrc}
      alt="Kotulapay Logo Mark"
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
