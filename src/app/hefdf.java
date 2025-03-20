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
    private static CardLayout cardLayout;
    private static JPanel mainPanel;
    
    public static void main(String[] args) {
        myFrame = new JFrame("Bank App");
        myFrame.setSize(800, 600);
        myFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        cardLayout = new CardLayout();
        mainPanel = new JPanel(cardLayout);

        createLoginScreen();
        createDashboardScreen();
        
        myFrame.add(mainPanel);
        myFrame.setVisible(true);
    }

    private static void createLoginScreen() {
        loginPanel = new JPanel();
        loginPanel.setLayout(new GridLayout(3, 1));
        loginPanel.setBackground(new Color(220, 220, 220)); // Light gray background

        Font myFont = new Font("Arial", Font.PLAIN, 24);

        JLabel loginLabel = new JLabel("Welcome to the Bank App! Enter your username:", SwingConstants.CENTER);
        loginLabel.setFont(myFont);
        loginPanel.add(loginLabel);

        usernameField = new JTextField(15);
        usernameField.setFont(myFont);
        JPanel inputPanel = new JPanel();
        inputPanel.add(usernameField);
        loginPanel.add(inputPanel);

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

        mainPanel.add(loginPanel, "LoginScreen");
    }

    private static void createDashboardScreen() {
        dashboardPanel = new JPanel();
        dashboardPanel.setLayout(new GridLayout(5, 1));
        dashboardPanel.setBackground(Color.WHITE);

        Font myFont = new Font("Arial", Font.BOLD, 24);

        welcomeLabel = new JLabel("Welcome, User!", SwingConstants.CENTER);
        welcomeLabel.setFont(myFont);
        dashboardPanel.add(welcomeLabel);

        balanceLabel = new JLabel("Account Balance: $" + accountBalance, SwingConstants.CENTER);
        balanceLabel.setFont(myFont);
        dashboardPanel.add(balanceLabel);

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

        depositButton.addActionListener(e -> depositMoney());
        withdrawButton.addActionListener(e -> withdrawMoney());

        JButton logoutButton = new JButton("Log Out");
        logoutButton.setFont(myFont);
        logoutButton.addActionListener(e -> cardLayout.show(mainPanel, "LoginScreen"));
        dashboardPanel.add(logoutButton);

        mainPanel.add(dashboardPanel, "DashboardScreen");
    }

    private static void showDashboard(String username) {
        welcomeLabel.setText("Welcome, " + username + "!");
        updateBalanceLabel();
        cardLayout.show(mainPanel, "DashboardScreen");
    }

    private static void depositMoney() {
        String amountStr = JOptionPane.showInputDialog(myFrame, "Enter deposit amount:");
        if (amountStr != null) {
            try {
                double amount = Double.parseDouble(amountStr);
                if (amount > 0) {
                    accountBalance += amount;
                    updateBalanceLabel();
                    JOptionPane.showMessageDialog(myFrame, "Deposit Successful!", "Success", JOptionPane.INFORMATION_MESSAGE);
                } else {
                    JOptionPane.showMessageDialog(myFrame, "Invalid amount!", "Error", JOptionPane.ERROR_MESSAGE);
                }
            } catch (NumberFormatException e) {
                JOptionPane.showMessageDialog(myFrame, "Invalid input!", "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }

    private static void withdrawMoney() {
        String amountStr = JOptionPane.showInputDialog(myFrame, "Enter withdrawal amount:");
        if (amountStr != null) {
            try {
                double amount = Double.parseDouble(amountStr);
                if (amount > 0 && amount <= accountBalance) {
                    accountBalance -= amount;
                    updateBalanceLabel();
                    JOptionPane.showMessageDialog(myFrame, "Withdrawal Successful!", "Success", JOptionPane.INFORMATION_MESSAGE);
                } else {
                    JOptionPane.showMessageDialog(myFrame, "Invalid amount or insufficient funds!", "Error", JOptionPane.ERROR_MESSAGE);
                }
            } catch (NumberFormatException e) {
                JOptionPane.showMessageDialog(myFrame, "Invalid input!", "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }

    private static void updateBalanceLabel() {
        balanceLabel.setText("Account Balance: $" + accountBalance);
    }
}
