// EmailService.java - Email service for sending confirmations
import javax.mail.*;
import javax.mail.internet.*;
import java.util.List;
import java.util.Properties;
import java.text.SimpleDateFormat;
import java.util.Date;

public class EmailService {
    private final String username;
    private final String password;
    private final Properties props;
    
    public EmailService(String username, String password) {
        this.username = username;
        this.password = password;
        
        // Gmail SMTP settings
        props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
    }
    
    public boolean sendTicketConfirmation(String toEmail, Ticket ticket) {
        try {
            String subject = "Flight Ticket Confirmation - Ticket No: " + ticket.getTicketNumber();
            
            String htmlContent = "<!DOCTYPE html>"
                    + "<html>"
                    + "<head>"
                    + "<meta charset='UTF-8'>"
                    + "<style>"
                    + "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }"
                    + ".container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }"
                    + ".header { background-color: #1e3c72; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }"
                    + ".ticket-info { background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 5px solid #1e3c72; }"
                    + ".footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }"
                    + ".status { display: inline-block; padding: 5px 15px; background-color: #28a745; color: white; border-radius: 20px; font-weight: bold; }"
                    + "</style>"
                    + "</head>"
                    + "<body>"
                    + "<div class='container'>"
                    + "<div class='header'>"
                    + "<h1>FLIGHT TICKET CONFIRMATION</h1>"
                    + "</div>"
                    + "<p>Dear " + ticket.getPassenger().getFullName() + ",</p>"
                    + "<p>Your flight ticket has been successfully created. Your ticket details are as follows:</p>"
                    + "<div class='ticket-info'>"
                    + "<h3>Ticket Information</h3>"
                    + "<p><strong>Ticket Number:</strong> " + ticket.getTicketNumber() + "</p>"
                    + "<p><strong>Passenger:</strong> " + ticket.getPassenger().getFullName() + "</p>"
                    + "<p><strong>ID Number:</strong> " + ticket.getPassenger().getIdNumber() + "</p>"
                    + "<p><strong>Flight:</strong> " + ticket.getFlight().getDepartureCity() + 
                      " (" + ticket.getFlight().getDepartureAirport() + ") → " +
                      ticket.getFlight().getDestinationCity() + 
                      " (" + ticket.getFlight().getDestinationAirport() + ")</p>"
                    + "<p><strong>Flight Number:</strong> " + ticket.getFlight().getFlightNumber() + "</p>"
                    + "<p><strong>Date:</strong> " + ticket.getFlight().getDate() + "</p>"
                    + "<p><strong>Time:</strong> " + ticket.getFlight().getTime() + "</p>"
                    + "<p><strong>Seat Number:</strong> " + ticket.getSeatNumber() + "</p>"
                    + "<p><strong>Ticket Type:</strong> " + ticket.getTicketType().getDisplayName() + "</p>"
                    + "<p><strong>Booking Date:</strong> " + ticket.getBookingDate() + "</p>"
                    + "<p><strong>Price:</strong> " + String.format("%.2f", ticket.getFinalPrice()) + " TL</p>"
                    + "<p><strong>Status:</strong> <span class='status'>ACTIVE</span></p>"
                    + "</div>"
                    + "<p><strong>Check-in Information:</strong> We recommend arriving at the airport 2 hours before your flight.</p>"
                    + "<p><strong>Ticket Cancellation:</strong> You can cancel your ticket through the system or our call center.</p>"
                    + "<div class='footer'>"
                    + "<p>This email was sent automatically. Please do not reply.</p>"
                    + "<p>© 2024 Flight Booking System. All rights reserved.</p>"
                    + "</div>"
                    + "</div>"
                    + "</body>"
                    + "</html>";
            
            return sendEmail(toEmail, subject, htmlContent, true);
            
        } catch (Exception e) {
            System.err.println("Ticket confirmation email could not be sent: " + e.getMessage());
            return false;
        }
    }
    
