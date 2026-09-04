// =========================================================
// SENDIT / DELIVEROO
// LANGUAGE + CURRENCY CONFIGURATION
// =========================================================

export const languages = {
  en: "English",
  sw: "Kiswahili",
  fr: "Français",
  es: "Español",
  pt: "Português",
  ar: "العربية",
};

export const currencies = {
  KES: "Kenyan Shilling",
  USD: "US Dollar",
  GBP: "British Pound",
  EUR: "Euro",
  GHS: "Ghanaian Cedi",
  NGN: "Nigerian Naira",
};

// =========================================================
// CURRENCY RATES
// Base currency = KES
//
// These are demo/display rates.
// For a production application, use a live FX API.
// =========================================================

const ratesFromKES = {
  KES: 1,
  USD: 0.0077,
  GBP: 0.0058,
  EUR: 0.0066,
  GHS: 0.096,
  NGN: 12.0,
};

// =========================================================
// CURRENCY SYMBOLS
// =========================================================

const currencySymbols = {
  KES: "KSh",
  USD: "$",
  GBP: "£",
  EUR: "€",
  GHS: "GH₵",
  NGN: "₦",
};

// =========================================================
// TRANSLATIONS
// =========================================================

const translations = {
  en: {
    // Navigation
    home: "Home",
    dashboard: "Dashboard",
    sendParcel: "Send Parcel",
    admin: "Admin",
    login: "Login",
    register: "Register",
    logout: "Logout",

    // Landing
    welcome: "Welcome to SendIT",
    heroTitle: "Fast, reliable parcel delivery.",
    heroDescription:
      "Send parcels anywhere with reliable tracking, transparent pricing and real-time delivery updates.",
    pricing: "Simple Pricing",
    pricingDescription:
      "Affordable delivery based on parcel weight.",

    // Authentication
    loginTitle: "Welcome Back",
    registerTitle: "Create Your Account",
    loginDescription:
      "Log in to manage your deliveries.",
    registerDescription:
      "Create an account and start sending parcels.",
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    loggingIn: "Logging in...",
    registering: "Creating account...",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",

    // Dashboard
    myOrders: "My Orders",
    myParcels: "My Parcels",
    createOrder: "Create Order",
    noOrders: "You don't have any orders yet.",
    createFirstOrder: "Create your first parcel",
    trackingNumber: "Tracking Number",
    pickup: "Pickup",
    destination: "Destination",
    weight: "Weight",
    status: "Status",
    price: "Price",
    actions: "Actions",
    view: "View",
    order: "Order",
    orders: "Orders",

    // Status
    pending: "Pending",
    inTransit: "In Transit",
    delivered: "Delivered",
    cancelled: "Cancelled",

    // Create order
    pickupLocation: "Pickup Location",
    destinationLocation: "Destination",
    parcelWeight: "Parcel Weight",
    description: "Description",
    optional: "Optional",
    calculatePrice: "Calculate Price",
    placeOrder: "Place Order",
    placingOrder: "Placing Order...",
    pickupPlaceholder:
      "Enter pickup location",
    destinationPlaceholder:
      "Enter delivery destination",
    descriptionPlaceholder:
      "Describe your parcel",
    kilograms: "kg",

    // Order details
    backToOrders: "Back to Orders",
    created: "Created",
    deliveryRoute: "Delivery Route",
    parcelJourney: "Parcel Journey",
    liveTracking: "Live Tracking",
    whereIsMyParcel: "Where is my parcel?",
    live: "Live",
    tracking: "Tracking",
    trackingHistory: "Tracking History",
    noLocationHistory:
      "No location updates have been recorded yet.",
    locationUpdated: "Location updated",
    currentLocation: "Current location",

    // Summary
    orderSummary: "Order Summary",
    distance: "Distance",
    estimatedTime: "Estimated Time",
    paymentStatus: "Payment Status",
    paid: "Paid",
    total: "Total",

    // Payment
    completePayment: "Complete Payment",
    paymentRequired:
      "Payment is required before your parcel can be placed in transit.",
    paymentSuccessful: "Payment successful.",
    paymentComplete: "Payment Complete",
    paymentCompleteDescription:
      "Your parcel has been paid for and can now be moved into transit by the administrator.",
    payNow: "Pay Now",
    processing: "Processing...",
    reference: "Reference",

    // Destination
    changeDestination: "Change Destination",
    newDestination: "New Destination",
    updateDestination: "Update Destination",
    updating: "Updating...",
    destinationUpdated:
      "Destination updated successfully.",
    destinationChangeNote:
      "You can change the destination until the parcel is delivered or cancelled.",

    // Cancel
    cancelOrder: "Cancel Order",
    cancelling: "Cancelling...",
    orderCancelled: "Order Cancelled",
    cancelOrderDescription:
      "Cancel this delivery if you no longer need it.",
    orderCancelledDescription:
      "This delivery has been cancelled and can no longer be modified.",

    // Delivered
    deliveryComplete:
      "Your parcel has been successfully delivered.",

    // General
    loading: "Loading...",
    somethingWentWrong: "Something went wrong",
    tryAgain: "Try Again",
    refresh: "Refresh",
    manage: "Manage",
    mapWaiting:
      "Map coordinates are not available yet.",
    mapWaitingDescription:
      "The map will show the delivery route once location coordinates are available.",
    search: "Search",
    next: "Next",
    previous: "Previous",
    save: "Save",
    cancel: "Cancel",
    update: "Update",
    delete: "Delete",
    close: "Close",
  },

  // =======================================================
  // KISWAHILI
  // =======================================================

  sw: {
    home: "Nyumbani",
    dashboard: "Dashibodi",
    sendParcel: "Tuma Kifurushi",
    admin: "Msimamizi",
    login: "Ingia",
    register: "Jisajili",
    logout: "Ondoka",

    welcome: "Karibu SendIT",
    heroTitle: "Usafirishaji wa vifurushi wa haraka na wa kuaminika.",
    heroDescription:
      "Tuma vifurushi popote kwa ufuatiliaji wa kuaminika, bei wazi na masasisho ya wakati halisi.",
    pricing: "Bei Rahisi",
    pricingDescription:
      "Bei nafuu kulingana na uzito wa kifurushi.",

    loginTitle: "Karibu Tena",
    registerTitle: "Fungua Akaunti",
    loginDescription:
      "Ingia ili kudhibiti usafirishaji wako.",
    registerDescription:
      "Fungua akaunti na uanze kutuma vifurushi.",
    name: "Jina",
    email: "Barua pepe",
    password: "Nenosiri",
    confirmPassword: "Thibitisha Nenosiri",
    loggingIn: "Inaingia...",
    registering: "Inaunda akaunti...",
    noAccount: "Huna akaunti?",
    haveAccount: "Una akaunti tayari?",

    myOrders: "Maagizo Yangu",
    myParcels: "Vifurushi Vyangu",
    createOrder: "Unda Agizo",
    noOrders: "Bado huna maagizo yoyote.",
    createFirstOrder: "Unda kifurushi chako cha kwanza",
    trackingNumber: "Nambari ya Ufuatiliaji",
    pickup: "Mahali pa Kuchukua",
    destination: "Unakoenda",
    weight: "Uzito",
    status: "Hali",
    price: "Bei",
    actions: "Vitendo",
    view: "Tazama",
    order: "Agizo",
    orders: "Maagizo",

    pending: "Inasubiri",
    inTransit: "Njiani",
    delivered: "Imefikishwa",
    cancelled: "Imeghairiwa",

    pickupLocation: "Mahali pa Kuchukua",
    destinationLocation: "Mahali pa Kupeleka",
    parcelWeight: "Uzito wa Kifurushi",
    description: "Maelezo",
    optional: "Si lazima",
    calculatePrice: "Hesabu Bei",
    placeOrder: "Weka Agizo",
    placingOrder: "Inaweka Agizo...",
    pickupPlaceholder:
      "Ingiza mahali pa kuchukua",
    destinationPlaceholder:
      "Ingiza mahali pa kupeleka",
    descriptionPlaceholder:
      "Eleza kifurushi chako",
    kilograms: "kg",

    backToOrders: "Rudi kwa Maagizo",
    created: "Imeundwa",
    deliveryRoute: "Njia ya Uwasilishaji",
    parcelJourney: "Safari ya Kifurushi",
    liveTracking: "Ufuatiliaji wa Moja kwa Moja",
    whereIsMyParcel: "Kifurushi changu kiko wapi?",
    live: "Moja kwa Moja",
    tracking: "Ufuatiliaji",
    trackingHistory: "Historia ya Ufuatiliaji",
    noLocationHistory:
      "Hakuna masasisho ya eneo yaliyorekodiwa bado.",
    locationUpdated: "Eneo limesasishwa",
    currentLocation: "Eneo la sasa",

    orderSummary: "Muhtasari wa Agizo",
    distance: "Umbali",
    estimatedTime: "Muda Unaokadiriwa",
    paymentStatus: "Hali ya Malipo",
    paid: "Imelipwa",
    total: "Jumla",

    completePayment: "Kamilisha Malipo",
    paymentRequired:
      "Malipo yanahitajika kabla ya kifurushi kuanza safari.",
    paymentSuccessful: "Malipo yamefanikiwa.",
    paymentComplete: "Malipo Yamekamilika",
    paymentCompleteDescription:
      "Kifurushi chako kimelipiwa na sasa kinaweza kuanza safari na msimamizi.",
    payNow: "Lipa Sasa",
    processing: "Inachakata...",
    reference: "Rejea",

    changeDestination: "Badilisha Unakoenda",
    newDestination: "Unakoenda Mpya",
    updateDestination: "Sasisha Unakoenda",
    updating: "Inasasisha...",
    destinationUpdated:
      "Unakoenda kumesasishwa kwa mafanikio.",
    destinationChangeNote:
      "Unaweza kubadilisha unakoenda hadi kifurushi kifike au kigairiwe.",

    cancelOrder: "Ghairi Agizo",
    cancelling: "Inaghairi...",
    orderCancelled: "Agizo Limeghairiwa",
    cancelOrderDescription:
      "Ghairi usafirishaji huu ikiwa hauuhitaji tena.",
    orderCancelledDescription:
      "Usafirishaji huu umeghairiwa na hauwezi kurekebishwa tena.",

    deliveryComplete:
      "Kifurushi chako kimefikishwa kwa mafanikio.",

    loading: "Inapakia...",
    somethingWentWrong: "Kuna hitilafu",
    tryAgain: "Jaribu Tena",
    refresh: "Onyesha Upya",
    manage: "Dhibiti",
    mapWaiting:
      "Viashiria vya ramani bado havipatikani.",
    mapWaitingDescription:
      "Ramani itaonyesha njia ya uwasilishaji mara tu maeneo yatakapopatikana.",
    search: "Tafuta",
    next: "Inayofuata",
    previous: "Iliyotangulia",
    save: "Hifadhi",
    cancel: "Ghairi",
    update: "Sasisha",
    delete: "Futa",
    close: "Funga",
  },

  // =======================================================
  // FRENCH
  // =======================================================

  fr: {
    home: "Accueil",
    dashboard: "Tableau de bord",
    sendParcel: "Envoyer un colis",
    admin: "Admin",
    login: "Connexion",
    register: "Inscription",
    logout: "Déconnexion",

    welcome: "Bienvenue sur SendIT",
    heroTitle: "Livraison de colis rapide et fiable.",
    heroDescription:
      "Envoyez des colis partout avec un suivi fiable, des prix transparents et des mises à jour en temps réel.",
    pricing: "Tarification simple",
    pricingDescription:
      "Une livraison abordable basée sur le poids du colis.",

    loginTitle: "Bon retour",
    registerTitle: "Créer votre compte",
    loginDescription:
      "Connectez-vous pour gérer vos livraisons.",
    registerDescription:
      "Créez un compte et commencez à envoyer des colis.",
    name: "Nom",
    email: "E-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    loggingIn: "Connexion...",
    registering: "Création du compte...",
    noAccount: "Vous n'avez pas de compte ?",
    haveAccount: "Vous avez déjà un compte ?",

    myOrders: "Mes commandes",
    myParcels: "Mes colis",
    createOrder: "Créer une commande",
    noOrders: "Vous n'avez pas encore de commandes.",
    createFirstOrder: "Créer votre premier colis",
    trackingNumber: "Numéro de suivi",
    pickup: "Ramassage",
    destination: "Destination",
    weight: "Poids",
    status: "Statut",
    price: "Prix",
    actions: "Actions",
    view: "Voir",
    order: "Commande",
    orders: "Commandes",

    pending: "En attente",
    inTransit: "En transit",
    delivered: "Livré",
    cancelled: "Annulé",

    pickupLocation: "Lieu de ramassage",
    destinationLocation: "Destination",
    parcelWeight: "Poids du colis",
    description: "Description",
    optional: "Facultatif",
    calculatePrice: "Calculer le prix",
    placeOrder: "Passer la commande",
    placingOrder: "Commande en cours...",
    pickupPlaceholder:
      "Entrez le lieu de ramassage",
    destinationPlaceholder:
      "Entrez la destination",
    descriptionPlaceholder:
      "Décrivez votre colis",
    kilograms: "kg",

    backToOrders: "Retour aux commandes",
    created: "Créé",
    deliveryRoute: "Itinéraire de livraison",
    parcelJourney: "Trajet du colis",
    liveTracking: "Suivi en direct",
    whereIsMyParcel: "Où est mon colis ?",
    live: "En direct",
    tracking: "Suivi",
    trackingHistory: "Historique du suivi",
    noLocationHistory:
      "Aucune mise à jour de localisation n'a encore été enregistrée.",
    locationUpdated: "Localisation mise à jour",
    currentLocation: "Position actuelle",

    orderSummary: "Résumé de la commande",
    distance: "Distance",
    estimatedTime: "Temps estimé",
    paymentStatus: "Statut du paiement",
    paid: "Payé",
    total: "Total",

    completePayment: "Effectuer le paiement",
    paymentRequired:
      "Le paiement est requis avant que votre colis puisse être mis en transit.",
    paymentSuccessful: "Paiement réussi.",
    paymentComplete: "Paiement terminé",
    paymentCompleteDescription:
      "Votre colis a été payé et peut maintenant être mis en transit par l'administrateur.",
    payNow: "Payer maintenant",
    processing: "Traitement...",
    reference: "Référence",

    changeDestination: "Modifier la destination",
    newDestination: "Nouvelle destination",
    updateDestination: "Mettre à jour la destination",
    updating: "Mise à jour...",
    destinationUpdated:
      "Destination mise à jour avec succès.",
    destinationChangeNote:
      "Vous pouvez modifier la destination jusqu'à la livraison ou l'annulation du colis.",

    cancelOrder: "Annuler la commande",
    cancelling: "Annulation...",
    orderCancelled: "Commande annulée",
    cancelOrderDescription:
      "Annulez cette livraison si vous n'en avez plus besoin.",
    orderCancelledDescription:
      "Cette livraison a été annulée et ne peut plus être modifiée.",

    deliveryComplete:
      "Votre colis a été livré avec succès.",

    loading: "Chargement...",
    somethingWentWrong: "Une erreur est survenue",
    tryAgain: "Réessayer",
    refresh: "Actualiser",
    manage: "Gérer",
    mapWaiting:
      "Les coordonnées de la carte ne sont pas encore disponibles.",
    mapWaitingDescription:
      "La carte affichera l'itinéraire lorsque les coordonnées seront disponibles.",
    search: "Rechercher",
    next: "Suivant",
    previous: "Précédent",
    save: "Enregistrer",
    cancel: "Annuler",
    update: "Mettre à jour",
    delete: "Supprimer",
    close: "Fermer",
  },

  // =======================================================
  // SPANISH
  // =======================================================

  es: {
    home: "Inicio",
    dashboard: "Panel",
    sendParcel: "Enviar paquete",
    admin: "Administrador",
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",

    welcome: "Bienvenido a SendIT",
    heroTitle: "Entrega de paquetes rápida y confiable.",
    heroDescription:
      "Envía paquetes a cualquier lugar con seguimiento confiable, precios transparentes y actualizaciones en tiempo real.",
    pricing: "Precios simples",
    pricingDescription:
      "Entrega económica basada en el peso del paquete.",

    loginTitle: "Bienvenido de nuevo",
    registerTitle: "Crea tu cuenta",
    loginDescription:
      "Inicia sesión para gestionar tus entregas.",
    registerDescription:
      "Crea una cuenta y comienza a enviar paquetes.",
    name: "Nombre",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    loggingIn: "Iniciando sesión...",
    registering: "Creando cuenta...",
    noAccount: "¿No tienes una cuenta?",
    haveAccount: "¿Ya tienes una cuenta?",

    myOrders: "Mis pedidos",
    myParcels: "Mis paquetes",
    createOrder: "Crear pedido",
    noOrders: "Todavía no tienes pedidos.",
    createFirstOrder: "Crea tu primer paquete",
    trackingNumber: "Número de seguimiento",
    pickup: "Recogida",
    destination: "Destino",
    weight: "Peso",
    status: "Estado",
    price: "Precio",
    actions: "Acciones",
    view: "Ver",
    order: "Pedido",
    orders: "Pedidos",

    pending: "Pendiente",
    inTransit: "En tránsito",
    delivered: "Entregado",
    cancelled: "Cancelado",

    pickupLocation: "Lugar de recogida",
    destinationLocation: "Destino",
    parcelWeight: "Peso del paquete",
    description: "Descripción",
    optional: "Opcional",
    calculatePrice: "Calcular precio",
    placeOrder: "Realizar pedido",
    placingOrder: "Realizando pedido...",
    pickupPlaceholder:
      "Introduce el lugar de recogida",
    destinationPlaceholder:
      "Introduce el destino",
    descriptionPlaceholder:
      "Describe tu paquete",
    kilograms: "kg",

    backToOrders: "Volver a pedidos",
    created: "Creado",
    deliveryRoute: "Ruta de entrega",
    parcelJourney: "Recorrido del paquete",
    liveTracking: "Seguimiento en vivo",
    whereIsMyParcel: "¿Dónde está mi paquete?",
    live: "En vivo",
    tracking: "Seguimiento",
    trackingHistory: "Historial de seguimiento",
    noLocationHistory:
      "Todavía no se han registrado actualizaciones de ubicación.",
    locationUpdated: "Ubicación actualizada",
    currentLocation: "Ubicación actual",

    orderSummary: "Resumen del pedido",
    distance: "Distancia",
    estimatedTime: "Tiempo estimado",
    paymentStatus: "Estado del pago",
    paid: "Pagado",
    total: "Total",

    completePayment: "Completar pago",
    paymentRequired:
      "El pago es necesario antes de que el paquete pueda ponerse en tránsito.",
    paymentSuccessful: "Pago realizado correctamente.",
    paymentComplete: "Pago completado",
    paymentCompleteDescription:
      "Tu paquete ha sido pagado y ahora puede ponerse en tránsito por el administrador.",
    payNow: "Pagar ahora",
    processing: "Procesando...",
    reference: "Referencia",

    changeDestination: "Cambiar destino",
    newDestination: "Nuevo destino",
    updateDestination: "Actualizar destino",
    updating: "Actualizando...",
    destinationUpdated:
      "Destino actualizado correctamente.",
    destinationChangeNote:
      "Puedes cambiar el destino hasta que el paquete sea entregado o cancelado.",

    cancelOrder: "Cancelar pedido",
    cancelling: "Cancelando...",
    orderCancelled: "Pedido cancelado",
    cancelOrderDescription:
      "Cancela esta entrega si ya no la necesitas.",
    orderCancelledDescription:
      "Esta entrega ha sido cancelada y ya no puede modificarse.",

    deliveryComplete:
      "Tu paquete ha sido entregado correctamente.",

    loading: "Cargando...",
    somethingWentWrong: "Algo salió mal",
    tryAgain: "Intentar de nuevo",
    refresh: "Actualizar",
    manage: "Gestionar",
    mapWaiting:
      "Las coordenadas del mapa aún no están disponibles.",
    mapWaitingDescription:
      "El mapa mostrará la ruta cuando las coordenadas estén disponibles.",
    search: "Buscar",
    next: "Siguiente",
    previous: "Anterior",
    save: "Guardar",
    cancel: "Cancelar",
    update: "Actualizar",
    delete: "Eliminar",
    close: "Cerrar",
  },

  // =======================================================
  // PORTUGUESE
  // =======================================================

  pt: {
    home: "Início",
    dashboard: "Painel",
    sendParcel: "Enviar encomenda",
    admin: "Administrador",
    login: "Entrar",
    register: "Registar",
    logout: "Sair",

    welcome: "Bem-vindo à SendIT",
    heroTitle: "Entrega de encomendas rápida e confiável.",
    heroDescription:
      "Envie encomendas para qualquer lugar com rastreamento confiável, preços transparentes e atualizações em tempo real.",
    pricing: "Preços simples",
    pricingDescription:
      "Entrega acessível baseada no peso da encomenda.",

    loginTitle: "Bem-vindo de volta",
    registerTitle: "Crie a sua conta",
    loginDescription:
      "Entre para gerir as suas entregas.",
    registerDescription:
      "Crie uma conta e comece a enviar encomendas.",
    name: "Nome",
    email: "E-mail",
    password: "Palavra-passe",
    confirmPassword: "Confirmar palavra-passe",
    loggingIn: "A entrar...",
    registering: "A criar conta...",
    noAccount: "Não tem uma conta?",
    haveAccount: "Já tem uma conta?",

    myOrders: "As minhas encomendas",
    myParcels: "As minhas encomendas",
    createOrder: "Criar encomenda",
    noOrders: "Ainda não tem encomendas.",
    createFirstOrder: "Crie a sua primeira encomenda",
    trackingNumber: "Número de rastreamento",
    pickup: "Recolha",
    destination: "Destino",
    weight: "Peso",
    status: "Estado",
    price: "Preço",
    actions: "Ações",
    view: "Ver",
    order: "Encomenda",
    orders: "Encomendas",

    pending: "Pendente",
    inTransit: "Em trânsito",
    delivered: "Entregue",
    cancelled: "Cancelado",

    pickupLocation: "Local de recolha",
    destinationLocation: "Destino",
    parcelWeight: "Peso da encomenda",
    description: "Descrição",
    optional: "Opcional",
    calculatePrice: "Calcular preço",
    placeOrder: "Fazer encomenda",
    placingOrder: "A fazer encomenda...",
    pickupPlaceholder:
      "Introduza o local de recolha",
    destinationPlaceholder:
      "Introduza o destino",
    descriptionPlaceholder:
      "Descreva a sua encomenda",
    kilograms: "kg",

    backToOrders: "Voltar às encomendas",
    created: "Criado",
    deliveryRoute: "Rota de entrega",
    parcelJourney: "Percurso da encomenda",
    liveTracking: "Rastreamento em direto",
    whereIsMyParcel: "Onde está a minha encomenda?",
    live: "Em direto",
    tracking: "Rastreamento",
    trackingHistory: "Histórico de rastreamento",
    noLocationHistory:
      "Ainda não foram registadas atualizações de localização.",
    locationUpdated: "Localização atualizada",
    currentLocation: "Localização atual",

    orderSummary: "Resumo da encomenda",
    distance: "Distância",
    estimatedTime: "Tempo estimado",
    paymentStatus: "Estado do pagamento",
    paid: "Pago",
    total: "Total",

    completePayment: "Concluir pagamento",
    paymentRequired:
      "O pagamento é necessário antes de a encomenda entrar em trânsito.",
    paymentSuccessful: "Pagamento realizado com sucesso.",
    paymentComplete: "Pagamento concluído",
    paymentCompleteDescription:
      "A sua encomenda foi paga e pode agora ser colocada em trânsito pelo administrador.",
    payNow: "Pagar agora",
    processing: "A processar...",
    reference: "Referência",

    changeDestination: "Alterar destino",
    newDestination: "Novo destino",
    updateDestination: "Atualizar destino",
    updating: "A atualizar...",
    destinationUpdated:
      "Destino atualizado com sucesso.",
    destinationChangeNote:
      "Pode alterar o destino até a encomenda ser entregue ou cancelada.",

    cancelOrder: "Cancelar encomenda",
    cancelling: "A cancelar...",
    orderCancelled: "Encomenda cancelada",
    cancelOrderDescription:
      "Cancele esta entrega se já não precisar dela.",
    orderCancelledDescription:
      "Esta entrega foi cancelada e já não pode ser alterada.",

    deliveryComplete:
      "A sua encomenda foi entregue com sucesso.",

    loading: "A carregar...",
    somethingWentWrong: "Algo correu mal",
    tryAgain: "Tentar novamente",
    refresh: "Atualizar",
    manage: "Gerir",
    mapWaiting:
      "As coordenadas do mapa ainda não estão disponíveis.",
    mapWaitingDescription:
      "O mapa mostrará a rota quando as coordenadas estiverem disponíveis.",
    search: "Pesquisar",
    next: "Seguinte",
    previous: "Anterior",
    save: "Guardar",
    cancel: "Cancelar",
    update: "Atualizar",
    delete: "Eliminar",
    close: "Fechar",
  },

  // =======================================================
  // ARABIC
  // =======================================================

  ar: {
    home: "الرئيسية",
    dashboard: "لوحة التحكم",
    sendParcel: "إرسال طرد",
    admin: "المسؤول",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",

    welcome: "مرحباً بك في SendIT",
    heroTitle: "توصيل سريع وموثوق للطرود.",
    heroDescription:
      "أرسل الطرود إلى أي مكان مع تتبع موثوق وأسعار شفافة وتحديثات مباشرة.",
    pricing: "أسعار بسيطة",
    pricingDescription:
      "توصيل بأسعار مناسبة حسب وزن الطرد.",

    loginTitle: "مرحباً بعودتك",
    registerTitle: "إنشاء حسابك",
    loginDescription:
      "سجل الدخول لإدارة عمليات التوصيل.",
    registerDescription:
      "أنشئ حساباً وابدأ بإرسال الطرود.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    loggingIn: "جارٍ تسجيل الدخول...",
    registering: "جارٍ إنشاء الحساب...",
    noAccount: "ليس لديك حساب؟",
    haveAccount: "لديك حساب بالفعل؟",

    myOrders: "طلباتي",
    myParcels: "طرودي",
    createOrder: "إنشاء طلب",
    noOrders: "ليس لديك طلبات بعد.",
    createFirstOrder: "أنشئ طردك الأول",
    trackingNumber: "رقم التتبع",
    pickup: "موقع الاستلام",
    destination: "الوجهة",
    weight: "الوزن",
    status: "الحالة",
    price: "السعر",
    actions: "الإجراءات",
    view: "عرض",
    order: "الطلب",
    orders: "الطلبات",

    pending: "قيد الانتظار",
    inTransit: "قيد التوصيل",
    delivered: "تم التسليم",
    cancelled: "ملغى",

    pickupLocation: "موقع الاستلام",
    destinationLocation: "الوجهة",
    parcelWeight: "وزن الطرد",
    description: "الوصف",
    optional: "اختياري",
    calculatePrice: "حساب السعر",
    placeOrder: "إنشاء الطلب",
    placingOrder: "جارٍ إنشاء الطلب...",
    pickupPlaceholder:
      "أدخل موقع الاستلام",
    destinationPlaceholder:
      "أدخل وجهة التوصيل",
    descriptionPlaceholder:
      "صف الطرد الخاص بك",
    kilograms: "كغ",

    backToOrders: "العودة إلى الطلبات",
    created: "تم الإنشاء",
    deliveryRoute: "مسار التوصيل",
    parcelJourney: "رحلة الطرد",
    liveTracking: "التتبع المباشر",
    whereIsMyParcel: "أين طردي؟",
    live: "مباشر",
    tracking: "التتبع",
    trackingHistory: "سجل التتبع",
    noLocationHistory:
      "لم يتم تسجيل أي تحديثات للموقع بعد.",
    locationUpdated: "تم تحديث الموقع",
    currentLocation: "الموقع الحالي",

    orderSummary: "ملخص الطلب",
    distance: "المسافة",
    estimatedTime: "الوقت المتوقع",
    paymentStatus: "حالة الدفع",
    paid: "مدفوع",
    total: "الإجمالي",

    completePayment: "إكمال الدفع",
    paymentRequired:
      "يجب إكمال الدفع قبل وضع الطرد قيد التوصيل.",
    paymentSuccessful: "تم الدفع بنجاح.",
    paymentComplete: "اكتمل الدفع",
    paymentCompleteDescription:
      "تم دفع قيمة الطرد ويمكن الآن للمسؤول وضعه قيد التوصيل.",
    payNow: "ادفع الآن",
    processing: "جارٍ المعالجة...",
    reference: "المرجع",

    changeDestination: "تغيير الوجهة",
    newDestination: "الوجهة الجديدة",
    updateDestination: "تحديث الوجهة",
    updating: "جارٍ التحديث...",
    destinationUpdated:
      "تم تحديث الوجهة بنجاح.",
    destinationChangeNote:
      "يمكنك تغيير الوجهة حتى يتم تسليم الطرد أو إلغاؤه.",

    cancelOrder: "إلغاء الطلب",
    cancelling: "جارٍ الإلغاء...",
    orderCancelled: "تم إلغاء الطلب",
    cancelOrderDescription:
      "ألغِ عملية التوصيل إذا لم تعد بحاجة إليها.",
    orderCancelledDescription:
      "تم إلغاء عملية التوصيل ولا يمكن تعديلها بعد الآن.",

    deliveryComplete:
      "تم تسليم طردك بنجاح.",

    loading: "جارٍ التحميل...",
    somethingWentWrong: "حدث خطأ ما",
    tryAgain: "حاول مرة أخرى",
    refresh: "تحديث",
    manage: "إدارة",
    mapWaiting:
      "إحداثيات الخريطة غير متوفرة بعد.",
    mapWaitingDescription:
      "ستظهر خريطة مسار التوصيل عند توفر إحداثيات الموقع.",
    search: "بحث",
    next: "التالي",
    previous: "السابق",
    save: "حفظ",
    cancel: "إلغاء",
    update: "تحديث",
    delete: "حذف",
    close: "إغلاق",
  },
};

// =========================================================
// TRANSLATION FUNCTION
// =========================================================
//
// Usage:
//
// t("en", "dashboard")
// t("sw", "dashboard")
// t("fr", "dashboard")
//
// Falls back to English if a translation is missing.
// =========================================================

export function t(language, key) {
  const selectedLanguage =
    translations[language] || translations.en;

  return (
    selectedLanguage[key] ??
    translations.en[key] ??
    key
  );
}

// =========================================================
// FORMAT MONEY
// =========================================================
//
// Backend stores prices in KES.
//
// Example:
//
// formatMoney(218, "KES")
// formatMoney(218, "USD")
// formatMoney(218, "GBP")
// =========================================================

export function formatMoney(
  amount,
  currency = "KES"
) {
  const numericAmount = Number(amount || 0);

  const rate =
    ratesFromKES[currency] ??
    ratesFromKES.KES;

  const convertedAmount =
    numericAmount * rate;

  const symbol =
    currencySymbols[currency] ??
    currency;

  return `${symbol} ${convertedAmount.toFixed(2)}`;
}

// =========================================================
// EXPORT RAW TRANSLATIONS IF NEEDED
// =========================================================

export { translations };