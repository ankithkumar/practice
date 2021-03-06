<?php
require 'conn.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);
  
  // Validate.
  if(trim($request->data->title) === '') {
    return http_response_code(400);
  }

  // Sanitize
  $email = mysqli_real_escape_string($conn, trim($request->data->email));
  $collection = mysqli_real_escape_string($conn, trim($request->data->title));
  $image = mysqli_real_escape_string($conn, trim($request->data->images->img));
  $desc = mysqli_real_escape_string($conn, trim($request->data->images->desc));
  $like = (bool) false;
  
  // Store.
  $sql = "INSERT INTO collection VALUES ('{$email}', '{$collection}', '{$image}' , '{$desc}', '{$like}')";
  if(mysqli_query($conn , $sql))
  {
    http_response_code(201);
    $data = [
      'collection' => $collection,
      'image' => $image,
      'desc' => $desc,
      'like' => $like
    ];
    echo json_encode(['data'=> $data]);
  }
  else
  {
    http_response_code(422);
  }
}
