<?php
    require './conn.php';
    if (isset($_GET['email'])) {
        $email = $_GET['email'];
        $sql = "select * from collection where email='{$email}'";

        $res = mysqli_query($conn, $sql);
        $cars = [];

        if ($res) {
            $cr = 0;
            while($row = mysqli_fetch_assoc($res))
            {
                $cars[$cr]['email'] = $row['email'];
                $cars[$cr]['Name']    = $row['Name'];
                $cars[$cr]['Image'] = $row['Image'];
                $cars[$cr]['Description'] = $row['Description'];
                $cars[$cr]['Liked'] = $row['Liked'];
                $cr++;
            }
            echo json_encode(['data'=> $cars]);
        } else {
            http_response_code(404);
        }
    } else {
        echo "no param";
    }