import React, { useState } from "react";
import { FC } from "react";
import { useEffect } from "react";
import ClearDataButton from "./ClearDataButton";
import { useRef } from "react";

export interface LocationInputProps {
  defaultValue: string;
  onChange?: (value: string) => void;
  onInputDone?: (value: string) => void;
  placeHolder?: string;
  desc?: string;
  className?: string;
  autoFocus?: boolean;
}

const NeighborhoodInput: FC<LocationInputProps> = ({
  defaultValue,
  autoFocus = false,
  onChange,
  onInputDone,
  placeHolder = "Barrio",
  desc = "¿En qué barrio o localidad?",
  className = "nc-flex-1.5",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(defaultValue);
  const [showPopover, setShowPopover] = useState(autoFocus);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [showPopover]);

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };




  return (
      <div className={`relative flex ${className}`} ref={containerRef}>
          <div
              onClick={() => setShowPopover(true)}
              className={`flex flex-1 p-6 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
                  showPopover ? "nc-hero-field-focused" : ""
              }`}
          >
              <div className="text-neutral-300 dark:text-neutral-400">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="nc-icon-field"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                  </svg>
              </div>
              <div className="flex-grow">
                  <input
                      className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                      placeholder={placeHolder}
                      value={value}
                      autoFocus={showPopover}
                      onChange={(e) => setValue(e.currentTarget.value)}
                      ref={inputRef}
                  />
                  <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
                      <span className="line-clamp-1">
                          {!!value ? placeHolder : desc}
                      </span>
                  </span>
                  {value && showPopover && (
                      <ClearDataButton onClick={() => setValue("")} />
                  )}
              </div>
          </div>

      </div>
  );
};

export default NeighborhoodInput;
