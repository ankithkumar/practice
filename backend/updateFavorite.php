<?php
    require 'conn.php';
    
    if (isset($_GET['email']) && isset($_GET['title']) && isset($_GET['img']) && isset($_GET['like'])) {
        $email = $_GET['email'];
        $title = $_GET['title'];
        $img = $_GET['img'];
        $like = $_GET['like'];

        // trim escape string
        $email = mysqli_real_escape_string($conn, trim($email));
        $title = mysqli_real_escape_string($conn, trim($title));
        $img = mysqli_real_escape_string($conn, trim($img));
        
        echo json_encode(['data' => $like]);
        $sql = "UPDATE collection SET Liked = $like where email = '{$email}' AND Name = '{$title}' AND Image = '{$img}'";

        $res = mysqli_query($conn, $sql) || Die('failed '.mysqli_error($conn));

        if ($res) {
            http_response_code(200);
        } else {
            http_response_code(422);
        }
    } else {
        echo "no param";
    }