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

public class ImagesHandler implements HttpHandler {
    private String HOME_IMAGES_FOLDER = "./database/images/home";
    private String POPULAR_PACKAGES_PATH = "./database/featured_package_detail.json";
    private String WEDDING_IMAGES_FOLDER = "./database/images/wedding";
    private String WEDDING_PACKAGES_IMAGES_FOLDER = "./database/images/wedding/packages";
    private String CATEGORY_IMAGES_FOLDER = "./database/images/category";
    private String FAMILY_IMAGES_FOLDER = "./database/images/family";
    private String BIRTHDAY_IMAGES_FOLDER = "./database/images/birthday";
    private String GRADUATION_IMAGES_FOLDER = "./database/images/graduation";
    private String PACKAGES_PATH = "./database/packages.json";


    @Override
    public void handle(HttpExchange exchange) throws IOException {   
        File homeImageFolder = new File(HOME_IMAGES_FOLDER);
        File categoryImageFolder = new File(CATEGORY_IMAGES_FOLDER);
        File weddingImageFolder = new File(WEDDING_IMAGES_FOLDER);
        File weddingPackagesImageFolder = new File(WEDDING_PACKAGES_IMAGES_FOLDER);
        File familyImageFolder = new File(FAMILY_IMAGES_FOLDER);
        File graduationImageFolder = new File(GRADUATION_IMAGES_FOLDER);
        File birthdayImageFolder = new File(BIRTHDAY_IMAGES_FOLDER);

        if("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");
            exchange.sendResponseHeaders(204, 0);
        }
        
