import Button, { ButtonProps } from "../../shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={` hover:bg-indigo-700 text-gray-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
