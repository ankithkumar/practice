<?php
require 'conn.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $email = mysqli_real_escape_string($conn, trim($request->data->email));
  $password = mysqli_real_escape_string($conn, trim($request->data->password));

  $sql = "select * from user";

  if ($result = mysqli_query($conn, $sql)) {
      $found = false;
      $val;
      while ($row = mysqli_fetch_array($result)) {
        if ($row["email"] == $email && $row["password"] == $password) {
          $found = true;
          $res = $row;
          break;
        };
      }
      if ($found) {
        echo json_encode(["data" => $found]);
        http_response_code(200);
      } else {
        http_response_code(400);
      }
  } else {
    http_response_code(400);
  }
}
