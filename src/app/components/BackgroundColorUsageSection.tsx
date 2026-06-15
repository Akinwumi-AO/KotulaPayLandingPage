import { motion } from 'motion/react';
import backgroundUsageImage from '../../imports/image-1.png';

export function BackgroundColorUsageSection() {
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
          The Background Color Usage section of a brand book outlines guidelines for the use and presentation
          of background colors in relation to the brand's visual identity.
        </p>
      </motion.div>

      {/* Background Usage Display */}
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
          src={backgroundUsageImage}
          alt="Background Color Usage Examples"
          className="w-full h-auto select-none pointer-events-none"
          draggable="false"
          onContextMenu={handleContextMenu}
          style={{ userSelect: 'none' }}
        />
      </motion.div>
    </div>
  );
}
