// Main.java - Konsol uygulaması with admin menu
import java.util.*;
import java.text.SimpleDateFormat;

public class Main {
    public static void main(String[] args) {
        FlightBookingSystem system = new FlightBookingSystem();
        Scanner scanner = new Scanner(System.in);
        
        while (true) {
            System.out.println("\n=== UÇAK BİLETİ ALMA SİSTEMİ ===");
            System.out.println("1. Uçuşları Listele");
            System.out.println("2. Rota Ara");
            System.out.println("3. Bilet Al");
            System.out.println("4. Çoklu Bilet Al");
            System.out.println("5. Aktif Biletleri Listele");
            System.out.println("6. Bilet İptal Et");
            System.out.println("7. Admin Paneli");
            System.out.println("0. Çıkış");
            System.out.print("Seçiminiz: ");
            
            try {
                int choice = scanner.nextInt();
                scanner.nextLine(); // Consume newline
                
                switch (choice) {
                    case 1:
                        system.listAllFlights();
                        break;
                    case 2:
                        searchRoute(system, scanner);
                        break;
                    case 3:
                        bookTicket(system, scanner);
                        break;
                    case 4:
                        bookMultipleTickets(system, scanner);
                        break;
                    case 5:
                        system.listActiveTickets();
                        break;
                    case 6:
                        cancelTicket(system, scanner);
                        break;
                    case 7:
                        adminPanel(system, scanner);
                        break;
                    case 0:
                        System.out.println("Sistemden çıkılıyor...");
                        scanner.close();
                        return;
                    default:
                        System.out.println("Geçersiz seçim!");
                }
            } catch (Exception e) {
                System.out.println("Hata: " + e.getMessage());
                scanner.nextLine(); // Clear buffer
            }
        }
    }
    
    private static void searchRoute(FlightBookingSystem system, Scanner scanner) {
        System.out.println("\n=== ROTA ARA ===");
        System.out.println("Mevcut şehirler:");
        
        List<String> cities = AirportData.getAllCities();
        for (int i = 0; i < cities.size(); i++) {
            System.out.print(cities.get(i));
            if ((i + 1) % 5 == 0) System.out.println();
            else System.out.print(", ");
        }
        System.out.println();
        
        System.out.print("Kalkış şehri: ");
        String departure = scanner.nextLine();
        
        System.out.print("Varış şehri: ");
        String destination = scanner.nextLine();
        
        if (!AirportData.routeExists(departure, destination)) {
            System.out.println("Bu rota için uçuş bulunmamaktadır.");
            return;
        }
        
        List<Flight> flights = system.searchFlights(departure, destination);
        
        if (flights.isEmpty()) {
            System.out.println("Bu rota için uçuş bulunamadı.");
        } else {
            System.out.println("\nBulunan Uçuşlar:");
            for (Flight flight : flights) {
                int availableSeats = flight.getAvailableSeats().size();
                System.out.println("Uçuş: " + flight.getFlightNumber());
                System.out.println("  Tarih: " + flight.getDate() + " " + flight.getTime());
                System.out.println("  Fiyat: " + String.format("%.2f", flight.getBasePrice()) + " TL");
                System.out.println("  Boş Koltuk: " + availableSeats);
                System.out.println("----------------------------------------");
            }
        }
    }
    
