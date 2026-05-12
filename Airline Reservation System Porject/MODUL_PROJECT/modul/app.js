// app.js - Frontend JavaScript for Airline Reservation System

// Language translations
const translations = {
    en: {
        searchFlights: "Search Flights",
        bookTicket: "Book Ticket",
        multipleTickets: "Multiple Tickets",
        myTickets: "My Tickets",
        cancelTicket: "Cancel Ticket",
        checkIn: "Check-in",
        departureCity: "Departure City",
        destinationCity: "Destination City",
        selectCity: "Select City",
        filters: "Filters",
        departureDate: "Departure Date",
        minPrice: "Min Price (TL)",
        maxPrice: "Max Price (TL)",
        sortBy: "Sort By",
        priceLowHigh: "Price: Low to High",
        priceHighLow: "Price: High to Low",
        timeEarly: "Time: Early First",
        timeLate: "Time: Late First",
        applyFilters: "Apply Filters",
        resetFilters: "Reset",
        passengerInfo: "Passenger Information",
        flightSeat: "Flight & Seat",
        payment: "Payment",
        paymentInfo: "Payment Information",
        continueToPayment: "Continue to Payment",
        payNow: "Pay Now",
        paymentSuccessful: "Payment Successful!",
        viewTicket: "View Ticket",
        idNumber: "ID Number",
        firstName: "First Name",
        lastName: "Last Name",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        selectFlight: "Select Flight",
        cabinClass: "Cabin Class",
        business: "Business",
        economy: "Economy",
        selectSeat: "Select Seat",
        cardType: "Card Type",
        cardHolderName: "Card Holder Name",
        cardNumber: "Card Number",
        expiryDate: "Expiry Date",
        cvv: "CVV",
        selectThisFlight: "Select This Flight",
        onlineCheckIn: "Online Check-in",
        checkInRules: "Check-in Rules",
        checkIn: "Check-in",
        ticketNumber: "Ticket Number",
        passengerSurname: "Passenger Surname",
        aboutUs: "About Us",
        contactUs: "Contact Us",
        forInquiries: "For inquiries and support, please contact us:",
        activeTickets: "Active Tickets",
        cancelledTickets: "Cancelled Tickets",
        noTickets: "No tickets found",
        flightNumber: "Flight Number",
        date: "Date",
        time: "Time",
        seat: "Seat",
        price: "Price",
        status: "Status",
        active: "Active",
        cancelled: "Cancelled",
        enterTicketNumber: "Enter ticket number",
        enterSurname: "Enter surname",
        selectThisFlight: "Select This Flight",
        flightNo: "Flight No:",
        availableSeats: "Available Seats:",
        seats: "seats",
        dateLabel: "Date:",
        timeLabel: "Time:",
        flightsFound: "flights found",
        flightNotFound: "Flight not found",
        pleaseSelectBoth: "Please select both departure and destination cities.",
        departureDestinationSame: "Departure and destination cannot be the same."
    },
    tr: {
        searchFlights: "Uçuş Ara",
        bookTicket: "Bilet Rezervasyonu",
        multipleTickets: "Çoklu Bilet",
        myTickets: "Biletlerim",
        cancelTicket: "Bilet İptali",
        checkIn: "Check-in",
        departureCity: "Kalkış Şehri",
        destinationCity: "Varış Şehri",
        selectCity: "Şehir Seçin",
        filters: "Filtreler",
        departureDate: "Kalkış Tarihi",
        minPrice: "Min Fiyat (TL)",
        maxPrice: "Max Fiyat (TL)",
        sortBy: "Sırala",
        priceLowHigh: "Fiyat: Düşükten Yükseğe",
        priceHighLow: "Fiyat: Yüksekten Düşüğe",
        timeEarly: "Saat: Erken Önce",
        timeLate: "Saat: Geç Önce",
        applyFilters: "Filtreleri Uygula",
        resetFilters: "Sıfırla",
        passengerInfo: "Yolcu Bilgileri",
        flightSeat: "Uçuş ve Koltuk",
        payment: "Ödeme",
        paymentInfo: "Ödeme Bilgileri",
        continueToPayment: "Ödemeye Devam Et",
        payNow: "Ödemeyi Yap",
        paymentSuccessful: "Ödeme Başarılı!",
        viewTicket: "Bileti Görüntüle",
        idNumber: "TC Kimlik No",
        firstName: "Ad",
        lastName: "Soyad",
        emailAddress: "E-posta Adresi",
        phoneNumber: "Telefon Numarası",
        selectFlight: "Uçuş Seçin",
        cabinClass: "Kabin Sınıfı",
        business: "Business",
        economy: "Economy",
        selectSeat: "Koltuk Seçin",
        cardType: "Kart Tipi",
        cardHolderName: "Kart Sahibi Adı",
        cardNumber: "Kart Numarası",
        expiryDate: "Son Kullanma Tarihi",
        cvv: "CVV",
        selectThisFlight: "Bu Uçuşu Seç",
        onlineCheckIn: "Online Check-in",
        checkInRules: "Check-in Kuralları",
        checkIn: "Check-in",
        ticketNumber: "Bilet Numarası",
        passengerSurname: "Yolcu Soyadı",
        aboutUs: "Hakkımızda",
        contactUs: "Bize Ulaşın",
        forInquiries: "Sorularınız ve destek için lütfen bizimle iletişime geçin:",
        activeTickets: "Aktif Biletler",
        cancelledTickets: "İptal Edilen Biletler",
        noTickets: "Bilet bulunamadı",
        flightNumber: "Uçuş Numarası",
        date: "Tarih",
        time: "Saat",
        seat: "Koltuk",
        price: "Fiyat",
        status: "Durum",
        active: "Aktif",
        cancelled: "İptal Edildi",
        enterTicketNumber: "Bilet numarası girin",
        enterSurname: "Soyad girin",
        selectThisFlight: "Bu Uçuşu Seç",
        flightNo: "Uçuş No:",
        availableSeats: "Müsait Koltuklar:",
        seats: "koltuk",
        dateLabel: "Tarih:",
        timeLabel: "Saat:",
        flightsFound: "uçuş bulundu",
        flightNotFound: "Uçuş bulunamadı",
        pleaseSelectBoth: "Lütfen hem kalkış hem de varış şehirlerini seçin.",
        departureDestinationSame: "Kalkış ve varış şehirleri aynı olamaz."
    },
    ar: {
        searchFlights: "البحث عن الرحلات",
        bookTicket: "حجز تذكرة",
        multipleTickets: "تذاكر متعددة",
        myTickets: "تذاكري",
        cancelTicket: "إلغاء التذكرة",
        checkIn: "تسجيل الوصول",
        departureCity: "مدينة المغادرة",
        destinationCity: "مدينة الوصول",
        selectCity: "اختر المدينة",
        filters: "المرشحات",
        departureDate: "تاريخ المغادرة",
        minPrice: "الحد الأدنى للسعر (ليرة تركية)",
        maxPrice: "الحد الأقصى للسعر (ليرة تركية)",
        sortBy: "ترتيب حسب",
        priceLowHigh: "السعر: من الأقل إلى الأعلى",
        priceHighLow: "السعر: من الأعلى إلى الأقل",
        timeEarly: "الوقت: المبكر أولاً",
        timeLate: "الوقت: المتأخر أولاً",
        applyFilters: "تطبيق المرشحات",
        resetFilters: "إعادة تعيين",
        passengerInfo: "معلومات المسافر",
        flightSeat: "الرحلة والمقعد",
        payment: "الدفع",
        paymentInfo: "معلومات الدفع",
        continueToPayment: "المتابعة إلى الدفع",
        payNow: "ادفع الآن",
        paymentSuccessful: "تم الدفع بنجاح!",
        viewTicket: "عرض التذكرة",
        idNumber: "رقم الهوية",
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        emailAddress: "عنوان البريد الإلكتروني",
        phoneNumber: "رقم الهاتف",
        selectFlight: "اختر الرحلة",
        cabinClass: "فئة المقصورة",
        business: "رجال الأعمال",
        economy: "الاقتصادية",
        selectSeat: "اختر المقعد",
        cardType: "نوع البطاقة",
        cardHolderName: "اسم حامل البطاقة",
        cardNumber: "رقم البطاقة",
        expiryDate: "تاريخ الانتهاء",
        cvv: "CVV",
        selectThisFlight: "اختر هذه الرحلة",
        onlineCheckIn: "تسجيل الوصول عبر الإنترنت",
        checkInRules: "قواعد تسجيل الوصول",
        checkIn: "تسجيل الوصول",
        ticketNumber: "رقم التذكرة",
        passengerSurname: "اسم عائلة المسافر",
        aboutUs: "من نحن",
        contactUs: "اتصل بنا",
        forInquiries: "للاستفسارات والدعم، يرجى الاتصال بنا:",
        activeTickets: "التذاكر النشطة",
        cancelledTickets: "التذاكر الملغاة",
        noTickets: "لم يتم العثور على تذاكر",
        flightNumber: "رقم الرحلة",
        date: "التاريخ",
        time: "الوقت",
        seat: "المقعد",
        price: "السعر",
        status: "الحالة",
        active: "نشط",
        cancelled: "ملغى",
        enterTicketNumber: "أدخل رقم التذكرة",
        enterSurname: "أدخل اسم العائلة",
        selectThisFlight: "اختر هذه الرحلة",
        flightNo: "رقم الرحلة:",
        availableSeats: "المقاعد المتاحة:",
        seats: "مقاعد",
        dateLabel: "التاريخ:",
        timeLabel: "الوقت:",
        flightsFound: "تم العثور على رحلات",
        flightNotFound: "لم يتم العثور على رحلة",
        pleaseSelectBoth: "يرجى اختيار كل من مدينة المغادرة والوصول.",
        departureDestinationSame: "لا يمكن أن تكون مدينة المغادرة والوصول هي نفسها."
    }
};

// Current language (default: English)
let currentLanguage = localStorage.getItem('language') || 'en';

