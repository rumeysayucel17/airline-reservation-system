import java.util.*;
import java.util.stream.Collectors;

public class AdminDashboard {
    private FlightBookingSystem bookingSystem;
    
    public AdminDashboard(FlightBookingSystem bookingSystem) {
        this.bookingSystem = bookingSystem;
    }
    
    // Dashboard KPIs
    public Map<String, Object> getDashboardKPIs() {
        Map<String, Object> kpis = new HashMap<>();
        
        kpis.put("totalReservations", bookingSystem.getTotalReservations());
        kpis.put("activeReservations", bookingSystem.getActiveReservations());
        kpis.put("totalRevenue", bookingSystem.getTotalRevenue());
        kpis.put("todayRevenue", getTodayRevenue());
        kpis.put("monthRevenue", getMonthRevenue());
        kpis.put("loadFactor", getAverageLoadFactor());
        kpis.put("activeFlights", getActiveFlightsCount());
        kpis.put("topRoutes", getTopSellingRoutes(5));
        
        return kpis;
    }
    
    private double getTodayRevenue() {
        Calendar today = Calendar.getInstance();
        today.set(Calendar.HOUR_OF_DAY, 0);
        today.set(Calendar.MINUTE, 0);
        today.set(Calendar.SECOND, 0);
        
        return bookingSystem.getTickets().stream()
                .filter(t -> !t.isCancelled())
                .filter(t -> t.getReservation().getBookingDate().after(today.getTime()))
                .mapToDouble(Ticket::getFinalPrice)
                .sum();
    }
    
    private double getMonthRevenue() {
        Calendar monthStart = Calendar.getInstance();
        monthStart.set(Calendar.DAY_OF_MONTH, 1);
        monthStart.set(Calendar.HOUR_OF_DAY, 0);
        monthStart.set(Calendar.MINUTE, 0);
        monthStart.set(Calendar.SECOND, 0);
        
        return bookingSystem.getTickets().stream()
                .filter(t -> !t.isCancelled())
                .filter(t -> t.getReservation().getBookingDate().after(monthStart.getTime()))
                .mapToDouble(Ticket::getFinalPrice)
                .sum();
    }
    
    private int getAverageLoadFactor() {
        Map<String, Integer> occupancy = bookingSystem.getSeatOccupancyByFlight();
        if (occupancy.isEmpty()) return 0;
        
        return (int) occupancy.values().stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);
    }
    
    private int getActiveFlightsCount() {
        return bookingSystem.getFlights().size();
    }
    
    private List<Map<String, Object>> getTopSellingRoutes(int limit) {
        Map<String, RouteStats> routeStats = new HashMap<>();
        
        for (Ticket ticket : bookingSystem.getTickets()) {
            if (!ticket.isCancelled()) {
                Flight flight = ticket.getFlight();
                String route = flight.getDepartureCity() + " → " + flight.getDestinationCity();
                
                RouteStats stats = routeStats.getOrDefault(route, new RouteStats(route));
                stats.addTicket(ticket.getFinalPrice());
                routeStats.put(route, stats);
            }
        }
        
        return routeStats.values().stream()
                .sorted(Comparator.comparingInt(RouteStats::getTicketsSold).reversed())
                .limit(limit)
                .map(RouteStats::toMap)
                .collect(Collectors.toList());
    }
    
    // Flight Management
    public void addFlight(Flight flight) {
        bookingSystem.addFlight(flight);
        logAdminAction("ADD_FLIGHT", "Added flight " + flight.getFlightNumber());
    }
    
    public void removeFlight(String flightNumber) {
        bookingSystem.getFlights().removeIf(f -> f.getFlightNumber().equals(flightNumber));
        logAdminAction("REMOVE_FLIGHT", "Removed flight " + flightNumber);
    }
    
    public void updateFlightStatus(String flightNumber, String status) {
        Flight flight = bookingSystem.findFlightByNumber(flightNumber);
        if (flight != null) {
            // In real implementation, Flight class would have status field
            logAdminAction("UPDATE_FLIGHT_STATUS", "Updated flight " + flightNumber + " status to " + status);
        }
    }
    
    // Reservation Management
    public List<Ticket> getAllReservations() {
        return bookingSystem.getTickets();
    }
    
    public List<Ticket> searchReservationsByPNR(String pnr) {
        return bookingSystem.getTickets().stream()
                .filter(t -> t.getReservation().getReservationId().contains(pnr))
                .collect(Collectors.toList());
    }
    
    public void cancelReservation(String ticketNumber) {
        bookingSystem.cancelTicket(ticketNumber);
        logAdminAction("CANCEL_RESERVATION", "Cancelled reservation " + ticketNumber);
    }
    
    // Passenger Management
    public List<Passenger> getAllPassengers() {
        return bookingSystem.getTickets().stream()
                .map(Ticket::getPassenger)
                .distinct()
                .collect(Collectors.toList());
    }
    
    public Map<String, Object> getPassengerStats(String passengerId) {
        List<Ticket> passengerTickets = bookingSystem.getTicketsByPassengerId(passengerId);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalFlights", passengerTickets.size());
        stats.put("cancellations", passengerTickets.stream().filter(Ticket::isCancelled).count());
        stats.put("totalSpent", passengerTickets.stream()
                .filter(t -> !t.isCancelled())
                .mapToDouble(Ticket::getFinalPrice)
                .sum());
        
        return stats;
    }
    
    // Reports & Analytics
    public Map<String, Object> generateRevenueReport(Date startDate, Date endDate) {
        List<Ticket> tickets = bookingSystem.getTickets().stream()
                .filter(t -> !t.isCancelled())
                .filter(t -> {
                    Date bookingDate = t.getReservation().getBookingDate();
                    return !bookingDate.before(startDate) && !bookingDate.after(endDate);
                })
                .collect(Collectors.toList());
        
        Map<String, Object> report = new HashMap<>();
        report.put("totalRevenue", tickets.stream().mapToDouble(Ticket::getFinalPrice).sum());
        report.put("ticketsSold", tickets.size());
        report.put("averageTicketPrice", tickets.isEmpty() ? 0 : 
                tickets.stream().mapToDouble(Ticket::getFinalPrice).average().orElse(0));
        
        return report;
    }
    
    public List<Map<String, Object>> getMostProfitableRoutes() {
        return getTopSellingRoutes(10);
    }
    
    public Map<String, Integer> getCancellationRates() {
        Map<String, Integer> rates = new HashMap<>();
        
        int total = bookingSystem.getTickets().size();
        int cancelled = (int) bookingSystem.getTickets().stream()
                .filter(Ticket::isCancelled)
                .count();
        
        rates.put("total", total);
        rates.put("cancelled", cancelled);
        rates.put("rate", total > 0 ? (cancelled * 100 / total) : 0);
        
        return rates;
    }
    
    private void logAdminAction(String action, String description) {
        Admin admin = bookingSystem.getCurrentAdmin();
        if (admin != null) {
            admin.logActivity(action, description);
        }
    }
    
    // Helper class
    private static class RouteStats {
        private String route;
        private int ticketsSold;
        private double revenue;
        
        public RouteStats(String route) {
            this.route = route;
            this.ticketsSold = 0;
            this.revenue = 0.0;
        }
        
        public void addTicket(double price) {
            this.ticketsSold++;
            this.revenue += price;
        }
        
        public int getTicketsSold() { return ticketsSold; }
        
        public Map<String, Object> toMap() {
            Map<String, Object> map = new HashMap<>();
            map.put("route", route);
            map.put("ticketsSold", ticketsSold);
            map.put("revenue", revenue);
            return map;
        }
    }
}