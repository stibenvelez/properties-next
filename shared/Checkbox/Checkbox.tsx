import React, { FC } from "react";

export interface CheckboxProps {
    label?: string;
    subLabel?: string;
    className?: string;
    name: string;
    defaultChecked?: boolean;
    onChange?: (checked: any) => void;
  checked?: any;
}

const Checkbox: FC<CheckboxProps> = ({
    subLabel = "",
    label = "",
    name,
    className = "",
    defaultChecked,
    onChange,
    checked,
}) => {
    return (
        <div className={`flex text-sm sm:text-base ${className}`}>
            <input
                id={name}
                name={name}
                type="checkbox"
                className="w-6 h-6 bg-white rounded focus:ring-action-primary text-primary-500 border-primary border-neutral-500 dark:bg-neutral-700 dark:checked:bg-primary-500 focus:ring-primary-500"
                defaultChecked={defaultChecked}
                onChange={(e) => onChange && onChange(e)}
                checked={checked}
            />
            {label && (
                <label
                    htmlFor={name}
                    className="ml-3.5 flex flex-col flex-1 justify-center"
                >
                    <span className=" text-neutral-900 dark:text-neutral-100">
                        {label}
                    </span>
                    {subLabel && (
                        <p className="mt-1 text-sm font-light text-neutral-500 dark:text-neutral-400">
                            {subLabel}
                        </p>
                    )}
                </label>
            )}
        </div>
    );
};

export default Checkbox;
