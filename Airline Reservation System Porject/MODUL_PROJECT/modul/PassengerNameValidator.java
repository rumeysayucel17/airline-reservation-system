// PassengerNameValidator.java - Validates passenger name correction requests
import java.util.*;

public class PassengerNameValidator {
    
    // Turkish character mappings for normalization
    private static final Map<Character, Character> TURKISH_CHAR_MAP = new HashMap<>();
    static {
        TURKISH_CHAR_MAP.put('ü', 'u');
        TURKISH_CHAR_MAP.put('Ü', 'U');
        TURKISH_CHAR_MAP.put('ö', 'o');
        TURKISH_CHAR_MAP.put('Ö', 'O');
        TURKISH_CHAR_MAP.put('ç', 'c');
        TURKISH_CHAR_MAP.put('Ç', 'C');
        TURKISH_CHAR_MAP.put('ş', 's');
        TURKISH_CHAR_MAP.put('Ş', 'S');
        TURKISH_CHAR_MAP.put('ğ', 'g');
        TURKISH_CHAR_MAP.put('Ğ', 'G');
        TURKISH_CHAR_MAP.put('ı', 'i');
        TURKISH_CHAR_MAP.put('İ', 'I');
    }
    
    // Turkish character pairs that are considered equivalent
    private static final Set<String> TURKISH_EQUIVALENT_PAIRS = new HashSet<>();
    static {
        // u/ü variations
        TURKISH_EQUIVALENT_PAIRS.add("uü");
        TURKISH_EQUIVALENT_PAIRS.add("üu");
        // o/ö variations
        TURKISH_EQUIVALENT_PAIRS.add("oö");
        TURKISH_EQUIVALENT_PAIRS.add("öo");
        // c/ç variations
        TURKISH_EQUIVALENT_PAIRS.add("cç");
        TURKISH_EQUIVALENT_PAIRS.add("çc");
        // s/ş variations
        TURKISH_EQUIVALENT_PAIRS.add("sş");
        TURKISH_EQUIVALENT_PAIRS.add("şs");
        // g/ğ variations
        TURKISH_EQUIVALENT_PAIRS.add("gğ");
        TURKISH_EQUIVALENT_PAIRS.add("ğg");
        // i/ı variations (Turkish dotless i)
        TURKISH_EQUIVALENT_PAIRS.add("ıi");
        TURKISH_EQUIVALENT_PAIRS.add("iı");
    }
    
    /**
     * Validates a passenger name correction request
     * 
     * @param oldFirstName Original first name
     * @param newFirstName New first name
     * @param oldLastName Original last name
     * @param newLastName New last name
     * @return JSON string with decision, confidence, and reason
     */
    public static String validateNameCorrection(String oldFirstName, String newFirstName,
                                                String oldLastName, String newLastName) {
        // Normalize inputs (trim whitespace, handle null)
        oldFirstName = normalizeInput(oldFirstName);
        newFirstName = normalizeInput(newFirstName);
        oldLastName = normalizeInput(oldLastName);
        newLastName = normalizeInput(newLastName);
        
        // Check if names are exactly identical (case-insensitive, but respecting Turkish chars)
        boolean firstNameIdentical = areNamesIdentical(oldFirstName, newFirstName);
        boolean lastNameIdentical = areNamesIdentical(oldLastName, newLastName);
        
        // Check for Turkish character variations (same length, only Turkish char differences)
        boolean firstNameTurkishOnly = !firstNameIdentical && 
            oldFirstName.length() == newFirstName.length() &&
            hasOnlyTurkishCharacterDifferences(oldFirstName, newFirstName);
        boolean lastNameTurkishOnly = !lastNameIdentical && 
            oldLastName.length() == newLastName.length() &&
            hasOnlyTurkishCharacterDifferences(oldLastName, newLastName);
        
        if ((firstNameIdentical || firstNameTurkishOnly) && 
            (lastNameIdentical || lastNameTurkishOnly)) {
            String reason = "Names are identical - no change needed";
            if (firstNameTurkishOnly || lastNameTurkishOnly) {
                reason = "Turkish character variation(s)";
            }
            return createResponse("APPROVE", 1.0, reason);
        }
        
        // Validate first name
        NameValidationResult firstNameResult = validateNamePart(oldFirstName, newFirstName);
        
        // Validate last name
        NameValidationResult lastNameResult = validateNamePart(oldLastName, newLastName);
        
        // Both names must pass validation
        if (firstNameResult.isValid && lastNameResult.isValid) {
            double confidence = Math.min(firstNameResult.confidence, lastNameResult.confidence);
            String reason = "Both first and last names are valid minor corrections";
            if (!firstNameResult.reason.isEmpty() || !lastNameResult.reason.isEmpty()) {
                reason = firstNameResult.reason + "; " + lastNameResult.reason;
            }
            return createResponse("APPROVE", confidence, reason);
        } else {
            // At least one name failed validation
            String reason = "";
            if (!firstNameResult.isValid) {
                reason = "First name: " + firstNameResult.reason;
            }
            if (!lastNameResult.isValid) {
                if (!reason.isEmpty()) reason += "; ";
                reason += "Last name: " + lastNameResult.reason;
            }
            double confidence = Math.max(
                firstNameResult.isValid ? firstNameResult.confidence : 0.0,
                lastNameResult.isValid ? lastNameResult.confidence : 0.0
            );
            return createResponse("REJECT", confidence, reason);
        }
    }
    
