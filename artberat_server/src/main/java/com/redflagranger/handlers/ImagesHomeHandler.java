package com.redflagranger.handlers;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class ImagesHomeHandler implements HttpHandler {
    private String IMAGES_FOLDER_PATH = "./database/images";
    private String POPULAR_PACKAGES_PATH = "./database/featured_package_detail.json";

    @Override
    public void handle(HttpExchange exchange) throws IOException {   
        File imageFolder = new File(IMAGES_FOLDER_PATH);

        if("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");
            exchange.sendResponseHeaders(204, 0);
        }
        
        //  Handle GET request
        else if("GET".equals(exchange.getRequestMethod())) {
            String query = exchange.getRequestURI().getQuery();
            
            //  Check if the GET request is valid. If not, return 404 error code.
            if(query == null || !query.contains("pageID=")) {
                exchange.sendResponseHeaders(404, -1);
                return;
            }

            else if(query.contains("bg")) {
                //  Check folder exist and not empty.
                if(!checkFolder(imageFolder))
                    return;

                //  List all images in the folder.
                File[] images = imageFolder.listFiles();
                
                //  Set the necessary CORS headers.
                exchange.getResponseHeaders().set("content-type", "application/json");
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, OPTIONS");
                exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");

                //  Preparing the response body.
                List<byte[]> imagesByteList = getImagesBlob(query, images);
                String imageResponse = responseBuilder(imagesByteList, query);

                sendResponse(imageResponse, exchange);
            }
            
            else if(query.contains("premium")) {
                //  Set the necessary CORS headers.
                exchange.getResponseHeaders().set("content-type", "application/json");
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, OPTIONS");
                exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");

                //  List all images in the folder.
                File[] images = imageFolder.listFiles();

                List<byte[]> imagesByteList = getImagesBlob(query, images);
                String featuredPackageResponse = responseBuilder(imagesByteList, query);

                sendResponse(featuredPackageResponse, exchange);
            }
        }
    }

    /* =====================================
     *          GET IMAGES BINARY
     * =====================================
     */
    private List<byte[]> getImagesBlob(String query, File[] images) throws IOException {
        List<String> imageContainer = new ArrayList<>(); //Contain list of file names
        List<Path> imagePathContainer = new ArrayList<>();
        List<byte[]> imageBytesContainer = new ArrayList<>();
        String fileHeader = query.split("pageID=")[1];
        int arraySize = 0;

        //  Get the relevant images
        for(File image : images) {
            String imageName = image.getName();
            if(imageName.split("-")[0].equals(fileHeader)) {  
                imageContainer.add(imageName);
                arraySize++;
            }
        }

        //  Get the images path
        for(int id = 0; id < arraySize; id++) {
            File image = new File(IMAGES_FOLDER_PATH, imageContainer.get(id));
            imagePathContainer.add(image.toPath());
        }

        //  Get the image BLOB
        for(int i = 0; i < arraySize; i++) {
            byte[] imagePlaceholder = Files.readAllBytes(imagePathContainer.get(i));
        
            imageBytesContainer.add(imagePlaceholder);
        }
        return imageBytesContainer;
    }

    /* =====================================
     *  CHECK FOLDER EXIST AND NOT EMPTY
     * =====================================
     */
    private boolean checkFolder(File imageFolder) {
        //  Check if the file exist. If not exist, return.
        if(!imageFolder.exists() && !imageFolder.isDirectory()) {
            System.out.println("Database is not found.");
            return false;
        }

        File[] images = imageFolder.listFiles();

        //  Check if folder is empty. If empty, return.
        if(images == null) {
            System.out.println("The folder is empty.");
            return false;
        }

        return true;
    }
    
    /* =====================================
     * PARSE RESPONSE FOR FEATURED PACKAGES
     * =====================================
     */
    private String readFeaturedPackagesJSON(String packagesJSON, List<byte[]> imageBytes) {
        JsonArray packagesArray = JsonParser.parseString(packagesJSON).getAsJsonArray();
        int imageIndex = 0;

        for (JsonElement packageElement : packagesArray) {
            JsonObject packageObject = packageElement.getAsJsonObject();
            
            // Assign the image blob to the package
            if (imageIndex < imageBytes.size()) {
                String imageBlob = Base64.getEncoder().encodeToString(imageBytes.get(imageIndex));
                packageObject.addProperty("image", "data:image/jpeg;base64," + imageBlob);
                imageIndex++;
            }
        }

        // Final result, wrapping in "packages" root
        JsonObject result = new JsonObject();
        result.add("packages", packagesArray);
        return new GsonBuilder().setPrettyPrinting().create().toJson(result);
    }

    /* =====================================
     *          BUILD RESPONSE BODY
     * =====================================
     */

    private String responseBuilder(List<byte[]> imageBytes, String query) throws IOException {
        int listSize = imageBytes.size();
        String fileHeader = query.split("pageID=")[1];

        if(fileHeader.equals("bg")) {
            StringBuilder responseBuilder = new StringBuilder();
            responseBuilder.append("{\"images\": [");
            for(int id = 0; id < listSize; id++) {
                responseBuilder.append(
                    "{\"id\": " + (id + 1) + ", \"image\": \"data:image/jpeg;base64," + 
                    Base64.getEncoder().encodeToString(imageBytes.get(id))  + "\"}"
                );
    
                if((id + 1) != listSize)
                    responseBuilder.append(", ");
                }
            responseBuilder.append("]}");
            return new String(responseBuilder.toString());
        } else if (fileHeader.equals("premium")) {
            //  Read the featured packages JSON file.
            String packagesJSON = new String(
                Files.readAllBytes(new File(POPULAR_PACKAGES_PATH).toPath())
            );
           return readFeaturedPackagesJSON(packagesJSON, imageBytes);
        }
        return "{\"error\": \"Invalid pageID value\"}";
    }

    /* =====================================
     *          SEND RESPONSE
     * =====================================
     */

    private void sendResponse(String responseBody, HttpExchange exchange) throws IOException {
        exchange.sendResponseHeaders(200, responseBody.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(responseBody.getBytes());
    }
    
}
