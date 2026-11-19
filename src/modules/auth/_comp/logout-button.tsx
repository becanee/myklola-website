"use client";

import { getPostbaseClient } from "@/services/postbase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          // notifyListeners(SIGNED_OUT, null) clears localStorage and POSTs
          // `{ session: null }` to syncEndpoint, which expires the cookie.
          await getPostbaseClient().auth.signOut();
          router.push("/login");
          router.refresh();
        })
      }
    >
      <LogOut className="size-3.5" />
      {isPending ? "Keluar…" : "Keluar"}
    </Button>
  );
}