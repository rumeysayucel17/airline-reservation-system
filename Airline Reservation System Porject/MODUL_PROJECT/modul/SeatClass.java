// SeatClass.java - Enum for seat classes
public enum SeatClass {
    BUSINESS("Business", 2.5),
    ECONOMY("Economy", 1.0),
    PREMIUM_ECONOMY("Premium Economy", 1.5);
    
    private final String displayName;
    private final double priceMultiplier;
    
    SeatClass(String displayName, double priceMultiplier) {
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

