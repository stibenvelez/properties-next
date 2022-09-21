import { StarIcon } from "@heroicons/react/solid";
import React, { FC, useEffect } from "react";
import { useState } from "react";

export interface FiveStartIconForRateProps {
    className?: string;
    iconClass?: string;
    defaultPoint?: number;
    setNewComment?: any;
    newComment?: any;
}

const FiveStartIconForRate: FC<FiveStartIconForRateProps> = ({
    className = "",
    iconClass = "w-4 h-4",
    defaultPoint = 5,
    setNewComment,
    newComment,
}) => {
    const [currentHover, setCurrentHover] = useState(0);

    return (
        <div
            className={`nc-FiveStartIconForRate flex items-center text-neutral-300 ${className}`}
            data-nc-id="FiveStartIconForRate"
        >
            {[1, 2, 3, 4, 5].map((item) => {
                return (
                    <StarIcon
                        key={item}
                        className={`${
                            newComment.score >= item || currentHover >= item
                                ? "text-yellow-500"
                                : ""
                        } ${iconClass}`}
                        onMouseEnter={() => setCurrentHover(() => item)}
                        onMouseLeave={() => setCurrentHover(() => 0)}
                        onClick={() =>
                            setNewComment({
                                ...newComment,
                                score: item,
                            })
                        }
                    />
                );
            })}
        </div>
    );
};

export default FiveStartIconForRate;
