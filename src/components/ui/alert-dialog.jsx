import React, { useEffect } from "react";

function AlertDialog({ open, onOpenChange, children }) {
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
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function AlertDialogTrigger({ children, onClick }) {
  return React.cloneElement(children, { onClick });
}

function AlertDialogContent({ children }) {
  return <div>{children}</div>;
}

function AlertDialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

function AlertDialogTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function AlertDialogDescription({ children }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

function AlertDialogFooter({ children }) {
  return <div className="flex justify-end gap-2 mt-4">{children}</div>;
}

function AlertDialogAction({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function AlertDialogCancel({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
    >
      {children}
    </button>
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
