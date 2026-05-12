// Admin Dashboard - Real Data Integration with index.html
// Uses flights and tickets from index.html

// Login and Authentication System
const ADMIN_CREDENTIALS = {
    'super_admin': { password: 'admin123', role: 'super_admin', name: 'Super Admin' },
    'operations': { password: 'ops123', role: 'operations', name: 'Operations Manager' },
    'accounting': { password: 'acc123', role: 'accounting', name: 'Accounting Manager' }
};

// Check authentication on page load
function checkAuthentication() {
    const currentUser = localStorage.getItem('adminUser');
    if (!currentUser) {
        showLoginScreen();
        return false;
    }
    return true;
}

// Show login screen
function showLoginScreen() {
    const loginScreen = document.getElementById('loginScreen');
    const adminContainer = document.getElementById('adminContainer');
    if (loginScreen) loginScreen.style.display = 'flex';
    if (adminContainer) adminContainer.style.display = 'none';
}

// Hide login screen and show dashboard
function hideLoginScreen() {
    const loginScreen = document.getElementById('loginScreen');
    const adminContainer = document.getElementById('adminContainer');
    if (loginScreen) loginScreen.style.display = 'none';
    if (adminContainer) adminContainer.style.display = 'flex';
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if (!username || !password) {
        errorDiv.textContent = 'Please enter both username and password';
        errorDiv.style.display = 'block';
        return;
    }
    
    const user = ADMIN_CREDENTIALS[username.toLowerCase()];
    if (user && user.password === password) {
        const userData = {
            username: username.toLowerCase(),
            role: user.role,
            name: user.name
        };
        localStorage.setItem('adminUser', JSON.stringify(userData));
        // Reload page to properly initialize dashboard
        window.location.reload();
    } else {
        errorDiv.textContent = 'Invalid username or password';
        errorDiv.style.display = 'block';
    }
}

