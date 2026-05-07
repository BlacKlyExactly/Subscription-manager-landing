"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "./auth-context";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useTransition } from "react";
import { logoutAction } from "@/actions/logout";
import { Submit } from "../ui/submit";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const UserNav = () => {
  const [isPending, startTransition] = useTransition();
  const { user, setUser } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    startTransition(async () => {
      const { success } = await logoutAction();
      if (success) {
        setUser(null);
        router.replace("/login");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-4 bg-background">
        <DropdownMenuLabel className="p-0">
          <div className="flex flex-col">
            <span className="font-medium text-primary">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-4" />
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 w-full cursor-pointer"
          >
            <LayoutDashboard className="size-4" />
            Panel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem asChild>
          <Submit
            size="xs"
            onClick={handleLogout}
            variant="destructive"
            isPending={isPending}
            pendingText=""
          >
            Wyloguj
          </Submit>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
