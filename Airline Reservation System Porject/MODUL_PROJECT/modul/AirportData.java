// AirportData.java - Real-world Turkish airport routes data
import java.util.*;

public class AirportData {
    // Map: departure city -> list of destination cities
    private static final Map<String, List<String>> ROUTES = new HashMap<>();
    
    static {
        // Istanbul routes (IST/SAW) - Major hub
        ROUTES.put("İstanbul", Arrays.asList(
            "Ankara", "İzmir", "Antalya", "Bodrum", "Dalaman", "Trabzon", "Adana",
            "Gaziantep", "Kayseri", "Van", "Diyarbakır", "Erzurum", "Samsun",
            "Bursa", "Eskişehir", "Konya", "Malatya", "Hatay", "Muğla", "Denizli",
            "Balıkesir", "Çanakkale", "Tekirdağ", "Sakarya", "Kocaeli", "Edirne"
        ));
        
        // Ankara routes (ESB)
        ROUTES.put("Ankara", Arrays.asList(
            "İstanbul", "İzmir", "Antalya", "Trabzon", "Adana", "Gaziantep",
            "Kayseri", "Van", "Diyarbakır", "Erzurum", "Samsun", "Eskişehir",
            "Konya", "Malatya", "Hatay", "Bodrum", "Dalaman", "Muğla"
        ));
        
        // Izmir routes (ADB)
        ROUTES.put("İzmir", Arrays.asList(
            "İstanbul", "Ankara", "Antalya", "Bodrum", "Dalaman", "Muğla",
            "Denizli", "Balıkesir", "Çanakkale", "Bursa", "Eskişehir", "Konya"
        ));
        
        // Antalya routes (AYT)
        ROUTES.put("Antalya", Arrays.asList(
            "İstanbul", "Ankara", "İzmir", "Bodrum", "Dalaman", "Muğla",
            "Trabzon", "Adana", "Gaziantep", "Kayseri", "Denizli"
        ));
        
        // Trabzon routes (TZX)
        ROUTES.put("Trabzon", Arrays.asList(
            "İstanbul", "Ankara", "Antalya", "Adana", "Gaziantep", "Kayseri",
            "Erzurum", "Samsun", "Rize", "Artvin", "Giresun", "Ordu"
        ));
        
        // Adana routes (ADA)
        ROUTES.put("Adana", Arrays.asList(
            "İstanbul", "Ankara", "Antalya", "Trabzon", "Gaziantep", "Kayseri",
            "Hatay", "Mersin", "Osmaniye", "Kahramanmaraş", "Malatya"
        ));
        
        // Gaziantep routes (GZT)
        ROUTES.put("Gaziantep", Arrays.asList(
            "İstanbul", "Ankara", "Antalya", "Trabzon", "Adana", "Kayseri",
            "Diyarbakır", "Şanlıurfa", "Malatya", "Hatay", "Kahramanmaraş"
        ));
        
        // Kayseri routes (ASR)
        ROUTES.put("Kayseri", Arrays.asList(
            "İstanbul", "Ankara", "Antalya", "Trabzon", "Adana", "Gaziantep",
            "Van", "Diyarbakır", "Erzurum", "Sivas", "Malatya", "Nevşehir"
        ));
        
        // Van routes (VAN)
        ROUTES.put("Van", Arrays.asList(
            "İstanbul", "Ankara", "Kayseri", "Diyarbakır", "Erzurum", "Muş",
            "Ağrı", "Hakkari", "Şırnak", "Bitlis"
        ));
        
        // Diyarbakır routes (DIY)
        ROUTES.put("Diyarbakır", Arrays.asList(
            "İstanbul", "Ankara", "Gaziantep", "Kayseri", "Van", "Erzurum",
            "Şanlıurfa", "Mardin", "Batman", "Siirt", "Şırnak", "Muş"
        ));
        
        // Erzurum routes (ERZ)
        ROUTES.put("Erzurum", Arrays.asList(
            "İstanbul", "Ankara", "Trabzon", "Kayseri", "Van", "Diyarbakır",
            "Erzincan", "Artvin", "Ardahan", "Kars", "Ağrı"
        ));
        
        // Samsun routes (SZF)
        ROUTES.put("Samsun", Arrays.asList(
            "İstanbul", "Ankara", "Trabzon", "Erzurum", "Ordu", "Giresun",
            "Sinop", "Kastamonu", "Çorum", "Amasya", "Tokat"
        ));
        
        // Bodrum routes (BJV)
        ROUTES.put("Bodrum", Arrays.asList(
            "İstanbul", "Ankara", "İzmir", "Antalya", "Dalaman", "Muğla"
        ));
        
        // Dalaman routes (DLM)
        ROUTES.put("Dalaman", Arrays.asList(
            "İstanbul", "Ankara", "İzmir", "Antalya", "Bodrum", "Muğla"
        ));
        
        // Bursa routes (YEI)
        ROUTES.put("Bursa", Arrays.asList(
            "İstanbul", "Ankara", "İzmir", "Eskişehir", "Balıkesir", "Çanakkale"
        ));
        
        // Eskişehir routes (AOE)
        ROUTES.put("Eskişehir", Arrays.asList(
            "İstanbul", "Ankara", "İzmir", "Bursa", "Konya", "Kütahya"
        ));
        
        // Konya routes (KYA)
        ROUTES.put("Konya", Arrays.asList(
            "İstanbul", "Ankara", "İzmir", "Antalya", "Eskişehir", "Kayseri",
            "Nevşehir", "Karaman", "Aksaray"
        ));
        
        // Malatya routes (MLX)
        ROUTES.put("Malatya", Arrays.asList(
            "İstanbul", "Ankara", "Adana", "Gaziantep", "Kayseri", "Diyarbakır",
            "Elazığ", "Tunceli", "Sivas"
        ));
        
        // Hatay routes (HTY)
        ROUTES.put("Hatay", Arrays.asList(
            "İstanbul", "Ankara", "Antalya", "Adana", "Gaziantep", "Kahramanmaraş"
        ));
        
        // Muğla routes
        ROUTES.put("Muğla", Arrays.asList(
            "İstanbul", "Ankara", "İzmir", "Antalya", "Bodrum", "Dalaman"
        ));
        
        // Denizli routes
        ROUTES.put("Denizli", Arrays.asList(
            "İstanbul", "Ankara", "İzmir", "Antalya", "Muğla"
        ));
        
        // Balıkesir routes
        ROUTES.put("Balıkesir", Arrays.asList(
            "İstanbul", "Ankara", "İzmir", "Bursa", "Çanakkale"
        ));
        
        // Çanakkale routes
        ROUTES.put("Çanakkale", Arrays.asList(
            "İstanbul", "Ankara", "İzmir", "Balıkesir", "Bursa", "Edirne"
        ));
        
        // Other cities with limited routes
        ROUTES.put("Rize", Arrays.asList("İstanbul", "Ankara", "Trabzon", "Erzurum"));
        ROUTES.put("Artvin", Arrays.asList("İstanbul", "Ankara", "Trabzon", "Erzurum"));
        ROUTES.put("Giresun", Arrays.asList("İstanbul", "Ankara", "Trabzon", "Samsun"));
        ROUTES.put("Ordu", Arrays.asList("İstanbul", "Ankara", "Trabzon", "Samsun"));
        ROUTES.put("Mersin", Arrays.asList("İstanbul", "Ankara", "Adana", "Antalya"));
        ROUTES.put("Osmaniye", Arrays.asList("İstanbul", "Ankara", "Adana"));
        ROUTES.put("Kahramanmaraş", Arrays.asList("İstanbul", "Ankara", "Adana", "Gaziantep", "Hatay"));
        ROUTES.put("Şanlıurfa", Arrays.asList("İstanbul", "Ankara", "Gaziantep", "Diyarbakır"));
        ROUTES.put("Mardin", Arrays.asList("İstanbul", "Ankara", "Diyarbakır", "Gaziantep"));
        ROUTES.put("Batman", Arrays.asList("İstanbul", "Ankara", "Diyarbakır"));
        ROUTES.put("Siirt", Arrays.asList("İstanbul", "Ankara", "Diyarbakır"));
        ROUTES.put("Şırnak", Arrays.asList("İstanbul", "Ankara", "Van", "Diyarbakır"));
        ROUTES.put("Muş", Arrays.asList("İstanbul", "Ankara", "Van", "Diyarbakır", "Erzurum"));
        ROUTES.put("Ağrı", Arrays.asList("İstanbul", "Ankara", "Van", "Erzurum"));
        ROUTES.put("Hakkari", Arrays.asList("İstanbul", "Ankara", "Van"));
        ROUTES.put("Bitlis", Arrays.asList("İstanbul", "Ankara", "Van", "Diyarbakır"));
        ROUTES.put("Erzincan", Arrays.asList("İstanbul", "Ankara", "Erzurum", "Sivas"));
        ROUTES.put("Ardahan", Arrays.asList("İstanbul", "Ankara", "Erzurum", "Kars"));
        ROUTES.put("Kars", Arrays.asList("İstanbul", "Ankara", "Erzurum", "Ardahan"));
        ROUTES.put("Sivas", Arrays.asList("İstanbul", "Ankara", "Kayseri", "Erzincan", "Malatya"));
        ROUTES.put("Nevşehir", Arrays.asList("İstanbul", "Ankara", "Kayseri", "Konya"));
        ROUTES.put("Sinop", Arrays.asList("İstanbul", "Ankara", "Samsun"));
        ROUTES.put("Kastamonu", Arrays.asList("İstanbul", "Ankara", "Samsun"));
        ROUTES.put("Çorum", Arrays.asList("İstanbul", "Ankara", "Samsun", "Amasya"));
        ROUTES.put("Amasya", Arrays.asList("İstanbul", "Ankara", "Samsun", "Tokat"));
        ROUTES.put("Tokat", Arrays.asList("İstanbul", "Ankara", "Samsun", "Sivas"));
        ROUTES.put("Elazığ", Arrays.asList("İstanbul", "Ankara", "Malatya", "Diyarbakır"));
        ROUTES.put("Tunceli", Arrays.asList("İstanbul", "Ankara", "Malatya", "Elazığ"));
        ROUTES.put("Karaman", Arrays.asList("İstanbul", "Ankara", "Konya"));
        ROUTES.put("Aksaray", Arrays.asList("İstanbul", "Ankara", "Konya", "Nevşehir"));
        ROUTES.put("Tekirdağ", Arrays.asList("İstanbul", "Ankara", "Edirne"));
        ROUTES.put("Edirne", Arrays.asList("İstanbul", "Ankara", "Tekirdağ", "Çanakkale"));
        ROUTES.put("Sakarya", Arrays.asList("İstanbul", "Ankara", "Bursa"));
        ROUTES.put("Kocaeli", Arrays.asList("İstanbul", "Ankara", "Bursa"));
        ROUTES.put("Kütahya", Arrays.asList("İstanbul", "Ankara", "Eskişehir", "Bursa"));
    }
    
