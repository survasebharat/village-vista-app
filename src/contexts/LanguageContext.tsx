import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mr' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About Village',
    'nav.panchayat': 'Panchayat',
    'nav.schemes': 'Schemes',
    'nav.development': 'Development',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.announcements': 'Announcements',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.welcome': 'Welcome to',
    'hero.subtitle': 'A progressive village committed to sustainable development and community welfare',
    'hero.explore': 'Explore Our Village',
    'hero.schemes': 'View Schemes & Services',
    
    // About Section
    'about.title': 'About Our Village',
    'about.overview': 'Village Overview',
    'about.culture': 'Culture & Traditions',
    'about.population': 'Population',
    'about.area': 'Area',
    'about.literacy': 'Literacy Rate',
    'about.established': 'Established',
    'about.description': 'A progressive village known for its sustainable farming practices, rich cultural heritage, and strong community participation in development activities.',
    'about.vision': 'To become a model village demonstrating sustainable development, digital empowerment, and inclusive growth.',
    'about.visionTitle': 'Our Vision',
    
    // Panchayat Section
    'panchayat.title': 'Panchayat Representatives',
    'panchayat.sarpanch': 'Sarpanch',
    'panchayat.wardMembers': 'Ward Members',
    'panchayat.secretary': 'Secretary',
    'panchayat.staff': 'Staff',
    'panchayat.contact': 'Contact',
    'panchayat.tenure': 'Tenure',
    'panchayat.education': 'Education',
    'panchayat.ward': 'Ward',
    'panchayat.position': 'Position',
    'panchayat.department': 'Department',
    'panchayat.officeHours': 'Office Hours',
    'panchayat.message': 'Together we build a stronger, more prosperous village for our future generations.',
    
    // Services Section
    'services.title': 'Village Services',
    'services.owner': 'Owner',
    'services.contact': 'Contact',
    'services.address': 'Address',
    'services.hours': 'Hours',
    'services.vehicle': 'Vehicle',
    'services.routes': 'Routes',
    'services.pujari': 'Pujari',
    'services.deity': 'Deity',
    'services.timings': 'Timings',
    'services.teacher': 'Teacher',
    'services.subjects': 'Subjects',
    'services.timing': 'Timing',
    'services.instructor': 'Instructor',
    'services.courses': 'Courses',
    'services.speciality': 'Speciality',
    'services.doctor': 'Doctor',
    'services.category.retail': 'Retail & Grocery',
    'services.category.transport': 'Transportation',
    'services.category.religious': 'Religious Services',
    'services.category.education': 'Education',
    'services.category.food': 'Food & Dining',
    'services.category.healthcare': 'Healthcare',
    
    // Schemes Section
    'schemes.title': 'Government Schemes',
    'schemes.eligibility': 'Eligibility',
    'schemes.benefits': 'Benefits',
    'schemes.application': 'How to Apply',
    'schemes.documents': 'Required Documents',
    
    // Development Section
    'development.title': 'Development Works',
    'development.ongoing': 'Ongoing Projects',
    'development.completed': 'Completed Projects',
    'development.planned': 'Planned Projects',
    'development.budget': 'Budget',
    'development.status': 'Status',
    'development.progress': 'Progress',
    'development.startDate': 'Start Date',
    'development.completionDate': 'Completion Date',
    'development.expectedCompletion': 'Expected Completion',
    
    // Gallery Section
    'gallery.title': 'Village Gallery',
    
    // Announcements Section
    'announcements.title': 'Announcements & News',
    'announcements.viewAll': 'View All Announcements',
    
    // Contact Section
    'contact.title': 'Contact Us',
    'contact.office': 'Panchayat Office',
    'contact.emergency': 'Emergency Contacts',
    'contact.hours': 'Office Hours',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.website': 'Website',
    
    // Common
    'common.loading': 'Loading...',
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.district': 'District',
    'common.state': 'State',
  },
  mr: {
    // Header  
    'nav.home': 'मुख्यपृष्ठ',
    'nav.about': 'गावाबद्दल',
    'nav.panchayat': 'पंचायत',
    'nav.schemes': 'योजना',
    'nav.development': 'विकास',
    'nav.services': 'सेवा',
    'nav.gallery': 'गॅलरी',
    'nav.announcements': 'घोषणा',
    'nav.contact': 'संपर्क',
    
    // Hero Section
    'hero.welcome': 'येथे आपले स्वागत आहे',
    'hero.subtitle': 'शाश्वत विकास आणि समुदायिक कल्याणासाठी वचनबद्ध असलेले प्रगतिशील गाव',
    'hero.explore': 'आमच्या गावाचे अन्वेषण करा',
    'hero.schemes': 'योजना आणि सेवा पहा',
    
    // About Section
    'about.title': 'आमच्या गावाबद्दल',
    'about.overview': 'गाव आढावा',
    'about.culture': 'संस्कृती आणि परंपरा',
    'about.population': 'लोकसंख्या',
    'about.area': 'क्षेत्रफळ',
    'about.literacy': 'साक्षरता दर',
    'about.established': 'स्थापित',
    'about.description': 'शाश्वत शेती पद्धती, समृद्ध सांस्कृतिक वारसा आणि विकास क्रियाकलापांमध्ये मजबूत सामुदायिक सहभागासाठी प्रसिद्ध असलेले प्रगतिशील गाव.',
    'about.vision': 'शाश्वत विकास, डिजिटल सक्षमीकरण आणि सर्वसमावेशक विकास दाखवणारे आदर्श गाव बनणे.',
    'about.visionTitle': 'आमची दृष्टी',
    
    // Panchayat Section
    'panchayat.title': 'पंचायत प्रतिनिधी',
    'panchayat.sarpanch': 'सरपंच',
    'panchayat.wardMembers': 'वार्ड सदस्य',
    'panchayat.secretary': 'सचिव',
    'panchayat.staff': 'कर्मचारी',
    'panchayat.contact': 'संपर्क',
    'panchayat.tenure': 'कार्यकाळ',
    'panchayat.education': 'शिक्षण',
    'panchayat.ward': 'वार्ड',
    'panchayat.position': 'पद',
    'panchayat.department': 'विभाग',
    'panchayat.officeHours': 'कार्यालयीन वेळ',
    'panchayat.message': 'आम्ही मिळून आपल्या भविष्यातील पिढ्यांसाठी मजबूत, अधिक समृद्ध गाव बांधतो.',
    
    // Services Section
    'services.title': 'गाव सेवा',
    'services.owner': 'मालक',
    'services.contact': 'संपर्क',
    'services.address': 'पत्ता',
    'services.hours': 'वेळा',
    'services.vehicle': 'वाहन',
    'services.routes': 'मार्ग',
    'services.pujari': 'पुजारी',
    'services.deity': 'देवता',
    'services.timings': 'वेळा',
    'services.teacher': 'शिक्षक',
    'services.subjects': 'विषय',
    'services.timing': 'वेळ',
    'services.instructor': 'प्रशिक्षक',
    'services.courses': 'अभ्यासक्रम',
    'services.speciality': 'विशेषता',
    'services.doctor': 'डॉक्टर',
    'services.category.retail': 'किरकोळ आणि किराणा',
    'services.category.transport': 'वाहतूक',
    'services.category.religious': 'धार्मिक सेवा',
    'services.category.education': 'शिक्षण',
    'services.category.food': 'खाद्यपदार्थ आणि जेवण',
    'services.category.healthcare': 'आरोग्य सेवा',
    
    // Schemes Section
    'schemes.title': 'सरकारी योजना',
    'schemes.eligibility': 'पात्रता',
    'schemes.benefits': 'फायदे',
    'schemes.application': 'अर्ज कसा करावा',
    'schemes.documents': 'आवश्यक कागदपत्रे',
    
    // Development Section
    'development.title': 'विकास कामे',
    'development.ongoing': 'सुरू असलेले प्रकल्प',
    'development.completed': 'पूर्ण झालेले प्रकल्प',
    'development.planned': 'नियोजित प्रकल्प',
    'development.budget': 'बजेट',
    'development.status': 'स्थिती',
    'development.progress': 'प्रगती',
    'development.startDate': 'प्रारंभ तारीख',
    'development.completionDate': 'पूर्णता तारीख',
    'development.expectedCompletion': 'अपेक्षित पूर्णता',
    
    // Gallery Section
    'gallery.title': 'गाव गॅलरी',
    
    // Announcements Section
    'announcements.title': 'घोषणा आणि बातम्या',
    'announcements.viewAll': 'सर्व घोषणा पहा',
    
    // Contact Section
    'contact.title': 'संपर्क करा',
    'contact.office': 'पंचायत कार्यालय',
    'contact.emergency': 'आपत्कालीन संपर्क',
    'contact.hours': 'कार्यालयीन वेळा',
    'contact.phone': 'फोन',
    'contact.email': 'ईमेल',
    'contact.address': 'पत्ता',
    'contact.website': 'वेबसाइट',
    
    // Common
    'common.loading': 'लोड होत आहे...',
    'common.readMore': 'अधिक वाचा',
    'common.learnMore': 'अधिक जाणून घ्या',
    'common.viewAll': 'सर्व पहा',
    'common.district': 'जिल्हा',
    'common.state': 'राज्य',
  },
  hi: {
    // Header
    'nav.home': 'मुख्य पृष्ठ',
    'nav.about': 'गांव के बारे में',
    'nav.panchayat': 'पंचायत',
    'nav.schemes': 'योजनाएं',
    'nav.development': 'विकास',
    'nav.services': 'सेवाएं',
    'nav.gallery': 'गैलरी',
    'nav.announcements': 'घोषणाएं',
    'nav.contact': 'संपर्क',
    
    // Hero Section
    'hero.welcome': 'आपका स्वागत है',
    'hero.subtitle': 'सतत विकास और सामुदायिक कल्याण के लिए प्रतिबद्ध एक प्रगतिशील गांव',
    'hero.explore': 'हमारे गांव का अन्वेषण करें',
    'hero.schemes': 'योजनाएं और सेवाएं देखें',
    
    // About Section
    'about.title': 'हमारे गांव के बारे में',
    'about.overview': 'गांव का अवलोकन',
    'about.culture': 'संस्कृति और परंपराएं',
    'about.population': 'जनसंख्या',
    'about.area': 'क्षेत्रफल',
    'about.literacy': 'साक्षरता दर',
    'about.established': 'स्थापित',
    'about.description': 'टिकाऊ कृषि प्रथाओं, समृद्ध सांस्कृतिक विरासत और विकास गतिविधियों में मजबूत सामुदायिक भागीदारी के लिए जाना जाने वाला एक प्रगतिशील गांव।',
    'about.vision': 'सतत विकास, डिजिटल सशक्तीकरण और समावेशी विकास का प्रदर्शन करने वाला एक आदर्श गांव बनना।',
    'about.visionTitle': 'हमारा दृष्टिकोण',
    
    // Panchayat Section
    'panchayat.title': 'पंचायत प्रतिनिधि',
    'panchayat.sarpanch': 'सरपंच',
    'panchayat.wardMembers': 'वार्ड सदस्य',
    'panchayat.secretary': 'सचिव',
    'panchayat.staff': 'कर्मचारी',
    'panchayat.contact': 'संपर्क',
    'panchayat.tenure': 'कार्यकाल',
    'panchayat.education': 'शिक्षा',
    'panchayat.ward': 'वार्ड',
    'panchayat.position': 'पद',
    'panchayat.department': 'विभाग',
    'panchayat.officeHours': 'कार्यालयीन समय',
    'panchayat.message': 'हम मिलकर अपनी भावी पीढ़ियों के लिए एक मजबूत, अधिक समृद्ध गांव का निर्माण करते हैं।',
    
    // Services Section
    'services.title': 'गांव की सेवाएं',
    'services.owner': 'मालिक',
    'services.contact': 'संपर्क',
    'services.address': 'पता',
    'services.hours': 'समय',
    'services.vehicle': 'वाहन',
    'services.routes': 'मार्ग',
    'services.pujari': 'पुजारी',
    'services.deity': 'देवता',
    'services.timings': 'समय',
    'services.teacher': 'शिक्षक',
    'services.subjects': 'विषय',
    'services.timing': 'समय',
    'services.instructor': 'प्रशिक्षक',
    'services.courses': 'पाठ्यक्रम',
    'services.speciality': 'विशेषता',
    'services.doctor': 'डॉक्टर',
    'services.category.retail': 'खुदरा और किराना',
    'services.category.transport': 'परिवहन',
    'services.category.religious': 'धार्मिक सेवाएं',
    'services.category.education': 'शिक्षा',
    'services.category.food': 'खाना और भोजन',
    'services.category.healthcare': 'स्वास्थ्य सेवा',
    
    // Schemes Section
    'schemes.title': 'सरकारी योजनाएं',
    'schemes.eligibility': 'योग्यता',
    'schemes.benefits': 'लाभ',
    'schemes.application': 'आवेदन कैसे करें',
    'schemes.documents': 'आवश्यक दस्तावेज',
    
    // Development Section
    'development.title': 'विकास कार्य',
    'development.ongoing': 'चालू परियोजनाएं',
    'development.completed': 'पूर्ण परियोजनाएं',
    'development.planned': 'नियोजित परियोजनाएं',
    'development.budget': 'बजट',
    'development.status': 'स्थिति',
    'development.progress': 'प्रगति',
    'development.startDate': 'प्रारंभ तिथि',
    'development.completionDate': 'पूर्णता तिथि',
    'development.expectedCompletion': 'अपेक्षित पूर्णता',
    
    // Gallery Section
    'gallery.title': 'गांव गैलरी',
    
    // Announcements Section
    'announcements.title': 'घोषणाएं और समाचार',
    'announcements.viewAll': 'सभी घोषणाएं देखें',
    
    // Contact Section
    'contact.title': 'संपर्क करें',
    'contact.office': 'पंचायत कार्यालय',
    'contact.emergency': 'आपातकालीन संपर्क',
    'contact.hours': 'कार्यालयीन घंटे',
    'contact.phone': 'फोन',
    'contact.email': 'ईमेल',
    'contact.address': 'पता',
    'contact.website': 'वेबसाइट',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.readMore': 'और पढ़ें',
    'common.learnMore': 'और जानें',
    'common.viewAll': 'सभी देखें',
    'common.district': 'जिला',
    'common.state': 'राज्य',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};