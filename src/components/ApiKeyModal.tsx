import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, Eye, EyeOff, X, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  initialValue?: string;
}

export function ApiKeyModal({ isOpen, onClose, onSave, initialValue = '' }: ApiKeyModalProps) {
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
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-2xl pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 p-1 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center text-center">
                {/* Icon Box */}
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-md border border-white/20 shadow-inner">
                  <Key className="h-12 w-12 text-white" />
                </div>

                <h2 className="mb-3 text-2xl font-bold tracking-tight">Setup Gemini API</h2>
                
                <p className="mb-1 text-sm text-white/90">
                  為了確保安全，請使用您自己的 API Key。
                </p>
                <p className="mb-8 text-xs text-white/70">
                  您的 Key 只會儲存在瀏覽器中，不會上傳至伺服器。
                </p>

                {/* Input Section */}
                <div className="w-full text-left mb-6">
                  <label className="block text-xs font-bold tracking-wider text-white/60 uppercase mb-2 ml-1">
                    GEMINI API KEY
                  </label>
                  <div className="relative group">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="輸入您的 Gemini API Key"
                      className="w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={handleSave}
                  disabled={!apiKey.trim()}
                  className="w-full mb-6 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 py-4 text-sm font-bold tracking-wide text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  開始使用
                </button>

                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors underline underline-offset-4 decoration-white/30"
                >
                  還沒有 Key? 點此免費獲取
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