        //  Handle GET request
        else if("GET".equals(exchange.getRequestMethod())) {
        //  Set the necessary CORS headers.
            exchange.getResponseHeaders().set("content-type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Method", "GET, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-type");

            String query = exchange.getRequestURI().getQuery();
            
            //  Check if the GET request is valid. If not, return 404 error code.
            if(query == null || !query.contains("pageID=")) {
                exchange.sendResponseHeaders(404, -1);
                return;
            }

            else if(query.contains("bg")) {
                //  Check folder exist and not empty.
                if(!checkFolder(homeImageFolder))
                    return;

                //  List all images in the folder.
                File[] images = homeImageFolder.listFiles();

                //  Preparing the response body.
                List<byte[]> imagesByteList = getImagesBlob(query, images);
                String imageResponse = responseBuilder(imagesByteList, query, images);

                sendResponse(imageResponse, exchange);
            }
            
            else if(query.contains("premium")) {
                //  Check folder exist and not empty.
                if(!checkFolder(homeImageFolder))
                    return;

                //  List all images in the folder.
                File[] images = homeImageFolder.listFiles();

                List<byte[]> imagesByteList = getImagesBlob(query, images);
                String featuredPackageResponse = responseBuilder(imagesByteList, query, images);

                sendResponse(featuredPackageResponse, exchange);
            }

            else if(query.contains("category")) {
                //  Check folder exist and not empty.
                if(!checkFolder(categoryImageFolder))
                    return;

                //  List all images in the folder.
                File[] images = categoryImageFolder.listFiles();

                //  Preparing the response body.
                List<byte[]> imagesByteList = getImagesBlob(query, images);
                String categoryImageResponse = responseBuilder(imagesByteList, query, images);

                sendResponse(categoryImageResponse, exchange);
            }

            else if(query.contains("family") || query.contains("graduation") || query.contains("birthday")) {
                String fileHeader = query.split("pageID=")[1];
                File imageFolder;

                if(fileHeader.equals("family")) 
                    imageFolder = familyImageFolder;
                else if(fileHeader.equals("graduation"))
                    imageFolder = graduationImageFolder;
                else if(fileHeader.equals("birthday"))
                    imageFolder = birthdayImageFolder;
                else 
                    return;

                //  Check folder exist and not empty.
                if(!checkFolder(imageFolder))
                return;
                
                //  List all images in the folder.
                File[] images = imageFolder.listFiles();

                //  Preparing the response body.
                List<byte[]> imagesByteList = getImagesBlob(query, images);
                String imageResponse = responseBuilder(imagesByteList, query, images);

                sendResponse(imageResponse, exchange);
            }

            else if(query.contains("wedding") || query.contains("wedding_packages")) {
                String fileHeader = query.split("pageID=")[1];
                File imageFolder;

                if(fileHeader.equals("wedding")) 
                    imageFolder = weddingImageFolder;
                else if(fileHeader.equals("wedding_packages"))
                    imageFolder = weddingPackagesImageFolder;
                else 
                    return;
                //  Check folder exist and not empty.
                if(!checkFolder(imageFolder))
                return;
                
                //  List all images in the folder.
                File[] images = imageFolder.listFiles();
                
                //  Preparing the response body.
                List<byte[]> imagesByteList = getImagesBlob(query, images);
                String weddingImageResponse = responseBuilder(imagesByteList, query, images);


                sendResponse(weddingImageResponse, exchange);
            }
        }
    }

   /* =====================================
     *         GET FILE NAMES
     * =====================================
     */
    private List<String> getAllFileNames(File[] images, String query) {
        List<String> imageContainer = new ArrayList<>();
        String fileHeader = query.split("pageID=")[1];

         //  Get the relevant images
        for(File image : images) {
            String imageName = image.getName();
            if(imageName.split("-")[0].equals(fileHeader)) {  
                imageContainer.add(imageName);
            }
        }

        return imageContainer;
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
        
        String folderPath = "";
        if(fileHeader.equals("bg") || fileHeader.equals("premium"))
            folderPath = HOME_IMAGES_FOLDER;
        else if(fileHeader.equals("category"))
            folderPath = CATEGORY_IMAGES_FOLDER;
        else if(fileHeader.equals("wedding"))
            folderPath = WEDDING_IMAGES_FOLDER;
        else if(fileHeader.equals("wedding_packages"))
            folderPath = WEDDING_PACKAGES_IMAGES_FOLDER;
        else if(fileHeader.equals("family"))
            folderPath = FAMILY_IMAGES_FOLDER;
        else if(fileHeader.equals("graduation"))
            folderPath = GRADUATION_IMAGES_FOLDER;
        else if(fileHeader.equals("birthday"))
            folderPath = BIRTHDAY_IMAGES_FOLDER;

        //  Get the relevant images
        imageContainer = getAllFileNames(images, query);

        //  Get the images path
        int arraySize = imageContainer.size();
        for(int id = 0; id < arraySize; id++) {
            File image = new File(folderPath, imageContainer.get(id));
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
    private boolean checkFolder(File homeImageFolder) {
        //  Check if the file exist. If not exist, return.
        if(!homeImageFolder.exists() && !homeImageFolder.isDirectory()) {
            System.out.println("Database is not found.");
            return false;
        }

        File[] images = homeImageFolder.listFiles();

        //  Check if folder is empty. If empty, return.
        if(images == null) {
            System.out.println("The folder is empty.");
            return false;
        }

        return true;
    }

    /* =====================================
     * PARSE RESPONSE FOR HOME BACKGROUND
     * =====================================
     */
    private String parseHomeBackground(int listSize, List<byte[]> imageBytes) {
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
     *       PARSE FOR CATEGORY IMAGES
     * =====================================
     */
    private String parseCategoryImages(int listSize, List<byte[]> imageBytes, List<String> imageNames) {
        /*
        * JSON FORMAT FOR CATEGORY
        * 
        *  categories : [
        *      { id: 1, title: "Wedding", image: "/images/wedding-category.jpg", link: "/wedding" },
        *      { id: 2, title: "Graduation", image: "/images/graduation-category.jpg", link: "/graduation" },
        *      { id: 3, title: "Family", image: "/images/family-category.jpg", link: "/family" },
        *      { id: 4, title: "Birthday", image: "/images/birthday-category.jpg", link: "/birthday" },
        *  ];
        */
        StringBuilder responseBuilder = new StringBuilder();
        responseBuilder.append("{\"images\": [");
        for(int id = 0; id < listSize; id++) {
            String name = imageNames.get(id).split("-")[1].split("\\.")[0];
            String capitalizedName = name.substring(0, 1).toUpperCase() + name.substring(1);
            responseBuilder.append(
                "{\"id\": " + (id + 1) + "," + 
                "\"title\": \"" + capitalizedName + "\"," + 
                "\"image\": \"data:image/jpeg;base64," + Base64.getEncoder().encodeToString(imageBytes.get(id))  + "\"," +
                "\"link\": \" /" + name  + "\"}"
            );

            if((id + 1) != listSize)
                responseBuilder.append(", ");
            }
        responseBuilder.append("]}");
        return new String(responseBuilder.toString()); 
    }

    /* =====================================
     *     PARSE NORMAL PACKAGES IMAGES
     * =====================================
     */
    private String parseNormalPackagesImages(String packagesJSON, List<byte[]> imageBytes, String query) {
        JsonObject jsonObject = JsonParser.parseString(packagesJSON).getAsJsonObject();
        JsonObject object = jsonObject.getAsJsonObject(query.split("pageID=")[1]);
        StringBuilder images = new StringBuilder();

        int i = 1;
        images.append("\"images\": [");
        for (byte[] image : imageBytes) {
            images.append(
                "{\"id\": " + i + "," +
                "\"image\": \"data:image/jpeg;base64," + Base64.getEncoder().encodeToString(image) + "\"}"
            );
            if (i < imageBytes.size()) {
                images.append(",");
            }
            i++;
        }
        images.append("]");

        String response = "{" +
            "\"title\": \"" + object.get("title").getAsString() + "\"," +
            "\"price\": \"" + object.get("price").getAsString() + "\"," +
            "\"details\": \"" + object.get("details").getAsString() + "\"," +
            images.toString() + "," +  // Append the images array directly here
            "\"label\": \"" + object.get("label").getAsString() + "\"" +
        "}";

        return response;
    }

    /* =====================================
     *          PARSE WEDDING IMAGES
     * =====================================
     */
    private String parseWeddingImages(String packagesJSON, List<byte[]> imageBytes) {
        JsonArray weddingArray = JsonParser.parseString(packagesJSON)
                                           .getAsJsonObject()
                                           .getAsJsonArray("wedding");
        
        JsonArray weddingData = new JsonArray();  // Using Gson's JsonArray for better handling
    
        for (JsonElement data : weddingArray) {
            JsonObject packageObject = data.getAsJsonObject();
            String packageName = packageObject.get("title").getAsString();
            int packageID = packageObject.get("id").getAsInt();
            String packageDetails = packageObject.get("details").getAsString();
            String packagePrice = packageObject.get("price").getAsString();
    
            // Create the response object for each wedding package
            JsonObject weddingPackage = new JsonObject();
            weddingPackage.addProperty("id", packageID);
            weddingPackage.addProperty("title", packageName);
            weddingPackage.addProperty("price", packagePrice);
            weddingPackage.addProperty("details", packageDetails);
    
            // Add the image if the index is valid, else assign a default value
            if (packageID < imageBytes.size()) {
                String imageBase64 = Base64.getEncoder().encodeToString(imageBytes.get(packageID));
                weddingPackage.addProperty("image", "data:image/jpeg;base64," + imageBase64);
            } else {
                weddingPackage.addProperty("image", "data:image/jpeg;base64,defaultImageBase64");  // Handle missing image
            }
    
            weddingData.add(weddingPackage);  // Add to the JsonArray
        }
    
        // Wrap the response in a JsonObject and return as a pretty-printed JSON string
        JsonObject responseObject = new JsonObject();
        responseObject.add("wedding", weddingData);
        
        return new GsonBuilder().setPrettyPrinting().create().toJson(responseObject);  // Pretty-print the response
    }

    /* =====================================
     *          BUILD RESPONSE BODY
     * =====================================
     */

    private String responseBuilder(List<byte[]> imageBytes, String query, File[] images) throws IOException {
        int listSize = imageBytes.size();
        String fileHeader = query.split("pageID=")[1];

        if(fileHeader.equals("bg")) {
            return parseHomeBackground(listSize, imageBytes);
        } 
        
        else if (fileHeader.equals("premium")) {
            return readFeaturedPackagesJSON(
                new String(Files.readAllBytes(new File(POPULAR_PACKAGES_PATH).toPath())), 
                imageBytes
            );
        } 
        
        else if (fileHeader.equals("category")) {
            List<String> fileNames = getAllFileNames(images, query);
            return parseCategoryImages(listSize, imageBytes, fileNames);
        } 
        
        else if (fileHeader.equals("family") || fileHeader.equals("birthday") || fileHeader.equals("graduation")) {
            return parseNormalPackagesImages(
                new String(Files.readAllBytes(new File(PACKAGES_PATH).toPath())), 
                imageBytes, 
                query);
        } 
        
        else if (fileHeader.equals("wedding") || fileHeader.equals("wedding_packages")) {
            return parseWeddingImages(
                new String(Files.readAllBytes(new File(PACKAGES_PATH).toPath())), 
                imageBytes);
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
