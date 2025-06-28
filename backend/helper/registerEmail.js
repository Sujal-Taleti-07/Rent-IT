exports.registerEmail = (username) => {
    return(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Vehicle Website</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .body {
                margin-top: 20px;
                font-size: 16px;
            }
            .cta-button {
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                display: inline-block;
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
                <h1>Welcome to Rent IT!!</h1>
            </div>
            
            <div class="body">
                <p>Hello <strong>${username}</strong>,</p>
                <p>Thank you for joining us at <strong>Our Vehicle Rental Website</strong>!</p>
                <p>We're excited to have you on board and can't wait to help you find the perfect vehicle.</p>
                <p>Feel free to explore our wide selection of vehicles and find the one that fits your needs best. If you have any questions, don't hesitate to reach out to us.</p>
                <p>To get started, click the button below to browse our vehicles:</p>
                <a href="https://www.ourvehiclewebsite.com" class="cta-button">Browse Our Vehicles</a>
            </div>

            <div class="footer">
                <p>If you did not sign up for this website, please ignore this email.</p>
                <p>Thank You ❤️</p>
                <p>&copy; 2025 RentIt Website. All rights reserved.</p>
            </div>
        </div>

    </body>
    </html>
    `
)} 