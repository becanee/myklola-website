"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    try {
      await fetch("/api/v1/logout", { method: "POST" });
    } catch {
      // Navigation happens regardless — the route clears the cookies, and a
      // user who asked to leave must not be stranded on /dash by a dead
      // network request.
    }
    router.push("/");
    router.refresh();
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      aria-busy={pending}
      onClick={handleLogout}
    >
      <LogOut className="size-3.5" />
      {pending ? "Keluar…" : "Keluar"}
    </Button>
  );
}