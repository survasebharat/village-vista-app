import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      "header.title": "Shivankhed Village",
      "header.about": "About",
      "header.services": "Services", 
      "header.panchayat": "Panchayat",
      "header.contact": "Contact",
      
      // Hero
      "hero.title": "Welcome to Shivankhed Village",
      "hero.subtitle": "A Progressive Village in Latur District, Maharashtra",
      "hero.description": "Discover our vibrant community, rich culture, and development initiatives that make Shivankhed a model village in rural Maharashtra.",
      "hero.explore": "Explore Village",
      "hero.contact": "Contact Panchayat",
      
      // About
      "about.title": "About Our Village",
      "about.description": "Discover the rich heritage, vibrant culture, and progressive development of Shivankhed village.",
      "about.location": "Location & Geography",
      "about.population": "Demographics",
      "about.culture": "Culture & Traditions",
      "about.established": "Established",
      
      // Announcements
      "announcements.title": "Latest Announcements",
      "announcements.description": "Stay updated with important notices, meeting schedules, and development updates from your Gram Panchayat.",
      "announcements.published": "Published",
      "announcements.addToCalendar": "Add to Calendar",
      "announcements.stayUpdated": "Stay Updated",
      "announcements.neverMiss": "Never miss important announcements from your Gram Panchayat. Get notified about meetings, schemes, and development updates.",
      "announcements.whatsapp": "WhatsApp Updates",
      "announcements.joinGroup": "Join community group",
      "announcements.noticeBoard": "Notice Board",
      "announcements.visitOffice": "Visit Panchayat office",
      "announcements.contactUpdates": "Contact for Updates",
      
      // Panchayat
      "panchayat.title": "Panchayat Representatives",
      "panchayat.sarpanch": "Sarpanch",
      "panchayat.wardMembers": "Ward Members",
      "panchayat.secretary": "Panchayat Secretary",
      "panchayat.staff": "Panchayat Staff",
      "panchayat.tenure": "Tenure",
      "panchayat.message": "Working together for the prosperity and development of our beloved village community.",
      "panchayat.officeHours": "Office Hours",
      "panchayat.responsibilities": "Panchayat Responsibilities",
      
      // Services
      "services.title": "Village Services",
      "services.description": "Discover all the essential services available in our village community.",
      "services.owner": "Owner",
      "services.doctor": "Doctor",
      "services.teacher": "Teacher", 
      "services.pujari": "Pujari",
      "services.category.retailgrocery": "Retail & Grocery",
      "services.category.transportation": "Transportation",
      "services.category.religiousservices": "Religious Services",
      "services.category.education": "Education",
      "services.category.fooddining": "Food & Dining",
      "services.category.healthcare": "Healthcare",
      
      // Schemes
      "schemes.title": "Government Schemes & Services",
      "schemes.description": "Access various government schemes and services designed for rural community development.",
      "schemes.benefits": "Benefits",
      "schemes.eligibility": "Eligibility",
      "schemes.process": "Application Process",
      "schemes.applyNow": "Apply Now",
      "schemes.learnMore": "Learn More",
      "schemes.needHelp": "Need Help with Applications?",
      
      // Development
      "development.title": "Development Works",
      "development.description": "Track the progress of various development projects undertaken in our village.",
      "development.summary": "Development Summary",
      "development.completed": "Completed Projects",
      "development.ongoing": "Ongoing Projects", 
      "development.planned": "Planned Projects",
      "development.totalInvestment": "Total Investment",
      "development.budget": "Budget",
      "development.timeline": "Timeline",
      "development.progress": "Progress",
      
      // Gallery
      "gallery.title": "Village Gallery",
      "gallery.description": "Capture the essence of our village through memorable moments and events.",
      "gallery.categories": "Gallery Categories",
      "gallery.viewAll": "View All",
      "gallery.shareYourMoments": "Share Your Village Moments",
      "gallery.uploadDescription": "Help us build a comprehensive gallery of our village life. Upload your photos of events, landscapes, and daily life.",
      "gallery.acceptedTypes": "Accepted: JPG, PNG, MP4 (Max 10MB)",
      "gallery.moderation": "All uploads are subject to moderation",
      "gallery.uploadNow": "Upload Now",
      
      // Contact
      "contact.title": "Contact Us",
      "contact.description": "Get in touch with our Panchayat office for any queries or assistance.",
      "contact.office": "Panchayat Office",
      "contact.emergency": "Emergency Contacts",
      "contact.getDirections": "Get Directions",
      "contact.sendMessage": "Send Message",
      "contact.name": "Full Name",
      "contact.phone": "Phone Number",
      "contact.email": "Email Address",
      "contact.subject": "Subject",
      "contact.message": "Your Message",
      "contact.submit": "Send Message",
      "contact.quickServices": "Quick Services",
      "contact.apply": "Apply",
      
      // Footer
      "footer.about": "About Shivankhed",
      "footer.aboutDescription": "A progressive village committed to sustainable development and community welfare.",
      "footer.quickLinks": "Quick Links",
      "footer.services": "Services",
      "footer.followUs": "Follow Us",
      "footer.governmentLinks": "Government Links",
      "footer.address": "Address",
      "footer.phone": "Phone",
      "footer.email": "Email",
      "footer.copyright": "© 2024 Shivankhed Village Panchayat. All rights reserved.",
      
      // Common
      "common.district": "District",
      "common.state": "State",
      "common.readMore": "Read More",
      "common.viewDetails": "View Details",
      "common.close": "Close",
      "common.loading": "Loading...",
      "common.today": "Today",
      "common.yesterday": "Yesterday",
      "common.tomorrow": "Tomorrow",
      "common.high": "High",
      "common.medium": "Medium", 
      "common.low": "Low"
    }
  },
  hi: {
    translation: {
      // Header
      "header.title": "शिवानखेड गांव",
      "header.about": "हमारे बारे में",
      "header.services": "सेवाएं",
      "header.panchayat": "पंचायत",
      "header.contact": "संपर्क",
      
      // Hero
      "hero.title": "शिवानखेड गांव में आपका स्वागत है",
      "hero.subtitle": "लातूर जिला, महाराष्ट्र में एक प्रगतिशील गांव",
      "hero.description": "हमारे जीवंत समुदाय, समृद्ध संस्कृति और विकास पहलों की खोज करें जो शिवानखेड को ग्रामीण महाराष्ट्र में एक आदर्श गांव बनाते हैं।",
      "hero.explore": "गांव देखें",
      "hero.contact": "पंचायत संपर्क",
      
      // About
      "about.title": "हमारे गांव के बारे में",
      "about.description": "शिवानखेड गांव की समृद्ध विरासत, जीवंत संस्कृति और प्रगतिशील विकास की खोज करें।",
      "about.location": "स्थान और भूगोल",
      "about.population": "जनसांख्यिकी",
      "about.culture": "संस्कृति और परंपराएं",
      "about.established": "स्थापित",
      
      // Announcements
      "announcements.title": "नवीनतम घोषणाएं",
      "announcements.description": "अपने ग्राम पंचायत से महत्वपूर्ण सूचनाओं, बैठक कार्यक्रम और विकास अपडेट के साथ अपडेट रहें।",
      "announcements.published": "प्रकाशित",
      "announcements.addToCalendar": "कैलेंडर में जोड़ें",
      "announcements.stayUpdated": "अपडेट रहें",
      "announcements.neverMiss": "अपने ग्राम पंचायत की महत्वपूर्ण घोषणाओं को कभी न चूकें। बैठकों, योजनाओं और विकास अपडेट की सूचना प्राप्त करें।",
      "announcements.whatsapp": "व्हाट्सऐप अपडेट",
      "announcements.joinGroup": "समुदायिक समूह में शामिल हों",
      "announcements.noticeBoard": "नोटिस बोर्ड",
      "announcements.visitOffice": "पंचायत कार्यालय जाएं",
      "announcements.contactUpdates": "अपडेट के लिए संपर्क करें",
      
      // Panchayat
      "panchayat.title": "पंचायत प्रतिनिधि",
      "panchayat.sarpanch": "सरपंच",
      "panchayat.wardMembers": "वार्ड सदस्य",
      "panchayat.secretary": "पंचायत सचिव",
      "panchayat.staff": "पंचायत कर्मचारी",
      "panchayat.tenure": "कार्यकाल",
      "panchayat.message": "हमारे प्रिय गांव समुदाय की समृद्धि और विकास के लिए मिलकर काम कर रहे हैं।",
      "panchayat.officeHours": "कार्यालय समय",
      "panchayat.responsibilities": "पंचायत की जिम्मेदारियां",
      
      // Services
      "services.title": "गांव की सेवाएं",
      "services.description": "हमारे गांव समुदाय में उपलब्ध सभी आवश्यक सेवाओं की खोज करें।",
      "services.owner": "मालिक",
      "services.doctor": "डॉक्टर",
      "services.teacher": "शिक्षक",
      "services.pujari": "पुजारी",
      "services.category.retailgrocery": "खुदरा और किराना",
      "services.category.transportation": "परिवहन",
      "services.category.religiousservices": "धार्मिक सेवाएं",
      "services.category.education": "शिक्षा",
      "services.category.fooddining": "भोजन और भोजनालय",
      "services.category.healthcare": "स्वास्थ्य सेवा",
      
      // Common
      "common.district": "जिला",
      "common.state": "राज्य",
      "common.high": "उच्च",
      "common.medium": "मध्यम",
      "common.low": "कम"
    }
  },
  mr: {
    translation: {
      // Header
      "header.title": "शिवानखेड गाव",
      "header.about": "आमच्याबद्दल",
      "header.services": "सेवा",
      "header.panchayat": "पंचायत",
      "header.contact": "संपर्क",
      
      // Hero
      "hero.title": "शिवानखेड गावात आपले स्वागत आहे",
      "hero.subtitle": "लातूर जिल्हा, महाराष्ट्रातील एक प्रगतीशील गाव",
      "hero.description": "आमच्या जोमदार समुदाय, समृद्ध संस्कृती आणि विकास उपक्रमांचा शोध घ्या जे शिवानखेडला ग्रामीण महाराष्ट्रातील एक आदर्श गाव बनवतात।",
      "hero.explore": "गाव पहा",
      "hero.contact": "पंचायत संपर्क",
      
      // About
      "about.title": "आमच्या गावाबद्दल",
      "about.description": "शिवानखेड गावाचा समृद्ध वारसा, जोमदार संस्कृती आणि प्रगतीशील विकास शोधा।",
      "about.location": "स्थान आणि भूगोल",
      "about.population": "लोकसंख्याशास्त्र",
      "about.culture": "संस्कृती आणि परंपरा",
      "about.established": "स्थापित",
      
      // Announcements
      "announcements.title": "नवीनतम घोषणा",
      "announcements.description": "आपल्या ग्राम पंचायतकडून महत्वाच्या सूचना, सभेचे वेळापत्रक आणि विकास अपडेटसह अपडेट राहा।",
      "announcements.published": "प्रकाशित",
      "announcements.addToCalendar": "कॅलेंडरमध्ये जोडा",
      "announcements.stayUpdated": "अपडेट राहा",
      "announcements.neverMiss": "आपल्या ग्राम पंचायतच्या महत्वाच्या घोषणा कधीही चुकवू नका। सभा, योजना आणि विकास अपडेटची सूचना मिळवा।",
      "announcements.whatsapp": "व्हाट्सऍप अपडेट",
      "announcements.joinGroup": "समुदायिक गटात सामील व्हा",
      "announcements.noticeBoard": "सूचना फलक",
      "announcements.visitOffice": "पंचायत कार्यालयात भेट द्या",
      "announcements.contactUpdates": "अपडेटसाठी संपर्क साधा",
      
      // Panchayat
      "panchayat.title": "पंचायत प्रतिनिधी",
      "panchayat.sarpanch": "सरपंच",
      "panchayat.wardMembers": "वॉर्ड सदस्य",
      "panchayat.secretary": "पंचायत सचिव",
      "panchayat.staff": "पंचायत कर्मचारी",
      "panchayat.tenure": "कार्यकाळ",
      "panchayat.message": "आमच्या प्रिय गाव समुदायाची समृद्धी आणि विकासासाठी एकत्र काम करत आहोत।",
      "panchayat.officeHours": "कार्यालयीन वेळ",
      "panchayat.responsibilities": "पंचायतच्या जबाबदाऱ्या",
      
      // Services
      "services.title": "गावातील सेवा",
      "services.description": "आमच्या गाव समुदायात उपलब्ध असलेल्या सर्व आवश्यक सेवांचा शोध घ्या।",
      "services.owner": "मालक",
      "services.doctor": "डॉक्टर", 
      "services.teacher": "शिक्षक",
      "services.pujari": "पुजारी",
      "services.category.retailgrocery": "किरकोळ आणि किराणा",
      "services.category.transportation": "वाहतूक",
      "services.category.religiousservices": "धार्मिक सेवा",
      "services.category.education": "शिक्षण",
      "services.category.fooddining": "अन्न आणि जेवणघर",
      "services.category.healthcare": "आरोग्य सेवा",
      
      // Common
      "common.district": "जिल्हा",
      "common.state": "राज्य",
      "common.high": "उच्च",
      "common.medium": "मध्यम",
      "common.low": "कमी"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;