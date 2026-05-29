import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Section } from "@/components/Section";
import {
  Download, FileText, CreditCard, Bell, ChevronRight, ShieldCheck,
  LogOut, ArrowLeft, Copy, Award, Users, Smartphone, Play,
  CheckCircle2, UserPlus, Sparkles, Clock, AlertCircle,
  Coins, Store, Rocket, ArrowRight, X,
  TrendingUp, BarChart3, PieChart as PieIcon, ArrowUpDown, MapPin, Globe, HeartPulse, ArrowUpRight, Search
} from "lucide-react";
import {
  growthData, wingMetrics, districtStats, welfareDistribution
} from "./analytics";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { getSession, clearSession } from "@/lib/session";
import { LoginPrompt } from "@/components/LoginPrompt";
import { useLanguage } from "@/hooks/useLanguage";
import { DemoModeBanner } from "@/components/DemoModeBanner";
import { ActivityCard } from "@/components/ActivityCard";
import { StatusPill } from "@/components/StatusPill";
import { EmptyState } from "@/components/EmptyState";
import orgLogo from "@/assets/ChatGPT Image Mar 25, 2026, 05_31_25 PM (1).png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Member Dashboard · TN Vanigargalin Sangamam" },
      { name: "description", content: "Member dashboard — view your EPIC ID, download certificate, manage renewals and welfare claims." },
    ],
  }),
  component: Dashboard,
});

