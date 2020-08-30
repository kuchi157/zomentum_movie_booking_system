# zomentum_movie_booking_system
ticket booking system with the feature to book a ticket, update ticket timing, view all the tickets, delete the ticket, view user details using ticket id

---
## Requirements

For development, you will only need Node.js installed in your environement.
---

## Install

    $ git clone https://github.com/kuchi157/zomentum_movie_booking_system
    $ cd zomentum_movie_booking_system
    $ npm install
    
    
## Running the project
    
    $ npm start
    
    
## Working with Postman

Endpoint 1-> to book a ticket using a username, phoneno and showtime
             choose post request in Postman
             url: http://localhost:8000/bookTicket
             json data format in Body of Postman
             {
                "username":"Roy",
                "phoneno":6871009000,
                "showtime":"04-09-2020 10:00"
             }
             Reference Screenshot: https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/bookTicket1_success.png
             Invalid Test Screenshot: https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/bookTicket2_oldTimeTicket.png
                                      https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/bookTicket3_more_than_20Tickets_for_particular_time.png
                                      
  
Endpoint 2-> to update a ticket timing
             choose patch request in Postman
             url: http://localhost:8000/updateTiming/5f4bfe3e5702651f0cb67b2c
             json data format in Body of Postman
             {
                "showtime":"04-09-2020 14:00"
             }
             Reference Screenshot: https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/updateTime1_success.png
             Invalid Test Screenshot: https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/updateTime2_invalid_ticketID.png
                                      https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/updateTime3_more_than_20Tickets_for_particular_time.png
                                      https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/updateTime4_oldTime.png
                                      
Endpoint 3-> View all the ticket for a particular time
             choose get request in Postman
             url: http://localhost:8000/viewTicket/04-09-2020 11:00
             Reference Screenshot: https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/viewTicket1_success.png
             Invalid Test Screenshot: https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/viewTicket2_noTicket.png
             
Endpoint 4-> delete particular ticket
             choose delete request in Postman
             url: http://localhost:8000/deleteTicket/5f4bfe4b5702651f0cb67b2d
             Reference Screenshot: https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/deleteTicket1_success.png
             Invalid Test Screenshot: https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/deleteTicket2_invalid_ticketID.png
             
Endpoint 5-> View user's details based on ticket Id
             choose get request in Postman
             url: http://localhost:8000/viewTicketUser/5f4bfe3e5702651f0cb67b2c
             Reference Screenshot: https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/viewUser1_success.png
             Invalid Test Screenshot: https://github.com/kuchi157/zomentum_movie_booking_system/blob/master/screenshots/viewUser2_invalid_ticketID.png
             
             
## Use of CronJob

Purpose 1-> Mark a ticket as expired if there is a diff of 8 hours between the ticket timing and current time

Purpose 2-> Delete all the tickets which are expired automatically
             

             

                                      
            
                                        
  
                                      
             
    