// Language change function
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML direction for Arabic
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT') {
                if (element.type === 'button' || element.type === 'submit') {
                    element.value = translations[lang][key];
                }
            } else if (element.tagName === 'BUTTON' || element.tagName === 'SPAN') {
                element.textContent = translations[lang][key];
            } else if (element.tagName === 'SELECT') {
                // For select elements, update the option text
                const option = element.querySelector(`option[data-i18n="${key}"]`);
                if (option) {
                    option.textContent = translations[lang][key];
                }
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update select options
    document.querySelectorAll('select option[data-i18n]').forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            option.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

// Real-world Turkish airport routes data
const airportRoutes = {
    "İstanbul": ["Ankara", "İzmir", "Antalya", "Bodrum", "Dalaman", "Trabzon", "Adana", "Gaziantep", "Kayseri", "Van", "Diyarbakır", "Erzurum", "Samsun", "Bursa", "Eskişehir", "Konya", "Malatya", "Hatay", "Muğla", "Denizli", "Balıkesir", "Çanakkale", "Tekirdağ", "Sakarya", "Kocaeli", "Edirne"],
    "Ankara": ["İstanbul", "İzmir", "Antalya", "Trabzon", "Adana", "Gaziantep", "Kayseri", "Van", "Diyarbakır", "Erzurum", "Samsun", "Eskişehir", "Konya", "Malatya", "Hatay", "Bodrum", "Dalaman", "Muğla"],
    "İzmir": ["İstanbul", "Ankara", "Antalya", "Bodrum", "Dalaman", "Muğla", "Denizli", "Balıkesir", "Çanakkale", "Bursa", "Eskişehir", "Konya"],
    "Antalya": ["İstanbul", "Ankara", "İzmir", "Bodrum", "Dalaman", "Muğla", "Trabzon", "Adana", "Gaziantep", "Kayseri", "Denizli"],
    "Trabzon": ["İstanbul", "Ankara", "Antalya", "Adana", "Gaziantep", "Kayseri", "Erzurum", "Samsun", "Rize", "Artvin", "Giresun", "Ordu"],
    "Adana": ["İstanbul", "Ankara", "Antalya", "Trabzon", "Gaziantep", "Kayseri", "Hatay", "Mersin", "Osmaniye", "Kahramanmaraş", "Malatya"],
    "Gaziantep": ["İstanbul", "Ankara", "Antalya", "Trabzon", "Adana", "Kayseri", "Diyarbakır", "Şanlıurfa", "Malatya", "Hatay", "Kahramanmaraş"],
    "Kayseri": ["İstanbul", "Ankara", "Antalya", "Trabzon", "Adana", "Gaziantep", "Van", "Diyarbakır", "Erzurum", "Sivas", "Malatya", "Nevşehir"],
    "Van": ["İstanbul", "Ankara", "Kayseri", "Diyarbakır", "Erzurum", "Muş", "Ağrı", "Hakkari", "Şırnak", "Bitlis"],
    "Diyarbakır": ["İstanbul", "Ankara", "Gaziantep", "Kayseri", "Van", "Erzurum", "Şanlıurfa", "Mardin", "Batman", "Siirt", "Şırnak", "Muş"],
    "Erzurum": ["İstanbul", "Ankara", "Trabzon", "Kayseri", "Van", "Diyarbakır", "Erzincan", "Artvin", "Ardahan", "Kars", "Ağrı"],
    "Samsun": ["İstanbul", "Ankara", "Trabzon", "Erzurum", "Ordu", "Giresun", "Sinop", "Kastamonu", "Çorum", "Amasya", "Tokat"],
    "Bodrum": ["İstanbul", "Ankara", "İzmir", "Antalya", "Dalaman", "Muğla"],
    "Dalaman": ["İstanbul", "Ankara", "İzmir", "Antalya", "Bodrum", "Muğla"],
    "Bursa": ["İstanbul", "Ankara", "İzmir", "Eskişehir", "Balıkesir", "Çanakkale"],
    "Eskişehir": ["İstanbul", "Ankara", "İzmir", "Bursa", "Konya", "Kütahya"],
    "Konya": ["İstanbul", "Ankara", "İzmir", "Antalya", "Eskişehir", "Kayseri", "Nevşehir", "Karaman", "Aksaray"],
    "Malatya": ["İstanbul", "Ankara", "Adana", "Gaziantep", "Kayseri", "Diyarbakır", "Elazığ", "Tunceli", "Sivas"],
    "Hatay": ["İstanbul", "Ankara", "Antalya", "Adana", "Gaziantep", "Kahramanmaraş"],
    "Muğla": ["İstanbul", "Ankara", "İzmir", "Antalya", "Bodrum", "Dalaman"],
    "Denizli": ["İstanbul", "Ankara", "İzmir", "Antalya", "Muğla"],
    "Balıkesir": ["İstanbul", "Ankara", "İzmir", "Bursa", "Çanakkale"],
    "Çanakkale": ["İstanbul", "Ankara", "İzmir", "Balıkesir", "Bursa", "Edirne"],
    "Rize": ["İstanbul", "Ankara", "Trabzon", "Erzurum"],
    "Artvin": ["İstanbul", "Ankara", "Trabzon", "Erzurum"],
    "Giresun": ["İstanbul", "Ankara", "Trabzon", "Samsun"],
    "Ordu": ["İstanbul", "Ankara", "Trabzon", "Samsun"],
    "Mersin": ["İstanbul", "Ankara", "Adana", "Antalya"],
    "Osmaniye": ["İstanbul", "Ankara", "Adana"],
    "Kahramanmaraş": ["İstanbul", "Ankara", "Adana", "Gaziantep", "Hatay"],
    "Şanlıurfa": ["İstanbul", "Ankara", "Gaziantep", "Diyarbakır"],
    "Mardin": ["İstanbul", "Ankara", "Diyarbakır", "Gaziantep"],
    "Batman": ["İstanbul", "Ankara", "Diyarbakır"],
    "Siirt": ["İstanbul", "Ankara", "Diyarbakır"],
    "Şırnak": ["İstanbul", "Ankara", "Van", "Diyarbakır"],
    "Muş": ["İstanbul", "Ankara", "Van", "Diyarbakır", "Erzurum"],
    "Ağrı": ["İstanbul", "Ankara", "Van", "Erzurum"],
    "Hakkari": ["İstanbul", "Ankara", "Van"],
    "Bitlis": ["İstanbul", "Ankara", "Van", "Diyarbakır"],
    "Erzincan": ["İstanbul", "Ankara", "Erzurum", "Sivas"],
    "Ardahan": ["İstanbul", "Ankara", "Erzurum", "Kars"],
    "Kars": ["İstanbul", "Ankara", "Erzurum", "Ardahan"],
    "Sivas": ["İstanbul", "Ankara", "Kayseri", "Erzincan", "Malatya"],
    "Nevşehir": ["İstanbul", "Ankara", "Kayseri", "Konya"],
    "Sinop": ["İstanbul", "Ankara", "Samsun"],
    "Kastamonu": ["İstanbul", "Ankara", "Samsun"],
    "Çorum": ["İstanbul", "Ankara", "Samsun", "Amasya"],
    "Amasya": ["İstanbul", "Ankara", "Samsun", "Tokat"],
    "Tokat": ["İstanbul", "Ankara", "Samsun", "Sivas"],
    "Elazığ": ["İstanbul", "Ankara", "Malatya", "Diyarbakır"],
    "Tunceli": ["İstanbul", "Ankara", "Malatya", "Elazığ"],
    "Karaman": ["İstanbul", "Ankara", "Konya"],
    "Aksaray": ["İstanbul", "Ankara", "Konya", "Nevşehir"],
    "Tekirdağ": ["İstanbul", "Ankara", "Edirne"],
    "Edirne": ["İstanbul", "Ankara", "Tekirdağ", "Çanakkale"],
    "Sakarya": ["İstanbul", "Ankara", "Bursa"],
    "Kocaeli": ["İstanbul", "Ankara", "Bursa"],
    "Kütahya": ["İstanbul", "Ankara", "Eskişehir", "Bursa"]
};

// Keep original static routes to detect new connections added via admin panel
const baseAirportRoutes = {};
Object.entries(airportRoutes).forEach(([from, destinations]) => {
    baseAirportRoutes[from] = new Set(destinations);
});

// Map of dynamically added destinations per departure city (for "NEW" tag)
let newRouteDestinations = {};

// All Turkish cities (81 provinces) - base list from static routes
const baseCities = Array.from(new Set([
    ...Object.keys(airportRoutes),
    ...Object.values(airportRoutes).flat()
])).sort();

// Will be extended with cities coming from admin‑added flights
let allCities = [...baseCities];
let newCities = new Set();

// Sync cities & routes with any flights created from the admin panel so that
// newly used cities and new connections also appear in index.html dropdowns.
function syncCitiesWithFlights() {
    let storedFlights = [];
    try {
        const stored = JSON.parse(localStorage.getItem('flights'));
        if (Array.isArray(stored)) {
            storedFlights = stored;
        }
    } catch (e) {
        console.error('Flights could not be read from storage for city sync', e);
    }

    const dynamicCitySet = new Set(baseCities);
    newCities = new Set();
    newRouteDestinations = {};

    storedFlights.forEach(f => {
        if (!f) return;
        
        // CRITICAL: Skip deleted flights
        if (f.deleted) return;

        // 1) Make sure all cities used in flights exist in allCities
        [f.departure, f.destination].forEach(city => {
            if (city && typeof city === 'string') {
                if (!dynamicCitySet.has(city)) {
                    dynamicCitySet.add(city);
                    newCities.add(city);
                }
            }
        });

        // 2) Extend route map with new connections so search dropdowns see them
        const dep = f.departure;
        const dest = f.destination;
        if (dep && dest) {
            if (!airportRoutes[dep]) {
                // Create empty route list for completely new departure cities
                airportRoutes[dep] = [];
                baseAirportRoutes[dep] = new Set();
            }

            if (!airportRoutes[dep].includes(dest)) {
                airportRoutes[dep].push(dest);
            }

            // Mark as a "new" route if it wasn't part of the original static map
            const baseSet = baseAirportRoutes[dep] || new Set();
            if (!baseSet.has(dest)) {
                if (!newRouteDestinations[dep]) {
                    newRouteDestinations[dep] = new Set();
                }
                newRouteDestinations[dep].add(dest);
            }
        }
    });

    // Sort with Turkish locale so new cities blend nicely into the list
    allCities = Array.from(dynamicCitySet).sort((a, b) => a.localeCompare(b, 'tr-TR'));
}

// Flight data storage - CRITICAL: Always load from localStorage first
let flights = [];
try {
    const stored = JSON.parse(localStorage.getItem('flights'));
    if (Array.isArray(stored) && stored.length > 0) {
        // Filter out deleted flights
        flights = stored.filter(f => !f.deleted);
        console.log('✅ Loaded ' + flights.length + ' active flights from localStorage on script load (filtered out deleted)');
    }
} catch (e) {
    console.error('Error loading flights on script load:', e);
}

let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
let selectedSeat = null;
let multiSelectedSeats = [];
let selectedMultiFlight = null;
let lastGeneratedTicket = null;
let lastGeneratedMultiCanvasId = null;
let lastBookingTickets = [];
let flightCounter = 1;

// New variables for seat selection flow
let selectedCabinClass = null;
let seatSelectionFee = 100; // TL for manual seat selection
let isManualSeatSelection = false;

// Multi-booking variables
let selectedMultiCabinClass = null;
let isMultiManualSeatSelection = false;

// Payment variables
let selectedCardType = null;

// Flight date generation config
const FLIGHT_START_DATE = new Date('2025-11-01');
const FLIGHT_DATE_RANGE_DAYS = 120; // spread flights across ~4 months

function getFlightStartDate() {
    // Never allow flights earlier than our configured start date or today
    const today = new Date();
    return today > FLIGHT_START_DATE ? today : FLIGHT_START_DATE;
}

function formatDate(dateObj) {
    return dateObj.toISOString().split('T')[0];
}

function generateRandomFlightDate() {
    const baseDate = getFlightStartDate();
    const date = new Date(baseDate);
    const randomDays = Math.floor(Math.random() * FLIGHT_DATE_RANGE_DAYS);
    date.setDate(date.getDate() + randomDays);
    return formatDate(date);
}

function generateRandomFlightTime() {
    const hour = 6 + Math.floor(Math.random() * 12);
    const minute = Math.floor(Math.random() * 60);
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function pruneOutdatedFlights() {
    const minDate = getFlightStartDate();
    const before = flights.length;
    flights = flights.filter(f => {
        if (!f || !f.date) return false;
        const d = new Date(f.date);
        return !isNaN(d) && d >= minDate;
    });
    if (flights.length !== before) {
        persistFlights();
    }
}

// Persist flights so admin panel and main site stay in sync
// CRITICAL: This function must preserve deleted flights in localStorage
function persistFlights() {
    try {
        // First, read all flights from localStorage (including deleted ones)
        let allFlights = [];
        try {
            const stored = JSON.parse(localStorage.getItem('flights'));
            if (Array.isArray(stored)) {
                allFlights = stored;
            }
        } catch (e) {
            console.error('Error reading flights from storage', e);
        }
        
        // Create a map of existing flights by flight number (including deleted ones)
        const flightMap = new Map();
        allFlights.forEach(f => {
            if (f && f.number) {
                flightMap.set(f.number, f);
            }
        });
        
        // Update or add flights from the current flights array
        flights.forEach(f => {
            if (f && f.number) {
                flightMap.set(f.number, f);
            }
        });
        
        // Convert map back to array and save
        const flightsToSave = Array.from(flightMap.values());
        localStorage.setItem('flights', JSON.stringify(flightsToSave));
        console.log('✅ Saved', flightsToSave.length, 'flights to localStorage (preserving deleted flights)');
    } catch (e) {
        console.error('Flights could not be saved to storage', e);
    }
}

// Load flights from localStorage if available
function loadStoredFlights() {
    try {
        const stored = JSON.parse(localStorage.getItem('flights'));
        if (Array.isArray(stored) && stored.length) {
            flights = stored;
            return true;
        }
    } catch (e) {
        console.error('Flights could not be read from storage', e);
    }
    return false;
}

// Single booking data
let currentBookingData = {
    passenger: null,
    flight: null,
    seatNumber: null,
    cabinClass: null,
    ticketType: null,
    seatSelectionType: null,
    price: 0
};

// Multi-booking data
let currentMultiBookingData = {
    passengers: [],
    flight: null,
    seats: [],
    cabinClass: null,
    seatSelectionType: null,
    totalPrice: 0,
    ticketPrices: []
};

function generateTicketNumber() {
    const now = Date.now().toString(36).toUpperCase();
    const rand = Math.floor(Math.random() * 1e6).toString().padStart(6, '0');
    return `TK-${now}-${rand}`;
}

// File handling function to save ticket information to txt file
function saveTicketToFile(ticket) {
    try {
        // Format ticket information as text
        let ticketText = '========================================\n';
        ticketText += '        AIRLINE TICKET INFORMATION\n';
        ticketText += '========================================\n\n';
        
        ticketText += `Ticket Number: ${ticket.ticketNumber}\n`;
        ticketText += `Booking Date: ${ticket.bookingDate}\n\n`;
        
        ticketText += '--- Passenger Information ---\n';
        ticketText += `ID Number: ${ticket.passenger.idNumber}\n`;
        ticketText += `Name: ${ticket.passenger.firstName} ${ticket.passenger.lastName}\n`;
        ticketText += `Email: ${ticket.passenger.email}\n`;
        ticketText += `Phone: ${ticket.passenger.phone}\n`;
        ticketText += `Ticket Type: ${ticket.ticketType}\n\n`;
        
        ticketText += '--- Flight Information ---\n';
        ticketText += `Flight Number: ${ticket.flight.number}\n`;
        ticketText += `Route: ${ticket.flight.departure} → ${ticket.flight.destination}\n`;
        ticketText += `Date: ${ticket.flight.date}\n`;
        ticketText += `Time: ${ticket.flight.departureTime} - ${ticket.flight.arrivalTime}\n`;
        ticketText += `Cabin Class: ${ticket.cabinClass}\n`;
        ticketText += `Seat: ${ticket.seat}\n`;
        ticketText += `Seat Selection Type: ${ticket.seatSelectionType}\n\n`;
        
        ticketText += '--- Payment Information ---\n';
        ticketText += `Base Price: ${ticket.flight.price} TL\n`;
        if (ticket.seatSelectionFee > 0) {
            ticketText += `Seat Selection Fee: ${ticket.seatSelectionFee} TL\n`;
        }
        ticketText += `Total Price: ${ticket.finalPrice} TL\n`;
        ticketText += `Card Type: ${ticket.paymentInfo.cardType}\n`;
        ticketText += `Card Last 4 Digits: ${ticket.paymentInfo.lastFour}\n`;
        ticketText += `Payment Date: ${ticket.paymentInfo.timestamp}\n\n`;
        
        ticketText += `Status: ${ticket.isCancelled ? 'CANCELLED' : 'ACTIVE'}\n`;
        if (ticket.checkedIn) {
            ticketText += `Check-in Status: CHECKED IN\n`;
            ticketText += `Check-in Time: ${ticket.checkedInAt}\n`;
        } else {
            ticketText += `Check-in Status: NOT CHECKED IN\n`;
        }
        
        ticketText += '\n========================================\n';
        ticketText += 'Thank you for choosing our airline!\n';
        ticketText += '========================================\n';
        
        // Create blob and download file
        const blob = new Blob([ticketText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ticket_${ticket.ticketNumber}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        console.log('✅ Ticket information saved to file: ticket_' + ticket.ticketNumber + '.txt');
        return true;
    } catch (error) {
        console.error('❌ Error saving ticket to file:', error);
        return false;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // CRITICAL: Load flights from localStorage FIRST before anything else
    try {
        const stored = JSON.parse(localStorage.getItem('flights'));
        console.log('📥 Index.html: Raw localStorage flights:', stored);
        if (Array.isArray(stored) && stored.length > 0) {
            // IMPORTANT: Filter out deleted flights immediately
            flights = stored.filter(f => !f.deleted);
            console.log('✅ Index.html: Loaded ' + flights.length + ' active flights from localStorage');
            console.log('First flight:', flights[0]);
        } else {
            console.log('⚠️ Index.html: No flights in localStorage or not an array');
        }
    } catch (e) {
        console.error('❌ Error loading flights from storage', e);
    }
    
    // First, extend city list with any cities coming from admin‑created flights
    syncCitiesWithFlights();

    initializeCities();
    initializeMultiBookingCities();
    initializeNavigation();
    initializeEventListeners();
    initializePaymentListeners();
    initializeMultiBookingEventListeners();
    
    // Only generate flights if none exist in localStorage
    if (flights.length === 0) {
        generateFlights();
    } else {
        populateSingleFlightSelect();
    }
    
    loadTickets();
    loadAnnouncements();
    loadCampaigns();
    resetBookingForm();
    resetMultiBookingFlow();
    
    // Initialize chatbot
    initializeChatbot();
    
    // Initialize weather widget
    initializeWeather();
    
    // Initialize language selector
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        changeLanguage(currentLanguage);
        languageSelector.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    // Refresh flights every 2 seconds to sync with admin panel changes
    setInterval(refreshFlightsFromStorage, 2000);
    
    // Refresh campaigns every 2 seconds to sync with admin panel changes
    setInterval(loadCampaigns, 2000);
});

function refreshFlightsFromStorage() {
    try {
        const stored = JSON.parse(localStorage.getItem('flights'));
        if (Array.isArray(stored) && stored.length > 0) {
            // Filter out deleted flights
            flights = stored.filter(f => !f.deleted);
            console.log('🔄 Refreshed flights from storage:', flights.length, 'active flights');
            populateSingleFlightSelect();
        }
    } catch (e) {
        console.error('Error refreshing flights from storage', e);
    }
}

// DEBUG FUNCTION - Call this from browser console to check flights
window.debugFlights = function() {
    console.log('=== FLIGHTS DEBUG ===');
    console.log('Flights in memory:', flights.length, 'flights');
    if (flights.length > 0) {
        console.log('First flight:', flights[0]);
        const tk0001 = flights.find(f => f.number === 'TK0001');
        if (tk0001) {
            console.log('TK0001 found:', tk0001);
        } else {
            console.log('TK0001 NOT found');
        }
    }
    const stored = JSON.parse(localStorage.getItem('flights'));
    console.log('Flights in localStorage:', stored ? stored.length : 0, 'flights');
    if (stored && stored.length > 0) {
        console.log('First stored flight:', stored[0]);
        const tk0001 = stored.find(f => f.number === 'TK0001');
        if (tk0001) {
            console.log('TK0001 in storage:', tk0001);
        }
    }
};

function initializeCities() {
    const departureSelect = document.getElementById('departure');
    const destinationSelect = document.getElementById('destination');
    
    allCities.forEach(city => {
        const option1 = document.createElement('option');
        option1.value = city;
        // For departure list, "NEW" means it's a completely new city
        option1.textContent = city + (newCities.has(city) ? ' (NEW)' : '');
        departureSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = city;
        option2.textContent = city + (newCities.has(city) ? ' (NEW)' : '');
        destinationSelect.appendChild(option2);
    });
    
    // Update destinations when departure changes
    departureSelect.addEventListener('change', function() {
        const departure = this.value;
        const destinationSelect = document.getElementById('destination');
        destinationSelect.innerHTML = '<option value="">Select City</option>';
        
        if (departure && airportRoutes[departure]) {
            const dynamicSet = newRouteDestinations[departure] || new Set();
            airportRoutes[departure].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                const isNewCity = newCities.has(city);
                const isNewRoute = dynamicSet.has(city);
                const suffix = (isNewCity || isNewRoute) ? ' (NEW)' : '';
                option.textContent = city + suffix;
                destinationSelect.appendChild(option);
            });
        } else if (departure) {
            // If city not in routes at all, show all cities except departure
            allCities.filter(c => c !== departure).forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                const isNewCity = newCities.has(city);
                const suffix = isNewCity ? ' (NEW)' : '';
                option.textContent = city + suffix;
                destinationSelect.appendChild(option);
            });
        }
    });
}

function initializeMultiBookingCities() {
    const departureSelect = document.getElementById('multi-departure');
    const destinationSelect = document.getElementById('multi-destination');
    
    allCities.forEach(city => {
        const option1 = document.createElement('option');
        option1.value = city;
        option1.textContent = city + (newCities.has(city) ? ' (NEW)' : '');
        departureSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = city;
        option2.textContent = city + (newCities.has(city) ? ' (NEW)' : '');
        destinationSelect.appendChild(option2);
    });
    
    departureSelect.addEventListener('change', function() {
        const departure = this.value;
        destinationSelect.innerHTML = '<option value="">Select City</option>';
        
        if (departure && airportRoutes[departure]) {
            const dynamicSet = newRouteDestinations[departure] || new Set();
            airportRoutes[departure].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                const isNewCity = newCities.has(city);
                const isNewRoute = dynamicSet.has(city);
                const suffix = (isNewCity || isNewRoute) ? ' (NEW)' : '';
                option.textContent = city + suffix;
                destinationSelect.appendChild(option);
            });
        } else if (departure) {
            allCities.filter(c => c !== departure).forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                const isNewCity = newCities.has(city);
                const suffix = isNewCity ? ' (NEW)' : '';
                option.textContent = city + suffix;
                destinationSelect.appendChild(option);
            });
        }
    });
}

function initializeNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            
            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            if (targetId === 'my-tickets') {
                loadTickets();
            }
            if (targetId === 'multi-booking') {
                refreshFlightsFromStorage();
                resetMultiBookingFlow();
            }
            if (targetId === 'book-ticket') {
                refreshFlightsFromStorage();
                resetBookingForm();
            }
        });
    });
}

function initializeEventListeners() {
    document.getElementById('search-flights-btn').addEventListener('click', searchFlights);
    document.getElementById('flight-select').addEventListener('change', handleFlightSelect);
    document.getElementById('passenger-count').addEventListener('change', function() {
        generatePassengerForms();
        updateMultiSeatFeeBadge();
    });
    document.getElementById('cancel-ticket-btn').addEventListener('click', cancelTicket);
    document.getElementById('download-ticket-btn')?.addEventListener('click', () => downloadTicket('ticket'));
    document.getElementById('download-multi-ticket-btn')?.addEventListener('click', () => downloadTicket('multi-ticket'));
    document.getElementById('checkin-btn')?.addEventListener('click', handleCheckIn);
    document.getElementById('rules-accepted')?.addEventListener('change', handleRulesAcceptance);
    document.getElementById('submit-quiz-btn')?.addEventListener('click', submitQuiz);
    document.getElementById('ticket-type').addEventListener('change', function() {
        updateSingleTicketDiscountInfo(this);
    });
    document.getElementById('cabin-class').addEventListener('change', handleCabinClassSelect);
    
    // Step navigation
    document.getElementById('next-to-step2').addEventListener('click', goToStep2);
    document.getElementById('back-to-step1').addEventListener('click', goToStep1);
    document.getElementById('next-to-step3').addEventListener('click', goToStep3);
    document.getElementById('back-to-step2').addEventListener('click', goToStep2FromPayment);
    
    // Add event listeners for seat option radio buttons
    document.querySelectorAll('input[name="seat-option"]').forEach(radio => {
        radio.addEventListener('change', function() {
            handleSeatOptionChange(this.value);
        });
    });
    
    // Add validation to single booking form
    document.getElementById('passenger-name')?.addEventListener('input', function() {
        validateNameField(this);
    });
    document.getElementById('passenger-surname')?.addEventListener('input', function() {
        validateNameField(this);
    });
    document.getElementById('passenger-id')?.addEventListener('input', function() {
        validateIdField(this);
    });
    document.getElementById('passenger-phone')?.addEventListener('input', function() {
        validatePhoneField(this);
    });
    
    // Email auto-complete for single booking
    document.getElementById('passenger-email')?.addEventListener('input', function() {
        autoCompleteGmail(this);
    });
}

function initializePaymentListeners() {
    // Card type selection
    document.querySelectorAll('.card-type').forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                document.querySelectorAll('.card-type').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                selectedCardType = this.getAttribute('data-type');
            }
        });
    });
    
    // Process payment button
    document.getElementById('process-payment').addEventListener('click', processPayment);
    
    // View ticket button after success
    document.getElementById('view-ticket-btn').addEventListener('click', showTicketAfterPayment);
    
    // Card number formatting
    document.getElementById('card-number').addEventListener('input', function() {
        formatCardNumber(this);
    });
    
    // Expiry date formatting
    document.getElementById('expiry-date').addEventListener('input', function() {
        formatExpiryDate(this);
    });
    
    // CVV validation
    document.getElementById('cvv').addEventListener('input', function() {
        validateCVV(this);
    });
    
    // Campaign code apply button
    document.getElementById('apply-campaign-btn').addEventListener('click', function() {
        const code = document.getElementById('campaign-code').value.trim();
        const messageEl = document.getElementById('campaign-message');
        
        if (!code) {
            messageEl.textContent = '';
            messageEl.style.color = '';
            currentBookingData.appliedCampaign = null;
            updatePaymentSummary();
            return;
        }
        
        const campaign = validateCampaignCode(code);
        if (campaign) {
            currentBookingData.appliedCampaign = campaign;
            messageEl.textContent = `✓ Campaign "${campaign.name}" applied! ${campaign.discountPercentage}% discount.`;
            messageEl.style.color = '#28a745';
            updatePaymentSummary();
        } else {
            currentBookingData.appliedCampaign = null;
            messageEl.textContent = '✗ Invalid or expired campaign code.';
            messageEl.style.color = '#dc3545';
            updatePaymentSummary();
        }
    });
    
    // Allow Enter key to apply campaign code
    document.getElementById('campaign-code').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('apply-campaign-btn').click();
        }
    });
}

function initializeMultiBookingEventListeners() {
    // Passenger count değiştiğinde
    document.getElementById('passenger-count')?.addEventListener('change', function() {
        generatePassengerForms();
        updateMultiSeatFeeBadge();
    });
    
    // Multi next to step 2
    document.getElementById('multi-next-to-step2')?.addEventListener('click', multiGoToStep2);
    
    // Multi back to step 1
    document.getElementById('multi-back-to-step1')?.addEventListener('click', multiGoToStep1);
    
    // Multi next to step 3
    document.getElementById('multi-next-to-step3')?.addEventListener('click', multiGoToStep3);
    
    // Multi back to step 2 from payment
    document.getElementById('multi-back-to-step2')?.addEventListener('click', multiGoToStep2FromPayment);
    
    // Multi search flights
    document.getElementById('multi-search-flights-btn')?.addEventListener('click', multiSearchFlights);
    
    // Multi cabin class select
    document.getElementById('multi-cabin-class')?.addEventListener('change', handleMultiCabinClassSelect);
    
    // Multi seat option change
    document.querySelectorAll('input[name="multi-seat-option"]').forEach(radio => {
        radio.addEventListener('change', function() {
            handleMultiSeatOptionChange(this.value);
        });
    });
    
    // Multi payment card type selection
    document.getElementById('multi-visa')?.addEventListener('click', function() {
        document.querySelectorAll('#multi-step3-content .card-type').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedCardType = 'visa';
    });
    
    document.getElementById('multi-mastercard')?.addEventListener('click', function() {
        document.querySelectorAll('#multi-step3-content .card-type').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedCardType = 'mastercard';
    });
    
    // Multi process payment
    document.getElementById('multi-process-payment')?.addEventListener('click', multiProcessPayment);
    
    // Multi view tickets after payment
    document.getElementById('multi-view-tickets-btn')?.addEventListener('click', showMultiTicketsAfterPayment);
    
    // Multi card number formatting
    document.getElementById('multi-card-number')?.addEventListener('input', function() {
        formatCardNumber(this);
    });
    
    // Multi expiry date formatting
    document.getElementById('multi-expiry-date')?.addEventListener('input', function() {
        formatExpiryDate(this);
    });
    
    // Multi CVV validation
    document.getElementById('multi-cvv')?.addEventListener('input', function() {
        validateCVV(this);
    });
    
    // Multi campaign code apply button
    document.getElementById('multi-apply-campaign-btn')?.addEventListener('click', function() {
        const code = document.getElementById('multi-campaign-code').value.trim();
        const messageEl = document.getElementById('multi-campaign-message');
        
        if (!code) {
            messageEl.textContent = '';
            messageEl.style.color = '';
            currentMultiBookingData.appliedCampaign = null;
            updateMultiPaymentSummary();
            return;
        }
        
        const campaign = validateCampaignCode(code);
        if (campaign) {
            currentMultiBookingData.appliedCampaign = campaign;
            messageEl.textContent = `✓ Campaign "${campaign.name}" applied! ${campaign.discountPercentage}% discount.`;
            messageEl.style.color = '#28a745';
            updateMultiPaymentSummary();
        } else {
            currentMultiBookingData.appliedCampaign = null;
            messageEl.textContent = '✗ Invalid or expired campaign code.';
            messageEl.style.color = '#dc3545';
            updateMultiPaymentSummary();
        }
    });
    
    // Allow Enter key to apply campaign code
    document.getElementById('multi-campaign-code')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('multi-apply-campaign-btn').click();
        }
    });
    
    // Passenger count input for real-time updates
    document.getElementById('passenger-count')?.addEventListener('input', function() {
        updateMultiSeatFeeBadge();
    });
}

