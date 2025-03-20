<?php
// Include PHPMailer files manually
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $mobile = isset($_POST['mobile']) ? htmlspecialchars($_POST['mobile']) : '';
    $project = isset($_POST['project']) ? htmlspecialchars($_POST['project']) : '';
    $source = isset($_POST['source']) ? htmlspecialchars($_POST['source']) : '';

    if (empty($name) || empty($email) || empty($mobile) || empty($project) || empty($source)) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        // SMTP Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // Replace with your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'ppatil6131@gmail.com'; // Your email address
        $mail->Password   = 'vfvljqntkstemblr'; // Your email password or App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Encryption type
        $mail->Port       = 587; // SMTP port (587 for TLS, 465 for SSL)

        // Recipients
        $mail->setFrom('ppatil6131@gmail.com', 'iLife Business Zone');
        $mail->addAddress('09prathameshpatil@gmail.com'); // The recipient email

        // Email content
        $mail->isHTML(true);
        $mail->Subject = "New Form Submission - $project";
        $mail->Body    = "
        <html>
        <head>
            <style>
                table { border-collapse: collapse; width: 100%; max-width: 600px; margin: auto; font-family: Arial, sans-serif; }
                th, td { text-align: left; padding: 8px; border: 1px solid #ddd; }
                th { background-color: #f4f4f4; font-weight: bold; }
                tr:nth-child(even) { background-color: #f9f9f9; }
                h2 { text-align:center; }
            </style>
        </head>
        <body>
            <h2>New Enquiry</h2>
            <table>
                <tr><th>Field</th><th>Details</th></tr>
                <tr><td>Name</td><td>$name</td></tr>
                <tr><td>Email</td><td>$email</td></tr>
                <tr><td>Mobile</td><td>$mobile</td></tr>
                <tr><td>Project</td><td>$project</td></tr>
                <tr><td>Source</td><td>$source</td></tr>
            </table>
        </body>
        </html>";

        // Send Email
        $mail->send();
        echo json_encode(["status" => "success", "message" => "Thank you for your submission!"]);

    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Error: " . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
