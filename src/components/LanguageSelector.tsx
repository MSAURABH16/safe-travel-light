import { useState } from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          {selectedLanguage.native}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setSelectedLanguage(language)}
            className={selectedLanguage.code === language.code ? 'bg-accent' : ''}
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.native}</span>
              <span className="text-xs text-muted-foreground">{language.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}