// Single booking step navigation functions
function goToStep2() {
    // Validate passenger information
    const idInput = document.getElementById('passenger-id');
    const firstNameInput = document.getElementById('passenger-name');
    const lastNameInput = document.getElementById('passenger-surname');
    const emailInput = document.getElementById('passenger-email');
    const phoneInput = document.getElementById('passenger-phone');
    
    // Validate ID number
    if (!validateIdField(idInput) || idInput.value.length !== 11) {
        showNotification('booking-notification', 'Please enter a valid ID Number (11 digits)', 'error');
        return false;
    }
    
    // Validate first name and last name
    if (!validateNameField(firstNameInput) || !validateNameField(lastNameInput)) {
        showNotification('booking-notification', 'Please enter valid characters for name fields', 'error');
        return false;
    }
    
    // Validate email
    if (!isValidEmail(emailInput.value)) {
        showNotification('booking-notification', 'Please enter a valid email address', 'error');
        return false;
    }
    
    // Validate phone
    if (phoneInput.value.replace(/\D/g, '').length !== 11) {
        showNotification('booking-notification', 'Please enter a valid phone number (11 digits)', 'error');
        return false;
    }
    
    // Store passenger data
    currentBookingData.passenger = {
        idNumber: idInput.value,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };
    
    currentBookingData.ticketType = document.getElementById('ticket-type').value;
    
    // Update UI
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step1').classList.add('completed');
    document.getElementById('step2').classList.add('active');
    
    document.getElementById('step1-content').classList.add('hidden');
    document.getElementById('step2-content').classList.remove('hidden');
    
    // Reset step 2 (flight selection, eğer Search Flights ekranından zaten seçildiyse korunur)
    const flightSelect = document.getElementById('flight-select');
    // Eğer henüz bir uçuş seçilmemişse kullanıcı bu adımda ilk kez seçim yapabilsin
    if (flightSelect && !flightSelect.value) {
        flightSelect.disabled = false;
    }
    document.getElementById('cabin-class').value = '';
    selectedCabinClass = null;
    selectedSeat = null;
    isManualSeatSelection = false;
    document.getElementById('seat-option-section').style.display = 'none';
    document.getElementById('manual-seat-selection').style.display = 'none';
    document.getElementById('next-to-step3').style.display = 'none';
    
    return true;
}

function goToStep1() {
    document.getElementById('step1').classList.add('active');
    document.getElementById('step1').classList.remove('completed');
    document.getElementById('step2').classList.remove('active');
    
    document.getElementById('step1-content').classList.remove('hidden');
    document.getElementById('step2-content').classList.add('hidden');
}

function goToStep3() {
    // Validate flight and seat selection
    const flightNumber = document.getElementById('flight-select').value;
    if (!flightNumber) {
        showNotification('step2-notification', 'Please select a flight', 'error');
        return false;
    }
    
    if (!selectedCabinClass) {
        showNotification('step2-notification', 'Please select a cabin class', 'error');
        return false;
    }
    
    const flight = flights.find(f => f.number === flightNumber);
    if (!flight) {
        showNotification('step2-notification', 'Flight not found. Please reselect.', 'error');
        return false;
    }
    
    let seatNumber;
    let seatSelectionType = 'random';
    
    // Seat assignment logic
    if (isManualSeatSelection) {
        // Manual seat selection
        if (!selectedSeat) {
            showNotification('step2-notification', 'Please select a seat.', 'error');
            return false;
        }
        
        // Validate the manually selected seat
        const seatData = flight.seats[selectedSeat];
        if (!seatData) {
            showNotification('step2-notification', 'Selected seat not found.', 'error');
            return false;
        }
        
        // Double-check cabin class validation
        if ((selectedCabinClass === 'BUSINESS' && seatData.class !== 'BUSINESS') ||
            (selectedCabinClass === 'ECONOMY' && seatData.class === 'BUSINESS')) {
            showNotification('step2-notification', 'Selected seat does not match your cabin class.', 'error');
            return false;
        }
        
        // Check if seat is already occupied or selected
        const bookedSeats = tickets
            .filter(t => t.flightNumber === flightNumber && !t.isCancelled)
            .map(t => t.seat);
        const isBooked = bookedSeats.includes(selectedSeat) || (seatData && seatData.occupied);
        
        if (isBooked && selectedSeat !== currentBookingData.seatNumber) {
            showNotification('step2-notification', 'Selected seat is no longer available. Please select another seat.', 'error');
            return false;
        }
        
        seatNumber = selectedSeat;
        seatSelectionType = 'manual';
    } else {
        // Random seat assignment
        seatNumber = assignRandomSeat(flight, selectedCabinClass);
        if (seatNumber === null) {
            showNotification('step2-notification', `No available ${selectedCabinClass.toLowerCase()} seats on this flight.`, 'error');
            return false;
        }
        
        seatSelectionType = 'random';
    }
    
    // Calculate price
    const seatData = flight.seats[seatNumber];
    let price = flight.basePrice;
    
    // Apply Business class surcharge (2x)
    if (seatData.class === 'BUSINESS') {
        price *= 2;
    }
    
    // Apply Exit Row surcharge (+30%)
    if (seatData.exitRow) {
        price *= 1.3;
    }
    
    // Apply seat selection fee for manual selection
    if (isManualSeatSelection) {
        price += seatSelectionFee;
    }
    
    const ticketTypeMultipliers = {
        'FULL': 1.0,
        'DISABLED': 0.8,
        'TEACHER': 0.8,
        'STUDENT': 0.8,
        'VETERAN': 0.5,
        'SENIOR': 0.8
    };
    
    price *= ticketTypeMultipliers[currentBookingData.ticketType] || 1.0;
    
    // Store booking data
    currentBookingData.flight = flight;
    currentBookingData.seatNumber = seatNumber;
    currentBookingData.cabinClass = selectedCabinClass;
    currentBookingData.seatSelectionType = seatSelectionType;
    currentBookingData.price = parseFloat(price.toFixed(2));
    currentBookingData.appliedCampaign = null; // Reset campaign when moving to payment
    
    // Clear campaign code input
    document.getElementById('campaign-code').value = '';
    document.getElementById('campaign-message').textContent = '';
    
    // Update UI
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step2').classList.add('completed');
    document.getElementById('step3').classList.add('active');
    
    document.getElementById('step2-content').classList.add('hidden');
    document.getElementById('step3-content').classList.remove('hidden');
    
    // Update payment summary
    updatePaymentSummary();
    
    return true;
}

function goToStep2FromPayment() {
    document.getElementById('step2').classList.add('active');
    document.getElementById('step2').classList.remove('completed');
    document.getElementById('step3').classList.remove('active');
    
    document.getElementById('step2-content').classList.remove('hidden');
    document.getElementById('step3-content').classList.add('hidden');
}

// Multi-booking step navigation functions
function multiGoToStep2() {
    const passengerCount = parseInt(document.getElementById('passenger-count').value);
    if (isNaN(passengerCount) || passengerCount < 1) {
        showNotification('multi-notification', 'Please enter a valid number of passengers (minimum 1).', 'error');
        return false;
    }
    
    // Validate all passenger forms
    const passengerForms = document.querySelectorAll('.passenger-form');
    for (let i = 0; i < passengerForms.length; i++) {
        const form = passengerForms[i];
        const idInput = form.querySelector('.id-number');
        const firstNameInput = form.querySelector('.passenger-name');
        const lastNameInput = form.querySelector('.passenger-surname');
        const emailInput = form.querySelector('.passenger-email');
        const phoneInput = form.querySelector('.passenger-phone');
        
        // Validate ID number
        if (!validateIdField(idInput) || idInput.value.length !== 11) {
            showNotification('multi-notification', `Passenger ${i+1}: Please enter a valid ID Number (11 digits)`, 'error');
            return false;
        }
        
        // Validate first name and last name
        if (!validateNameField(firstNameInput) || !validateNameField(lastNameInput)) {
            showNotification('multi-notification', `Passenger ${i+1}: Please enter valid characters for name fields`, 'error');
            return false;
        }
        
        // Validate email
        if (!isValidEmail(emailInput.value)) {
            showNotification('multi-notification', `Passenger ${i+1}: Please enter a valid email address`, 'error');
            return false;
        }
        
        // Validate phone
        if (phoneInput.value.replace(/\D/g, '').length !== 11) {
            showNotification('multi-notification', `Passenger ${i+1}: Please enter a valid phone number (11 digits)`, 'error');
            return false;
        }
    }
    
    // Store passenger data
    currentMultiBookingData.passengers = [];
    for (let i = 1; i <= passengerCount; i++) {
        const passenger = {
            idNumber: document.getElementById(`multi-id-${i}`).value,
            firstName: document.getElementById(`multi-name-${i}`).value,
            lastName: document.getElementById(`multi-surname-${i}`).value,
            email: document.getElementById(`multi-email-${i}`).value,
            phone: document.getElementById(`multi-phone-${i}`).value,
            ticketType: document.getElementById(`multi-ticket-type-${i}`).value
        };
        currentMultiBookingData.passengers.push(passenger);
    }
    
    // Update UI
    document.getElementById('multi-step1').classList.remove('active');
    document.getElementById('multi-step1').classList.add('completed');
    document.getElementById('multi-step2').classList.add('active');
    
    document.getElementById('multi-step1-content').classList.add('hidden');
    document.getElementById('multi-step2-content').classList.remove('hidden');
    
    // Reset step 2
    resetMultiStep2();
    
    return true;
}

function resetMultiStep2() {
    document.getElementById('multi-departure').value = '';
    document.getElementById('multi-destination').value = '';
    document.getElementById('multi-flight-results').innerHTML = '';
    document.getElementById('multi-cabin-class-section').style.display = 'none';
    document.getElementById('multi-seat-option-section').style.display = 'none';
    document.getElementById('multi-seat-selection').style.display = 'none';
    document.getElementById('multi-next-to-step3').style.display = 'none';
    
    selectedMultiFlight = null;
    selectedMultiCabinClass = null;
    isMultiManualSeatSelection = false;
    multiSelectedSeats = [];
    updateMultiSelectedSeats();
}

function multiGoToStep1() {
    document.getElementById('multi-step1').classList.add('active');
    document.getElementById('multi-step1').classList.remove('completed');
    document.getElementById('multi-step2').classList.remove('active');
    
    document.getElementById('multi-step1-content').classList.remove('hidden');
    document.getElementById('multi-step2-content').classList.add('hidden');
}

function multiGoToStep3() {
    const flightNumber = selectedMultiFlight;
    if (!flightNumber) {
        showNotification('multi-step2-notification', 'Please select a flight', 'error');
        return false;
    }
    
    if (!selectedMultiCabinClass) {
        showNotification('multi-step2-notification', 'Please select a cabin class', 'error');
        return false;
    }
    
    const flight = flights.find(f => f.number === flightNumber);
    if (!flight) {
        showNotification('multi-step2-notification', 'Flight not found. Please reselect.', 'error');
        return false;
    }
    
    const passengerCount = currentMultiBookingData.passengers.length;
    let seats = [];
    let seatSelectionType = 'random';
    
    // Seat assignment logic
    if (isMultiManualSeatSelection) {
        // Manual seat selection
        if (multiSelectedSeats.length !== passengerCount) {
            showNotification('multi-step2-notification', `Please select ${passengerCount} seats.`, 'error');
            return false;
        }
        
        // Validate all manually selected seats
        for (let i = 0; i < multiSelectedSeats.length; i++) {
            const seatNumber = multiSelectedSeats[i];
            const seatData = flight.seats[seatNumber];
            
            if (!seatData) {
                showNotification('multi-step2-notification', `Selected seat ${seatNumber} not found.`, 'error');
                return false;
            }
            
            // Double-check cabin class validation
            if ((selectedMultiCabinClass === 'BUSINESS' && seatData.class !== 'BUSINESS') ||
                (selectedMultiCabinClass === 'ECONOMY' && seatData.class === 'BUSINESS')) {
                showNotification('multi-step2-notification', `Selected seat ${seatNumber} does not match your cabin class.`, 'error');
                return false;
            }
            
            // Check if seat is already occupied or selected by another passenger in this booking
            const bookedSeats = tickets
                .filter(t => t.flightNumber === flightNumber && !t.isCancelled)
                .map(t => t.seat);
            const isBooked = bookedSeats.includes(seatNumber) || (seatData && seatData.occupied);
            const isSelectedByOther = multiSelectedSeats.includes(seatNumber) && multiSelectedSeats.indexOf(seatNumber) !== i;
            
            if (isBooked || isSelectedByOther) {
                showNotification('multi-step2-notification', `Selected seat ${seatNumber} is no longer available. Please select another seat.`, 'error');
                return false;
            }
        }
        
        seats = [...multiSelectedSeats];
        seatSelectionType = 'manual';
    } else {
        // Random seat assignment
        // Track temporarily assigned seats to avoid duplicates
        const tempAssignedSeats = [];
        for (let i = 0; i < passengerCount; i++) {
            const seatNumber = assignRandomSeatExcluding(flight, selectedMultiCabinClass, tempAssignedSeats);
            if (seatNumber === null) {
                showNotification('multi-step2-notification', `Not enough available ${selectedMultiCabinClass.toLowerCase()} seats on this flight.`, 'error');
                return false;
            }
            seats.push(seatNumber);
            tempAssignedSeats.push(seatNumber);
        }
        
        seatSelectionType = 'random';
    }
    
    // Calculate total price
    let totalPrice = 0;
    const ticketPrices = [];
    
    for (let i = 0; i < passengerCount; i++) {
        const seatNumber = seats[i];
        const seatData = flight.seats[seatNumber];
        const passenger = currentMultiBookingData.passengers[i];
        
        let price = flight.basePrice;
        
        // Apply Business class surcharge (2x)
        if (seatData.class === 'BUSINESS') {
            price *= 2;
        }
        
        // Apply Exit Row surcharge (+30%)
        if (seatData.exitRow) {
            price *= 1.3;
        }
        
        // Apply seat selection fee for manual selection
        if (isMultiManualSeatSelection) {
            price += seatSelectionFee;
        }
        
        const ticketTypeMultipliers = {
            'FULL': 1.0,
            'BABY': 0.1,
            'CHILD': 0.75,
            'DISABLED': 0.8,
            'TEACHER': 0.8,
            'STUDENT': 0.8,
            'VETERAN': 0.5,
            'SENIOR': 0.8
        };
        
        price *= ticketTypeMultipliers[passenger.ticketType] || 1.0;
        ticketPrices.push(parseFloat(price.toFixed(2)));
        totalPrice += price;
    }
    
    // Store booking data
    currentMultiBookingData.flight = flight;
    currentMultiBookingData.seats = seats;
    currentMultiBookingData.cabinClass = selectedMultiCabinClass;
    currentMultiBookingData.seatSelectionType = seatSelectionType;
    currentMultiBookingData.totalPrice = parseFloat(totalPrice.toFixed(2));
    currentMultiBookingData.ticketPrices = ticketPrices;
    currentMultiBookingData.appliedCampaign = null; // Reset campaign when moving to payment
    
    // Clear campaign code input
    document.getElementById('multi-campaign-code').value = '';
    document.getElementById('multi-campaign-message').textContent = '';
    
    // Update UI
    document.getElementById('multi-step2').classList.remove('active');
    document.getElementById('multi-step2').classList.add('completed');
    document.getElementById('multi-step3').classList.add('active');
    
    document.getElementById('multi-step2-content').classList.add('hidden');
    document.getElementById('multi-step3-content').classList.remove('hidden');
    
    // Update payment summary
    updateMultiPaymentSummary();
    
    return true;
}

function multiGoToStep2FromPayment() {
    document.getElementById('multi-step2').classList.add('active');
    document.getElementById('multi-step2').classList.remove('completed');
    document.getElementById('multi-step3').classList.remove('active');
    
    document.getElementById('multi-step2-content').classList.remove('hidden');
    document.getElementById('multi-step3-content').classList.add('hidden');
}

// Payment functions
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formatted = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formatted += ' ';
        }
        formatted += value[i];
    }
    
    input.value = formatted.substring(0, 19); // 16 digits + 3 spaces
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        let month = parseInt(value.substring(0, 2));
        if (month > 12) {
            month = 12;
        }
        if (month < 1) {
            month = 1;
        }
        value = month.toString().padStart(2, '0') + value.substring(2);
        
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
    }
    
    input.value = value.substring(0, 5);
}

function validateCVV(input) {
    let value = input.value.replace(/\D/g, '');
    input.value = value.substring(0, 3);
}

function validatePaymentForm() {
    const cardHolder = document.getElementById('card-holder').value.trim();
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!selectedCardType) {
        showNotification('payment-notification', 'Please select a card type', 'error');
        return false;
    }
    
    if (!cardHolder) {
        showNotification('payment-notification', 'Please enter card holder name', 'error');
        return false;
    }
    
    if (cardNumber.length !== 16) {
        showNotification('payment-notification', 'Please enter a valid 16-digit card number', 'error');
        return false;
    }
    
    if (!expiryDate || expiryDate.length !== 5) {
        showNotification('payment-notification', 'Please enter a valid expiry date (MM/YY)', 'error');
        return false;
    }
    
    if (cvv.length !== 3) {
        showNotification('payment-notification', 'Please enter a valid 3-digit CVV', 'error');
        return false;
    }
    
    // Validate expiry date
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        showNotification('payment-notification', 'Card has expired', 'error');
        return false;
    }
    
    return true;
}

function validateMultiPaymentForm() {
    const cardHolder = document.getElementById('multi-card-holder').value.trim();
    const cardNumber = document.getElementById('multi-card-number').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('multi-expiry-date').value;
    const cvv = document.getElementById('multi-cvv').value;
    
    if (!selectedCardType) {
        showNotification('multi-payment-notification', 'Please select a card type', 'error');
        return false;
    }
    
    if (!cardHolder) {
        showNotification('multi-payment-notification', 'Please enter card holder name', 'error');
        return false;
    }
    
    if (cardNumber.length !== 16) {
        showNotification('multi-payment-notification', 'Please enter a valid 16-digit card number', 'error');
        return false;
    }
    
    if (!expiryDate || expiryDate.length !== 5) {
        showNotification('multi-payment-notification', 'Please enter a valid expiry date (MM/YY)', 'error');
        return false;
    }
    
    if (cvv.length !== 3) {
        showNotification('multi-payment-notification', 'Please enter a valid 3-digit CVV', 'error');
        return false;
    }
    
    // Validate expiry date
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        showNotification('multi-payment-notification', 'Card has expired', 'error');
        return false;
    }
    
    return true;
}

// Campaign discount functions
function validateCampaignCode(code) {
    if (!code || !code.trim()) return null;
    
    try {
        const campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        const now = new Date();
        
        const campaign = campaigns.find(c => {
            if (!c.active) return false;
            if (c.discountCode && c.discountCode.toUpperCase() !== code.trim().toUpperCase()) return false;
            
            // Check date range
            if (c.startDate) {
                const startDate = new Date(c.startDate);
                if (now < startDate) return false;
            }
            
            if (c.endDate) {
                const endDate = new Date(c.endDate);
                endDate.setHours(23, 59, 59, 999);
                if (now > endDate) return false;
            }
            
            return true;
        });
        
        return campaign || null;
    } catch (e) {
        console.error('Error validating campaign code:', e);
        return null;
    }
}

function applyCampaignDiscount(basePrice, campaign) {
    if (!campaign || !campaign.discountPercentage) return 0;
    return (basePrice * campaign.discountPercentage) / 100;
}

