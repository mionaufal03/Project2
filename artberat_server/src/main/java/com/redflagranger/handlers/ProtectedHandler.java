package com.redflagranger.handlers;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Scanner;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class ProtectedHandler implements HttpHandler{
    private String ACCOUNT_DATA_PATH = "./database/account.csv";

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");
            exchange.sendResponseHeaders(204, 0);
        }

        else if("POST".equals(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "text/plain");
            Scanner scanner = new Scanner(exchange.getRequestBody());
            StringBuilder token = new StringBuilder();

            while(scanner.hasNext())
                token.append(scanner.hasNext());
            scanner.close();

            BufferedReader reader = new BufferedReader(new FileReader(ACCOUNT_DATA_PATH));
            String[] accountRecords = reader.toString().split("\n");
            String[][] accountDetails = new String[accountRecords.length - 1][];
            reader.close();

            //  Creating 2D arrays
            for(int i = 1; i < accountRecords.length; i++)
                accountDetails[i-1] = accountRecords[i].split(",");

            boolean isAuthorized = false;

            for(int i = 0; i < accountDetails.length; i++) {
                for(int j = 4; j < 5; i = i + 5) {
                    if(token.toString().equals(accountDetails[i][j])) {
                        isAuthorized = true;
                    }
                }
            }

            int statusCode;
            String response;

            if(!isAuthorized) {
                response = "not authorized";
                statusCode = 403;
            } else {
                response = "authorized";
                statusCode = 200;
            }

            exchange.sendResponseHeaders(statusCode, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();

        }
    }
}
