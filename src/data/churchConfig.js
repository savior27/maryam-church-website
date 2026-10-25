/**
 * Central Church Configuration
 * =============================
 * Specific to St. Mary Ethiopian Orthodox Tewahedo Church in Ketabero.
 * All administrative details, locations, and placeholders are centralized here.
 */

const churchConfig = {
  // Official Church Identity
  churchName: "St. Mary Ethiopian Orthodox Tewahedo Church",
  churchNameAmharic: "የቅድስት ማርያም ቤተ ክርስቲያን",
  churchNameOromo: "Mana Kiristaanaa Ortodoksii Tawaahidoo Qulqulleettii Maariyaam",
  parishName: "Ketabero St. Mary Parish",
  parishNameAmharic: "የከታቤሮ ቅድስት ማርያም ደብር",
  churchTagline: "A sacred sanctuary of apostolic faith, liturgical worship, prayer, and communal love.",
  churchTaglineAmharic: "የእምነት፣ የጸሎት፣ የቅዳሴ እና የወንድማማችነት ፍቅር ቅዱስ አውድማ።",
  
  // Logo placeholder - will be replaced with actual church logo
  logo: null,
  
  // Administrator Contact (Editable placeholders for parish administration)
  admin: {
    title: "Church Administrator",
    titleAmharic: "የቤተ ክርስቲያን አስተዳዳሪ",
    name: "[Administrator name to be provided by parish office]",
    phone: "[Official church telephone to be provided by parish office]",
    phonePlaceholder: true,
    whatsapp: "", // Add verified WhatsApp telephone when approved
    email: "[Official church email to be provided by parish office]",
  },

  // Official Church Address
  address: {
    full: "Ketabero Kebele, Agaro Woreda, Jimma Zone, Ethiopia",
    fullAmharic: "ከታቤሮ ቀበሌ፣ አጋሮ ወረዳ፣ ጅማ ዞን፣ ኢትዮጵያ",
    kebele: "Ketabero",
    kebeleAmharic: "ከታቤሮ",
    woreda: "Agaro",
    woredaAmharic: "አጋሮ",
    zone: "Jimma",
    zoneAmharic: "ጅማ",
    region: "Oromia",
    regionAmharic: "ኦሮሚያ",
    country: "Ethiopia",
    countryAmharic: "ኢትዮጵያ",
  },

  // Map / Directions (Directions to Ketabero, Agaro, Jimma)
  map: {
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ketabero+Agaro+Jimma+Ethiopia",
    coordinates: null, // GPS coordinates will be verified and added by church administration
    embedUrl: "", // Interactive embed map URL will be added when exact sanctuary coordinates are verified
  },

  // Donation / Bank Information (Strictly authentic placeholders - no fake accounts)
  donation: {
    bankName: "Commercial Bank of Ethiopia (CBE) [To be confirmed]",
    accountHolder: "St. Mary Ethiopian Orthodox Tewahedo Church (የቅድስት ማርያም ቤተ ክርስቲያን)",
    accountNumber: "[Official church account number to be updated by administration]",
    branchName: "Agaro Branch [To be confirmed]",
    paymentReference: "St. Mary Ketabero - [Your Full Name]",
    isConfigured: false, // Set to true only when real verified bank details are confirmed
  },

  // Social Media - verified links will be added when established
  socialMedia: {
    facebook: "",
    youtube: "",
    telegram: "",
    instagram: "",
    twitter: "",
  },

  // Founding & Archival Information
  founded: "[Founding year to be provided by parish archives]",

  // Copyright
  copyrightYear: new Date().getFullYear(),
};

export default churchConfig;