function updatePaymentSummary() {
    document.getElementById('summary-flight').textContent = 
        `${currentBookingData.flight.departure} → ${currentBookingData.flight.destination} (${currentBookingData.flight.number})`;
    
    document.getElementById('summary-passenger').textContent = 
        `${currentBookingData.passenger.firstName} ${currentBookingData.passenger.lastName}`;
    
    document.getElementById('summary-seat').textContent = currentBookingData.seatNumber;
    
    document.getElementById('summary-cabin').textContent = currentBookingData.cabinClass;
    
    document.getElementById('summary-ticket-type').textContent = 
        document.getElementById('ticket-type').selectedOptions[0].text;
    
    // Calculate base price without seat selection fee
    let basePrice = currentBookingData.flight.basePrice;
    const seatData = currentBookingData.flight.seats[currentBookingData.seatNumber];
    
    if (seatData.class === 'BUSINESS') {
        basePrice *= 2;
    }
    
    if (seatData.exitRow) {
        basePrice *= 1.3;
    }
    
    const ticketTypeMultipliers = {
        'FULL': 1.0,
        'DISABLED': 0.8,
        'TEACHER': 0.8,
        'STUDENT': 0.8,
        'VETERAN': 0.5,
        'SENIOR': 0.8
    };
    
    basePrice *= ticketTypeMultipliers[currentBookingData.ticketType] || 1.0;
    
    document.getElementById('summary-base-price').textContent = `${basePrice.toFixed(2)} TL`;
    
    const seatFee = currentBookingData.seatSelectionType === 'manual' ? seatSelectionFee : 0;
    document.getElementById('summary-seat-fee').textContent = `${seatFee.toFixed(2)} TL`;
    
    // Apply campaign discount if exists
    let discount = 0;
    let finalPrice = basePrice + seatFee;
    
    if (currentBookingData.appliedCampaign) {
        discount = applyCampaignDiscount(basePrice + seatFee, currentBookingData.appliedCampaign);
        finalPrice = (basePrice + seatFee) - discount;
        
        document.getElementById('summary-discount-row').style.display = 'flex';
        document.getElementById('summary-discount').textContent = `-${discount.toFixed(2)} TL`;
    } else {
        document.getElementById('summary-discount-row').style.display = 'none';
    }
    
    // Update final price
    currentBookingData.price = parseFloat(finalPrice.toFixed(2));
    document.getElementById('summary-total').textContent = `${currentBookingData.price.toFixed(2)} TL`;
}

function updateMultiPaymentSummary() {
    const flight = currentMultiBookingData.flight;
    const passengers = currentMultiBookingData.passengers;
    const seats = currentMultiBookingData.seats;
    
    document.getElementById('multi-summary-flight').textContent = 
        `${flight.departure} → ${flight.destination} (${flight.number})`;
    
    document.getElementById('multi-summary-passengers').textContent = 
        passengers.map(p => `${p.firstName} ${p.lastName}`).join(', ');
    
    document.getElementById('multi-summary-cabin').textContent = currentMultiBookingData.cabinClass;
    
    document.getElementById('multi-summary-seats').textContent = seats.join(', ');
    
    document.getElementById('multi-summary-seat-type').textContent = 
        currentMultiBookingData.seatSelectionType === 'manual' ? 'Manual Selection' : 'Random Assignment';
    
    // Calculate base price without seat selection fee
    let basePricePerTicket = flight.basePrice;
    const firstSeatData = flight.seats[seats[0]];
    
    if (firstSeatData.class === 'BUSINESS') {
        basePricePerTicket *= 2;
    }
    
    if (firstSeatData.exitRow) {
        basePricePerTicket *= 1.3;
    }
    
    document.getElementById('multi-summary-base-price').textContent = `${basePricePerTicket.toFixed(2)} TL`;
    
    const seatFee = currentMultiBookingData.seatSelectionType === 'manual' ? 
        seatSelectionFee * passengers.length : 0;
    document.getElementById('multi-summary-seat-fee').textContent = `${seatFee.toFixed(2)} TL`;
    
    // Apply campaign discount if exists
    let discount = 0;
    let finalPrice = currentMultiBookingData.totalPrice;
    
    if (currentMultiBookingData.appliedCampaign) {
        discount = applyCampaignDiscount(currentMultiBookingData.totalPrice, currentMultiBookingData.appliedCampaign);
        finalPrice = currentMultiBookingData.totalPrice - discount;
        
        document.getElementById('multi-summary-discount-row').style.display = 'flex';
        document.getElementById('multi-summary-discount').textContent = `-${discount.toFixed(2)} TL`;
    } else {
        document.getElementById('multi-summary-discount-row').style.display = 'none';
    }
    
    // Update final price
    currentMultiBookingData.totalPrice = parseFloat(finalPrice.toFixed(2));
    document.getElementById('multi-summary-total').textContent = `${currentMultiBookingData.totalPrice.toFixed(2)} TL`;
}

function processPayment() {
    if (!validatePaymentForm()) {
        return;
    }
    
    const btn = document.getElementById('process-payment');
    const btnText = document.getElementById('process-payment-text');
    const btnLoading = document.getElementById('process-payment-loading');
    
    btn.disabled = true;
    btnText.textContent = 'Processing...';
    btnLoading.style.display = 'inline-block';
    
    // Simulate payment processing
    setTimeout(() => {
        try {
            // Create ticket
            const ticketNumber = generateTicketNumber();
            const ticket = {
                ticketNumber,
                passenger: currentBookingData.passenger,
                flight: currentBookingData.flight,
                seat: currentBookingData.seatNumber,
                cabinClass: currentBookingData.cabinClass,
                ticketType: currentBookingData.ticketType,
                seatSelectionType: currentBookingData.seatSelectionType,
                bookingDate: new Date().toLocaleString('en-US'),
                isCancelled: false,
                finalPrice: currentBookingData.price,
                checkedIn: false,
                checkedInAt: null,
                seatSelectionFee: currentBookingData.seatSelectionType === 'manual' ? seatSelectionFee : 0,
                paymentInfo: {
                    cardType: selectedCardType,
                    lastFour: document.getElementById('card-number').value.slice(-4),
                    timestamp: new Date().toISOString()
                }
            };
            
            // Add to tickets
            tickets.push(ticket);
            lastBookingTickets = [ticket];
            
            // Save tickets to localStorage
            localStorage.setItem('tickets', JSON.stringify(tickets));
            
            // Save ticket information to txt file instead of localStorage
            saveTicketToFile(ticket);
            
            // Mark seat as occupied
            currentBookingData.flight.seats[currentBookingData.seatNumber].occupied = true;
            persistFlights();
            
            // Update UI
            document.getElementById('step3').classList.remove('active');
            document.getElementById('step3').classList.add('completed');
            
            document.getElementById('step3-content').classList.add('hidden');
            document.getElementById('payment-success').classList.remove('hidden');
            
            document.getElementById('success-ticket-number').textContent = ticketNumber;
            
            showNotification('payment-notification', 
                `Payment successful! Ticket ${ticketNumber} has been created.`, 
                'success');
            
            // Send email
            sendTicketEmail(ticket).then(success => {
                console.log('Email sent:', success);
            }).catch(err => {
                console.error('Email error:', err);
            });
                
        } catch (err) {
            console.error(err);
            showNotification('payment-notification', 'Payment failed. Please try again.', 'error');
        } finally {
            btn.disabled = false;
            btnText.textContent = 'Pay Now';
            btnLoading.style.display = 'none';
        }
    }, 2000);
}

function multiProcessPayment() {
    if (!validateMultiPaymentForm()) {
        return;
    }
    
    const btn = document.getElementById('multi-process-payment');
    const btnText = document.getElementById('multi-process-payment-text');
    const btnLoading = document.getElementById('multi-process-payment-loading');
    
    btn.disabled = true;
    btnText.textContent = 'Processing...';
    btnLoading.style.display = 'inline-block';
    
    // Simulate payment processing
    setTimeout(() => {
        try {
            const flight = currentMultiBookingData.flight;
            const passengers = currentMultiBookingData.passengers;
            const seats = currentMultiBookingData.seats;
            const bookedTickets = [];
            lastBookingTickets = [];
            
            // Create tickets for all passengers
            for (let i = 0; i < passengers.length; i++) {
                const passenger = passengers[i];
                const seatNumber = seats[i];
                const ticketPrice = currentMultiBookingData.ticketPrices[i];
                
                const ticketNumber = generateTicketNumber();
                const ticket = {
                    ticketNumber,
                    passenger: passenger,
                    flight: flight,
                    seat: seatNumber,
                    cabinClass: currentMultiBookingData.cabinClass,
                    ticketType: passenger.ticketType,
                    seatSelectionType: currentMultiBookingData.seatSelectionType,
                    bookingDate: new Date().toLocaleString('en-US'),
                    isCancelled: false,
                    finalPrice: ticketPrice,
                    checkedIn: false,
                    checkedInAt: null,
                    seatSelectionFee: currentMultiBookingData.seatSelectionType === 'manual' ? seatSelectionFee : 0,
                    paymentInfo: {
                        cardType: selectedCardType,
                        lastFour: document.getElementById('multi-card-number').value.slice(-4),
                        timestamp: new Date().toISOString()
                    }
                };
                
                tickets.push(ticket);
                lastBookingTickets.push(ticket);
                bookedTickets.push(ticketNumber);
                
                // Save ticket information to txt file instead of localStorage
                saveTicketToFile(ticket);
                
                // Mark seat as occupied
                flight.seats[seatNumber].occupied = true;
            }
            
            // Save all tickets to localStorage
            localStorage.setItem('tickets', JSON.stringify(tickets));
            
            persistFlights();
            
            // Update UI
            document.getElementById('multi-step3').classList.remove('active');
            document.getElementById('multi-step3').classList.add('completed');
            
            document.getElementById('multi-step3-content').classList.add('hidden');
            document.getElementById('multi-payment-success').classList.remove('hidden');
            
            document.getElementById('multi-success-ticket-numbers').textContent = bookedTickets.join(', ');
            
            showNotification('multi-payment-notification', 
                `Payment successful! ${passengers.length} tickets have been created.`, 
                'success');
            
            // Send emails
            Promise.all(lastBookingTickets.map(t => sendTicketEmail(t))).then(results => {
                console.log('Emails sent:', results);
            }).catch(err => {
                console.error('Email error:', err);
            });
                
        } catch (err) {
            console.error(err);
            showNotification('multi-payment-notification', 'Payment failed. Please try again.', 'error');
        } finally {
            btn.disabled = false;
            btnText.textContent = 'Pay Now';
            btnLoading.style.display = 'none';
        }
    }, 2000);
}

function showTicketAfterPayment() {
    if (lastBookingTickets.length > 0) {
        const ticket = lastBookingTickets[0];
        showTicketPreview(ticket, 'ticket');
        document.getElementById('ticket-preview-wrapper').classList.remove('hidden');
        showNotification('payment-notification', 
            `Email has been sent to ${ticket.passenger.email}`, 
            'success');
    }
}

function showMultiTicketsAfterPayment() {
    if (lastBookingTickets.length > 0) {
        showMultipleTicketPreviews(lastBookingTickets);
        document.getElementById('multi-ticket-preview-wrapper').classList.remove('hidden');
        showNotification('multi-payment-notification', 
            `Email has been sent to ${lastBookingTickets.length} passenger(s).`, 
            'success');
    }
}

// Function to validate passenger name (no numbers allowed)
function validateNameField(field) {
    const value = field.value.trim();
    const hasNumbers = /\d/.test(value);
    
    if (value && hasNumbers) {
        field.classList.add('invalid');
        // Add error message
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Please enter valid characters';
            errorMsg.style.color = '#dc3545';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '5px';
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
        }
        return false;
    } else {
        field.classList.remove('invalid');
        // Remove error message if exists
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
        }
        return true;
    }
}

function validateIdField(field) {
    const value = field.value.trim();
    const hasLetters = /[^0-9]/.test(value); // Check for any non-digit characters
    const isValidLength = value.length === 11; // Check if exactly 11 digits
    
    if (value && (hasLetters || !isValidLength)) {
        field.classList.add('invalid');
        // Add error message
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'ID Number must be 11 digits';
            errorMsg.style.color = '#dc3545';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '5px';
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
        }
    } else {
        field.classList.remove('invalid');
        // Remove error message if exists
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
        }
    }
    
    return !hasLetters && (value === '' || isValidLength);
}

// Function to validate phone number format
function validatePhoneField(field) {
    let value = field.value;
    const cursorPosition = field.selectionStart;
    
    // Remove all non-digit characters
    let digitsOnly = value.replace(/\D/g, '');
    
    // If user starts typing and first digit is not 0, prepend 0
    if (digitsOnly.length > 0 && digitsOnly[0] !== '0') {
        digitsOnly = '0' + digitsOnly;
    }
    
    // If second digit exists and is not 5, replace with 5
    if (digitsOnly.length > 1 && digitsOnly[1] !== '5') {
        digitsOnly = digitsOnly[0] + '5' + digitsOnly.substring(2);
    }
    
    // Limit to 11 digits (0 + 10 more)
    if (digitsOnly.length > 11) {
        digitsOnly = digitsOnly.substring(0, 11);
    }
    
    // Format: 0(5XX) XXX XX XX
    let formatted = '';
    if (digitsOnly.length > 0) {
        formatted = digitsOnly[0]; // 0
        if (digitsOnly.length > 1) {
            formatted += '(' + digitsOnly.substring(1, 4); // (5XX
            if (digitsOnly.length >= 4) {
                formatted += ')'; // )
            }
            if (digitsOnly.length > 4) {
                formatted += ' ' + digitsOnly.substring(4, 7); // XXX
            }
            if (digitsOnly.length > 7) {
                formatted += ' ' + digitsOnly.substring(7, 9); // XX
            }
            if (digitsOnly.length > 9) {
                formatted += ' ' + digitsOnly.substring(9, 11); // XX
            }
        }
    }
    
    // Calculate new cursor position in formatted string
    let newCursorPosition = 0;
    if (digitsOnly.length > 0) {
        // Count how many digits were before the cursor in the original value
        const originalDigitsBeforeCursor = value.substring(0, cursorPosition).replace(/\D/g, '').length;
        
        // Find position in formatted string after that many digits
        let digitCount = 0;
        for (let i = 0; i < formatted.length; i++) {
            if (/\d/.test(formatted[i])) {
                digitCount++;
                if (digitCount >= originalDigitsBeforeCursor) {
                    newCursorPosition = i + 1;
                    break;
                }
            }
        }
        if (newCursorPosition === 0 && originalDigitsBeforeCursor > 0) {
            newCursorPosition = formatted.length;
        }
    }
    
    // Update field value
    field.value = formatted;
    
    // Set cursor position
    field.setSelectionRange(newCursorPosition, newCursorPosition);
    
    // Validate: must start with 0, second digit should be 5, and have exactly 11 digits
    if (digitsOnly.length > 0) {
        if (digitsOnly.length !== 11 || digitsOnly[0] !== '0' || (digitsOnly.length > 1 && digitsOnly[1] !== '5')) {
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }
    } else {
        field.classList.remove('invalid');
    }
}

function autoCompleteGmail(field) {
    const value = field.value;
    const cursorPosition = field.selectionStart;
    
    // Check if user just typed "@" (cursor is right after "@")
    if (cursorPosition > 0 && value[cursorPosition - 1] === '@') {
        // Check if there's already text after "@" (user is typing something else)
        const textAfterAt = value.substring(cursorPosition);
        
        // Only auto-complete if there's no text after "@" or only whitespace
        if (!textAfterAt || textAfterAt.trim().length === 0) {
            // Check if "@gmail" is not already there
            const textBeforeCursor = value.substring(0, cursorPosition);
            if (!textBeforeCursor.toLowerCase().endsWith('@gmail')) {
                // Insert "gmail" after "@"
                field.value = textBeforeCursor + 'gmail' + textAfterAt;
                
                // Set cursor position after "gmail"
                const newCursorPosition = cursorPosition + 5;
                field.setSelectionRange(newCursorPosition, newCursorPosition);
            }
        }
    }
}

function generateFlights() {
    // CRITICAL: Always check localStorage first for admin-edited flights
    try {
        const stored = JSON.parse(localStorage.getItem('flights'));
        if (Array.isArray(stored) && stored.length > 0) {
            // Filter out deleted flights
            flights = stored.filter(f => !f.deleted);
            console.log('Loaded flights from storage:', flights.length, 'active flights (filtered out deleted)');
            pruneOutdatedFlights();
            flightCounter = flights.length + 1;
            populateSingleFlightSelect();
            return;
        }
    } catch (e) {
        console.error('Error loading flights from storage', e);
    }

    // Only generate new flights if localStorage is empty
    flights = [];
    flightCounter = 1;
    
    Object.keys(airportRoutes).forEach(departure => {
        airportRoutes[departure].forEach(destination => {
            for (let i = 0; i < 3; i++) {
                const date = generateRandomFlightDate();
                const time = generateRandomFlightTime();
                const basePrice = 300 + Math.floor(Math.random() * 400);
                
                flights.push({
                    number: `TK${String(flightCounter++).padStart(4, '0')}`,
                    departure,
                    destination,
                    date,
                    time,
                    basePrice,
                    seats: generateSeatMap()
                });
            }
        });
    });
    
    persistFlights();
    populateSingleFlightSelect();
}

function generateSeatMap() {
    const seats = {};
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const exitRows = [10, 11, 12, 15, 16, 17];
    
    // Business / premium: rows 1-3
    for (let row = 1; row <= 3; row++) {
        seatLetters.forEach(letter => {
            seats[`${row}${letter}`] = { occupied: false, class: 'BUSINESS', exitRow: exitRows.includes(row) };
        });
    }
    
    // Economy: rows 4-29
    for (let row = 4; row <= 29; row++) {
        seatLetters.forEach(letter => {
            seats[`${row}${letter}`] = { occupied: false, class: 'ECONOMY', exitRow: exitRows.includes(row) };
        });
    }
    
    return seats;
}

function populateSingleFlightSelect() {
    // Always reload flights from storage to get latest admin changes
    try {
        const stored = JSON.parse(localStorage.getItem('flights'));
        if (Array.isArray(stored) && stored.length > 0) {
            flights = stored;
        }
    } catch (e) {
        console.error('Error loading flights from storage', e);
    }
    
    const flightSelect = document.getElementById('flight-select');
    const currentValue = flightSelect.value;
    flightSelect.innerHTML = '<option value="">Select Flight</option>';
    
    flights.filter(f => !f.cancelled && !f.deleted).forEach(flight => {
        const option = document.createElement('option');
        option.value = flight.number;
        option.textContent = `${flight.number}: ${flight.departure} → ${flight.destination} (${flight.date} ${flight.time}) - ${flight.basePrice.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} TL`;
        flightSelect.appendChild(option);
    });
    
    if (currentValue) {
        flightSelect.value = currentValue;
    }
}

