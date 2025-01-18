package com.redflagranger.handlers;

import java.io.IOException;
import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class LoginHandler implements HttpHandler{
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        Gson gson = new Gson();

        if("OPTIONS".equals(exchange.getRequestMethod())) {
            //TODO preflight checks
        }
        
        //  Handle GET request
        else if("GET".equals(exchange.getRequestMethod())) {

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
