import { motion } from 'motion/react';
import mobileLogoImage from '../../imports/image-2.png';

export function MobileAppLogoSection() {
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
        <p className="text-lg text-gray-700 leading-relaxed">
          The Mobile App Logo section showcases the app icon design variations and how they should be
          presented across different mobile platforms and contexts.
        </p>
      </motion.div>

      {/* Mobile Logo Display */}
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
          src={mobileLogoImage}
          alt="Mobile App Logo Variations"
          className="w-full h-auto select-none pointer-events-none"
          draggable="false"
          onContextMenu={handleContextMenu}
          style={{ userSelect: 'none' }}
        />
      </motion.div>
    </div>
  );
}
