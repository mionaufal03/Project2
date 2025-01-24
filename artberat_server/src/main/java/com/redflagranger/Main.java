package com.redflagranger;

import java.io.IOException;
import java.net.InetSocketAddress;
import com.redflagranger.handlers.BookingHandler;
import com.redflagranger.handlers.LoginHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 10);
        server.createContext("/booking", new BookingHandler());
        server.createContext("/login", new LoginHandler());
        server.setExecutor(null);
        server.start(); //Starting server
        System.out.println("Starting server on port 8000...");
        
    }
}