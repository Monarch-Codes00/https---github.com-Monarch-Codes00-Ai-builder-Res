import React, { useEffect } from "react";

function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function DialogTrigger({ children, onClick }) {
  return React.cloneElement(children, { onClick });
}

function DialogContent({ children }) {
  return <div>{children}</div>;
}

function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function DialogDescription({ children }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