    public static List<String> getDestinations(String departureCity) {
        return ROUTES.getOrDefault(departureCity, new ArrayList<>());
    }
    
    public static List<String> getAllCities() {
        Set<String> allCities = new TreeSet<>();
        allCities.addAll(ROUTES.keySet());
        for (List<String> destinations : ROUTES.values()) {
            allCities.addAll(destinations);
        }
        return new ArrayList<>(allCities);
    }
    
    public static boolean routeExists(String departure, String destination) {
        List<String> destinations = ROUTES.get(departure);
        return destinations != null && destinations.contains(destination);
    }
    
    public static String getAirportCode(String city) {
        Map<String, String> codes = new HashMap<>();
        codes.put("İstanbul", "IST/SAW");
        codes.put("Ankara", "ESB");
        codes.put("İzmir", "ADB");
        codes.put("Antalya", "AYT");
        codes.put("Trabzon", "TZX");
        codes.put("Adana", "ADA");
        codes.put("Gaziantep", "GZT");
        codes.put("Kayseri", "ASR");
        codes.put("Van", "VAN");
        codes.put("Diyarbakır", "DIY");
        codes.put("Erzurum", "ERZ");
        codes.put("Samsun", "SZF");
        codes.put("Bodrum", "BJV");
        codes.put("Dalaman", "DLM");
        codes.put("Bursa", "YEI");
        codes.put("Eskişehir", "AOE");
        codes.put("Konya", "KYA");
        codes.put("Malatya", "MLX");
        codes.put("Hatay", "HTY");
        codes.put("Muğla", "DLM");
        codes.put("Denizli", "DNZ");
        codes.put("Balıkesir", "BZI");
        codes.put("Çanakkale", "CKZ");
        codes.put("Rize", "RIZ");
        codes.put("Artvin", "ARV");
        codes.put("Giresun", "GIR");
        codes.put("Ordu", "OGU");
        codes.put("Mersin", "MRS");
        codes.put("Osmaniye", "OSM");
        codes.put("Kahramanmaraş", "KCM");
        codes.put("Şanlıurfa", "GNY");
        codes.put("Mardin", "MQM");
        codes.put("Batman", "BAL");
        codes.put("Siirt", "SXZ");
        codes.put("Şırnak", "NKT");
        codes.put("Muş", "MSR");
        codes.put("Ağrı", "AJI");
        codes.put("Hakkari", "YKO");
        codes.put("Bitlis", "BTL");
        codes.put("Erzincan", "ERC");
        codes.put("Ardahan", "ARD");
        codes.put("Kars", "KSY");
        codes.put("Sivas", "VAS");
        codes.put("Nevşehir", "NAV");
        codes.put("Sinop", "NOP");
        codes.put("Kastamonu", "KST");
        codes.put("Çorum", "COR");
        codes.put("Amasya", "MZH");
        codes.put("Tokat", "TJK");
        codes.put("Elazığ", "EZS");
        codes.put("Tunceli", "TUN");
        codes.put("Karaman", "KRM");
        codes.put("Aksaray", "AKS");
        codes.put("Tekirdağ", "TEK");
        codes.put("Edirne", "EDO");
        codes.put("Sakarya", "SAK");
        codes.put("Kocaeli", "KCO");
        codes.put("Kütahya", "KUT");
        
        return codes.getOrDefault(city, city.substring(0, Math.min(3, city.length())).toUpperCase());
    }
}


