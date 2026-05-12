import java.util.*;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.stream.Collectors;

public class AdminPanel {
    private FlightBookingSystem bookingSystem;
    private List<Admin> adminUsers;
    private Admin currentAdmin;
    private Map<String, Aircraft> aircraftFleet;
    private Map<String, Campaign> campaigns;
    private Map<String, SystemSetting> systemSettings;
    private Map<String, PaymentAccount> paymentAccounts;
    private List<Notification> notifications;
    private List<Announcement> announcements;
    private List<String> cities;
    
    public AdminPanel(FlightBookingSystem bookingSystem) {
        this.bookingSystem = bookingSystem;
        this.adminUsers = new ArrayList<>();
        this.aircraftFleet = new HashMap<>();
        this.campaigns = new HashMap<>();
        this.systemSettings = new HashMap<>();
        this.paymentAccounts = new HashMap<>();
        this.notifications = new ArrayList<>();
        this.announcements = new ArrayList<>();
        this.cities = new ArrayList<>();
        initializeDefaults();
    }
    
    private void initializeDefaults() {
        addAircraft(new Aircraft("A320-001", "Airbus A320", 180, 150, 30));
        addAircraft(new Aircraft("B737-001", "Boeing 737", 160, 130, 30));
        addAircraft(new Aircraft("B777-001", "Boeing 777", 350, 250, 100));
        
        systemSettings.put("currency", new SystemSetting("currency", "TRY", "Turkish Lira"));
        systemSettings.put("taxRate", new SystemSetting("taxRate", "0.18", "18% KDV"));
        systemSettings.put("timezone", new SystemSetting("timezone", "Europe/Istanbul", "Istanbul Timezone"));
        systemSettings.put("maintenanceMode", new SystemSetting("maintenanceMode", "false", "System Maintenance"));
        
        initializeCities();
        initializePaymentAccounts();
    }
    
    private void initializeCities() {
        cities.add("Istanbul");
        cities.add("Ankara");
        cities.add("Izmir");
        cities.add("Antalya");
        cities.add("Bodrum");
        cities.add("Dalaman");
        cities.add("Gaziantep");
        cities.add("Adana");
        cities.add("Trabzon");
        cities.add("Kayseri");
    }
    
    private void initializePaymentAccounts() {
        addPaymentAccount(new PaymentAccount("ACC001", "Bank Account 1", "Bank Transfer", true));
        addPaymentAccount(new PaymentAccount("ACC002", "Credit Card Gateway", "Credit Card", true));
        addPaymentAccount(new PaymentAccount("ACC003", "PayPal Account", "PayPal", true));
    }
    
    // ============ DASHBOARD ANALYTICS ============
    public DashboardData getDashboardData() {
        DashboardData dashboard = new DashboardData();
        
        List<Ticket> allTickets = bookingSystem.getAllTickets();
        List<Flight> allFlights = bookingSystem.getFlights();
        
        dashboard.setTotalReservations(allTickets.size());
        dashboard.setActiveFlights(countActiveFlights());
        dashboard.setOccupancyRate(calculateOccupancyRate());
        dashboard.setDailyRevenue(calculateDailyRevenue());
        dashboard.setMonthlyRevenue(calculateMonthlyRevenue());
        dashboard.setTopRoutes(getTopRoutes(5));
        dashboard.setCancellationRate(calculateCancellationRate());
        dashboard.setRevenueByMonth(getMonthlyRevenueData());
        dashboard.setReservationTrend(getReservationTrend());
        
        return dashboard;
    }
    
    private int countActiveFlights() {
        return (int) bookingSystem.getFlights().stream()
                .filter(f -> f.getFlightStatus().equals("ACTIVE"))
                .count();
    }
    
    private double calculateOccupancyRate() {
        List<Flight> flights = bookingSystem.getFlights();
        if (flights.isEmpty()) return 0;
        
        double totalSeats = flights.stream().mapToDouble(Flight::getTotalSeats).sum();
        double bookedSeats = bookingSystem.getAllTickets().size();
        
        return (bookedSeats / totalSeats) * 100;
    }
    
    private double calculateDailyRevenue() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String today = sdf.format(new Date());
        
