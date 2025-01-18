package com.redflagranger;

import java.io.IOException;
import java.net.InetSocketAddress;

import com.redflagranger.handlers.ImagesHomeHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 10);
        server.createContext("/image/home", new ImagesHomeHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Starting server...");
    }
}