function searchFlights() {
    // CRITICAL: ALWAYS reload flights from localStorage - this is the key to sync
    console.log('🔍 searchFlights called');
    
    // Force reload from localStorage every single time
    let stored = null;
    try {
        const rawData = localStorage.getItem('flights');
        console.log('Raw localStorage.flights:', rawData ? rawData.substring(0, 100) + '...' : 'NULL');
        
        stored = JSON.parse(rawData);
        console.log('Parsed flights from storage:', stored ? stored.length : 0, 'flights');
        
        if (Array.isArray(stored) && stored.length > 0) {
            // IMPORTANT: Replace the flights array completely, but filter out deleted flights
            flights = stored.filter(f => !f.deleted);
            console.log('✅ flights array updated with', flights.length, 'active flights from localStorage (filtered out deleted)');
            
            // Verify TK0001
            const tk0001 = flights.find(f => f.number === 'TK0001');
            if (tk0001) {
                console.log('✅ TK0001 FOUND:', {
                    number: tk0001.number,
                    price: tk0001.basePrice,
                    date: tk0001.date,
                    time: tk0001.time
                });
            } else {
                console.log('⚠️ TK0001 NOT found in flights array');
            }
        } else {
            console.log('⚠️ No flights in localStorage or not an array');
        }
    } catch (e) {
        console.error('❌ Error parsing flights from storage:', e);
    }
    
    pruneOutdatedFlights();
    const departure = document.getElementById('departure').value;
    const destination = document.getElementById('destination').value;
    const notification = document.getElementById('search-notification');
    
    if (!departure || !destination) {
        showNotification(notification, 'Please select both departure and destination cities.', 'error');
        return;
    }
    
    if (departure === destination) {
        showNotification(notification, 'Departure and destination cannot be the same.', 'error');
        return;
    }
    
    let filteredFlights = flights.filter(f => 
        f.departure === departure && f.destination === destination && !f.cancelled && !f.deleted
    );
    console.log('🔎 Filtered flights:', filteredFlights.length);
    console.log('Filtered flights details:', filteredFlights.map(f => ({
        number: f.number,
        price: f.basePrice,
        date: f.date,
        time: f.time
    })));
    
    const resultsContainer = document.getElementById('flight-results');
    
    if (filteredFlights.length === 0) {
        // Check if there are deleted flights for this route
        let allFlightsForRoute = [];
        try {
            const stored = JSON.parse(localStorage.getItem('flights'));
            if (Array.isArray(stored)) {
                allFlightsForRoute = stored.filter(f => 
                    f.departure === departure && f.destination === destination
                );
            }
        } catch (e) {
            console.error('Error checking for deleted flights', e);
        }
        
        // If all flights for this route are deleted, show "Flight not found"
        if (allFlightsForRoute.length > 0 && allFlightsForRoute.every(f => f.deleted)) {
            resultsContainer.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">Flight not found</p>';
            showNotification(notification, 'Flight not found', 'error');
            return;
        }
        
        // Otherwise, generate a new flight (existing behavior)
        const date = generateRandomFlightDate();
        const time = generateRandomFlightTime();
        const basePrice = 300 + Math.floor(Math.random() * 400);
        
        const newFlight = {
            number: `TK${String(flightCounter++).padStart(4, '0')}`,
            departure,
            destination,
            date,
            time,
            basePrice,
            seats: generateSeatMap()
        };
        
        flights.push(newFlight);
        persistFlights();
        populateSingleFlightSelect();
        
        filteredFlights = [newFlight];
    }
    
    showNotification(notification, `${filteredFlights.length} ${translations[currentLanguage].flightsFound}.`, 'success');
    
    let html = '';
    filteredFlights.forEach(flight => {
        // Ensure flight object has seats property
        if (!flight.seats || typeof flight.seats !== 'object') {
            flight.seats = generateSeatMap();
        }
        
        const availableSeats = Object.keys(flight.seats).filter(s => !flight.seats[s].occupied).length;
        const businessSeats = Object.keys(flight.seats).filter(s => !flight.seats[s].occupied && flight.seats[s].class === 'BUSINESS').length;
        const economySeats = Object.keys(flight.seats).filter(s => !flight.seats[s].occupied && flight.seats[s].class === 'ECONOMY').length;
        const statusBadge = flight.cancelled ? '<span style="color: red; font-weight: bold;"> [CANCELLED]</span>' : '';
        
        // Ensure basePrice is a number
        const price = typeof flight.basePrice === 'number' ? flight.basePrice : parseFloat(flight.basePrice) || 0;
        
        console.log('✈️ Displaying flight:', flight.number, 'Price:', price, 'Date:', flight.date, 'Time:', flight.time);
        
        html += `
            <div class="flight-card">
                <div class="flight-header">
                    <div class="flight-route">${flight.departure} → ${flight.destination}</div>
                    <div class="flight-price">${price.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} TL</div>
                </div>
                <div class="flight-details">
                    <div><strong>${translations[currentLanguage].flightNo}</strong> ${flight.number}${statusBadge}</div>
                    <div><strong>${translations[currentLanguage].dateLabel}</strong> ${flight.date}</div>
                    <div><strong>${translations[currentLanguage].timeLabel}</strong> ${flight.time}</div>
                    <div><strong>${translations[currentLanguage].availableSeats}</strong> ${availableSeats}</div>
                    <div><strong>${translations[currentLanguage].business}:</strong> ${businessSeats} ${translations[currentLanguage].seats}</div>
                    <div><strong>${translations[currentLanguage].economy}:</strong> ${economySeats} ${translations[currentLanguage].seats}</div>
                </div>
                <button class="select-flight-btn" data-flight="${flight.number}" ${flight.cancelled ? 'disabled' : ''}>${translations[currentLanguage].selectThisFlight}</button>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
    
    document.querySelectorAll('.select-flight-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const flightNumber = this.getAttribute('data-flight');
            document.querySelector('[data-target="book-ticket"]').click();
            document.getElementById('flight-select').value = flightNumber;
            handleFlightSelect();
        });
    });
}

function handleFlightSelect() {
    const flightSelect = document.getElementById('flight-select');
    const flightNumber = flightSelect.value;
    if (flightNumber) {
        // Kullanıcı ilk uçuş seçimini yaptıktan sonra ikinci kez değiştiremesin
        flightSelect.disabled = true;
        // Show cabin class selection
        document.getElementById('cabin-class').value = '';
        selectedCabinClass = null;
        document.getElementById('cabin-class').disabled = false;
        
        // Hide seat sections initially
        document.getElementById('seat-option-section').style.display = 'none';
        document.getElementById('manual-seat-selection').style.display = 'none';
        document.getElementById('next-to-step3').style.display = 'none';
        
        // Reset seat selection
        selectedSeat = null;
        isManualSeatSelection = false;
        document.getElementById('selected-seat').textContent = 'Not selected';
    }
}

function handleCabinClassSelect() {
    const cabinClass = document.getElementById('cabin-class').value;
    const seatOptionSection = document.getElementById('seat-option-section');
    const manualSeatSelection = document.getElementById('manual-seat-selection');
    const nextButton = document.getElementById('next-to-step3');
    
    if (cabinClass) {
        selectedCabinClass = cabinClass;
        seatOptionSection.style.display = 'block';
        
        // Reset seat selection
        selectedSeat = null;
        document.getElementById('selected-seat').textContent = 'Not selected';
        manualSeatSelection.style.display = 'none';
        
        // Reset radio buttons to random selection
        document.querySelector('input[name="seat-option"][value="random"]').checked = true;
        isManualSeatSelection = false;
        
        // Enable next button
        nextButton.style.display = 'block';
    } else {
        selectedCabinClass = null;
        seatOptionSection.style.display = 'none';
        manualSeatSelection.style.display = 'none';
        nextButton.style.display = 'none';
    }
}

function handleSeatOptionChange(optionValue) {
    const manualSeatSelection = document.getElementById('manual-seat-selection');
    isManualSeatSelection = (optionValue === 'manual');
    
    if (isManualSeatSelection) {
        manualSeatSelection.style.display = 'block';
        generateSeatMapForManualSelection();
    } else {
        manualSeatSelection.style.display = 'none';
        selectedSeat = null;
        document.getElementById('selected-seat').textContent = 'Not selected';
        document.getElementById('seat-error').style.display = 'none';
    }
}

function generateSeatMapForManualSelection() {
    const flightNumber = document.getElementById('flight-select').value;
    if (!flightNumber || !selectedCabinClass) return;
    
    const flight = flights.find(f => f.number === flightNumber);
    if (!flight) return;
    
    const container = document.getElementById('seat-map-container');
    container.innerHTML = '';
    
    // Get booked seats from tickets
    const bookedSeats = tickets
        .filter(t => t.flightNumber === flightNumber && !t.isCancelled)
        .map(t => t.seat);
    
    let html = `
        <div class="seat-map-instruction">
            <p>Select a seat from the <strong>${selectedCabinClass === 'BUSINESS' ? 'Business Class' : 'Economy Class'}</strong> section.</p>
            <p style="color: #dc3545; font-weight: bold;">
                ${selectedCabinClass === 'BUSINESS' 
                    ? 'Note: You can only select Business seats (Rows 1-3). Economy seats are not selectable.' 
                    : 'Note: You can only select Economy seats (Rows 4-29). Business seats are not selectable.'}
            </p>
            <p style="color: #2a5298;"><strong>Additional 100 TL fee applies for manual seat selection.</strong></p>
        </div>
        <div class="cabin-section">
            <div class="section-title">Business Class (Rows 1-3)</div>
            ${generateSeatRowsForManualSelection(flight, bookedSeats, 1, 3)}
        </div>
        <div class="cabin-section" style="margin-top: 20px;">
            <div class="section-title">Economy Class (Rows 4-29)</div>
            ${generateSeatRowsForManualSelection(flight, bookedSeats, 4, 29)}
        </div>
    `;
    
    container.innerHTML = html;
    
    // Add click listeners to all seats (both available and disabled)
    container.querySelectorAll('.seat').forEach(seat => {
        seat.addEventListener('click', function() {
            const seatNumber = this.getAttribute('data-seat');
            // Only allow clicking on available seats (not disabled ones)
            if (!this.classList.contains('disabled-seat')) {
                handleManualSeatClick(seatNumber, flight);
            }
        });
    });
}

function generateSeatRowsForManualSelection(flight, bookedSeats, startRow, endRow) {
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    let html = '';
    
    for (let row = startRow; row <= endRow; row++) {
        const isExitRow = flight.seats[`${row}A`]?.exitRow;
        const rowClass = isExitRow ? 'seat-row exit-row' : 'seat-row';
        html += `<div class="${rowClass}">`;
        html += `<div class="row-number">${row}</div>`;
        
        seatLetters.forEach((letter, index) => {
            const seatNumber = `${row}${letter}`;
            const seatData = flight.seats[seatNumber];
            const isBooked = bookedSeats.includes(seatNumber) || (seatData && seatData.occupied);
            const isSelected = selectedSeat === seatNumber;
            // Seçilmiş koltuk dolu gösterilmeli (tekrar seçilemesin)
            const isOccupiedOrSelected = isBooked || isSelected;
            
            // Check if this seat is selectable based on cabin class
            const isSelectable = seatData && (
                (selectedCabinClass === 'BUSINESS' && seatData.class === 'BUSINESS') ||
                (selectedCabinClass === 'ECONOMY' && seatData.class === 'ECONOMY')
            );
            
            let seatClass = 'seat';
            if (seatData && seatData.class === 'BUSINESS') {
                seatClass += ' business';
            } else {
                seatClass += ' economy';
            }
            
            if (isOccupiedOrSelected) {
                seatClass += ' occupied';
            } else if (!isSelectable) {
                // Disable seats that don't match the selected cabin class
                seatClass += ' disabled-seat';
            } else {
                seatClass += ' available';
            }
            
            html += `<div class="${seatClass}" data-seat="${seatNumber}">${letter}</div>`;
            
            if (index === 2) {
                html += '<div class="seat-aisle"></div>';
            }
        });
        
        html += '</div>';
    }
    
    return html;
}

function handleManualSeatClick(seatNumber, flight) {
    const seatData = flight.seats[seatNumber];
    const seatError = document.getElementById('seat-error');
    
    // Check if seat is already occupied or selected
    const bookedSeats = tickets
        .filter(t => t.flightNumber === flight.number && !t.isCancelled)
        .map(t => t.seat);
    const isBooked = bookedSeats.includes(seatNumber) || (seatData && seatData.occupied);
    
    if (isBooked) {
        seatError.textContent = 'This seat is already occupied. Please select another seat.';
        seatError.style.display = 'block';
        return;
    }
    
    // Validate cabin class match
    if (selectedCabinClass === 'BUSINESS' && seatData.class !== 'BUSINESS') {
        seatError.textContent = 'ERROR: You selected an Economy seat. Business class passengers must select Business seats only.';
        seatError.style.display = 'block';
        return;
    }
    
    if (selectedCabinClass === 'ECONOMY' && seatData.class === 'BUSINESS') {
        seatError.textContent = 'ERROR: You selected a Business seat. Economy class passengers must select Economy seats only.';
        seatError.style.display = 'block';
        return;
    }
    
    // If validation passes
    seatError.style.display = 'none';
    selectedSeat = seatNumber;
    
    let seatInfo = seatNumber;
    let surchargeInfo = '';
    
    if (seatData) {
        if (seatData.class === 'BUSINESS') {
            surchargeInfo += ' (Business: 2x price)';
        }
        if (seatData.exitRow) {
            surchargeInfo += ' (Exit Row: +30%)';
        }
    }
    
    // Add seat selection fee info
    surchargeInfo += ' (+100 TL seat selection fee)';
    
    document.getElementById('selected-seat').textContent = seatInfo + surchargeInfo;
    
    // Update seat map to show selected seat as occupied
    generateSeatMapForManualSelection();
}

function getAvailableSeatsByClass(flight, cabinClass) {
    const availableSeats = [];
    
    // Get booked seats from tickets
    const bookedSeats = tickets
        .filter(t => t.flight && t.flight.number === flight.number && !t.isCancelled)
        .map(t => t.seat);
    
    Object.keys(flight.seats).forEach(seatNumber => {
        const seatData = flight.seats[seatNumber];
        // Check if seat is occupied or booked
        const isBooked = bookedSeats.includes(seatNumber) || seatData.occupied;
        if (!isBooked) {
            if (cabinClass === 'BUSINESS' && seatData.class === 'BUSINESS') {
                availableSeats.push(seatNumber);
            } else if (cabinClass === 'ECONOMY' && seatData.class === 'ECONOMY') {
                availableSeats.push(seatNumber);
            }
        }
    });
    
    return availableSeats;
}

function assignRandomSeat(flight, cabinClass) {
    const availableSeats = getAvailableSeatsByClass(flight, cabinClass);
    if (availableSeats.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * availableSeats.length);
    return availableSeats[randomIndex];
}

function assignRandomSeatExcluding(flight, cabinClass, excludedSeats) {
    const availableSeats = getAvailableSeatsByClassExcluding(flight, cabinClass, excludedSeats);
    if (availableSeats.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * availableSeats.length);
    return availableSeats[randomIndex];
}

function getAvailableSeatsByClassExcluding(flight, cabinClass, excludedSeats) {
    const availableSeats = [];
    
    Object.keys(flight.seats).forEach(seatNumber => {
        const seatData = flight.seats[seatNumber];
        // Exclude occupied seats and seats in excludedSeats list
        if (!seatData.occupied && !excludedSeats.includes(seatNumber)) {
            if (cabinClass === 'BUSINESS' && seatData.class === 'BUSINESS') {
                availableSeats.push(seatNumber);
            } else if (cabinClass === 'ECONOMY' && seatData.class === 'ECONOMY') {
                availableSeats.push(seatNumber);
            }
        }
    });
    
    return availableSeats;
}

function resetBookingForm() {
    // Reset steps
    document.getElementById('step1').classList.add('active');
    document.getElementById('step1').classList.remove('completed');
    document.getElementById('step2').classList.remove('active', 'completed');
    document.getElementById('step3').classList.remove('active', 'completed');
    
    // Show step 1 content
    document.getElementById('step1-content').classList.remove('hidden');
    document.getElementById('step2-content').classList.add('hidden');
    document.getElementById('step3-content').classList.add('hidden');
    document.getElementById('payment-success').classList.add('hidden');
    document.getElementById('ticket-preview-wrapper').classList.add('hidden');
    
    // Reset form fields
    document.getElementById('passenger-id').value = '';
    document.getElementById('passenger-name').value = '';
    document.getElementById('passenger-surname').value = '';
    document.getElementById('passenger-email').value = '';
    document.getElementById('passenger-phone').value = '';
    document.getElementById('ticket-type').value = 'FULL';
    const flightSelect = document.getElementById('flight-select');
    if (flightSelect) {
        flightSelect.value = '';
        flightSelect.disabled = false; // Yeni rezervasyonda tekrar uçuş seçimine izin ver
    }
    document.getElementById('cabin-class').value = '';
    
    // Reset payment fields
    document.getElementById('card-holder').value = '';
    document.getElementById('card-number').value = '';
    document.getElementById('expiry-date').value = '';
    document.getElementById('cvv').value = '';
    
    // Reset variables
    selectedCabinClass = null;
    selectedSeat = null;
    isManualSeatSelection = false;
    selectedCardType = null;
    currentBookingData = {
        passenger: null,
        flight: null,
        seatNumber: null,
        cabinClass: null,
        ticketType: null,
        seatSelectionType: null,
        price: 0
    };
    
    // Reset UI elements
    document.getElementById('seat-option-section').style.display = 'none';
    document.getElementById('manual-seat-selection').style.display = 'none';
    document.getElementById('next-to-step3').style.display = 'none';
    document.getElementById('selected-seat').textContent = 'Not selected';
    document.getElementById('seat-error').style.display = 'none';
    
    // Reset card type selection
    document.querySelectorAll('.card-type').forEach(card => {
        card.classList.remove('selected');
    });
}

function handleMultiFlightSelect(flightNumber) {
    selectedMultiFlight = flightNumber;
    
    // Show cabin class selection
    document.getElementById('multi-cabin-class-section').style.display = 'block';
    document.getElementById('multi-cabin-class').value = '';
    selectedMultiCabinClass = null;
    
    // Hide seat sections initially
    document.getElementById('multi-seat-option-section').style.display = 'none';
    document.getElementById('multi-seat-selection').style.display = 'none';
    document.getElementById('multi-next-to-step3').style.display = 'none';
    
    // Reset seat selection
    multiSelectedSeats = [];
    updateMultiSelectedSeats();
    isMultiManualSeatSelection = false;
    
    // Show next button
    document.getElementById('multi-next-to-step3').style.display = 'block';
}

function multiSearchFlights() {
    // CRITICAL: Always reload flights from localStorage to get latest admin changes
    try {
        const stored = JSON.parse(localStorage.getItem('flights'));
        if (Array.isArray(stored) && stored.length > 0) {
            // Filter out deleted flights
            flights = stored.filter(f => !f.deleted);
        }
    } catch (e) {
        console.error('Error loading flights from storage', e);
    }
    
    pruneOutdatedFlights();
    const departure = document.getElementById('multi-departure').value;
    const destination = document.getElementById('multi-destination').value;
    const notification = document.getElementById('multi-step2-notification');
    const resultsContainer = document.getElementById('multi-flight-results');
    
    resultsContainer.innerHTML = '';
    
    if (!departure || !destination) {
        showNotification(notification, translations[currentLanguage].pleaseSelectBoth, 'error');
        return;
    }
    
    if (departure === destination) {
        showNotification(notification, translations[currentLanguage].departureDestinationSame, 'error');
        return;
    }
    
    let filteredFlights = flights.filter(f => 
        f.departure === departure && f.destination === destination && !f.cancelled && !f.deleted
    );
    
    if (filteredFlights.length === 0) {
        // Check if there are deleted flights for this route
        let allFlightsForRoute = [];
        try {
            const stored = JSON.parse(localStorage.getItem('flights'));
            if (Array.isArray(stored)) {
                allFlightsForRoute = stored.filter(f => 
                    f.departure === departure && f.destination === destination
                );
            }
        } catch (e) {
            console.error('Error checking for deleted flights', e);
        }
        
        // If all flights for this route are deleted, show "Flight not found"
        if (allFlightsForRoute.length > 0 && allFlightsForRoute.every(f => f.deleted)) {
            resultsContainer.innerHTML = `<p style="text-align: center; padding: 20px; color: #666;">${translations[currentLanguage].flightNotFound}</p>`;
            showNotification(notification, translations[currentLanguage].flightNotFound, 'error');
            return;
        }
        
        // Otherwise, generate a new flight (existing behavior)
        const date = generateRandomFlightDate();
        const time = generateRandomFlightTime();
        const basePrice = 300 + Math.floor(Math.random() * 400);
        
        const newFlight = {
            number: `TK${String(flightCounter++).padStart(4, '0')}`,
            departure,
            destination,
            date,
            time,
            basePrice,
            seats: generateSeatMap()
        };
        
        flights.push(newFlight);
        persistFlights();
        populateSingleFlightSelect();
        
        filteredFlights = [newFlight];
    }
    
    showNotification(notification, `${filteredFlights.length} ${translations[currentLanguage].flightsFound}.`, 'success');
    
    let html = '';
    filteredFlights.forEach(flight => {
        const availableSeats = Object.keys(flight.seats).filter(s => !flight.seats[s].occupied).length;
        const statusBadge = flight.cancelled ? '<span style="color: red; font-weight: bold;"> [CANCELLED]</span>' : '';
        html += `
            <div class="flight-card">
                <div class="flight-header">
                    <div class="flight-route">${flight.departure} → ${flight.destination}</div>
                    <div class="flight-price">${flight.basePrice.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} TL</div>
                </div>
                <div class="flight-details">
                    <div><strong>${translations[currentLanguage].flightNo}</strong> ${flight.number}${statusBadge}</div>
                    <div><strong>${translations[currentLanguage].dateLabel}</strong> ${flight.date}</div>
                    <div><strong>${translations[currentLanguage].timeLabel}</strong> ${flight.time}</div>
                    <div><strong>${translations[currentLanguage].availableSeats}</strong> ${availableSeats}</div>
                </div>
                <button class="select-multi-flight-btn" data-flight="${flight.number}" ${flight.cancelled ? 'disabled' : ''}>${translations[currentLanguage].selectThisFlight}</button>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
    
    document.querySelectorAll('.select-multi-flight-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const flightNumber = this.getAttribute('data-flight');
            handleMultiFlightSelect(flightNumber);
        });
    });
}

