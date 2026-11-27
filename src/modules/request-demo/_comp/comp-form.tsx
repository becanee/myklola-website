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
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Briefcase, Building2, Check, Mail, Phone, User } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

/**
 * Same field system as `modules/contacts/_comp/comp-form.tsx`: beUI `Input`
 * driven by `value`/`onChange(string)`, `MorphSelect` for the one dropdown,
 * a reserved error line per field, and a success state after submit.
 */

export const INDUSTRIES = [
  "Perbankan & Jasa Keuangan",
  "Manufaktur",
  "Teknologi & Telekomunikasi",
  "Ritel & FMCG",
  "Energi & Pertambangan",
  "Konstruksi & Properti",
  "Kesehatan",
  "Pendidikan",
  "Minyak & Gas",
  "Jasa Profesional & Konsultan",
  "Lainnya",
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  jobTitle: z.string().min(2, "Jabatan minimal 2 karakter"),
  company: z.string().min(2, "Nama perusahaan minimal 2 karakter"),
  industry: z.string().min(1, "Silakan pilih bidang perusahaan"),
  email: z.string().email("Format email tidak valid"),
  phone: z
    .string()
    .min(8, "Nomor telepon minimal 8 digit")
    .regex(/^[0-9+\-()\s]+$/, "Gunakan angka, spasi, +, -, atau ( ) saja"),
  agree: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui sebelum mengirim",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function RequestDemoForm() {
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
      jobTitle: "",
      company: "",
      industry: "",
      email: "",
      phone: "",
      agree: false,
    },
    mode: "onChange",
  });

  const industry = watch("industry");
  const agreed = watch("agree");
  const isSubmitting = isPending;

  const onSubmit = (data: FormData) => {
    setResult(null);
    startTransition(async () => {
      // ponytail: no backend yet — validates and shows the success state only.
      // Add `await fetch("/api/v1/request-demo", {...})` here when the API lands.
      setResult("success");
      reset({ agree: false });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Nama Lengkap */}
      <Input
        placeholder="Nama lengkap Anda"
        autoComplete="name"
        disabled={isSubmitting}
        onChange={(v: string) => setValue("name", v, { shouldValidate: true })}
        value={watch("name")}
        leftIcon={<User className="h-4 w-4" />}
        label="Nama Lengkap *"
        error={errors.name?.message || false}
        reserveErrorLine
      />

      {/* Jabatan */}
      <Input
        placeholder="cth. HR Manager"
        autoComplete="organization-title"
        disabled={isSubmitting}
        onChange={(v: string) => setValue("jobTitle", v, { shouldValidate: true })}
        value={watch("jobTitle")}
        leftIcon={<Briefcase className="h-4 w-4" />}
        label="Jabatan *"
        error={errors.jobTitle?.message || false}
        reserveErrorLine
      />

      {/* Nama Perusahaan */}
      <Input
        placeholder="Nama perusahaan"
        autoComplete="organization"
        disabled={isSubmitting}
        onChange={(v: string) => setValue("company", v, { shouldValidate: true })}
        value={watch("company")}
        leftIcon={<Building2 className="h-4 w-4" />}
        label="Nama Perusahaan *"
        error={errors.company?.message || false}
        reserveErrorLine
      />

      {/* Bidang Perusahaan */}
      <div>
        <Label className="text-sm text-foreground/80">
          Bidang Perusahaan <span className="text-destructive">*</span>
        </Label>
        <MorphSelect
          value={industry}
          disabled={isSubmitting}
          onValueChange={(v) => setValue("industry", v, { shouldValidate: true })}
        >
          <MorphSelectTrigger className="mt-2">
            <MorphSelectValue placeholder="— Pilih bidang perusahaan —" />
          </MorphSelectTrigger>
          <MorphSelectContent className="max-h-[240px] overflow-y-auto">
            {INDUSTRIES.map((option) => (
              <MorphSelectItem key={option} value={option}>
                {option}
              </MorphSelectItem>
            ))}
          </MorphSelectContent>
        </MorphSelect>
        {/* Reserve the same error line the inputs use, so this field keeps
            their vertical rhythm instead of sitting flush under the one above. */}
        <p className="mt-1.5 min-h-4 text-xs text-destructive flex items-center gap-1">
          {errors.industry && (
            <>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.industry.message}
            </>
          )}
        </p>
      </div>

      {/* Email */}
      <Input
        type="email"
        placeholder="anda@perusahaan.com"
        autoComplete="email"
        leftIcon={<Mail className="w-4 h-4" />}
        disabled={isSubmitting}
        onChange={(v: string) => setValue("email", v, { shouldValidate: true })}
        value={watch("email")}
        label="Email *"
        error={errors.email?.message || false}
        reserveErrorLine
      />

      {/* No Telepon */}
      <Input
        type="tel"
        inputMode="tel"
        placeholder="+62 812 3456 7890"
        autoComplete="tel"
        leftIcon={<Phone className="w-4 h-4" />}
        disabled={isSubmitting}
        onChange={(v: string) => setValue("phone", v, { shouldValidate: true })}
        value={watch("phone")}
        label="No Telepon *"
        error={errors.phone?.message || false}
        reserveErrorLine
      />

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
          Saya setuju bahwa informasi yang saya berikan hanya akan digunakan
          untuk mengatur demo ini oleh tim Klola.
        </label>
      </div>
      {errors.agree && (
        <p className="-mt-3 text-xs text-destructive">{errors.agree.message}</p>
      )}

      {/* Result banner */}
      {result === "success" && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          Terima kasih. Tim kami akan menghubungi Anda dalam 1 hari kerja untuk
          menjadwalkan demo.
        </div>
      )}
      {result === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung di
          support@myklola.cloud.
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-11 w-full"
      >
        {isSubmitting ? "Mengirim..." : "Minta demo"}
      </Button>
    </form>
  );
}
