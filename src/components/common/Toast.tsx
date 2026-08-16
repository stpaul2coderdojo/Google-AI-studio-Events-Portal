import React from 'react';
import { useDojo } from '../../context/DojoContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useDojo();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-sky-600 shrink-0" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/40 bg-[#111814]/95 text-[#e0e7e1]';
      case 'warning':
        return 'border-amber-500/40 bg-[#111814]/95 text-[#e0e7e1]';
      case 'error':
        return 'border-rose-500/40 bg-[#111814]/95 text-[#e0e7e1]';
      default:
        return 'border-sky-500/40 bg-[#111814]/95 text-[#e0e7e1]';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md ${getBorderColor(
              toast.type
            )}`}
            id={`toast-${toast.id}`}
          >
            {getIcon(toast.type)}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-tight text-[#e0e7e1]">{toast.title}</h4>
              <p className="text-xs mt-0.5 text-[#8c9e92] leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8c9e92] hover:text-[#e0e7e1] transition-colors p-1 -mr-1 -mt-1 rounded-md"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const Toast = ToastContainer;
