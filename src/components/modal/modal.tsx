"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  buttonSubmit?: string;
  submitButtonClass?: string;
}

function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  buttonSubmit = "تایید",
  submitButtonClass = "bg-blue-600 hover:bg-blue-700",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-md animate-fade-in-scale">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="text-gray-700 mb-6">{children}</div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors ml-3"
          >
            لغو
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white transition-colors ${submitButtonClass}`}
          >
            {buttonSubmit}
          </button>
        </div>
      </div>
    </div>
  );
}

export { Modal };
