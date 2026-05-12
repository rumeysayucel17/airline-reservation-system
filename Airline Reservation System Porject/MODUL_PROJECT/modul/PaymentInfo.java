import java.util.Date;

public class PaymentInfo {
    private String cardNumber;
    private String cardHolderName;
    private String expiryDate;
    private String cvv;
    private String cardType;
    private Date paymentDate;
    private PaymentStatus status;
    
    public enum PaymentStatus {
        SUCCESS,
        FAILED,
        REFUNDED,
        PENDING
    }
    
    public PaymentInfo(String cardNumber, String cardHolderName, String expiryDate, String cvv) {
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.cardType = detectCardType(cardNumber);
        this.paymentDate = new Date();
        this.status = PaymentStatus.PENDING;
    }
    
    private String detectCardType(String cardNumber) {
        if (cardNumber.startsWith("4")) return "VISA";
        if (cardNumber.startsWith("5")) return "MASTERCARD";
        if (cardNumber.startsWith("3")) return "AMEX";
        return "UNKNOWN";
    }
    
    public String getLastFourDigits() {
        if (cardNumber != null && cardNumber.length() >= 4) {
            return cardNumber.substring(cardNumber.length() - 4);
        }
        return "****";
    }
    
    // Getters and Setters
    public String getCardNumber() { return cardNumber; }
    public String getCardHolderName() { return cardHolderName; }
    public String getExpiryDate() { return expiryDate; }
    public String getCvv() { return cvv; }
    public String getCardType() { return cardType; }
    public Date getPaymentDate() { return paymentDate; }
    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus status) { this.status = status; }
}