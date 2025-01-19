package com.redflagranger.handlers;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Scanner;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class BookingHandler implements HttpHandler{
    private String BOOKING_DATABASE_PATH = "./database/booking.csv";

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");
            exchange.sendResponseHeaders(204, -1);
        }

        //  Handle POST request
        else if("POST".equals(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("content-type", "plain/text");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");

            Scanner scanBook = new Scanner(exchange.getRequestBody());
            StringBuilder bookingResponse = new StringBuilder();

            while(scanBook.hasNext()) 
                bookingResponse.append(scanBook.nextLine());
            scanBook.close();

            addBooking(bookingResponse.toString());
            sendResponse("Booking Successful", exchange);
        }
    }

    private void addBooking(String booking) throws IOException {
        /*
         * BOOKING TABLE FORMAT:
         * booking_id,customer_name,email,phone_number,package,
         * date,time,location,price,status
         * 
         * BOOKING REQUEST BODY:
         * name:
         * phone:
         * email:
         * location:
         * packages: [
         *     {
         *          title:
         *          price:
         *          date:
         *          time:
         *     },
         * {
         *          title:
         *          price:
         *          date:
         *          time:
         *     }
         * ]
         * payment:
         * 
         * ## MAKE NEW ROW FOR EACH PACKAGE
         */

        BufferedReader bookingReader = new BufferedReader(new FileReader(BOOKING_DATABASE_PATH));

        // Count the number of rows to set bookingid
        int bookingid = 1;
        while (bookingReader.readLine() != null) {
            bookingid++;
        }
        bookingReader.close();

        JsonObject jsonObject = JsonParser.parseString(booking).getAsJsonObject();
        JsonArray packagesArray = jsonObject.getAsJsonArray("packages");

        String Location = "\"" + 
        jsonObject.get("userAddress").getAsString() + ", " +
        jsonObject.get("userPostcode").getAsString() +", " +
        jsonObject.get("userTown").getAsString() + "\"";

        BufferedWriter bookingWriter = new BufferedWriter(new FileWriter(BOOKING_DATABASE_PATH, true)); 

        for (int i = 0; i < packagesArray.size(); i++) {
            JsonObject packageObject = packagesArray.get(i).getAsJsonObject(); // Convert to JsonObject

            // Access individual fields inside the package object
            String packageName = packageObject.get("title").getAsString(); // Access "title" for package name
            double packagePrice = packageObject.get("price").getAsDouble();
            String date = packageObject.get("date").getAsString();
            String time = packageObject.get("time").getAsString();

            String data = 
                (bookingid - 1) + "," + 
                jsonObject.get("username").getAsString() + "," + 
                jsonObject.get("userEmail").getAsString() + "," + 
                jsonObject.get("userPhone").getAsString() + "," + 
                packageName + "," + 
                date + "," + 
                time + "," +
                Location + "," +
                packagePrice + "," + 
                jsonObject.get("paymentMethod").getAsString() + "," +
                ",Pending\n"; // Assuming "Pending" as a status for now

            // Write data to file
            bookingWriter.write(data);

            // Increment bookingid after writing each package
            bookingid++;
            bookingWriter.flush();

        }
        System.out.println("Booking Added.");
        bookingWriter.close();
    }
    

    private void sendResponse(String responseBody, HttpExchange exchange) throws IOException {
        exchange.sendResponseHeaders(200, responseBody.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(responseBody.getBytes());
    }
}
