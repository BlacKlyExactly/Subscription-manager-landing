"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "./ui/navigation-menu";
import { Typography } from "@/lib/components/ui/typography";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { ThemePicker } from "./theme/theme-picker";
import { useMounted } from "@/hooks/use-mounted";
import { HamburgerMenu } from "./hamburger-menu";

export function Nav() {
  const mounted = useMounted()
  if (!mounted) return null;

  return (
    <NavigationMenu className="justify-between w-full max-w-none">
      <NavigationMenuLink asChild className="w-58 hover:bg-transparent">
        <Link href="/docs">
          <Typography size="h4" as="p" className="text-primary">
            Logo
          </Typography>
        </Link>
      </NavigationMenuLink>
      <NavigationMenuList className="hidden lg:flex">
        <NavigationMenuLink asChild>
          <Link href="/docs">Strona główna</Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link href="/docs">Funkcje</Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link href="/docs">Cennik</Link>
        </NavigationMenuLink>
      </NavigationMenuList>
      <NavigationMenuList className="gap-8">
        <ThemePicker className="hidden lg:inline-flex" />
        <Button>
          <Mail />
          Zaloguj się
        </Button>
        <HamburgerMenu />
      </NavigationMenuList>
    </NavigationMenu>
  )
}
