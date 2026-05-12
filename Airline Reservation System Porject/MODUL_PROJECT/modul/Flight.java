// Flight.java - Flight class with encapsulation
import java.util.*;

public class Flight {
    private String flightNumber;
    private String departureCity;
    private String departureAirport;
    private String destinationCity;
    private String destinationAirport;
    private String date;
    private String time;
    private double basePrice;
    private Map<String, Seat> seats;
    private int totalRows;
    private int seatsPerRow;
    
    public Flight(String flightNumber, String departureCity, String departureAirport,
                  String destinationCity, String destinationAirport,
                  String date, String time, double basePrice, int totalRows, int seatsPerRow) {
        this.flightNumber = flightNumber;
        this.departureCity = departureCity;
        this.departureAirport = departureAirport;
        this.destinationCity = destinationCity;
        this.destinationAirport = destinationAirport;
        this.date = date;
        this.time = time;
        this.basePrice = basePrice;
        this.totalRows = totalRows;
        this.seatsPerRow = seatsPerRow;
        this.seats = new HashMap<>();
        initializeSeats();
    }
    
    private void initializeSeats() {
        char[] seatLetters = {'A', 'B', 'C', 'D', 'E', 'F'};
        
        // Business class: rows 1-3
        for (int row = 1; row <= 3; row++) {
            for (int col = 0; col < seatsPerRow; col++) {
                String seatNumber = row + String.valueOf(seatLetters[col]);
                Seat seat = new Seat(seatNumber, SeatClass.BUSINESS, row, seatLetters[col]);
                seats.put(seatNumber, seat);
            }
        }
        
        // Economy class: rows 4-10
        for (int row = 4; row <= totalRows; row++) {
            for (int col = 0; col < seatsPerRow; col++) {
                String seatNumber = row + String.valueOf(seatLetters[col]);
                Seat seat = new Seat(seatNumber, SeatClass.ECONOMY, row, seatLetters[col]);
                seats.put(seatNumber, seat);
            }
        }
    }
    
    public boolean reserveSeat(String seatNumber) {
        Seat seat = seats.get(seatNumber);
        if (seat != null && !seat.isOccupied()) {
            seat.setOccupied(true);
            return true;
        }
        return false;
    }
    
    public boolean cancelSeat(String seatNumber) {
        Seat seat = seats.get(seatNumber);
        if (seat != null && seat.isOccupied()) {
            seat.setOccupied(false);
            return true;
        }
        return false;
    }
    
    public List<String> getAvailableSeats() {
        List<String> available = new ArrayList<>();
        for (Seat seat : seats.values()) {
            if (!seat.isOccupied()) {
                available.add(seat.getSeatNumber());
            }
        }
        return available;
    }
    
    public List<String> getAvailableSeatsByClass(SeatClass seatClass) {
        List<String> available = new ArrayList<>();
        for (Seat seat : seats.values()) {
            if (!seat.isOccupied() && seat.getSeatClass() == seatClass) {
                available.add(seat.getSeatNumber());
            }
        }
        return available;
    }
    
    public Seat getSeat(String seatNumber) {
        return seats.get(seatNumber);
    }
    
    public double getPriceForSeat(String seatNumber, TicketType ticketType) {
        Seat seat = seats.get(seatNumber);
        if (seat == null) return basePrice;
        
        double seatPrice = basePrice * seat.getSeatClass().getPriceMultiplier();
        return ticketType.calculatePrice(seatPrice);
    }
    
    public String assignRandomSeat(SeatClass seatClass) {
        List<String> availableSeats = getAvailableSeatsByClass(seatClass);
        if (availableSeats.isEmpty()) {
            return null;
        }
        Random random = new Random();
        return availableSeats.get(random.nextInt(availableSeats.size()));
    }
    
    public double getPriceForSeatWithSelectionFee(String seatNumber, TicketType ticketType, boolean manualSelection) {
        double price = getPriceForSeat(seatNumber, ticketType);
        if (manualSelection) {
            price += 100.0; // Seat selection fee
        }
        return price;
    }
    
    // Getters
    public String getFlightNumber() { return flightNumber; }
    public String getDepartureCity() { return departureCity; }
    public String getDepartureAirport() { return departureAirport; }
    public String getDestinationCity() { return destinationCity; }
    public String getDestinationAirport() { return destinationAirport; }
    public String getDate() { return date; }
    public String getTime() { return time; }
    public double getBasePrice() { return basePrice; }
    public Map<String, Seat> getSeats() { return Collections.unmodifiableMap(seats); }
    public int getTotalRows() { return totalRows; }
    public int getSeatsPerRow() { return seatsPerRow; }
}