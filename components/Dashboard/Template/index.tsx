import { UserAddIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, Fragment } from "react";
import ButtonGoBack from "shared/ButtonGoBack";

interface Template {
    title: string;
    description?: string;
    children: JSX.Element;
}

const Template: FC<Template> = ({ children, title, description }) => {
       const router = useRouter();
    return (
        <div className=" dark:bg-neutral-900">
            <div className="container pt-2 sm:pt-4 pb-24 lg:pb-32 space-y-2">
                <div>
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-gray-600">{description}</p>
                </div>


                {children}
            </div>
        </div>
    );
};

export default Template;
