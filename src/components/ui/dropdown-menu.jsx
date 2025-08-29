import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

// Inline SVG icons to replace lucide-react icons
const Check = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronRight = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Circle = (props) => (
  <svg
    {...props}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="6" />
  </svg>
);

const DropdownMenuContext = React.createContext();

const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <DropdownMenuContext.Provider value={{ open, toggleOpen, close }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef(({ children }, ref) => {
  const { toggleOpen } = React.useContext(DropdownMenuContext);
  return React.cloneElement(children, {
    ref,
    onClick: (e) => {
      e.preventDefault();
      toggleOpen();
    },
  });
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef(({ children, className }, ref) => {
  const { open, close } = React.useContext(DropdownMenuContext);
  const contentRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        close();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      ref={(node) => {
        contentRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(
        "absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50",
        className
      )}
    >
      {children}
    </div>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef(({ children, className, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        "block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
        className
      )}
      role="menuitem"
      tabIndex={-1}
    >
      {children}
    </div>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef(({ children, className }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-2 text-xs font-semibold text-gray-500 uppercase", className)}
  >
    {children}
  </div>
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef(({ className }, ref) => (
  <div
    ref={ref}
    className={cn("border-t border-gray-200 my-1", className)}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Check,
  ChevronRight,
  Circle,
};
