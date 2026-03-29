"use client";

import { Mail, Menu, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { useState } from "react";
import Link from "next/link";
import { Typography } from "@/lib/components/ui/typography";
import { Button } from "./ui/button";
import { ThemePicker } from "./theme/theme-picker";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="lg:hidden">
        <button aria-label="Otwórz menu">
          <Menu className="size-8" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Menu</DrawerTitle>
        <button className="ml-auto p-3" onClick={() => setIsOpen(false)} aria-label="Zamknij menu">
          <X className="size-8" />
        </button>
        <div className="flex flex-col gap-4 text-right ml-auto pt-8 px-3">
          <Link href="/docs">
            <Typography size="h3">Strona główna</Typography>
          </Link>
          <Link href="/docs">
            <Typography size="h3">Funkcje</Typography>
          </Link>
          <Link href="/docs">
            <Typography size="h3">Cennik</Typography>
          </Link>
        </div>
        <div className="mt-auto flex flex-col items-end gap-4">
          <ThemePicker />
          <Button size="lg" className="w-full">
            <Mail />
            Zaloguj się
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
