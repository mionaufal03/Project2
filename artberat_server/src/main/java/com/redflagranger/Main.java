package com.redflagranger;

import java.io.IOException;
import java.net.InetSocketAddress;
import com.redflagranger.handlers.ImagesHomeHandler;
import com.redflagranger.handlers.LoginHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 10);
        server.createContext("/image", new ImagesHomeHandler());
        server.createContext("/login", new LoginHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Starting server on port 8000...");
    }
}