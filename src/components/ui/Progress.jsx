// src/components/ui/
import { motion } from 'framer-motion';

export const Progress = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <motion.div
      className="bg-blue-600 h-2 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3 }}
    />
  </div>
);
