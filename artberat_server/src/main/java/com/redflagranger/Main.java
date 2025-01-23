package com.redflagranger;

import java.io.IOException;
import java.net.InetSocketAddress;
import com.redflagranger.handlers.BookingHandler;
import com.redflagranger.handlers.ImagesHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 10);
        server.createContext("/home/image", new ImagesHandler());
        server.createContext("/home/packages", new ImagesHandler());
        server.createContext("/category/image", new ImagesHandler());
        server.createContext("/category/wedding", new ImagesHandler());
        server.createContext("/category/packages", new ImagesHandler());
        server.createContext("/category/family", new ImagesHandler());
        server.createContext("/category/birthday", new ImagesHandler());
        server.createContext("/category/graduation", new ImagesHandler());
        server.createContext("/booking", new BookingHandler());
        server.setExecutor(null);
        server.start(); //Starting server
        System.out.println("Starting server on port 8000...");
        
    }
}