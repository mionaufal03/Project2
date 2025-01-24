package com.redflagranger.handlers;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.Buffer;
import java.util.Scanner;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class LoginHandler implements HttpHandler {
    private String MASTER_KEY = "tlwnlkse3y854vtwevte";
    private String ACCOUNTS_DATABASE_PATH = "./database/accounts.csv";

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");
            exchange.sendResponseHeaders(204, -1);
        }

        else if("POST".equals(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");

            File file = new File(ACCOUNTS_DATABASE_PATH);
            if (!file.exists()) {
                System.out.println("File does not exist.");
                return;
            } else if (!file.canRead()) {
                System.out.println("File cannot be read.");
                return;
            }

            boolean isAdmin;
            Scanner scanAccount = new Scanner(exchange.getRequestBody());
            StringBuilder accountRequest = new StringBuilder();

            while(scanAccount.hasNext())
                accountRequest.append(scanAccount.nextLine());
            scanAccount.close();

            if(verifyCredentials(accountRequest.toString())) {
                isAdmin = true;
            } else {
                isAdmin = false;
            }

            if(isAdmin) {
                StringBuilder response = new StringBuilder();
                response.append(
                    "{\"key\": \"" + MASTER_KEY + "\"," +
                    "\"username\": \"" + getUsername(accountRequest.toString()) + "\"}"
                );

                exchange.sendResponseHeaders(200, response.toString().getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.toString().getBytes());
            }

            else {
                exchange.sendResponseHeaders(401, -1);
            }
        }

        else if("GET".equals(exchange.getRequestMethod())) {

        }
    }

    private boolean verifyCredentials(String accountDetails) throws IOException { 
        JsonObject account = JsonParser.parseString(accountDetails).getAsJsonObject();
        String delimiter = ","; // CSV column separator
        String line;

        // Try-with-resources to ensure BufferedReader is closed
        try (BufferedReader br = new BufferedReader(new FileReader(ACCOUNTS_DATABASE_PATH))) {
            // Skip the header
            line = br.readLine();
            
            while ((line = br.readLine()) != null) {
                String[] values = line.split(delimiter);

                // Skip malformed lines
                if (values.length < 3) continue;

                String email = values[2];    // Column 2: Email
                String password = values[3]; // Column 3: Password

                if (account.get("email").getAsString().equals(email) && 
                    account.get("password").getAsString().equals(password)) {
                    return true;
                }
            }
        } catch (FileNotFoundException e) {
            System.err.println("Accounts database not found: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("Error reading accounts database: " + e.getMessage());
        }

        return false;
    }

    private String getUsername(String accountDetails) throws IOException {
        JsonObject account = JsonParser.parseString(accountDetails).getAsJsonObject();
        BufferedReader br = new BufferedReader(new FileReader(ACCOUNTS_DATABASE_PATH));
        String delimiter = ",";
        br.readLine();

        String line;
        while((line = br.readLine()) != null) {
            String[] values = line.split(delimiter);

            String username = values[1];
            String email = values[2];

            if(account.get("email").getAsString().equals(email)) {
                return username;
            }
        }

        return "null";
        
    }

}
