package com.redflagranger.handlers;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
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

        // Handle POST request
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

            JsonObject requestBody = JsonParser.parseString(bookingResponse.toString()).getAsJsonObject();

            if (requestBody.get("mode").getAsString().equals("edit")) {
                int bookingId = requestBody.get("bookingId").getAsInt();
                if (markBookingAsFinished(bookingId)) {
                    sendResponse("Booking marked as finished", exchange);
                } else {
                    sendResponse("Booking not found", exchange);
                }
            } 
            
            else {
                addBooking(bookingResponse.toString());
                sendResponse("Booking Successful", exchange);
            }
        }

        else if("GET".equals(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");
            String response = getPendingBookings();

            sendResponse(response, exchange);
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
         *     {
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
    
        String location = "\"" + 
        jsonObject.get("userAddress").getAsString() + " " +
        jsonObject.get("userPostcode").getAsString() +" " +
        jsonObject.get("userTown").getAsString() + "\"";
    
        BufferedWriter bookingWriter = new BufferedWriter(new FileWriter(BOOKING_DATABASE_PATH, true)); 
    
        for (int i = 0; i < packagesArray.size(); i++) {
            JsonObject packageDetails = packagesArray.get(i).getAsJsonObject(); // Renamed for better clarity
    
            // Access individual fields inside the package object
            String packageName = packageDetails.getAsJsonObject("package").get("title").getAsString(); // Access "title" for package name
            double packagePrice = packageDetails.getAsJsonObject("package").get("price").getAsDouble();
            String packageDate = packageDetails.get("date").getAsString(); // Access "date"
            String packageTime = packageDetails.get("time").getAsString(); // Access "time"
    
            String data = 
                (bookingid - 1) + "," + 
                jsonObject.get("username").getAsString() + "," + 
                jsonObject.get("userEmail").getAsString() + "," + 
                jsonObject.get("userPhone").getAsString() + "," + 
                packageName + "," + 
                packageDate + "," + 
                packageTime + "," +
                location + "," +
                packagePrice + "," + 
                jsonObject.get("paymentMethod").getAsString() + "," +
                "Pending\n"; // Assuming "Pending" as a status for now
    
            // Write data to file
            bookingWriter.write(data);
    
            // Increment bookingid after writing each package
            bookingid++;
            bookingWriter.flush();
            System.out.println(data);
        }
    
        System.out.println("Booking Added.");
        bookingWriter.close();

    }

    private boolean markBookingAsFinished(int bookingId) throws IOException {
        List<String> lines = new ArrayList<>();
        boolean isUpdated = false;

        try (BufferedReader br = new BufferedReader(new FileReader(BOOKING_DATABASE_PATH))) {
            String header = br.readLine();
            if (header != null) {
                lines.add(header);
            }

            String line;
            while ((line = br.readLine()) != null) {
                String[] fields = line.split(",");
                if (Integer.parseInt(fields[0]) == bookingId) {
                    fields[10] = "Finished";
                    isUpdated = true;
                }
                lines.add(String.join(",", fields));
            }
        }

        if (isUpdated) {
            try (BufferedWriter bw = new BufferedWriter(new FileWriter(BOOKING_DATABASE_PATH))) {
                for (String line : lines) {
                    bw.write(line);
                    bw.newLine();
                }
            }
        }

        return isUpdated;
    }

    private String getPendingBookings() throws IOException {
        List<String[]> pendingBookings = new ArrayList<>();
        
        // Read CSV file
        BufferedReader bookingReader = new BufferedReader(new FileReader(BOOKING_DATABASE_PATH));
        String line;
        
        // Skip the header
        bookingReader.readLine();
        
        while ((line = bookingReader.readLine()) != null) {
            String[] fields = line.split(",");
            String status = fields[10]; // Assuming "status" is in the 10th column
            
            // Only process bookings with "Pending" status
            if (status.equalsIgnoreCase("Pending")) {
                pendingBookings.add(fields);
            }
        }
        bookingReader.close();

        // Convert to JSON
        JsonArray jsonArray = new JsonArray();
        for (String[] booking : pendingBookings) {
            JsonObject bookingObject = new JsonObject();
            bookingObject.addProperty("booking_id", booking[0]);
            bookingObject.addProperty("customer_name", booking[1]);
            bookingObject.addProperty("email", booking[2]);
            bookingObject.addProperty("phone_number", booking[3]);
            bookingObject.addProperty("package", booking[4]);
            bookingObject.addProperty("date", booking[5]);
            bookingObject.addProperty("time", booking[6]);
            bookingObject.addProperty("location", booking[7]);
            bookingObject.addProperty("price", booking[8]);
            bookingObject.addProperty("payment", booking[9]);
            bookingObject.addProperty("status", booking[10]);
            
            jsonArray.add(bookingObject);
        }
        return jsonArray.toString();
    }

    private void sendResponse(String responseBody, HttpExchange exchange) throws IOException {
        exchange.sendResponseHeaders(200, responseBody.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(responseBody.getBytes());
    }
}
