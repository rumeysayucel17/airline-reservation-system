// Seat.java - Represents a single seat
public class Seat {
    private String seatNumber;
    private SeatClass seatClass;
    private boolean isOccupied;
    private int row;
    private char column;
    
    public Seat(String seatNumber, SeatClass seatClass, int row, char column) {
        this.seatNumber = seatNumber;
        this.seatClass = seatClass;
        this.isOccupied = false;
        this.row = row;
        this.column = column;
    }
    
    public String getSeatNumber() {
        return seatNumber;
    }
    
    public SeatClass getSeatClass() {
        return seatClass;
    }
    
    public boolean isOccupied() {
        return isOccupied;
    }
    
    public void setOccupied(boolean occupied) {
        this.isOccupied = occupied;
    }
    
    public int getRow() {
        return row;
    }
    
    public char getColumn() {
        return column;
    }
    
    @Override
    public String toString() {
        return seatNumber + " (" + seatClass.getDisplayName() + ")";
    }
}

