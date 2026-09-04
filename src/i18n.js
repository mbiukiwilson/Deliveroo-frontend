export const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export const currencies = [
  { code: "KES", symbol: "KSh", label: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "USD", symbol: "$", label: "US Dollar", flag: "🇺🇸" },
  { code: "GBP", symbol: "£", label: "British Pound", flag: "🇬🇧" },
  { code: "EUR", symbol: "€", label: "Euro", flag: "🇪🇺" },
  { code: "GHS", symbol: "GH₵", label: "Ghana Cedi", flag: "🇬🇭" },
  { code: "NGN", symbol: "₦", label: "Nigerian Naira", flag: "🇳🇬" },
];

// Demo display rates from KES. Replace with a live FX provider when needed.
export const ratesFromKES = { KES: 1, USD: 0.0077, GBP: 0.0058, EUR: 0.0066, GHS: 0.096, NGN: 12.0 };

const copy = {
  en: { signIn: "SIGN IN", getStarted: "GET STARTED", myOrders: "MY ORDERS", newOrder: "NEW ORDER", signOut: "SIGN OUT", dashboard: "DASHBOARD", orderDetail: "ORDER DETAIL", pickup: "PICKUP", destination: "DESTINATION", weight: "WEIGHT", price: "PRICE", currentLocation: "CURRENT LOCATION", changeDestination: "CHANGE DESTINATION", cancelOrder: "CANCEL ORDER", payNow: "PAY NOW", paid: "PAID", paymentRequired: "PAYMENT REQUIRED", inTransit: "IN TRANSIT", delivered: "DELIVERED", pending: "PENDING", cancelled: "CANCELLED", distance: "DISTANCE", duration: "DURATION", createOrder: "CREATE A PARCEL ORDER", description: "DESCRIPTION", confirmOrder: "CONFIRM & PLACE ORDER", estimatedPrice: "ESTIMATED PRICE", save: "SAVE", admin: "ADMIN", gps: "START GPS TRACKING", stopGps: "STOP GPS TRACKING", paymentSuccess: "Payment confirmed. Your parcel can now move to in transit.", paymentBlock: "Pay for the parcel before it can be marked in transit.", noOrders: "No orders match this filter." },
  sw: { signIn: "INGIA", getStarted: "ANZA", myOrders: "ODA ZANGU", newOrder: "ODA MPYA", signOut: "ONDOKA", dashboard: "DASHIBODI", orderDetail: "MAELEZO YA ODA", pickup: "MAHALI PA KUCHUKUA", destination: "UNAKOPELEKA", weight: "UZITO", price: "BEI", currentLocation: "MAHALI ILIPO", changeDestination: "BADILISHA UNAKOPELEKA", cancelOrder: "GHAIRISHA ODA", payNow: "LIPA SASA", paid: "IMELIPWA", paymentRequired: "LIPA INAHITAJIKA", inTransit: "INASAFIRISHWA", delivered: "IMEFIKISHWA", pending: "INASUBIRI", cancelled: "IMEGHAIRISHWA", distance: "UMBALI", duration: "MUDA", createOrder: "UNDA ODA YA PARCEL", description: "MAELEZO", confirmOrder: "THIBITISHA NA WEKA ODA", estimatedPrice: "BEI INAYOKADIRIWA", save: "HIFADHI", admin: "ADMIN", gps: "ANZA UFUATILIAJI WA GPS", stopGps: "SIMAMISHA GPS", paymentSuccess: "Malipo yamethibitishwa. Parcel yako sasa inaweza kuanza kusafirishwa.", paymentBlock: "Lipa parcel kabla haijawekwa kwenye usafirishaji.", noOrders: "Hakuna oda zinazolingana na kichujio." },
  fr: { signIn: "CONNEXION", getStarted: "COMMENCER", myOrders: "MES COMMANDES", newOrder: "NOUVELLE COMMANDE", signOut: "DÉCONNEXION", dashboard: "TABLEAU DE BORD", orderDetail: "DÉTAILS DE LA COMMANDE", pickup: "ENLÈVEMENT", destination: "DESTINATION", weight: "POIDS", price: "PRIX", currentLocation: "POSITION ACTUELLE", changeDestination: "CHANGER LA DESTINATION", cancelOrder: "ANNULER", payNow: "PAYER", paid: "PAYÉ", paymentRequired: "PAIEMENT REQUIS", inTransit: "EN TRANSIT", delivered: "LIVRÉ", pending: "EN ATTENTE", cancelled: "ANNULÉ", distance: "DISTANCE", duration: "DURÉE", createOrder: "CRÉER UNE COMMANDE", description: "DESCRIPTION", confirmOrder: "CONFIRMER LA COMMANDE", estimatedPrice: "PRIX ESTIMÉ", save: "ENREGISTRER", admin: "ADMIN", gps: "DÉMARRER LE GPS", stopGps: "ARRÊTER LE GPS", paymentSuccess: "Paiement confirmé.", paymentBlock: "Payez avant le transit.", noOrders: "Aucune commande ne correspond." },
  es: { signIn: "INICIAR SESIÓN", getStarted: "COMENZAR", myOrders: "MIS PEDIDOS", newOrder: "NUEVO PEDIDO", signOut: "CERRAR SESIÓN", dashboard: "PANEL", orderDetail: "DETALLES", pickup: "RECOGIDA", destination: "DESTINO", weight: "PESO", price: "PRECIO", currentLocation: "UBICACIÓN ACTUAL", changeDestination: "CAMBIAR DESTINO", cancelOrder: "CANCELAR", payNow: "PAGAR AHORA", paid: "PAGADO", paymentRequired: "PAGO REQUERIDO", inTransit: "EN TRÁNSITO", delivered: "ENTREGADO", pending: "PENDIENTE", cancelled: "CANCELADO", distance: "DISTANCIA", duration: "DURACIÓN", createOrder: "CREAR PEDIDO", description: "DESCRIPCIÓN", confirmOrder: "CONFIRMAR PEDIDO", estimatedPrice: "PRECIO ESTIMADO", save: "GUARDAR", admin: "ADMIN", gps: "INICIAR GPS", stopGps: "DETENER GPS", paymentSuccess: "Pago confirmado.", paymentBlock: "Paga antes del tránsito.", noOrders: "No hay pedidos que coincidan." },
  pt: { signIn: "ENTRAR", getStarted: "COMEÇAR", myOrders: "MEUS PEDIDOS", newOrder: "NOVO PEDIDO", signOut: "SAIR", dashboard: "PAINEL", orderDetail: "DETALHES", pickup: "RECOLHA", destination: "DESTINO", weight: "PESO", price: "PREÇO", currentLocation: "LOCALIZAÇÃO ATUAL", changeDestination: "ALTERAR DESTINO", cancelOrder: "CANCELAR", payNow: "PAGAR AGORA", paid: "PAGO", paymentRequired: "PAGAMENTO NECESSÁRIO", inTransit: "EM TRÂNSITO", delivered: "ENTREGUE", pending: "PENDENTE", cancelled: "CANCELADO", distance: "DISTÂNCIA", duration: "DURAÇÃO", createOrder: "CRIAR PEDIDO", description: "DESCRIÇÃO", confirmOrder: "CONFIRMAR PEDIDO", estimatedPrice: "PREÇO ESTIMADO", save: "GUARDAR", admin: "ADMIN", gps: "INICIAR GPS", stopGps: "PARAR GPS", paymentSuccess: "Pagamento confirmado.", paymentBlock: "Pague antes do trânsito.", noOrders: "Nenhum pedido corresponde." },
  ar: { signIn: "تسجيل الدخول", getStarted: "ابدأ", myOrders: "طلباتي", newOrder: "طلب جديد", signOut: "تسجيل الخروج", dashboard: "لوحة التحكم", orderDetail: "تفاصيل الطلب", pickup: "الاستلام", destination: "الوجهة", weight: "الوزن", price: "السعر", currentLocation: "الموقع الحالي", changeDestination: "تغيير الوجهة", cancelOrder: "إلغاء الطلب", payNow: "ادفع الآن", paid: "مدفوع", paymentRequired: "الدفع مطلوب", inTransit: "قيد النقل", delivered: "تم التسليم", pending: "قيد الانتظار", cancelled: "ملغى", distance: "المسافة", duration: "المدة", createOrder: "إنشاء طلب", description: "الوصف", confirmOrder: "تأكيد الطلب", estimatedPrice: "السعر التقديري", save: "حفظ", admin: "مسؤول", gps: "بدء تتبع GPS", stopGps: "إيقاف GPS", paymentSuccess: "تم تأكيد الدفع.", paymentBlock: "ادفع قبل بدء النقل.", noOrders: "لا توجد طلبات مطابقة." },
};

const fallbackLabels = {
  trackingId: "TRACKING ID",
  status: "STATUS",
  totalOrders: "TOTAL ORDERS",
};

export function t(language, key) {
  return copy[language]?.[key] || copy.en[key] || fallbackLabels[key] || key;
}

export function formatMoney(kesAmount, currency) {
  const item = currencies.find((c) => c.code === currency) || currencies[0];
  const converted = Number(kesAmount || 0) * (ratesFromKES[currency] || 1);
  return `${item.symbol} ${converted.toFixed(2)}`;
}
