// contexts/ThemeContext.tsx
import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