function resetMultiBookingFlow() {
    // Reset steps
    document.getElementById('multi-step1').classList.add('active');
    document.getElementById('multi-step1').classList.remove('completed');
    document.getElementById('multi-step2').classList.remove('active', 'completed');
    document.getElementById('multi-step3').classList.remove('active', 'completed');
    
    // Show step 1 content
    document.getElementById('multi-step1-content').classList.remove('hidden');
    document.getElementById('multi-step2-content').classList.add('hidden');
    document.getElementById('multi-step3-content').classList.add('hidden');
    document.getElementById('multi-payment-success').classList.add('hidden');
    document.getElementById('multi-ticket-preview-wrapper').classList.add('hidden');
    
    // Reset form fields
    document.getElementById('passenger-count').value = '1';
    generatePassengerForms();
    document.getElementById('multi-departure').value = '';
    document.getElementById('multi-destination').value = '';
    document.getElementById('multi-cabin-class').value = '';
    document.getElementById('multi-card-holder').value = '';
    document.getElementById('multi-card-number').value = '';
    document.getElementById('multi-expiry-date').value = '';
    document.getElementById('multi-cvv').value = '';
    
    // Reset variables
    currentMultiBookingData = {
        passengers: [],
        flight: null,
        seats: [],
        cabinClass: null,
        seatSelectionType: null,
        totalPrice: 0,
        ticketPrices: []
    };
    
    selectedMultiFlight = null;
    selectedMultiCabinClass = null;
    isMultiManualSeatSelection = false;
    multiSelectedSeats = [];
    selectedCardType = null;
    
    // Reset UI elements
    document.getElementById('multi-cabin-class-section').style.display = 'none';
    document.getElementById('multi-seat-option-section').style.display = 'none';
    document.getElementById('multi-seat-selection').style.display = 'none';
    document.getElementById('multi-next-to-step3').style.display = 'none';
    document.getElementById('multi-flight-results').innerHTML = '';
    updateMultiSelectedSeats();
    
    // Reset card type selection
    document.querySelectorAll('#multi-step3-content .card-type').forEach(card => {
        card.classList.remove('selected');
    });
}

function handleMultiCabinClassSelect() {
    const cabinClass = document.getElementById('multi-cabin-class').value;
    const seatOptionSection = document.getElementById('multi-seat-option-section');
    const seatSelection = document.getElementById('multi-seat-selection');
    const nextButton = document.getElementById('multi-next-to-step3');
    
    if (cabinClass) {
        selectedMultiCabinClass = cabinClass;
        seatOptionSection.style.display = 'block';
        
        // Reset seat selection
        multiSelectedSeats = [];
        updateMultiSelectedSeats();
        seatSelection.style.display = 'none';
        
        // Reset radio buttons to random selection
        document.querySelector('input[name="multi-seat-option"][value="random"]').checked = true;
        isMultiManualSeatSelection = false;
        
        // Enable next button
        nextButton.style.display = 'block';
        
        // Update fee badge
        updateMultiSeatFeeBadge();
    } else {
        selectedMultiCabinClass = null;
        seatOptionSection.style.display = 'none';
        seatSelection.style.display = 'none';
        nextButton.style.display = 'none';
    }
}

function handleMultiSeatOptionChange(optionValue) {
    const seatSelection = document.getElementById('multi-seat-selection');
    isMultiManualSeatSelection = (optionValue === 'manual');
    
    if (isMultiManualSeatSelection) {
        seatSelection.style.display = 'block';
        generateMultiSeatMapForManualSelection();
    } else {
        seatSelection.style.display = 'none';
        multiSelectedSeats = [];
        updateMultiSelectedSeats();
        document.getElementById('multi-seat-error').style.display = 'none';
    }
    
    // Update fee badge
    updateMultiSeatFeeBadge();
}

function generateMultiSeatMapForManualSelection() {
    const flightNumber = selectedMultiFlight;
    if (!flightNumber || !selectedMultiCabinClass) return;
    
    const flight = flights.find(f => f.number === flightNumber);
    if (!flight) return;
    
    const container = document.getElementById('multi-seat-map-container');
    container.innerHTML = '';
    
    // Get booked seats from tickets
    const bookedSeats = tickets
        .filter(t => t.flightNumber === flightNumber && !t.isCancelled)
        .map(t => t.seat);
    
    const passengerCount = currentMultiBookingData.passengers.length;
    
    let html = `
        <div class="seat-map-instruction">
            <p>Select ${passengerCount} seat(s) from the <strong>${selectedMultiCabinClass === 'BUSINESS' ? 'Business Class' : 'Economy Class'}</strong> section.</p>
            <p style="color: #dc3545; font-weight: bold;">
                ${selectedMultiCabinClass === 'BUSINESS' 
                    ? 'Note: You can only select Business seats (Rows 1-3). Economy seats are not selectable.' 
                    : 'Note: You can only select Economy seats (Rows 4-29). Business seats are not selectable.'}
            </p>
            <p style="color: #2a5298;"><strong>Additional 100 TL fee applies per seat for manual seat selection.</strong></p>
        </div>
        <div class="cabin-section">
            <div class="section-title">Business Class (Rows 1-3)</div>
            ${generateSeatRowsForMultiManualSelection(flight, bookedSeats, 1, 3)}
        </div>
        <div class="cabin-section" style="margin-top: 20px;">
            <div class="section-title">Economy Class (Rows 4-29)</div>
            ${generateSeatRowsForMultiManualSelection(flight, bookedSeats, 4, 29)}
        </div>
    `;
    
    container.innerHTML = html;
    
    // Add click listeners to all seats
    container.querySelectorAll('.seat').forEach(seat => {
        seat.addEventListener('click', function() {
            const seatNumber = this.getAttribute('data-seat');
            // Only allow clicking on available seats (not disabled ones)
            if (!this.classList.contains('disabled-seat')) {
                handleMultiManualSeatClick(seatNumber, flight);
            }
        });
    });
}

function generateSeatRowsForMultiManualSelection(flight, bookedSeats, startRow, endRow) {
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    let html = '';
    
    for (let row = startRow; row <= endRow; row++) {
        const isExitRow = flight.seats[`${row}A`]?.exitRow;
        const rowClass = isExitRow ? 'seat-row exit-row' : 'seat-row';
        html += `<div class="${rowClass}">`;
        html += `<div class="row-number">${row}</div>`;
        
        seatLetters.forEach((letter, index) => {
            const seatNumber = `${row}${letter}`;
            const seatData = flight.seats[seatNumber];
            const isBooked = bookedSeats.includes(seatNumber) || (seatData && seatData.occupied);
            const isSelected = multiSelectedSeats.includes(seatNumber);
            // Seçilmiş koltuklar dolu gösterilmeli (tekrar seçilemesin)
            const isOccupiedOrSelected = isBooked || isSelected;
            
            // Check if this seat is selectable based on cabin class
            const isSelectable = seatData && (
                (selectedMultiCabinClass === 'BUSINESS' && seatData.class === 'BUSINESS') ||
                (selectedMultiCabinClass === 'ECONOMY' && seatData.class === 'ECONOMY')
            );
            
            let seatClass = 'seat';
            if (seatData && seatData.class === 'BUSINESS') {
                seatClass += ' business';
            } else {
                seatClass += ' economy';
            }
            
            if (isOccupiedOrSelected) {
                seatClass += ' occupied';
            } else if (!isSelectable) {
                // Disable seats that don't match the selected cabin class
                seatClass += ' disabled-seat';
            } else {
                seatClass += ' available';
            }
            
            html += `<div class="${seatClass}" data-seat="${seatNumber}">${letter}</div>`;
            
            if (index === 2) {
                html += '<div class="seat-aisle"></div>';
            }
        });
        
        html += '</div>';
    }
    
    return html;
}

function handleMultiManualSeatClick(seatNumber, flight) {
    const seatData = flight.seats[seatNumber];
    const seatError = document.getElementById('multi-seat-error');
    const passengerCount = currentMultiBookingData.passengers.length;
    
    // Check if seat is already occupied
    const bookedSeats = tickets
        .filter(t => t.flightNumber === flight.number && !t.isCancelled)
        .map(t => t.seat);
    const isBooked = bookedSeats.includes(seatNumber) || (seatData && seatData.occupied);
    
    // Check if seat is already selected by another passenger in this booking
    const isAlreadySelected = multiSelectedSeats.includes(seatNumber);
    
    if (isBooked && !isAlreadySelected) {
        seatError.textContent = 'This seat is already occupied. Please select another seat.';
        seatError.style.display = 'block';
        return;
    }
    
    // Validate cabin class match
    if (selectedMultiCabinClass === 'BUSINESS' && seatData.class !== 'BUSINESS') {
        seatError.textContent = 'ERROR: You selected an Economy seat. Business class passengers must select Business seats only.';
        seatError.style.display = 'block';
        return;
    }
    
    if (selectedMultiCabinClass === 'ECONOMY' && seatData.class === 'BUSINESS') {
        seatError.textContent = 'ERROR: You selected a Business seat. Economy class passengers must select Economy seats only.';
        seatError.style.display = 'block';
        return;
    }
    
    // Toggle seat selection
    const index = multiSelectedSeats.indexOf(seatNumber);
    if (index !== -1) {
        // Deselect seat
        multiSelectedSeats.splice(index, 1);
    } else {
        if (multiSelectedSeats.length < passengerCount) {
            multiSelectedSeats.push(seatNumber);
        } else {
            seatError.textContent = `You can select maximum ${passengerCount} seats.`;
            seatError.style.display = 'block';
            return;
        }
    }
    
    // If validation passes
    seatError.style.display = 'none';
    updateMultiSelectedSeats();
    generateMultiSeatMapForManualSelection();
}

function updateMultiSelectedSeats() {
    const flightNumber = selectedMultiFlight;
    const flight = flights.find(f => f.number === flightNumber);
    
    let displayText = '';
    if (multiSelectedSeats.length > 0) {
        displayText = multiSelectedSeats.map(seatNumber => {
            let seatInfo = seatNumber;
            const seatData = flight?.seats[seatNumber];
            
            if (seatData) {
                if (seatData.class === 'BUSINESS') {
                    seatInfo += ' (Business)';
                }
                if (seatData.exitRow) {
                    seatInfo += ' (Exit)';
                }
            }
            return seatInfo;
        }).join(', ');
        
        if (isMultiManualSeatSelection) {
            displayText += ` (+${seatSelectionFee * multiSelectedSeats.length} TL seat selection fee)`;
        }
    } else {
        if (isMultiManualSeatSelection) {
            displayText = 'Not selected - Please select seats manually';
        } else {
            displayText = 'Not selected - Seats will be randomly assigned';
        }
    }
    
    document.getElementById('multi-selected-seats').textContent = displayText;
}

function updateMultiSeatFeeBadge() {
    const feeBadge = document.getElementById('multi-fee-badge');
    if (!feeBadge) return;
    
    const passengerCountInput = document.getElementById('passenger-count');
    if (!passengerCountInput) return;
    
    let passengerCount = parseInt(passengerCountInput.value || '1', 10);
    if (isNaN(passengerCount) || passengerCount < 1) {
        passengerCount = 1;
    }
    
    const totalFee = seatSelectionFee * passengerCount;
    feeBadge.textContent = `+${totalFee} TL`;
}

function generatePassengerForms() {
    let passengerCount = parseInt(document.getElementById('passenger-count').value, 10);
    passengerCount = isNaN(passengerCount) || passengerCount < 1 ? 1 : passengerCount;
    document.getElementById('passenger-count').value = passengerCount;
    const container = document.getElementById('multi-passengers-container');
    container.innerHTML = '';
    
    // Update fee badge when passenger count changes
    updateMultiSeatFeeBadge();
    
    for (let i = 1; i <= passengerCount; i++) {
        // İlk yolcu için bebek ve çocuk seçeneği yok
        const isFirstPassenger = (i === 1);
        const ticketTypeOptions = isFirstPassenger 
            ? `<option value="FULL">Full Fare</option>
               <option value="DISABLED">Disabled / Companion</option>
               <option value="TEACHER">Teacher</option>
               <option value="STUDENT">Student (12-26)</option>
               <option value="VETERAN">Veteran / Martyr Family</option>
               <option value="SENIOR">Senior 65+</option>`
            : `<option value="FULL">Full Fare</option>
               <option value="BABY">Baby (0-2)</option>
               <option value="CHILD">Child (3-12)</option>
               <option value="DISABLED">Disabled / Companion</option>
               <option value="TEACHER">Teacher</option>
               <option value="STUDENT">Student (12-26)</option>
               <option value="VETERAN">Veteran / Martyr Family</option>
               <option value="SENIOR">Senior 65+</option>`;
        
        const passengerHtml = `
            <div class="passenger-card passenger-form">
                <h4>Passenger ${i}</h4>
                <div class="grid-2">
                    <div class="form-group">
                        <label for="multi-id-${i}">ID Number</label>
                        <input type="text" id="multi-id-${i}" class="id-number" placeholder="ID Number">
                    </div>
                    <div class="form-group">
                        <label for="multi-name-${i}">First Name</label>
                        <input type="text" id="multi-name-${i}" class="passenger-name" placeholder="First Name">
                    </div>
                    <div class="form-group">
                        <label for="multi-surname-${i}">Last Name</label>
                        <input type="text" id="multi-surname-${i}" class="passenger-surname" placeholder="Last Name">
                    </div>
                    <div class="form-group">
                        <label for="multi-email-${i}">Email Address</label>
                        <input type="email" id="multi-email-${i}" class="passenger-email" placeholder="@gmail.com">
                    </div>
                    <div class="form-group">
                        <label for="multi-phone-${i}">Phone</label>
                        <input type="text" id="multi-phone-${i}" class="passenger-phone" placeholder="0(5XX) XXX XX XX">
                    </div>
                    <div class="form-group">
                        <label for="multi-ticket-type-${i}">Ticket Type</label>
                        <select id="multi-ticket-type-${i}" class="ticket-type-select">
                            ${ticketTypeOptions}
                        </select>
                        <small id="discount-info-${i}" style="color: #666; font-size: 0.9rem; margin-top: 5px; display: block;"></small>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += passengerHtml;
    }
    
    // Add validation to form fields
    for (let i = 1; i <= passengerCount; i++) {
        document.getElementById(`multi-name-${i}`)?.addEventListener('input', function() {
            validateNameField(this);
        });
        document.getElementById(`multi-surname-${i}`)?.addEventListener('input', function() {
            validateNameField(this);
        });
        document.getElementById(`multi-id-${i}`)?.addEventListener('input', function() {
            validateIdField(this);
        });
        document.getElementById(`multi-phone-${i}`)?.addEventListener('input', function() {
            validatePhoneField(this);
        });
        document.getElementById(`multi-email-${i}`)?.addEventListener('input', function() {
            autoCompleteGmail(this);
        });
        
        // Ticket type change event
        document.getElementById(`multi-ticket-type-${i}`)?.addEventListener('change', function() {
            updateDiscountInfo(this);
        });
    }
}

function updateDiscountInfo(selectElement) {
    const ticketType = selectElement.value;
    const discountMap = {
        'FULL': 'No Discount',
        'BABY': '90% Discount Applied',
        'CHILD': '25% Discount Applied',
        'DISABLED': '20% Discount Applied',
        'TEACHER': '20% Discount Applied',
        'STUDENT': '20% Discount Applied',
        'VETERAN': '50% Discount Applied',
        'SENIOR': '20% Discount Applied'
    };
    
    const selectId = selectElement.id;
    const passengerId = selectId.replace('multi-ticket-type-', '');
    const discountInfoElement = document.getElementById(`discount-info-${passengerId}`);
    
    if (discountInfoElement) {
        discountInfoElement.textContent = discountMap[ticketType] || '';
    }
}

function updateSingleTicketDiscountInfo(selectElement) {
    const ticketType = selectElement.value;
    const discountMap = {
        'FULL': 'No Discount',
        'DISABLED': '20% Discount Applied',
        'TEACHER': '20% Discount Applied',
        'STUDENT': '20% Discount Applied',
        'VETERAN': '50% Discount Applied',
        'SENIOR': '20% Discount Applied'
    };
    
    let discountInfoElement = document.getElementById('single-ticket-discount-info');
    if (!discountInfoElement) {
        discountInfoElement = document.createElement('small');
        discountInfoElement.id = 'single-ticket-discount-info';
        discountInfoElement.style.cssText = 'color: #666; font-size: 0.9rem; margin-top: 5px; display: block;';
        selectElement.parentElement.appendChild(discountInfoElement);
    }
    
    discountInfoElement.textContent = discountMap[ticketType] || '';
}

function cancelTicket() {
    const ticketNumber = document.getElementById('ticket-number').value.trim();
    const notification = document.getElementById('cancel-notification');
    
    if (!ticketNumber) {
        showNotification(notification, 'Please enter a ticket number.', 'error');
        return;
    }
    
    const btn = document.getElementById('cancel-ticket-btn');
    const btnText = document.getElementById('cancel-ticket-text');
    const btnLoading = document.getElementById('cancel-ticket-loading');
    
    btn.disabled = true;
    btnText.textContent = 'Cancelling...';
    btnLoading.style.display = 'inline-block';
    
    setTimeout(() => {
        const ticketIndex = tickets.findIndex(t => t.ticketNumber === ticketNumber);
        
        if (ticketIndex === -1) {
            showNotification(notification, 'Ticket not found.', 'error');
        } else if (tickets[ticketIndex].isCancelled) {
            showNotification(notification, 'This ticket is already cancelled.', 'error');
        } else {
            tickets[ticketIndex].isCancelled = true;
            const flight = flights.find(f => f.number === tickets[ticketIndex].flight.number);
            if (flight && flight.seats[tickets[ticketIndex].seat]) {
                flight.seats[tickets[ticketIndex].seat].occupied = false;
            }
            localStorage.setItem('tickets', JSON.stringify(tickets));
            persistFlights();
            showNotification(notification, `Ticket ${ticketNumber} cancelled successfully. Cancellation email sent.`, 'success');
            document.getElementById('ticket-number').value = '';
            
            if (document.getElementById('my-tickets').classList.contains('active')) {
                loadTickets();
            }
        }
        
        btn.disabled = false;
        btnText.textContent = 'Cancel Ticket';
        btnLoading.style.display = 'none';
    }, 1000);
}

// Quiz Questions and Answers
const quizQuestions = [
    {
        question: "What is the maximum weight limit for carry-on baggage?",
        options: ["5 kg", "8 kg", "10 kg", "12 kg"],
        correct: 1
    },
    {
        question: "How many hours before the flight does online check-in start?",
        options: ["12 hours", "18 hours", "24 hours", "48 hours"],
        correct: 2
    },
    {
        question: "How many hours in advance must you arrive at the airport?",
        options: ["1 hour", "2 hours", "3 hours", "4 hours"],
        correct: 1
    },
    {
        question: "What is the maximum capacity for liquid substances at security check?",
        options: ["50 ml", "100 ml", "150 ml", "200 ml"],
        correct: 1
    },
    {
        question: "How should mobile phones be during the flight?",
        options: ["Turned off", "Airplane mode", "Normal mode", "Silent mode"],
        correct: 1
    },
    {
        question: "How many hours before the flight should ticket cancellation be done?",
        options: ["12 hours", "18 hours", "24 hours", "48 hours"],
        correct: 2
    },
    {
        question: "After which week should pregnant passengers bring a doctor's report?",
        options: ["24th week", "28th week", "32nd week", "36th week"],
        correct: 1
    },
    {
        question: "What is the maximum weight limit for check-in baggage?",
        options: ["20 kg", "23 kg", "25 kg", "30 kg"],
        correct: 1
    },
    {
        question: "How many hours in advance is it recommended to arrive at the airport for international flights?",
        options: ["2 hours", "3 hours", "4 hours", "5 hours"],
        correct: 1
    },
    {
        question: "Is the ticket fee refunded in case of no-show?",
        options: ["Yes, full refund", "Yes, partial refund", "No, not refunded", "Depends on the situation"],
        correct: 2
    }
];

let quizAnswers = [];
let quizSubmitted = false;

// Initialize quiz when rules are accepted
function initializeQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;
    
    // Hide flight rules section when quiz starts
    const flightRulesSection = document.getElementById('flight-rules-section');
    if (flightRulesSection) {
        flightRulesSection.style.display = 'none';
    }
    
    quizContainer.innerHTML = '';
    quizAnswers = [];
    quizSubmitted = false;
    
    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.style.marginBottom = '25px';
        questionDiv.style.padding = '15px';
        questionDiv.style.backgroundColor = '#f8f9fa';
        questionDiv.style.borderRadius = '8px';
        questionDiv.style.border = '1px solid #dee2e6';
        
        questionDiv.innerHTML = `
            <h4 style="color: #1e3c72; margin-bottom: 15px;">Question ${index + 1}: ${q.question}</h4>
            <div class="quiz-options" data-question="${index}" style="border: none !important;">
                ${q.options.map((option, optIndex) => `
                    <label style="display: flex; align-items: center; padding: 6px 0; margin-bottom: 6px; cursor: pointer; transition: background-color 0.2s; border: none !important; outline: none !important; box-shadow: none !important;" 
                           onmouseover="this.style.backgroundColor='#f0f5ff';" 
                           onmouseout="this.style.backgroundColor='transparent';">
                        <input type="radio" name="question-${index}" value="${optIndex}" style="margin-right: 10px; cursor: pointer; flex-shrink: 0; width: auto !important; border: none !important; padding: 0 !important;">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        `;
        
        quizContainer.appendChild(questionDiv);
    });
    
    document.getElementById('submit-quiz-btn').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
}

// Submit quiz
function submitQuiz() {
    quizAnswers = [];
    let allAnswered = true;
    
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (!selectedOption) {
            allAnswered = false;
            quizAnswers.push(null);
        } else {
            quizAnswers.push(parseInt(selectedOption.value));
        }
    });
    
    if (!allAnswered) {
        showNotification('checkin-notification', 'Please answer all questions.', 'error');
        return;
    }
    
    quizSubmitted = true;
    let correctCount = 0;
    
    quizQuestions.forEach((q, index) => {
        if (quizAnswers[index] === q.correct) {
            correctCount++;
        }
    });
    
    const quizResult = document.getElementById('quiz-result');
    const quizContainer = document.getElementById('quiz-container');
    
    if (correctCount < 5) {
        quizResult.innerHTML = `
            <div style="background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; border: 1px solid #f5c6cb;">
                <h4 style="margin-bottom: 10px;">❌ Test Result: ${correctCount}/10</h4>
                <p style="margin-bottom: 0;">Unfortunately, you answered ${correctCount} questions correctly. You need to answer at least 5 questions correctly.</p>
                <p style="margin-top: 10px; font-weight: 600;">Please read the rules again and retake the test.</p>
            </div>
        `;
        quizResult.style.display = 'block';
        quizSubmitted = false;
        
        // Show flight rules section again for retake
        const flightRulesSection = document.getElementById('flight-rules-section');
        if (flightRulesSection) {
            flightRulesSection.style.display = 'block';
        }
        
        // Reset quiz
        setTimeout(() => {
            initializeQuiz();
        }, 2000);
    } else {
        // Show correct answers
        let resultHTML = `
            <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px; border: 1px solid #c3e6cb; margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px;">✅ Test Result: ${correctCount}/10</h4>
                <p style="margin-bottom: 0;">Congratulations! You have successfully completed the test. You can now proceed with the check-in process.</p>
            </div>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;">
                <h4 style="color: #1e3c72; margin-bottom: 15px;">Correct Answers:</h4>
        `;
        
        quizQuestions.forEach((q, index) => {
            const isCorrect = quizAnswers[index] === q.correct;
            const answerText = q.options[q.correct];
            resultHTML += `
                <div style="margin-bottom: 15px; padding: 10px; background-color: ${isCorrect ? '#d4edda' : '#f8d7da'}; border-radius: 6px;">
                    <strong>Question ${index + 1}:</strong> ${q.question}<br>
                    <strong>Correct Answer:</strong> ${answerText} ${isCorrect ? '✅' : ''}
                </div>
            `;
        });
        
        resultHTML += '</div>';
        quizResult.innerHTML = resultHTML;
        quizResult.style.display = 'block';
        
        // Show check-in form
        document.getElementById('checkin-form').style.display = 'grid';
        document.getElementById('checkin-btn').style.display = 'block';
    }
}

