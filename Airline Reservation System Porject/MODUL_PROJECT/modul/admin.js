// ===== NAVIGATION =====
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const sectionTitle = document.getElementById('section-title');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetSection = item.getAttribute('data-section');

        // Update active nav
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Show target section
        sections.forEach(section => section.classList.remove('visible'));
        const target = document.getElementById(`section-${targetSection}`);
        if (target) {
            target.classList.add('visible');
            sectionTitle.textContent = item.textContent;
        }
    });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
});

// ===== DUMMY DATA =====
const dummyData = {
    kpis: {
        totalReservations: 1247,
        todayRevenue: 45320,
        monthRevenue: 892450,
        loadFactor: 78,
        activeFlights: 42
    },
    topRoutes: [
        { route: 'Istanbul → Ankara', ticketsSold: 342, revenue: 119700 },
        { route: 'Istanbul → Izmir', ticketsSold: 298, revenue: 89400 },
        { route: 'Ankara → Istanbul', ticketsSold: 276, revenue: 96600 },
        { route: 'Izmir → Antalya', ticketsSold: 189, revenue: 47250 },
        { route: 'Antalya → Istanbul', ticketsSold: 142, revenue: 39760 }
    ],
    flights: [
        { flightNo: 'TK1001', departure: 'Istanbul (IST)', arrival: 'Ankara (ESB)', time: '2025-01-15 08:00', aircraft: 'A320', totalSeats: 180, business: 20, economy: 160, status: 'ACTIVE' },
        { flightNo: 'TK1002', departure: 'Istanbul (IST)', arrival: 'Izmir (ADB)', time: '2025-01-15 10:30', aircraft: 'B737', totalSeats: 189, business: 16, economy: 173, status: 'ACTIVE' },
        { flightNo: 'TK1003', departure: 'Ankara (ESB)', arrival: 'Antalya (AYT)', time: '2025-01-15 14:00', aircraft: 'A321', totalSeats: 220, business: 24, economy: 196, status: 'DELAYED' }
    ],
    aircraft: [
        { name: 'Airbus A320', code: 'A320', totalSeats: 180, business: 20, economy: 160, status: 'Active' },
        { name: 'Boeing 737', code: 'B737', totalSeats: 189, business: 16, economy: 173, status: 'Active' },
        { name: 'Airbus A321', code: 'A321', totalSeats: 220, business: 24, economy: 196, status: 'Maintenance' }
    ],
    reservations: [
        { pnr: 'RES1704567890123', passenger: 'Ahmet Yılmaz', flight: 'TK1001', seat: '12A', ticketType: 'Full', status: 'CONFIRMED', payment: 'Paid', bookingTime: '2025-01-10 14:23' },
        { pnr: 'RES1704567890456', passenger: 'Ayşe Demir', flight: 'TK1002', seat: '8C', ticketType: 'Student', status: 'CONFIRMED', payment: 'Paid', bookingTime: '2025-01-11 09:15' },
        { pnr: 'RES1704567890789', passenger: 'Mehmet Kaya', flight: 'TK1003', seat: '15F', ticketType: 'Retired', status: 'CANCELLED', payment: 'Refunded', bookingTime: '2025-01-12 16:42' }
    ],
    passengers: [
        { id: '12345678901', name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '+90 555 123 4567', totalFlights: 12, cancellations: 1, noShows: 0, blacklist: 'NORMAL' },
        { id: '98765432109', name: 'Ayşe Demir', email: 'ayse@example.com', phone: '+90 555 987 6543', totalFlights: 8, cancellations: 0, noShows: 0, blacklist: 'NORMAL' },
        { id: '11223344556', name: 'Mehmet Kaya', email: 'mehmet@example.com', phone: '+90 555 111 2233', totalFlights: 3, cancellations: 2, noShows: 1, blacklist: 'BLACKLISTED' }
    ],
    routePricing: [
        { route: 'Istanbul → Ankara', basePrice: 350 },
        { route: 'Istanbul → Izmir', basePrice: 300 },
        { route: 'Ankara → Antalya', basePrice: 400 }
    ],
    datePricing: [
        { dateRange: '2025-06-01 to 2025-08-31', multiplier: '1.5x', description: 'Summer Season' },
        { dateRange: '2025-12-20 to 2026-01-05', multiplier: '2.0x', description: 'Holiday Season' }
    ],
    discountCodes: [
        { code: 'SUMMER25', type: 'Percentage', value: '25%', validity: '2025-06-01 to 2025-08-31', status: 'Active' },
        { code: 'STUDENT10', type: 'Percentage', value: '10%', validity: 'Always', status: 'Active' }
    ],
    campaigns: [
        { name: 'Early Bird', dateRange: '2025-01-01 to 2025-03-31', target: 'All Routes', rule: '15% off if booked 30 days in advance', status: 'Active' }
    ],
    payments: [
        { paymentId: 'PAY1704567890123', pnr: 'RES1704567890123', passenger: 'Ahmet Yılmaz', amount: 350, currency: 'TRY', date: '2025-01-10 14:25', method: 'CARD', status: 'SUCCESS' },
        { paymentId: 'PAY1704567890456', pnr: 'RES1704567890456', passenger: 'Ayşe Demir', amount: 270, currency: 'TRY', date: '2025-01-11 09:17', method: 'CARD', status: 'SUCCESS' },
        { paymentId: 'PAY1704567890789', pnr: 'RES1704567890789', passenger: 'Mehmet Kaya', amount: 320, currency: 'TRY', date: '2025-01-12 16:44', method: 'VCARD', status: 'REFUNDED' }
    ],
    users: [
        { userId: 'ADM001', name: 'Admin User', email: 'admin@airline.com', role: 'Super Admin', status: 'Active', lastLogin: '2025-01-13 08:30' },
        { userId: 'OPS001', name: 'Operations Manager', email: 'ops@airline.com', role: 'Operations', status: 'Active', lastLogin: '2025-01-12 17:45' }
    ],
    airports: [
        { city: 'Istanbul', code: 'IST', name: 'Istanbul Airport' },
        { city: 'Ankara', code: 'ESB', name: 'Esenboğa Airport' },
        { city: 'Izmir', code: 'ADB', name: 'Adnan Menderes Airport' }
    ],
    activityLog: [
        { timestamp: '2025-01-13 10:15', admin: 'admin', action: 'ADD_FLIGHT', description: 'Added flight TK1004' },
        { timestamp: '2025-01-13 09:42', admin: 'admin', action: 'CANCEL_RESERVATION', description: 'Cancelled reservation RES1704567890789' },
        { timestamp: '2025-01-12 16:30', admin: 'ops', action: 'UPDATE_FLIGHT_STATUS', description: 'Updated flight TK1003 status to DELAYED' }
    ]
};

