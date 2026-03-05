import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 transition-colors"
            aria-label="Toggle dark mode"
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </button>
    );
};

export default DarkModeToggle;
