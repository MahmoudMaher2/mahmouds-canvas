// ── Types ─────────────────────────────────────────────────────────────────────

export type SummaryCategory =
  | "All"
  | "ISTQB"
  | "Mobile"
  | "Embedded"
  | "College"
  | "Platform";

export type SummaryType = "PDF" | "Website" | "Folder" | "Book";

export interface Summary {
  id: number;
  title: string;
  description: string;
  image: string;
  imageWebp: string;      // optimized WebP for card thumbnails
  imageOriginal: string;  // original for dialog full-res preview
  link: string;
  category: SummaryCategory;
  type: SummaryType;
  downloadable: boolean;
  featured?: boolean;
  showOnHome?: boolean;
  tags?: string[];
  mentions?: { name: string; profileLink: string }[];
  references?: { title: string; url: string }[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const summaries: Summary[] = [
  {
    id: 1,
    title: "Test Genius",
    description:
      "Prepare, Practice, Pass. A specialized platform offering simulated ISTQB exams to enhance software testing skills.",
    image: "/Summaries/webp/Test Genius.webp",
    imageWebp: "/Summaries/webp/Test Genius.webp",
    imageOriginal: "/Summaries/Test Genius.png",
    link: "https://istqb.top",
    category: "Platform",
    type: "Website",
    downloadable: false,
    featured: false,
    showOnHome: true,
    tags: ["ISTQB", "Practice", "Exams"],
    references: [
      { title: "ISTQB Official Exams", url: "https://istqb.org/" },
    ],
  },
  {
    id: 2,
    title: "ISTQB FL V4.0",
    description:
      "Comprehensive ISTQB Foundation Level (FL) V4.0 syllabus summary with clear explanations and practice questions from sample exams.",
    image: "/Summaries/webp/ISTQB FL Summary.webp",
    imageWebp: "/Summaries/webp/ISTQB FL Summary.webp",
    imageOriginal: "/Summaries/ISTQB FL Summary.jpg",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7347600961898475520/",
    category: "ISTQB",
    type: "PDF",
    downloadable: true,
    featured: false,
    showOnHome: true,
    tags: ["Foundation Level", "V4.0", "Syllabus"],
    mentions: [
      {
        name: "Eng. Rania Mokhtar",
        profileLink: "https://www.linkedin.com/in/rania-mokhtar-268a07178/",
      },
      {
        name: "Eng. Tarek Rushdy",
        profileLink: "https://www.linkedin.com/in/tarekroshdy/",
      },
    ],
    references: [
      {
        title: "ISTQB Official Syllabus",
        url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/",
      },
      {
        title: "ISTQB V4.0 By Eng. Rania Mokhtar",
        url: "https://www.youtube.com/playlist?list=PL594OqWI4Um7Uk6utSPMBoMqTd7odsSr_",
      },
      {
        title: "ISTQB V4.0 By Eng. Tarek Rushdy",
        url: "https://www.udemy.com/course/foundation-level-training/",
      },
    ],
  },
  {
    id: 3,
    title: "ISTQB FL V4.0 Sample Exams",
    description:
      "A compiled collection of ISTQB Foundation Level v4.0 sample exam questions from official sample exams — questions only, no answers, for self-practice.",
    image: "/Summaries/webp/ISTQB FL Q.webp",
    imageWebp: "/Summaries/webp/ISTQB FL Q.webp",
    imageOriginal: "/Summaries/ISTQB FL Q.png",
    link: "https://drive.google.com/file/d/1ARIhlWtDtsbzEpLdSuxieutx2wiqnHad/view?usp=drive_link",
    category: "ISTQB",
    type: "PDF",
    downloadable: true,
    showOnHome: true,
    tags: ["Sample Exams", "Practice", "Questions"],
    references: [
      {
        title: "ISTQB Official Sample Exams",
        url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/",
      },
    ],
  },
  {
    id: 4,
    title: "ISTQB MAT V1",
    description:
      "Comprehensive ISTQB Mobile Application Testing (MAT) syllabus summary with clear explanations and practice questions from sample exams.",
    image: "/Summaries/webp/MAT Mocup.webp",
    imageWebp: "/Summaries/webp/MAT Mocup.webp",
    imageOriginal: "/Summaries/MAT Mocup.png",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7372632879018717184/",
    category: "Mobile",
    type: "PDF",
    downloadable: true,
    featured: false,
    showOnHome: true,
    tags: ["Mobile Testing", "MAT", "Syllabus"],
    mentions: [
      {
        name: "Eng. Rania Mokhtar",
        profileLink: "https://www.linkedin.com/in/rania-mokhtar-268a07178/",
      },
      {
        name: "Eng. Tarek Rushdy",
        profileLink: "https://www.linkedin.com/in/tarekroshdy/",
      },
    ],
    references: [
      {
        title: "ISTQB Official Syllabus",
        url: "https://istqb.org/certifications/certified-tester-mobile-application-testing-ct-mat/",
      },
      {
        title: "ISTQB MAT By Eng. Rania Mokhtar",
        url: "https://www.youtube.com/playlist?list=PL594OqWI4Um7A4MHHeQoRL6AquHHovTUi",
      },
      {
        title: "ISTQB MAT By Eng. Tarek Rushdy",
        url: "https://www.udemy.com/course/istqb-mobile-tester/?couponCode=ACCAGE0923",
      },
    ],
  },
  {
    id: 5,
    title: "Part One Embedded Systems",
    description:
      "Part one of an Embedded Systems Diploma — focuses on mastering C programming, Data Structures, and Algorithms.",
    image: "/Summaries/webp/Part One Embedded.webp",
    imageWebp: "/Summaries/webp/Part One Embedded.webp",
    imageOriginal: "/Summaries/Part One Embedded.jpg",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7209553266966245376/",
    category: "Embedded",
    type: "PDF",
    downloadable: true,
    featured: false,
    showOnHome: false,
    tags: ["C Programming", "Data Structures", "Algorithms"],
    mentions: [
      {
        name: "Eng. Ahmed Abd ElGhafar",
        profileLink: "https://www.linkedin.com/in/ahmedabdelghafarmohammed/",
      },
    ],
    references: [
      {
        title: "Embedded Systems Diploma",
        url: "https://www.linkedin.com/in/ahmedabdelghafarmohammed",
      },
    ],
  },
  {
    id: 6,
    title: "All My College Summaries",
    description:
      "A complete collection of my college summaries, including detailed explanations, compiled past exams, and organized law sheets for quick and reliable revision.",
    image: "/Summaries/webp/Mockup Collage.webp",
    imageWebp: "/Summaries/webp/Mockup Collage.webp",
    imageOriginal: "/Summaries/Mockup Collage.png",
    link: "https://drive.google.com/drive/folders/1RjEORkCR185KXsl782pHt38dE_GbN0Xs?usp=drive_link",
    category: "College",
    type: "Folder",
    downloadable: true,
    featured: false,
    showOnHome: false,
    tags: ["College", "Exams", "Law Sheets"],
    mentions: [
      {
        name: "Sameh El-Domyate",
        profileLink: "https://www.linkedin.com/in/sameh-eldomyate-/",
      },
    ],
  },
];
