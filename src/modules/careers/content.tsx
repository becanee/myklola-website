/**
 * Careers page content. Listings are dummy data — replace `JOBS` with the real
 * feed (or a server fetch) when the ATS endpoint exists.
 */

export type WorkMode = "WFH" | "WFO" | "Hybrid";
export type EmploymentType = "Full Time" | "Part Time" | "Freelance";
export type Category = "Karir" | "Magang";

export type Job = {
  id: string;
  title: string;
  department: string;
  category: Category;
  location: WorkMode;
  /** Monthly range, formatted for display. */
  salary: string;
  type: EmploymentType;
  posted: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const careerHero = {
  eyebrow: "Careers",
  title: ["Bangun Karir Anda,", "Ciptakan Solusi HR", "Terbaik Bersama Kami"],
  description:
    "Bergabunglah dengan tim kami untuk membangun teknologi yang membantu perusahaan memaksimalkan potensi tim mereka. Jika Anda memiliki dorongan untuk berinovasi dan menyukai tantangan, mari wujudkan solusi manajemen yang efektif dan terintegrasi bersama kami.",
  image: "/career-hero.png",
  imageAlt: "Dua anggota tim Klola menunjukkan aplikasi myKlola di ponsel",
  imageWidth: 722,
  imageHeight: 778,
};

export const WORK_MODES: WorkMode[] = ["WFH", "WFO", "Hybrid"];
export const EMPLOYMENT_TYPES: EmploymentType[] = [
  "Full Time",
  "Part Time",
  "Freelance",
];
export const CATEGORIES: Category[] = ["Karir", "Magang"];

export const JOBS: Job[] = [
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    category: "Karir",
    location: "Hybrid",
    salary: "IDR 12.000.000 – 20.000.000",
    type: "Full Time",
    posted: "2 hari lalu",
    summary:
      "Membangun antarmuka myKlola yang dipakai ratusan perusahaan setiap hari.",
    responsibilities: [
      "Mengembangkan fitur baru di aplikasi web myKlola dengan React dan TypeScript.",
      "Berkolaborasi dengan desainer untuk menerjemahkan rancangan menjadi antarmuka yang presisi.",
      "Menjaga performa dan aksesibilitas halaman yang dipakai ribuan karyawan.",
    ],
    requirements: [
      "Minimal 2 tahun pengalaman dengan React dan TypeScript.",
      "Pemahaman kuat tentang CSS, layout responsif, dan animasi.",
      "Terbiasa bekerja dengan Git dan alur review kode.",
    ],
  },
  {
    id: "payroll-specialist",
    title: "Payroll Specialist",
    department: "Payroll Operations",
    category: "Karir",
    location: "WFO",
    salary: "IDR 9.000.000 – 14.000.000",
    type: "Full Time",
    posted: "3 hari lalu",
    summary:
      "Memastikan perhitungan gaji klien akurat dan tepat waktu setiap bulan.",
    responsibilities: [
      "Memproses payroll bulanan klien sesuai tenggat yang disepakati.",
      "Menghitung PPh 21 dan iuran BPJS sesuai peraturan yang berlaku.",
      "Menjadi titik kontak klien untuk pertanyaan seputar slip gaji.",
    ],
    requirements: [
      "Minimal 2 tahun pengalaman payroll atau akuntansi.",
      "Memahami perhitungan PPh 21 dan BPJS Ketenagakerjaan.",
      "Teliti, disiplin tenggat, dan nyaman bekerja dengan data sensitif.",
    ],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    category: "Karir",
    location: "Hybrid",
    salary: "IDR 11.000.000 – 18.000.000",
    type: "Full Time",
    posted: "5 hari lalu",
    summary:
      "Merancang alur kerja HR yang terasa sederhana meski datanya rumit.",
    responsibilities: [
      "Meneliti kebutuhan pengguna bersama tim produk dan tim HR internal.",
      "Merancang alur, wireframe, dan prototipe untuk modul baru.",
      "Menjaga konsistensi sistem desain di seluruh produk.",
    ],
    requirements: [
      "Portofolio produk digital yang menunjukkan proses, bukan hanya hasil akhir.",
      "Mahir Figma dan terbiasa dengan design system.",
      "Mampu menjelaskan keputusan desain secara tertulis maupun lisan.",
    ],
  },
  {
    id: "hr-consultant",
    title: "HR Consultant",
    department: "Consulting",
    category: "Karir",
    location: "Hybrid",
    salary: "IDR 10.000.000 – 16.000.000",
    type: "Full Time",
    posted: "1 minggu lalu",
    summary:
      "Mendampingi klien menyusun kebijakan dan struktur SDM yang sehat.",
    responsibilities: [
      "Menganalisis kondisi SDM klien dan menyusun rekomendasi perbaikan.",
      "Membantu penyusunan struktur organisasi dan job description.",
      "Menjadi narasumber pada sesi implementasi dan pelatihan.",
    ],
    requirements: [
      "Minimal 3 tahun pengalaman di bidang HR, konsultan lebih diutamakan.",
      "Memahami regulasi ketenagakerjaan Indonesia.",
      "Kemampuan presentasi dan komunikasi yang baik.",
    ],
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    category: "Karir",
    location: "WFH",
    salary: "IDR 14.000.000 – 22.000.000",
    type: "Full Time",
    posted: "1 minggu lalu",
    summary:
      "Merancang layanan yang menangani data kepegawaian dengan aman.",
    responsibilities: [
      "Membangun dan memelihara API yang dipakai klien web dan mobile.",
      "Merancang skema data dan optimasi query untuk volume kepegawaian besar.",
      "Menjaga keamanan dan auditabilitas data yang bersifat sensitif.",
    ],
    requirements: [
      "Minimal 3 tahun pengalaman backend dengan SQL dan REST.",
      "Terbiasa menulis tes otomatis dan melakukan code review.",
      "Pemahaman tentang keamanan data dan dasar-dasar otorisasi.",
    ],
  },
  {
    id: "customer-success",
    title: "Customer Success Associate",
    department: "Customer Success",
    category: "Karir",
    location: "WFO",
    salary: "IDR 7.000.000 – 11.000.000",
    type: "Full Time",
    posted: "2 minggu lalu",
    summary:
      "Membantu klien baru mengadopsi myKlola dari hari pertama.",
    responsibilities: [
      "Memandu sesi onboarding untuk administrator klien baru.",
      "Menjawab pertanyaan klien dan meneruskan isu teknis ke tim terkait.",
      "Memantau penggunaan klien dan mengidentifikasi kebutuhan pelatihan.",
    ],
    requirements: [
      "Minimal 1 tahun pengalaman di customer success atau support.",
      "Sabar, teliti, dan nyaman berkomunikasi dengan banyak pemangku kepentingan.",
      "Terbiasa menggunakan CRM atau sistem tiket.",
    ],
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    department: "Engineering",
    category: "Karir",
    location: "WFH",
    salary: "IDR 9.000.000 – 15.000.000",
    type: "Full Time",
    posted: "2 minggu lalu",
    summary:
      "Menjaga agar setiap rilis payroll terbebas dari kesalahan perhitungan.",
    responsibilities: [
      "Menyusun test plan untuk modul baru dan perubahan yang ada.",
      "Menjalankan pengujian manual dan otomatis sebelum rilis.",
      "Mendokumentasikan dan memprioritaskan temuan bersama tim produk.",
    ],
    requirements: [
      "Minimal 2 tahun pengalaman QA perangkat lunak.",
      "Terbiasa dengan alat otomasi pengujian berbasis web.",
      "Detail-oriented dan mampu menyusun skenario uji yang tidak lazim.",
    ],
  },
  {
    id: "intern-frontend",
    title: "Frontend Engineering Intern",
    department: "Engineering",
    category: "Magang",
    location: "WFH",
    salary: "IDR 3.000.000 – 4.500.000",
    type: "Part Time",
    posted: "4 hari lalu",
    summary:
      "Belajar langsung dengan mengerjakan komponen yang benar-benar dipakai.",
    responsibilities: [
      "Mengerjakan komponen UI kecil dengan pendampingan mentor.",
      "Menulis dan memperbaiki unit test untuk komponen yang dikerjakan.",
      "Mengikuti sesi review kode mingguan bersama tim engineering.",
    ],
    requirements: [
      "Mahasiswa tingkat akhir atau lulusan baru bidang terkait.",
      "Mengenal HTML, CSS, dan dasar JavaScript.",
      "Bersedia magang minimal 3 bulan, 20 jam per minggu.",
    ],
  },
  {
    id: "intern-hr",
    title: "HR Operations Intern",
    department: "Payroll Operations",
    category: "Magang",
    location: "WFO",
    salary: "IDR 2.500.000 – 3.500.000",
    type: "Part Time",
    posted: "1 minggu lalu",
    summary:
      "Membantu tim operasional menyiapkan data dan dokumen kepegawaian klien.",
    responsibilities: [
      "Merapikan dan memverifikasi berkas kepegawaian klien.",
      "Membantu tim payroll menyiapkan data sebelum siklus bulanan.",
      "Mendukung administrasi sesi onboarding klien baru.",
    ],
    requirements: [
      "Mahasiswa aktif bidang manajemen, akuntansi, atau psikologi.",
      "Teliti dengan angka dan nyaman bekerja dengan spreadsheet.",
      "Bersedia magang minimal 3 bulan di kantor Jakarta.",
    ],
  },
  {
    id: "freelance-content",
    title: "Content Writer (Freelance)",
    department: "Marketing",
    category: "Karir",
    location: "WFH",
    salary: "IDR 4.000.000 – 7.000.000",
    type: "Freelance",
    posted: "3 minggu lalu",
    summary:
      "Menulis materi yang menjelaskan topik HR Indonesia dengan bahasa jernih.",
    responsibilities: [
      "Menulis artikel, panduan, dan materi produk dalam Bahasa Indonesia.",
      "Bekerja dengan tim produk untuk memastikan akurasi teknis.",
      "Menyesuaikan gaya penulisan dengan panduan merek Klola.",
    ],
    requirements: [
      "Portofolio tulisan seputar HR, bisnis, atau teknologi.",
      "Mampu menyederhanakan topik regulasi menjadi bahasa awam.",
      "Ketersediaan minimal 2 artikel per minggu.",
    ],
  },
];
