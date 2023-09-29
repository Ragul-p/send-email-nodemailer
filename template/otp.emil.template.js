const otpGenerator = require("otp-generator");

var otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
});

const OTP_Template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
        /* Reset some default styles for better consistency */
        body, table, td, a {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #000;
            text-decoration: none;
        }

        /* Style the email container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f7f7f7;
        }

        /* Style the header */
        .header {
            text-align: center;
            background-color: #007bff;
            color: #fff;
            padding: 10px;
        }

        /* Style the main content */
        .content {
            padding: 20px;
            background-color: #fff;
        }

        /* Style the footer */
        .footer {
            text-align: center;
            background-color: #007bff;
            color: #fff;
            padding: 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>One-Time Password (OTP)</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your OTP code for authentication is:</p>
            <h2 style="text-align: center;">${otp}</h2>
            <p>Please use this code to complete your action. This code is valid for a single use and should not be shared with others.</p>
            <p>If you didn't request this OTP, you can ignore this email.</p>
            <p>Thank you,</p>
            <p>Your Company Name</p>
        </div>
        <div class="footer">
            <p>&copy; 2023 Your Company</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = { OTP_Template };