    private static void bookTicket(FlightBookingSystem system, Scanner scanner) {
        System.out.println("\n=== BİLET AL ===");
        
        // Passenger information
        System.out.print("TC Kimlik No: ");
        String idNumber = scanner.nextLine();
        
        System.out.print("Ad: ");
        String firstName = scanner.nextLine();
        
        System.out.print("Soyad: ");
        String lastName = scanner.nextLine();
        
        System.out.print("Email: ");
        String email = scanner.nextLine();
        
        System.out.print("Telefon: ");
        String phone = scanner.nextLine();
        
        Passenger passenger = new Passenger(idNumber, firstName, lastName, email, phone);
        
        // Flight selection
        System.out.print("Uçuş Numarası: ");
        String flightNumber = scanner.nextLine();
        
        // Cabin class selection
        System.out.println("Kabin Sınıfı Seçin:");
        System.out.println("1. Business");
        System.out.println("2. Economy");
        System.out.print("Seçiminiz: ");
        int cabinChoice = scanner.nextInt();
        scanner.nextLine();
        
        SeatClass cabinClass = (cabinChoice == 1) ? SeatClass.BUSINESS : SeatClass.ECONOMY;
        
        // Seat selection type
        System.out.println("Koltuk Seçimi:");
        System.out.println("1. Rastgele Atama (Ücretsiz)");
        System.out.println("2. Manuel Seçim (+100 TL)");
        System.out.print("Seçiminiz: ");
        int seatChoice = scanner.nextInt();
        scanner.nextLine();
        
        boolean manualSelection = (seatChoice == 2);
        String selectedSeat = null;
        
        if (manualSelection) {
            System.out.print("Seçmek istediğiniz koltuk numarası (örn: 5A): ");
            selectedSeat = scanner.nextLine();
        }
        
        // Ticket type
        System.out.println("Bilet Türü:");
        System.out.println("1. Tam");
        System.out.println("2. Öğrenci");
        System.out.println("3. Emekli");
        System.out.println("4. Öğretmen");
        System.out.print("Seçiminiz: ");
        int ticketChoice = scanner.nextInt();
        scanner.nextLine();
        
        TicketType ticketType;
        switch (ticketChoice) {
            case 1: ticketType = TicketType.FULL; break;
            case 2: ticketType = TicketType.STUDENT; break;
            case 3: ticketType = TicketType.RETIRED; break;
            case 4: ticketType = TicketType.TEACHER; break;
            default: ticketType = TicketType.FULL;
        }
        
        // Book ticket
        Ticket ticket = system.bookTicket(passenger, flightNumber, cabinClass, 
                                         manualSelection, selectedSeat, ticketType);
        
        if (ticket != null) {
            System.out.println("Bilet başarıyla oluşturuldu!");
            System.out.println("Bilet Numarası: " + ticket.getTicketNumber());
        }
    }
    
    private static void bookMultipleTickets(FlightBookingSystem system, Scanner scanner) {
        System.out.println("\n=== ÇOKLU BİLET AL ===");
        
        System.out.print("Kaç yolcu için bilet alacaksınız? ");
        int passengerCount = scanner.nextInt();
        scanner.nextLine();
        
        List<Passenger> passengers = new ArrayList<>();
        
        for (int i = 1; i <= passengerCount; i++) {
            System.out.println("\nYolcu " + i + " Bilgileri:");
            
            System.out.print("TC Kimlik No: ");
            String idNumber = scanner.nextLine();
            
            System.out.print("Ad: ");
            String firstName = scanner.nextLine();
            
            System.out.print("Soyad: ");
            String lastName = scanner.nextLine();
            
            System.out.print("Email: ");
            String email = scanner.nextLine();
            
            System.out.print("Telefon: ");
            String phone = scanner.nextLine();
            
            passengers.add(new Passenger(idNumber, firstName, lastName, email, phone));
        }
        
        // Common flight for all passengers
        System.out.print("\nUçuş Numarası: ");
        String flightNumber = scanner.nextLine();
        
        // Cabin class selection
        System.out.println("Kabin Sınıfı Seçin:");
        System.out.println("1. Business");
        System.out.println("2. Economy");
        System.out.print("Seçiminiz: ");
        int cabinChoice = scanner.nextInt();
        scanner.nextLine();
        
        SeatClass cabinClass = (cabinChoice == 1) ? SeatClass.BUSINESS : SeatClass.ECONOMY;
        
        // Book tickets for each passenger
        System.out.println("\nBiletler oluşturuluyor...");
        
        for (Passenger passenger : passengers) {
            Ticket ticket = system.bookTicket(passenger, flightNumber, cabinClass, 
                                             false, null, TicketType.FULL);
            
            if (ticket != null) {
                System.out.println("Yolcu " + passenger.getFullName() + " için bilet oluşturuldu: " + 
                                 ticket.getTicketNumber());
            } else {
                System.out.println("Yolcu " + passenger.getFullName() + " için bilet oluşturulamadı!");
            }
        }
    }
    
    private static void cancelTicket(FlightBookingSystem system, Scanner scanner) {
        System.out.println("\n=== BİLET İPTAL ET ===");
        
        System.out.print("İptal edilecek bilet numarası: ");
        String ticketNumber = scanner.nextLine();
        
        boolean success = system.cancelTicket(ticketNumber);
        
        if (success) {
            System.out.println("Bilet başarıyla iptal edildi.");
        } else {
            System.out.println("Bilet iptal edilemedi.");
        }
    }
    
