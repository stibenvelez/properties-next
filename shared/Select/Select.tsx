import React, { FC, SelectHTMLAttributes } from "react";
import Label from "shared/Label";
import SpinnerButton from "shared/SpinnerButton/SpinnerButton";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement|HTMLInputElement|HTMLDivElement> {
  className?: string;
  sizeClass?: string;
  loading?: boolean;
}


const Select: FC<SelectProps> = ({
  className = "",
  sizeClass = "h-11",
  children,
  loading=false,
  ...args
}) => {
  if (loading) {
    return (
        <div
            className={`nc-Select ${sizeClass} ${className} flex border items-center w-full text-sm rounded-2xl border-neutral-200 focus:outline-primary-600 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 px-4 `}
          
        >
            <SpinnerButton />
        </div>
    );
  }
  return (
    <select
      className={`nc-Select ${sizeClass} ${className} border block w-full text-sm rounded-2xl border-neutral-200 focus:outline-primary-600 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 px-4 `}
      {...args}
    >
      {children}
    </select>
  );
};

export default Select;
