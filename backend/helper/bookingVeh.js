exports.bookingVeh = (bookingData, bookingId) => {
    const { vehicleName, vehicleModel, vehicleNumber, vehicleImg, tripType, startDate, endDate, pickupTime, pickupLocation, dropLocation, totalCost } = bookingData;

    // HTML email template with personalized greeting and booking details
    return( `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
            }
            .vehicle-image {
                max-width: 100%;
                height: auto;
                border-radius: 12px;
            }
            .details {
                margin-top: 20px;
            }
            .details p {
                font-size: 16px;
                margin: 8px 0;
            }
            .details strong{
                color: rgb(234, 179, 8)
            }
            .cta-button {
                background-color: rgb(234, 179, 8);
                color: rgb(12, 10, 9);
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 8px;
                margin-top: 20px;
                display: inline-block;
                font-size: 16px;
            }
            .footer {
                margin-top: 30px;
                font-size: 14px;
                text-align: center;
                color: #888;
            }
        </style>
    </head>
    <body>

        <div class="container">
            <div class="header">
                <img src="${vehicleImg}" alt="Vehicle Image" class="vehicle-image" />
                <h2>Hello, Your Booking is Confirmed!</h2>
                <h3> Here is your Booking Deatils</h3>
            </div>

            <div class="details">
                
                <p><strong>Vehicle Name:</strong> ${vehicleName}</p>
                <p><strong>Model:</strong> ${vehicleModel}</p>
                <p><strong>Vehicle Number:</strong> ${vehicleNumber}</p>
                <p><strong>Trip Type:</strong> ${tripType}</p>
                <p><strong>Start Date:</strong> ${startDate}</p>
                <p><strong>End Date:</strong> ${endDate}</p>
                <p><strong>Pickup Time:</strong> ${pickupTime}</p>
                <p><strong>Pickup Location:</strong> ${pickupLocation}</p>
                <p><strong>Drop Location:</strong> ${dropLocation}</p>
                <p><strong>Total Cost:</strong> ₹${totalCost}</p>

                <a href="https://yourwebsite.com/manage-booking/${bookingId}" class="cta-button">Manage Booking</a>
            </div>

            <div class="footer">
                <p>If you did not make this booking, please ignore this email.</p>
                <p> Thank You ❤️ </p>
                <p>&copy; 2025 Our Vehicle Website. All rights reserved.</p>
            </div>
        </div>

    </body>
    </html>
    `
)};

