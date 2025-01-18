package com.redflagranger.handlers;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class LoginHandler implements HttpHandler{
    private String MASTER_KEY_PATH = "./database/masterkey.json";
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        Gson gson = new Gson();

        if("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "POST, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");
            exchange.sendResponseHeaders(204, 0);
        }

        //  Handle POST request
        else if("POST".equals(exchange.getRequestMethod())) {
            //  SET CORS HEADERS
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");

            Scanner requestBody = new Scanner(exchange.getRequestBody());
            StringBuilder loginRequest = new StringBuilder();

            //  Create StringBuilder request
            while(requestBody.hasNext())
                loginRequest.append(requestBody.nextLine());
            requestBody.close();

            /*
             * getting all values in account csv.
             * CSV FORMAT --> userid,email,password,token
             */
            BufferedReader reader = new BufferedReader(new FileReader(MASTER_KEY_PATH));
            String line;
            List<String> accountValues = new ArrayList<>();
            while((line = reader.readLine()) != null) {
                String[] values = line.split(",");
                for(String value : values)
                    accountValues.add(value);
            }
            reader.close();

            if(!checkCredential(loginRequest.toString(), accountValues)) {
                exchange.sendResponseHeaders(401, -1);
                return;
            }

            String loginResponse = responseBuilder(gson, loginRequest.toString(), accountValues);
            sendResponse(loginResponse, exchange);
        }

        //  Handle unsupported request
        else {
            exchange.sendResponseHeaders(405, -1);
        }
    }

    /*
     * ===================================================
     *                  RESPONSE BUILDER
     * ===================================================
     */
    private String responseBuilder(Gson gson, String loginRequest, List<String> accountValues) throws FileNotFoundException {
        /*
         *  REQUEST BODY JSON:
         * {
         *      "email": "something@something.com",
         *      "password": "somethingpw"
         * }
         * 
         * RESPONSE BODY JSON:
         * {
         *      "token": "insert token here";
         * }
         * 
         * Encryption algorithm:
         * --> KEY: pnifKcTNX3yrMS3WHeMkZ78lTgYb8RqB
         * --> combine key, email, password --> token string = KEY + email + password
         * --> convert token string to int
         * --> token number = (token string + (userID * 2))^2
         * 
         * Decryption algorithm (reverse encryption):
         * --> token string = sqrt(token number) - (userID * 2)
         */

        //  Get the master key
        FileReader fileReader = new FileReader(MASTER_KEY_PATH);
        JsonObject jsonObject = JsonParser.parseReader(fileReader).getAsJsonObject();
        String masterKey = jsonObject.get("key").getAsString();

        //  Get credentials from request
        jsonObject = JsonParser.parseString(loginRequest).getAsJsonObject();
        int userid = jsonObject.get("userid").getAsInt();
        String email = jsonObject.get("email").getAsString();
        String password = jsonObject.get("password").getAsString();

        //  Creating token
        String stringToken = masterKey + email + password;
        int integerToken = (Integer.parseInt(stringToken) + (userid * 2)) * 2;

        StringBuilder responseBody = new StringBuilder();
        responseBody.append(
            "{\"token\": \"" + integerToken + "\"}"
        );
        
        return responseBody.toString();
    }

    /*
     * ===================================================
     *          SEND RESPONSE TO FRONTEND
     * ===================================================
     */
    private void sendResponse(String responseBody, HttpExchange exchange) throws IOException {
        exchange.sendResponseHeaders(200, responseBody.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(responseBody.getBytes());
    }

    /*
     * ===================================================
     *              CHECK CREDENTIALS
     * ===================================================
     */
    private boolean checkCredential(String loginRequest, List<String> accountValues) {
        //  Get credentials from request
        JsonObject jsonObject = JsonParser.parseString(loginRequest.toString()).getAsJsonObject();
        String email = jsonObject.get("email").getAsString();
        String password = jsonObject.get("password").getAsString();
        boolean emailValid = false;
        boolean passwordValid = false;
        boolean valid = false;

        /*
         * Check if email and password is correct
         * CSV FORMAT --> userid[0],email[1],password[2],token[3]
         */
        for(int i = 1; i < accountValues.size(); i = i + 4) {
            if(email.equals(accountValues.get(i))) {
                emailValid = true;
            }
        }

        /*
         * Check if email and password is correct
         * CSV FORMAT --> userid[0],email[1],password[2],token[3]
         */
        for(int i = 2; i < accountValues.size(); i = i + 4) {
            if(password.equals(accountValues.get(i))) {
                passwordValid = true;
            }
        }

        if(emailValid && passwordValid)
            valid = true;
        return valid;
    }
}