// ===== POPULATE DASHBOARD =====
function populateDashboard() {
    document.getElementById('kpi-total-reservations').textContent = dummyData.kpis.totalReservations;
    document.getElementById('kpi-today-revenue').textContent = `₺${dummyData.kpis.todayRevenue.toLocaleString()}`;
    document.getElementById('kpi-month-revenue').textContent = `₺${dummyData.kpis.monthRevenue.toLocaleString()}`;
    document.getElementById('kpi-load-factor').textContent = `${dummyData.kpis.loadFactor}%`;
    document.getElementById('kpi-active-flights').textContent = dummyData.kpis.activeFlights;

    const topRoutesBody = document.getElementById('top-routes-body');
    topRoutesBody.innerHTML = dummyData.topRoutes.map(r => `
        <tr>
            <td>${r.route}</td>
            <td>${r.ticketsSold}</td>
            <td>₺${r.revenue.toLocaleString()}</td>
        </tr>
    `).join('');
}

// ===== POPULATE FLIGHTS =====
function populateFlights() {
    const tbody = document.getElementById('flights-table-body');
    tbody.innerHTML = dummyData.flights.map(f => `
        <tr>
            <td>${f.flightNo}</td>
            <td>${f.departure}</td>
            <td>${f.arrival}</td>
            <td>${f.time}</td>
            <td>${f.aircraft}</td>
            <td>${f.totalSeats}</td>
            <td>${f.business}</td>
            <td>${f.economy}</td>
            <td><span style="color: ${f.status === 'ACTIVE' ? 'green' : 'orange'}">${f.status}</span></td>
            <td><button class="btn secondary">Edit</button></td>
        </tr>
    `).join('');
}

// ===== POPULATE AIRCRAFT =====
function populateAircraft() {
    const tbody = document.getElementById('aircraft-table-body');
    tbody.innerHTML = dummyData.aircraft.map(a => `
        <tr>
            <td>${a.name}</td>
            <td>${a.code}</td>
            <td>${a.totalSeats}</td>
            <td>${a.business}</td>
            <td>${a.economy}</td>
            <td>${a.status}</td>
            <td><button class="btn secondary">View</button></td>
            <td><button class="btn secondary">Edit</button></td>
        </tr>
    `).join('');
}

// ===== POPULATE RESERVATIONS =====
function populateReservations() {
    const tbody = document.getElementById('reservations-table-body');
    tbody.innerHTML = dummyData.reservations.map(r => `
        <tr>
            <td>${r.pnr}</td>
            <td>${r.passenger}</td>
            <td>${r.flight}</td>
            <td>${r.seat}</td>
            <td>${r.ticketType}</td>
            <td>${r.status}</td>
            <td>${r.payment}</td>
            <td>${r.bookingTime}</td>
            <td><button class="btn secondary">View</button></td>
        </tr>
    `).join('');
}

