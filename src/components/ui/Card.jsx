// src/components/ui/
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className={`
      bg-white rounded-2xl shadow-xl p-6
      hover:shadow-2xl transition-shadow duration-300
      ${className}
    `}
    {...props}
  >
    {children}
  </motion.div>
);
