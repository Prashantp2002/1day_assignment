import { useEffect } from "react";
import { X } from "lucide-react";

function Modal({ isOpen, onClose, title, children }) {

  // Close when Escape is pressed
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);


  // Stop background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);


  // Don't render the modal when closed
  if (!isOpen) {
    return null;
  }


  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >

      {/* Modal panel */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg rounded-xl bg-white shadow-xl"
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

          <h2 className="font-display text-lg font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={20} strokeWidth={1.75} />
          </button>

        </div>


        {/* Modal content */}
        <div className="px-6 py-5">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Modal;