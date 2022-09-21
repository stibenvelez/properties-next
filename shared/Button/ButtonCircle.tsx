import React, { ButtonHTMLAttributes } from "react";
import twFocusClass from "../../helpers/twFocusClass";

export interface ButtonCircleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}

const ButtonCircle: React.FC<ButtonCircleProps> = ({
  className = "",
  size = " w-9 h-9 ",
  ...args
}) => {
  return (
    <button
      className={
        `ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-indigo-600 hover:bg-primary-700 text-neutral-50 ${className} ${size} ` +
        twFocusClass(true)
      }
      {...args}
    />
  );
};

export default ButtonCircle;
