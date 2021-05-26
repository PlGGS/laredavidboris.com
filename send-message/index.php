<?php 
//error_reporting(E_ALL);

$successMessage = "Message Sent!";
$shortMessage = "I will get back to you ASAP";
$success = true;


// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

// $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
// try {
//     //Server settings
//     $mail->SMTPDebug = 0;                                 // Enable verbose debug output
//     $mail->isSMTP();                                      // Set mailer to use SMTP
//     $mail->Host = 'ssl://a2plcpnl0685.prod.iad2.secureserver.net';  // Specify main and backup SMTP servers
//     $mail->SMTPAuth = true;                               // Enable SMTP authentication
//     $mail->Username = '';                 // SMTP username
//     $mail->Password = '';                           // SMTP password
//     $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
//     $mail->Port = 587;                                    // TCP port to connect to

//     //Recipients
//     $mail->setFrom('', 'LARE Contact Form');
// 	$mail->addAddress('lincolnre@comcast.net');     // Add a recipient
//     $mail->addReplyTo($_POST["email"], $_POST["name"]);

//     //Content
//     $mail->isHTML(true);                                  // Set email format to HTML
//     $mail->Subject = "CONTACT FORM - ".$_POST["name"]." (".$_POST["email"].")";
//     $mail->Body    = nl2br($_POST["message"]);
//     $mail->AltBody = $_POST["message"];

//     $mail->send();
// } catch (Exception $e) {
//     //echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
//     $successMessage = $mail->ErrorInfo;
//     $shortMessage = "An error occurred while sending your email";
//     $success = false;
// }
// // replace this with phpmailer
// $to      = '';
// $subject = 'LARE mailform - '+$_POST["name"];
// $message = $_POST["message"];
// $headers = 'From: larellcbot@gmail.com' . "\r\n" .
//     'Reply-To: ' + $_POST["email"] . "\r\n" .
//     'X-Mailer: PHP/' . phpversion();

// mail($to, $subject, $message, $headers);


// navbar should always be shrunken
$navbarShrink = true;
include "../header.php"; 

?>

    <section id="send-message" class="content-section text-center">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h2><?php echo $successMessage; ?></h2>
            <i class="fa <?php echo ($success)?"fa-check-circle":"fa-times-circle"; ?> send-icon" aria-hidden="true"></i>
            <p><?php echo $shortMessage; ?></p>
          </div>
        </div>
      </div>
    </section>

<?php include "../footer.php"; ?>