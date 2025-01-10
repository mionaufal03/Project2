package com.redflagranger.models.BookingData;

public class BookingDetails {
    private String bookingID;
    private String selectedPackage;
    private int price;
    private int duration;
    private String delivery;
}

/*
 * {
  "status": "success",
  "message": "Your booking has been confirmed.",
  "bookingDetails": {
    "bookingID": "BOOK-1640241234567",
    "package": "Package B",
    "price": "RM200",
    "duration": "2 Hour",
    "photos": "120+ Edited Photos",
    "delivery": "Photos via Gdrive"
  },
  "userDetails": {
    "date": "2025-01-20",
    "time": "10:00 AM",
    "pax": 4,
    "meetingLocation": "KLCC Park",
    "additionalInfo": "A family of 4, with 2 kids."
  },
  "totalAmount": "RM200",
  "nextSteps": "You will receive a confirmation email shortly."
}

 */