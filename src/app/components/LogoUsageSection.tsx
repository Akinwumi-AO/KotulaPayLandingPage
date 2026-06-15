import { motion } from 'motion/react';
import logoUsageImage from '../../imports/image-3.png';

export function LogoUsageSection() {
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
          The Logo Usage section demonstrates proper implementation of the KotulaPay logo across various
          contexts and backgrounds, ensuring consistent brand representation.
        </p>
      </motion.div>

      {/* Logo Usage Display */}
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
          src={logoUsageImage}
          alt="Logo Usage Examples"
          className="w-full h-auto select-none pointer-events-none"
          draggable="false"
          onContextMenu={handleContextMenu}
          style={{ userSelect: 'none' }}
        />
      </motion.div>
    </div>
  );
}
