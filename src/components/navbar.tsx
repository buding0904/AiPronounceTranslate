import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { useContext } from "react";

import { ThemeSwitch } from "@/components/theme-switch";
import GithubIcon from "@/assets/icons/github.svg?react";
import SettingIcon from "@/assets/icons/setting.svg?react";
import appCtx from "@/context/app";

export const Navbar = () => {
  const { setShowSettingModal } = useContext(appCtx);

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={""} title="GitHub">
            <GithubIcon className="text-default-500" width={22} />
          </Link>
          <ThemeSwitch />
          <SettingIcon
            className="text-default-500 transition-opacity hover:opacity-80 cursor-pointer"
            width={22}
            onClick={() => setShowSettingModal(true)}
          />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