const ACTIVITIES = [
  { d: "12 May 2026", t: "Membership Renewal",        s: "Payment ₹500 · UPI Success",           status: "success" as const },
  { d: "08 May 2026", t: "Certificate Download",       s: "EPIC PNG Format",                       status: "success" as const },
  { d: "02 May 2026", t: "Welfare Claim Submission",   s: "Medical Aid Claim · Under Verification", status: "pending" as const },
  { d: "20 Apr 2026", t: "Profile Address Update",     s: "Shop Location Mylapore",                status: "info"    as const },
];
const EVENTS = [
  {
    id: "agm-2026",
    t: "Annual General Meeting (AGM) · Chennai",
    d: "Live Now · (In case you cannot attend offline, connect directly)",
    ta: "ஆண்டு பொதுக்குழு கூட்டம் · (நேரில் வர முடியாதவர்கள் நேரலையில் இணையலாம்)",
    status: "live",
    attendees: 428,
  },
  {
    id: "gst-webinar",
    t: "GST Compliance & Trader Advisory Seminar",
    d: "15 June 2026 · Mylapore Office Hub",
    ta: "ஜிஎஸ்டி மற்றும் வணிகர் ஆலோசனை கருத்தரங்கம்",
    status: "upcoming",
    attendees: 184,
  },
  {
    id: "scholarship-2026",
    t: "Scholarship Applications Scheme",
    d: "Closes 15 July 2026 · Online Submissions",
    ta: "கல்வி உதவித்தொகை விண்ணப்பம்",
    status: "info",
    attendees: 0,
  },
];
function Dashboard() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [epicId, setEpicId] = useState<string | null>(() => getSession());

  // Subsidized Loan Gated States
  const [showLoanCategories, setShowLoanCategories] = useState(true);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [loanModalSubject, setLoanModalSubject] = useState("");
  const [loanChatStep, setLoanChatStep] = useState(0);
  const [loanInputs, setLoanInputs] = useState({ name: "", phone: "", amount: "" });

  const openDashboardLoanModal = (type: "business" | "retail" | "young") => {
    let subject = "";
    if (type === "business") subject = t("வட்டியில்லா வணிகக் கடன் விண்ணப்பம்", "Interest-Free Business Loan Application");
    else if (type === "retail") subject = t("சில்லறை வணிகர்கள் கடன் விண்ணப்பம்", "Retail Trader Loan Application");
    else if (type === "young") subject = t("இளைய தொழில்முனைவோர் கடன் விண்ணப்பம்", "Young Entrepreneur Loan Application");
    
    setLoanModalSubject(subject);
    setLoanChatStep(1);
    setLoanInputs({ name: "Senthil Kumar N", phone: "+91 944 20 •• 44", amount: "" });
    setIsLoanModalOpen(true);
  };

  // Coordinator opt-in state
  const [isCoordinator, setIsCoordinator] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tnvs_is_coordinator") === "true";
    }
    return false;
  });
  const [copiedLink, setCopiedLink] = useState(false);

  // Referred Members CRM Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending" | "expired">("all");

  const mockReferredMembers = useMemo(() => [
    { id: "TNVS-5098", name: "Karthikeyan M", shop: "Karthik Traders", phone: "+91 98450 11234", district: "Chennai", date: "24 May 2026", status: "active" },
    { id: "TNVS-8891", name: "Selvam Kumar", shop: "Selvi Rice Stores", phone: "+91 97720 90812", district: "Madurai", date: "22 May 2026", status: "active" },
    { id: "TNVS-4112", name: "Arul Murugan N", shop: "Murugan Provisions", phone: "+91 94432 10091", district: "Trichy", date: "20 May 2026", status: "pending" },
    { id: "TNVS-3908", name: "Meenakshi Sundaram", shop: "Meenakshi Silks", phone: "+91 91234 56789", district: "Coimbatore", date: "18 May 2026", status: "active" },
    { id: "TNVS-1224", name: "Rajesh Kannan", shop: "Kannan Electricals", phone: "+91 80567 12345", district: "Salem", date: "15 May 2026", status: "expired" },
  ], []);

  const filteredReferredMembers = useMemo(() => {
    return mockReferredMembers.filter((m) => {
      const matchesSearch = 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = statusFilter === "all" || m.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, statusFilter, mockReferredMembers]);

  // RSVP Toggles States
  const [rsvpStates, setRsvpStates] = useState<Record<string, "attending" | "not_attending" | "none">>({
    "agm-2026": "none",
    "gst-webinar": "none",
    "scholarship-2026": "none",
  });

  const [attendeeCounts, setAttendeeCounts] = useState<Record<string, number>>({
    "agm-2026": 428,
    "gst-webinar": 184,
    "scholarship-2026": 0,
  });

  // Live Stream Simulator overlay state
  const [isLiveStreamOpen, setIsLiveStreamOpen] = useState(false);
  const [liveStreamTitle, setLiveStreamTitle] = useState("");

  const [streamComments, setStreamComments] = useState<Array<{ id: number; user: string; text: string; location: string }>>([
    { id: 1, user: "Siva Shanmugam", text: "வணக்கம் அசோசியேஷன் தலைவர்களே! 🙏", location: "Salem" },
    { id: 2, user: "Muthu Pandian", text: "Good initiative by TNVS team.", location: "Madurai" },
    { id: 3, user: "Rajasekar K", text: "சென்னை போக முடியல, இங்கிருந்தே பார்க்குறது சூப்பர்!", location: "Coimbatore" },
  ]);

  useEffect(() => {
    if (!isLiveStreamOpen) return;

    const dummyComments = [
      { user: "Selvaraj M", text: "ஜிஎஸ்டி ஹெல்ப் டெஸ்க் ரொம்ப பயனுள்ளதா இருக்கு.", location: "Trichy" },
      { user: "Devi Prasad", text: "TNVS வாழ்க! 🌟", location: "Nellai" },
      { user: "Arun Kumar", text: "Excellent clarity in video and sound.", location: "Erode" },
      { user: "Ramakrishnan", text: "வணக்கம்! சென்னை அலுவலகம் சிறப்பா செயல்படுது.", location: "Vellore" },
      { user: "Meera Nair", text: "Proud to be a TNVS member.", location: "Kanyakumari" },
      { user: "Kathiravan S", text: "அடுத்த மாநாடு எப்போ நடக்கும்?", location: "Tiruppur" },
    ];

    let count = 4;
    const interval = setInterval(() => {
      const randomComment = dummyComments[Math.floor(Math.random() * dummyComments.length)];
      setStreamComments(prev => [
        ...prev, 
        { id: count++, user: randomComment.user, text: randomComment.text, location: randomComment.location }
      ].slice(-8)); // Keep last 8 comments
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveStreamOpen]);

  // GST Hub states
  const [gstActiveTab, setGstActiveTab] = useState<"calc" | "query">("calc");
  const [calcAmount, setCalcAmount] = useState<string>("10000");
  const [calcRate, setCalcRate] = useState<number>(18);
  const [gstQueryText, setGstQueryText] = useState("");

  // Welfare Scheme Portal states
  const [welfarePortalTab, setWelfarePortalTab] = useState<"apply" | "track">("apply");
  const [welfareSchemeType, setWelfareSchemeType] = useState<"health" | "loan" | null>(null);
  const [welfareFormStep, setWelfareFormStep] = useState(1); // 1: Select/Fill, 2: Upload, 3: Success
  const [welfareFormInputs, setWelfareFormInputs] = useState({
    shopName: "Senthil Traders",
    proprietorName: "Senthil Kumar N",
    phone: "+91 944 20 •• 44",
    aadhaar: "",
    nomineeName: "",
    nomineeRelation: "Wife",
    amount: "100000",
    tenure: "12",
    reason: ""
  });
  const [welfareUploads, setWelfareUploads] = useState<Array<{ name: string; size: string; progress: number; status: "uploading" | "done" }>>([]);
  const [isWelfareUploading, setIsWelfareUploading] = useState(false);
  const [welfareClaims, setWelfareClaims] = useState<Array<{
    id: string;
    type: "health" | "loan";
    title: string;
    description: string;
    date: string;
    status: "pending" | "approved" | "disbursed" | "rejected";
    step: number; // 1: Submitted, 2: Verification, 3: Approved, 4: Disbursed
    docs: string[];
  }>>([
    {
      id: "TNVS-WEL-88301",
      type: "health",
      title: "Group Health Cover (₹2 Lakh)",
      description: "Annual Health Policy Coverage for Family",
      date: "08 May 2026",
      status: "approved",
      step: 3,
      docs: ["AadharCard.pdf", "ShopLicense.pdf"]
    },
    {
      id: "TNVS-WEL-41102",
      type: "loan",
      title: "Interest-Free Retail Loan",
      description: "Business Working Capital · ₹50,000",
      date: "02 May 2026",
      status: "pending",
      step: 2,
      docs: ["ShopLicense.pdf", "GSTR1_May.pdf"]
    }
  ]);

  const startSimulatedWelfareUpload = () => {
    setIsWelfareUploading(true);
    const files = welfareSchemeType === "health" 
      ? [
          { name: "AadharCard.pdf", size: "1.2 MB", progress: 0, status: "uploading" as const },
          { name: "Family_RationCard.pdf", size: "2.4 MB", progress: 0, status: "uploading" as const }
        ]
      : [
          { name: "ShopLicense.pdf", size: "1.8 MB", progress: 0, status: "uploading" as const },
          { name: "BankStatement_3M.pdf", size: "4.1 MB", progress: 0, status: "uploading" as const }
        ];

    setWelfareUploads(files);

    let progress1 = 0;
    let progress2 = 0;

    const timer = setInterval(() => {
      progress1 = Math.min(progress1 + Math.floor(Math.random() * 25) + 15, 100);
      progress2 = Math.min(progress2 + Math.floor(Math.random() * 20) + 12, 100);

      setWelfareUploads(prev => {
        if (prev.length < 2) return prev;
        const next = [...prev];
        next[0] = { ...next[0], progress: progress1, status: progress1 === 100 ? "done" : "uploading" };
        next[1] = { ...next[1], progress: progress2, status: progress2 === 100 ? "done" : "uploading" };
        return next;
      });

      if (progress1 === 100 && progress2 === 100) {
        clearInterval(timer);
        setIsWelfareUploading(false);
        toast.success(
          language === "ta"
            ? "ஆவணங்கள் வெற்றிகரமாக பதிவேற்றப்பட்டன! 📄"
            : "Documents uploaded successfully! 📄"
        );
      }
    }, 150);
  };

  const handleWelfarePortalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!welfareSchemeType) return;

    const newApp = {
      id: `TNVS-WEL-${Math.floor(Math.random() * 90000) + 10000}`,
      type: welfareSchemeType,
      title: welfareSchemeType === "health" 
        ? "Group Health Cover (₹2 Lakh)" 
        : `Interest-Free Loan (₹${Number(welfareFormInputs.amount).toLocaleString()})`,
      description: welfareSchemeType === "health" 
        ? `Family Policy Enrollment` 
        : `Working Capital · ${welfareFormInputs.tenure} Months`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "pending" as const,
      step: 1, // Submitted
      docs: welfareUploads.map(f => f.name)
    };

    setWelfareClaims(prev => [newApp, ...prev]);
    setWelfareFormStep(3); // Success Step
    toast.success(
      language === "ta"
        ? "விண்ணப்பம் சமர்ப்பிக்கப்பட்டது! டிராக்கிங் ஐடி: " + newApp.id
        : "Application submitted successfully! Tracking ID: " + newApp.id
    );
  };

  const cgstAmount = useMemo(() => {
    const amt = Number(calcAmount) || 0;
    return ((amt * (calcRate / 2)) / 100).toFixed(2);
  }, [calcAmount, calcRate]);

  const sgstAmount = useMemo(() => {
    const amt = Number(calcAmount) || 0;
    return ((amt * (calcRate / 2)) / 100).toFixed(2);
  }, [calcAmount, calcRate]);

  const totalCalculated = useMemo(() => {
    const amt = Number(calcAmount) || 0;
    const cgst = Number(cgstAmount);
    const sgst = Number(sgstAmount);
    return (amt + cgst + sgst).toFixed(2);
  }, [calcAmount, cgstAmount, sgstAmount]);
  
  const handleToggleRsvp = (eventId: string, status: "attending" | "not_attending") => {
    const current = rsvpStates[eventId];
    
    // Toggle logic
    let nextStatus: "attending" | "not_attending" | "none" = status;
    if (current === status) {
      nextStatus = "none";
    }

    setRsvpStates(prev => ({ ...prev, [eventId]: nextStatus }));

    // Adjust attendee counter
    setAttendeeCounts(prev => {
      const base = prev[eventId];
      let diff = 0;
      if (nextStatus === "attending" && current !== "attending") {
        diff = 1;
      } else if (nextStatus !== "attending" && current === "attending") {
        diff = -1;
      }
      return { ...prev, [eventId]: base + diff };
    });

    if (nextStatus === "attending") {
      toast.success(
        language === "ta" 
          ? "வருகை உறுதி செய்யப்பட்டது! கூட்டத்தில் சந்திப்போம். 🤝" 
          : "RSVP confirmed! See you at the event. 🤝"
      );
    } else if (nextStatus === "none") {
      toast.info(t("பதில் ரத்து செய்யப்பட்டது.", "RSVP canceled."));
    }
  };

  const handleLogout = () => {
    clearSession();
    setEpicId(null);
    toast.success("Signed out successfully.");
  };

  const handleDownloadIdCard = () => {
    if (!epicId) return;
    navigate({ to: "/voter-id", search: { q: epicId } } as never);
  };

  const handleOptInCoordinator = () => {
    setIsCoordinator(true);
    localStorage.setItem("tnvs_is_coordinator", "true");
    toast.success(
      language === "ta"
        ? "ஒருங்கிணைப்பாளர் திட்டத்தில் இணைந்ததற்கு வாழ்த்துகள்! 🌟"
        : "Successfully opted in as a Coordinator! 🌟"
    );
  };

  if (!epicId) {
    return <LoginPrompt onLogin={(id) => setEpicId(id)} />;
  }

  // Use window.location.origin for referral URL — not a non-existent domain
  const referralUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/refer/${epicId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl).catch(() => {});
    setCopiedLink(true);
    toast.success(t("பரிந்துரை இணைப்பு நகலெடுக்கப்பட்டது! ✓", "Referral link copied successfully! ✓"));
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* Page Header */}
      <section className="border-b border-slate-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 md:py-10 w-full">

          {/* Demo Mode Banner — full width, top of page */}
          <div className="mb-5">
            <DemoModeBanner />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline transition-all mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                {t("சேவைகளுக்குத் திரும்பு", "Back to Services")}
              </Link>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Member ID: {epicId}
              </div>
              <h1 className="mt-1 font-display text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {t("வணக்கம், செந்தில் குமார் N", "Welcome, Senthil Kumar N")}
              </h1>
              <p className="font-tamil text-xs md:text-sm text-slate-500 mt-0.5">
                {t("உங்கள் உறுப்பினர் கணக்கு செயலில் உள்ளது.", "Your membership account is active.")}
              </p>
            </div>

            <div className="flex gap-2.5 flex-wrap">
              <button
                onClick={handleDownloadIdCard}
                className="btn-primary"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                {t("அட்டை பதிவிறக்கம்", "Download ID Card")}
              </button>
              <button
                onClick={handleLogout}
                className="btn-danger"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                {t("வெளியேறு", "Sign Out")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Section className="py-4">
        {/* Full-size stationary Dribbble-style Premium Hero Promo Banner */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-navy border border-blue-900/50 shadow-2xl flex flex-col justify-center max-w-7xl mx-auto p-5 sm:p-8 md:p-12 min-h-[260px] sm:min-h-[300px] select-none text-left bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-950 via-navy to-slate-950">
          
          {/* Tagline Row */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-amber-500 rounded-full"></div>
            <span className="bg-blue-600/30 text-blue-400 border border-blue-500/20 text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-[4px] font-sans">
              {t("உறுப்பினர் சிறப்பு சலுகை", "MEMBER SPECIAL OFFER")}
            </span>
          </div>

          {/* Large Serif Headline with Highlighted Loan Keywords */}
          <h1 className="mt-5 font-serif text-2xl md:text-4.5xl font-extrabold text-white leading-tight max-w-3xl">
            {language === "ta" ? (
              <>
                வட்டியில்லா <span className="text-amber-400 drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)] select-all">கடன்</span> பெற்று உங்கள் தொழிலை வளர்க்கவும்.
              </>
            ) : (
              <>
                Grow your business with 0% <span className="text-amber-400 drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)] select-all">Interest Loans</span>.
              </>
            )}
          </h1>

          {/* Features Row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs md:text-sm text-slate-300 font-tamil font-semibold">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              {t("வட்டியில்லா கடன்", "No Interest (0% Vatti)")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              {t("மிகவும் எளிய ஆவணங்கள்", "Only Simple Documents Needed")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              {t("வங்கி கிளைகளில் உடனடி அனுமதி", "Quick Approval at Your Branch")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              {t("₹25 லட்சம் வரை பெறலாம்", "Get up to ₹25 Lakhs")}
            </span>
          </div>

          {/* CTA Action Button */}
          <div className="mt-8">
            <button
              onClick={() => {
                const section = document.getElementById("loan-categories-section");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                  toast.success(t("கீழே உள்ள கடன் பிரிவைத் தேர்ந்தெடுத்து விண்ணப்பிக்கவும்!", "Select a loan category below to apply!"));
                }
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[8px] text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.97] transition-all border border-blue-500/20 cursor-pointer"
            >
              <span>{t("கடனுக்கு விண்ணப்பிக்க →", "Apply for Loan Now →")}</span>
            </button>
          </div>

          {/* Subtle Decorative Geometric Glowing Circles */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </Section>

      <Section className="py-6 sm:py-10">
        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6">

          {/* LEFT COLUMN — Member Card + Quick Actions */}
          <div className="lg:col-span-5 space-y-6">

            {/* Member Card */}
            <div className="card-base card-accent-left p-5 md:p-6 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("உறுப்பினர் அடையாள எண்", "Membership ID")}
                  </div>
                  <div className="font-mono text-xl font-bold text-primary mt-1 tracking-wider">
                    {epicId}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 p-1 bg-slate-50 shadow-xs">
                  <img src={orgLogo} alt="TNVS" className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <InfoCell label="Member Name"        value="Senthil Kumar N" />
                <InfoCell label="District"           value="Chennai" />
                <InfoCell label="Zone"               value="Chennai Zone" />
                <InfoCell label="Assembly"           value="Mylapore" />
                <InfoCell label="Registered Mobile"  value="+91 944 20 •• 44" />
                <InfoCell label="Member Class"       value="A+ Patron" />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="text-xs text-slate-500">
                  {t("வரை செல்லும்", "Valid till")}{" "}
                  <span className="text-slate-800 font-bold">04 Dec 2026</span>
                </div>
                <StatusPill status="active" label="ACTIVE" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => toast.info("Your primary certificate has been automatically queued for download.")}
                className="card-base card-interactive p-4 text-left group min-h-[80px] cursor-pointer"
              >
                <FileText className="w-5 h-5 text-primary group-hover:scale-110 transition" aria-hidden="true" />
                <div className="text-sm font-semibold mt-2 text-slate-800">
                  {t("சான்றிதழ்", "Certificate")}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{t("PDF பதிவிறக்கம்", "Download PDF")}</div>
              </button>

              <button
                onClick={() => toast.info("Renewal window opens October 2026. Current membership valid till Dec 2026.")}
                className="card-base card-interactive p-4 text-left group min-h-[80px] cursor-pointer"
              >
                <CreditCard className="w-5 h-5 text-primary group-hover:scale-110 transition" aria-hidden="true" />
                <div className="text-sm font-semibold mt-2 text-slate-800">
                  {t("புதுப்பித்தல்", "Card Renewal")}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{t("ஆண்டுக் கட்டணம் ₹500", "Annual fee ₹500")}</div>
              </button>
            </div>

            {/* App Download */}
            <div className="card-base p-5 md:p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-primary flex items-center justify-center">
                  <Smartphone className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-sm text-slate-800">
                  {t("எங்கள் ஆப்பை பதிவிறக்கவும்", "Download Our App")}
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-tamil">
                {t(
                  "சிறந்த அனுபவத்திற்கு Google Play Store இல் இருந்து அதிகாரப்பூர்வ வணிகன் AI ஆப்பை பதிவிறக்கவும்.",
                  "For the best experience, download the official Vanigan AI app from the Google Play Store."
                )}
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.thirumoolar.vanigan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-2 transition active:scale-[0.98] min-h-[48px]"
              >
                <Play className="w-4 h-4 fill-white" aria-hidden="true" />
                <span className="font-tamil">{t("Play Store இல் பதிவிறக்கம்", "Download on Play Store")}</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — Activity + Notices + Coordinator */}
          <div className="lg:col-span-7 space-y-6">

            {/* Recent Activity */}
            <div className="card-base p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-base font-bold text-slate-800">
                  {t("சமீபத்திய செயல்பாடுகள்", "Recent Activity")}
                </h2>
                <span className="text-xs bg-slate-50 text-slate-500 px-2.5 py-1 rounded-full font-semibold border border-slate-100">
                  {t("கடந்த 30 நாட்கள்", "Last 30 days")}
                </span>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-left border-collapse" aria-label="Recent activity">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{t("தேதி", "Date")}</th>
                      <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{t("விவரம்", "Description")}</th>
                      <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{t("நிலை", "Status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ACTIVITIES.map((a) => (
                      <tr key={a.t} className="border-b border-slate-100 hover:bg-slate-50/60 transition">
                        <td className="px-4 py-3.5 text-xs text-slate-400 font-mono whitespace-nowrap tabular-nums">{a.d}</td>
                        <td className="px-4 py-3.5">
                          <div className="text-sm font-semibold text-slate-800">{a.t}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{a.s}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusPill status={a.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List */}
              <div className="md:hidden divide-y divide-slate-100">
                {ACTIVITIES.map((a) => (
                  <ActivityCard
                    key={a.t}
                    date={a.d}
                    title={a.t}
                    subtitle={a.s}
                    status={a.status}
                  />
                ))}
              </div>
            </div>

            {/* Notices */}
            {/* Interactive Meetings & Events Section */}
            <div className="card-base p-5 md:p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="font-display text-base font-bold text-slate-800 flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-gold animate-bounce" aria-hidden="true" />
                  {t("கூட்டங்கள் & நிகழ்வுகள்", "Meetings & Announcements")}
                </h2>
                <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded uppercase">
                  {EVENTS.filter(e => e.status === "live").length > 0 ? "LIVE MEETING ACTIVE" : "UPCOMING"}
                </span>
              </div>
              <div className="space-y-3.5">
                {EVENTS.map((e) => {
                  const isLive = e.status === "live";
                  const isUpcoming = e.status === "upcoming";
                  const isRsvped = rsvpStates[e.id] === "attending";
                  const count = attendeeCounts[e.id];

                  return (
                    <div
                      key={e.id}
                      onClick={isLive ? () => {
                        setLiveStreamTitle(language === "ta" ? e.ta : e.t);
                        setIsLiveStreamOpen(true);
                      } : undefined}
                      className={`rounded-2xl border transition-all duration-300 flex flex-col gap-3 text-left group ${
                        isLive 
                          ? "p-5 md:p-6 bg-slate-900 text-white border-red-950/80 shadow-xl shadow-slate-950/40 animate-pulse-subtle cursor-pointer hover:bg-slate-950 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/20 active:scale-[0.99]" 
                          : "p-4 bg-slate-50/50 hover:bg-slate-50 border-slate-150 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 w-full">
                        <div className="space-y-1">
                          <div className={`text-[10px] font-black uppercase tracking-widest ${isLive ? "text-red-400 flex items-center gap-1.5" : "text-slate-400"}`}>
                            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />}
                            {isLive ? t("நேரடி ஒளிபரப்பு", "LIVE BROADCAST") : t("நிகழ்வு", "ANNOUNCEMENT")}
                          </div>
                          <h4 className={`leading-snug font-bold ${isLive ? "text-base font-black text-white font-serif tracking-tight" : "text-sm text-slate-800 font-sans"}`}>
                            {language === "ta" ? e.ta : e.t}
                          </h4>
                          {isLive ? (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>{e.d}</span>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-500 font-tamil font-semibold">
                              {e.d}
                            </p>
                          )}
                        </div>

                        {isLive && (
                          <div
                            className="bg-gradient-to-r from-red-600 to-rose-600 group-hover:from-red-500 group-hover:to-rose-500 text-white px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-lg shadow-red-950/40 border border-red-500/20 transition-all duration-300"
                          >
                            <Play className="w-3.5 h-3.5 fill-white stroke-none" />
                            <span>{t("நேரடி ஒளிபரப்பு", "Watch Live")}</span>
                          </div>
                        )}
                      </div>

                      {/* Attendee Counters & RSVP Panel for upcoming events */}
                      {isUpcoming && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-200/60 mt-0.5">
                          <div className="text-[10px] text-slate-400 font-tamil">
                            {count > 0 ? (
                              <span>✓ <strong className="text-slate-700 font-bold">{count}</strong> {t("வணிகர்கள் பங்கேற்கிறார்கள்", "traders attending")}</span>
                            ) : (
                              t("முன்பதிவு செய்ய விருப்பம்", "RSVP open to all members")
                            )}
                          </div>

                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleToggleRsvp(e.id, "attending")}
                              className={`px-3 py-1 rounded text-[10px] font-extrabold transition cursor-pointer border ${
                                isRsvped 
                                  ? "bg-emerald-600 border-emerald-600 text-white" 
                                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                              }`}
                            >
                              {isRsvped ? t("✓ நான் வருகிறேன்", "✓ Going") : t("நான் வருகிறேன்", "Going")}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setRsvpStates(prev => ({ ...prev, [e.id]: "none" }));
                                setAttendeeCounts(prev => {
                                  const current = rsvpStates[e.id];
                                  const base = prev[e.id];
                                  return { ...prev, [e.id]: current === "attending" ? base - 1 : base };
                                });
                                toast.info(t("பதில் ரத்து செய்யப்பட்டது.", "RSVP canceled."));
                              }}
                              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-600 px-2 py-1 rounded text-[10px] transition cursor-pointer"
                            >
                              {t("வரவில்லை", "Decline")}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Welfare Coverage Banner */}
            <div className="bg-primary text-white rounded-[12px] p-5 md:p-6 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/8 rounded-full translate-x-1/3 -translate-y-1/3" aria-hidden="true" />
              <div className="relative flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-slate-50">
                    {t("நலன் பாதுகாப்பு செயலில் உள்ளது", "Welfare Coverage Active")}
                  </h3>
                  <p className="text-xs text-primary-foreground/80 leading-relaxed">
                    {t(
                      "நீங்களும் உங்கள் பதிவுசெய்யப்பட்ட குடும்பமும் ₹2 லட்சம் குழு சுகாதார காப்பீட்டுத் திட்டத்தின் கீழ் ஏப்ரல் 2027 வரை முழுமையாக பாதுகாக்கப்படுகிறீர்கள்.",
                      "You and your registered trade family are fully covered under the association's ₹2 Lakh group health insurance scheme until April 2027."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Welfare Scheme Application & Tracking Portal */}
            <div className="card-base p-5 md:p-6 space-y-5 text-left border-l-4 border-l-emerald-600">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-emerald-600 animate-pulse" />
                  <h3 className="font-display font-bold text-sm text-slate-800">
                    {t("நலத்திட்டங்கள் & நிதியுதவி மையம்", "Member Welfare & Credit Portal")}
                  </h3>
                </div>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  ONLINE PORTAL
                </span>
              </div>

              {/* Portal Tabs Selector */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
                <button
                  type="button"
                  onClick={() => {
                    setWelfarePortalTab("apply");
                    // Reset step when switching back to apply
                    if (welfareFormStep === 3) setWelfareFormStep(1);
                  }}
                  className={`flex-1 py-1.5 rounded-lg font-display text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                    welfarePortalTab === "apply" ? "bg-white text-emerald-800 shadow-xs border border-slate-200/20" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t("விண்ணப்பிக்கும் தளம்", "Apply for Welfare")}
                </button>
                <button
                  type="button"
                  onClick={() => setWelfarePortalTab("track")}
                  className={`flex-1 py-1.5 rounded-lg font-display text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                    welfarePortalTab === "track" ? "bg-white text-emerald-800 shadow-xs border border-slate-200/20" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t("விண்ணப்ப டிராக்கிங்", "Track Applications")}
                  {welfareClaims.filter(c => c.status === "pending").length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[8px] font-bold">
                      {welfareClaims.filter(c => c.status === "pending").length}
                    </span>
                  )}
                </button>
              </div>

              {/* TAB 1: APPLY FOR SCHEMES */}
              {welfarePortalTab === "apply" && (
                <div className="space-y-4 pt-1 animate-fade-in">
                  
                  {/* Step 1: Select Scheme & Input Details */}
                  {welfareFormStep === 1 && (
                    <div className="space-y-4">
                      {/* Scheme Cards Selection */}
                      {!welfareSchemeType ? (
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Select a Welfare Scheme</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Health cover card option */}
                            <div 
                              onClick={() => {
                                setWelfareSchemeType("health");
                                setWelfareFormInputs(prev => ({ ...prev, aadhaar: "", nomineeName: "" }));
                              }}
                              className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-emerald-50/20 hover:border-emerald-500/30 transition-all cursor-pointer group flex flex-col justify-between min-h-[140px]"
                            >
                              <div>
                                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                                  <HeartPulse className="w-5 h-5" />
                                </div>
                                <h4 className="text-xs font-bold text-slate-800 font-tamil leading-tight">₹2 Lakh Group Insurance</h4>
                                <p className="text-[10px] text-slate-500 mt-1 leading-normal font-tamil">
                                  Family health cover including cashless hospitalizations.
                                </p>
                              </div>
                              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mt-3 font-sans group-hover:translate-x-1 transition flex items-center gap-0.5">
                                Select Scheme →
                              </span>
                            </div>

                            {/* Loan card option */}
                            <div 
                              onClick={() => {
                                setWelfareSchemeType("loan");
                                setWelfareFormInputs(prev => ({ ...prev, amount: "100000", reason: "" }));
                              }}
                              className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-blue-50/20 hover:border-blue-500/30 transition-all cursor-pointer group flex flex-col justify-between min-h-[140px]"
                            >
                              <div>
                                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                                  <Coins className="w-5 h-5" />
                                </div>
                                <h4 className="text-xs font-bold text-slate-800 font-tamil leading-tight">0% Interest Credit Support</h4>
                                <p className="text-[10px] text-slate-500 mt-1 leading-normal font-tamil">
                                  Working capital loans up to ₹2 Lakhs with easy tenures.
                                </p>
                              </div>
                              <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider mt-3 font-sans group-hover:translate-x-1 transition flex items-center gap-0.5">
                                Select Scheme →
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Scheme Form Details */
                        <div className="space-y-4">
                          {/* Back to scheme select button */}
                          <button
                            type="button"
                            onClick={() => setWelfareSchemeType(null)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
                          >
                            ← Change Scheme Selection
                          </button>

                          <div className="bg-slate-50 border border-slate-150 rounded-xl p-3.5 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${welfareSchemeType === "health" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                              {welfareSchemeType === "health" ? <HeartPulse className="w-4 h-4" /> : <Coins className="w-4 h-4" />}
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Active Application</span>
                              <h4 className="text-xs font-extrabold text-slate-800 font-tamil leading-none">
                                {welfareSchemeType === "health" ? t("சுகாதார காப்பீடு (₹2 லட்சம்)", "Group Health Cover (₹2 Lakh)") : t("வட்டியில்லா நிதியுதவிக் கடன்", "Interest-Free Credit Support")}
                              </h4>
                            </div>
                          </div>

                          {/* Dynamic Inputs Form */}
                          <div className="space-y-3 font-sans">
                            <div className="grid grid-cols-2 gap-2 text-xxs font-mono">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Trader Name</label>
                                <input
                                  type="text"
                                  disabled
                                  value={welfareFormInputs.proprietorName}
                                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-500 cursor-not-allowed focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Shop Name</label>
                                <input
                                  type="text"
                                  disabled
                                  value={welfareFormInputs.shopName}
                                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-500 cursor-not-allowed focus:outline-none"
                                />
                              </div>
                            </div>

                            {welfareSchemeType === "health" ? (
                              /* HEALTH COVER SPECIAL INPUTS */
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Aadhaar Card Number *</label>
                                  <input
                                    type="text"
                                    maxLength={12}
                                    placeholder="Enter 12-digit Aadhaar Number"
                                    value={welfareFormInputs.aadhaar}
                                    onChange={e => setWelfareFormInputs({ ...welfareFormInputs, aadhaar: e.target.value.replace(/\D/g, '') })}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nominee Name *</label>
                                    <input
                                      type="text"
                                      placeholder="Nominee Full Name"
                                      value={welfareFormInputs.nomineeName}
                                      onChange={e => setWelfareFormInputs({ ...welfareFormInputs, nomineeName: e.target.value })}
                                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nominee Relationship *</label>
                                    <select
                                      value={welfareFormInputs.nomineeRelation}
                                      onChange={e => setWelfareFormInputs({ ...welfareFormInputs, nomineeRelation: e.target.value })}
                                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                                    >
                                      <option value="Wife">Wife</option>
                                      <option value="Husband">Husband</option>
                                      <option value="Son">Son</option>
                                      <option value="Daughter">Daughter</option>
                                      <option value="Mother">Mother</option>
                                      <option value="Father">Father</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* LOAN SUPPORT SPECIAL INPUTS */
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2 font-sans">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">Required Amount *</label>
                                    <select
                                      value={welfareFormInputs.amount}
                                      onChange={e => setWelfareFormInputs({ ...welfareFormInputs, amount: e.target.value })}
                                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer font-bold font-mono"
                                    >
                                      <option value="50000">₹50,000</option>
                                      <option value="100000">₹1,00,000</option>
                                      <option value="150000">₹1,50,000</option>
                                      <option value="200000">₹2,00,000</option>
                                    </select>
                                  </div>
                                  <div className="space-y-1 font-sans">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">Repayment Tenure *</label>
                                    <select
                                      value={welfareFormInputs.tenure}
                                      onChange={e => setWelfareFormInputs({ ...welfareFormInputs, tenure: e.target.value })}
                                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer font-bold font-mono"
                                    >
                                      <option value="12">12 Months (0% Vatti)</option>
                                      <option value="18">18 Months (0% Vatti)</option>
                                      <option value="24">24 Months (0% Vatti)</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Purpose of Funds *</label>
                                  <textarea
                                    rows={2}
                                    placeholder="Briefly explain how you plan to use this capital (e.g. purchasing stock, shop expansion)..."
                                    value={welfareFormInputs.reason}
                                    onChange={e => setWelfareFormInputs({ ...welfareFormInputs, reason: e.target.value })}
                                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Submit Button to Step 2 */}
                            <button
                              type="button"
                              onClick={() => {
                                // Validation
                                if (welfareSchemeType === "health") {
                                  if (!welfareFormInputs.aadhaar || welfareFormInputs.aadhaar.length !== 12) {
                                    toast.error(t("சரியான 12-இலக்க ஆதார் எண்ணை உள்ளிடவும்.", "Please enter a valid 12-digit Aadhaar number."));
                                    return;
                                  }
                                  if (!welfareFormInputs.nomineeName.trim()) {
                                    toast.error(t("வாரிசுதாரர் பெயரை உள்ளிடவும்.", "Please enter Nominee Name."));
                                    return;
                                  }
                                } else {
                                  if (!welfareFormInputs.reason.trim()) {
                                    toast.error(t("கடன் உபயோகக் காரணத்தை உள்ளிடவும்.", "Please specify the purpose of funds."));
                                    return;
                                  }
                                }
                                setWelfareFormStep(2);
                                // Trigger Simulated file upload immediately for a gorgeous dynamic feel
                                setTimeout(() => startSimulatedWelfareUpload(), 100);
                              }}
                              className={`w-full text-white py-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md min-h-[44px] ${welfareSchemeType === "health" ? "bg-emerald-600 hover:bg-emerald-500" : "bg-blue-600 hover:bg-blue-500"}`}
                            >
                              <span>Next: Upload Documents</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Document Upload Simulation */}
                  {welfareFormStep === 2 && (
                    <div className="space-y-4 pt-1 animate-fade-in font-sans">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Step 2: Document Verification</span>
                      
                      {/* Upload Box Dropzone Area */}
                      <div className="p-5 border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-xl text-center space-y-2 relative overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                          <FileText className="w-5 h-5 animate-pulse" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-700">Verification Engine Initialized</p>
                          <p className="text-[10px] text-slate-400">Uploading required documents for automatic OCR parsing</p>
                        </div>
                      </div>

                      {/* File Upload Progress List */}
                      <div className="space-y-2">
                        {welfareUploads.map((file, idx) => (
                          <div key={file.name} className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex flex-col gap-2 transition-all">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-emerald-600" />
                                <div className="text-xs text-left">
                                  <p className="font-bold text-slate-800 truncate max-w-[180px]">{file.name}</p>
                                  <p className="text-[9px] text-slate-400">{file.size}</p>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono font-bold text-emerald-700">
                                {file.progress}%
                              </span>
                            </div>
                            
                            {/* Animated Progress Bar */}
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-emerald-600 h-full transition-all duration-150" 
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Submit form button */}
                      <form onSubmit={handleWelfarePortalSubmit}>
                        <button
                          type="submit"
                          disabled={isWelfareUploading}
                          className={`w-full py-3 rounded-lg text-xs font-bold text-white transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md min-h-[44px] ${isWelfareUploading ? "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none" : "bg-emerald-600 hover:bg-emerald-500"}`}
                        >
                          {isWelfareUploading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin shrink-0" />
                              <span>Uploading Documents ({Math.min(...welfareUploads.map(f => f.progress)) || 0}%)</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span>Submit Application to Board</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Step 3: Success Screen */}
                  {welfareFormStep === 3 && (
                    <div className="text-center py-6 space-y-4 animate-fade-in font-sans">
                      <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-xs animate-bounce">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-slate-800 text-sm">Application Filed Successfully!</h4>
                        <p className="text-[10px] text-slate-400 font-tamil">
                          விண்ணப்பம் வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது.
                        </p>
                      </div>
                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-left text-xxs font-mono text-slate-700 max-w-[280px] mx-auto space-y-1.5">
                        <div><strong className="text-slate-400 uppercase tracking-widest font-sans text-[8px] block">Application ID</strong> <span className="font-black text-slate-800 text-xs">{welfareClaims[0]?.id}</span></div>
                        <div><strong className="text-slate-400 uppercase tracking-widest font-sans text-[8px] block">Welfare Scheme</strong> <span className="text-slate-700">{welfareClaims[0]?.title}</span></div>
                        <div><strong className="text-slate-400 uppercase tracking-widest font-sans text-[8px] block">Filing Timestamp</strong> <span className="text-slate-700">{new Date().toLocaleString("en-GB")}</span></div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setWelfarePortalTab("track");
                          setWelfareFormStep(1);
                          setWelfareSchemeType(null);
                        }}
                        className="btn-primary py-2 px-4 text-xs tracking-wider"
                      >
                        Track Status Pipeline →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: TRACK APPLICATIONS */}
              {welfarePortalTab === "track" && (
                <div className="space-y-4 pt-1 animate-fade-in">
                  <div className="space-y-3">
                    {welfareClaims.map((claim) => {
                      const isPending = claim.status === "pending";
                      const isApproved = claim.status === "approved";
                      
                      return (
                        <div key={claim.id} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/20 hover:bg-slate-50 transition text-left flex flex-col gap-3 font-sans">
                          {/* Top row */}
                          <div className="flex justify-between items-start gap-2">
                            <div className="space-y-0.5">
                              <span className="text-[8px] font-mono text-slate-400 block font-bold">{claim.id} · {claim.date}</span>
                              <h4 className="text-xs font-bold text-slate-800 leading-tight">{claim.title}</h4>
                              <p className="text-[10px] text-slate-400 font-tamil mt-0.5">{claim.description}</p>
                            </div>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                              isApproved 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-150" 
                                : "bg-amber-50 text-amber-700 border-amber-150 animate-pulse"
                            }`}>
                              {claim.status}
                            </span>
                          </div>

                          {/* Expansion Status Pipeline Tracker */}
                          <div className="pt-3 border-t border-slate-100 mt-1">
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-3 font-sans">Application Status Pipeline</span>
                            
                            <div className="space-y-3 font-sans pl-1">
                              {/* STAGE 1: SUBMITTED */}
                              <div className="flex gap-2.5 items-start">
                                <div className="flex flex-col items-center shrink-0">
                                  <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                                  <div className="w-[1.5px] h-4 bg-emerald-600" />
                                </div>
                                <div className="text-xxs text-left -mt-0.5">
                                  <p className="font-bold text-slate-700">Application Submitted</p>
                                  <p className="text-slate-400">Signed with member EPIC ID. Shop verification queued.</p>
                                </div>
                              </div>

                              {/* STAGE 2: DOCUMENT AUDIT */}
                              <div className="flex gap-2.5 items-start">
                                <div className="flex flex-col items-center shrink-0">
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                    claim.step >= 2 
                                      ? "bg-emerald-600 text-white" 
                                      : "bg-slate-200 text-slate-400"
                                  }`}>
                                    {claim.step > 2 ? "✓" : "2"}
                                  </div>
                                  <div className={`w-[1.5px] h-4 ${claim.step >= 3 ? "bg-emerald-600" : "bg-slate-200"}`} />
                                </div>
                                <div className="text-xxs text-left -mt-0.5">
                                  <p className={`font-bold ${claim.step >= 2 ? "text-slate-700" : "text-slate-400"}`}>
                                    Auditor Verification
                                    {claim.step === 2 && <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-ping" />}
                                  </p>
                                  <p className="text-slate-400">
                                    {claim.step >= 2 
                                      ? "Chennai Regional Auditor verifying uploaded licenses & tax files." 
                                      : "Pending auditor assignment."}
                                  </p>
                                </div>
                              </div>

                              {/* STAGE 3: EXECUTIVE BOARD APPROVAL */}
                              <div className="flex gap-2.5 items-start">
                                <div className="flex flex-col items-center shrink-0">
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                    claim.step >= 3 
                                      ? "bg-emerald-600 text-white" 
                                      : "bg-slate-200 text-slate-400"
                                  }`}>
                                    {claim.step > 3 ? "✓" : "3"}
                                  </div>
                                  <div className={`w-[1.5px] h-4 ${claim.step >= 4 ? "bg-emerald-600" : "bg-slate-200"}`} />
                                </div>
                                <div className="text-xxs text-left -mt-0.5">
                                  <p className={`font-bold ${claim.step >= 3 ? "text-slate-700" : "text-slate-400"}`}>
                                    TNVS Board Executive Review
                                    {claim.step === 3 && <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-ping" />}
                                  </p>
                                  <p className="text-slate-400">
                                    {claim.step >= 3 
                                      ? "Approved by state executive committee. Allocation queued." 
                                      : "Awaiting board verification approval."}
                                  </p>
                                </div>
                              </div>

                              {/* STAGE 4: DISBURSEMENT / ENROLLMENT ACTIVE */}
                              <div className="flex gap-2.5 items-start">
                                <div className="flex flex-col items-center shrink-0">
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                    claim.step >= 4 
                                      ? "bg-emerald-600 text-white" 
                                      : "bg-slate-200 text-slate-400"
                                  }`}>
                                    4
                                  </div>
                                </div>
                                <div className="text-xxs text-left -mt-0.5">
                                  <p className={`font-bold ${claim.step >= 4 ? "text-slate-700" : "text-slate-400"}`}>
                                    {claim.type === "health" ? "Coverage Card Dispatched" : "Credit Disbursed"}
                                  </p>
                                  <p className="text-slate-400">
                                    {claim.step >= 4 
                                      ? (claim.type === "health" ? "Group Policy Card sent to shop address." : "Credit funds transferred to primary bank account.")
                                      : (claim.type === "health" ? "Awaiting Policy Card dispatch." : "Awaiting final credit transfer.")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Digital GST & Finance Hub */}
            <div className="card-base p-5 md:p-6 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-primary animate-bounce" />
                  <h3 className="font-display font-bold text-sm text-slate-800">
                    {t("டிஜிட்டல் ஜிஎஸ்டி & நிதி மையம்", "Digital GST & Finance Hub")}
                  </h3>
                </div>
                <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  FREE SERVICE
                </span>
              </div>

              {/* Sub-Tabs Selector */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
                <button
                  type="button"
                  onClick={() => setGstActiveTab("calc")}
                  className={`flex-1 py-1.5 rounded-lg font-display text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                    gstActiveTab === "calc" ? "bg-white text-primary shadow-xs" : "text-slate-500"
                  }`}
                >
                  {t("கணக்கீடு & காலண்டர்", "Calculator & Dates")}
                </button>
                <button
                  type="button"
                  onClick={() => setGstActiveTab("query")}
                  className={`flex-1 py-1.5 rounded-lg font-display text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                    gstActiveTab === "query" ? "bg-white text-primary shadow-xs" : "text-slate-500"
                  }`}
                >
                  {t("வரி சந்தேகங்கள்", "Ask Auditor")}
                </button>
              </div>

              {/* GST Content: Tab 1 (Calculator & Filing dates) */}
              {gstActiveTab === "calc" && (
                <div className="space-y-4 pt-1 animate-fade-in text-left">
                  {/* Micro Filing Calendar */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Filing Deadlines</span>
                    <div className="grid grid-cols-2 gap-2 text-xxs font-mono">
                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex flex-col">
                        <span className="text-slate-400 font-bold">GSTR-1</span>
                        <span className="text-slate-700 font-black mt-0.5">June 11, 2026</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex flex-col">
                        <span className="text-slate-400 font-bold">GSTR-3B</span>
                        <span className="text-slate-700 font-black mt-0.5">June 20, 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* GST Calculator */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">GST Quick Calc</span>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="₹ Subtotal"
                        value={calcAmount}
                        onChange={(e) => setCalcAmount(e.target.value)}
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary"
                      />
                      <select
                        value={calcRate}
                        onChange={(e) => setCalcRate(Number(e.target.value))}
                        className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-primary cursor-pointer"
                      >
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    </div>

                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 grid grid-cols-3 gap-1 text-center font-mono text-[10px]">
                      <div>
                        <span className="text-slate-400">CGST</span>
                        <span className="block text-slate-700 font-black mt-0.5">₹{cgstAmount}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">SGST</span>
                        <span className="block text-slate-700 font-black mt-0.5">₹{sgstAmount}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">TOTAL</span>
                        <span className="block text-slate-900 font-extrabold mt-0.5">₹{totalCalculated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* GST Content: Tab 2 (Ask Auditor query submission form) */}
              {gstActiveTab === "query" && (
                <div className="space-y-3 pt-1 animate-fade-in text-left">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Raise Tax Doubt</div>
                  <div className="space-y-2">
                    <textarea
                      placeholder={t("வரி தொடர்பான சந்தேகங்களை இங்கு டைப் செய்யவும்...", "Type your GST or tax doubts here...")}
                      rows={2}
                      value={gstQueryText}
                      onChange={(e) => setGstQueryText(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!gstQueryText.trim()) return;
                        toast.success(
                          language === "ta"
                            ? "வரி சந்தேகம் சமர்ப்பிக்கப்பட்டது! வினவல் குறிப்பு எண்: #TNVS-GST-332 🚀"
                            : "Query submitted successfully! Ref ID: #TNVS-GST-332 🚀"
                        );
                        setGstQueryText("");
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-h-[36px]"
                    >
                      <Sparkles className="w-4 h-4 text-gold animate-spin" />
                      <span>{t("கேள்வி சமர்ப்பி", "Submit Query")}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Coordinator Widget — shown BELOW activity, not above */}
            {!isCoordinator ? (
              <div className="card-base p-5 md:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full translate-x-1/3 -translate-y-1/3" aria-hidden="true" />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-800">
                        {t("நிர்வாகியாக இணையுங்கள்", "Join as a Coordinator")}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-tamil mt-1">
                        {t(
                          "தலைமை ஏற்கத் தயாரா? உங்கள் பரிந்துரை லிங்க் மூலம் 25 வணிகர்களை ஒன்றிணைத்து, ஒருங்கிணைப்பாளர் பொறுப்பை பெற்றிடுங்கள்!",
                          "Ready to lead? Connect 25 traders using your unique referral link and earn the Coordinator title!"
                        )}
                      </p>
                    </div>
                    <button
                      onClick={handleOptInCoordinator}
                      className="btn-ghost text-sm"
                    >
                      <UserPlus className="w-4 h-4" aria-hidden="true" />
                      {language === "ta" ? "ஒருங்கிணைப்பாளராக இணையவும்" : "Activate Recruiter Status"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 text-white rounded-[12px] p-5 md:p-6 shadow-md relative overflow-hidden border border-slate-800/80">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" aria-hidden="true" />
                <div className="relative space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                        <Award className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <h3 className="font-display font-bold text-base text-gold">
                        {t("நிர்வாகியாக இணைய", "Become a Coordinator")}
                      </h3>
                    </div>
                    <span className="status-pill status-pending text-xs">
                      {t("ஒருங்கிணைப்பாளர்", "Coordinator")}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-sm text-slate-100 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                      {t("தலைமை ஏற்கத் தயாரா?", "Ready to lead?")}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-tamil">
                      {t(
                        "உங்கள் பரிந்துரை லிங்க் மூலம் 25 வணிகர்களை ஒன்றிணைத்து, 'ஒருங்கிணைப்பாளர்' பொறுப்பை பெற்றிடுங்கள்!",
                        "Bring together 25 traders using your referral link and earn the 'Coordinator' title!"
                      )}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-gold">{mockReferredMembers.length} / 25</span>
                      <span className="text-xs text-slate-400 font-tamil">
                        {t(
                          `${25 - mockReferredMembers.length} மேலும் பரிந்துரைகள் தேவை`,
                          `${25 - mockReferredMembers.length} more referrals needed`
                        )}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-linear-to-r from-primary to-navy h-2 rounded-full"
                        style={{ width: `${(mockReferredMembers.length / 25) * 100}%` }}
                        role="progressbar"
                        aria-valuenow={mockReferredMembers.length}
                        aria-valuemin={0}
                        aria-valuemax={25}
                        aria-label={`Referral progress: ${mockReferredMembers.length} of 25`}
                      />
                    </div>
                  </div>

                  {/* Milestones & Badges */}
                  <div className="pt-1.5 text-left">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                      {t("தனிப்பட்ட மைல்கற்கள்", "Milestone Badges")}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-900 border border-amber-500/35 rounded-xl p-2.5 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/10 rounded-full blur-md" />
                        <span className="text-lg">🥉</span>
                        <span className="text-[9px] font-black text-amber-500 tracking-wider uppercase mt-1">Bronze Vendor</span>
                        <span className="text-[8px] text-emerald-400 font-bold mt-0.5">{t("அன்லாக்", "Unlocked")} (5+)</span>
                      </div>
                      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center justify-center text-center opacity-65">
                        <span className="text-lg">🥈</span>
                        <span className="text-[9px] font-black text-slate-400 tracking-wider uppercase mt-1 font-sans">Silver Organizer</span>
                        <span className="text-[8px] text-slate-500 font-bold mt-0.5">LOCKED (15)</span>
                      </div>
                      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center justify-center text-center opacity-65">
                        <span className="text-lg">🥇</span>
                        <span className="text-[9px] font-black text-slate-400 tracking-wider uppercase mt-1 font-sans">Gold Coordinator</span>
                        <span className="text-[8px] text-slate-500 font-bold mt-0.5">LOCKED (25)</span>
                      </div>
                    </div>
                  </div>

                  {/* Referral Link — uses real origin domain */}
                  <div className="space-y-2">
                    <label
                      htmlFor="referral-link"
                      className="text-xs text-slate-400 font-bold uppercase tracking-wider block"
                    >
                      {t("பரிந்துரை இணைப்பு", "Referral Link")}
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="referral-link"
                        readOnly
                        type="text"
                        value={referralUrl}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-[10px] px-3.5 py-2.5 text-base md:text-xs font-mono text-slate-300 focus:outline-none min-h-[44px]"
                        aria-label="Your referral link — read only"
                      />
                      <button
                        onClick={handleCopyLink}
                        className="bg-primary hover:bg-primary/90 text-white p-2.5 rounded-[10px] transition flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px] cursor-pointer"
                        aria-label={t("நகலெடு", "Copy referral link")}
                      >
                        {copiedLink
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                          : <Copy className="w-4 h-4" aria-hidden="true" />
                        }
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 font-tamil">
                      {t(
                        "மேலும் உறுப்பினர்களை அழைக்க இந்த இணைப்பைப் பகிரவும்!",
                        "Share this link to invite more members!"
                      )}
                    </p>
                  </div>

                  {/* Top Recruiters Leaderboard */}
                  <div className="border-t border-slate-800 pt-4 space-y-2 text-left">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-gold" />
                      <span className="text-[10px] font-bold uppercase text-slate-200 tracking-wider">
                        {t("மாநில அளவிலான லீடர்போர்டு", "Top Recruiter Leaderboard")}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 pt-1 font-sans">
                      {[
                        { name: "Siva Shanmugam", location: "Salem", invites: 24, rank: "1st" },
                        { name: "Muthu Pandian", location: "Madurai", invites: 18, rank: "2nd" },
                        { name: "Senthil Kumar N (You)", location: "Chennai", invites: 5, rank: "3rd" },
                      ].map((item, index) => (
                        <div key={index} className={`flex items-center justify-between text-[11px] p-2 rounded-lg border ${
                          item.invites === 5 
                            ? "bg-primary/20 border-primary/40 text-white font-extrabold" 
                            : "bg-slate-900/40 border-slate-850 text-slate-350"
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className={`w-4 text-center font-bold font-mono text-[9px] ${index === 0 ? "text-gold" : index === 1 ? "text-slate-400" : "text-amber-600"}`}>
                              {item.rank}
                            </span>
                            <div>
                              <span className="font-semibold">{item.name}</span>
                              <span className="text-[9px] text-slate-500 ml-1 font-bold">({item.location})</span>
                            </div>
                          </div>
                          <span className="font-mono text-gold text-[10px] font-bold">{item.invites} {t("நபர்", "invites")}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Referred Members — CRM Smart Search & Filter */}
                  <div className="border-t border-slate-800 pt-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gold" aria-hidden="true" />
                        <span className="text-sm font-bold text-slate-200">
                          {t("பரிந்துரை உறுப்பினர்கள்", "Referred Members")}
                        </span>
                      </div>
                      <span className="text-[10px] bg-slate-900 text-slate-400 font-bold px-2 py-0.5 rounded border border-slate-800 font-mono">
                        {filteredReferredMembers.length} {t("நபர்", "matches")}
                      </span>
                    </div>

                    {/* Search Bar Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder={t("பெயர், கடை, மாவட்டம் அல்லது ID மூலம் தேடுக...", "Search by name, shop, district, or ID...")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-slate-700 min-h-[40px]"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-3.5 text-[9px] font-bold text-slate-400 hover:text-white"
                        >
                          CLEAR
                        </button>
                      )}
                    </div>

                    {/* Status Filter Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {[
                        { id: "all", label: "All" },
                        { id: "active", label: "Active" },
                        { id: "pending", label: "Pending" },
                        { id: "expired", label: "Expired" },
                      ].map((pill) => {
                        const active = statusFilter === pill.id;
                        return (
                          <button
                            key={pill.id}
                            type="button"
                            onClick={() => setStatusFilter(pill.id as any)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                              active
                                ? "bg-white text-slate-950 font-black shadow-xs"
                                : "bg-slate-900/50 hover:bg-slate-900 text-slate-400 border border-slate-800"
                            }`}
                          >
                            {pill.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Animated Member Search Results Grid */}
                    <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                      <AnimatePresence mode="popLayout">
                        {filteredReferredMembers.length > 0 ? (
                          filteredReferredMembers.map((m) => (
                            <motion.div
                              key={m.id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition"
                            >
                              <div className="space-y-0.5 text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-display font-bold text-slate-200 text-xs">{m.name}</span>
                                  <span className="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.2 rounded font-mono font-semibold">{m.id}</span>
                                </div>
                                <div className="text-[10px] text-slate-400 leading-none">
                                  {m.shop} • <span className="text-slate-500 font-bold">{m.district}</span>
                                </div>
                                <div className="text-[9px] text-slate-500 font-mono">
                                  Joined: {m.date}
                                </div>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-3.5 border-t border-slate-900 sm:border-0 pt-2 sm:pt-0 shrink-0">
                                <span className="text-[9px] font-bold text-slate-400 font-mono">{m.phone}</span>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                  m.status === "active"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : m.status === "pending"
                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                }`}>
                                  {m.status}
                                </span>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-6 text-center"
                          >
                            <p className="text-xs text-slate-500 font-tamil">பொருந்தும் உறுப்பினர்கள் இல்லை</p>
                            <p className="text-[10px] text-slate-600 mt-0.5">No matching members found.</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Unlocked Admin Analytics Gated Section */}
        {isCoordinator && (
          <AdminAnalyticsPanel t={t} language={language} />
        )}

        {/* Full-width Loan Categories Row */}
        <div id="loan-categories-section" className="mt-10 pt-10 border-t border-slate-200/80 animate-fade-in scroll-mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
                <Coins className="w-5 h-5 text-primary animate-bounce" />
                {t("கிடைக்கக்கூடிய கடன் திட்டங்கள்", "Available Loan Categories")}
              </h2>
              <p className="text-xs text-slate-500 font-tamil mt-1 leading-relaxed">
                {t("உங்கள் வணிக வளர்ச்சிக்கு தகுதியான உத்தியோகபூர்வ கடன் உதவிகள்", "Official subsidized loan categories tailored for your business growth")}
              </p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-bold border border-slate-200 uppercase tracking-wider self-start sm:self-center">
              3 {t("சேவைகள்", "services")}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Category 1: Interest-Free Business Loan */}
            <div 
              onClick={() => openDashboardLoanModal("business")}
              className="card-base card-interactive p-5 bg-white border border-slate-200 hover:border-primary/45 flex flex-col justify-between min-h-[220px] cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-sm text-slate-800 mt-4 leading-tight">
                  {t("வட்டியில்லா வணிகக் கடன்", "Interest-Free Business Loan")}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-tamil mt-2">
                  {t(
                    "Proprietorship, Freelancers, Pvt Ltd மற்றும் இறக்குமதி ஏற்றுமதி வணிகங்களுக்கு ₹25 லட்சம் வரை வட்டி இல்லா கடன்.",
                    "Up to ₹25 lakh interest-free loan for Pvt Ltd, partnerships, import/export, proprietorships and freelancers."
                  )}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase">
                  {t("0% வட்டி", "0% Interest")}
                </span>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:gap-1.5 transition-all">
                  {t("விண்ணப்பம்", "Request / Apply")} <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Category 2: Retail Trader Loan */}
            <div 
              onClick={() => openDashboardLoanModal("retail")}
              className="card-base card-interactive p-5 bg-white border border-slate-200 hover:border-primary/45 flex flex-col justify-between min-h-[220px] cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Store className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-sm text-slate-800 mt-4 leading-tight">
                  {t("சில்லறை வணிகர்கள் கடன்", "Retail Trader Loan")}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-tamil mt-2">
                  {t(
                    "பதிவுசெய்யப்பட்ட சில்லறை வணிகர்களுக்கு குறைந்தபட்ச ஆவணங்களுடன் விரைவான கடன் அனுமதி.",
                    "Fast loan approval for registered retail traders with minimal documentation."
                  )}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase">
                  {t("எளிய ஆவணங்கள்", "Easy Docs")}
                </span>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:gap-1.5 transition-all">
                  {t("விண்ணப்பம்", "Request / Apply")} <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Category 3: Young Entrepreneur Loan */}
            <div 
              onClick={() => openDashboardLoanModal("young")}
              className="card-base card-interactive p-5 bg-white border border-slate-200 hover:border-primary/45 flex flex-col justify-between min-h-[220px] cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-sm text-slate-800 mt-4 leading-tight">
                  {t("இளைய தொழில்முனைவோர் கடன்", "Young Entrepreneur Loan")}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-tamil mt-2">
                  {t(
                    "40 வயதுக்குட்பட்ட இளைய தொழில்முனைவோருக்கு சிறப்பு மானியத்துடன் கூடிய நிதி உதவி திட்டம்.",
                    "Special subsidised loan scheme for entrepreneurs under 40 years."
                  )}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full uppercase">
                  {t("மானியம் உண்டு", "Subsidized")}
                </span>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:gap-1.5 transition-all">
                  {t("விண்ணப்பம்", "Request / Apply")} <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SEAMLESS CONVERSATIONAL LOAN MODAL */}
      <AnimatePresence>
        {isLoanModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto bg-slate-900/40 backdrop-blur-xs">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoanModalOpen(false)}
              className="fixed inset-0"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-2xl overflow-hidden z-10"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-navy to-slate-950 px-5 py-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-gold animate-bounce" />
                  <div>
                    <h3 className="font-display font-bold text-sm text-gold leading-none">
                      {loanModalSubject}
                    </h3>
                    <p className="text-[10px] text-blue-300 font-tamil mt-1">
                      {t("உறுப்பினர் எளிய கடன் போர்டல்", "Subsidized Fast-Track Scheme")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsLoanModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Body & Multi-Step Wizard */}
              <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto bg-slate-50/50">
                {/* Chat Bot Intro */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    AI
                  </div>
                  <div className="bg-white border border-slate-200/80 p-3 rounded-2xl rounded-tl-none shadow-xs text-xs text-slate-700 leading-relaxed font-tamil">
                    {t(
                      "வணக்கம்! நான் உங்கள் கடன் உதவியாளர். உங்களது கடன் விண்ணப்பத்தை எளிய 3 படிகளில் சமர்ப்பிக்கலாம். உங்கள் உறுப்பினர் விவரங்கள் ஏற்கனவே சரிபார்க்கப்பட்டன.",
                      "Hello! I am your loan assistant. You can submit your application in 3 simple steps. Your verified member profile is linked."
                    )}
                  </div>
                </div>

                {/* Step 1: Request Amount Input */}
                {loanChatStep >= 1 && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        AI
                      </div>
                      <div className="bg-white border border-slate-200/80 p-3 rounded-2xl rounded-tl-none shadow-xs text-xs text-slate-700 font-tamil">
                        {t("உங்களுக்கு தேவையான கடன் தொகையைத் தேர்ந்தெடுக்கவும் அல்லது உள்ளிடவும்:", "Please choose or enter your desired loan amount:")}
                      </div>
                    </div>

                    <div className="pl-10 grid grid-cols-3 gap-2">
                      {["₹2,00,000", "₹5,00,000", "₹10,00,000"].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setLoanInputs({ ...loanInputs, amount: amt });
                            setLoanChatStep(2);
                          }}
                          className={`py-2 px-1 text-center rounded-lg border text-xs font-bold transition cursor-pointer ${
                            loanInputs.amount === amt
                              ? "bg-primary border-primary text-white"
                              : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          {amt}
                        </button>
                      ))}
                    </div>

                    <div className="pl-10 flex gap-2">
                      <input
                        type="text"
                        placeholder={t("விருப்பத் தொகை (எ.கா. ₹15,00,000)", "Custom amount (e.g. ₹15,00,000)")}
                        value={loanInputs.amount}
                        onChange={(e) => setLoanInputs({ ...loanInputs, amount: e.target.value })}
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-base md:text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary"
                      />
                      {loanInputs.amount.trim() !== "" && loanChatStep === 1 && (
                        <button
                          type="button"
                          onClick={() => setLoanChatStep(2)}
                          className="bg-primary hover:bg-primary/95 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          {t("அடுத்து", "Next")}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Confirmation / Verification */}
                {loanChatStep >= 2 && (
                  <div className="space-y-3 animate-fade-in">
                    {/* User Amount Bubble */}
                    <div className="flex justify-end gap-2.5">
                      <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-xs text-xs font-semibold">
                        {loanInputs.amount}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        AI
                      </div>
                      <div className="bg-white border border-slate-200/80 p-3 rounded-2xl rounded-tl-none shadow-xs text-xs text-slate-700 font-tamil leading-relaxed">
                        {t(
                          `அருமை! உங்களது பதிவு செய்யப்பட்ட பெயர்: செந்தில் குமார் N மற்றும் கைபேசி எண்: +91 944 20 •• 44. இந்த விவரங்களுடன் கடன் கோரிக்கையைச் சமர்ப்பிக்கலாமா?`,
                          `Excellent! Your registered name is Senthil Kumar N and mobile: +91 944 20 •• 44. Shall we submit the request with these details?`
                        )}
                      </div>
                    </div>

                    <div className="pl-10 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setLoanChatStep(3);
                          toast.success(
                            language === "ta"
                              ? "கடன் விண்ணப்பம் வெற்றிகரமாகச் சமர்ப்பிக்கப்பட்டது! 🚀"
                              : "Loan request submitted successfully! 🚀"
                          );
                        }}
                        className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg text-xs font-bold transition cursor-pointer flex-1"
                      >
                        {t("ஆம், சமர்ப்பி", "Yes, Submit Request")}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoanModalOpen(false);
                          toast.info(t("விண்ணப்பம் ரத்து செய்யப்பட்டது", "Application canceled"));
                        }}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        {t("ரத்து", "Cancel")}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Success Screen */}
                {loanChatStep === 3 && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        AI
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-2xl rounded-tl-none shadow-xs text-xs text-emerald-800 font-tamil leading-relaxed space-y-2">
                        <p className="font-bold flex items-center gap-1.5 text-emerald-900">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          {t("விண்ணப்பம் பெறப்பட்டது!", "Request Received!")}
                        </p>
                        <p>
                          {t(
                            "உங்களது குறிப்பு எண்: #L-998083. எங்கள் கடன் அதிகாரி 24 மணி நேரத்திற்குள் உங்களைத் தொடர்புகொள்வார். நன்றி!",
                            "Your reference number is #L-998083. Our loan officer will contact you within 24 hours. Thank you!"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="pl-10">
                      <button
                        type="button"
                        onClick={() => setIsLoanModalOpen(false)}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        {t("மூடு", "Close")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* HIGH-FIDELITY LIVE STREAM BROADCAST MODAL */}
        {isLiveStreamOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLiveStreamOpen(false)}
              className="fixed inset-0"
            />

            {/* Live Frame Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:grid md:grid-cols-12 min-h-[460px] md:h-[480px]"
            >
              {/* Left 8 Columns - Video Stream Canvas */}
              <div className="md:col-span-8 bg-black relative flex flex-col justify-between p-4 h-[280px] md:h-full">
                {/* Overlay header specs */}
                <div className="flex justify-between items-center z-10 w-full">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 bg-red-600 text-white font-black text-[9px] px-2 py-0.5 rounded tracking-widest uppercase animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      LIVE
                    </span>
                    <span className="bg-white/10 text-white/90 text-[9px] font-mono px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 font-semibold">
                      <Users className="w-3 h-3 text-red-400" />
                      482 watching
                    </span>
                  </div>
                  <button
                    onClick={() => setIsLiveStreamOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer md:hidden"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Simulated Visual Broadcast Waves & Graphics */}
                <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.25)_0%,rgba(0,0,0,1)_80%)] overflow-hidden pointer-events-none">
                  {/* Wave graphics */}
                  <div className="absolute w-[240px] h-[240px] rounded-full border border-primary/20 animate-ping opacity-60" style={{ animationDuration: "3s" }} />
                  <div className="absolute w-[360px] h-[360px] rounded-full border border-sky-500/10 animate-ping opacity-40" style={{ animationDuration: "5s" }} />
                  
                  <div className="text-center space-y-3 z-10">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xl font-bold animate-pulse mx-auto">
                      TNVS
                    </div>
                    <div className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">Simulated Video Feed Active</div>
                    <div className="text-xs text-slate-400 font- तमिल max-w-sm px-4">
                      {t("ஜிஎஸ்டி மற்றும் வணிகர் ஆலோசனை நேரலை ஒளிபரப்பு சென்னை அலுவலகத்திலிருந்து.", "GST & Trader Advisory live webinar feed broadcasted from Mylapore Office.")}
                    </div>
                  </div>
                </div>

                {/* Stream Footer Control Bar */}
                <div className="z-10 w-full flex items-center justify-between pt-4 border-t border-white/5 bg-gradient-to-t from-black/60 to-transparent p-2 rounded-xl">
                  <div className="text-[10px] text-white/70 font-semibold font-mono tracking-wide">
                    1080p Stream • Low Latency Mode
                  </div>
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] text-green-400 font-black uppercase tracking-wider font-sans">Server Connected</span>
                  </div>
                </div>
              </div>

              {/* Right 4 Columns - Scrolling Chat Panel */}
              <div className="md:col-span-4 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between h-[200px] md:h-full">
                {/* Chat Header */}
                <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-850 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span className="text-xs font-black uppercase text-slate-200 tracking-wider font-sans">Live Chat Feed</span>
                  </div>
                  <button
                    onClick={() => setIsLiveStreamOpen(false)}
                    className="hidden md:flex w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white items-center justify-center transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Comments Container */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col justify-end min-h-0 select-none">
                  {streamComments.map((comment) => (
                    <div key={comment.id} className="text-xs space-y-0.5 text-left bg-slate-950/30 p-2 rounded-xl border border-slate-850/40">
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className="text-gold font-sans">{comment.user}</span>
                        <span className="text-slate-500 uppercase tracking-widest">{comment.location}</span>
                      </div>
                      <p className="text-slate-300 font-tamil leading-relaxed">{comment.text}</p>
                    </div>
                  ))}
                </div>

                {/* Input Placeholder */}
                <div className="p-3.5 bg-slate-950/40 border-t border-slate-850 shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      disabled
                      placeholder={t("கமெண்ட் செய்ய உள்நுழையவும்...", "Signing in to chat...")}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-[10px] text-slate-500 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


function AdminAnalyticsPanel({ t, language }: { t: any; language: string }) {
  const [activeTab, setActiveTab] = useState<"overview" | "regional" | "welfare">("overview");
  
  // Sort State for Districts Leaderboard
  const [sortField, setSortField] = useState<"count" | "claims">("count");
  const [sortAsc, setSortAsc] = useState(false);

  // Line Chart Interactive Tooltip State
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sorting Handler
  const sortedDistricts = useMemo(() => {
    return [...districtStats].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [sortField, sortAsc]);

  const toggleSort = (field: "count" | "claims") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // SVG Chart Configs
  const chartHeight = 220;
  const chartWidth = 720;
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };

  const points = useMemo(() => {
    const xRange = chartWidth - padding.left - padding.right;
    const yRange = chartHeight - padding.top - padding.bottom;
    const maxVal = 135000;
    const minVal = 70000;

    return growthData.map((d, index) => {
      const x = padding.left + (index / (growthData.length - 1)) * xRange;
      const y = chartHeight - padding.bottom - ((d.members - minVal) / (maxVal - minVal)) * yRange;
      return { x, y, data: d };
    });
  }, [chartWidth, chartHeight]);

  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((path, p, idx) => {
      return idx === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
    }, "");
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const startX = points[0].x;
    const endX = points[points.length - 1].x;
    const bottomY = chartHeight - padding.bottom;
    return `${linePath} L ${endX} ${bottomY} L ${startX} ${bottomY} Z`;
  }, [points, linePath]);

  return (
    <div className="mt-10 pt-10 border-t border-slate-200/80 animate-fade-in max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-[4px]">
            {t("சங்கப் புள்ளிவிவரங்கள்", "ASSOCIATION ANALYTICS")}
          </div>
          <h2 className="mt-2 font-display text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary animate-pulse" />
            {t("மாநில சங்க பகுப்பாய்வு", "Statewide Association Analytics")}
          </h2>
          <p className="text-xs text-slate-500 font-tamil mt-1 leading-relaxed">
            {t("அசோசியேஷன் வளர்ச்சி, வட்டார முன்னிலை மற்றும் நிதி ஒதுக்கீடு விவரங்கள்.", "Comprehensive administrative oversight of member growth, district rankings, and welfare segments.")}
          </p>
        </div>

        {/* Sub-Header Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 self-start sm:self-center">
          {[
            { id: "overview", ta: "வளர்ச்சி", en: "Overview" },
            { id: "regional", ta: "வட்டாரம்", en: "Regional Layout" },
            { id: "welfare", ta: "நிதி", en: "Welfare & Credit" },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-1.5 px-3 rounded-lg font-display text-xs font-bold transition-all cursor-pointer ${
                  active ? "bg-white text-primary shadow-xs font-extrabold" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {language === "ta" ? tab.ta : tab.en}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <motion.div
            key="overview-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="card-base p-5 bg-gradient-to-br from-white to-blue-50/10 border border-slate-200/80 shadow-xs relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-sans">
                      {t("மொத்த உறுப்பினர்கள்", "ACTIVE MEMBERS")}
                    </span>
                    <div className="text-2xl font-extrabold text-slate-800 mt-1.5 tabular-nums">
                      1,24,560
                    </div>
                  </div>
                  <div className="p-1.5 bg-primary/10 text-primary rounded-lg"><Users className="w-4 h-4" /></div>
                </div>
                <div className="text-[10px] font-semibold text-emerald-600 mt-2 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+12.4% {t("இந்த மாதம்", "this month")}</span>
                </div>
              </div>
              {/* Card 2 */}
              <div className="card-base p-5 bg-gradient-to-br from-white to-emerald-50/10 border border-slate-200/80 shadow-xs relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-sans">
                      {t("நலத்திட்ட நிதி", "WELFARE DISBURSED")}
                    </span>
                    <div className="text-2xl font-extrabold text-slate-800 mt-1.5 tabular-nums">
                      ₹8.40 Cr
                    </div>
                  </div>
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-600 rounded-lg"><HeartPulse className="w-4 h-4" /></div>
                </div>
                <div className="text-[10px] font-semibold text-emerald-600 mt-2 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>94.8% {t("ஒப்புதல் விகிதம்", "approval rate")}</span>
                </div>
              </div>
              {/* Card 3 */}
              <div className="card-base p-5 bg-gradient-to-br from-white to-amber-50/10 border border-slate-200/80 shadow-xs relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-sans">
                      {t("வட்டியில்லா வணிகக் கடன்", "0% INTEREST LOANS")}
                    </span>
                    <div className="text-2xl font-extrabold text-slate-800 mt-1.5 tabular-nums">
                      ₹12.50 Cr
                    </div>
                  </div>
                  <div className="p-1.5 bg-amber-500/10 text-amber-600 rounded-lg"><Coins className="w-4 h-4" /></div>
                </div>
                <div className="text-[10px] font-semibold text-primary mt-2 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>420+ {t("விண்ணப்பதாரர்கள்", "traders assisted")}</span>
                </div>
              </div>
              {/* Card 4 */}
              <div className="card-base p-5 bg-gradient-to-br from-white to-indigo-50/10 border border-slate-200/80 shadow-xs relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-sans">
                      {t("மாநில மாவட்டங்கள்", "DISTRICT FOOTPRINT")}
                    </span>
                    <div className="text-2xl font-extrabold text-slate-800 mt-1.5 tabular-nums">
                      38 / 38
                    </div>
                  </div>
                  <div className="p-1.5 bg-indigo-500/10 text-indigo-600 rounded-lg"><Globe className="w-4 h-4" /></div>
                </div>
                <div className="text-[10px] font-semibold text-slate-500 mt-2 flex items-center gap-0.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span>100% {t("மாநிலப் பரப்பளவு", "statewide")}</span>
                </div>
              </div>
            </div>

            {/* SVG Line Chart */}
            <div className="card-base p-5 bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-primary animate-pulse" />
                  {t("உறுப்பினர் சேர்க்கை வளர்ச்சி", "Membership Growth Over Time")}
                </h3>
              </div>

              <div className="relative pt-2 pb-1 bg-gradient-to-b from-slate-50/50 to-white rounded-xl border border-slate-100 overflow-x-auto select-none">
                <svg 
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                  className="min-w-[640px] w-full h-[180px]"
                  onMouseLeave={() => {
                    setHoveredPoint(null);
                    setHoveredIndex(null);
                  }}
                >
                  <defs>
                    <linearGradient id="chartGradientDashboard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[80000, 100000, 120000].map((gridVal, i) => {
                    const yRange = chartHeight - padding.top - padding.bottom;
                    const y = chartHeight - padding.bottom - ((gridVal - 70000) / (135000 - 70000)) * yRange;
                    return (
                      <g key={i}>
                        <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                        <text x={padding.left - 10} y={y + 3} fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="end" className="font-mono">{`${gridVal / 1000}k`}</text>
                      </g>
                    );
                  })}

                  <path d={areaPath} fill="url(#chartGradientDashboard)" />
                  <path d={linePath} fill="none" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1={padding.left} y1={chartHeight - padding.bottom} x2={chartWidth - padding.right} y2={chartHeight - padding.bottom} stroke="#cbd5e1" strokeWidth="1.5" />

                  {points.map((p, index) => (
                    <g key={index}>
                      <text x={p.x} y={chartHeight - padding.bottom + 15} fill={hoveredIndex === index ? "#1e3a8a" : "#94a3b8"} fontSize="8" fontWeight="bold" textAnchor="middle" className="font-display font-sans">
                        {language === "ta" ? p.data.labelTa : p.data.month}
                      </text>
                      {hoveredIndex === index && <circle cx={p.x} cy={p.y} r="5" fill="#1e3a8a" stroke="#ffffff" strokeWidth="1.5" />}
                      <rect
                        x={p.x - 18}
                        y={padding.top}
                        width="36"
                        height={chartHeight - padding.top - padding.bottom}
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => {
                          setHoveredPoint(p.data);
                          setHoveredIndex(index);
                        }}
                      />
                    </g>
                  ))}
                </svg>

                {/* Floating Tooltip */}
                <AnimatePresence>
                  {hoveredPoint && hoveredIndex !== null && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      className="absolute bg-slate-900 text-white rounded-lg p-2.5 shadow-md border border-slate-800 pointer-events-none text-xs space-y-0.5"
                      style={{
                        left: `${Math.min(Math.max((hoveredIndex / (growthData.length - 1)) * 82 + 6, 10), 80)}%`,
                        top: "16px"
                      }}
                    >
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        {language === "ta" ? hoveredPoint.labelTa : hoveredPoint.month}
                      </div>
                      <div className="font-mono text-xs font-black text-amber-400">
                        {hoveredPoint.members.toLocaleString()} {language === "ta" ? "வணிகர்கள்" : "Traders"}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: REGIONAL */}
        {activeTab === "regional" && (
          <motion.div
            key="regional-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid lg:grid-cols-12 gap-5 animate-fade-in"
          >
            {/* Districts Leaderboard */}
            <div className="lg:col-span-7 card-base p-5 bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-sm text-slate-800">
                  {t("மாவட்ட முன்னிலை அட்டவணை", "Active Districts Leaderboard")}
                </h3>
                <div className="flex gap-1.5 text-[9px] font-bold uppercase">
                  <button 
                    onClick={() => toggleSort("count")}
                    className={`px-2 py-1 border rounded-md flex items-center gap-0.5 transition cursor-pointer ${sortField === "count" ? "bg-primary border-primary text-white" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-500"}`}
                  >
                    <span>{t("உறுப்பினர்கள்", "Traders")}</span>
                    <ArrowUpDown className="w-2.5 h-2.5" />
                  </button>
                  <button 
                    onClick={() => toggleSort("claims")}
                    className={`px-2 py-1 border rounded-md flex items-center gap-0.5 transition cursor-pointer ${sortField === "claims" ? "bg-primary border-primary text-white" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-500"}`}
                  >
                    <span>{t("கோரிக்கைகள்", "Claims")}</span>
                    <ArrowUpDown className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-100 max-h-[280px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                    <tr>
                      <th className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase">{t("மாவட்டம்", "District")}</th>
                      <th className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase text-right">{t("உறுப்பினர்கள்", "Traders")}</th>
                      <th className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase text-right">{t("கோரிக்கைகள்", "Claims")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDistricts.map((dist, idx) => (
                      <tr key={dist.nameEn} className="border-b border-slate-100 hover:bg-slate-50/50 transition text-slate-700">
                        <td className="px-3 py-2.5 text-xs font-bold text-slate-800">
                          <span className="text-[10px] text-slate-400 font-mono mr-1">{idx + 1}.</span>
                          {language === "ta" ? dist.nameTa : dist.nameEn}
                        </td>
                        <td className="px-3 py-2.5 text-xs font-bold font-mono text-slate-800 text-right tabular-nums">{dist.count.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-xs font-bold font-mono text-right text-indigo-600 tabular-nums">
                          {dist.claims} <span className="text-[9px] font-normal text-slate-400">({dist.ratio})</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Wings Distribution */}
            <div className="lg:col-span-5 card-base p-5 bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-primary animate-pulse" />
                  {t("துறை வாரியான பகிர்வு", "Wings Distribution")}
                </h3>
              </div>

              <div className="space-y-3.5 pt-1">
                {wingMetrics.map((wing) => (
                  <div key={wing.id} className="space-y-1">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-slate-600 text-xxs">
                        {language === "ta" ? wing.nameTa : wing.nameEn}
                      </span>
                      <div className="flex gap-1.5 items-center font-mono text-xxs">
                        <span className="font-bold text-slate-800">{wing.count.toLocaleString()}</span>
                        <span className="text-[9px] text-slate-400 bg-slate-50 px-1 rounded font-semibold">{wing.percentage}%</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${wing.percentage}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${wing.colorClass}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: WELFARE & CREDIT */}
        {activeTab === "welfare" && (
          <motion.div
            key="welfare-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid lg:grid-cols-12 gap-5 animate-fade-in"
          >
            {/* Donut Chart */}
            <div className="lg:col-span-5 card-base p-5 bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-1.5">
                  <PieIcon className="w-4 h-4 text-primary animate-pulse" />
                  {t("நலத்திட்ட நிதி ஒதுக்கீடு", "Welfare Allocation Donut")}
                </h3>
              </div>

              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                    {welfareDistribution.map((seg, idx) => (
                      <circle
                        key={idx}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="10"
                        strokeDasharray={seg.dashArray}
                        strokeDashoffset={seg.dashOffset}
                        strokeLinecap="round"
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[8px] font-black text-slate-400 font-sans tracking-wide">TOTAL</span>
                    <span className="text-xs font-black text-slate-800 font-mono">₹8.40 Cr</span>
                  </div>
                </div>

                <div className="w-full space-y-1.5 text-xxs">
                  {welfareDistribution.map((seg, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-50 border border-slate-100/50 px-2 py-1.5 rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                        <span className="font-bold text-slate-600">
                          {language === "ta" ? seg.nameTa : seg.nameEn}
                        </span>
                      </div>
                      <div className="font-mono font-bold text-slate-800">
                        {seg.amount} <span className="text-[8px] text-slate-400 font-normal">({seg.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Credit Info */}
            <div className="lg:col-span-7 card-base p-5 bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-emerald-600" />
                  {t("வட்டியற்ற கடனுதவி", "0% Interest Credit Scheme")}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg space-y-0.5">
                  <div className="text-[8px] font-black uppercase text-slate-400 tracking-wide">ASSISTANCE CAP</div>
                  <div className="text-base font-black text-slate-800">₹25,00,000</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg space-y-0.5">
                  <div className="text-[8px] font-black uppercase text-slate-400 tracking-wide">REQUEST TIME</div>
                  <div className="text-base font-black text-slate-800">48-72 Hours</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                  {t("கடன் விநியோகப் பிரிவு", "Capital Distribution")}
                </h4>
                
                {[
                  { label: "Proprietorship & Retail", percentage: 55, amount: "₹6.87 Cr", color: "bg-amber-500" },
                  { label: "Partnership & Pvt Ltd", percentage: 30, amount: "₹3.75 Cr", color: "bg-blue-500" },
                  { label: "Freelancers & Home-based", percentage: 15, amount: "₹1.88 Cr", color: "bg-purple-500" },
                ].map((sec) => (
                  <div key={sec.label} className="space-y-1">
                    <div className="flex justify-between text-xxs font-semibold">
                      <span className="text-slate-500 font-display">{sec.label}</span>
                      <span className="font-mono text-slate-800">{sec.amount} ({sec.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-150 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sec.percentage}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${sec.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
      <div className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-sm text-slate-800 font-semibold mt-0.5">{value}</div>
    </div>
  );
}
