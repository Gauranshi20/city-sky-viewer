
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center">
      <ToggleGroup type="single" value={theme} onValueChange={(value) => {
        if (value) toggleTheme();
      }}>
        <ToggleGroupItem value="light" aria-label="Toggle light mode">
          <Sun className="h-5 w-5 mr-2" />
          <span className="sr-only md:not-sr-only md:inline-block">Light</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Toggle dark mode">
          <Moon className="h-5 w-5 mr-2" />
          <span className="sr-only md:not-sr-only md:inline-block">Dark</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ThemeToggle;
