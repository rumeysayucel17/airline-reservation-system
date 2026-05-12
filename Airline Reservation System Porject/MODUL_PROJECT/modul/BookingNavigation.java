// BookingNavigation.java - Stack-based navigation history management for booking flow
import java.util.*;

/**
 * Navigation service using Stack data structure for managing booking step history.
 * Implements LIFO (Last In First Out) principle for back button functionality.
 */
public class BookingNavigation {
    
    /**
     * Enum representing booking steps
     */
    public enum BookingStep {
        STEP1_PASSENGER_INFO("Step 1: Passenger Information"),
        STEP2_FLIGHT_SEAT_SELECTION("Step 2: Flight & Seat Selection"),
        STEP3_PAYMENT("Step 3: Payment");
        
        private final String description;
        
        BookingStep(String description) {
            this.description = description;
        }
        
        public String getDescription() {
            return description;
        }
    }
    
    // Stack for navigation history (LIFO - Last In First Out)
    private Stack<BookingStep> navigationHistory;
    
    // Current step tracking
    private BookingStep currentStep;
    
    public BookingNavigation() {
        this.navigationHistory = new Stack<>();
        this.currentStep = BookingStep.STEP1_PASSENGER_INFO;
        // Initialize with first step
        this.navigationHistory.push(BookingStep.STEP1_PASSENGER_INFO);
    }
    
    /**
     * Navigate to a specific step
     * Pushes the step onto the stack
     * 
     * Time Complexity: O(1) - Stack push operation
     * 
     * @param step The step to navigate to
     */
    public void goToStep(BookingStep step) {
        if (currentStep != step) {
            navigationHistory.push(step);
            currentStep = step;
        }
    }
    
    /**
     * Go back to previous step
     * Pops the current step from stack and returns the previous step
     * 
     * Time Complexity: O(1) - Stack pop operation
     * 
     * @return Previous step, or null if no previous step exists
     */
    public BookingStep goBack() {
        if (navigationHistory.size() > 1) {
            navigationHistory.pop(); // Remove current step
            currentStep = navigationHistory.peek(); // Get previous step
            return currentStep;
        }
        // If only one step remains, return it (can't go back further)
        return currentStep;
    }
    
    /**
     * Get current step without removing it from stack
     * 
     * Time Complexity: O(1) - Stack peek operation
     * 
     * @return Current step
     */
    public BookingStep getCurrentStep() {
        return currentStep;
    }
    
    /**
     * Get previous step without removing current step
     * 
     * Time Complexity: O(1) - Stack peek operation
     * 
     * @return Previous step, or null if no previous step exists
     */
    public BookingStep getPreviousStep() {
        if (navigationHistory.size() > 1) {
            // Create a temporary stack to peek at previous step
            Stack<BookingStep> tempStack = new Stack<>();
            tempStack.addAll(navigationHistory);
            tempStack.pop(); // Remove current
            return tempStack.peek(); // Get previous
        }
        return null;
    }
    
    /**
     * Check if back navigation is possible
     * 
     * Time Complexity: O(1) - Stack size check
     * 
     * @return true if can go back, false otherwise
     */
    public boolean canGoBack() {
        return navigationHistory.size() > 1;
    }
    
    /**
     * Get navigation history size
     * 
     * Time Complexity: O(1) - Stack size operation
     * 
     * @return Number of steps in history
     */
    public int getHistorySize() {
        return navigationHistory.size();
    }
    
    /**
     * Reset navigation to initial state
     * 
     * Time Complexity: O(1) - Stack clear operation
     */
    public void reset() {
        navigationHistory.clear();
        currentStep = BookingStep.STEP1_PASSENGER_INFO;
        navigationHistory.push(BookingStep.STEP1_PASSENGER_INFO);
    }
    
    /**
     * Get all navigation history (for debugging/logging)
     * 
     * Time Complexity: O(n) - Creating copy of stack
     * 
     * @return List of steps in navigation history
     */
    public List<BookingStep> getHistory() {
        return new ArrayList<>(navigationHistory);
    }
    
    @Override
    public String toString() {
        return "BookingNavigation{" +
                "currentStep=" + currentStep.getDescription() +
                ", historySize=" + navigationHistory.size() +
                ", canGoBack=" + canGoBack() +
                '}';
    }
}

