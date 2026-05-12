// Ticket.java - Ticket class extending Reservation concept
import java.text.SimpleDateFormat;
import java.util.Date;

public class Ticket {
    private static int ticketCounter = 1000;
    private String ticketNumber;
    private Reservation reservation;
    private Date issueDate;
    
    public Ticket(Reservation reservation) {
        this.ticketNumber = "TK" + (ticketCounter++);
        this.reservation = reservation;
        this.issueDate = new Date();
    }
    
    public boolean cancelTicket() {
        return reservation.cancel();
    }
    
    // Getters
    public String getTicketNumber() { return ticketNumber; }
    public Reservation getReservation() { return reservation; }
    public Date getIssueDate() { return issueDate; }
    public Passenger getPassenger() { return reservation.getPassenger(); }
    public Flight getFlight() { return reservation.getFlight(); }
    public String getSeatNumber() { return reservation.getSeatNumber(); }
    public TicketType getTicketType() { return reservation.getTicketType(); }
    public double getFinalPrice() { return reservation.getFinalPrice(); }
    public double getSeatSelectionFee() { return reservation.getSeatSelectionFee(); }
    public boolean isCancelled() { return reservation.isCancelled(); }
    public String getBookingDate() {
        return new SimpleDateFormat("dd/MM/yyyy HH:mm").format(reservation.getBookingDate());
    }
    
    @Override
    public String toString() {
        return "Ticket No: " + ticketNumber + 
               ", Passenger: " + reservation.getPassenger().getFullName() +
               ", Flight: " + reservation.getFlight().getDepartureCity() + 
               " -> " + reservation.getFlight().getDestinationCity() +
               ", Seat: " + reservation.getSeatNumber() +
               ", Type: " + reservation.getTicketType().getDisplayName() +
               ", Seat Selection Fee: " + String.format("%.2f", reservation.getSeatSelectionFee()) + " TL" +
               ", Total Price: " + String.format("%.2f", reservation.getFinalPrice()) + " TL" +
               ", Status: " + (reservation.isCancelled() ? "Cancelled" : "Active");
    }
}