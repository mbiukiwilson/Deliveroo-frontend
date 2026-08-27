const translations = {
  en: {
    dashboard: "Dashboard",
    myOrders: "My Orders",
    newOrder: "New Order",

    pending: "Pending",
    inTransit: "In Transit",
    delivered: "Delivered",
    cancelled: "Cancelled",

    noOrders: "No orders yet.",

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
    paymentBlock: "Payment is required before this parcel can be processed.",
    paymentSuccess: "Payment successful.",

    changeDestination: "Change Destination",
    cancelOrder: "Cancel Order",

    distance: "Distance",
    duration: "Duration",
  },

  sw: {
    dashboard: "Dashibodi",
    myOrders: "Maagizo Yangu",
    newOrder: "Agizo Jipya",

    pending: "Inasubiri",
    inTransit: "Iko Njiani",
    delivered: "Imewasilishwa",
    cancelled: "Imeghairiwa",

    noOrders: "Hakuna maagizo bado.",

    orderDetail: "Maelezo ya Agizo",
    pickup: "Mahali pa Kuchukua",
    destination: "Mahali pa Kufikisha",
    weight: "Uzito",
    price: "Bei",
    paymentRequired: "Malipo",
    paid: "Imelipwa",
    currentLocation: "Mahali Ilipo",

    save: "Hifadhi",
    payNow: "Lipa Sasa",
    paymentBlock: "Malipo yanahitajika kabla ya kifurushi kushughulikiwa.",
    paymentSuccess: "Malipo yamefanikiwa.",

    changeDestination: "Badilisha Mahali pa Kufikisha",
    cancelOrder: "Ghairi Agizo",

    distance: "Umbali",
    duration: "Muda",
  },
};

export function t(language = "en", key) {
  return (
    translations[language]?.[key] ||
    translations.en[key] ||
    key
  );
}

export function formatMoney(amount, currency = "USD") {
  const value = Number(amount || 0);

  const currencies = {
    USD: "USD",
    KES: "KES",
    EUR: "EUR",
    GBP: "GBP",
  };

  const selectedCurrency = currencies[currency] || "USD";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: selectedCurrency,
    minimumFractionDigits: 2,
  }).format(value);
}