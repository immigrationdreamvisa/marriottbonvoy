import React, { useState } from 'react';
import { X, Globe, Check } from 'lucide-react';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [selectedCurrency, setSelectedCurrency] = useState('USD ($)');

  if (!isOpen) return null;

  const languages = [
    'English (US)',
    'English (UK)',
    'Español',
    'Français',
    'Deutsch',
    'Italiano',
    '日本語',
    '简体中文',
    'Português'
  ];

  const currencies = [
    'USD ($) - US Dollar',
    'EUR (€) - Euro',
    'GBP (£) - British Pound',
    'JPY (¥) - Japanese Yen',
    'CAD ($) - Canadian Dollar',
    'AUD ($) - Australian Dollar',
    'CHF (CHF) - Swiss Franc'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-[#8a1538]" />
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Language & Currency
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          Select your regional language and display currency preferences.
        </p>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-700 font-semibold mb-2">Preferred Language</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {languages.map(lang => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    selectedLanguage === lang
                      ? 'border-[#8a1538] bg-[#8a1538]/5 font-semibold text-[#8a1538]'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{lang}</span>
                  {selectedLanguage === lang && <Check className="w-3.5 h-3.5 text-[#8a1538]" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-2">Display Currency</label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {currencies.map(curr => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setSelectedCurrency(curr)}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    selectedCurrency === curr
                      ? 'border-[#8a1538] bg-[#8a1538]/5 font-semibold text-[#8a1538]'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{curr}</span>
                  {selectedCurrency === curr && <Check className="w-3.5 h-3.5 text-[#8a1538]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#8a1538] hover:bg-[#6b102c] text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
