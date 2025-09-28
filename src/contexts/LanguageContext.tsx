import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mr';

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
    
    // About Section
    'about.title': 'About Our Village',
    'about.overview': 'Village Overview',
    'about.culture': 'Culture & Traditions',
    'about.population': 'Population',
    'about.area': 'Area',
    'about.literacy': 'Literacy Rate',
    'about.established': 'Established',
    
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
    
    // Common
    'common.loading': 'Loading...',
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
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
    
    // About Section
    'about.title': 'आमच्या गावाबद्दल',
    'about.overview': 'गाव आढावा',
    'about.culture': 'संस्कृती आणि परंपरा',
    'about.population': 'लोकसंख्या',
    'about.area': 'क्षेत्रफळ',
    'about.literacy': 'साक्षरता दर',
    'about.established': 'स्थापित',
    
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
    
    // Common
    'common.loading': 'लोड होत आहे...',
    'common.readMore': 'अधिक वाचा',
    'common.learnMore': 'अधिक जाणून घ्या',
    'common.viewAll': 'सर्व पहा',
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