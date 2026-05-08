"use client";

import { LayoutDashboard, Mail, Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useState } from "react";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { Button } from "./ui/button";
import { ThemePicker } from "./theme/theme-picker";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { logoutAction } from "@/actions/logout";
import { useAuth } from "./auth/auth-context";

type User = {
  id: number;
  name: string;
  email: string;
  activated: boolean | null;
};

interface HamburgerMenuProps {
  user: User | null;
}

export function HamburgerMenu({ user }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const close = () => setIsOpen(false);

  const handleLogout = () => {
    startTransition(async () => {
      const { success } = await logoutAction();
      if (success) {
        setUser(null);
        close();
        router.replace("/login");
      }
    });
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="lg:hidden">
        <button aria-label="Otwórz menu">
          <Menu className="size-8" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="sr-only">Menu</DrawerTitle>
          <button
            className="ml-auto p-3"
            onClick={close}
            aria-label="Zamknij menu"
          >
            <X className="size-8" />
          </button>
        </DrawerHeader>

        <div className="flex flex-col gap-4 text-right ml-auto pt-8 px-3">
          <Link href="/" onClick={close}>
            <Typography size="h3" className={pathname === "/" ? "text-primary" : ""}>Strona główna</Typography>
          </Link>
          <Link href="/contact" onClick={close}>
            <Typography size="h3" className={pathname === "/contact" ? "text-primary" : ""}>Kontakt</Typography>
          </Link>
          {user && (
            <>
              <Link href="/dashboard" onClick={close}>
                <Typography size="h3" className={pathname === "/dashboard" ? "text-primary" : ""}>
                  Panel
                </Typography>
              </Link>
              <Link href="/dashboard/billing" onClick={close}>
                <Typography size="h3" className={pathname === "/dashboard/billing" ? "text-primary" : ""}>
                  Twój plan
                </Typography>
              </Link>
            </>
          )}
        </div>

        <DrawerFooter className="mt-auto flex flex-col items-end gap-4">
          <ThemePicker />
          {user ? (
            <div className="w-full flex flex-col items-end gap-2">
              <p className="text-sm text-muted-foreground">
                {user.name} ({user.email})
              </p>
              <Button
                size="lg"
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
                disabled={isPending}
              >
                Wyloguj się
              </Button>
            </div>
          ) : (
            <Link href="/login" className="w-full" onClick={close}>
              <Button size="lg" className="w-full">
                <Mail />
                Zaloguj się
              </Button>
            </Link>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
