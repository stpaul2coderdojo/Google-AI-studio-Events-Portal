import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-[#111814] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#2d3a30] text-[#e0e7e1]"
          id="confirmation-modal-dialog"
        >
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-xl shrink-0 ${
                isDestructive ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30' : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
              }`}
            >
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#e0e7e1] leading-tight">{title}</h3>
              <p className="text-sm text-[#8c9e92] mt-2 leading-relaxed">{message}</p>
            </div>
            <button
              onClick={onCancel}
              className="text-[#8c9e92] hover:text-[#e0e7e1] p-1 rounded-lg hover:bg-[#18221c]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#232f27]">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-[#c2d1c6] bg-[#18221c] hover:bg-[#223028] border border-[#2d3a30] rounded-xl transition-colors cursor-pointer"
              id="confirm-modal-cancel-btn"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onCancel();
              }}
              className={`px-4 py-2 text-sm font-semibold text-white rounded-xl transition-colors shadow-xs cursor-pointer ${
                isDestructive
                  ? 'bg-rose-600 hover:bg-rose-500 border border-rose-400/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/30'
              }`}
              id="confirm-modal-action-btn"
            >
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
