"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Typography } from "@/lib/components/ui/typography";
import { Button } from "./ui/button";
import { Check, CreditCard, Mail } from "lucide-react";
import { ThemePicker } from "./theme/theme-picker";
import { HamburgerMenu } from "./hamburger-menu";

export function Nav() {
  return (
    <NavigationMenu className="justify-between w-full max-w-none px-6 md:px-0 md:max-w-6xl z-10 dark:bg-background/30 bg-background/50 py-3 lg:py-2 backdrop-blur-2xl lg:rounded-full lg:border lg:border-foreground/10 md:px-8">
      <NavigationMenuLink asChild className="w-58 hover:bg-transparent">
        <Link href="/docs">
          <CreditCard className="text-background/70 dark:text-background/40 fill-primary size-6" />
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
      <NavigationMenuList className="gap-4">
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