    public boolean sendCancellationConfirmation(String toEmail, Ticket ticket) {
        try {
            String subject = "Ticket Cancellation Confirmation - Ticket No: " + ticket.getTicketNumber();
            
            String htmlContent = "<!DOCTYPE html>"
                    + "<html>"
                    + "<head>"
                    + "<meta charset='UTF-8'>"
                    + "<style>"
                    + "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }"
                    + ".container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }"
                    + ".header { background-color: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }"
                    + ".ticket-info { background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 5px solid #dc3545; }"
                    + ".footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }"
                    + ".status { display: inline-block; padding: 5px 15px; background-color: #dc3545; color: white; border-radius: 20px; font-weight: bold; }"
                    + ".refund-info { background-color: #fff3cd; padding: 15px; border: 1px solid #ffeaa7; border-radius: 5px; margin: 20px 0; }"
                    + "</style>"
                    + "</head>"
                    + "<body>"
                    + "<div class='container'>"
                    + "<div class='header'>"
                    + "<h1>TICKET CANCELLATION CONFIRMATION</h1>"
                    + "</div>"
                    + "<p>Dear " + ticket.getPassenger().getFullName() + ",</p>"
                    + "<p>The following ticket has been successfully cancelled:</p>"
                    + "<div class='ticket-info'>"
                    + "<h3>Cancelled Ticket Information</h3>"
                    + "<p><strong>Ticket Number:</strong> " + ticket.getTicketNumber() + "</p>"
                    + "<p><strong>Passenger:</strong> " + ticket.getPassenger().getFullName() + "</p>"
                    + "<p><strong>Flight:</strong> " + ticket.getFlight().getDepartureCity() + " → " + 
                      ticket.getFlight().getDestinationCity() + "</p>"
                    + "<p><strong>Flight Number:</strong> " + ticket.getFlight().getFlightNumber() + "</p>"
                    + "<p><strong>Date:</strong> " + ticket.getFlight().getDate() + "</p>"
                    + "<p><strong>Time:</strong> " + ticket.getFlight().getTime() + "</p>"
                    + "<p><strong>Seat Number:</strong> " + ticket.getSeatNumber() + "</p>"
                    + "<p><strong>Cancellation Date:</strong> " + new SimpleDateFormat("dd/MM/yyyy HH:mm").format(new Date()) + "</p>"
                    + "<p><strong>Status:</strong> <span class='status'>CANCELLED</span></p>"
                    + "</div>"
                    + "<div class='refund-info'>"
                    + "<h4>Refund Information</h4>"
                    + "<p>Your refund will be processed to your payment card within 3-5 business days.</p>"
                    + "<p>For refund inquiries, please contact our call center at 0850 123 45 67.</p>"
                    + "</div>"
                    + "<p>Thank you for choosing us. We hope to see you on future flights.</p>"
                    + "<div class='footer'>"
                    + "<p>This email was sent automatically. Please do not reply.</p>"
                    + "<p>© 2024 Flight Booking System. All rights reserved.</p>"
                    + "</div>"
                    + "</div>"
                    + "</body>"
                    + "</html>";
            
            return sendEmail(toEmail, subject, htmlContent, true);
            
        } catch (Exception e) {
            System.err.println("Cancellation confirmation email could not be sent: " + e.getMessage());
            return false;
        }
    }
    
