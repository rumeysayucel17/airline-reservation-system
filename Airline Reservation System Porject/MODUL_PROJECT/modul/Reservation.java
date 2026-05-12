// Reservation.java - Reservation class implementing Comparable for priority queue
import java.util.Date;

public class Reservation implements Comparable<Reservation> {
    private String reservationId;
    private Passenger passenger;
    private Flight flight;
    private String seatNumber;
    private TicketType ticketType;
    private Date bookingDate;
    private Date checkInDate;
    private boolean isCancelled;
    private double finalPrice;
    private double seatSelectionFee;
    
    public Reservation(String reservationId, Passenger passenger, Flight flight,
                      String seatNumber, TicketType ticketType, double seatSelectionFee) {
        this.reservationId = reservationId;
        this.passenger = passenger;
        this.flight = flight;
        this.seatNumber = seatNumber;
        this.ticketType = ticketType;
        this.bookingDate = new Date();
        this.checkInDate = null;
        this.isCancelled = false;
        this.seatSelectionFee = seatSelectionFee;
        this.finalPrice = flight.getPriceForSeat(seatNumber, ticketType) + seatSelectionFee;
    }
    
    public boolean cancel() {
        if (!isCancelled) {
            isCancelled = true;
            flight.cancelSeat(seatNumber);
            return true;
        }
        return false;
    }
    
    public void setCheckInDate(Date checkInDate) {
        this.checkInDate = checkInDate;
    }
    
    // Priority comparison: earlier check-in gets higher priority
    @Override
    public int compareTo(Reservation other) {
        if (this.checkInDate == null && other.checkInDate == null) {
            return this.bookingDate.compareTo(other.bookingDate);
        }
        if (this.checkInDate == null) return 1;
        if (other.checkInDate == null) return -1;
        return this.checkInDate.compareTo(other.checkInDate);
    }
    
    // Getters
    public String getReservationId() { return reservationId; }
    public Passenger getPassenger() { return passenger; }
    public Flight getFlight() { return flight; }
    public String getSeatNumber() { return seatNumber; }
    public TicketType getTicketType() { return ticketType; }
    public Date getBookingDate() { return bookingDate; }
    public Date getCheckInDate() { return checkInDate; }
    public boolean isCancelled() { return isCancelled; }
    public double getFinalPrice() { return finalPrice; }
    public double getSeatSelectionFee() { return seatSelectionFee; }
    
    @Override
    public String toString() {
        return "Reservation ID: " + reservationId +
               ", Passenger: " + passenger.getFullName() +
               ", Flight: " + flight.getFlightNumber() +
               ", Seat: " + seatNumber +
               ", Type: " + ticketType.getDisplayName() +
               ", Seat Selection Fee: " + String.format("%.2f", seatSelectionFee) + " TL" +
               ", Price: " + String.format("%.2f", finalPrice) + " TL" +
               ", Status: " + (isCancelled ? "Cancelled" : "Active");
    }
}