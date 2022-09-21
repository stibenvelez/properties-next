import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className = "border border-gray-400",
            sizeClass = "h-11 px-4 py-3",
            fontClass = "text-sm font-normal",
            rounded = "rounded-xl",
            children,
            type = "text",
            ...args
        },
        ref
    ) => {
        return (
            <input
                ref={ref}
                type={type}
                className={`block w-full border  focus:outline-2 focus:outline-indigo-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-600 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
                {...args}
            />
        );
    }
);

export default Input;
