/**
 * Enthuzea 2k26 — Committee Data Configuration
 *
 * HOW TO ADD PHOTOS
 * ─────────────────
 * Set `photoUrl` to any publicly accessible image URL:
 *   • Local file in /public/photos/  → "/photos/dr-nandan-gupta.jpg"
 *   • Vercel Blob URL                → "https://<id>.public.blob.vercel-storage.com/name.jpg"
 *   • Any HTTPS CDN URL
 *
 * Leave `photoUrl: null` to automatically show a styled initials avatar.
 * Recommended image size: 200×200 px, square, JPG or WebP.
 */

export interface CommitteePerson {
  name: string;
  designation: string;
  photoUrl: string | null;
}

export interface CommitteeLead extends CommitteePerson {
  role: string;
}

export interface CommitteePatron extends CommitteePerson {
  role: string;
}

export type AccentColor =
  | "cyan" | "gold" | "pink" | "violet" | "orange"
  | "emerald" | "rose" | "blue" | "amber" | "red";

export interface CommitteeCategory {
  id: string;
  title: string;
  color: AccentColor;
  leads: CommitteeLead[];
  members: CommitteePerson[];
}

export const committeeData: {
  patrons: CommitteePatron[];
  core: CommitteeLead[];
  categories: CommitteeCategory[];
} = {

  /* ── Patrons & Advisors ───────────────────────────────────── */
  patrons: [
    {
      name: "Dr. Nandan Gupta",
      role: "Chief Patron",
      designation: "Director, SVIST",
      photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Patrons/Nandan_Gupta.jpg", // e.g. "/photos/dr-nandan-gupta.jpg"
    },
    {
      name: "Dr. Sonali Ghosh",
      role: "Patron",
      designation: "Principal, SVIST",
      photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Patrons/sonali-ghosh.webp",
    },
    {
      name: "Mr. Pabitra Gayen",
      role: "Chief Advisor",
      designation: "Deputy Director, SVIST",
      photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Patrons/Pabitra_Gayen.jpg",
    },
  ],

  /* ── Core Leadership ──────────────────────────────────────── */
  core: [
    {
      name: "Dr. Samrat Paul",
      role: "Convener",
      designation: "HOD, EEE",
      photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Leads/samrat-paul.webp",
    },
    {
      name: "Dr. Somnath Das",
      role: "Joint Convener",
      designation: "TIC, ME",
      photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Leads/somnath-das.webp",
    },
  ],

  /* ── Sub-Committee Categories ─────────────────────────────── */
  categories: [
    {
      id: "co-convener-forum",
      title: "Co-Convener Forum",
      color: "cyan",
      leads: [
        { name: "Dr. Arpan Dutta", role: "Co-Convener", designation: "Asso. Prof. Chemistry", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/CoConvenor/arpan-dutta.webp" },
        { name: "Mr. Anindya Ghosh", role: "Co-Convener", designation: "Joint HOD, ECE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/CoConvenor/anindya-ghosh.webp" },
        { name: "Mr. Habib Laskar", role: "Co-Convener", designation: "Asst. Professor, CE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/CoConvenor/habib-laskar.webp" },
        { name: "Mr. Arnab Bhattacharyya", role: "Co-Convener", designation: "Asst. Professor, AI&DS", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/CoConvenor/arnab-bhattacharya.webp" },
      ],
      members: [],
    },
    {
      id: "treasurer",
      title: "Treasurers Committee",
      color: "gold",
      leads: [
        { name: "Mr. Somnath Roy", role: "Treasurer", designation: "GM", photoUrl: null },
        { name: "Dr. Somnath Das", role: "Joint Treasurer", designation: "TIC, ME", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Treasurers/somnath-das.webp" },
        { name: "Dr. Arpan Dutta", role: "Joint Treasurer", designation: "Asso. Prof. Chemistry", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Treasurers/arpan-dutta.webp" },
      ],
      members: [],
    },
    {
      id: "cultural",
      title: "Cultural Committee",
      color: "pink",
      leads: [
        { name: "Dr. Manasi Mukhopadhyay", role: "Convener", designation: "HOD, Chemistry & Eng.", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/manasi-mukhopadhyay.webp" },
      ],
      members: [
        { name: "Dr. Sreetama Dutta", designation: "Asst. Professor, Physics", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/sreetama-dutta.webp" },
        { name: "Dr. Arpan Dutta", designation: "Asso. Professor, Chemistry", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/arpan-dutta.webp" },
        { name: "Mrs. Sangita Purkait", designation: "Asst. Professor, Math", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/sangita-purkait.webp" },
        { name: "Mrs. Jayita Chakraborty", designation: "Senior TPO", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/jayita-nath.webp" },
        { name: "Mrs. Pallabi Gharami", designation: "Asst. Professor, English", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Pallabi_Gharami.jpg" },
        { name: "Mrs. Suhana Parvin", designation: "Asst. Professor, CSE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/suhana-parvin.webp" },
        { name: "Mr. Sudipta Nath", designation: "Asst. Professor, ME", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/sudipta-nath.webp" },
        { name: "Mr. Ansuman Chakrabarti", designation: "Technical Assistant, EEE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/ansuman-chakrabarti.webp" },
        { name: "Mr. Pritam Bhattacharya", designation: "Technical Assistant, CE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/pritam-bhattacharya.webp" },
        { name: "Mrs. Yuthika Jana", designation: "Technical Assistant, ECE", photoUrl: null },
        { name: "Mrs. Mousumi Dhara", designation: "Technical Assistant, ECE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/mousumi-dhara.webp" },
        { name: "Mr. Santu Banerjee", designation: "SRM, SVIST", photoUrl: null },
      ],
    },
    {
      id: "prize",
      title: "Prize Distribution Committee",
      color: "violet",
      leads: [
        { name: "Dr. Sourabh Bal", role: "Convener", designation: "HOD, Physics & Math", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Prize/sourabh-bal.webp" },
        { name: "Dr. Suman Paul", role: "Co-Convener", designation: "Asst. Professor, Math", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Prize/suman-paul.webp" },
      ],
      members: [
        { name: "Dr. Nilanjan Roy", designation: "Asst. Professor – ME", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Prize/nilanjan-roy.webp" },
        { name: "Mr. Brijit Bhattacharya", designation: "TIC, CSE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Prize/brijit-bhattacharjee.webp" },
        { name: "Mr. Souvick Chakraborty", designation: "Asst. Professor, Math", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Prize/souvik-chakraborty.webp" },
        { name: "Mrs. Pallavi Bharati", designation: "Asst. Professor, EEE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Prize/pallavi-bharati.webp" },
        { name: "Mr. Pritam Bhattacharya", designation: "Technical Assistant – CE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Prize/pritam-bhattacharya.webp" },
        { name: "Mr. Dhruba Banerjee", designation: "Technical Assistant, Physics", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Prize/dhruba-banerjee.webp" },
        { name: "Mr. Raju Paul", designation: "Technical Assistant, ECE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Prize/raju-paul.webp" },
      ],
    },
    {
      id: "food",
      title: "Food Committee",
      color: "orange",
      leads: [
        { name: "Mr. Shreesendu Bhattacharjee", role: "Convener", designation: "Jt. HOD, ECE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Food/sheershendu-bhattacharya.webp" },
      ],
      members: [
        { name: "Mrs. Pubali Das Sarkar", designation: "Asst. Professor, CSE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Food/pubali-das-sarkar.webp" },
        { name: "Mr. Syed Mohammad Sahil", designation: "Asst. Professor, CE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Food/syed-mohammad-sahil.webp" },
        { name: "Mr. Surojit Sarkar", designation: "Asst. Professor, EEE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Food/surojit-sarkar.webp" },
        { name: "Mr. Ranjit Kr Das", designation: "Asst. Professor, ME", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Food/ranjit-kumar-das.webp" },
        { name: "Mr. Rajat Mukherjee", designation: "Technical Assistant, EEE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Food/rajat-mukherjee.webp" },
        { name: "Mr. Subhadeep Paul", designation: "Technical Assistant, CE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Food/subhadeep-paul.webp" },
        { name: "Mr. Swagata Banerjee", designation: "Technical Assistant, ME", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Food/Swagata_Banerjee.jpg" },
      ],
    },
    {
      id: "management",
      title: "Volunteer, Backstage & Hall Management",
      color: "emerald",
      leads: [
        { name: "Dr. Suman Das", role: "Convener", designation: "HOD, ME", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Volunteer%2CBackStage%2CHall/suman-das.webp" },
        { name: "Dr. Tithi Banerjee", role: "Co-Convener", designation: "HOD, CE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Volunteer%2CBackStage%2CHall/tithi-banerjee.webp" },
      ],
      members: [
        { name: "Mr. Anindya Ghosh", designation: "Jt. HOD, ECE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Volunteer%2CBackStage%2CHall/anindya-ghosh.webp" },
        { name: "Mr. Parikshit Kumar Paul", designation: "Asst. Professor, ECE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Volunteer%2CBackStage%2CHall/parikshit-kumar-paul.webp" },
      ],
    },
    {
      id: "subscriptions",
      title: "Fest Subscription Collection",
      color: "rose",
      leads: [
        { name: "Mr. Santu Banerjee", role: "Lead Coordinator", designation: "SRM, SVIST", photoUrl: null },
      ],
      members: [
        { name: "Students nominated by Mr. Santu Banerjee", designation: "Student Representatives", photoUrl: null },
      ],
    },
    {
      id: "digital",
      title: "Website & Digital Promotion",
      color: "blue",
      leads: [
        { name: "Dr. Koushikk Bhattacharyya", role: "Convener", designation: "HOD, AI&DS & CSE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Website%2CDigitalPromo/koushikk-bhattacharyya.webp" },
        { name: "Mr. Arindam Chakraborty", role: "Joint Convener", designation: "Asst. Professor, ME", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Website%2CDigitalPromo/arindam-chakraborty.webp" },
      ],
      members: [
        { name: "Mr. Swadhin Adhikari", designation: "IT Administrator", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Website%2CDigitalPromo/Swadhin_Adhikari.jpg" },
        { name: "Mrs. Kalloini Banerjee", designation: "Asst. Professor, ECE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Website%2CDigitalPromo/kallolini-banerjee.webp" },
        { name: "Mrs. Pallabi Bharati", designation: "Asst. Professor, EEE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Website%2CDigitalPromo/pallavi-bharati.webp" },
      ],
    },
    {
      id: "design",
      title: "Design & Print",
      color: "amber",
      leads: [
        { name: "Mr. Abhijit Mitra", role: "Convener", designation: "Asst. Professor, CSE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Design%2CPrint/abhijit-mitra.webp" },
        { name: "Mr. Krishna Kanta Chandra", role: "Co-Convener", designation: "Administrative Staff", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Design%2CPrint/Krishna_Kumar_Chandra" },
      ],
      members: [
        { name: "Mr. Avishek Garai", designation: "Placement Coordinator, T & P Cell", photoUrl: null },
        { name: "Ms. Ritwika Mandal", designation: "Technical Assistant, EEE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Design%2CPrint/ritwika-mandal.webp" },
        { name: "Mr. Subhasis Sil", designation: "Administrative Staff, Principal Office", photoUrl: null },
      ],
    },
    {
      id: "jury",
      title: "Jury & Anchor Selection Committee",
      color: "red",
      leads: [
        { name: "Dr. Sonali Ghosh", role: "Chair Person", designation: "Principal, SVIST", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Jury%2CAnchor/sonali-ghosh.webp" },
      ],
      members: [
        { name: "Dr. Suman Das", designation: "HOD, ME", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Jury%2CAnchor/suman-das.webp" },
        { name: "Dr. Manasi Mukhopadhyay", designation: "HOD, Chemistry & Eng.", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Jury%2CAnchor/manasi-mukhopadhyay.webp" },
        { name: "Mr. Anindya Ghosh", designation: "Jt. HOD, ECE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Jury%2CAnchor/anindya-ghosh.webp" },
        { name: "Dr. Tithi Banerjee", designation: "HOD, CE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Jury%2CAnchor/tithi-banerjee.webp" },
        { name: "Dr. Koushikk Bhattacharyya", designation: "HOD, AI&DS & CSE", photoUrl: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Jury%2CAnchor/koushikk-bhattacharyya.webp" },
      ],
    },
  ],
};
