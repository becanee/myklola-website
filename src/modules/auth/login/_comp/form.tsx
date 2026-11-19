"use client";

import { Input } from "@/components/motion/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EASE_OUT, SPRING_PRESS } from "@/lib/ease";
import { getPostbaseClient } from "@/services/postbase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EASE = EASE_OUT;

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const reduce = useReducedMotion();
  // Branch on duration, never on `initial`: the server can't know the user's
  // motion preference, so branching the start state breaks hydration.
  const dur = (d: number) => (reduce ? 0 : d);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<"error" | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    setResult(null);
    startTransition(async () => {
      // Anything thrown here — misconfigured env, network failure, a Postbase
      // outage — would otherwise escape into the error boundary and replace
      // the whole page with "This page couldn't load". A failed sign-in is a
      // form state, not a page failure.
      try {
        const { error } = await getPostbaseClient().auth.signInWithPassword({
          email: data.email,
          password: data.password,
          rememberMe: data.remember,
        });

        if (error) {
          setResult("error");
          return;
        }

        router.push("/dash");
        router.refresh();
      } catch (err) {
        // Must not rethrow: an async startTransition callback has no boundary
        // above it, so throwing here replaces the page with Next's error UI.
        console.error("[login] sign-in failed", err);
        setResult("error");
        throw err; // rethrow for Sentry, etc. to catch, but not for the user to see
      }
    });
  };

  const busy = isSubmitting || isPending;

  return (
    <div className="w-full max-w-[420px]">
      {/* Eyebrow — mirrors the numbered sections on the landing page */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur(0.6), ease: EASE }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-8 bg-foreground/30" />
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Sign in
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur(0.7), delay: dur(0.06), ease: EASE }}
        className="mt-5 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-tight text-foreground"
      >
        Welcome back
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur(0.7), delay: dur(0.12), ease: EASE }}
        className="mt-3 text-sm leading-relaxed text-muted-foreground"
      >
        Enter your credentials to reach your Klola workspace.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur(0.7), delay: dur(0.18), ease: EASE }}
        className="mt-9 space-y-4"
      >
        <Input
          type="email"
          label="Work email *"
          placeholder="you@company.com"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
          disabled={busy}
          value={watch("email")}
          onChange={(v) => setValue("email", v, { shouldValidate: true })}
          error={errors.email?.message || false}
          reserveErrorLine
        />

        <Input
          type={showPassword ? "text" : "password"}
          label="Password *"
          placeholder="••••••••"
          autoComplete="current-password"
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          disabled={busy}
          value={watch("password")}
          onChange={(v) => setValue("password", v, { shouldValidate: true })}
          error={errors.password?.message || false}
          reserveErrorLine
        />

        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={watch("remember")}
              disabled={busy}
              onCheckedChange={(c) =>
                setValue("remember", c === true, { shouldValidate: true })
              }
            />
            <label
              htmlFor="remember"
              className="cursor-pointer text-xs leading-none text-muted-foreground"
            >
              Keep me signed in
            </label>
          </div>
          <a
            href="#"
            className="text-xs text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <AnimatePresence initial={false}>
          {result === "error" && (
            <motion.div
              role="alert"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="flex items-start gap-2 rounded-sm border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs leading-relaxed text-destructive"
            >
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Couldn&apos;t sign you in. Check your email and password, or
              contact your administrator.
            </motion.div>
          )}
        </AnimatePresence>

        {/* ponytail: submit is wired to nothing yet, so it is not disabled
            while idle — re-enable the busy lock with the real auth call. */}
        <motion.div whileTap={{ scale: 0.99 }} transition={SPRING_PRESS}>
          <Button
            type="submit"
            disabled={busy}
            className="h-11 w-full text-sm"
            aria-busy={busy}
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </motion.div>
      </motion.form>

      <motion.div
        transition={{ duration: dur(0.7), delay: dur(0.32) }}
        className="mt-8 border-t border-foreground/10 pt-6 text-xs leading-relaxed text-muted-foreground"
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/contact"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Talk to us
        </Link>{" "}
        — access is provisioned by administrator.
      </motion.div>
    </div>
  );
}