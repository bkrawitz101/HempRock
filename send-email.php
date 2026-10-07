<?php
/**
 * HempRock Plaster LLC - Form Mailer Script
 * Handles secure submission from the website contact form to info@hemprockplaster.com
 */

header('Content-Type: application/json; charset=UTF-8');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// 1. Honeypot anti-spam verification:
// Real users will leave this hidden field blank. Automated bots fill it out.
if (!empty($_POST['website_hp_check'])) {
    // Silently return success to waste bot resources
    echo json_encode(['success' => true, 'message' => 'Thank you for your inquiry!']);
    exit;
}

// 2. Configuration
$recipient_email = 'info@hemprockplaster.com';
$site_name       = 'HempRock Plaster LLC';

// 3. Extract and sanitize input data
$full_name = trim(filter_input(INPUT_POST, 'fullName', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? '');
$email     = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?? '');
$phone     = trim(filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'Not provided');
$role      = trim(filter_input(INPUT_POST, 'role', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'Not specified');
$location  = trim(filter_input(INPUT_POST, 'location', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'Not specified');
$sqft      = trim(filter_input(INPUT_POST, 'sqft', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'Not specified');
$message   = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'None provided');

// Map services
$services = isset($_POST['service']) ? (array)$_POST['service'] : [];
$service_map = [
    'crew'       => 'Hire HempRock Crew',
    'contractor' => 'Contractor Training & Buckets',
    'exterior'   => 'Exterior Siding Project',
    'interior'   => 'Interior Renovation'
];
$formatted_services = [];
foreach ($services as $srv) {
    $clean_srv = htmlspecialchars(trim($srv));
    $formatted_services[] = $service_map[$clean_srv] ?? $clean_srv;
}
$services_text = !empty($formatted_services) ? implode(', ', $formatted_services) : 'General Consultation';

// 4. Validate required fields
if (empty($full_name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid full name and email address.']);
    exit;
}

// 5. Build Email Content
$subject = "New Project Inquiry: " . $full_name . " (" . $location . ")";

$server_host = $_SERVER['SERVER_NAME'] ?? 'hemprockplaster.com';

$html_body = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Website Consultation Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; background-color: #f7f6f2; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e0ded8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background-color: #2E5A44; padding: 20px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 20px; letter-spacing: 0.5px;">HempRock Plaster LLC</h2>
      <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">New Consultation & Project Request</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #5a5d5e;">Client Name:</td>
          <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">' . $full_name . '</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #5a5d5e;">Email Address:</td>
          <td style="padding: 8px 0;"><a href="mailto:' . $email . '" style="color: #C85A2A; text-decoration: none; font-weight: 600;">' . $email . '</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #5a5d5e;">Phone Number:</td>
          <td style="padding: 8px 0; color: #1a1a1a;">' . $phone . '</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #5a5d5e;">Client Role:</td>
          <td style="padding: 8px 0; color: #1a1a1a;">' . $role . '</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #5a5d5e;">Services of Interest:</td>
          <td style="padding: 8px 0; color: #2E5A44; font-weight: 600;">' . $services_text . '</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #5a5d5e;">Project City / County:</td>
          <td style="padding: 8px 0; color: #1a1a1a;">' . $location . '</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #5a5d5e;">Estimated Sq. Footage:</td>
          <td style="padding: 8px 0; color: #1a1a1a;">' . $sqft . '</td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eaeaea;">
        <h4 style="margin: 0 0 8px 0; color: #2E5A44; font-size: 15px;">Project Scope & Notes:</h4>
        <div style="background-color: #fdfbf7; border-left: 3px solid #C85A2A; padding: 12px 16px; border-radius: 4px; font-size: 14px; color: #2d3748; white-space: pre-wrap;">' . nl2br($message) . '</div>
      </div>
    </div>
    
    <div style="background-color: #efece6; padding: 12px 20px; font-size: 12px; color: #7e8284; text-align: center; border-top: 1px solid #e0ded8;">
      This message was sent from the consultation form on <strong>' . $server_host . '</strong>. Reply directly to this email to respond to ' . $full_name . '.
    </div>
  </div>
</body>
</html>
';

// 6. Headers for clean delivery and direct replying
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $site_name . ' <noreply@' . $server_host . '>',
    'Reply-To: ' . $full_name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
];

// 7. Dispatch email via IONOS mail transport
$sent = @mail($recipient_email, $subject, $html_body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your inquiry! Our team will contact you shortly.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server was unable to send email. Please email us directly at ' . $recipient_email
    ]);
}
