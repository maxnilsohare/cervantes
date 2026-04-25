type SocialLink = {
  label: string;
  href: string;
  iconSrc?: string;
};

const companyPhoneDisplay = "+34 951 000 000";
const companyPhoneHref = "+34951000000";
const companyEmail = "hello@cervantesadvisory.com";

export const siteConfig = {
  name: "Cervantes Boutique Property Advisory",
  url: "https://www.cervantesadvisory.com",
  location: "Marbella, Costa del Sol, Spain",
  contact: {
    companyEmail,
    companyPhone: companyPhoneDisplay,
    companyPhoneHref,
    advisorName: "Jennifer Fogelberg",
    advisorEmail: companyEmail,
    advisorPhone: companyPhoneDisplay,
    advisorPhoneHref: companyPhoneHref,
    whatsappNumber: companyPhoneDisplay,
    whatsappHrefNumber: "34951000000",
  },
  socialLinks: [] as SocialLink[],
};
