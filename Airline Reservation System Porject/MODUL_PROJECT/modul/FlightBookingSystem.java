// FlightBookingSystem.java - Main booking system with OOP principles and admin functions
import java.util.*;
import java.text.SimpleDateFormat;
import java.util.stream.Collectors;

public class FlightBookingSystem {
    private List<Flight> flights;
    private List<Ticket> tickets;
    private Map<String, Ticket> ticketMap;
    private ReservationPriorityQueue reservationPriorityQueue;
    private EmailService emailService;
    private Admin admin;
    private List<Admin> adminUsers;
    private AdminPanel adminPanel;
    private BookingNavigation bookingNavigation; // Stack-based navigation history
    
    public FlightBookingSystem() {
        this.flights = new ArrayList<>();
        this.tickets = new ArrayList<>();
        this.ticketMap = new HashMap<>();
        this.reservationPriorityQueue = new ReservationPriorityQueue();
        this.bookingNavigation = new BookingNavigation(); // Initialize Stack-based navigation
        
        // Email service initialization
        String emailUsername = "your-email@gmail.com";
        String emailPassword = "your-app-password";
        this.emailService = new EmailService(emailUsername, emailPassword);
        
        // Initialize admin
        adminUsers = new ArrayList<>();
        adminUsers.add(new Admin("admin", "admin123", "admin@flightbooking.com"));
        this.admin = adminUsers.get(0);
        
        initializeFlights();
    }
    
    private void initializeFlights() {
        // Initialize with some sample flights based on real Turkish routes
        Random random = new Random();
        
        // Istanbul routes
        addFlight(new Flight("TK1001", "İstanbul", "IST/SAW", "Ankara", "ESB", 
                            "2025-01-15", "08:00", 350.0, 29, 6));
        addFlight(new Flight("TK1002", "İstanbul", "IST/SAW", "İzmir", "ADB", 
                            "2025-01-15", "10:30", 300.0, 29, 6));
        addFlight(new Flight("TK1003", "İstanbul", "IST/SAW", "Antalya", "AYT", 
                            "2025-01-15", "12:45", 280.0, 29, 6));
        
        // Ankara routes
        addFlight(new Flight("TK2001", "Ankara", "ESB", "İstanbul", "IST/SAW", 
                            "2025-01-15", "09:15", 350.0, 29, 6));
        addFlight(new Flight("TK2002", "Ankara", "ESB", "İzmir", "ADB", 
                            "2025-01-15", "11:30", 320.0, 29, 6));
        addFlight(new Flight("TK2003", "Ankara", "ESB", "Trabzon", "TZX", 
                            "2025-01-15", "14:00", 400.0, 29, 6));
        
        // Izmir routes
        addFlight(new Flight("TK3001", "İzmir", "ADB", "İstanbul", "IST/SAW", 
                            "2025-01-15", "07:45", 300.0, 29, 6));
        addFlight(new Flight("TK3002", "İzmir", "ADB", "Ankara", "ESB", 
                            "2025-01-15", "13:20", 320.0, 29, 6));
        addFlight(new Flight("TK3003", "İzmir", "ADB", "Antalya", "AYT", 
                            "2025-01-15", "16:10", 250.0, 29, 6));
        
        // Add more flights for other major cities
        for (int i = 0; i < 10; i++) {
            String[] cities = AirportData.getAllCities().toArray(new String[0]);
            String departure = cities[random.nextInt(cities.length)];
            List<String> destinations = AirportData.getDestinations(departure);
            
            if (!destinations.isEmpty()) {
                String destination = destinations.get(random.nextInt(destinations.size()));
                String date = String.format("2025-01-%02d", 15 + random.nextInt(10));
                String time = String.format("%02d:%02d", 6 + random.nextInt(12), random.nextInt(60));
                double price = 200 + random.nextDouble() * 300;
                
                String flightNumber = "TK" + (4000 + i);
                addFlight(new Flight(flightNumber, departure, AirportData.getAirportCode(departure),
                                   destination, AirportData.getAirportCode(destination),
                                   date, time, price, 29, 6));
            }
        }
    }
    
    public void addFlight(Flight flight) {
        flights.add(flight);
    }
    