    private static void adminPanel(FlightBookingSystem system, Scanner scanner) {
        System.out.println("\n=== ADMIN PANELİ ===");
        System.out.print("Kullanıcı adı: ");
        String username = scanner.nextLine();
        System.out.print("Şifre: ");
        String password = scanner.nextLine();
        
        if (system.authenticateAdmin(username, password)) {
            System.out.println("Admin girişi başarılı!");
            Admin admin = system.getCurrentAdmin();
            
            while (true) {
                System.out.println("\n=== ADMIN MENÜSÜ ===");
                System.out.println("1. Sistem İstatistikleri");
                System.out.println("2. Tüm Rezervasyonları Görüntüle");
                System.out.println("3. Rapor Oluştur");
                System.out.println("4. Doluluk Oranları");
                System.out.println("5. En Çok Harcama Yapan Müşteriler");
                System.out.println("0. Çıkış");
                System.out.print("Seçiminiz: ");
                
                try {
                    int choice = scanner.nextInt();
                    scanner.nextLine();
                    
                    switch (choice) {
                        case 1:
                            admin.viewSystemStatistics(system);
                            break;
                        case 2:
                            admin.viewAllReservations(system);
                            break;
                        case 3:
                            generateReport(admin, system, scanner);
                            break;
                        case 4:
                            viewOccupancyRates(system);
                            break;
                        case 5:
                            viewTopSpendingPassengers(system);
                            break;
                        case 0:
                            System.out.println("Admin panelinden çıkılıyor...");
                            return;
                        default:
                            System.out.println("Geçersiz seçim!");
                    }
                } catch (Exception e) {
                    System.out.println("Hata: " + e.getMessage());
                    scanner.nextLine();
                }
            }
        } else {
            System.out.println("Admin girişi başarısız!");
        }
    }
    
    private static void generateReport(Admin admin, FlightBookingSystem system, Scanner scanner) {
        System.out.println("\n=== RAPOR OLUŞTUR ===");
        System.out.println("Rapor dönemi seçin:");
        System.out.println("1. Bugün");
        System.out.println("2. Bu Hafta");
        System.out.println("3. Bu Ay");
        System.out.println("4. Bu Yıl");
        System.out.println("5. Özel Tarih Aralığı");
        System.out.print("Seçiminiz: ");
        
        int choice = scanner.nextInt();
        scanner.nextLine();
        
        Calendar cal = Calendar.getInstance();
        Date endDate = new Date(); // Current date
        
        Calendar startCal = Calendar.getInstance();
        
        switch (choice) {
            case 1: // Today
                startCal.setTime(endDate);
                startCal.set(Calendar.HOUR_OF_DAY, 0);
                startCal.set(Calendar.MINUTE, 0);
                startCal.set(Calendar.SECOND, 0);
                break;
            case 2: // This week
                startCal.setTime(endDate);
                startCal.add(Calendar.DAY_OF_YEAR, -7);
                break;
            case 3: // This month
                startCal.setTime(endDate);
                startCal.add(Calendar.MONTH, -1);
                break;
            case 4: // This year
                startCal.setTime(endDate);
                startCal.add(Calendar.YEAR, -1);
                break;
            case 5: // Custom range
                System.out.print("Başlangıç tarihi (GG/AA/YYYY): ");
                String startStr = scanner.nextLine();
                System.out.print("Bitiş tarihi (GG/AA/YYYY): ");
                String endStr = scanner.nextLine();
                
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
                    startCal.setTime(sdf.parse(startStr));
                    endDate = sdf.parse(endStr);
                } catch (Exception e) {
                    System.out.println("Geçersiz tarih formatı!");
                    return;
                }
                break;
            default:
                System.out.println("Geçersiz seçim!");
                return;
        }
        
        Date startDate = startCal.getTime();
        admin.generateReport(system, startDate, endDate);
    }
    
    private static void viewOccupancyRates(FlightBookingSystem system) {
        System.out.println("\n=== DOLULUK ORANLARI ===");
        Map<String, Integer> occupancy = system.getSeatOccupancyByFlight();
        
        if (occupancy.isEmpty()) {
            System.out.println("Uçuş bulunamadı.");
            return;
        }
        
        for (Map.Entry<String, Integer> entry : occupancy.entrySet()) {
            System.out.println("Uçuş " + entry.getKey() + ": %" + entry.getValue() + " dolu");
        }
    }
    
    private static void viewTopSpendingPassengers(FlightBookingSystem system) {
        System.out.println("\n=== EN ÇOK HARCAMA YAPAN MÜŞTERİLER ===");
        List<Passenger> topPassengers = system.getTopSpendingPassengers(10);
        
        if (topPassengers.isEmpty()) {
            System.out.println("Müşteri bulunamadı.");
            return;
        }
        
        for (int i = 0; i < topPassengers.size(); i++) {
            Passenger p = topPassengers.get(i);
            System.out.println((i + 1) + ". " + p.getFullName() + " - " + p.getIdNumber());
        }
    }
}

