    public boolean sendMultipleTicketsConfirmation(String toEmail, List<Ticket> tickets) {
        try {
            if (tickets.isEmpty()) return false;
            
            String subject = "Multiple Tickets Confirmation - " + tickets.size() + " Tickets";
            
            StringBuilder ticketsHtml = new StringBuilder();
            double totalPrice = 0;
            
            for (int i = 0; i < tickets.size(); i++) {
                Ticket ticket = tickets.get(i);
                totalPrice += ticket.getFinalPrice();
                
                ticketsHtml.append("<div style='border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px;'>")
                          .append("<h4>").append(i + 1).append(". Ticket</h4>")
                          .append("<p><strong>Ticket No:</strong> ").append(ticket.getTicketNumber()).append("</p>")
                          .append("<p><strong>Passenger:</strong> ").append(ticket.getPassenger().getFullName()).append("</p>")
                          .append("<p><strong>Flight:</strong> ").append(ticket.getFlight().getDepartureCity()).append(" → ")
                          .append(ticket.getFlight().getDestinationCity()).append("</p>")
                          .append("<p><strong>Seat:</strong> ").append(ticket.getSeatNumber()).append("</p>")
                          .append("<p><strong>Ticket Type:</strong> ").append(ticket.getTicketType().getDisplayName()).append("</p>")
                          .append("<p><strong>Price:</strong> ").append(String.format("%.2f", ticket.getFinalPrice())).append(" TL</p>")
                          .append("</div>");
            }
            
            String htmlContent = "<!DOCTYPE html>"
                    + "<html>"
                    + "<head>"
                    + "<meta charset='UTF-8'>"
                    + "<style>"
                    + "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }"
                    + ".container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }"
                    + ".header { background-color: #1e3c72; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }"
                    + ".summary { background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px; }"
                    + ".footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }"
                    + ".total { font-size: 18px; font-weight: bold; color: #28a745; margin-top: 10px; }"
                    + "</style>"
                    + "</head>"
                    + "<body>"
                    + "<div class='container'>"
                    + "<div class='header'>"
                    + "<h1>MULTIPLE TICKETS CONFIRMATION</h1>"
                    + "</div>"
                    + "<p>Dear " + tickets.get(0).getPassenger().getFullName() + ",</p>"
                    + "<p>A total of " + tickets.size() + " flight tickets have been successfully created.</p>"
                    + "<div class='summary'>"
                    + "<h3>Summary Information</h3>"
                    + "<p><strong>Flight:</strong> " + tickets.get(0).getFlight().getDepartureCity() + 
                      " → " + tickets.get(0).getFlight().getDestinationCity() + "</p>"
                    + "<p><strong>Flight Number:</strong> " + tickets.get(0).getFlight().getFlightNumber() + "</p>"
                    + "<p><strong>Date:</strong> " + tickets.get(0).getFlight().getDate() + "</p>"
                    + "<p><strong>Time:</strong> " + tickets.get(0).getFlight().getTime() + "</p>"
                    + "<p class='total'>Total Amount: " + String.format("%.2f", totalPrice) + " TL</p>"
                    + "</div>"
                    + "<h3>Ticket Details</h3>"
                    + ticketsHtml.toString()
                    + "<p><strong>Check-in Information:</strong> We recommend arriving at the airport 2 hours before your flight.</p>"
                    + "<p><strong>Ticket Cancellation:</strong> You can cancel your tickets through the system or our call center.</p>"
                    + "<div class='footer'>"
                    + "<p>This email was sent automatically. Please do not reply.</p>"
                    + "<p>© 2024 Flight Booking System. All rights reserved.</p>"
                    + "</div>"
                    + "</div>"
                    + "</body>"
                    + "</html>";
            
            return sendEmail(toEmail, subject, htmlContent, true);
            
        } catch (Exception e) {
            System.err.println("Multiple tickets confirmation email could not be sent: " + e.getMessage());
            return false;
        }
    }
    
    private boolean sendEmail(String toEmail, String subject, String content, boolean isHtml) {
        try {
            Session session = Session.getInstance(props,
                new Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
            
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(subject);
            
            if (isHtml) {
                message.setContent(content, "text/html; charset=utf-8");
            } else {
                message.setText(content);
            }
            
            Transport.send(message);
            System.out.println("Email successfully sent to: " + toEmail);
            return true;
            
        } catch (Exception e) {
            System.err.println("Email sending failed: " + e.getMessage());
            return false;
        }
    }
    
    // Email format validation
    public static boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email != null && email.matches(emailRegex);
    }
}
