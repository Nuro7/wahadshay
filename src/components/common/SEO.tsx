import { useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export interface SEOProps {
  page: "home" | "about" | "specials" | "franchise" | "gallery" | "contact" | "404";
}

const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://wahad-shay.vercel.app").replace(/\/$/, "");

const pageMeta: Record<string, {
  path: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}> = {
  home: {
    path: "/",
    titleEn: "Wahad Shay | Signature Karak & Specialty Teas UAE",
    titleAr: "واحد شاي | كرك مميز وشاي مختص ومخبوزات حرفية",
    descEn: "Wahad Shay — A World of Flavor in One Place. Globally inspired premium teas, authentic karak rituals, and artisanal baked delicacies across the UAE.",
    descAr: "واحد شاي — عالم من النكهات في مكان واحد. شاي كرك أصيل بنكهات عالمية فاخرة ومخبوزات حرفية طازجة في فروعنا بالإمارات.",
  },
  about: {
    path: "/about",
    titleEn: "About Us | Wahad Shay — Our Story & Heritage",
    titleAr: "قصتنا وتاريخنا | واحد شاي",
    descEn: "Discover the journey of Wahad Shay — from our first branch in Hamidiya to Abu Dhabi and Sharjah, creating communal tea rituals and culinary craft.",
    descAr: "اكتشف قصة وتاريخ واحد شاي — انطلاقتنا من الحامدية إلى أبوظبي والشارقة برؤية عصرية وكرم ضيافة أصيل.",
  },
  specials: {
    path: "/specials",
    titleEn: "Specials & Menu | Wahad Shay — Signature Pairings",
    titleAr: "المميزات والمشروبات | واحد شاي",
    descEn: "Explore Wahad Shay weekly highlights and signature pairings: Hot Chicken Burger, Juicy Dip, seasoned rice bakes, and authentic Karak tea.",
    descAr: "استكشف تشكيلة مميزات وأطباق واحد شاي: برجر الدجاج الحار، ميني بايتس مقرمشة، ومشروبات شاي الكرك المميزة.",
  },
  franchise: {
    path: "/franchise",
    titleEn: "Franchise Opportunities | Partner with Wahad Shay",
    titleAr: "فرص الامتياز التجاري | واحد شاي",
    descEn: "Partner with Wahad Shay. Proven F&B systems, centralized authentic recipes, operational SOPs, and rapid regional expansion across the UAE.",
    descAr: "كن شريكاً في نجاح واحد شاي. أنظمة تشغيلية قياسية، وصفات مركزية سرية، وتوسع مستمر في جميع أنحاء الإمارات.",
  },
  gallery: {
    path: "/gallery",
    titleEn: "Visual Journal & Moments | Wahad Shay Gallery",
    titleAr: "معرض الصور واللحظات | واحد شاي",
    descEn: "A taste of our story — browse through authentic café moments, artisan pastries, behind-the-scenes teas, and guest experiences.",
    descAr: "لمحة من قصتنا — استعرض أجواء مقاهي واحد شاي، تحضير الشاي المختص، ولحظات ضيوفنا الاستثنائية.",
  },
  contact: {
    path: "/contact",
    titleEn: "Contact & Branches | Wahad Shay Abu Dhabi & UAE",
    titleAr: "تواصل معنا وفروعنا | واحد شاي",
    descEn: "Get in touch with Wahad Shay Flagship HQ in Abu Dhabi or visit our branches in Hamidiya, Al Wahda, Al Falah, and Sharjah.",
    descAr: "تواصل مع الإدارة العامة لواحد شاي في أبوظبي أو قم بزيارة فروعنا في الحامدية، الوحدة، الفلاح، والشارقة.",
  },
  "404": {
    path: "/404",
    titleEn: "Page Not Found | Wahad Shay",
    titleAr: "الصفحة غير موجودة | واحد شاي",
    descEn: "The page you are looking for does not exist. Explore Wahad Shay's signature teas and specials.",
    descAr: "الصفحة التي تبحث عنها غير موجودة. استكشف شاي كرك ومميزات واحد شاي.",
  },
};

export function SEO({ page }: SEOProps) {
  const { language, t } = useLanguage();
  const meta = pageMeta[page] || pageMeta.home;
  const isArabic = language === "AR";
  const title = isArabic ? meta.titleAr : meta.titleEn;
  const description = isArabic ? meta.descAr : meta.descEn;
  const canonicalUrl = `${SITE_URL}${meta.path === "/" ? "" : meta.path}`;
  const ogImageUrl = `${SITE_URL}/logo_wahad.webp`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to safely set meta tag content
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Update Standard Meta Description
    setMeta("name", "description", description);

    // 3. Update Open Graph Tags
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImageUrl);
    setMeta("property", "og:locale", isArabic ? "ar_AE" : "en_AE");

    // 4. Update Twitter Card Tags
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImageUrl);

    // 5. Update Canonical Tag
    let canonicalLink = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      canonicalLink.setAttribute("id", "canonical-tag");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 6. Dynamic Route Schema (BreadcrumbList & FAQPage for Contact)
    const schemaId = "dynamic-route-schema";
    let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = schemaId;
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }

    const schemas: any[] = [];

    // BreadcrumbList for subpages
    if (page !== "home" && page !== "404") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": isArabic ? "الرئيسية" : "Home",
            "item": `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": isArabic ? meta.titleAr.split(" | ")[0] : meta.titleEn.split(" | ")[0],
            "item": canonicalUrl
          }
        ]
      });
    }

    // FAQPage schema for Contact/FAQ page
    if (page === "contact") {
      const faqItems = (t("faq.items") as any) || [];
      if (Array.isArray(faqItems) && faqItems.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map((item: { question: string; answer: string }) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        });
      }
    }

    if (schemas.length > 0) {
      scriptEl.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : {
        "@context": "https://schema.org",
        "@graph": schemas
      }, null, 2);
    } else {
      scriptEl.textContent = "";
    }

    return () => {
      // Clean up script if component unmounts
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.textContent = "";
      }
    };
  }, [page, language, title, description, canonicalUrl, ogImageUrl, isArabic, meta.titleAr, meta.titleEn, t]);

  return null;
}

export default SEO;
