<?php
    require 'conn.php';

    $sql = "SELECT DISTINCT Name from collection";

    $res = mysqli_query($conn, $sql);
    $types = [];
    if ($res) {
        $cr = 0;
        while($row = mysqli_fetch_assoc($res))
        {
            $types[$cr]['name'] = $row['Name'];
            $cr++;
        }
        http_response_code(200);
        echo json_encode(['data' => $types]);
    } else {
        http_response_code(400);
    }