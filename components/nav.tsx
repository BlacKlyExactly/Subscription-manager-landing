"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Typography } from "@/components/ui/typography";
import { Button } from "./ui/button";
import { CreditCard, LayoutDashboard, Mail } from "lucide-react";
import { ThemePicker } from "./theme/theme-picker";
import { HamburgerMenu } from "./hamburger-menu";
import { useAuth } from "./auth/auth-context";
import { UserNav } from "./auth/user-nav";
import { ProBadge } from "./pro-badge";

export function Nav() {
  const { user } = useAuth();

  return (
    <NavigationMenu className="flex justify-between lg:grid lg:grid-cols-3 w-full max-w-none px-6 md:px-0 md:max-w-6xl z-10 dark:bg-background/30 bg-background/50 py-3 lg:py-2 backdrop-blur-2xl lg:rounded-4xl lg:border lg:border-foreground/10 md:px-8">
      <NavigationMenuLink asChild className="hover:bg-transparent!">
        <Link href="/">
          <CreditCard className="text-background/70 dark:text-background/40 fill-primary size-6" />
          <Typography size="h4" as="p" className="text-primary">
            Logo
          </Typography>
        </Link>
      </NavigationMenuLink>
      <NavigationMenuList className="hidden lg:flex justify-center shrink-0">
        <NavigationMenuLink asChild>
          <Link href="/">Strona główna</Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link href="/contact">Kontakt</Link>
        </NavigationMenuLink>
        {!!user && (
          <NavigationMenuLink asChild>
            <Link href="/dashboard/billing">
              {user.plan !== "pro" ? (
                <>
                  Przejdź na <ProBadge />
                </>
              ) : (
                <>
                  <span className="bg-primary text-white p-0.75 rounded-md">
                    <CreditCard className="size-3" />
                  </span>
                  Twój plan
                </>
              )}
            </Link>
          </NavigationMenuLink>
        )}
      </NavigationMenuList>
      <NavigationMenuList className="gap-4 justify-end">
        <ThemePicker className="hidden lg:inline-flex" />
        {user ? (
          <>
            <UserNav />
            <Link href="/dashboard">
              <Button size="icon">
                <LayoutDashboard />
              </Button>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <Button>
              <Mail />
              Zaloguj się
            </Button>
          </Link>
        )}
        <HamburgerMenu user={user} />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
