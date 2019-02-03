<?php
    require 'conn.php';

    if (isset($_GET['email'])) {
        $email = $_GET['email'];
        $email = mysqli_real_escape_string($conn, trim($email));
        $sql = "select name,email from user where email = '{$email}'";

        $res = mysqli_query($conn, $sql);
        $types = [];
        if ($res) {
            $row = mysqli_fetch_assoc($res);
            $types['name'] = $row['name'];
            $types['email'] = $row['email'];
            http_response_code(200);
            echo json_encode(['data' => $types]);
        } else {
            return http_response_code(403);
        }
    }