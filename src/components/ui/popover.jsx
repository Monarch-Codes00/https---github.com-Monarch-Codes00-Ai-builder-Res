import React, { useState, useRef, useEffect } from "react";

function Popover({ children }) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {React.Children.map(children, (child) => {
        if (child.type.displayName === "PopoverTrigger") {
          return React.cloneElement(child, { onClick: () => setOpen(!open) });
        }
        if (child.type.displayName === "PopoverContent") {
          return open ? (
            <div className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
              {child.props.children}
            </div>
          ) : null;
        }
        return child;
      })}
    </div>
  );
}

function PopoverTrigger({ children, onClick }) {
  return React.cloneElement(children, { onClick });
}
PopoverTrigger.displayName = "PopoverTrigger";

function PopoverContent({ children }) {
  return <div>{children}</div>;
}
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
