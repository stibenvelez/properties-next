import Logo from "../../shared/Logo/Logo";
import SocialsList1 from "../../shared/SocialsList1/SocialsList1";
import { CustomLink } from "../../data/types";
import React from "react";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const Footer: React.FC = () => {

  return (
    <div className="relative py-24 border-t nc-Footer lg:py-32 border-neutral-200 dark:border-neutral-700">
      <div className="container flex justify-center">
        <div className="grid grid-cols-1 col-span-2 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="flex items-center col-span-2 md:col-span-3">
            <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
