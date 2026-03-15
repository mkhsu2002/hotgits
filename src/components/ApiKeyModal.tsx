import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, Eye, EyeOff, X, ExternalLink } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  initialValue?: string;
}

export function ApiKeyModal({ isOpen, onClose, onSave, initialValue = '' }: ApiKeyModalProps) {
  const { t } = useI18n();
  const [apiKey, setApiKey] = useState(initialValue);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    setApiKey(initialValue);
  }, [initialValue, isOpen]);

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/20 pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 p-2 text-white/60 hover:text-white transition-all hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                {/* Icon Box */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <Key className="h-10 w-10 text-white" />
                </div>

                <h2 className="mb-2 text-2xl font-bold tracking-tight">{t.modal.title}</h2>
                
                <p className="mb-1 text-sm text-white/90 font-medium">
                  {t.modal.subtitle}
                </p>
                <p className="mb-8 text-[11px] text-white/70 leading-relaxed">
                  {t.modal.disclaimer}
                </p>

                {/* Input Section */}
                <div className="w-full text-left mb-6">
                  <label className="block text-[10px] font-bold tracking-widest text-white/50 uppercase mb-2 ml-1">
                    GEMINI API KEY
                  </label>
                  <div className="relative group">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={t.modal.placeholder}
                      className="w-full rounded-2xl bg-white/10 border border-white/10 px-5 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all backdrop-blur-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                      {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={handleSave}
                  disabled={!apiKey.trim()}
                  className="w-full mb-6 rounded-2xl bg-white text-indigo-600 hover:bg-white/90 py-4 text-sm font-bold tracking-wide transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  {t.modal.start}
                </button>

                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[11px] text-white/60 hover:text-white transition-all underline underline-offset-4 decoration-white/20 hover:decoration-white"
                >
                  {t.modal.no_key}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
