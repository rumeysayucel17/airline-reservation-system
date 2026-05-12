// TicketType.java - Enum for different ticket types
public enum TicketType {
    FULL("Full", 1.0),
    STUDENT("Student", 0.75),
    PET("Pet", 0.5),
    RETIRED("Retired", 0.8),
    TEACHER("Teacher", 0.85);
    
    private final String displayName;
    private final double priceMultiplier;
    
    TicketType(String displayName, double priceMultiplier) {
        this.displayName = displayName;
        this.priceMultiplier = priceMultiplier;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    public double getPriceMultiplier() {
        return priceMultiplier;
    }
    
    public double calculatePrice(double basePrice) {
        return basePrice * priceMultiplier;
    }
}

