package com.redflagranger.handlers;

import java.io.IOException;
import java.util.Scanner;

import com.google.gson.Gson;
import com.redflagranger.models.BookingData.BookingDetails;
import com.redflagranger.process.ProcessBooking;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class BookingHandler implements HttpHandler{
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        Gson gson = new Gson();
        ProcessBooking processBooking = new ProcessBooking();
        
        //  Handle GET request
        if("GET".equals(exchange.getRequestMethod())) {

        }

        //  Handle POST request
        else if("POST".equals(exchange.getRequestMethod())) {
            Scanner requestScanner = new Scanner(exchange.getRequestMethod());
            StringBuilder bookingRequestBody = new StringBuilder();
            
            while(requestScanner.hasNext())
                bookingRequestBody.append(exchange.getRequestBody());
            requestScanner.close();

            BookingDetails bookingResult =  processBooking.process(bookingRequestBody.toString());
        }

        //  Handle unsupported request
        else {
            exchange.sendResponseHeaders(405, -1);
        }
    }
}
