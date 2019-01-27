<?php
require 'conn.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  echo json_encode(["data" => $request->data]);

  $username = mysqli_real_escape_string($conn, trim($request->data->username));
  $email = mysqli_real_escape_string($conn, trim($request->data->email));
  $password = mysqli_real_escape_string($conn, trim($request->data->password));
  
  $sql = "INSERT INTO user VALUES ('{$username}', '{$email}' , '{$password}')";
  if(mysqli_query($conn , $sql)) {
    http_response_code(201);
  } else {
    http_response_code(400);
  }
}
