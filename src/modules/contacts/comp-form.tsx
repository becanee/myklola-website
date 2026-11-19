"use client";

import { Input } from "@/components/motion/input";
import {
  MorphSelect,
  MorphSelectContent,
  MorphSelectItem,
  MorphSelectTrigger,
  MorphSelectValue,
} from "@/components/motion/select-morph";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, Mail } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  agree: z.boolean().refine(val => val === true, {
    message: "You must agree before submitting",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
      agree: false,
    },
    mode: "onChange",
  });

  const category = watch("category");
  const agreed = watch("agree");
  const isSubmitting = isPending;

  // Extract error strings for beUI motion input
  const nameError = errors.name?.message || false;
  const subjectError = errors.subject?.message || false;
  const emailError = errors.email?.message || false;
  const categoryError = errors.category?.message || false;
  const messageError = errors.message?.message || false;

  const onSubmit = (data: FormData) => {
    setResult(null);
    startTransition(async () => {
      // ponytail: no backend yet — validates and shows the success state only.
      // Add `await fetch("/api/v1/contact", {...})` here when the API returns.
      setResult("success");
      reset({ agree: false });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name */}
      <Input
        placeholder="Your name"
        autoComplete="name"
        disabled={isSubmitting}
        onChange={(v: string) => setValue("name", v, { shouldValidate: true })}
        value={watch("name")}
        label="Full name *"
        error={nameError}
        reserveErrorLine
      />

      {/* Subject */}
      <Input
        placeholder="Brief summary of your inquiry"
        disabled={isSubmitting}
        onChange={(v: string) =>
          setValue("subject", v, { shouldValidate: true })
        }
        value={watch("subject")}
        label="Subject *"
        error={subjectError}
        reserveErrorLine
      />

      {/* Email */}
      <Input
        type="email"
        placeholder="your-email@example.com"
        autoComplete="email"
        leftIcon={<Mail className="w-4 h-4" />}
        disabled={isSubmitting}
        onChange={(v: string) => setValue("email", v, { shouldValidate: true })}
        value={watch("email")}
        label="Email *"
        error={emailError}
        reserveErrorLine
      />

      {/* Category */}
      <div>
        <Label className="text-sm text-foreground/80">
          Category <span className="text-destructive">*</span>
        </Label>
        <MorphSelect
          value={category}
          disabled={isSubmitting}
          onValueChange={(v) => setValue("category", v)}
        >
          <MorphSelectTrigger className="mt-2">
            <MorphSelectValue placeholder="— Select a category —" />
          </MorphSelectTrigger>
          <MorphSelectContent className="max-h-[240px] overflow-y-auto">
            <MorphSelectItem value="teknis">Technical issue</MorphSelectItem>
            <MorphSelectItem value="billing">Billing & payment</MorphSelectItem>
            <MorphSelectItem value="produk">Product question</MorphSelectItem>
            <MorphSelectItem value="fitur">Feature suggestion</MorphSelectItem>
            <MorphSelectItem value="lainnya">Other</MorphSelectItem>
          </MorphSelectContent>
        </MorphSelect>
        {errors.category && (
          <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message" className="text-sm text-foreground/80">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Briefly describe your needs..."
          rows={12}
          className="mt-2"
          {...{
            onChange: (e) =>
              setValue("message", e.target.value, { shouldValidate: true }),
          }}
          value={watch("message")}
          aria-invalid={!!messageError}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Agreement */}
      <div className="flex items-start gap-2 pt-1">
        <Checkbox
          id="agree"
          checked={agreed}
          disabled={isSubmitting}
          onCheckedChange={(checked) => setValue("agree", checked === true)}
        />
        <label
          htmlFor="agree"
          className="text-xs leading-relaxed text-muted-foreground cursor-pointer"
        >
          I agree that the information I provide will only be used to respond to
          my inquiry by the Klola team.
        </label>
      </div>
      {errors.agree && (
        <p className="-mt-3 text-xs text-destructive">{errors.agree.message}</p>
      )}

      {/* Result banner */}
      {result === "success" && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          Your message has been sent successfully. Our team will respond within
          1 business day.
        </div>
      )}
      {result === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try again or contact us directly at
          support@myklola.cloud.
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-11 w-full"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}