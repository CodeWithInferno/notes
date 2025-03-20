import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class BankApp {
    private static JFrame myFrame;
    private static JPanel loginPanel, dashboardPanel;
    private static JTextField usernameField;
    private static JLabel welcomeLabel, balanceLabel;
    private static double accountBalance = 5000.00; // Initial balance
   
    public static void main(String[] args) {
        // Create the main frame
        myFrame = new JFrame("Bank App");
        myFrame.setSize(800, 600);
        myFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        myFrame.setLayout(new CardLayout());

        //  login screen
        createLoginScreen();
       
        myFrame.setVisible(true);
    }

    private static void createLoginScreen() {
        loginPanel = new JPanel();
        loginPanel.setLayout(new GridLayout(3, 1));
        loginPanel.setBackground(Color.green);
       
        Font myFont = new Font("Arial", Font.PLAIN, 24);
       
        // Label
        JLabel loginLabel = new JLabel("Welcome to the bank app! Please enter your username:", SwingConstants.CENTER);
        loginLabel.setFont(myFont);
        loginPanel.add(loginLabel);
       
        // Input field
        usernameField = new JTextField(15);
        usernameField.setFont(myFont);
        JPanel inputPanel = new JPanel();
        inputPanel.add(usernameField);
        loginPanel.add(inputPanel);
       
        // Submit button
        JButton loginButton = new JButton("Log in");
        loginButton.setFont(myFont);
        loginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String username = usernameField.getText();
                if (!username.isEmpty()) {
                    showDashboard(username);
                } else {
                    JOptionPane.showMessageDialog(myFrame, "Please enter your username.", "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(loginButton);
        loginPanel.add(buttonPanel);

        myFrame.add(loginPanel);
    }

    private static void showDashboard(String username) {
        myFrame.getContentPane().removeAll(); // Clear frame
        dashboardPanel = new JPanel();
        dashboardPanel.setLayout(new GridLayout(5, 1));
        dashboardPanel.setBackground(Color.WHITE);
       
        Font myFont = new Font("Arial", Font.BOLD, 24);
       
        // Welcome message
        welcomeLabel = new JLabel("Welcome, " + username + "!", SwingConstants.CENTER);
        welcomeLabel.setFont(myFont);
        dashboardPanel.add(welcomeLabel);
       
        // Account balance label
        balanceLabel = new JLabel("Account Balance: $" + accountBalance, SwingConstants.CENTER);
        balanceLabel.setFont(myFont);
        dashboardPanel.add(balanceLabel);
       
        // Buttons panel
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(1, 3, 20, 20));

        JButton depositButton = new JButton("Deposit");
        JButton withdrawButton = new JButton("Withdraw");
        JButton transferButton = new JButton("Transfer");

        depositButton.setFont(myFont);
        withdrawButton.setFont(myFont);
        transferButton.setFont(myFont);
       
        buttonPanel.add(depositButton);
        buttonPanel.add(withdrawButton);
        buttonPanel.add(transferButton);

        dashboardPanel.add(buttonPanel);
       
        // Logout button
        JButton logoutButton = new JButton("Log Out");
        logoutButton.setFont(myFont);
        logoutButton.addActionListener(e -> {
            myFrame.getContentPane().removeAll();
            createLoginScreen();
            myFrame.revalidate();
            myFrame.repaint();
        });
        dashboardPanel.add(logoutButton);
       
        myFrame.add(dashboardPanel);
        myFrame.revalidate();
        myFrame.repaint();

        // ActionListener for Deposit Button
        depositButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                depositMoney();
            }
        });
    }

    private static void depositMoney() {
        String amountStr = JOptionPane.showInputDialog(myFrame, "Enter deposit amount:");
        if (amountStr != null) {
            
                double amount = Double.parseDouble(amountStr);
                if (amount > 0) {
                    accountBalance += amount;
                    balanceLabel.setText("Account Balance: $" + accountBalance);
                    JOptionPane.showMessageDialog(myFrame, "Deposit Successful!", "Success", JOptionPane.INFORMATION_MESSAGE);
                } 
            } 
            }
        
    }