// Apply role-based access control
function applyRoleBasedAccess(role) {
    // Hide/show navigation items based on role
    const navItems = document.querySelectorAll('.nav-item[data-roles]');
    navItems.forEach(item => {
        const allowedRoles = item.getAttribute('data-roles').split(',').map(r => r.trim());
        if (allowedRoles.includes(role)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Hide all sections first, then show only dashboard
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    
    // Show only dashboard initially
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        dashboardSection.style.display = 'block';
        dashboardSection.classList.add('active');
    }
}

// Update admin info in sidebar
function updateAdminInfo(userData) {
    const adminName = document.getElementById('adminName');
    const adminRole = document.getElementById('adminRole');
    if (adminName) adminName.textContent = userData.name;
    if (adminRole) {
        const roleNames = {
            'super_admin': 'Super Admin',
            'operations': 'Operations',
            'accounting': 'Accounting'
        };
        adminRole.textContent = roleNames[userData.role] || userData.role;
    }
}

// Initialize login system
document.addEventListener('DOMContentLoaded', function() {
    // Setup login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Check authentication
    if (checkAuthentication()) {
        const userData = JSON.parse(localStorage.getItem('adminUser'));
        applyRoleBasedAccess(userData.role);
        updateAdminInfo(userData);
        hideLoginScreen();
    } else {
        showLoginScreen();
    }
});

// Turkish cities data
const adminCities = [
    "İstanbul", "Ankara", "İzmir", "Antalya", "Bodrum", "Dalaman", 
    "Gaziantep", "Adana", "Trabzon", "Kayseri", "Van", "Diyarbakır", 
    "Erzurum", "Samsun", "Bursa", "Eskişehir", "Konya", "Malatya", 
    "Hatay", "Muğla", "Denizli", "Balıkesir", "Çanakkale", "Tekirdağ", 
    "Sakarya", "Kocaeli", "Edirne", "Rize", "Artvin", "Giresun", "Ordu",
    "Mersin", "Osmaniye", "Kahramanmaraş", "Şanlıurfa", "Mardin", "Batman",
    "Siirt", "Şırnak", "Muş", "Ağrı", "Hakkari", "Bitlis", "Erzincan",
    "Ardahan", "Kars", "Sivas", "Nevşehir", "Sinop", "Kastamonu", "Çorum",
    "Amasya", "Tokat", "Elazığ", "Tunceli", "Karaman", "Aksaray", "Kütahya"
].sort();

class AdminDashboard {
    constructor() {
        this.isDarkMode = true;
        this.charts = {};
        this.init();
    }
    
    init() {
        console.log('Admin Panel initializing...');
        
        try {
            // Check if flights already exist in localStorage
            const existingFlights = this.readStoredFlights();
            
            if (!existingFlights || existingFlights.length === 0) {
                // Only generate flights if none exist
                console.log('No existing flights found, generating default flights...');
                const allFlights = this.generateDefaultFlights();
                console.log('Generated', allFlights.length, 'flights');
                
                if (allFlights && allFlights.length > 0) {
                    this.persistFlights(allFlights);
                }
            } else {
                console.log('✅ Found', existingFlights.length, 'existing flights in localStorage');
                // Update global flights variable
                if (typeof flights !== 'undefined') {
                    flights = existingFlights;
                }
            }
        } catch (e) {
            console.error('ERROR in init:', e);
        }
        
        // ALWAYS setup event listeners and load data, even if there's an error
        this.setupEventListeners();
        this.setupThemeToggle();
        this.loadAllData();
    }
    
    getRealFlights() {
        const storedFlights = this.readStoredFlights();
        console.log('getRealFlights - storedFlights:', storedFlights ? storedFlights.length : 0);
        
        if (storedFlights && storedFlights.length > 0) {
            if (typeof flights !== 'undefined') {
                flights = storedFlights;
            }
            return storedFlights;
        }
        
        // If no flights in storage, return empty array (not undefined)
        return (typeof flights !== 'undefined' && Array.isArray(flights)) ? flights : [];
    }

    readStoredFlights() {
        try {
            const raw = localStorage.getItem('flights');
            console.log('readStoredFlights - raw data exists:', !!raw);
            
            if (!raw) {
                console.warn('No flights in localStorage');
                return [];
            }
            
            const stored = JSON.parse(raw);
            console.log('readStoredFlights - parsed:', Array.isArray(stored) ? stored.length + ' flights' : 'not an array');
            
            return Array.isArray(stored) ? stored : [];
        } catch (e) {
            console.error('Flights could not be read from storage', e);
            return [];
        }
    }

    persistFlights(flightList) {
        try {
            const jsonData = JSON.stringify(flightList);
            localStorage.setItem('flights', jsonData);
            console.log('✅ Admin Panel: Saved ' + flightList.length + ' flights to localStorage');
            console.log('Sample flight:', flightList[0]);
            if (typeof flights !== 'undefined') {
                flights = flightList;
            }
        } catch (e) {
            console.error('Flights could not be saved to storage', e);
        }
    }
    
    getRealTickets() {
        return JSON.parse(localStorage.getItem('tickets')) || [];
    }
    
    getRealCities() {
        if (typeof allCities !== 'undefined') {
            return allCities;
        }
        return adminCities;
    }
    
    loadAllData() {
        this.loadDashboardData();
        this.loadFlights();
        this.loadReservations();
        this.loadPassengers();
        this.loadPayments();
        this.loadNotifications();
    }
    
    loadDashboardData() {
        const realFlights = this.getRealFlights();
        const realTickets = this.getRealTickets();
        
        // Count only active flights (not deleted)
        const activeFlights = realFlights.filter(f => !f.deleted);
        const activeTickets = realTickets.filter(t => !t.isCancelled);
        const totalRevenue = activeTickets.reduce((sum, t) => sum + (t.finalPrice || 0), 0);
        
        document.getElementById('totalReservations').textContent = realTickets.length;
        document.getElementById('activeFlights').textContent = activeFlights.length;
        document.getElementById('occupancyRate').textContent = '0%';
        document.getElementById('dailyRevenue').textContent = '₺' + totalRevenue.toLocaleString('tr-TR', {maximumFractionDigits: 0});
        document.getElementById('monthlyRevenue').textContent = '₺' + totalRevenue.toLocaleString('tr-TR', {maximumFractionDigits: 0});
        document.getElementById('cancellationRate').textContent = realTickets.length > 0 ? ((realTickets.filter(t => t.isCancelled).length / realTickets.length) * 100).toFixed(1) + '%' : '0%';
    }
    
    loadFlights() {
        // Load existing flights from localStorage, only generate if empty
        console.log('loadFlights - loading from localStorage...');
        let realFlights = this.readStoredFlights();
        
        if (!realFlights || realFlights.length === 0) {
            console.log('No flights found, generating default flights...');
            realFlights = this.generateDefaultFlights();
            this.persistFlights(realFlights);
        }
        
        // Fix flight numbers: Osmaniye-Adana should be TK0250, Istanbul-Ankara should be TK0001
        let needsUpdate = false;
        const osmaniyeAdana = realFlights.find(f => f && f.departure === 'Osmaniye' && f.destination === 'Adana');
        let istanbulAnkara = realFlights.find(f => f && f.departure === 'İstanbul' && f.destination === 'Ankara');
        
        // If Istanbul-Ankara flight doesn't exist, create it
        if (!istanbulAnkara) {
            const today = new Date();
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + 30);
            const dateStr = futureDate.toISOString().split('T')[0];
            const timeStr = '10:00';
            
            istanbulAnkara = {
                number: 'TK0001',
                departure: 'İstanbul',
                destination: 'Ankara',
                date: dateStr,
                time: timeStr,
                basePrice: 400,
                seats: this.generateSeats(),
                deleted: false,
                cancelled: false
            };
            realFlights.unshift(istanbulAnkara);
            needsUpdate = true;
        }
        
        // First, fix Istanbul-Ankara flight number and move to beginning
        if (istanbulAnkara) {
            const istanbulIndex = realFlights.indexOf(istanbulAnkara);
            
            // Set flight number to TK0001
            if (istanbulAnkara.number !== 'TK0001') {
                istanbulAnkara.number = 'TK0001';
                needsUpdate = true;
            }
            
            // Move Istanbul-Ankara to the very beginning (index 0)
            if (istanbulIndex !== 0) {
                realFlights.splice(istanbulIndex, 1);
                realFlights.unshift(istanbulAnkara);
                needsUpdate = true;
            }
        }
        
        // Then fix Osmaniye-Adana flight number
        if (osmaniyeAdana && osmaniyeAdana.number === 'TK0001') {
            osmaniyeAdana.number = 'TK0250';
            needsUpdate = true;
        }
        
        // Move Osmaniye-Adana to a position around middle of list (not at the beginning)
        if (osmaniyeAdana) {
            const osmaniyeIndex = realFlights.indexOf(osmaniyeAdana);
            // If Osmaniye-Adana is at the beginning (index 0 or 1), move it to middle
            if (osmaniyeIndex <= 1 && realFlights.length > 10) {
                const targetIndex = Math.min(250, Math.floor(realFlights.length * 0.5));
                if (osmaniyeIndex !== targetIndex) {
                    realFlights.splice(osmaniyeIndex, 1);
                    realFlights.splice(targetIndex, 0, osmaniyeAdana);
                    needsUpdate = true;
                }
            }
        }
        
        if (needsUpdate) {
            this.persistFlights(realFlights);
        }
        
        console.log('Loaded', realFlights.length, 'flights');
        this.renderFlights(realFlights);
    }
    
    generateDefaultFlights() {
        const flights = [];
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
        
        let flightNum = 1;
        
        // Generate 1 flight for each route (to avoid localStorage quota issues)
        Object.keys(airportRoutes).forEach(departure => {
            airportRoutes[departure].forEach(destination => {
                const date = new Date('2025-12-01');
                date.setDate(date.getDate() + Math.floor(Math.random() * 60));
                
                flights.push({
                    number: `TK${String(flightNum++).padStart(4, '0')}`,
                    departure: departure,
                    destination: destination,
                    date: date.toISOString().split('T')[0],
                    time: String(6 + Math.floor(Math.random() * 12)).padStart(2, '0') + ':' + String(Math.floor(Math.random() * 60)).padStart(2, '0'),
                    basePrice: 300 + Math.random() * 400,
                    seats: this.generateSeats(),
                    cancelled: false
                });
            });
        });
        
        console.log('Generated', flights.length, 'flights total');
        return flights;
    }
    
    renderFlights(flights) {
        const tbody = document.getElementById('flightsTableBody');
        if (!tbody) return;
        
        console.log('renderFlights - rendering', flights.length, 'flights');
        
        // Render ALL flights - active and deleted (maintain original order)
        let html = '';
        flights.forEach(flight => {
            // Determine status
            let status = 'ACTIVE';
            let statusClass = 'active';
            let actionButtons = '';
            
            if (flight.deleted) {
                status = 'DELETED';
                statusClass = 'deleted';
                const num = flight.number;
                actionButtons = `<button class="action-btn edit" onclick="adminDashboard.restoreFlight('${num}')">Restore</button>`;
            } else if (flight.cancelled) {
                status = 'CANCELLED';
                statusClass = 'cancelled';
                const num = flight.number;
                actionButtons = `
                    <button class="action-btn edit" onclick="adminDashboard.editFlight('${num}')">Edit</button>
                    <button class="action-btn view" onclick="adminDashboard.adjustSeats('${num}')">Adjust Seats</button>
                    <button class="action-btn delete" onclick="adminDashboard.deleteFlight('${num}')">Delete</button>
                `;
            } else {
                const num = flight.number;
                actionButtons = `
                    <button class="action-btn edit" onclick="adminDashboard.editFlight('${num}')">Edit</button>
                    <button class="action-btn view" onclick="adminDashboard.adjustSeats('${num}')">Adjust Seats</button>
                    <button class="action-btn delete" onclick="adminDashboard.deleteFlight('${num}')">Delete</button>
                `;
            }
            
            html += `
            <tr>
                <td><strong>${flight.number}</strong></td>
                <td>${flight.departure}</td>
                <td>${flight.destination}</td>
                <td>${flight.date}</td>
                <td>${flight.time}</td>
                <td>₺${flight.basePrice.toLocaleString('tr-TR')}</td>
                <td>${Object.values(flight.seats).filter(s => s.occupied).length}/${Object.keys(flight.seats).length}</td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td>${actionButtons}</td>
            </tr>
            `;
        });
        
        tbody.innerHTML = html;
        console.log('renderFlights - rendered', tbody.children.length, 'rows');
    }

    /**
     * Belirli bir uçuşta kullanılabilir koltuk sayısını azaltmak için
     * admin tarafında basit bir kapasite azaltma fonksiyonu.
     * Gerçekte koltuk silmiyoruz, ilgili sayıda boş koltuğu "occupied" yaparak
     * sistem genelinde rezerve edilemez hale getiriyoruz.
     */
    adjustSeats(flightNumber) {
        const realFlights = this.getRealFlights();
        const flight = realFlights.find(f => f.number === flightNumber);
        if (!flight || !flight.seats) {
            this.showNotification('Flight not found.', 'error');
            return;
        }

        const seatEntries = Object.entries(flight.seats);
        const occupiedCount = seatEntries.filter(([, s]) => s.occupied).length;
        const totalSeats = seatEntries.length;
        const availableCount = totalSeats - occupiedCount;

        if (availableCount <= 0) {
            this.showNotification('There are no available seats to reduce for this flight.', 'warning');
            return;
        }

        const input = prompt(
            `Flight ${flight.number}\n` +
            `Total seats: ${totalSeats}\n` +
            `Currently available: ${availableCount}\n\n` +
            `How many seats do you want to mark as unavailable? (0 - ${availableCount})`,
            '0'
        );

        if (input === null) {
            return; // iptal edildi
        }

        const reduceBy = parseInt(input, 10);
        if (isNaN(reduceBy) || reduceBy < 0 || reduceBy > availableCount) {
            this.showNotification('Please enter a valid seat count within the allowed range.', 'error');
            return;
        }

        if (reduceBy === 0) {
            return;
        }

        // Boş koltuklar arasından belirtilen sayıda koltuğu işgal edilmiş olarak işaretle
        let remaining = reduceBy;
        for (const [seatNo, seatData] of seatEntries) {
            if (!seatData.occupied && remaining > 0) {
                seatData.occupied = true;
                remaining--;
            }
            if (remaining === 0) break;
        }

        this.persistFlights(realFlights);
        this.renderFlights(realFlights);
        this.showNotification(`Seat capacity updated. ${reduceBy} seats are now unavailable.`, 'success');
    }
    
    filterFlights(searchTerm) {
        const realFlights = this.getRealFlights();
        const filtered = realFlights.filter(f => f.number.toLowerCase().includes(searchTerm.toLowerCase()));
        this.renderFlights(filtered);
    }
    
    filterFlightsByStatus(status) {
        const realFlights = this.getRealFlights();
        this.renderFlights(realFlights);
    }
    
    showAddFlightModal() {
        const modalBody = document.getElementById('modalBody');
        const cities = this.getRealCities();
        const cityOptions = cities.map(city => `<option value="${city}">${city}</option>`).join('');
        
        modalBody.innerHTML = `
            <h2>Add New Flight</h2>
            <form id="flightForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label>Flight Number</label>
                    <input type="text" id="flightNumber" required>
                </div>
                <div class="form-group">
                    <label>Departure City</label>
                    <select id="departureCity" required>
                        <option value="">Select City</option>
                        ${cityOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>Arrival City</label>
                    <select id="destinationCity" required>
                        <option value="">Select City</option>
                        ${cityOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="flightDate" required>
                </div>
                <div class="form-group">
                    <label>Time</label>
                    <input type="time" id="flightTime" required>
                </div>
                <div class="form-group">
                    <label>Price (₺)</label>
                    <input type="number" id="flightPrice" step="0.01" required>
                </div>
                <button type="button" class="btn-primary" onclick="adminDashboard.saveFlight()">Save</button>
            </form>
        `;
        this.openModal();
    }
    
    saveFlight() {
        const realFlights = this.getRealFlights();
        const flight = {
            number: document.getElementById('flightNumber').value,
            departure: document.getElementById('departureCity').value,
            destination: document.getElementById('destinationCity').value,
            date: document.getElementById('flightDate').value,
            time: document.getElementById('flightTime').value,
            basePrice: parseFloat(document.getElementById('flightPrice').value),
            seats: this.generateSeats()
        };
        
        realFlights.push(flight);
        this.persistFlights(realFlights);
        this.renderFlights(realFlights);
        this.closeModal();
        this.showNotification('Flight added successfully!', 'success');
    }
    
    generateSeats() {
        const seats = {};
        const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
        for (let row = 1; row <= 29; row++) {
            seatLetters.forEach(letter => {
                seats[`${row}${letter}`] = { occupied: false, class: row <= 3 ? 'BUSINESS' : 'ECONOMY', exitRow: false };
            });
        }
        return seats;
    }
    
    editFlight(flightNumber) {
        try {
            console.log('=== EDIT FLIGHT DEBUG ===');
            console.log('Received flightNumber:', flightNumber);
            console.log('Type:', typeof flightNumber);
            
            // Get ALL flights from localStorage
            const allStoredFlights = JSON.parse(localStorage.getItem('flights')) || [];
            console.log('Total flights in storage:', allStoredFlights.length);
            
            // Find the flight
            const flight = allStoredFlights.find(f => f && f.number === flightNumber);
            console.log('Flight found:', !!flight);
            
            if (!flight) {
                console.log('Available flight numbers:', allStoredFlights.slice(0, 5).map(f => f.number));
                this.showNotification('Flight not found: ' + flightNumber, 'error');
                return;
            }
            
            // Don't allow editing deleted flights
            if (flight.deleted) {
                this.showNotification('Cannot edit deleted flights. Please restore first.', 'error');
                return;
            }
            
            const cities = this.getRealCities();
            const cityOptions = cities.map(city => `<option value="${city}" ${city === flight.departure ? 'selected' : ''}>${city}</option>`).join('');
            
            const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
            const occupiedSeats = Object.entries(flight.seats)
                .filter(([, seat]) => seat.occupied)
                .map(([seatNo]) => seatNo);
            
            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = `
            <h2>Edit Flight - ${flightNumber}</h2>
            <form id="editFlightForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label>Flight Number</label>
                    <input type="text" id="editFlightNumber" value="${flight.number}" disabled style="background-color: #f0f0f0;">
                </div>
                
                <div class="form-group">
                    <label>Departure City</label>
                    <select id="editDepartureCity" required>
                        <option value="">Select City</option>
                        ${cityOptions}
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Arrival City</label>
                    <select id="editDestinationCity" required>
                        <option value="">Select City</option>
                        ${cities.map(city => `<option value="${city}" ${city === flight.destination ? 'selected' : ''}>${city}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="editFlightDate" value="${flight.date}" required>
                </div>
                
                <div class="form-group">
                    <label>Time</label>
                    <input type="time" id="editFlightTime" value="${flight.time}" required>
                </div>
                
                <div class="form-group">
                    <label>Price (₺)</label>
                    <input type="number" id="editFlightPrice" value="${flight.basePrice}" step="0.01" required>
                </div>
                
                <div class="form-group">
                    <label>Manage Seats</label>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; max-height: 200px; overflow-y: auto;">
                        <p style="margin-bottom: 10px; font-weight: bold;">Occupied Seats (${occupiedSeats.length}): ${occupiedSeats.join(', ') || 'None'}</p>
                        <p style="margin-bottom: 10px; font-size: 0.9em; color: #666;">Note: You can mark seats as unavailable below</p>
                        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px;">
                            ${Object.entries(flight.seats).map(([seatNo, seat]) => `
                                <label style="display: flex; align-items: center; gap: 5px; cursor: pointer; padding: 5px; border-radius: 3px; background: ${seat.occupied ? '#ffebee' : '#e8f5e9'};">
                                    <input type="checkbox" class="seat-checkbox" value="${seatNo}" ${seat.occupied ? 'checked disabled' : ''} style="cursor: pointer;">
                                    <span style="font-size: 0.85em;">${seatNo}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    <small style="display: block; margin-top: 8px; color: #666;">Check seats to mark them as unavailable</small>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button type="button" class="btn-primary" onclick="adminDashboard.saveEditedFlight('${flightNumber}')">Save Changes</button>
                    <button type="button" class="btn-secondary" onclick="adminDashboard.cancelFlight('${flightNumber}')">Cancel Flight</button>
                    <button type="button" class="btn-secondary" onclick="adminDashboard.closeModal()">Close</button>
                </div>
            </form>
        `;
            this.openModal();
        } catch (e) {
            console.error('Error in editFlight:', e);
            this.showNotification('Error opening edit form', 'error');
        }
    }
    
    saveEditedFlight(flightNumber) {
        console.log('saveEditedFlight called for:', flightNumber);
        
        try {
            // Use readStoredFlights to maintain original order
            const realFlights = this.readStoredFlights();
            const flightIndex = realFlights.findIndex(f => f && f.number === flightNumber);
            
            if (flightIndex === -1) {
                this.showNotification('Flight not found', 'error');
                return;
            }
            
            const flight = realFlights[flightIndex];
            
            // Get form values
            const newDate = document.getElementById('editFlightDate')?.value;
            const newTime = document.getElementById('editFlightTime')?.value;
            const newPrice = document.getElementById('editFlightPrice')?.value;
            const newDeparture = document.getElementById('editDepartureCity')?.value;
            const newDestination = document.getElementById('editDestinationCity')?.value;
            
            console.log('Form values:', {newDate, newTime, newPrice, newDeparture, newDestination});
            
            if (!newDate || !newTime || !newPrice || !newDeparture || !newDestination) {
                this.showNotification('Please fill all required fields', 'error');
                return;
            }
            
            // Store original flight number to ensure it never changes
            const originalFlightNumber = flight.number;
            
            // Update flight data (DO NOT change flight number - keep original)
            flight.date = newDate;
            flight.time = newTime;
            flight.basePrice = parseFloat(newPrice);
            flight.departure = newDeparture;
            flight.destination = newDestination;
            
            // CRITICAL: Ensure flight number never changes - force it back if somehow modified
            flight.number = originalFlightNumber;
            
            // Handle seat checkboxes
            const checkboxes = document.querySelectorAll('.seat-checkbox:not(:disabled)');
            checkboxes.forEach(checkbox => {
                const seatNo = checkbox.value;
                if (checkbox.checked) {
                    if (flight.seats[seatNo]) {
                        flight.seats[seatNo].occupied = true;
                    }
                }
            });
            
            console.log('Updated flight:', flight);
            console.log('Flight number remains:', flight.number);
            
            // Save to localStorage - maintain original order
            this.persistFlights(realFlights);
            
            // Verify save
            const verify = this.readStoredFlights();
            const savedFlight = verify.find(f => f && f.number === flightNumber);
            console.log('Verified saved flight:', savedFlight);
            
            // Update UI - use readStoredFlights to maintain order
            this.renderFlights(this.readStoredFlights());
            this.closeModal();
            this.showNotification('✅ Flight updated successfully! Changes saved to localStorage.', 'success');
            
        } catch (error) {
            console.error('Error in saveEditedFlight:', error);
            this.showNotification('Error saving flight: ' + error.message, 'error');
        }
    }
    
    cancelFlight(flightNumber) {
        if (!confirm('Are you sure you want to cancel this flight? All associated reservations will be marked as cancelled.')) {
            return;
        }
        
        const realFlights = this.getRealFlights();
        const flight = realFlights.find(f => f.number === flightNumber);
        
        if (!flight) {
            this.showNotification('Flight not found', 'error');
            return;
        }
        
        flight.cancelled = true;
        
        const realTickets = this.getRealTickets();
        realTickets.forEach(ticket => {
            if (ticket.flight?.number === flightNumber) {
                ticket.isCancelled = true;
            }
        });
        
        this.persistFlights(realFlights);
        localStorage.setItem('tickets', JSON.stringify(realTickets));
        
        this.renderFlights(realFlights);
        this.loadReservations();
        this.loadDashboardData();
        this.closeModal();
        this.showNotification('Flight cancelled successfully! All related reservations have been cancelled.', 'success');
    }
    
    deleteFlight(flightNumber) {
        if (confirm('Are you sure you want to delete this flight? You can restore it later.')) {
            console.log('Soft deleting flight:', flightNumber);
            
            // Always reload from localStorage to ensure we have ALL flights
            let realFlights = this.readStoredFlights();
            console.log('Loaded', realFlights.length, 'flights from storage');
            
            if (!realFlights || realFlights.length === 0) {
                realFlights = this.generateDefaultFlights();
                this.persistFlights(realFlights);
            }
            
            const flight = realFlights.find(f => f.number === flightNumber);
            console.log('Flight found:', !!flight);
            
            if (flight) {
                flight.deleted = true;
                this.persistFlights(realFlights);
                this.renderFlights(realFlights);
                this.loadDashboardData();
                this.showNotification('✅ Flight deleted! You can restore it from the list.', 'success');
            } else {
                console.error('Flight not found:', flightNumber);
                console.log('Available flights:', realFlights.slice(0, 10).map(f => f.number));
                this.showNotification('Flight not found: ' + flightNumber, 'error');
            }
        }
    }
    
    restoreFlight(flightNumber) {
        if (confirm('Restore this flight?')) {
            console.log('Restoring flight:', flightNumber);
            
            // Always reload from localStorage to ensure we have ALL flights
            let realFlights = this.readStoredFlights();
            console.log('Loaded', realFlights.length, 'flights from storage');
            
            if (!realFlights || realFlights.length === 0) {
                realFlights = this.generateDefaultFlights();
                this.persistFlights(realFlights);
            }
            
            const flight = realFlights.find(f => f.number === flightNumber);
            console.log('Flight found:', !!flight);
            
            if (flight) {
                flight.deleted = false;
                this.persistFlights(realFlights);
                this.renderFlights(realFlights);
                this.loadDashboardData();
                this.showNotification('✅ Flight restored successfully!', 'success');
            } else {
                console.error('Flight not found:', flightNumber);
                this.showNotification('Flight not found: ' + flightNumber, 'error');
            }
        }
    }
    
    loadReservations() {
        const realTickets = this.getRealTickets();
        const reservations = realTickets.map(t => ({
            pnr: t.ticketNumber,
            passengerName: (t.passenger?.firstName || '') + ' ' + (t.passenger?.lastName || ''),
            email: t.passenger?.email || '',
            flightNumber: t.flight?.number || '',
            date: t.flight?.date || '',
            seat: t.seat || '',
            price: t.finalPrice || 0,
            status: t.isCancelled ? 'CANCELLED' : 'CONFIRMED'
        }));
        this.renderReservations(reservations);
    }
    
    renderReservations(reservations) {
        const tbody = document.getElementById('reservationsTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = reservations.map(res => `
            <tr>
                <td><strong>${res.pnr}</strong></td>
                <td>${res.passengerName}</td>
                <td>${res.flightNumber}</td>
                <td>${res.date}</td>
                <td>${res.seat}</td>
                <td>₺${res.price.toLocaleString('tr-TR')}</td>
                <td><span class="status-badge ${res.status.toLowerCase()}">${res.status}</span></td>
                <td>
                    <button class="action-btn view" onclick="adminDashboard.viewReservation('${res.pnr}')">View</button>
                    <button class="action-btn edit" onclick="adminDashboard.editPassengerName('${res.pnr}')">Edit Name</button>
                    <button class="action-btn delete" onclick="adminDashboard.cancelReservation('${res.pnr}')">Cancel</button>
                </td>
            </tr>
        `).join('');
    }
    
    filterReservations(searchTerm) {
        const realTickets = this.getRealTickets();
        const reservations = realTickets.map(t => ({
            pnr: t.ticketNumber,
            passengerName: t.passenger.firstName + ' ' + t.passenger.lastName,
            email: t.passenger.email,
            flightNumber: t.flight.number,
            date: t.flight.date,
            seat: t.seatNumber,
            price: t.finalPrice,
            status: t.isCancelled ? 'CANCELLED' : 'CONFIRMED'
        }));
        
        const filtered = reservations.filter(r => 
            r.pnr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.passengerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderReservations(filtered);
    }
    
    filterReservationsByStatus(status) {
        this.loadReservations();
    }
    
    viewReservation(pnr) {
        const realTickets = this.getRealTickets();
        const ticket = realTickets.find(t => t.ticketNumber === pnr);
        if (!ticket) return;
        
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Reservation Details</h2>
            <div style="margin-top: 20px;">
                <p><strong>PNR:</strong> ${ticket.ticketNumber}</p>
                <p><strong>Passenger:</strong> ${ticket.passenger.firstName} ${ticket.passenger.lastName}</p>
                <p><strong>Email:</strong> ${ticket.passenger.email}</p>
                <p><strong>Flight:</strong> ${ticket.flight.number}</p>
                <p><strong>Date:</strong> ${ticket.flight.date}</p>
                <p><strong>Seat:</strong> ${ticket.seatNumber}</p>
                <p><strong>Price:</strong> ₺${ticket.finalPrice.toLocaleString('tr-TR')}</p>
                <p><strong>Status:</strong> ${ticket.isCancelled ? 'CANCELLED' : 'CONFIRMED'}</p>
                <button class="btn-primary" onclick="adminDashboard.closeModal()">Close</button>
            </div>
        `;
        this.openModal();
    }
    
    editPassengerName(pnr) {
        const realTickets = this.getRealTickets();
        const ticket = realTickets.find(t => t.ticketNumber === pnr);
        if (!ticket) {
            this.showNotification('Reservation not found', 'error');
            return;
        }
        
        const passenger = ticket.passenger;
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Edit Passenger Name</h2>
            <p style="color: #666; margin-bottom: 20px;">PNR: ${pnr}</p>
            <div style="margin-top: 20px;">
                <div style="margin-bottom: 15px;">
                    <label><strong>Current First Name:</strong></label>
                    <p style="color: #666;">${passenger.firstName}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <label><strong>New First Name:</strong></label>
                    <input type="text" id="editFirstName" value="${passenger.firstName}" 
                           style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label><strong>Current Last Name:</strong></label>
                    <p style="color: #666;">${passenger.lastName}</p>
                </div>
                <div style="margin-bottom: 20px;">
                    <label><strong>New Last Name:</strong></label>
                    <input type="text" id="editLastName" value="${passenger.lastName}" 
                           style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div id="nameValidationResult" style="margin-bottom: 15px; padding: 10px; border-radius: 4px; display: none;"></div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-primary" onclick="adminDashboard.validateAndSaveName('${pnr}')">Validate & Save</button>
                    <button class="btn-secondary" onclick="adminDashboard.closeModal()">Cancel</button>
                </div>
            </div>
        `;
        this.openModal();
    }
    
    validateAndSaveName(pnr) {
        const realTickets = this.getRealTickets();
        const ticket = realTickets.find(t => t.ticketNumber === pnr);
        if (!ticket) return;
        
        const oldFirstName = ticket.passenger.firstName;
        const oldLastName = ticket.passenger.lastName;
        const newFirstName = document.getElementById('editFirstName').value.trim();
        const newLastName = document.getElementById('editLastName').value.trim();
        
        // Validate using JavaScript version of PassengerNameValidator logic
        const validationResult = this.validateNameCorrection(
            oldFirstName, newFirstName, oldLastName, newLastName
        );
        
        const resultDiv = document.getElementById('nameValidationResult');
        resultDiv.style.display = 'block';
        
        if (validationResult.decision === 'APPROVE') {
            resultDiv.style.backgroundColor = '#d4edda';
            resultDiv.style.color = '#155724';
            resultDiv.style.border = '1px solid #c3e6cb';
            resultDiv.innerHTML = `✅ <strong>APPROVED</strong> - ${validationResult.reason}<br>Confidence: ${(validationResult.confidence * 100).toFixed(0)}%`;
            
            // Save the changes
            ticket.passenger.firstName = newFirstName;
            ticket.passenger.lastName = newLastName;
            localStorage.setItem('tickets', JSON.stringify(realTickets));
            
            this.loadReservations();
            this.closeModal();
            this.showNotification('✅ Passenger name updated successfully!', 'success');
        } else {
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.color = '#721c24';
            resultDiv.style.border = '1px solid #f5c6cb';
            resultDiv.innerHTML = `❌ <strong>REJECTED</strong> - ${validationResult.reason}<br>Confidence: ${(validationResult.confidence * 100).toFixed(0)}%`;
        }
    }
    
    validateNameCorrection(oldFirstName, newFirstName, oldLastName, newLastName) {
        // JavaScript implementation of PassengerNameValidator logic
        // This mirrors the Java validation rules
        
        // Normalize inputs
        oldFirstName = (oldFirstName || '').trim();
        newFirstName = (newFirstName || '').trim();
        oldLastName = (oldLastName || '').trim();
        newLastName = (newLastName || '').trim();
        
        // Check if identical (case-insensitive)
        if (oldFirstName.toLowerCase() === newFirstName.toLowerCase() &&
            oldLastName.toLowerCase() === newLastName.toLowerCase()) {
            return { decision: 'APPROVE', confidence: 1.0, reason: 'Names are identical' };
        }
        
        // Validate first name
        const firstNameResult = this.validateNamePart(oldFirstName, newFirstName);
        const lastNameResult = this.validateNamePart(oldLastName, newLastName);
        
        if (firstNameResult.isValid && lastNameResult.isValid) {
            const confidence = Math.min(firstNameResult.confidence, lastNameResult.confidence);
            return {
                decision: 'APPROVE',
                confidence: confidence,
                reason: `${firstNameResult.reason}; ${lastNameResult.reason}`
            };
        } else {
            const reason = (!firstNameResult.isValid ? `First name: ${firstNameResult.reason}` : '') +
                          (!firstNameResult.isValid && !lastNameResult.isValid ? '; ' : '') +
                          (!lastNameResult.isValid ? `Last name: ${lastNameResult.reason}` : '');
            return {
                decision: 'REJECT',
                confidence: Math.max(
                    firstNameResult.isValid ? firstNameResult.confidence : 0.0,
                    lastNameResult.isValid ? lastNameResult.confidence : 0.0
                ),
                reason: reason
            };
        }
    }
    
    validateNamePart(oldName, newName) {
        oldName = (oldName || '').trim();
        newName = (newName || '').trim();
        
        // Check if identical
        if (oldName.toLowerCase() === newName.toLowerCase()) {
            return { isValid: true, confidence: 1.0, reason: 'Identical' };
        }
        
        // Check length difference
        const lengthDiff = Math.abs(oldName.length - newName.length);
        if (lengthDiff > 2) {
            return { isValid: false, confidence: 0.0, reason: `Length difference too large (${lengthDiff} characters)` };
        }
        
        // Count character differences (simplified Levenshtein)
        const differences = this.countCharacterDifferences(oldName, newName);
        
        if (differences > 2) {
            return { isValid: false, confidence: 0.0, reason: `Too many character differences (${differences})` };
        }
        
        // Check if completely different
        if (this.isCompletelyDifferentName(oldName, newName)) {
            return { isValid: false, confidence: 0.0, reason: 'Names are completely different - likely different person' };
        }
        
        const confidence = Math.max(0.5, 1.0 - (differences * 0.15));
        const reason = differences === 0 ? 'Identical' :
                      differences === 1 ? '1 character difference (typo correction)' :
                      '2 character differences (typo correction)';
        
        return { isValid: true, confidence: confidence, reason: reason };
    }
    
    countCharacterDifferences(oldName, newName) {
        oldName = oldName.toLowerCase();
        newName = newName.toLowerCase();
        
        const dp = Array(oldName.length + 1).fill(null).map(() => Array(newName.length + 1).fill(0));
        
        for (let i = 0; i <= oldName.length; i++) dp[i][0] = i;
        for (let j = 0; j <= newName.length; j++) dp[0][j] = j;
        
        for (let i = 1; i <= oldName.length; i++) {
            for (let j = 1; j <= newName.length; j++) {
                const oldChar = oldName[i - 1];
                const newChar = newName[j - 1];
                
                if (this.areTurkishEquivalent(oldChar, newChar) || oldChar === newChar) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j] + 1,
                        dp[i][j - 1] + 1,
                        dp[i - 1][j - 1] + 1
                    );
                }
            }
        }
        
        return dp[oldName.length][newName.length];
    }
    
    areTurkishEquivalent(c1, c2) {
        if (c1 === c2) return true;
        const pairs = ['uü', 'üu', 'oö', 'öo', 'cç', 'çc', 'sş', 'şs', 'gğ', 'ğg', 'ıi', 'iı'];
        const pair = c1.toLowerCase() + c2.toLowerCase();
        return pairs.includes(pair);
    }
    
    isCompletelyDifferentName(oldName, newName) {
        oldName = oldName.toLowerCase().trim();
        newName = newName.toLowerCase().trim();
        
        if (oldName.length <= 3 && newName.length <= 3) {
            const diff = this.countCharacterDifferences(oldName, newName);
            if (diff >= oldName.length) return true;
        }
        
        const minLength = Math.min(oldName.length, newName.length);
        if (minLength > 0) {
            const differences = this.countCharacterDifferences(oldName, newName);
            const differenceRatio = differences / minLength;
            if (differenceRatio > 0.5 && differences > 2) return true;
        }
        
        return false;
    }
    
    cancelReservation(pnr) {
        if (confirm('Are you sure you want to cancel this reservation?')) {
            const realTickets = this.getRealTickets();
            const ticket = realTickets.find(t => t.ticketNumber === pnr);
            if (ticket) {
                // Mark ticket as cancelled so index.html "My Tickets" and other
                // user views immediately reflect the change
                ticket.isCancelled = true;

                // Also free the seat on the related flight so seat maps and
                // availability on index.html stay in sync with admin actions
                const flightNumber = ticket.flight?.number;
                const seatNumber = ticket.seat;
                if (flightNumber && seatNumber) {
                    const realFlights = this.getRealFlights();
                    const flight = realFlights.find(f => f.number === flightNumber);
                    if (flight && flight.seats && flight.seats[seatNumber]) {
                        flight.seats[seatNumber].occupied = false;
                        this.persistFlights(realFlights);
                    }
                }

                localStorage.setItem('tickets', JSON.stringify(realTickets));
                this.loadReservations();
                this.loadPayments();
                this.loadPassengers();
                this.loadDashboardData();
                this.showNotification('Reservation cancelled successfully!', 'success');
            }
        }
    }
    
    loadPassengers() {
        const realTickets = this.getRealTickets();
        const passengers = {};
        
        realTickets.forEach(t => {
            const email = t.passenger.email;
            if (!passengers[email]) {
                passengers[email] = {
                    name: t.passenger.firstName + ' ' + t.passenger.lastName,
                    email: email,
                    phone: t.passenger.phone || 'N/A',
                    totalFlights: 0,
                    registrationDate: new Date().toLocaleDateString('tr-TR')
                };
            }
            passengers[email].totalFlights++;
        });
        
        this.renderPassengers(Object.values(passengers));
    }
    
    renderPassengers(passengers) {
        const tbody = document.getElementById('passengersTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = passengers.map(p => `
            <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.email}</td>
                <td>${p.phone}</td>
                <td>${p.totalFlights}</td>
                <td>${p.registrationDate}</td>
                <td>
                    <button class="action-btn view" onclick="adminDashboard.viewPassenger('${p.email}')">Profile</button>
                </td>
            </tr>
        `).join('');
    }
    
    filterPassengers(searchTerm) {
        const realTickets = this.getRealTickets();
        const passengers = {};
        
        realTickets.forEach(t => {
            const email = t.passenger.email;
            if (!passengers[email]) {
                passengers[email] = {
                    name: t.passenger.firstName + ' ' + t.passenger.lastName,
                    email: email,
                    phone: t.passenger.phone || 'N/A',
                    totalFlights: 0,
                    registrationDate: new Date().toLocaleDateString('tr-TR')
                };
            }
            passengers[email].totalFlights++;
        });
        
        const filtered = Object.values(passengers).filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderPassengers(filtered);
    }
    
    viewPassenger(email) {
        const realTickets = this.getRealTickets();
        const tickets = realTickets.filter(t => t.passenger.email === email);
        if (tickets.length === 0) return;
        
        const passenger = tickets[0].passenger;
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Passenger Profile</h2>
            <div style="margin-top: 20px;">
                <p><strong>Name:</strong> ${passenger.firstName} ${passenger.lastName}</p>
                <p><strong>Email:</strong> ${passenger.email}</p>
                <p><strong>Phone:</strong> ${passenger.phone || 'N/A'}</p>
                <p><strong>Total Flights:</strong> ${tickets.length}</p>
                <p><strong>Status:</strong> Active</p>
                <button class="btn-primary" onclick="adminDashboard.closeModal()">Close</button>
            </div>
        `;
        this.openModal();
    }
    
    loadAircraft() {
        const aircraft = this.getAircraft();
        const grid = document.getElementById('aircraftGrid');
        
        if (aircraft.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No aircraft available. Click "Add New Aircraft" to create one.</p>';
            return;
        }
        
        grid.innerHTML = aircraft.map(a => `
            <div class="aircraft-card">
                <h3>${a.model}</h3>
                <div class="aircraft-info">
                    <p><strong>Aircraft ID:</strong> <span>${a.aircraftId}</span></p>
                    <p><strong>Total Seats:</strong> <span>${a.totalSeats}</span></p>
                    <p><strong>Business Class:</strong> <span>${a.businessSeats}</span></p>
                    <p><strong>Economy Class:</strong> <span>${a.economySeats}</span></p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="action-btn edit" onclick="adminDashboard.editAircraft('${a.aircraftId}')">Edit</button>
                    <button class="action-btn delete" onclick="adminDashboard.deleteAircraft('${a.aircraftId}')">Delete</button>
                </div>
            </div>
        `).join('');
    }
    
    getAircraft() {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('aircraft');
            if (stored) {
                return JSON.parse(stored);
            }
        }
        return [
            { aircraftId: 'A320-001', model: 'Airbus A320', totalSeats: 180, businessSeats: 30, economySeats: 150 },
            { aircraftId: 'B737-001', model: 'Boeing 737', totalSeats: 160, businessSeats: 30, economySeats: 130 },
            { aircraftId: 'B777-001', model: 'Boeing 777', totalSeats: 350, businessSeats: 100, economySeats: 250 }
        ];
    }
    
    saveAircraft(aircraft) {
        const existing = this.getAircraft();
        const index = existing.findIndex(a => a.aircraftId === aircraft.aircraftId);
        if (index >= 0) {
            existing[index] = aircraft;
        } else {
            existing.push(aircraft);
        }
        localStorage.setItem('aircraft', JSON.stringify(existing));
        this.loadAircraft();
        this.showNotification('Aircraft saved successfully!', 'success');
    }
    
    deleteAircraft(aircraftId) {
        if (confirm('Are you sure you want to delete this aircraft?')) {
            const aircraft = this.getAircraft().filter(a => a.aircraftId !== aircraftId);
            localStorage.setItem('aircraft', JSON.stringify(aircraft));
            this.loadAircraft();
            this.showNotification('Aircraft deleted!', 'success');
        }
    }
    
    editAircraft(aircraftId) {
        const aircraft = this.getAircraft().find(a => a.aircraftId === aircraftId);
        if (aircraft) {
            this.showEditAircraftModal(aircraft);
        }
    }
    
    loadCampaigns() {
        const campaigns = this.getCampaigns();
        const grid = document.getElementById('campaignsGrid');
        
        if (campaigns.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No campaigns available. Click "Add Campaign" to create one.</p>';
            return;
        }
        
        grid.innerHTML = campaigns.map(c => `
            <div class="campaign-card">
                <div class="campaign-header">
                    <h3>${c.name}</h3>
                    <span class="status-badge ${c.active ? 'active' : 'inactive'}">${c.active ? 'ACTIVE' : 'INACTIVE'}</span>
                </div>
                <div class="campaign-info">
                    <p><strong>Code:</strong> <span>${c.discountCode}</span></p>
                    <p><strong>Discount:</strong> <span>${c.discountPercentage}%</span></p>
                    <p><strong>Start Date:</strong> <span>${c.startDate || 'N/A'}</span></p>
                    <p><strong>End Date:</strong> <span>${c.endDate || 'N/A'}</span></p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="action-btn edit" onclick="adminDashboard.editCampaign('${c.campaignId}')">Edit</button>
                    <button class="action-btn delete" onclick="adminDashboard.deleteCampaign('${c.campaignId}')">Delete</button>
                </div>
            </div>
        `).join('');
    }
    
    getCampaigns() {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('campaigns');
            if (stored) {
                return JSON.parse(stored);
            }
        }
        return [];
    }
    
    saveCampaign(campaign) {
        const existing = this.getCampaigns();
        const index = existing.findIndex(c => c.campaignId === campaign.campaignId);
        if (index >= 0) {
            existing[index] = campaign;
        } else {
            existing.push(campaign);
        }
        localStorage.setItem('campaigns', JSON.stringify(existing));
        this.loadCampaigns();
        this.showNotification('Campaign saved successfully!', 'success');
    }
    
    deleteCampaign(campaignId) {
        if (confirm('Are you sure you want to delete this campaign?')) {
            const campaigns = this.getCampaigns().filter(c => c.campaignId !== campaignId);
            localStorage.setItem('campaigns', JSON.stringify(campaigns));
            this.loadCampaigns();
            this.showNotification('Campaign deleted!', 'success');
        }
    }
    
    editCampaign(campaignId) {
        const campaign = this.getCampaigns().find(c => c.campaignId === campaignId);
        if (campaign) {
            this.showEditCampaignModal(campaign);
        }
    }
    
    loadPayments() {
        const realTickets = this.getRealTickets();
        const activeTickets = realTickets.filter(t => !t.isCancelled);
        const cancelledTickets = realTickets.filter(t => t.isCancelled);
        const totalRevenue = activeTickets.reduce((sum, t) => sum + (t.finalPrice || 0), 0);
        const refunds = cancelledTickets.reduce((sum, t) => sum + (t.finalPrice || 0), 0);
        
        document.getElementById('totalTransactions').textContent = realTickets.length;
        document.getElementById('successfulPayments').textContent = activeTickets.length;
        document.getElementById('failedPayments').textContent = cancelledTickets.length;
        document.getElementById('refunds').textContent = '₺' + refunds.toLocaleString('tr-TR', {maximumFractionDigits: 2});
        
        this.renderPaymentsTable(realTickets);
    }
    
    renderPaymentsTable(tickets) {
        const tbody = document.getElementById('paymentsTableBody');
        
        if (tickets.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No payment data available</td></tr>';
            return;
        }
        
        tbody.innerHTML = tickets.map((t, idx) => `
            <tr>
                <td>${t.ticketNumber || 'TXN-' + idx}</td>
                <td>${t.passenger ? (t.passenger.firstName + ' ' + t.passenger.lastName) : 'N/A'}</td>
                <td>₺${(t.finalPrice || 0).toLocaleString('tr-TR', {maximumFractionDigits: 2})}</td>
                <td>${t.paymentInfo?.cardType ? t.paymentInfo.cardType.toUpperCase() : 'Credit Card'}</td>
                <td><span class="status-badge ${t.isCancelled ? 'cancelled' : 'active'}">${t.isCancelled ? 'REFUNDED' : 'SUCCESS'}</span></td>
                <td>${new Date(t.bookingDate || Date.now()).toLocaleDateString('tr-TR')}</td>
            </tr>
        `).join('');
    }
    
    generatePaymentReport() {
        const startDate = document.getElementById('paymentStartDate').value;
        const endDate = document.getElementById('paymentEndDate').value;
        
        if (!startDate || !endDate) {
            this.showNotification('Please select both start and end dates', 'error');
            return;
        }
        
        const realTickets = this.getRealTickets();
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const filteredTickets = realTickets.filter(t => {
            const ticketDate = new Date(t.bookingDate || Date.now());
            return ticketDate >= start && ticketDate <= end;
        });
        
        this.exportReportToPDF(filteredTickets, startDate, endDate);
    }
    
    exportReportToPDF(tickets, startDate, endDate) {
        const activeTickets = tickets.filter(t => !t.isCancelled);
        const cancelledTickets = tickets.filter(t => t.isCancelled);
        const totalRevenue = activeTickets.reduce((sum, t) => sum + (t.finalPrice || 0), 0);
        const refunds = cancelledTickets.reduce((sum, t) => sum + (t.finalPrice || 0), 0);
        
        let pdfContent = `
PAYMENT & ACCOUNTING REPORT
Generated: ${new Date().toLocaleString('tr-TR')}
Period: ${startDate} to ${endDate}

========================================
SUMMARY
========================================
Total Transactions: ${tickets.length}
Successful Payments: ${activeTickets.length}
Failed/Refunded Payments: ${cancelledTickets.length}
Total Revenue: ₺${totalRevenue.toLocaleString('tr-TR', {maximumFractionDigits: 2})}
Total Refunds: ₺${refunds.toLocaleString('tr-TR', {maximumFractionDigits: 2})}
Net Revenue: ₺${(totalRevenue - refunds).toLocaleString('tr-TR', {maximumFractionDigits: 2})}

========================================
TRANSACTION DETAILS
========================================
`;
        
        tickets.forEach((t, idx) => {
            pdfContent += `
Transaction #${idx + 1}
ID: ${t.ticketNumber || 'TXN-' + idx}
Passenger: ${t.passenger?.name || 'N/A'}
Amount: ₺${(t.finalPrice || 0).toLocaleString('tr-TR', {maximumFractionDigits: 2})}
Method: ${t.paymentMethod || 'Credit Card'}
Status: ${t.isCancelled ? 'REFUNDED' : 'SUCCESS'}
Date: ${new Date(t.bookingDate || Date.now()).toLocaleString('tr-TR')}
Flight: ${t.flight?.number || 'N/A'}
---`;
        });
        
        pdfContent += `

========================================
END OF REPORT
========================================
`;
        
        this.downloadFile(pdfContent, `payment_report_${startDate}_to_${endDate}.txt`);
        this.showNotification('Report generated and downloaded successfully!', 'success');
    }
    
    downloadFile(content, filename) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    
    loadAdmins() {
        const admins = this.getAdmins();
        const tbody = document.getElementById('adminsTableBody');
        
        if (admins.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No admin data. Click "Add Admin" to create one.</td></tr>';
            return;
        }
        
        tbody.innerHTML = admins.map(admin => `
            <tr>
                <td>${admin.username}</td>
                <td>${admin.email}</td>
                <td><span class="status-badge">${admin.role}</span></td>
                <td>${admin.lastLogin ? new Date(admin.lastLogin).toLocaleString('tr-TR') : 'Never'}</td>
                <td><span class="status-badge ${admin.isActive ? 'active' : 'inactive'}">${admin.isActive ? 'ACTIVE' : 'INACTIVE'}</span></td>
                <td>
                    <button class="action-btn edit" onclick="adminDashboard.editAdmin('${admin.username}')">Edit</button>
                    <button class="action-btn delete" onclick="adminDashboard.deleteAdmin('${admin.username}')">Delete</button>
                </td>
            </tr>
        `).join('');
        
        this.loadAdminLogs();
    }
    
    getAdmins() {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('admins');
            if (stored) {
                return JSON.parse(stored);
            }
        }
        return [];
    }
    
    saveAdmin(admin) {
        const existing = this.getAdmins();
        const index = existing.findIndex(a => a.username === admin.username);
        if (index >= 0) {
            existing[index] = admin;
        } else {
            existing.push(admin);
        }
        localStorage.setItem('admins', JSON.stringify(existing));
        this.loadAdmins();
        this.showNotification('Admin saved successfully!', 'success');
    }
    
    deleteAdmin(username) {
        if (confirm('Are you sure you want to delete this admin?')) {
            const admins = this.getAdmins().filter(a => a.username !== username);
            localStorage.setItem('admins', JSON.stringify(admins));
            this.loadAdmins();
            this.showNotification('Admin deleted!', 'success');
        }
    }
    
    editAdmin(username) {
        const admin = this.getAdmins().find(a => a.username === username);
        if (admin) {
            this.showEditAdminModal(admin);
        }
    }
    
    loadAdminLogs() {
        const admins = this.getAdmins();
        const logsBody = document.getElementById('logsTableBody');
        
        if (admins.length === 0) {
            logsBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px;">No activity logs</td></tr>';
            return;
        }
        
        let logs = [];
        admins.forEach(admin => {
            if (admin.activityLogs && admin.activityLogs.length > 0) {
                admin.activityLogs.forEach(log => {
                    logs.push({
                        admin: admin.username,
                        action: log.action,
                        description: log.description,
                        timestamp: log.timestamp
                    });
                });
            }
        });
        
        if (logs.length === 0) {
            logsBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px;">No activity logs</td></tr>';
            return;
        }
        
        logsBody.innerHTML = logs.map(log => `
            <tr>
                <td>${log.admin}</td>
                <td>${log.action}</td>
                <td>${log.description}</td>
                <td>${new Date(log.timestamp).toLocaleString('tr-TR')}</td>
            </tr>
        `).join('');
    }
    
    loadReports() {
        document.getElementById('revenueReportBody').innerHTML = '<tr><td colspan="3">No report data</td></tr>';
    }
    
    loadSettings() {
        document.getElementById('currencySetting').value = 'TRY';
    }
    
    generatePaymentReport() {
        this.showNotification('Report generated!', 'success');
    }
    
    showNotificationForm() {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Send Notification</h2>
            <form style="margin-top: 20px;">
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" id="notificationSubject" required>
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea id="notificationMessage" required></textarea>
                </div>
                <button type="button" class="btn-primary" onclick="adminDashboard.sendNotification()">Send</button>
            </form>
        `;
        this.openModal();
    }
    
    sendNotification() {
        const recipientType = document.getElementById('notificationRecipient')?.value || 'all';
        const subject = document.getElementById('notificationSubject')?.value || 'Duyuru';
        const message = document.getElementById('notificationMessage')?.value || '';

        // Hedef kitleyi belirle
        const tickets = this.getRealTickets();
        const flights = this.getRealFlights();
        let targetTickets = [];

        if (recipientType === 'all') {
            targetTickets = tickets;
        } else if (recipientType === 'specific') {
            // Business yolcuları
            targetTickets = tickets.filter(t => {
                const flightNumber = t.flight?.number;
                const seatNumber = t.seat || t.seatNumber;
                if (!flightNumber || !seatNumber) return false;
                const flight = flights.find(f => f.number === flightNumber);
                const seatInfo = flight?.seats?.[seatNumber];
                return seatInfo?.class === 'BUSINESS';
            });
        } else if (recipientType === 'flight') {
            // Economy yolcuları
            targetTickets = tickets.filter(t => {
                const flightNumber = t.flight?.number;
                const seatNumber = t.seat || t.seatNumber;
                if (!flightNumber || !seatNumber) return false;
                const flight = flights.find(f => f.number === flightNumber);
                const seatInfo = flight?.seats?.[seatNumber];
                return seatInfo?.class === 'ECONOMY';
            });
        }

        const audienceLabel = recipientType === 'all'
            ? 'All Passengers'
            : recipientType === 'specific'
                ? 'Business Passengers'
                : 'Economy Passengers';

        const entry = {
            id: Date.now(),
            subject,
            message,
            date: new Date().toLocaleString('tr-TR'),
            recipientType,
            audienceLabel,
            audienceCount: targetTickets.length
        };
        const announcements = this.getAnnouncements();
        announcements.push(entry);
        this.saveAnnouncements(announcements);
        this.renderNotifications(announcements);
        this.showNotification('Notification sent!', 'success');
        this.closeModal();
    }
    
    showAddAdminModal() {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Add New Admin</h2>
            <form id="adminForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" id="adminUsername" placeholder="e.g., admin1" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="adminEmail" placeholder="e.g., admin@airline.com" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="adminPassword" placeholder="Enter password" required>
                </div>
                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" id="adminPasswordConfirm" placeholder="Confirm password" required>
                </div>
                <div class="form-group">
                    <label>Permission Level</label>
                    <select id="adminRole" required>
                        <option value="SUPER_ADMIN">Super Admin</option>
                        <option value="OPERATIONS">Operations</option>
                        <option value="ACCOUNTING">Accounting</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="adminActive" checked>
                        Active
                    </label>
                </div>
                <button type="button" class="btn-primary" onclick="adminDashboard.saveNewAdmin()">Create Admin</button>
            </form>
        `;
        this.openModal();
    }
    
    saveNewAdmin() {
        const username = document.getElementById('adminUsername').value;
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        const passwordConfirm = document.getElementById('adminPasswordConfirm').value;
        const role = document.getElementById('adminRole').value;
        const isActive = document.getElementById('adminActive').checked;
        
        if (!username || !email || !password) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (password !== passwordConfirm) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            return;
        }
        
        const existingAdmins = this.getAdmins();
        if (existingAdmins.some(a => a.username === username)) {
            this.showNotification('Username already exists', 'error');
            return;
        }
        
        const admin = {
            username,
            email,
            password,
            role,
            isActive,
            lastLogin: new Date(),
            activityLogs: [{
                action: 'CREATED',
                description: 'Admin account created',
                timestamp: new Date()
            }]
        };
        
        this.saveAdmin(admin);
        this.closeModal();
    }
    
    showEditAdminModal(admin) {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Edit Admin</h2>
            <form id="adminForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" id="adminUsername" value="${admin.username}" disabled>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="adminEmail" value="${admin.email}" required>
                </div>
                <div class="form-group">
                    <label>Permission Level</label>
                    <select id="adminRole" required>
                        <option value="SUPER_ADMIN" ${admin.role === 'SUPER_ADMIN' ? 'selected' : ''}>Super Admin</option>
                        <option value="OPERATIONS" ${admin.role === 'OPERATIONS' ? 'selected' : ''}>Operations</option>
                        <option value="ACCOUNTING" ${admin.role === 'ACCOUNTING' ? 'selected' : ''}>Accounting</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="adminActive" ${admin.isActive ? 'checked' : ''}>
                        Active
                    </label>
                </div>
                <button type="button" class="btn-primary" onclick="adminDashboard.saveEditedAdmin('${admin.username}')">Update Admin</button>
            </form>
        `;
        this.openModal();
    }
    
    saveEditedAdmin(username) {
        const email = document.getElementById('adminEmail').value;
        const role = document.getElementById('adminRole').value;
        const isActive = document.getElementById('adminActive').checked;
        
        if (!email) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const admins = this.getAdmins();
        const admin = admins.find(a => a.username === username);
        
        if (admin) {
            admin.email = email;
            admin.role = role;
            admin.isActive = isActive;
            
            if (!admin.activityLogs) {
                admin.activityLogs = [];
            }
            admin.activityLogs.push({
                action: 'UPDATED',
                description: 'Admin profile updated',
                timestamp: new Date()
            });
            
            localStorage.setItem('admins', JSON.stringify(admins));
            this.loadAdmins();
            this.showNotification('Admin updated successfully!', 'success');
            this.closeModal();
        }
    }
    
    showAddAircraftModal() {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Add New Aircraft</h2>
            <form id="aircraftForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label>Aircraft ID</label>
                    <input type="text" id="aircraftId" placeholder="e.g., A320-001" required>
                </div>
                <div class="form-group">
                    <label>Aircraft Model</label>
                    <input type="text" id="aircraftModel" placeholder="e.g., Airbus A320" required>
                </div>
                <div class="form-group">
                    <label>Total Seats</label>
                    <input type="number" id="totalSeats" min="50" max="500" required>
                </div>
                <div class="form-group">
                    <label>Business Class Seats</label>
                    <input type="number" id="businessSeats" min="0" required>
                </div>
                <div class="form-group">
                    <label>Economy Class Seats</label>
                    <input type="number" id="economySeats" min="0" required>
                </div>
                <button type="button" class="btn-primary" onclick="adminDashboard.saveNewAircraft()">Save Aircraft</button>
            </form>
        `;
        this.openModal();
    }
    
    saveNewAircraft() {
        const aircraftId = document.getElementById('aircraftId').value;
        const model = document.getElementById('aircraftModel').value;
        const totalSeats = parseInt(document.getElementById('totalSeats').value);
        const businessSeats = parseInt(document.getElementById('businessSeats').value);
        const economySeats = parseInt(document.getElementById('economySeats').value);
        
        if (!aircraftId || !model) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (businessSeats + economySeats !== totalSeats) {
            this.showNotification('Business + Economy seats must equal Total seats', 'error');
            return;
        }
        
        const aircraft = {
            aircraftId,
            model,
            totalSeats,
            businessSeats,
            economySeats
        };
        
        this.saveAircraft(aircraft);
        this.closeModal();
    }
    
    showEditAircraftModal(aircraft) {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Edit Aircraft</h2>
            <form id="aircraftForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label>Aircraft ID</label>
                    <input type="text" id="aircraftId" value="${aircraft.aircraftId}" disabled>
                </div>
                <div class="form-group">
                    <label>Aircraft Model</label>
                    <input type="text" id="aircraftModel" value="${aircraft.model}" required>
                </div>
                <div class="form-group">
                    <label>Total Seats</label>
                    <input type="number" id="totalSeats" value="${aircraft.totalSeats}" min="50" max="500" required>
                </div>
                <div class="form-group">
                    <label>Business Class Seats</label>
                    <input type="number" id="businessSeats" value="${aircraft.businessSeats}" min="0" required>
                </div>
                <div class="form-group">
                    <label>Economy Class Seats</label>
                    <input type="number" id="economySeats" value="${aircraft.economySeats}" min="0" required>
                </div>
                <button type="button" class="btn-primary" onclick="adminDashboard.saveEditedAircraft('${aircraft.aircraftId}')">Update Aircraft</button>
            </form>
        `;
        this.openModal();
    }
    
    saveEditedAircraft(aircraftId) {
        const model = document.getElementById('aircraftModel').value;
        const totalSeats = parseInt(document.getElementById('totalSeats').value);
        const businessSeats = parseInt(document.getElementById('businessSeats').value);
        const economySeats = parseInt(document.getElementById('economySeats').value);
        
        if (!model) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (businessSeats + economySeats !== totalSeats) {
            this.showNotification('Business + Economy seats must equal Total seats', 'error');
            return;
        }
        
        const aircraft = {
            aircraftId,
            model,
            totalSeats,
            businessSeats,
            economySeats
        };
        
        this.saveAircraft(aircraft);
        this.closeModal();
    }
    
    showAddCampaignModal() {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Add New Campaign</h2>
            <form id="campaignForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label>Campaign ID</label>
                    <input type="text" id="campaignId" placeholder="e.g., CAMP001" required>
                </div>
                <div class="form-group">
                    <label>Campaign Name</label>
                    <input type="text" id="campaignName" placeholder="e.g., Summer Sale" required>
                </div>
                <div class="form-group">
                    <label>Discount Code</label>
                    <input type="text" id="discountCode" placeholder="e.g., SUMMER20" required>
                </div>
                <div class="form-group">
                    <label>Discount Percentage (%)</label>
                    <input type="number" id="discountPercentage" min="0" max="100" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="date" id="startDate" required>
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="date" id="endDate" required>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="campaignActive" checked>
                        Active
                    </label>
                </div>
                <button type="button" class="btn-primary" onclick="adminDashboard.saveNewCampaign()">Save Campaign</button>
            </form>
        `;
        this.openModal();
    }
    
    saveNewCampaign() {
        const campaignId = document.getElementById('campaignId').value;
        const name = document.getElementById('campaignName').value;
        const discountCode = document.getElementById('discountCode').value;
        const discountPercentage = parseFloat(document.getElementById('discountPercentage').value);
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const active = document.getElementById('campaignActive').checked;
        
        if (!campaignId || !name || !discountCode) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (new Date(startDate) > new Date(endDate)) {
            this.showNotification('Start date must be before end date', 'error');
            return;
        }
        
        const campaign = {
            campaignId,
            name,
            discountCode,
            discountPercentage,
            startDate,
            endDate,
            active
        };
        
        this.saveCampaign(campaign);
        this.closeModal();
    }
    
    showEditCampaignModal(campaign) {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Edit Campaign</h2>
            <form id="campaignForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label>Campaign ID</label>
                    <input type="text" id="campaignId" value="${campaign.campaignId}" disabled>
                </div>
                <div class="form-group">
                    <label>Campaign Name</label>
                    <input type="text" id="campaignName" value="${campaign.name}" required>
                </div>
                <div class="form-group">
                    <label>Discount Code</label>
                    <input type="text" id="discountCode" value="${campaign.discountCode}" required>
                </div>
                <div class="form-group">
                    <label>Discount Percentage (%)</label>
                    <input type="number" id="discountPercentage" value="${campaign.discountPercentage}" min="0" max="100" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="date" id="startDate" value="${campaign.startDate || ''}" required>
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="date" id="endDate" value="${campaign.endDate || ''}" required>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="campaignActive" ${campaign.active ? 'checked' : ''}>
                        Active
                    </label>
                </div>
                <button type="button" class="btn-primary" onclick="adminDashboard.saveEditedCampaign('${campaign.campaignId}')">Update Campaign</button>
            </form>
        `;
        this.openModal();
    }
    
    saveEditedCampaign(campaignId) {
        const name = document.getElementById('campaignName').value;
        const discountCode = document.getElementById('discountCode').value;
        const discountPercentage = parseFloat(document.getElementById('discountPercentage').value);
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const active = document.getElementById('campaignActive').checked;
        
        if (!name || !discountCode) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (new Date(startDate) > new Date(endDate)) {
            this.showNotification('Start date must be before end date', 'error');
            return;
        }
        
        const campaign = {
            campaignId,
            name,
            discountCode,
            discountPercentage,
            startDate,
            endDate,
            active
        };
        
        this.saveCampaign(campaign);
        this.closeModal();
    }
    
    saveSystemSettings() {
        this.showNotification('Settings saved!', 'success');
    }
    
    handleTabSwitch(e) {
        const tabName = e.target.getAttribute('data-tab');
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(tabName)?.classList.add('active');
    }
    
    openModal() {
        document.getElementById('modal').classList.add('active');
    }
    
    closeModal() {
        document.getElementById('modal').classList.remove('active');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 2000;
            animation: slideIn 0.3s ease-in;
            ${type === 'success' ? 'background-color: #10b981;' : ''}
            ${type === 'error' ? 'background-color: #ef4444;' : ''}
            ${type === 'warning' ? 'background-color: #f59e0b;' : ''}
            ${type === 'info' ? 'background-color: #0066cc;' : ''}
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('adminUser');
            window.location.reload();
        }
    }
    
    setupEventListeners() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
        });
        
        document.getElementById('refreshDashboard')?.addEventListener('click', () => this.loadDashboardData());
        document.getElementById('addFlightBtn')?.addEventListener('click', () => this.showAddFlightModal());
        document.getElementById('flightSearch')?.addEventListener('input', (e) => this.filterFlights(e.target.value));
        document.getElementById('flightStatusFilter')?.addEventListener('change', (e) => this.filterFlightsByStatus(e.target.value));
        document.getElementById('addAircraftBtn')?.addEventListener('click', () => this.showAddAircraftModal());
        document.getElementById('reservationSearch')?.addEventListener('input', (e) => this.filterReservations(e.target.value));
        document.getElementById('reservationStatusFilter')?.addEventListener('change', (e) => this.filterReservationsByStatus(e.target.value));
        document.getElementById('passengerSearch')?.addEventListener('input', (e) => this.filterPassengers(e.target.value));
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTabSwitch(e));
        });
        document.getElementById('addCampaignBtn')?.addEventListener('click', () => this.showAddCampaignModal());
        document.getElementById('generatePaymentReport')?.addEventListener('click', () => this.generatePaymentReport());
        document.getElementById('sendNotificationBtn')?.addEventListener('click', () => this.showNotificationForm());
        document.getElementById('sendNotificationConfirm')?.addEventListener('click', () => this.sendNotification());
        document.getElementById('addAdminBtn')?.addEventListener('click', () => this.showAddAdminModal());
        document.getElementById('saveSettingsBtn')?.addEventListener('click', () => this.saveSystemSettings());
        document.querySelector('.close')?.addEventListener('click', () => this.closeModal());
        document.getElementById('modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'modal') this.closeModal();
        });
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.logout());
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme') || 'dark';
        
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.textContent = '☀️';
            this.isDarkMode = false;
        }
        
        themeToggle?.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            this.isDarkMode = !this.isDarkMode;
            localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
            themeToggle.textContent = this.isDarkMode ? '🌙' : '☀️';
        });
    }
    
    handleNavigation(e) {
        e.preventDefault();
        const section = e.currentTarget.getAttribute('data-section');
        
        // Check role-based access
        const currentUser = JSON.parse(localStorage.getItem('adminUser'));
        if (currentUser) {
            const targetSection = document.getElementById(section);
            if (targetSection && targetSection.hasAttribute('data-roles')) {
                const allowedRoles = targetSection.getAttribute('data-roles').split(',').map(r => r.trim());
                if (!allowedRoles.includes(currentUser.role)) {
                    alert('You do not have permission to access this section.');
                    return;
                }
            }
        }
        
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Hide all sections first
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
            sec.style.display = 'none';
        });
        
        // Show only the selected section
        const targetSectionEl = document.getElementById(section);
        if (targetSectionEl) {
            targetSectionEl.classList.add('active');
            targetSectionEl.style.display = 'block';
        }
        
        if (section === 'dashboard') this.loadDashboardData();
        else if (section === 'flights') this.loadFlights();
        else if (section === 'aircraft') this.loadAircraft();
        else if (section === 'reservations') this.loadReservations();
        else if (section === 'passengers') this.loadPassengers();
        else if (section === 'pricing') this.loadCampaigns();
        else if (section === 'payments') this.loadPayments();
        else if (section === 'admins') this.loadAdmins();
        else if (section === 'reports') this.loadReports();
        else if (section === 'settings') this.loadSettings();
        else if (section === 'notifications') this.loadNotifications();
    }

    loadNotifications() {
        const list = this.getAnnouncements();
        this.renderNotifications(list);
    }

    getAnnouncements() {
        try {
            const stored = JSON.parse(localStorage.getItem('announcements'));
            return Array.isArray(stored) ? stored : [];
        } catch (e) {
            console.error('Announcements could not be read', e);
            return [];
        }
    }

    saveAnnouncements(list) {
        try {
            localStorage.setItem('announcements', JSON.stringify(list));
        } catch (e) {
            console.error('Announcements could not be saved', e);
        }
    }

    renderNotifications(list) {
        const container = document.getElementById('notificationsList');
        if (!container) return;
        if (!list.length) {
            container.innerHTML = '<p style="opacity:0.7;">No notifications yet.</p>';
            return;
        }
        const latest = list.slice(-20).reverse();
        container.innerHTML = latest.map(item => `
            <div class="notification-card">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <strong>${item.subject || 'Duyuru'}</strong>
                    <small>${item.date || ''}</small>
                </div>
                <p style="margin-top:8px;">${item.message || ''}</p>
            </div>
        `).join('');
    }
}

// Weather functionality for admin
function initializeAdminWeather() {
    const weatherWidget = document.getElementById('admin-weather-widget');
    const weatherIcon = document.getElementById('admin-weather-icon');
    const weatherLocation = document.getElementById('admin-weather-location');
    const weatherTemp = document.getElementById('admin-weather-temp');
    const weatherCondition = document.getElementById('admin-weather-condition');
    const weatherWarning = document.getElementById('admin-weather-warning');
    const warningText = document.getElementById('admin-warning-text');
    
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
        const existingSnow = weatherWidget.querySelectorAll('.admin-snow-flake');
        const existingRain = weatherWidget.querySelectorAll('.admin-rain-drop');
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
                snowFlake.className = 'admin-snow-flake';
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
                rainDrop.className = 'admin-rain-drop';
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
                warningMsg = `Stormy weather detected in ${assignedCity}. Please monitor flight operations carefully.`;
            } else if (randomWeather.condition === 'Foggy') {
                warningMsg = `Foggy conditions detected in ${assignedCity}. Flight delays may occur. Monitor visibility conditions.`;
            } else if (randomWeather.condition === 'Snowy') {
                warningMsg = `Snowy weather detected in ${assignedCity}. Check runway conditions and consider flight delays.`;
            } else if (randomWeather.condition === 'Heavy Snow') {
                warningMsg = `Heavy snow detected in ${assignedCity}. Significant flight delays expected. Review all scheduled flights.`;
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

// Initialize admin dashboard
let adminDashboard;
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize dashboard if user is authenticated
    const currentUser = localStorage.getItem('adminUser');
    if (currentUser) {
        adminDashboard = new AdminDashboard();
        initializeAdminWeather();
    }
});
