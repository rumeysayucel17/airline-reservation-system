import java.util.*;

public class Admin {
    private String username;
    private String password;
    private String email;
    private AdminRole role;
    private Date lastLogin;
    private List<AdminLog> activityLogs;
    private boolean isActive;
    
    public enum AdminRole {
        SUPER_ADMIN,
        OPERATIONS,
        ACCOUNTING
    }
    
    public Admin(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = AdminRole.SUPER_ADMIN;
        this.lastLogin = new Date();
        this.activityLogs = new ArrayList<>();
        this.isActive = true;
    }
    
    public Admin(String username, String password, String email, AdminRole role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.lastLogin = new Date();
        this.activityLogs = new ArrayList<>();
        this.isActive = true;
    }
    
    public boolean authenticate(String password) {
        return this.password.equals(password);
    }
    
    public void updateLoginTime() {
        this.lastLogin = new Date();
        logActivity("LOGIN", "Admin logged in");
    }
    
    public void logActivity(String action, String description) {
        AdminLog log = new AdminLog(this.username, action, description);
        activityLogs.add(log);
    }
    
    // Getters and Setters
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public AdminRole getRole() { return role; }
    public Date getLastLogin() { return lastLogin; }
    public List<AdminLog> getActivityLogs() { return activityLogs; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { this.isActive = active; }
    public void setRole(AdminRole role) { this.role = role; }
    
    public static class AdminLog {
        private Date timestamp;
        private String adminUsername;
        private String action;
        private String description;
        
        public AdminLog(String adminUsername, String action, String description) {
            this.timestamp = new Date();
            this.adminUsername = adminUsername;
            this.action = action;
            this.description = description;
        }
        
        public Date getTimestamp() { return timestamp; }
        public String getAdminUsername() { return adminUsername; }
        public String getAction() { return action; }
        public String getDescription() { return description; }
    }
}



































