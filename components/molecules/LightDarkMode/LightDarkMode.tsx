import { useTheme } from '@/lib/contexts/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
function LightDarkMode() {
  const { toggleDarkMode, isDarkMode } = useTheme();

  return (
    <div>
      <IconButton
        onClick={toggleDarkMode}
        color="error"
        aria-label="menu"
        className={`rounded ${
          isDarkMode
            ? 'bg-slate-100 text-slate-900'
            : 'bg-black/40 text-slate-100'
        } fixed right-4 top-4 z-50 p-2`}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </div>
  );
}

export default LightDarkMode;
