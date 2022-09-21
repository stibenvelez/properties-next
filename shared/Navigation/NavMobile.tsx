import ButtonClose from "../../shared/ButtonClose/ButtonClose";
import Logo from "../../shared/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "../../data/navigation";
import SocialsList from "../../shared/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/solid";
import SwitchDarkMode from "../../shared/SwitchDarkMode/SwitchDarkMode";
import Link from "next/link";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  onClickClose,
}) => {
  const _renderMenuChild = (item: NavItemType) => {
    return (
        <ul className="pb-1 pl-6 text-base nav-mobile-sub-menu">
            {item.children?.map((i, index) => (
                <Disclosure key={i.href + index} as="li">
                    <Link
                        href={{
                            pathname: i.href || undefined,
                        }}
                        className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
                    >
                        <span
                            className={!i.children ? "block w-full" : ""}
                            onClick={onClickClose}
                        >
                            {i.name}
                        </span>
                        {i.children && (
                            <span
                                className="flex-grow block"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Disclosure.Button
                                    as="span"
                                    className="flex justify-end flex-grow"
                                >
                                    <ChevronDownIcon
                                        className="w-4 h-4 ml-2 text-neutral-500"
                                        aria-hidden="true"
                                    />
                                </Disclosure.Button>
                            </span>
                        )}
                    </Link>
                    {i.children && (
                        <Disclosure.Panel>
                            {_renderMenuChild(i)}
                        </Disclosure.Panel>
                    )}
                </Disclosure>
            ))}
        </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <Link

          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={!item.children ? "block w-full" : ""}
            onClick={onClickClose}
          >
            {item.name}
          </span>
          {item.children && (
            <span
              className="flex-grow block"
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="w-4 h-4 ml-2 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  return (
    <div className="w-full h-screen max-w-sm py-2 overflow-y-auto transition transform bg-white divide-y-2 shadow-lg ring-1 dark:ring-neutral-700 dark:bg-neutral-900 divide-neutral-100 dark:divide-neutral-800">
      <div className="px-5 py-6">
        <Logo />
        <div className="flex flex-col mt-5 text-sm text-neutral-700 dark:text-neutral-300">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span>

          <div className="flex items-center justify-between mt-4">
            <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute p-1 right-2 top-2">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col px-2 py-6 space-y-1">
        {data.map(_renderItem)}
      </ul>
      <div className="flex items-center justify-between px-5 py-6 space-x-4">

      </div>
    </div>
  );
};

export default NavMobile;