// Handle rules acceptance
function handleRulesAcceptance() {
    const rulesAccepted = document.getElementById('rules-accepted');
    const quizSection = document.getElementById('quiz-section');
    const flightRulesSection = document.getElementById('flight-rules-section');
    
    if (rulesAccepted && rulesAccepted.checked) {
        quizSection.style.display = 'block';
        initializeQuiz();
    } else {
        quizSection.style.display = 'none';
        document.getElementById('checkin-form').style.display = 'none';
        document.getElementById('checkin-btn').style.display = 'none';
        // Show flight rules section again if checkbox is unchecked
        if (flightRulesSection) {
            flightRulesSection.style.display = 'block';
        }
    }
}

function handleCheckIn() {
    // Check if quiz is completed
    if (!quizSubmitted) {
        showNotification('checkin-notification', 'Please complete the flight rules test first.', 'error');
        return;
    }
    
    const ticketNumberInput = document.getElementById('checkin-ticket-number');
    const surnameInput = document.getElementById('checkin-surname');
    const ticketNumber = ticketNumberInput?.value.trim();
    const surname = surnameInput?.value.trim().toLowerCase();
    const statusBox = document.getElementById('checkin-status');

    // Validate ticket number
    if (!ticketNumber) {
        showNotification('checkin-notification', 'invalid ticket number', 'error');
        if (ticketNumberInput) {
            ticketNumberInput.classList.add('invalid');
        }
        return;
    }

    // Validate surname
    if (!surname) {
        showNotification('checkin-notification', 'registered passenger could not be found', 'error');
        if (surnameInput) {
            surnameInput.classList.add('invalid');
        }
        return;
    }

    // Remove invalid class if inputs are filled
    if (ticketNumberInput) {
        ticketNumberInput.classList.remove('invalid');
    }
    if (surnameInput) {
        surnameInput.classList.remove('invalid');
    }

    tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets = tickets.map(t => ({
        ...t,
        checkedIn: !!t.checkedIn,
        checkedInAt: t.checkedInAt || null
    }));

    const ticketIdx = tickets.findIndex(t => t.ticketNumber === ticketNumber);
    if (ticketIdx === -1) {
        // Wrong or unknown ticket number
        showNotification('checkin-notification', 'invalid ticket number', 'error');
        if (ticketNumberInput) {
            ticketNumberInput.classList.add('invalid');
        }
        return;
    }
    const ticket = tickets[ticketIdx];
    if (ticket.isCancelled) {
        showNotification('checkin-notification', 'This ticket is cancelled.', 'error');
        return;
    }
    if ((ticket.passenger.lastName || '').toLowerCase() !== surname) {
        // Wrong surname for given ticket number
        showNotification('checkin-notification', 'registered passenger could not be found', 'error');
        if (surnameInput) {
            surnameInput.classList.add('invalid');
        }
        return;
    }
    if (ticket.checkedIn) {
        showNotification('checkin-notification', 'Already checked-in.', 'info');
        showEmailStatus(statusBox, `Checked-in at ${ticket.checkedInAt}`, 'email-sent');
        return;
    }

    const now = new Date().toLocaleString('en-US');
    tickets[ticketIdx].checkedIn = true;
    tickets[ticketIdx].checkedInAt = now;
    localStorage.setItem('tickets', JSON.stringify(tickets));
    showNotification('checkin-notification', 'Check-in successful! Boarding pass ready.', 'success');
    showEmailStatus(statusBox, `Checked-in at ${now}`, 'email-sent');

    if (document.getElementById('my-tickets').classList.contains('active')) {
        loadTickets();
    }
}

function loadTickets() {
    tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets = tickets.map(t => ({
        ...t,
        checkedIn: !!t.checkedIn,
        checkedInAt: t.checkedInAt || null
    }));
    const activeTicketsList = document.getElementById('active-tickets-list');
    const cancelledTicketsList = document.getElementById('cancelled-tickets-list');
    const notification = document.getElementById('tickets-notification');
    
    if (tickets.length === 0) {
        activeTicketsList.innerHTML = '<p>No tickets found.</p>';
        cancelledTicketsList.innerHTML = '<p>No cancelled tickets.</p>';
        showNotification(notification, 'No tickets found.', 'info');
        return;
    }
    
    const activeTickets = tickets.filter(t => !t.isCancelled);
    const cancelledTickets = tickets.filter(t => t.isCancelled);
    
    if (activeTickets.length === 0) {
        activeTicketsList.innerHTML = '<p>No active tickets.</p>';
    } else {
        let activeHtml = '';
        activeTickets.forEach(ticket => {
            activeHtml += `
                <div class="ticket-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <div style="font-weight: bold; color: #1e3c72; font-size: 1.2rem;">${ticket.ticketNumber}</div>
                        <div style="display:flex; gap:8px; align-items:center;">
                            <div style="padding: 5px 10px; background-color: #d4edda; color: #155724; border-radius: 20px; font-size: 0.9rem; font-weight: bold;">Active</div>
                            ${ticket.checkedIn ? '<div style="padding: 5px 10px; background-color: #cce5ff; color: #084298; border-radius: 20px; font-size: 0.9rem; font-weight: bold;">Checked-in</div>' : ''}
                        </div>
                    </div>
                    <p><strong>Passenger:</strong> ${ticket.passenger.firstName} ${ticket.passenger.lastName}</p>
                    <p><strong>Email:</strong> ${ticket.passenger.email}</p>
                    <p><strong>Flight:</strong> ${ticket.flight.departure} → ${ticket.flight.destination} (${ticket.flight.number})</p>
                    <p><strong>Cabin Class:</strong> ${ticket.cabinClass || 'Not specified'}</p>
                    <p><strong>Seat Selection:</strong> ${ticket.seatSelectionType === 'manual' ? 'Manual (+100 TL)' : 'Random'}</p>
                    <p><strong>Date:</strong> ${ticket.flight.date} ${ticket.flight.time}</p>
                    <p><strong>Seat:</strong> ${ticket.seat}</p>
                    <p><strong>Ticket Type:</strong> ${ticket.ticketType}</p>
                    <p><strong>Price:</strong> ${ticket.finalPrice.toFixed(2)} TL</p>
                    ${ticket.checkedIn ? `<p><strong>Checked-in at:</strong> ${ticket.checkedInAt}</p>` : ''}
                    <p><strong>Booking Date:</strong> ${ticket.bookingDate}</p>
                </div>
            `;
        });
        activeTicketsList.innerHTML = activeHtml;
    }
    
    if (cancelledTickets.length === 0) {
        cancelledTicketsList.innerHTML = '<p>No cancelled tickets.</p>';
    } else {
        let cancelledHtml = '';
        cancelledTickets.forEach(ticket => {
            cancelledHtml += `
                <div class="ticket-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <div style="font-weight: bold; color: #1e3c72; font-size: 1.2rem;">${ticket.ticketNumber}</div>
                        <div style="padding: 5px 10px; background-color: #f8d7da; color: #721c24; border-radius: 20px; font-size: 0.9rem; font-weight: bold;">Cancelled</div>
                    </div>
                    <p><strong>Passenger:</strong> ${ticket.passenger.firstName} ${ticket.passenger.lastName}</p>
                    <p><strong>Flight:</strong> ${ticket.flight.departure} → ${ticket.flight.destination}</p>
                    <p><strong>Seat:</strong> ${ticket.seat}</p>
                    <p><strong>Booking Date:</strong> ${ticket.bookingDate}</p>
                </div>
            `;
        });
        cancelledTicketsList.innerHTML = cancelledHtml;
    }
    
    showNotification(notification, `${activeTickets.length} active, ${cancelledTickets.length} cancelled tickets.`, 'info');
}

function showTicketPreview(ticket, prefix = 'ticket') {
    lastGeneratedTicket = ticket;
    const wrapper = document.getElementById(`${prefix}-preview-wrapper`);
    if (!wrapper) return;
    wrapper.style.display = 'block';
    renderTicketImage(ticket, `${prefix}-canvas`);
}