    public List<Flight> searchFlights(String departure, String destination) {
        return flights.stream()
                .filter(f -> f.getDepartureCity().equalsIgnoreCase(departure) &&
                           f.getDestinationCity().equalsIgnoreCase(destination))
                .collect(Collectors.toList());
    }
    
    public Ticket bookTicket(Passenger passenger, String flightNumber, SeatClass cabinClass,
                            boolean manualSelection, String selectedSeat, TicketType ticketType) {
        
        // Email validation
        if (!EmailService.isValidEmail(passenger.getEmail())) {
            System.out.println("Invalid email address: " + passenger.getEmail());
            return null;
        }
        
        Flight flight = findFlightByNumber(flightNumber);
        if (flight == null) {
            System.out.println("Flight not found: " + flightNumber);
            return null;
        }
        
        String seatNumber;
        double seatSelectionFee = 0;
        
        if (manualSelection) {
            // Manual seat selection
            if (selectedSeat == null || selectedSeat.isEmpty()) {
                System.out.println("No seat selected for manual selection.");
                return null;
            }
            
            Seat seat = flight.getSeat(selectedSeat);
            if (seat == null) {
                System.out.println("Seat not found: " + selectedSeat);
                return null;
            }
            
            // Validate cabin class matches seat class
            if (seat.getSeatClass() != cabinClass) {
                System.out.println("Selected seat does not match cabin class.");
                return null;
            }
            
            if (seat.isOccupied()) {
                System.out.println("Seat already occupied: " + selectedSeat);
                return null;
            }
            
            seatNumber = selectedSeat;
            seatSelectionFee = 100.0; // 100 TL fee for manual selection
        } else {
            // Random seat assignment
            seatNumber = flight.assignRandomSeat(cabinClass);
            if (seatNumber == null) {
                System.out.println("No available seats in " + cabinClass + " class.");
                return null;
            }
        }
        
        if (!flight.reserveSeat(seatNumber)) {
            System.out.println("Seat could not be reserved: " + seatNumber);
            return null;
        }
        
        String reservationId = "RES" + System.currentTimeMillis();
        Reservation reservation = new Reservation(reservationId, passenger, flight, 
                                                   seatNumber, ticketType, seatSelectionFee);
        
        Ticket ticket = new Ticket(reservation);
        tickets.add(ticket);
        ticketMap.put(ticket.getTicketNumber(), ticket);
        reservationPriorityQueue.add(reservation);
        
        System.out.println("Ticket successfully created: " + ticket.getTicketNumber());
        System.out.println("Seat: " + seatNumber + " (" + 
                          (manualSelection ? "Manually selected" : "Randomly assigned") + ")");
        System.out.println("Cabin Class: " + cabinClass);
        System.out.println("Total Price: " + String.format("%.2f", ticket.getFinalPrice()) + " TL");
        
        // Send email
        try {
            boolean emailSent = emailService.sendTicketConfirmation(passenger.getEmail(), ticket);
            if (emailSent) {
                System.out.println("Ticket confirmation email sent to: " + passenger.getEmail());
            } else {
                System.out.println("Email could not be sent, but ticket was created.");
            }
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
        
        return ticket;
    }
    
    public Ticket bookTicketWithPayment(Passenger passenger, String flightNumber, SeatClass cabinClass,
                                       boolean manualSelection, String selectedSeat, TicketType ticketType,
                                       PaymentInfo paymentInfo) {
        
        // Email validation
        if (!EmailService.isValidEmail(passenger.getEmail())) {
            System.out.println("Invalid email address: " + passenger.getEmail());
            return null;
        }
        
        Flight flight = findFlightByNumber(flightNumber);
        if (flight == null) {
            System.out.println("Flight not found: " + flightNumber);
            return null;
        }
        
        String seatNumber;
        double seatSelectionFee = 0;
        
        if (manualSelection) {
            // Manual seat selection
            if (selectedSeat == null || selectedSeat.isEmpty()) {
                System.out.println("No seat selected for manual selection.");
                return null;
            }
            
            Seat seat = flight.getSeat(selectedSeat);
            if (seat == null) {
                System.out.println("Seat not found: " + selectedSeat);
                return null;
            }
            
            // Validate cabin class matches seat class
            if (seat.getSeatClass() != cabinClass) {
                System.out.println("Selected seat does not match cabin class.");
                return null;
            }
            
            if (seat.isOccupied()) {
                System.out.println("Seat already occupied: " + selectedSeat);
                return null;
            }
            
            seatNumber = selectedSeat;
            seatSelectionFee = 100.0; // 100 TL fee for manual selection
        } else {
            // Random seat assignment
            seatNumber = flight.assignRandomSeat(cabinClass);
            if (seatNumber == null) {
                System.out.println("No available seats in " + cabinClass + " class.");
                return null;
            }
        }
        
        if (!flight.reserveSeat(seatNumber)) {
            System.out.println("Seat could not be reserved: " + seatNumber);
            return null;
        }
        
        String reservationId = "RES" + System.currentTimeMillis();
        Reservation reservation = new Reservation(reservationId, passenger, flight, 
                                                   seatNumber, ticketType, seatSelectionFee);
        
        Ticket ticket = new Ticket(reservation);
        tickets.add(ticket);
        ticketMap.put(ticket.getTicketNumber(), ticket);
        reservationPriorityQueue.add(reservation);
        
        System.out.println("Ticket successfully created: " + ticket.getTicketNumber());
        System.out.println("Payment processed with: " + paymentInfo.getCardType() + " ****" + paymentInfo.getLastFourDigits());
        System.out.println("Seat: " + seatNumber + " (" + 
                          (manualSelection ? "Manually selected" : "Randomly assigned") + ")");
        System.out.println("Cabin Class: " + cabinClass);
        System.out.println("Total Price: " + String.format("%.2f", ticket.getFinalPrice()) + " TL");
        
        // Send email
        try {
            boolean emailSent = emailService.sendTicketConfirmation(passenger.getEmail(), ticket);
            if (emailSent) {
                System.out.println("Ticket confirmation email sent to: " + passenger.getEmail());
            } else {
                System.out.println("Email could not be sent, but ticket was created.");
            }
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
        
        return ticket;
    }
    
    public boolean cancelTicket(String ticketNumber) {
        Ticket ticket = ticketMap.get(ticketNumber);
        if (ticket == null) {
            System.out.println("Ticket not found: " + ticketNumber);
            return false;
        }
        
        if (ticket.isCancelled()) {
            System.out.println("Ticket is already cancelled.");
            return false;
        }
        
        boolean success = ticket.cancelTicket();
        if (success) {
            System.out.println("Ticket cancelled: " + ticketNumber);
            reservationPriorityQueue.remove(ticket.getReservation().getReservationId());
            
            // Send cancellation email
            try {
                boolean emailSent = emailService.sendCancellationConfirmation(
                    ticket.getPassenger().getEmail(), ticket);
                if (emailSent) {
                    System.out.println("Cancellation email sent to: " + ticket.getPassenger().getEmail());
                }
            } catch (Exception e) {
                System.err.println("Error sending cancellation email: " + e.getMessage());
            }
            
            return true;
        }
        
        return false;
    }
    
    public boolean processPayment(PaymentInfo paymentInfo, double amount) {
        // In a real system, this would connect to a payment gateway
        // For simulation, we'll just validate and return success
        
        // Basic validation
        if (paymentInfo == null) {
            System.out.println("Payment info is null");
            return false;
        }
        
        if (paymentInfo.getCardNumber() == null || paymentInfo.getCardNumber().length() != 16) {
            System.out.println("Invalid card number");
            return false;
        }
        
        if (paymentInfo.getCvv() == null || paymentInfo.getCvv().length() != 3) {
            System.out.println("Invalid CVV");
            return false;
        }
        
        // Simulate payment processing delay
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Simulate successful payment
        System.out.println("Payment processed successfully:");
        System.out.println("  Card: " + paymentInfo.getCardType() + " ****" + paymentInfo.getLastFourDigits());
        System.out.println("  Amount: " + String.format("%.2f", amount) + " TL");
        System.out.println("  Date: " + new Date());
        
        return true;
    }
    
    public List<Ticket> getTicketsByPassengerId(String passengerId) {
        return tickets.stream()
                .filter(t -> t.getPassenger().getIdNumber().equals(passengerId))
                .collect(Collectors.toList());
    }
    
    public Ticket findTicketByNumber(String ticketNumber) {
        return ticketMap.get(ticketNumber);
    }
    
    public Flight findFlightByNumber(String flightNumber) {
        return flights.stream()
                .filter(f -> f.getFlightNumber().equals(flightNumber))
                .findFirst()
                .orElse(null);
    }
    
    public void listAllFlights() {
        System.out.println("\n=== ALL AVAILABLE FLIGHTS ===");
        if (flights.isEmpty()) {
            System.out.println("No flights available.");
            return;
        }
        
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        for (Flight flight : flights) {
            int availableSeats = flight.getAvailableSeats().size();
            System.out.println("Flight: " + flight.getFlightNumber());
            System.out.println("  Route: " + flight.getDepartureCity() + " (" + 
                             flight.getDepartureAirport() + ") → " + 
                             flight.getDestinationCity() + " (" + 
                             flight.getDestinationAirport() + ")");
            System.out.println("  Date: " + flight.getDate() + " " + flight.getTime());
            System.out.println("  Price: " + String.format("%.2f", flight.getBasePrice()) + " TL");
            System.out.println("  Available Seats: " + availableSeats);
            System.out.println("----------------------------------------");
        }
    }
    
    public void listActiveTickets() {
        System.out.println("\n=== ACTIVE TICKETS ===");
        List<Ticket> activeTickets = tickets.stream()
                .filter(t -> !t.isCancelled())
                .collect(Collectors.toList());
        
        if (activeTickets.isEmpty()) {
            System.out.println("No active tickets.");
            return;
        }
        
        for (Ticket ticket : activeTickets) {
            System.out.println("Ticket: " + ticket.getTicketNumber());
            System.out.println("  Passenger: " + ticket.getPassenger().getFullName());
            System.out.println("  Flight: " + ticket.getFlight().getFlightNumber());
            System.out.println("  Seat: " + ticket.getSeatNumber());
            System.out.println("  Price: " + String.format("%.2f", ticket.getFinalPrice()) + " TL");
            System.out.println("----------------------------------------");
        }
    }
    
    // Admin authentication
    public boolean authenticateAdmin(String username, String password) {
        for (Admin a : adminUsers) {
            if (a.getUsername().equals(username) && a.authenticate(password)) {
                this.admin = a;
                a.updateLoginTime();
                return true;
            }
        }
        return false;
    }
    
    public Admin getCurrentAdmin() {
        return admin;
    }
    
    // Admin statistics methods
    public int getTotalFlights() {
        return flights.size();
    }
    
    public int getTotalReservations() {
        return tickets.size();
    }
    
    public int getActiveReservations() {
        return (int) tickets.stream()
                .filter(ticket -> !ticket.isCancelled())
                .count();
    }
    
    public double getTotalRevenue() {
        return tickets.stream()
                .filter(ticket -> !ticket.isCancelled())
                .mapToDouble(Ticket::getFinalPrice)
                .sum();
    }
    
    public double getAverageTicketPrice() {
        long activeCount = tickets.stream()
                .filter(ticket -> !ticket.isCancelled())
                .count();
        
        if (activeCount == 0) return 0.0;
        
        return getTotalRevenue() / activeCount;
    }
    
    public List<Reservation> getAllReservations() {
        return tickets.stream()
                .map(Ticket::getReservation)
                .collect(Collectors.toList());
    }
    
    public List<Reservation> getReservationsByDateRange(Date startDate, Date endDate) {
        return tickets.stream()
                .map(Ticket::getReservation)
                .filter(reservation -> 
                    !reservation.getBookingDate().before(startDate) && 
                    !reservation.getBookingDate().after(endDate))
                .collect(Collectors.toList());
    }
    
    public Map<String, Integer> getSeatOccupancyByFlight() {
        Map<String, Integer> occupancy = new HashMap<>();
        
        for (Flight flight : flights) {
            int totalSeats = flight.getSeats().size();
            int occupiedSeats = (int) flight.getSeats().values().stream()
                    .filter(Seat::isOccupied)
                    .count();
            
            int occupancyRate = (int) ((occupiedSeats * 100.0) / totalSeats);
            occupancy.put(flight.getFlightNumber(), occupancyRate);
        }
        
        return occupancy;
    }
    
    public List<Passenger> getTopSpendingPassengers(int limit) {
        Map<String, PassengerSpending> passengerSpending = new HashMap<>();
        
        for (Ticket ticket : tickets) {
            if (!ticket.isCancelled()) {
                String passengerId = ticket.getPassenger().getIdNumber();
                PassengerSpending spending = passengerSpending.getOrDefault(passengerId, 
                    new PassengerSpending(ticket.getPassenger()));
                
                spending.addSpending(ticket.getFinalPrice());
                passengerSpending.put(passengerId, spending);
            }
        }
        
        return passengerSpending.values().stream()
                .sorted(Comparator.comparingDouble(PassengerSpending::getTotalSpent).reversed())
                .limit(limit)
                .map(PassengerSpending::getPassenger)
                .collect(Collectors.toList());
    }
    
    // Helper class for passenger spending tracking
    private static class PassengerSpending {
        private Passenger passenger;
        private double totalSpent;
        private int ticketCount;
        
        public PassengerSpending(Passenger passenger) {
            this.passenger = passenger;
            this.totalSpent = 0.0;
            this.ticketCount = 0;
        }
        
        public void addSpending(double amount) {
            this.totalSpent += amount;
            this.ticketCount++;
        }
        
        public Passenger getPassenger() { return passenger; }
        public double getTotalSpent() { return totalSpent; }
        public int getTicketCount() { return ticketCount; }
    }
    
    // Getters for collections
    public List<Flight> getFlights() { return Collections.unmodifiableList(flights); }
    public List<Ticket> getTickets() { return Collections.unmodifiableList(tickets); }
    public List<Ticket> getAllTickets() { return new ArrayList<>(tickets); }
    
    // Admin Panel Integration
    public AdminPanel getAdminPanel() {
        if (adminPanel == null) {
            adminPanel = new AdminPanel(this);
        }
        return adminPanel;
    }
    
    public Admin getAdmin() { return admin; }
    public List<Admin> getAdminUsers() { return new ArrayList<>(adminUsers); }
    public EmailService getEmailService() { return emailService; }
    public ReservationPriorityQueue getReservationPriorityQueue() { return reservationPriorityQueue; }
    
    // ============ STACK-BASED NAVIGATION METHODS ============
    
    /**
     * Navigate to a specific booking step
     * Uses Stack data structure (LIFO) for navigation history
     * 
     * Time Complexity: O(1) - Stack push operation
     * 
     * @param step The step to navigate to
     */
    public void navigateToStep(BookingNavigation.BookingStep step) {
        bookingNavigation.goToStep(step);
    }
    
    /**
     * Go back to previous step using Stack (LIFO)
     * 
     * Time Complexity: O(1) - Stack pop operation
     * 
     * @return Previous step, or current step if can't go back
     */
    public BookingNavigation.BookingStep navigateBack() {
        return bookingNavigation.goBack();
    }
    
    /**
     * Get current booking step
     * 
     * Time Complexity: O(1) - Stack peek operation
     * 
     * @return Current step
     */
    public BookingNavigation.BookingStep getCurrentStep() {
        return bookingNavigation.getCurrentStep();
    }
    
    /**
     * Get previous step without navigating back
     * 
     * Time Complexity: O(1) - Stack peek operation
     * 
     * @return Previous step, or null if no previous step
     */
    public BookingNavigation.BookingStep getPreviousStep() {
        return bookingNavigation.getPreviousStep();
    }
    
    /**
     * Check if back navigation is possible
     * 
     * Time Complexity: O(1) - Stack size check
     * 
     * @return true if can go back, false otherwise
     */
    public boolean canNavigateBack() {
        return bookingNavigation.canGoBack();
    }
    
    /**
     * Reset navigation to initial state
     * 
     * Time Complexity: O(1) - Stack clear operation
     */
    public void resetNavigation() {
        bookingNavigation.reset();
    }
    
    /**
     * Get navigation history (for debugging/logging)
     * 
     * Time Complexity: O(n) - Creating copy of stack
     * 
     * @return List of steps in navigation history
     */
    public List<BookingNavigation.BookingStep> getNavigationHistory() {
        return bookingNavigation.getHistory();
    }
    
    /**
     * Get BookingNavigation instance
     * 
     * @return BookingNavigation instance
     */
    public BookingNavigation getBookingNavigation() {
        return bookingNavigation;
    }
}