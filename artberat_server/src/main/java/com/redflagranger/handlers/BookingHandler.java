package com.redflagranger.handlers;

import java.io.IOException;
import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class BookingHandler implements HttpHandler{
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        Gson gson = new Gson();
        
        //  Handle GET request
        if("GET".equals(exchange.getRequestMethod())) {

        }

        //  Handle POST request
        else if("POST".equals(exchange.getRequestMethod())) {

        }

        //  Handle unsupported request
        else {
            exchange.sendResponseHeaders(405, -1);
        }
    }
}