        return bookingSystem.getAllTickets().stream()
                .filter(t -> sdf.format(t.getBookingDate()).equals(today))
                .mapToDouble(Ticket::getPrice)
                .sum();
    }
    
    private double calculateMonthlyRevenue() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        String currentMonth = sdf.format(new Date());
        
        return bookingSystem.getAllTickets().stream()
                .filter(t -> sdf.format(t.getBookingDate()).equals(currentMonth))
                .mapToDouble(Ticket::getPrice)
                .sum();
    }
    
    private List<RouteData> getTopRoutes(int limit) {
        return bookingSystem.getAllTickets().stream()
                .collect(Collectors.groupingBy(
                        t -> t.getFlight().getDepartureCity() + " → " + t.getFlight().getDestinationCity(),
                        Collectors.counting()
                ))
                .entrySet().stream()
                .sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))
                .limit(limit)
                .map(e -> new RouteData(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
    }
    
    private double calculateCancellationRate() {
        List<Ticket> allTickets = bookingSystem.getAllTickets();
        if (allTickets.isEmpty()) return 0;
        
        long cancelled = allTickets.stream()
                .filter(t -> t.getStatus().equals("CANCELLED"))
                .count();
        
        return (cancelled / (double) allTickets.size()) * 100;
    }
    
    private Map<String, Double> getMonthlyRevenueData() {
        Map<String, Double> monthlyData = new LinkedHashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        
        bookingSystem.getAllTickets().stream()
                .collect(Collectors.groupingBy(
                        t -> sdf.format(t.getBookingDate()),
                        Collectors.summingDouble(Ticket::getPrice)
                ))
                .forEach(monthlyData::put);
        
        return monthlyData;
    }
    
    private List<Integer> getReservationTrend() {
        List<Integer> trend = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        
        for (int i = 6; i >= 0; i--) {
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DATE, -i);
            String date = sdf.format(cal.getTime());
            
            int count = (int) bookingSystem.getAllTickets().stream()
                    .filter(t -> sdf.format(t.getBookingDate()).equals(date))
                    .count();
            trend.add(count);
        }
        
        return trend;
    }
    
    // ============ FLIGHT MANAGEMENT ============
    public void addFlight(Flight flight) {
        bookingSystem.addFlight(flight);
    }
    
    public void editFlight(String flightNumber, Flight updatedFlight) {
        List<Flight> flights = bookingSystem.getFlights();
        for (int i = 0; i < flights.size(); i++) {
            if (flights.get(i).getFlightNumber().equals(flightNumber)) {
                flights.set(i, updatedFlight);
                break;
            }
        }
    }
    
    public void deleteFlight(String flightNumber) {
        bookingSystem.getFlights().removeIf(f -> f.getFlightNumber().equals(flightNumber));
    }
    
    public List<Flight> getAllFlights() {
        return bookingSystem.getFlights();
    }
    
    public void updateFlightStatus(String flightNumber, String status) {
        bookingSystem.getFlights().stream()
                .filter(f -> f.getFlightNumber().equals(flightNumber))
                .forEach(f -> f.setFlightStatus(status));
    }
    
    // ============ AIRCRAFT & SEAT MANAGEMENT ============
    public void addAircraft(Aircraft aircraft) {
        aircraftFleet.put(aircraft.getAircraftId(), aircraft);
    }
    
    public Aircraft getAircraft(String aircraftId) {
        return aircraftFleet.get(aircraftId);
    }
    
    public List<Aircraft> getAllAircraft() {
        return new ArrayList<>(aircraftFleet.values());
    }
    
    public void deleteAircraft(String aircraftId) {
        aircraftFleet.remove(aircraftId);
    }
    
    // ============ RESERVATION MANAGEMENT ============
    public List<Ticket> getAllReservations() {
        return bookingSystem.getAllTickets();
    }
    
    public Ticket getReservationByPNR(String pnr) {
        return bookingSystem.getAllTickets().stream()
                .filter(t -> t.getTicketNumber().equals(pnr))
                .findFirst()
                .orElse(null);
    }
    
    public void cancelReservation(String ticketNumber) {
        Ticket ticket = getReservationByPNR(ticketNumber);
        if (ticket != null) {
            ticket.setStatus("CANCELLED");
        }
    }
    
    public void updateReservation(String ticketNumber, String newFlightNumber) {
        Ticket ticket = getReservationByPNR(ticketNumber);
        if (ticket != null) {
            Flight newFlight = bookingSystem.getFlights().stream()
                    .filter(f -> f.getFlightNumber().equals(newFlightNumber))
                    .findFirst()
                    .orElse(null);
            if (newFlight != null) {
                ticket.setFlight(newFlight);
            }
        }
    }
    
    public int getNoShowCount() {
        return (int) bookingSystem.getAllTickets().stream()
                .filter(t -> t.getStatus().equals("NO_SHOW"))
                .count();
    }
    
    // ============ PASSENGER MANAGEMENT ============
    public List<PassengerProfile> getAllPassengers() {
        Set<String> uniquePassengers = new HashSet<>();
        List<PassengerProfile> profiles = new ArrayList<>();
        
        for (Ticket ticket : bookingSystem.getAllTickets()) {
            String passengerId = ticket.getPassenger().getEmail();
            if (!uniquePassengers.contains(passengerId)) {
                uniquePassengers.add(passengerId);
                PassengerProfile profile = new PassengerProfile(ticket.getPassenger());
                profile.setTotalFlights(countPassengerFlights(passengerId));
                profiles.add(profile);
            }
        }
        
        return profiles;
    }
    
    private int countPassengerFlights(String email) {
        return (int) bookingSystem.getAllTickets().stream()
                .filter(t -> t.getPassenger().getEmail().equals(email))
                .count();
    }
    
    public PassengerProfile getPassengerProfile(String email) {
        Ticket ticket = bookingSystem.getAllTickets().stream()
                .filter(t -> t.getPassenger().getEmail().equals(email))
                .findFirst()
                .orElse(null);
        
        if (ticket != null) {
            PassengerProfile profile = new PassengerProfile(ticket.getPassenger());
            profile.setTotalFlights(countPassengerFlights(email));
            profile.setFlightHistory(getPassengerFlightHistory(email));
            return profile;
        }
        return null;
    }
    
    private List<Ticket> getPassengerFlightHistory(String email) {
        return bookingSystem.getAllTickets().stream()
                .filter(t -> t.getPassenger().getEmail().equals(email))
                .collect(Collectors.toList());
    }
    
    // ============ PRICING & CAMPAIGNS ============
    public void addCampaign(Campaign campaign) {
        campaigns.put(campaign.getCampaignId(), campaign);
    }
    
    public Campaign getCampaign(String campaignId) {
        return campaigns.get(campaignId);
    }
    
    public List<Campaign> getAllCampaigns() {
        return new ArrayList<>(campaigns.values());
    }
    
    public void deleteCampaign(String campaignId) {
        campaigns.remove(campaignId);
    }
    
    public double applyDiscount(double basePrice, String discountCode) {
        Campaign campaign = campaigns.values().stream()
                .filter(c -> c.getDiscountCode().equals(discountCode))
                .findFirst()
                .orElse(null);
        
        if (campaign != null && campaign.isActive()) {
            return basePrice * (1 - campaign.getDiscountPercentage() / 100.0);
        }
        return basePrice;
    }
    
    // ============ PAYMENT & ACCOUNTING ============
    public PaymentReport getPaymentReport(String startDate, String endDate) {
        PaymentReport report = new PaymentReport();
        
        List<Ticket> tickets = bookingSystem.getAllTickets().stream()
                .filter(t -> isDateInRange(t.getBookingDate(), startDate, endDate))
                .collect(Collectors.toList());
        
        report.setTotalTransactions(tickets.size());
        report.setTotalRevenue(tickets.stream().mapToDouble(Ticket::getPrice).sum());
        report.setSuccessfulPayments((int) tickets.stream()
                .filter(t -> t.getStatus().equals("CONFIRMED"))
                .count());
        report.setFailedPayments((int) tickets.stream()
                .filter(t -> t.getStatus().equals("FAILED"))
                .count());
        report.setRefunds(calculateRefunds(tickets));
        
        return report;
    }
    
    private boolean isDateInRange(Date date, String startDate, String endDate) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date start = sdf.parse(startDate);
            Date end = sdf.parse(endDate);
            return !date.before(start) && !date.after(end);
        } catch (Exception e) {
            return false;
        }
    }
    
    private double calculateRefunds(List<Ticket> tickets) {
        return tickets.stream()
                .filter(t -> t.getStatus().equals("REFUNDED"))
                .mapToDouble(Ticket::getPrice)
                .sum();
    }
    
    // ============ NOTIFICATIONS ============
    public void sendNotificationToPassenger(String email, String subject, String message) {
        // Integration with EmailService
        System.out.println("Notification sent to " + email + ": " + subject);
    }
    
    public void sendFlightCancellationNotice(String flightNumber) {
        Flight flight = bookingSystem.getFlights().stream()
                .filter(f -> f.getFlightNumber().equals(flightNumber))
                .findFirst()
                .orElse(null);
        
        if (flight != null) {
            bookingSystem.getAllTickets().stream()
                    .filter(t -> t.getFlight().getFlightNumber().equals(flightNumber))
                    .forEach(t -> sendNotificationToPassenger(
                            t.getPassenger().getEmail(),
                            "Flight Cancellation",
                            "Flight " + flightNumber + " has been cancelled."
                    ));
        }
    }
    
    // ============ ADMIN USER MANAGEMENT ============
    public void addAdminUser(Admin admin) {
        adminUsers.add(admin);
    }
    
    public void removeAdminUser(String username) {
        adminUsers.removeIf(a -> a.getUsername().equals(username));
    }
    
    public List<Admin> getAllAdminUsers() {
        return new ArrayList<>(adminUsers);
    }
    
    public boolean authenticateAdmin(String username, String password) {
        Admin admin = adminUsers.stream()
                .filter(a -> a.getUsername().equals(username))
                .findFirst()
                .orElse(null);
        
        if (admin != null && admin.authenticate(password) && admin.isActive()) {
            this.currentAdmin = admin;
            admin.updateLoginTime();
            return true;
        }
        return false;
    }
    
    public Admin getCurrentAdmin() {
        return currentAdmin;
    }
    
    // ============ REPORTING & ANALYTICS ============
    public RevenueReport getMostProfitableRoutes() {
        RevenueReport report = new RevenueReport();
        
        Map<String, Double> routeRevenue = bookingSystem.getAllTickets().stream()
                .collect(Collectors.groupingBy(
                        t -> t.getFlight().getDepartureCity() + " → " + t.getFlight().getDestinationCity(),
                        Collectors.summingDouble(Ticket::getPrice)
                ));
        
        report.setRouteRevenue(routeRevenue);
        return report;
    }
    
    public OccupancyReport getOccupancyReport() {
        OccupancyReport report = new OccupancyReport();
        
        bookingSystem.getFlights().forEach(flight -> {
            long bookedSeats = bookingSystem.getAllTickets().stream()
                    .filter(t -> t.getFlight().getFlightNumber().equals(flight.getFlightNumber()))
                    .count();
            
            double occupancy = (bookedSeats / (double) flight.getTotalSeats()) * 100;
            report.addFlightOccupancy(flight.getFlightNumber(), occupancy);
        });
        
        return report;
    }
    
    public CancellationReport getCancellationReport() {
        CancellationReport report = new CancellationReport();
        
        long totalCancellations = bookingSystem.getAllTickets().stream()
                .filter(t -> t.getStatus().equals("CANCELLED"))
                .count();
        
        report.setTotalCancellations(totalCancellations);
        report.setCancellationRate(calculateCancellationRate());
        
        return report;
    }
    
    // ============ SYSTEM SETTINGS ============
    public void updateSystemSetting(String key, String value) {
        if (systemSettings.containsKey(key)) {
            systemSettings.get(key).setValue(value);
        }
    }
    
    public String getSystemSetting(String key) {
        SystemSetting setting = systemSettings.get(key);
        return setting != null ? setting.getValue() : null;
    }
    
    public Map<String, SystemSetting> getAllSystemSettings() {
        return new HashMap<>(systemSettings);
    }
    
    public void setMaintenanceMode(boolean enabled) {
        updateSystemSetting("maintenanceMode", String.valueOf(enabled));
    }
    
    // ============ CITY MANAGEMENT ============
    public void addCity(String city) {
        if (!cities.contains(city)) {
            cities.add(city);
        }
    }
    
    public void removeCity(String city) {
        cities.remove(city);
    }
    
    public List<String> getAllCities() {
        return new ArrayList<>(cities);
    }
    
    // ============ PAYMENT ACCOUNT MANAGEMENT ============
    public void addPaymentAccount(PaymentAccount account) {
        paymentAccounts.put(account.getAccountId(), account);
    }
    
    public PaymentAccount getPaymentAccount(String accountId) {
        return paymentAccounts.get(accountId);
    }
    
    public List<PaymentAccount> getAllPaymentAccounts() {
        return new ArrayList<>(paymentAccounts.values());
    }
    
    public void deletePaymentAccount(String accountId) {
        paymentAccounts.remove(accountId);
    }
    
    public void updatePaymentAccount(String accountId, PaymentAccount updatedAccount) {
        if (paymentAccounts.containsKey(accountId)) {
            paymentAccounts.put(accountId, updatedAccount);
        }
    }
    
    // ============ NOTIFICATION MANAGEMENT ============
    public void sendNotification(Notification notification) {
        notifications.add(notification);
    }
    
    public List<Notification> getAllNotifications() {
        return new ArrayList<>(notifications);
    }
    
    public List<Notification> getNotificationsByUser(String userId) {
        return notifications.stream()
                .filter(n -> n.getUserId().equals(userId))
                .collect(Collectors.toList());
    }
    
    public void deleteNotification(String notificationId) {
        notifications.removeIf(n -> n.getNotificationId().equals(notificationId));
    }
    
    public void markNotificationAsRead(String notificationId) {
        notifications.stream()
                .filter(n -> n.getNotificationId().equals(notificationId))
                .forEach(n -> n.setRead(true));
    }
    
    // ============ ANNOUNCEMENT MANAGEMENT ============
    public void createAnnouncement(Announcement announcement) {
        announcements.add(announcement);
    }
    
    public List<Announcement> getAllAnnouncements() {
        return new ArrayList<>(announcements);
    }
    
    public List<Announcement> getActiveAnnouncements() {
        return announcements.stream()
                .filter(Announcement::isActive)
                .collect(Collectors.toList());
    }
    
    public void deleteAnnouncement(String announcementId) {
        announcements.removeIf(a -> a.getAnnouncementId().equals(announcementId));
    }
    
    public void updateAnnouncement(String announcementId, Announcement updatedAnnouncement) {
        for (int i = 0; i < announcements.size(); i++) {
            if (announcements.get(i).getAnnouncementId().equals(announcementId)) {
                announcements.set(i, updatedAnnouncement);
                break;
            }
        }
    }
    
    public void deactivateAnnouncement(String announcementId) {
        announcements.stream()
                .filter(a -> a.getAnnouncementId().equals(announcementId))
                .forEach(a -> a.setActive(false));
    }
    
    // ============ INNER CLASSES ============
    
    public static class Aircraft {
        private String aircraftId;
        private String model;
        private int totalSeats;
        private int economySeats;
        private int businessSeats;
        
        public Aircraft(String aircraftId, String model, int totalSeats, int economySeats, int businessSeats) {
            this.aircraftId = aircraftId;
            this.model = model;
            this.totalSeats = totalSeats;
            this.economySeats = economySeats;
            this.businessSeats = businessSeats;
        }
        
        public String getAircraftId() { return aircraftId; }
        public String getModel() { return model; }
        public int getTotalSeats() { return totalSeats; }
        public int getEconomySeats() { return economySeats; }
        public int getBusinessSeats() { return businessSeats; }
    }
    
    public static class Campaign {
        private String campaignId;
        private String name;
        private String discountCode;
        private double discountPercentage;
        private Date startDate;
        private Date endDate;
        private boolean active;
        
        public Campaign(String campaignId, String name, String discountCode, double discountPercentage) {
            this.campaignId = campaignId;
            this.name = name;
            this.discountCode = discountCode;
            this.discountPercentage = discountPercentage;
            this.active = true;
        }
        
        public String getCampaignId() { return campaignId; }
        public String getName() { return name; }
        public String getDiscountCode() { return discountCode; }
        public double getDiscountPercentage() { return discountPercentage; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
    }
    
    public static class SystemSetting {
        private String key;
        private String value;
        private String description;
        
        public SystemSetting(String key, String value, String description) {
            this.key = key;
            this.value = value;
            this.description = description;
        }
        
        public String getKey() { return key; }
        public String getValue() { return value; }
        public void setValue(String value) { this.value = value; }
        public String getDescription() { return description; }
    }
    
    public static class DashboardData {
        private int totalReservations;
        private int activeFlights;
        private double occupancyRate;
        private double dailyRevenue;
        private double monthlyRevenue;
        private List<RouteData> topRoutes;
        private double cancellationRate;
        private Map<String, Double> revenueByMonth;
        private List<Integer> reservationTrend;
        
        public int getTotalReservations() { return totalReservations; }
        public void setTotalReservations(int totalReservations) { this.totalReservations = totalReservations; }
        
        public int getActiveFlights() { return activeFlights; }
        public void setActiveFlights(int activeFlights) { this.activeFlights = activeFlights; }
        
        public double getOccupancyRate() { return occupancyRate; }
        public void setOccupancyRate(double occupancyRate) { this.occupancyRate = occupancyRate; }
        
        public double getDailyRevenue() { return dailyRevenue; }
        public void setDailyRevenue(double dailyRevenue) { this.dailyRevenue = dailyRevenue; }
        
        public double getMonthlyRevenue() { return monthlyRevenue; }
        public void setMonthlyRevenue(double monthlyRevenue) { this.monthlyRevenue = monthlyRevenue; }
        
        public List<RouteData> getTopRoutes() { return topRoutes; }
        public void setTopRoutes(List<RouteData> topRoutes) { this.topRoutes = topRoutes; }
        
        public double getCancellationRate() { return cancellationRate; }
        public void setCancellationRate(double cancellationRate) { this.cancellationRate = cancellationRate; }
        
        public Map<String, Double> getRevenueByMonth() { return revenueByMonth; }
        public void setRevenueByMonth(Map<String, Double> revenueByMonth) { this.revenueByMonth = revenueByMonth; }
        
        public List<Integer> getReservationTrend() { return reservationTrend; }
        public void setReservationTrend(List<Integer> reservationTrend) { this.reservationTrend = reservationTrend; }
    }
    
    public static class RouteData {
        private String route;
        private long bookings;
        
        public RouteData(String route, long bookings) {
            this.route = route;
            this.bookings = bookings;
        }
        
        public String getRoute() { return route; }
        public long getBookings() { return bookings; }
    }
    
    public static class PassengerProfile {
        private Passenger passenger;
        private int totalFlights;
        private List<Ticket> flightHistory;
        
        public PassengerProfile(Passenger passenger) {
            this.passenger = passenger;
            this.flightHistory = new ArrayList<>();
        }
        
        public Passenger getPassenger() { return passenger; }
        public int getTotalFlights() { return totalFlights; }
        public void setTotalFlights(int totalFlights) { this.totalFlights = totalFlights; }
        public List<Ticket> getFlightHistory() { return flightHistory; }
        public void setFlightHistory(List<Ticket> flightHistory) { this.flightHistory = flightHistory; }
    }
    
    public static class PaymentReport {
        private int totalTransactions;
        private double totalRevenue;
        private int successfulPayments;
        private int failedPayments;
        private double refunds;
        
        public int getTotalTransactions() { return totalTransactions; }
        public void setTotalTransactions(int totalTransactions) { this.totalTransactions = totalTransactions; }
        
        public double getTotalRevenue() { return totalRevenue; }
        public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }
        
        public int getSuccessfulPayments() { return successfulPayments; }
        public void setSuccessfulPayments(int successfulPayments) { this.successfulPayments = successfulPayments; }
        
        public int getFailedPayments() { return failedPayments; }
        public void setFailedPayments(int failedPayments) { this.failedPayments = failedPayments; }
        
        public double getRefunds() { return refunds; }
        public void setRefunds(double refunds) { this.refunds = refunds; }
    }
    
    public static class RevenueReport {
        private Map<String, Double> routeRevenue;
        
        public Map<String, Double> getRouteRevenue() { return routeRevenue; }
        public void setRouteRevenue(Map<String, Double> routeRevenue) { this.routeRevenue = routeRevenue; }
    }
    
    public static class OccupancyReport {
        private Map<String, Double> flightOccupancy;
        
        public OccupancyReport() {
            this.flightOccupancy = new HashMap<>();
        }
        
        public void addFlightOccupancy(String flightNumber, double occupancy) {
            flightOccupancy.put(flightNumber, occupancy);
        }
        
        public Map<String, Double> getFlightOccupancy() { return flightOccupancy; }
    }
    
    public static class CancellationReport {
        private long totalCancellations;
        private double cancellationRate;
        
        public long getTotalCancellations() { return totalCancellations; }
        public void setTotalCancellations(long totalCancellations) { this.totalCancellations = totalCancellations; }
        
        public double getCancellationRate() { return cancellationRate; }
        public void setCancellationRate(double cancellationRate) { this.cancellationRate = cancellationRate; }
    }
    
    public static class PaymentAccount {
        private String accountId;
        private String accountName;
        private String paymentMethod;
        private boolean isActive;
        private Date createdDate;
        
        public PaymentAccount(String accountId, String accountName, String paymentMethod, boolean isActive) {
            this.accountId = accountId;
            this.accountName = accountName;
            this.paymentMethod = paymentMethod;
            this.isActive = isActive;
            this.createdDate = new Date();
        }
        
        public String getAccountId() { return accountId; }
        public String getAccountName() { return accountName; }
        public String getPaymentMethod() { return paymentMethod; }
        public boolean isActive() { return isActive; }
        public Date getCreatedDate() { return createdDate; }
        public void setActive(boolean active) { this.isActive = active; }
        public void setAccountName(String accountName) { this.accountName = accountName; }
    }
    
    public static class Notification {
        private String notificationId;
        private String userId;
        private String title;
        private String message;
        private String type;
        private Date createdDate;
        private boolean isRead;
        
        public Notification(String notificationId, String userId, String title, String message, String type) {
            this.notificationId = notificationId;
            this.userId = userId;
            this.title = title;
            this.message = message;
            this.type = type;
            this.createdDate = new Date();
            this.isRead = false;
        }
        
        public String getNotificationId() { return notificationId; }
        public String getUserId() { return userId; }
        public String getTitle() { return title; }
        public String getMessage() { return message; }
        public String getType() { return type; }
        public Date getCreatedDate() { return createdDate; }
        public boolean isRead() { return isRead; }
        public void setRead(boolean read) { this.isRead = read; }
    }
    
    public static class Announcement {
        private String announcementId;
        private String title;
        private String content;
        private String targetAudience;
        private Date startDate;
        private Date endDate;
        private boolean isActive;
        private Date createdDate;
        
        public Announcement(String announcementId, String title, String content, String targetAudience) {
            this.announcementId = announcementId;
            this.title = title;
            this.content = content;
            this.targetAudience = targetAudience;
            this.isActive = true;
            this.createdDate = new Date();
            this.startDate = new Date();
        }
        
        public String getAnnouncementId() { return announcementId; }
        public String getTitle() { return title; }
        public String getContent() { return content; }
        public String getTargetAudience() { return targetAudience; }
        public Date getStartDate() { return startDate; }
        public Date getEndDate() { return endDate; }
        public boolean isActive() { return isActive; }
        public Date getCreatedDate() { return createdDate; }
        public void setActive(boolean active) { this.isActive = active; }
        public void setEndDate(Date endDate) { this.endDate = endDate; }
        public void setTitle(String title) { this.title = title; }
        public void setContent(String content) { this.content = content; }
    }
}
