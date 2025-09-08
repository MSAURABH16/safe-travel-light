import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { regionalConfig } from '@/lib/regional-config';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languageNames = {
  en: 'English',
  hi: 'हिन्दी',
  as: 'অসমীয়া',
  bn: 'বাংলা'
};

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          {languageNames[currentLanguage as keyof typeof languageNames]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {regionalConfig.languages.supported.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={currentLanguage === lang ? 'bg-accent' : ''}
          >
            {languageNames[lang as keyof typeof languageNames]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}