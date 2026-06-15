import { motion } from 'motion/react';
import logoMisuseImage from '../../imports/image-4.png';

export function LogoMisuseSection() {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
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
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          The Logo Misuse section of a brand book outlines guidelines for what not to do with the brand's logo,
          in order to avoid misrepresenting the brand or damaging its reputation.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          This section is particularly important to ensure that the logo is not used inappropriately or in a way
          that conflicts with the brand's values and messaging.
        </p>
      </motion.div>

      {/* Logo Misuse Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
      >
        <img
          src={logoMisuseImage}
          alt="Logo Misuse Examples"
          className="w-full h-auto select-none pointer-events-none"
          draggable="false"
          onContextMenu={handleContextMenu}
          style={{ userSelect: 'none' }}
        />
      </motion.div>
    </div>
  );
}