    /**
     * Checks if two names are identical (case-insensitive, character-by-character)
     */
    private static boolean areNamesIdentical(String name1, String name2) {
        if (name1.length() != name2.length()) {
            return false;
        }
        
        name1 = name1.toLowerCase();
        name2 = name2.toLowerCase();
        
        for (int i = 0; i < name1.length(); i++) {
            if (name1.charAt(i) != name2.charAt(i)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Validates a single name part (first or last name)
     */
    private static NameValidationResult validateNamePart(String oldName, String newName) {
        // Check if names are identical (case-insensitive, character-by-character)
        if (areNamesIdentical(oldName, newName)) {
            return new NameValidationResult(true, 1.0, "Identical");
        }
        
        // Check if names differ only by Turkish characters
        boolean onlyTurkishDiff = hasOnlyTurkishCharacterDifferences(oldName, newName);
        if (onlyTurkishDiff && oldName.length() == newName.length()) {
            return new NameValidationResult(true, 1.0, "Turkish character variation");
        }
        
        // Check length difference - if too different, likely different person
        int lengthDiff = Math.abs(oldName.length() - newName.length());
        if (lengthDiff > 2) {
            return new NameValidationResult(false, 0.0, 
                "Length difference too large (" + lengthDiff + " characters)");
        }
        
        // Calculate character differences using Levenshtein-like approach
        int differences = countCharacterDifferences(oldName, newName);
        
        // Allow maximum 2 character differences
        if (differences > 2) {
            return new NameValidationResult(false, 0.0, 
                "Too many character differences (" + differences + ")");
        }
        
        // Check if names are too different (completely different names)
        if (isCompletelyDifferentName(oldName, newName)) {
            return new NameValidationResult(false, 0.0, 
                "Names are completely different - likely different person");
        }
        
        // Calculate confidence based on number of differences
        double confidence = 1.0 - (differences * 0.15);
        if (confidence < 0.5) confidence = 0.5;
        
        String reason = differences == 0 ? "Identical" : 
                       differences == 1 ? "1 character difference (typo correction)" :
                       "2 character differences (typo correction)";
        
        return new NameValidationResult(true, confidence, reason);
    }
    
    /**
     * Checks if two names differ only by Turkish character variations
     */
    private static boolean hasOnlyTurkishCharacterDifferences(String oldName, String newName) {
        if (oldName.length() != newName.length()) {
            return false;
        }
        
        oldName = oldName.toLowerCase();
        newName = newName.toLowerCase();
        
        for (int i = 0; i < oldName.length(); i++) {
            char oldChar = oldName.charAt(i);
            char newChar = newName.charAt(i);
            
            if (oldChar != newChar && !areTurkishEquivalent(oldChar, newChar)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Counts character differences between two names, accounting for Turkish character variations
     */
    private static int countCharacterDifferences(String oldName, String newName) {
        oldName = oldName.toLowerCase();
        newName = newName.toLowerCase();
        
        // Use dynamic programming approach (simplified Levenshtein distance)
        int[][] dp = new int[oldName.length() + 1][newName.length() + 1];
        
        // Initialize base cases
        for (int i = 0; i <= oldName.length(); i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= newName.length(); j++) {
            dp[0][j] = j;
        }
        
        // Fill the DP table
        for (int i = 1; i <= oldName.length(); i++) {
            for (int j = 1; j <= newName.length(); j++) {
                char oldChar = oldName.charAt(i - 1);
                char newChar = newName.charAt(j - 1);
                
                if (areTurkishEquivalent(oldChar, newChar) || oldChar == newChar) {
                    // Characters are the same or Turkish equivalents
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    // Characters are different
                    dp[i][j] = Math.min(
                        Math.min(dp[i - 1][j] + 1,      // deletion
                                dp[i][j - 1] + 1),      // insertion
                        dp[i - 1][j - 1] + 1           // substitution
                    );
                }
            }
        }
        
        return dp[oldName.length()][newName.length()];
    }
    
    /**
     * Checks if two characters are Turkish equivalents
     */
    private static boolean areTurkishEquivalent(char c1, char c2) {
        if (c1 == c2) return true;
        
        // Normalize to lowercase for comparison
        char c1Lower = Character.toLowerCase(c1);
        char c2Lower = Character.toLowerCase(c2);
        
        if (c1Lower == c2Lower) return true;
        
        String pair1 = String.valueOf(c1Lower) + c2Lower;
        String pair2 = String.valueOf(c2Lower) + c1Lower;
        
        return TURKISH_EQUIVALENT_PAIRS.contains(pair1) || 
               TURKISH_EQUIVALENT_PAIRS.contains(pair2);
    }
    
    /**
     * Checks if names are completely different (likely different person)
     */
    private static boolean isCompletelyDifferentName(String oldName, String newName) {
        oldName = oldName.toLowerCase().trim();
        newName = newName.toLowerCase().trim();
        
        // If both names are very short and completely different
        if (oldName.length() <= 3 && newName.length() <= 3) {
            if (countCharacterDifferences(oldName, newName) >= oldName.length()) {
                return true;
            }
        }
        
        // Check if more than 50% of characters are different (for longer names)
        int minLength = Math.min(oldName.length(), newName.length());
        if (minLength > 0) {
            int differences = countCharacterDifferences(oldName, newName);
            double differenceRatio = (double) differences / minLength;
            if (differenceRatio > 0.5 && differences > 2) {
                return true;
            }
        }
        
        // Check if the first character is different and names are short
        if (oldName.length() >= 2 && newName.length() >= 2) {
            if (!areTurkishEquivalent(oldName.charAt(0), newName.charAt(0)) &&
                countCharacterDifferences(oldName, newName) > 2) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Normalizes input string (handles null, trims whitespace)
     */
    private static String normalizeInput(String input) {
        if (input == null) return "";
        return input.trim();
    }
    
    /**
     * Creates JSON response string
     */
    private static String createResponse(String decision, double confidence, String reason) {
        // Use Locale.US to ensure decimal point is used instead of comma
        return String.format(
            java.util.Locale.US,
            "{\n" +
            "  \"decision\": \"%s\",\n" +
            "  \"confidence\": %.2f,\n" +
            "  \"reason\": \"%s\"\n" +
            "}",
            decision, confidence, escapeJson(reason)
        );
    }
    
    /**
     * Escapes special characters for JSON
     */
    private static String escapeJson(String str) {
        return str.replace("\\", "\\\\")
                  .replace("\"", "\\\"")
                  .replace("\n", "\\n")
                  .replace("\r", "\\r")
                  .replace("\t", "\\t");
    }
    
    /**
     * Inner class to hold validation result for a name part
     */
    private static class NameValidationResult {
        boolean isValid;
        double confidence;
        String reason;
        
        NameValidationResult(boolean isValid, double confidence, String reason) {
            this.isValid = isValid;
            this.confidence = confidence;
            this.reason = reason;
        }
    }
    
    /**
     * Main method for testing
     */
    public static void main(String[] args) {
        // Test cases
        System.out.println("=== Passenger Name Correction Validation System ===\n");
        
        // Test 1: Identical names
        System.out.println("Test 1: Identical names");
        System.out.println(validateNameCorrection("Ahmet", "Ahmet", "Yılmaz", "Yılmaz"));
        System.out.println();
        
        // Test 2: Turkish character variation
        System.out.println("Test 2: Turkish character variation");
        System.out.println(validateNameCorrection("Ahmet", "Ahmet", "Yilmaz", "Yılmaz"));
        System.out.println();
        
        // Test 3: Single typo
        System.out.println("Test 3: Single typo");
        System.out.println(validateNameCorrection("Mehmet", "Mehemt", "Demir", "Demir"));
        System.out.println();
        
        // Test 4: Two character differences
        System.out.println("Test 4: Two character differences");
        System.out.println(validateNameCorrection("Ayşe", "Ayse", "Özkan", "Ozkan"));
        System.out.println();
        
        // Test 5: Completely different name (should reject)
        System.out.println("Test 5: Completely different name");
        System.out.println(validateNameCorrection("Ahmet", "Mehmet", "Yılmaz", "Demir"));
        System.out.println();
        
        // Test 6: Too many differences
        System.out.println("Test 6: Too many differences");
        System.out.println(validateNameCorrection("Ali", "Veli", "Kaya", "Kaya"));
        System.out.println();
        
        // Test 7: Case sensitivity (should be ignored)
        System.out.println("Test 7: Case difference");
        System.out.println(validateNameCorrection("ahmet", "Ahmet", "yilmaz", "Yılmaz"));
        System.out.println();
    }
}

