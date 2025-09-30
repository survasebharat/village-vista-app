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
      "gallery.description": "Explore memorable moments from our village life, festivals, development projects, and community events that showcase our rich heritage and progress.",
      "gallery.categories": "Gallery Categories",
      "gallery.viewAll": "View All",
      "gallery.photo": "photo",
      "gallery.photos": "photos",
      "gallery.shareYourMoments": "Share Your Village Moments",
      "gallery.uploadDescription": "Have photos or videos from village events? Share them with us to be featured in our community gallery. Help us document our village's journey and celebrate our achievements together.",
      "gallery.acceptedTypes": "Photos & Videos Welcome",
      "gallery.moderation": "Community Moderated",
      
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
      "footer.aboutDescription": "A progressive village committed to sustainable development, transparent governance, and inclusive growth for all residents.",
      "footer.quickLinks": "Quick Links",
      "footer.aboutVillage": "About Village",
      "footer.panchayatMembers": "Panchayat Members",
      "footer.governmentSchemes": "Government Schemes",
      "footer.developmentWorks": "Development Works",
      "footer.services": "Services",
      "footer.birthCertificate": "Birth Certificate",
      "footer.deathCertificate": "Death Certificate",
      "footer.propertyTax": "Property Tax",
      "footer.rtiApplication": "RTI Application",
      "footer.contactInfo": "Contact Info",
      "footer.followUs": "Follow Us",
      "footer.copyright": "© {{year}} {{village}}. All rights reserved.",
      "footer.tagline": "Developed for transparent and efficient rural governance",
      "footer.privacyPolicy": "Privacy Policy",
      "footer.termsOfService": "Terms of Service",
      "footer.rtiGuidelines": "RTI Guidelines",
      "footer.officialLinks": "Official Links",
      
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
      
      // Gallery
      "gallery.title": "गांव की गैलरी",
      "gallery.description": "हमारे गांव के जीवन, त्योहारों, विकास परियोजनाओं और सामुदायिक कार्यक्रमों के यादगार पलों का अन्वेषण करें जो हमारी समृद्ध विरासत और प्रगति को दर्शाते हैं।",
      "gallery.categories": "गैलरी श्रेणियां",
      "gallery.viewAll": "सभी देखें",
      "gallery.photo": "फोटो",
      "gallery.photos": "फोटो",
      "gallery.shareYourMoments": "अपने गांव के पल साझा करें",
      "gallery.uploadDescription": "गांव के कार्यक्रमों की फोटो या वीडियो हैं? उन्हें हमारे साथ साझा करें ताकि वे हमारी सामुदायिक गैलरी में प्रदर्शित हो सकें। हमारे गांव की यात्रा का दस्तावेजीकरण करने और हमारी उपलब्धियों को एक साथ मनाने में हमारी मदद करें।",
      "gallery.acceptedTypes": "फोटो और वीडियो स्वागत है",
      "gallery.moderation": "समुदाय द्वारा मॉडरेट",
      
      // Footer
      "footer.aboutDescription": "एक प्रगतिशील गांव जो सतत विकास, पारदर्शी शासन और सभी निवासियों के लिए समावेशी विकास के लिए प्रतिबद्ध है।",
      "footer.quickLinks": "त्वरित लिंक",
      "footer.aboutVillage": "गांव के बारे में",
      "footer.panchayatMembers": "पंचायत सदस्य",
      "footer.governmentSchemes": "सरकारी योजनाएं",
      "footer.developmentWorks": "विकास कार्य",
      "footer.services": "सेवाएं",
      "footer.birthCertificate": "जन्म प्रमाणपत्र",
      "footer.deathCertificate": "मृत्यु प्रमाणपत्र",
      "footer.propertyTax": "संपत्ति कर",
      "footer.rtiApplication": "आरटीआई आवेदन",
      "footer.contactInfo": "संपर्क जानकारी",
      "footer.followUs": "हमें फॉलो करें",
      "footer.copyright": "© {{year}} {{village}}। सर्वाधिकार सुरक्षित।",
      "footer.tagline": "पारदर्शी और कुशल ग्रामीण शासन के लिए विकसित",
      "footer.privacyPolicy": "गोपनीयता नीति",
      "footer.termsOfService": "सेवा की शर्तें",
      "footer.rtiGuidelines": "आरटीआई दिशानिर्देश",
      "footer.officialLinks": "आधिकारिक लिंक",
      
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
      
      // Gallery
      "gallery.title": "गावाची गॅलरी",
      "gallery.description": "आमच्या गावातील जीवन, सण, विकास प्रकल्प आणि समुदायिक कार्यक्रमांचे संस्मरणीय क्षण शोधा जे आमचा समृद्ध वारसा आणि प्रगती दर्शवतात।",
      "gallery.categories": "गॅलरी श्रेणी",
      "gallery.viewAll": "सर्व पहा",
      "gallery.photo": "फोटो",
      "gallery.photos": "फोटो",
      "gallery.shareYourMoments": "आपले गावातील क्षण शेअर करा",
      "gallery.uploadDescription": "गावातील कार्यक्रमांचे फोटो किंवा व्हिडिओ आहेत? आमच्या समुदायिक गॅलरीमध्ये प्रदर्शित करण्यासाठी ते आमच्याशी शेअर करा. आमच्या गावाच्या प्रवासाचे दस्तऐवजीकरण करण्यात आणि आमच्या यशांना एकत्रितपणे साजरे करण्यात आम्हाला मदत करा।",
      "gallery.acceptedTypes": "फोटो आणि व्हिडिओ स्वागत आहे",
      "gallery.moderation": "समुदायाद्वारे मॉडरेट",
      
      // Footer
      "footer.aboutDescription": "शाश्वत विकास, पारदर्शक शासन आणि सर्व रहिवाशांसाठी सर्वसमावेशक वाढीसाठी वचनबद्ध असलेले एक प्रगतीशील गाव।",
      "footer.quickLinks": "द्रुत दुवे",
      "footer.aboutVillage": "गावाबद्दल",
      "footer.panchayatMembers": "पंचायत सदस्य",
      "footer.governmentSchemes": "सरकारी योजना",
      "footer.developmentWorks": "विकास कामे",
      "footer.services": "सेवा",
      "footer.birthCertificate": "जन्म प्रमाणपत्र",
      "footer.deathCertificate": "मृत्यू प्रमाणपत्र",
      "footer.propertyTax": "मालमत्ता कर",
      "footer.rtiApplication": "आरटीआय अर्ज",
      "footer.contactInfo": "संपर्क माहिती",
      "footer.followUs": "आम्हाला फॉलो करा",
      "footer.copyright": "© {{year}} {{village}}. सर्व हक्क राखीव.",
      "footer.tagline": "पारदर्शक आणि कार्यक्षम ग्रामीण शासनासाठी विकसित",
      "footer.privacyPolicy": "गोपनीयता धोरण",
      "footer.termsOfService": "सेवा अटी",
      "footer.rtiGuidelines": "आरटीआय मार्गदर्शक तत्त्वे",
      "footer.officialLinks": "अधिकृत दुवे",
      
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