import { FC } from "react";
import Button, { ButtonProps } from "../../shared/Button/Button";


export interface ButtonSecondaryProps extends ButtonProps {}

const ButtonSecondary: FC<ButtonSecondaryProps> = ({
  className = " ",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary font-medium border bg-white border-neutral-200 text-white dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