function showMultipleTicketPreviews(ticketList) {
    const wrapper = document.getElementById('multi-ticket-preview-wrapper');
    const list = document.getElementById('multi-ticket-preview-list');
    if (!wrapper || !list) return;
    list.innerHTML = '';
    if (!ticketList || ticketList.length === 0) {
        wrapper.style.display = 'none';
        return;
    }
    wrapper.style.display = 'block';
    ticketList.forEach((ticket, idx) => {
        const card = document.createElement('div');
        card.className = 'ticket-card';
        const canvasId = `multi-ticket-canvas-${idx}`;
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div style="font-weight: bold; color: #1e3c72;">${ticket.ticketNumber}</div>
                <div style="font-size: 0.9rem; color: #555;">${ticket.passenger.firstName} ${ticket.passenger.lastName}</div>
            </div>
            <canvas id="${canvasId}" width="760" height="260"></canvas>
        `;
        list.appendChild(card);
        renderTicketImage(ticket, canvasId);
        if (idx === 0) {
            lastGeneratedTicket = ticket;
            lastGeneratedMultiCanvasId = canvasId;
        }
    });
}

function renderTicketImage(ticket, canvasId = 'ticket-canvas') {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, w, 0);
    bg.addColorStop(0, '#1e3c72');
    bg.addColorStop(1, '#2a5298');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Inner panel
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(16, 16, w - 32, h - 32);

    // Header strip
    ctx.fillStyle = '#2a5298';
    ctx.fillRect(16, 16, w - 32, 48);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif';
    ctx.fillText('ONLINE BOARDING PASS', 28, 46);
    ctx.font = '14px "Segoe UI", Arial, sans-serif';
    ctx.fillText(ticket.ticketNumber || 'Ticket', w - 180, 46);

    // Calculate vertical positions with equal spacing
    const startY = 90;
    const lineHeight = 36;
    const labelX = 36;
    const valueX = 140;
    
    // Passenger info
    ctx.fillStyle = '#1f2937';
    ctx.font = '16px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Passenger', labelX, startY);
    ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif';
    ctx.fillText(`${ticket.passenger.firstName} ${ticket.passenger.lastName}`, valueX, startY);

    // Flight route
    ctx.font = '16px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Flight', labelX, startY + lineHeight);
    ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif';
    ctx.fillText(`${ticket.flight.departure} → ${ticket.flight.destination}`, valueX, startY + lineHeight);

    // Cabin Class and Seat
    ctx.font = '16px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Cabin/Seat', labelX, startY + (lineHeight * 2));
    ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif';
    ctx.fillText(`${ticket.cabinClass || 'ECONOMY'} - ${ticket.seat}`, valueX, startY + (lineHeight * 2));
    
    // Date
    ctx.font = '16px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Date', labelX, startY + (lineHeight * 3));
    ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif';
    ctx.fillText(ticket.flight.date, valueX, startY + (lineHeight * 3));
    
    // Time
    ctx.font = '16px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Time', labelX, startY + (lineHeight * 4));
    ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif';
    ctx.fillText(ticket.flight.time, valueX, startY + (lineHeight * 4));

    // Booking date - positioned at bottom with smaller font
    const bookingY = h - 40; // Position from bottom
    ctx.font = '14px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#374151';
    ctx.fillText('Booking:', labelX, bookingY);
    ctx.fillText(ticket.bookingDate ? new Date(ticket.bookingDate).toLocaleString('en-US') : new Date().toLocaleString('en-US'), valueX, bookingY);

    // Seat info (highlighted)
    // Right stub area for seat/price/barcode
    const stubWidth = Math.floor(w * 0.3);
    const stubX = w - stubWidth - 24;
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(stubX, 24, stubWidth, h - 48);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.strokeRect(stubX, 24, stubWidth, h - 48);

    // Perforation line
    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = '#d1d5db';
    ctx.beginPath();
    ctx.moveTo(stubX - 6, 24);
    ctx.lineTo(stubX - 6, h - 24);
    ctx.stroke();
    ctx.restore();

    // Seat info
    ctx.fillStyle = '#0f172a';
    ctx.font = '14px "Segoe UI", Arial, sans-serif';
    ctx.fillText('SEAT', stubX + 18, 82);
    ctx.fillStyle = '#1e3c72';
    ctx.font = 'bold 46px "Segoe UI", Arial, sans-serif';
    ctx.fillText(ticket.seat || '-', stubX + 12, 130);

    // Flight number and price on stub
    ctx.fillStyle = '#1f2937';
    ctx.font = '13px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Flight', stubX + 18, 160);
    ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
    ctx.fillText(ticket.flight.number || '-', stubX + 18, 186);
    ctx.font = '13px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Price', stubX + 18, 214);
    ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif';
    ctx.fillText(`${ticket.finalPrice.toFixed(2)} TL`, stubX + 18, 238);

    // Barcode block
    const barcodeBlock = {
        x: stubX + 18,
        y: h - 120,
        width: stubWidth - 36,
        height: 80
    };
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(barcodeBlock.x, barcodeBlock.y, barcodeBlock.width, barcodeBlock.height);
    ctx.strokeStyle = '#cbd5e1';
    ctx.strokeRect(barcodeBlock.x, barcodeBlock.y, barcodeBlock.width, barcodeBlock.height);

    ctx.fillStyle = '#111827';
    const seedSource = `${ticket.ticketNumber || 'TICKET'}-${ticket.passenger.idNumber || ''}`;
    let seed = 0;
    for (let i = 0; i < seedSource.length; i++) {
        seed = (seed * 31 + seedSource.charCodeAt(i)) & 0xffffffff;
    }
    const rand = () => {
        seed ^= seed << 13;
        seed ^= seed >>> 17;
        seed ^= seed << 5;
        seed = seed >>> 0;
        return (seed % 1000) / 1000;
    };

    const barCount = 60;
    const barWidth = barcodeBlock.width / (barCount * 1.2);
    for (let i = 0; i < barCount; i++) {
        const x = barcodeBlock.x + 8 + i * barWidth * 1.2;
        const hBar = 30 + rand() * 28;
        const y = barcodeBlock.y + (barcodeBlock.height - hBar) / 2;
        ctx.fillRect(x, y, barWidth, hBar);
    }

    // Mini QR
    const qrSize = 36;
    const qrX = barcodeBlock.x + barcodeBlock.width - qrSize - 10;
    const qrY = barcodeBlock.y + 10;
    ctx.strokeStyle = '#1e3c72';
    ctx.lineWidth = 2;
    ctx.strokeRect(qrX, qrY, qrSize, qrSize);
    ctx.fillStyle = '#1e3c72';
    ctx.fillRect(qrX + 7, qrY + 7, 10, 10);
    ctx.fillRect(qrX + 18, qrY + 20, 10, 10);
}

function downloadTicket(prefix = 'ticket') {
    if (prefix === 'multi-ticket') {
        downloadAllMultiTickets();
    } else {
        if (!lastGeneratedTicket) return;
        const canvasId = `${prefix}-canvas`;
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${lastGeneratedTicket.ticketNumber || 'ticket'}.png`;
        link.click();
    }
}

function downloadAllMultiTickets() {
    if (!lastBookingTickets || lastBookingTickets.length === 0) return;
    
    const downloadNextTicket = (index) => {
        if (index >= lastBookingTickets.length) return;
        
        const ticket = lastBookingTickets[index];
        const canvasId = `multi-ticket-canvas-${index}`;
        
        setTimeout(() => {
            const canvas = document.getElementById(canvasId);
            if (canvas && canvas.getContext) {
                try {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = `${ticket.ticketNumber || 'ticket'}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } catch (e) {
                    console.error('Error downloading ticket:', e);
                }
            }
            downloadNextTicket(index + 1);
        }, 300);
    };
    
    downloadNextTicket(0);
}

async function sendTicketEmail(ticket) {
    try {
        const resp = await fetch('http://localhost:3000/api/send-ticket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticket })
        });
        return resp.ok;
    } catch (e) {
        console.error('Email send failed', e);
        return false;
    }
}

// Announcements pulled from admin dashboard
function loadAnnouncements() {
    const list = JSON.parse(localStorage.getItem('announcements')) || [];
    renderAnnouncements(list);
}

function renderAnnouncements(list) {
    const board = document.getElementById('announcement-board');
    const listEl = document.getElementById('announcement-list');
    if (!board || !listEl) return;
    
    if (!list.length) {
        board.style.display = 'none';
        return;
    }
    
    // Kullanıcının sahip olduğu bilet sınıflarını (cabinClass) bul
    const activeTickets = (tickets || []).filter(t => !t.isCancelled);
    const userCabinClasses = new Set(activeTickets.map(t => t.cabinClass || t.seatClass));

    // Duyurunun bu kullanıcıya gösterilip gösterilmeyeceğini belirle
    function isVisibleForUser(item) {
        const type = item.recipientType || 'all';
        if (type === 'all') return true;
        if (type === 'specific') {
            // Business passengers
            return userCabinClasses.has('BUSINESS');
        }
        if (type === 'flight') {
            // Economy passengers
            return userCabinClasses.has('ECONOMY');
        }
        return true;
    }

    const latest = list.slice(-5).reverse().filter(isVisibleForUser);

    if (!latest.length) {
        board.style.display = 'none';
        return;
    }

    board.style.display = 'block';
    listEl.innerHTML = latest.map(item => `
        <div class="announcement-item">
            <div class="announcement-title">${item.subject || 'Announcement'}</div>
            <div class="announcement-message">${item.message || ''}</div>
            <div class="announcement-meta">${item.date || ''}</div>
        </div>
    `).join('');
}

// Campaigns pulled from admin dashboard
function loadCampaigns() {
    try {
        const stored = localStorage.getItem('campaigns');
        const campaigns = stored ? JSON.parse(stored) : [];
        renderCampaigns(campaigns);
    } catch (e) {
        console.error('Error loading campaigns:', e);
        renderCampaigns([]);
    }
}

function renderCampaigns(campaigns) {
    const board = document.getElementById('campaigns-board');
    const listEl = document.getElementById('campaigns-list');
    if (!board || !listEl) return;
    
    // Only show active campaigns that are currently valid
    const now = new Date();
    const activeCampaigns = campaigns.filter(c => {
        if (!c.active) return false;
        
        // Check if campaign is within date range
        if (c.startDate) {
            const startDate = new Date(c.startDate);
            if (now < startDate) return false;
        }
        
        if (c.endDate) {
            const endDate = new Date(c.endDate);
            endDate.setHours(23, 59, 59, 999); // End of day
            if (now > endDate) return false;
        }
        
        return true;
    });

    if (!activeCampaigns.length) {
        board.style.display = 'none';
        return;
    }

    board.style.display = 'block';
    listEl.innerHTML = activeCampaigns.map(c => {
        const startDate = c.startDate ? new Date(c.startDate).toLocaleDateString('tr-TR') : 'N/A';
        const endDate = c.endDate ? new Date(c.endDate).toLocaleDateString('tr-TR') : 'N/A';
        
        return `
            <div class="campaign-item">
                <div class="campaign-title">
                    <span>${c.name || 'Campaign'}</span>
                    <span class="campaign-code">${c.discountCode || ''}</span>
                </div>
                <div class="campaign-discount">%${c.discountPercentage || 0} Discount</div>
                <div class="campaign-dates">
                    ${startDate !== 'N/A' && endDate !== 'N/A' ? `${startDate} - ${endDate}` : 'No expiry'}
                </div>
                <div class="campaign-status ${c.active ? 'active' : 'inactive'}">
                    ${c.active ? 'ACTIVE' : 'INACTIVE'}
                </div>
            </div>
        `;
    }).join('');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.textContent = message;
    element.className = `notification ${type}`;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

function showEmailStatus(element, message, className) {
    element.textContent = message;
    element.className = `email-status ${className}`;
    element.style.display = 'block';
}

// Weather functionality
function initializeWeather() {
    const weatherWidget = document.getElementById('weather-widget');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherLocation = document.getElementById('weather-location');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherCondition = document.getElementById('weather-condition');
    const weatherWarning = document.getElementById('weather-warning');
    const warningText = document.getElementById('warning-text');
    
    if (!weatherWidget || !weatherIcon || !weatherLocation || !weatherTemp || !weatherCondition || !weatherWarning || !warningText) {
        return;
    }
    
    // Turkish cities for weather - gerçekçi hava durumu eşleşmeleri
    const weatherCityMap = {
        'Sunny': ['Antalya', 'Bodrum', 'Dalaman'], // Sıcak sahil şehirleri
        'Partly Cloudy': ['Izmir', 'Adana', 'Gaziantep'], // Ilıman şehirler
        'Cloudy': ['Istanbul', 'Ankara', 'Adana'], // İç ve kıyı şehirleri
        'Rainy': ['Istanbul', 'Izmir', 'Trabzon'], // Yağışlı iklim
        'Stormy': ['Istanbul', 'Izmir', 'Antalya'], // Fırtınalı sahil şehirleri
        'Foggy': ['Istanbul', 'Trabzon', 'Ankara'], // Sisli şehirler
        'Snowy': ['Ankara', 'Kayseri', 'Trabzon'], // Kar yağışlı soğuk şehirler
        'Heavy Snow': ['Ankara', 'Kayseri'] // Yoğun kar yağışlı şehirler
    };
    
    // Weather conditions (simulated - in real app, this would come from an API)
    const weatherConditions = [
        { icon: '☀️', condition: 'Sunny', temp: 22, warning: false },
        { icon: '🌤️', condition: 'Partly Cloudy', temp: 18, warning: false },
        { icon: '⛅', condition: 'Cloudy', temp: 15, warning: false },
        { icon: '🌧️', condition: 'Rainy', temp: 12, warning: false },
        { icon: '⛈️', condition: 'Stormy', temp: 10, warning: true },
        { icon: '🌫️', condition: 'Foggy', temp: 8, warning: true },
        { icon: '❄️', condition: 'Snowy', temp: -2, warning: true },
        { icon: '🌨️', condition: 'Heavy Snow', temp: -5, warning: true }
    ];
    
    // Şehir-hava durumu eşleşmesi takip edilir (bir şehirde iki hava durumu olmasın)
    const cityWeatherMap = new Map(); // Şehir -> Hava durumu eşleşmesi
    
    function updateWeather() {
        // Rastgele bir hava durumu seç
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        
        // Bu hava durumuna uygun şehirler
        const suitableCities = weatherCityMap[randomWeather.condition] || ['Istanbul'];
        
        // Bu hava durumuna uygun ve şu anda başka bir hava durumuna atanmamış şehirleri bul
        const availableCities = suitableCities.filter(city => {
            const currentCondition = cityWeatherMap.get(city);
            return !currentCondition || currentCondition === randomWeather.condition;
        });
        
        // Uygun şehir bulunamazsa, tüm uygun şehirlerden birini seç
        let assignedCity;
        if (availableCities.length > 0) {
            assignedCity = availableCities[Math.floor(Math.random() * availableCities.length)];
        } else {
            // Tüm uygun şehirler doluysa, rastgele bir uygun şehir seç
            assignedCity = suitableCities[Math.floor(Math.random() * suitableCities.length)];
            // Eski eşleşmeyi kaldır
            cityWeatherMap.delete(assignedCity);
        }
        
        // Eşleşmeyi güncelle
        cityWeatherMap.set(assignedCity, randomWeather.condition);
        
        // Remove previous weather classes
        weatherWidget.classList.remove('snowing', 'raining');
        
        // Update weather display
        weatherIcon.textContent = randomWeather.icon;
        weatherLocation.textContent = assignedCity;
        weatherTemp.textContent = `${randomWeather.temp}°C`;
        weatherCondition.textContent = randomWeather.condition;
        
        // Kar tanesi için daha belirgin görünüm ve animasyonlar
        // Önceki kar/yağmur elementlerini temizle
        const existingSnow = weatherWidget.querySelectorAll('.snow-flake');
        const existingRain = weatherWidget.querySelectorAll('.rain-drop');
        existingSnow.forEach(el => el.remove());
        existingRain.forEach(el => el.remove());
        
        if (randomWeather.condition === 'Snowy' || randomWeather.condition === 'Heavy Snow') {
            weatherIcon.setAttribute('data-weather', randomWeather.condition === 'Snowy' ? 'snow' : 'heavy-snow');
            weatherIcon.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6))';
            weatherIcon.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 0.5)';
            weatherWidget.classList.add('snowing');
            
            // Kar taneleri oluştur
            const snowCount = randomWeather.condition === 'Heavy Snow' ? 8 : 5;
            for (let i = 0; i < snowCount; i++) {
                const snowFlake = document.createElement('div');
                snowFlake.className = 'snow-flake';
                snowFlake.textContent = '❄';
                snowFlake.style.left = Math.random() * 100 + '%';
                snowFlake.style.animationDelay = Math.random() * 2 + 's';
                snowFlake.style.animationDuration = (3 + Math.random() * 2) + 's';
                snowFlake.style.setProperty('--snow-x', (Math.random() * 60 - 30) + 'px');
                snowFlake.style.setProperty('--snow-rotate', (Math.random() * 720 - 360) + 'deg');
                snowFlake.style.fontSize = (10 + Math.random() * 6) + 'px';
                weatherWidget.appendChild(snowFlake);
            }
        } else if (randomWeather.condition === 'Rainy' || randomWeather.condition === 'Stormy') {
            weatherIcon.removeAttribute('data-weather');
            weatherIcon.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))';
            weatherIcon.style.textShadow = 'none';
            weatherWidget.classList.add('raining');
            
            // Yağmur damlaları oluştur
            const rainCount = randomWeather.condition === 'Stormy' ? 15 : 10;
            for (let i = 0; i < rainCount; i++) {
                const rainDrop = document.createElement('div');
                rainDrop.className = 'rain-drop';
                rainDrop.style.left = Math.random() * 100 + '%';
                rainDrop.style.animationDelay = Math.random() * 0.8 + 's';
                rainDrop.style.animationDuration = (0.6 + Math.random() * 0.4) + 's';
                weatherWidget.appendChild(rainDrop);
            }
        } else {
            weatherIcon.removeAttribute('data-weather');
            weatherIcon.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))';
            weatherIcon.style.textShadow = 'none';
        }
        
        // Show warning if needed
        if (randomWeather.warning) {
            let warningMsg = '';
            if (randomWeather.condition === 'Stormy') {
                warningMsg = `Stormy weather detected in ${assignedCity}. Please be cautious and check flight status.`;
            } else if (randomWeather.condition === 'Foggy') {
                warningMsg = `Foggy conditions detected in ${assignedCity}. Please be extra careful and allow extra time for travel.`;
            } else if (randomWeather.condition === 'Snowy') {
                warningMsg = `Snowy weather detected in ${assignedCity}. Please be cautious and check flight status before traveling.`;
            } else if (randomWeather.condition === 'Heavy Snow') {
                warningMsg = `Heavy snow detected in ${assignedCity}. Please be very careful and check flight status. Delays may occur.`;
            }
            warningText.textContent = warningMsg;
            weatherWarning.style.display = 'flex';
            weatherWidget.style.background = 'linear-gradient(135deg, #4A90E2 0%, #4A90E2 100%)';
        } else {
            weatherWarning.style.display = 'none';
            weatherWidget.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
        }
    }
    
    // Initial weather update
    updateWeather();
    
    // Update weather every 7 seconds
    setInterval(updateWeather, 7000); // 7 seconds
}

// Chatbot functionality
function initializeChatbot() {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (!chatbotButton || !chatbotContainer || !chatbotToggle || !chatbotInput || !chatbotSend || !chatbotMessages) {
        return;
    }

    // Toggle chatbot
    chatbotButton.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            chatbotToggle.textContent = '−';
        }
    });

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Send message on button click
    chatbotSend.addEventListener('click', () => {
        sendChatbotMessage();
    });

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatbotMessage();
        }
    });

    // Quick question buttons
    const quickQuestionButtons = document.querySelectorAll('.quick-question-btn');
    quickQuestionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            if (question) {
                addUserMessage(question);
                setTimeout(() => {
                    const response = getChatbotResponse(question);
                    addBotMessage(response);
                }, 500);
            }
        });
    });

    function sendChatbotMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatbotInput.value = '';
            setTimeout(() => {
                const response = getChatbotResponse(message);
                addBotMessage(response);
            }, 500);
        }
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message user';
        messageDiv.innerHTML = `<div class="chatbot-message-content">${text}</div>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message bot';
        messageDiv.innerHTML = `<div class="chatbot-message-content">${text}</div>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getChatbotResponse(userMessage) {
        const message = userMessage.toLowerCase().trim();
        
        // Exact matches for quick questions (most specific first)
        if (message === "how do i search for flights?" || message === "how do i search for flights") {
            return "To search for flights, use the search form above. Select your departure and destination cities, then click 'Search Flights'.";
        }
        
        if (message === "how do i book a ticket?" || message === "how do i book a ticket") {
            return "To book a flight, first search for flights using the search form. Then select a flight and follow the booking steps. You'll need to provide passenger information, select a seat, and complete payment.";
        }
        
        if (message === "what is the baggage allowance?" || message === "what is the baggage allowance" || message.includes("baggage allowance") || message === "baggage info" || message.includes("baggage info")) {
            return "🧳 BAGGAGE ALLOWANCE INFORMATION:\n\n" +
                   "📦 HAND BAGGAGE (Cabin):\n" +
                   "• Maximum dimensions: 55cm x 40cm x 23cm\n" +
                   "• Maximum weight: 8 kg (17.6 lbs)\n" +
                   "• 1 piece allowed per passenger\n" +
                   "• Must fit under the seat or in overhead compartment\n\n" +
                   "🧳 CHECKED BAGGAGE:\n" +
                   "• Economy Class: 20 kg (44 lbs) included\n" +
                   "• Business Class: 30 kg (66 lbs) included\n" +
                   "• Maximum dimensions: 158 cm (length + width + height)\n" +
                   "• Additional baggage: 15 TL per kg (subject to availability)\n\n" +
                   "⚠️ RESTRICTED ITEMS:\n" +
                   "• Liquids over 100ml must be in checked baggage\n" +
                   "• Sharp objects, weapons, and flammable items are prohibited\n" +
                   "• Batteries and electronic devices must be in carry-on\n\n" +
                   "💡 TIP: Pack essential items in your hand baggage. For detailed information, check your booking confirmation or contact our support team.";
        }
        
        if (message === "how do i cancel my booking?" || message === "how do i cancel my booking") {
            return "To cancel a booking, please contact our support team using the contact information provided on the website. Cancellation policies may vary depending on your ticket type.";
        }
        
        if (message === "what payment methods do you accept?" || message === "what payment methods do you accept" || message.includes("payment methods")) {
            return "We accept credit and debit cards. Payment is processed securely during the booking process. You'll need to provide your card details on the payment page.";
        }
        
        if (message === "what cities do you fly to?" || message === "what cities do you fly to" || message.includes("cities do you fly")) {
            return "We fly to many cities across Turkey including Istanbul, Ankara, Izmir, Antalya, Bodrum, Dalaman, Trabzon, and many more. Use the search form to see all available routes.";
        }
        
        // Flight search (more specific patterns)
        if ((message.includes('search') && (message.includes('flight') || message.includes('for'))) || message.includes('find flight') || message.includes('available flight')) {
            return "To search for flights, use the search form above. Select your departure and destination cities, then click 'Search Flights'.";
        }
        
        // Booking (more specific patterns)
        if ((message.includes('book') && (message.includes('ticket') || message.includes('flight'))) || message.includes('reserve') || message.includes('buy ticket')) {
            return "To book a flight, first search for flights using the search form. Then select a flight and follow the booking steps. You'll need to provide passenger information, select a seat, and complete payment.";
        }
        
        // Cancellation (more specific patterns)
        if ((message.includes('cancel') && (message.includes('booking') || message.includes('ticket') || message.includes('flight'))) || message.includes('refund')) {
            return "To cancel a booking, please contact our support team using the contact information provided on the website. Cancellation policies may vary depending on your ticket type.";
        }
        
        // Baggage (more specific patterns)
        if (message.includes('baggage') || message.includes('luggage') || (message.includes('bag') && message.includes('allowance')) || message.includes('baggage info')) {
            return "🧳 BAGGAGE ALLOWANCE INFORMATION:\n\n" +
                   "📦 HAND BAGGAGE (Cabin):\n" +
                   "• Maximum dimensions: 55cm x 40cm x 23cm\n" +
                   "• Maximum weight: 8 kg (17.6 lbs)\n" +
                   "• 1 piece allowed per passenger\n" +
                   "• Must fit under the seat or in overhead compartment\n\n" +
                   "🧳 CHECKED BAGGAGE:\n" +
                   "• Economy Class: 20 kg (44 lbs) included\n" +
                   "• Business Class: 30 kg (66 lbs) included\n" +
                   "• Maximum dimensions: 158 cm (length + width + height)\n" +
                   "• Additional baggage: 15 TL per kg (subject to availability)\n\n" +
                   "⚠️ RESTRICTED ITEMS:\n" +
                   "• Liquids over 100ml must be in checked baggage\n" +
                   "• Sharp objects, weapons, and flammable items are prohibited\n" +
                   "• Batteries and electronic devices must be in carry-on\n\n" +
                   "💡 TIP: Pack essential items in your hand baggage. For detailed information, check your booking confirmation or contact our support team.";
        }
        
        // Payment (more specific patterns)
        if ((message.includes('payment') && (message.includes('method') || message.includes('accept'))) || (message.includes('pay') && message.includes('method')) || message.includes('card')) {
            return "We accept credit and debit cards. Payment is processed securely during the booking process. You'll need to provide your card details on the payment page.";
        }
        
        // Cities/destinations (more specific patterns)
        if ((message.includes('city') || message.includes('cities')) && (message.includes('fly') || message.includes('destination') || message.includes('where'))) {
            return "We fly to many cities across Turkey including Istanbul, Ankara, Izmir, Antalya, Bodrum, Dalaman, Trabzon, and many more. Use the search form to see all available routes.";
        }
        
        // Seat selection
        if (message.includes('seat') || message.includes('choose seat')) {
            return "You can select your seat during the booking process. There's a 100 TL fee for manual seat selection, or you can let us assign a seat randomly at no extra cost.";
        }
        
        // Cabin class
        if (message.includes('business') || message.includes('economy') || message.includes('class')) {
            return "We offer two cabin classes: Business Class (first 3 rows) and Economy Class (rows 4-29). Business Class offers more comfort and space.";
        }
        
        // Price
        if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
            return "Flight prices vary by route and date. You can see the exact price when you search for flights. Prices start from around 300 TL and may vary based on demand and availability.";
        }
        
        // Ticket types
        if (message.includes('ticket type') || message.includes('one way') || message.includes('round trip')) {
            return "We currently offer one-way tickets. You can book multiple one-way tickets for round trips if needed.";
        }
        
        // Check-in
        if (message.includes('check in') || message.includes('checkin')) {
            return "Online check-in is available 24 hours before your flight. You'll receive check-in instructions via email. You can also check in at the airport counter.";
        }
        
        // Flight status
        if (message.includes('status') || message.includes('delay') || message.includes('on time')) {
            return "To check your flight status, please refer to your booking confirmation or contact our support team. Real-time flight status updates are available through our support channels.";
        }
        
        // Help
        if (message.includes('help') || message.includes('support')) {
            return "I'm here to help! You can ask me about booking flights, seat selection, payment, cancellations, or any other flight-related questions. For urgent matters, please contact our support team using the contact information on the website.";
        }
        
        // Greetings
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm your Flight Assistant. How can I help you with your flight booking today?";
        }
        
        // Default response
        return "I'm here to help with flight-related questions. You can ask me about booking flights, seat selection, payment, cancellations, or any other flight services. How can I assist you?";
    }
}
