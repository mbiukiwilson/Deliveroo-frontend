const translations = {
  en: {
    dashboard: "Dashboard",
    myOrders: "My Orders",
    newOrder: "New Order",

    pending: "Pending",
    inTransit: "In Transit",
    delivered: "Delivered",
    cancelled: "Cancelled",

    orderDetail: "Order Detail",
    pickup: "Pickup",
    destination: "Destination",
    weight: "Weight",
    price: "Price",
    paymentRequired: "Payment",
    paid: "Paid",
    currentLocation: "Current Location",

    save: "Save",
    payNow: "Pay Now",
    paymentSuccess: "Payment successful.",
    paymentBlock: "Payment is required before this parcel can be processed.",

    changeDestination: "Change Destination",
    cancelOrder: "Cancel Order",

    distance: "Distance",
    duration: "Duration",

    noOrders: "You don't have any orders yet.",

    signIn: "Sign in",
    createAccount: "Create your account",
    welcomeBack: "WELCOME BACK",
    getStarted: "GET STARTED",
    signInDescription: "Track your deliveries and manage orders.",
    registerDescription: "Start shipping in under a minute.",
    fullName: "FULL NAME",
    email: "EMAIL",
    password: "PASSWORD",
    pleaseWait: "PLEASE WAIT...",
    createAccountButton: "CREATE YOUR ACCOUNT",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    createOne: "Create one",

    worldwide: "COURIER & LOGISTICS PLATFORM — WORLDWIDE",
    heroTitle: "Deliver anything,",
    heroTitle2: "anywhere in the world.",
    heroDescription:
      "SendIT gives you real-time tracking, weight-based pricing, and live route maps for every parcel — from a single document to heavy cargo.",

    sendParcel: "SEND A PARCEL →",
    trackOrder: "TRACK AN ORDER",

    parcelsDelivered: "PARCELS DELIVERED",
    citiesCovered: "CITIES COVERED",
    onTimeRate: "ON-TIME RATE",

    shipThreeSteps: "Ship in three steps",
    createOrder: "Create Order",
    createOrderDescription:
      "Enter pickup and delivery addresses, describe your parcel and select a weight category for instant pricing.",

    wePickUp: "We Pick Up",
    wePickUpDescription:
      "Our rider arrives at your pickup location within the hour. We handle fragile items with care.",

    liveTracking: "Live Tracking",
    liveTrackingDescription:
      "Follow your parcel on a live map from the moment it leaves your door to final delivery confirmation.",

    pricing: "PRICING",
    weightQuotes: "Weight-based quotes",

    documents: "Documents, letters, small items",
    books: "Books, small electronics, gifts",
    clothing: "Clothing bundles, medium parcels",
    heavyCargo: "Heavy cargo, industrial parts",

    trackingId: "TRACKING ID",
    destinationHeader: "DESTINATION",
    status: "STATUS",
    totalOrders: "TOTAL ORDERS",
  },

  sw: {
    dashboard: "Dashibodi",
    myOrders: "Maagizo Yangu",
    newOrder: "Agizo Jipya",

    pending: "Inasubiri",
    inTransit: "Iko Njiani",
    delivered: "Imefikishwa",
    cancelled: "Imeghairiwa",

    orderDetail: "Maelezo ya Agizo",
    pickup: "Mahali pa Kuchukua",
    destination: "Mahali pa Kuwasilisha",
    weight: "Uzito",
    price: "Bei",
    paymentRequired: "Malipo",
    paid: "Imelipwa",
    currentLocation: "Mahali Ilipo Sasa",

    save: "Hifadhi",
    payNow: "Lipa Sasa",
    paymentSuccess: "Malipo yamefanikiwa.",
    paymentBlock:
      "Malipo yanahitajika kabla ya kifurushi kuchakatwa.",

    changeDestination: "Badilisha Mahali pa Kuwasilisha",
    cancelOrder: "Ghairi Agizo",

    distance: "Umbali",
    duration: "Muda",

    noOrders: "Huna maagizo yoyote bado.",

    signIn: "Ingia",
    createAccount: "Fungua akaunti yako",
    welcomeBack: "KARIBU TENA",
    getStarted: "ANZA SASA",
    signInDescription: "Fuatilia usafirishaji wako na simamia maagizo.",
    registerDescription: "Anza kutuma ndani ya dakika moja.",
    fullName: "JINA KAMILI",
    email: "BARUA PEPE",
    password: "NENOSIRI",
    pleaseWait: "SUBIRI...",
    createAccountButton: "FUNGUA AKAUNTI",
    alreadyHaveAccount: "Tayari una akaunti?",
    dontHaveAccount: "Huna akaunti?",
    createOne: "Fungua moja",

    worldwide: "JUKWAA LA USAFIRISHAJI NA LOGISTICS — DUNIA NZIMA",
    heroTitle: "Tuma chochote,",
    heroTitle2: "popote duniani.",
    heroDescription:
      "SendIT inakupa ufuatiliaji wa wakati halisi, bei kulingana na uzito na ramani za njia za kila kifurushi.",

    sendParcel: "TUMA KIFURUSHI →",
    trackOrder: "FUATILIA AGIZO",

    parcelsDelivered: "VIFURUSHI VILIVYOWASILISHWA",
    citiesCovered: "MIJI INAYOHUDUMIWA",
    onTimeRate: "ASILIMIA YA UFIKISHAJI KWA WAKATI",

    shipThreeSteps: "Tuma kwa hatua tatu",
    createOrder: "Unda Agizo",
    createOrderDescription:
      "Ingiza anwani za kuchukua na kupeleka, eleza kifurushi chako na uchague uzito kwa bei ya haraka.",

    wePickUp: "Tunachukua",
    wePickUpDescription:
      "Mwendesha wetu atafika mahali pa kuchukua ndani ya saa moja. Tunashughulikia vitu vinavyoweza kuharibika kwa uangalifu.",

    liveTracking: "Ufuatiliaji wa Moja kwa Moja",
    liveTrackingDescription:
      "Fuatilia kifurushi chako kwenye ramani kutoka kinapoondoka hadi kinapowasilishwa.",

    pricing: "BEI",
    weightQuotes: "Bei kulingana na uzito",

    documents: "Nyaraka, barua na vitu vidogo",
    books: "Vitabu, vifaa vidogo vya elektroniki na zawadi",
    clothing: "Mizigo ya nguo na vifurushi vya kati",
    heavyCargo: "Mizigo mizito na vifaa vya viwandani",

    trackingId: "NAMBA YA UFUATILIAJI",
    destinationHeader: "MAHALI PA KUWASILISHA",
    status: "HALI",
    totalOrders: "JUMLA YA MAAGIZO",
  },
};

const currencyRates = {
  KES: 1,
  USD: 1 / 129,
  EUR: 1 / 151,
  GBP: 1 / 174,
};

const currencySymbols = {
  KES: "KSh",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export function t(language = "en", key) {
  return (
    translations[language]?.[key] ||
    translations.en[key] ||
    key
  );
}

export function formatMoney(amount, currency = "KES") {
  const numericAmount = Number(amount || 0);

  const convertedAmount =
    numericAmount * (currencyRates[currency] || currencyRates.KES);

  const symbol = currencySymbols[currency] || currency;

  return `${symbol} ${convertedAmount.toFixed(2)}`;
}