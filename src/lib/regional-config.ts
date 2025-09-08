// Regional configuration for Northeast India
export const regionalConfig = {
  region: 'Northeast India',
  languages: {
    primary: 'en',
    supported: ['en', 'hi', 'as', 'bn'] // English, Hindi, Assamese, Bengali
  },
  emergency: {
    police: '100',
    medical: '108',
    fire: '101',
    disaster: '1070',
    women: '1091',
    child: '1098',
    tourist: '1363', // Tourist helpline
    state: {
      assam: {
        police: '+91-361-2521454',
        tourism: '+91-361-2547102',
        disaster: '+91-361-2237220'
      },
      meghalaya: {
        police: '+91-364-2501100',
        tourism: '+91-364-2500099',
        disaster: '+91-364-2500201'
      },
      manipur: {
        police: '+91-385-2414651',
        tourism: '+91-385-2414820',
        disaster: '+91-385-2414555'
      },
      nagaland: {
        police: '+91-370-2290334',
        tourism: '+91-370-2290372',
        disaster: '+91-370-2290111'
      },
      tripura: {
        police: '+91-381-2325016',
        tourism: '+91-381-2325785',
        disaster: '+91-381-2322586'
      },
      mizoram: {
        police: '+91-389-2332211',
        tourism: '+91-389-2333745',
        disaster: '+91-389-2332244'
      },
      arunachal: {
        police: '+91-360-2212344',
        tourism: '+91-360-2214745',
        disaster: '+91-360-2213344'
      },
      sikkim: {
        police: '+91-3592-202033',
        tourism: '+91-3592-202688',
        disaster: '+91-3592-202200'
      }
    }
  },
  culturalElements: {
    landmarks: [
      'Kaziranga National Park',
      'Tawang Monastery',
      'Cherrapunji',
      'Majuli Island',
      'Kamakhya Temple',
      'Unakoti',
      'Dzukou Valley',
      'Nohkalikai Falls'
    ],
    festivals: [
      'Bihu',
      'Hornbill Festival',
      'Wangala Festival',
      'Chapchar Kut',
      'Losar Festival',
      'Sangken Festival'
    ],
    textiles: [
      'Muga Silk',
      'Eri Silk',
      'Traditional Weaves',
      'Bamboo Crafts'
    ]
  },
  weatherPatterns: {
    monsoon: 'June-September',
    postMonsoon: 'October-November', 
    winter: 'December-February',
    preMonsoon: 'March-May',
    alerts: [
      'Heavy rainfall warnings',
      'Landslide alerts',
      'Flash flood warnings',
      'Cyclone updates'
    ]
  },
  localTransport: [
    'Shared Taxi',
    'Local Bus',
    'Auto Rickshaw',
    'River Ferry',
    'Helicopter Service'
  ]
};

// Language translations for common phrases
export const translations = {
  en: {
    emergency: 'Emergency',
    help: 'Help',
    safe: 'Safe',
    danger: 'Danger',
    location: 'Location',
    contact: 'Contact',
    medical: 'Medical',
    police: 'Police',
    welcome: 'Welcome to Northeast India'
  },
  hi: {
    emergency: 'आपातकाल',
    help: 'सहायता',
    safe: 'सुरक्षित',
    danger: 'खतरा',
    location: 'स्थान',
    contact: 'संपर्क',
    medical: 'चिकित्सा',
    police: 'पुलिस',
    welcome: 'पूर्वोत्तर भारत में आपका स्वागत है'
  },
  as: {
    emergency: 'জৰুৰীকালীন',
    help: 'সহায়',
    safe: 'নিৰাপদ',
    danger: 'বিপদ',
    location: 'অৱস্থান',
    contact: 'যোগাযোগ',
    medical: 'চিকিৎসা',
    police: 'আৰক্ষী',
    welcome: 'উত্তৰ-পূৰ্ব ভাৰতলৈ স্বাগতম'
  },
  bn: {
    emergency: 'জরুরি',
    help: 'সাহায্য',
    safe: 'নিরাপদ',
    danger: 'বিপদ',
    location: 'অবস্থান',
    contact: 'যোগাযোগ',
    medical: 'চিকিৎসা',
    police: 'পুলিশ',
    welcome: 'উত্তর-পূর্ব ভারতে আপনাকে স্বাগতম'
  }
};