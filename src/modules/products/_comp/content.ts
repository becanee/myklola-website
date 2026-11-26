import type { LucideIcon } from "lucide-react";
import {
  Archive,
  Banknote,
  BarChart3,
  Building2,
  CalendarCheck,
  Calculator,
  ClipboardCheck,
  Clock,
  FileCheck,
  FileText,
  Files,
  Filter,
  FolderOpen,
  Gauge,
  GitBranch,
  Handshake,
  History,
  LayoutGrid,
  ListChecks,
  MessageSquare,
  Network,
  PieChart,
  Receipt,
  Search,
  Target,
  TrendingDown,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

export type Feature = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export type ProductContent = {
  /** URL slug — also the folder name under `src/modules/products/`. */
  slug: "hris" | "payroll" | "pm" | "recplus";
  /** `01`–`04`, the module number shown in the eyebrow. */
  index: string;
  /** Short name used in nav, overview and captions. */
  name: string;
  /** Long name for metadata titles. */
  longName: string;
  /** One line for the overview's contents list. */
  summary: string;
  metaDescription: string;

  hero: {
    eyebrow: string;
    title: string[];
    subtitle: string;
    image: string;
    caption: string;
  };

  features: {
    eyebrow: string;
    statement: string;
    intro: string;
    items: Feature[];
  };

  cta: {
    title: string;
    body: string;
    image: string;
    objectPosition: string;
    caption: string;
  };
};

const ESS_TILES: Feature[] = [
  { title: "Cuti", body: "Saldo dan pengajuan", icon: CalendarCheck },
  { title: "Lembur", body: "Ajukan dan pantau", icon: Clock },
  { title: "Izin", body: "Surat dan persetujuan", icon: FileCheck },
  { title: "Kehadiran", body: "Riwayat harian", icon: UserCheck },
  { title: "Pengeluaran", body: "Klaim dan bukti", icon: Receipt },
  { title: "Ubah Shift", body: "Tukar jadwal", icon: GitBranch },
  { title: "Persetujuan", body: "Antrian atasan", icon: ListChecks },
];

export const ESS_CONTENT = {
  title: "Employee Self-Service, di dalam HRIS.",
  intro:
    "Karyawan mengurus kebutuhannya lewat myKlola; HR menerima pengajuan yang sudah rapi.",
  tiles: ESS_TILES,
  note: "Satu aplikasi myKlola untuk semua pengajuan.",
};

export const PRODUCTS: ProductContent[] = [
  {
    slug: "hris",
    index: "01",
    name: "HRIS",
    longName: "HRIS",
    summary:
      "Profil karyawan, struktur organisasi, kehadiran, dan laporan HR. Termasuk Employee Self-Service.",
    metaDescription:
      "HRIS Klola menyatukan data karyawan, struktur organisasi, kehadiran, dan laporan HR dalam satu catatan — termasuk Employee Self-Service.",
    hero: {
      eyebrow: "HRIS",
      title: ["Satu profil untuk", "setiap orang."],
      subtitle:
        "Data karyawan, struktur organisasi, kehadiran, dan laporan HR Manager ada di satu catatan yang sama. Termasuk Employee Self-Service untuk kebutuhan harian karyawan.",
      image: "/products/hris-hero.png",
      caption: "dasbor HR Manager",
    },
    features: {
      eyebrow: "Yang dicatat HR tiap hari",
      statement: "Yang dicatat HR tiap hari.",
      intro:
        "Enam hal yang paling sering dibuka tim HR — semuanya tersimpan di tempat yang sama, siap dipakai modul lain.",
      items: [
        {
          title: "Data Karyawan",
          body: "Identitas, kontrak, jabatan, dan riwayat kerja dalam satu profil.",
          icon: Users,
        },
        {
          title: "Struktur Organisasi",
          body: "Departemen, unit, dan garis pelaporan langsung terlihat di bagan.",
          icon: Network,
        },
        {
          title: "Kehadiran",
          body: "Rekap harian, keterlambatan, dan lembur siap dipakai payroll.",
          icon: CalendarCheck,
        },
        {
          title: "Rasio Perputaran Pegawai",
          body: "Status pegawai, komposisi jenis kelamin, dan turnover dalam satu dasbor.",
          icon: TrendingDown,
        },
        {
          title: "Dokumen & Administrasi",
          body: "Berkas kepegawaian tersimpan dan siap saat diaudit.",
          icon: FolderOpen,
        },
        {
          title: "Laporan HR",
          body: "Headcount, turnover, dan kehadiran per departemen tanpa disusun ulang tiap bulan.",
          icon: BarChart3,
        },
      ],
    },
    cta: {
      title: "Mulai dari data yang sudah rapi.",
      body: "Kami bantu memindahkan data karyawan Anda dan menyiapkan struktur organisasi pertama, sebelum modul lain berjalan.",
      image: "/products/hris-cta.png",
      objectPosition: "object-[38%_30%] lg:object-[54%_36%]",
      caption: "Karyawan membuka myKlola di ponsel",
    },
  },
  {
    slug: "payroll",
    index: "02",
    name: "Payroll",
    longName: "Payroll",
    summary:
      "Perhitungan gaji, PPh 21, dan berkas bulanan yang bisa ditelusuri.",
    metaDescription:
      "Payroll Klola menghitung gaji, PPh 21, dan berkas bulanan dari data kehadiran yang sama, dengan register yang bisa ditelusuri per karyawan.",
    hero: {
      eyebrow: "Payroll",
      title: ["Gaji yang bisa", "dipertanggungjawabkan."],
      subtitle:
        "Register payroll per karyawan, komponen gaji, PPh 21, dan berkas bulanan yang tersimpan rapi — Januari sampai Desember dalam satu arsip.",
      image: "/products/payroll-hero.png",
      caption: "register payroll bulanan",
    },
    features: {
      eyebrow: "Dari kehadiran ke slip gaji",
      statement: "Dari kehadiran ke slip gaji.",
      intro:
        "Perhitungan yang sama dipakai tim HR, finance, dan auditor — tidak ada angka yang disusun ulang di spreadsheet terpisah.",
      items: [
        {
          title: "Register Payroll",
          body: "Satu baris per karyawan: komponen, potongan, dan total bersih.",
          icon: Wallet,
        },
        {
          title: "Komponen Gaji",
          body: "Tunjangan, potongan, dan lembur dihitung dari data yang sama.",
          icon: Calculator,
        },
        {
          title: "PPh 21",
          body: "Perhitungan pajak penghasilan mengikuti aturan yang berlaku.",
          icon: Receipt,
        },
        {
          title: "Kehadiran ke Payroll",
          body: "Rekap kehadiran dan lembur langsung menjadi input perhitungan.",
          icon: CalendarCheck,
        },
        {
          title: "Berkas Bulanan",
          body: "Januari sampai Desember tersimpan dan bisa diunduh per periode.",
          icon: Files,
        },
        {
          title: "Riwayat Tahunan",
          body: "Buka kembali tahun sebelumnya untuk audit atau pertanyaan karyawan.",
          icon: History,
        },
      ],
    },
    cta: {
      title: "Payroll tanpa rekap ulang.",
      body: "Kirim data kehadiran bulan ini; kami tunjukkan bagaimana register, PPh 21, dan berkas bulanan terbentuk dari sumber yang sama.",
      image: "/products/payroll-cta.png",
      objectPosition: "object-[42%_26%] lg:object-[58%_30%]",
      caption: "Karyawan membuka myKlola di ponsel",
    },
  },
  {
    slug: "pm",
    index: "03",
    name: "Performance Management",
    longName: "Performance Management",
    summary:
      "9 Grid Matrix, siklus penilaian, dan data kinerja per departemen.",
    metaDescription:
      "Performance Management Klola memetakan kinerja dan potensi lewat 9 Grid Matrix, dengan siklus penilaian dan data per departemen dalam satu tampilan.",
    hero: {
      eyebrow: "Performance",
      title: ["Kinerja yang terlihat,", "bukan terasa."],
      subtitle:
        "9 Grid Matrix memetakan kinerja dan potensi tiap karyawan. Siklus penilaian, umpan balik, dan data per departemen ada dalam satu tampilan.",
      image: "/products/pm-hero.png",
      caption: "9 Grid Matrix",
    },
    features: {
      eyebrow: "Peta kinerja per orang, per departemen",
      statement: "Peta kinerja per orang, per departemen.",
      intro:
        "Dari sembilan kotak ke rencana tindak lanjut — supaya keputusan tentang orang berdiri di atas data, bukan ingatan.",
      items: [
        {
          title: "9 Grid Matrix",
          body: "Kinerja dan potensi dipetakan dalam sembilan kotak yang mudah dibaca.",
          icon: LayoutGrid,
        },
        {
          title: "Tujuan & Target",
          body: "Sasaran tiap orang tersambung ke tujuan unit dan perusahaan.",
          icon: Target,
        },
        {
          title: "Siklus Penilaian",
          body: "Periode review berjalan dengan tenggat dan status yang jelas.",
          icon: ClipboardCheck,
        },
        {
          title: "Umpan Balik",
          body: "Catatan atasan dan rekan tersimpan di profil karyawan.",
          icon: MessageSquare,
        },
        {
          title: "Data per Departemen",
          body: "Bandingkan sebaran kinerja antar unit tanpa spreadsheet terpisah.",
          icon: PieChart,
        },
        {
          title: "Rencana Tindak Lanjut",
          body: "Kotak bawah grid jadi daftar prioritas pengembangan.",
          icon: Gauge,
        },
      ],
    },
    cta: {
      title: "Nilai orang dengan data.",
      body: "Kami susun 9 Grid pertama bersama tim HR Anda, memakai data karyawan yang sudah ada.",
      image: "/products/pm-cta.png",
      objectPosition: "object-[40%_34%] lg:object-[50%_40%]",
      caption: "Karyawan membuka myKlola di ponsel",
    },
  },
  {
    slug: "recplus",
    index: "04",
    name: "Recruitment+",
    longName: "Recruitment+",
    summary:
      "Portal lowongan, filter kandidat, dan alur pendaftaran.",
    metaDescription:
      "Recruitment+ Klola memasang lowongan, menyaring kandidat berdasarkan fungsi dan jenis lowongan, dan menyimpan pendaftaran dalam satu alur.",
    hero: {
      eyebrow: "Recruitment+",
      title: ["Dari lowongan", "ke kandidat."],
      subtitle:
        "Recruitment+ memasang lowongan, menyaring kandidat berdasarkan fungsi dan jenis lowongan, lalu menyimpan pendaftaran di satu alur.",
      image: "/products/recplus-hero.png",
      caption: "portal karier",
    },
    features: {
      eyebrow: "Alur rekrutmen yang bisa diikuti",
      statement: "Alur rekrutmen yang bisa diikuti.",
      intro:
        "Dari halaman lowongan yang bisa dicari kandidat sampai daftar kandidat yang siap ditinjau — tanpa email bolak-balik.",
      items: [
        {
          title: "Portal Lowongan",
          body: "Halaman karier dengan pencarian dan daftar posisi yang sedang dibuka.",
          icon: Search,
        },
        {
          title: "Filter Kandidat",
          body: "Saring berdasarkan fungsi, jenis lowongan, dan privasi.",
          icon: Filter,
        },
        {
          title: "Pendaftaran Kandidat",
          body: "Formulir dan daftar berjalan tanpa email bolak-balik.",
          icon: UserPlus,
        },
        {
          title: "Status Seleksi",
          body: "Tahap tiap kandidat terlihat oleh perekrut dan hiring manager.",
          icon: ClipboardCheck,
        },
        {
          title: "Kolaborasi Perekrut",
          body: "Catatan dan keputusan tim tersimpan di posisi yang sama.",
          icon: Handshake,
        },
        {
          title: "Arsip Talenta",
          body: "Kandidat yang belum cocok tetap tersimpan untuk posisi berikutnya.",
          icon: Archive,
        },
      ],
    },
    cta: {
      title: "Isi posisi tanpa kehilangan kandidat.",
      body: "Kami tunjukkan bagaimana lowongan, filter, dan status seleksi bekerja bersama dengan data contoh.",
      image: "/products/recplus-cta.png",
      objectPosition: "object-[46%_28%] lg:object-[60%_32%]",
      caption: "Karyawan membuka myKlola di ponsel",
    },
  },
];

/** The connections table on the overview page. */
export const CONNECTIONS = [
  {
    name: "Recruitment+",
    receives: "lowongan & kandidat",
    emits: "profil karyawan baru",
    icon: UserPlus,
  },
  {
    name: "HRIS",
    receives: "profil, kehadiran, struktur",
    emits: "data untuk payroll & kinerja",
    icon: Building2,
  },
  {
    name: "Payroll",
    receives: "kehadiran & komponen gaji",
    emits: "slip dan berkas bulanan",
    icon: Banknote,
  },
  {
    name: "Performance",
    receives: "tujuan & hasil kerja",
    emits: "peta kinerja & tindak lanjut",
    icon: Target,
  },
] as const;

export function productBySlug(slug: ProductContent["slug"]) {
  const found = PRODUCTS.find((p) => p.slug === slug);
  if (!found) throw new Error(`Unknown product slug: ${slug}`);
  return found;
}