// ===== POPULATE PASSENGERS =====
function populatePassengers() {
    const tbody = document.getElementById('passengers-table-body');
    tbody.innerHTML = dummyData.passengers.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.email}</td>
            <td>${p.phone}</td>
            <td>${p.totalFlights}</td>
            <td>${p.cancellations}</td>
            <td>${p.noShows}</td>
            <td><span style="color: ${p.blacklist === 'NORMAL' ? 'green' : 'red'}">${p.blacklist}</span></td>
            <td><button class="btn secondary">View</button></td>
        </tr>
    `).join('');
}

// ===== POPULATE PRICING =====
function populatePricing() {
    document.getElementById('route-pricing-body').innerHTML = dummyData.routePricing.map(r => `
        <tr>
            <td>${r.route}</td>
            <td>₺${r.basePrice}</td>
            <td><button class="btn secondary">Edit</button></td>
        </tr>
    `).join('');

    document.getElementById('date-pricing-body').innerHTML = dummyData.datePricing.map(d => `
        <tr>
            <td>${d.dateRange}</td>
            <td>${d.multiplier}</td>
            <td>${d.description}</td>
            <td><button class="btn secondary">Edit</button></td>
        </tr>
    `).join('');

    document.getElementById('discount-codes-body').innerHTML = dummyData.discountCodes.map(c => `
        <tr>
            <td>${c.code}</td>
            <td>${c.type}</td>
            <td>${c.value}</td>
            <td>${c.validity}</td>
            <td>${c.status}</td>
            <td><button class="btn secondary">Edit</button></td>
        </tr>
    `).join('');

    document.getElementById('campaigns-body').innerHTML = dummyData.campaigns.map(c => `
        <tr>
            <td>${c.name}</td>
            <td>${c.dateRange}</td>
            <td>${c.target}</td>
            <td>${c.rule}</td>
            <td>${c.status}</td>
            <td><button class="btn secondary">Edit</button></td>
        </tr>
    `).join('');
}

// ===== POPULATE PAYMENTS =====
function populatePayments() {
    const tbody = document.getElementById('payments-table-body');
    tbody.innerHTML = dummyData.payments.map(p => `
        <tr>
            <td>${p.paymentId}</td>
            <td>${p.pnr}</td>
            <td>${p.passenger}</td>
            <td>₺${p.amount}</td>
            <td>${p.currency}</td>
            <td>${p.date}</td>
            <td>${p.method}</td>
            <td><span style="color: ${p.status === 'SUCCESS' ? 'green' : p.status === 'REFUNDED' ? 'orange' : 'red'}">${p.status}</span></td>
            <td><button class="btn secondary">View</button></td>
        </tr>
    `).join('');
}

// ===== POPULATE USERS =====
function populateUsers() {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = dummyData.users.map(u => `
        <tr>
            <td>${u.userId}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>${u.status}</td>
            <td>${u.lastLogin}</td>
            <td><button class="btn secondary">Edit</button></td>
        </tr>
    `).join('');
}

// ===== POPULATE SETTINGS =====
function populateSettings() {
    const tbody = document.getElementById('airports-table-body');
    tbody.innerHTML = dummyData.airports.map(a => `
        <tr>
            <td>${a.city}</td>
            <td>${a.code}</td>
            <td>${a.name}</td>
            <td><button class="btn secondary">Edit</button></td>
        </tr>
    `).join('');
}

// ===== POPULATE ACTIVITY LOG =====
function populateActivityLog() {
    const tbody = document.getElementById('activity-log-body');
    tbody.innerHTML = dummyData.activityLog.map(log => `
        <tr>
            <td>${log.timestamp}</td>
            <td>${log.admin}</td>
            <td>${log.action}</td>
            <td>${log.description}</td>
        </tr>
    `).join('');
}

// ===== POPULATE REPORTS =====
function populateReports() {
    document.getElementById('report-routes-body').innerHTML = dummyData.topRoutes.map(r => `
        <tr>
            <td>${r.route}</td>
            <td>₺${r.revenue.toLocaleString()}</td>
            <td>${r.ticketsSold}</td>
            <td>₺${Math.round(r.revenue / r.ticketsSold)}</td>
        </tr>
    `).join('');

    document.getElementById('report-busiest-dates-body').innerHTML = `
        <tr><td>2025-01-15</td><td>12</td><td>1847</td></tr>
        <tr><td>2025-01-20</td><td>10</td><td>1523</td></tr>
        <tr><td>2025-01-25</td><td>9</td><td>1402</td></tr>
    `;
}

// ===== INIT =====
populateDashboard();
populateFlights();
populateAircraft();
populateReservations();
populatePassengers();
populatePricing();
populatePayments();
populateUsers();
populateSettings();
populateActivityLog();
populateReports();