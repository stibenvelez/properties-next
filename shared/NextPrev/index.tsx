import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React, { FC } from "react";
import twFocusClass from "../../helpers/twFocusClass";

export interface NextPrevProps {
  className?: string;
  currentPage?: number;
  totalPage?: number;
  btnClassName?: string;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  onlyNext?: boolean;
  onlyPrev?: boolean;
}

const NextPrev: FC<NextPrevProps> = ({
  className = "",
  onClickNext = () => {},
  onClickPrev = () => {},
  btnClassName = "w-10 h-10",
  onlyNext = false,
  onlyPrev = false,
}) => {
  return (
      <div
          className={`nc-NextPrev relative  flex items-center text-neutral-900 dark:text-neutral-300 ${className}`}
          data-nc-id="NextPrev"
          data-glide-el="controls"
      >
          {!onlyNext && (
              <button
                  className={`${btnClassName} ${
                      !onlyPrev ? "mr-[6px]" : ""
                  } bg-gray-50/70 hover:bg-gray-100  dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
                  onClick={onClickPrev}
                  title="Prev"
                  data-glide-dir="<"
              >
                  <ChevronLeftIcon className="text-white h-6 hover:text-primary-600" />
              </button>
          )}
          {!onlyPrev && (
              <button
                  className={`${btnClassName}  hover:bg-gray-100  bg-gray-50/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full text-indigo-600 flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
                  onClick={onClickNext}
                  title="Next"
                  data-glide-dir=">"
              >
                  <ChevronRightIcon className="text-white h-6 hover:text-primary-600" />
              </button>
          )}
      </div>
  );
};

export default NextPrev;
