<?php
    require 'conn.php';

    $postdata = file_get_contents("php://input");

    function updateEmails($email, $oldEmail, $conn) {
        $sql = "UPDATE collection SET Email = '{$email}' where Email = '{$oldEmail}'";
        if (mysqli_query($conn, $sql)) {
            http_response_code(200);
        } else {
            http_response_code(203);
        }
    }

    function updateDetails($name, $email, $password, $oldEmail, $conn) {
        if ($name) {
            if ($email) {
                if ($password) {
                    $sql = "UPDATE user SET name = '{$name}', email = '{$email}', password = '{$password}' where email = '{$oldEmail}'";
                } else {
                    $sql = "UPDATE user SET name = '{$name}', email = '{$email}' where email = '{$oldEmail}'";
                }
            } else if ($password) {
                $sql = "UPDATE user SET name = '{$name}', password = '{$password}' where email = '{$oldEmail}'";
            } else {
                $sql = "UPDATE user SET name = '{$name}' where email = '{$oldEmail}'";
            }
        } else if ($email) {
                if ($password) {
                    $sql = "UPDATE user SET email = '{$email}', password = '{$password}' where email = '{$oldEmail}'";
                } else {
                    $sql = "UPDATE user SET email = '{$email}' where email = '{$oldEmail}'";
                }
        } else if ($password) {
                $sql = "UPDATE user SET password = '{$password}' where email = '{$oldEmail}'";
        }

        $res = mysqli_query($conn, $sql);

        if ($res) {
            if ($email) {
                updateEmails($email, $oldEmail, $conn);
            } else {
                http_response_code(200);
            }
        } else {
            http_response_code(400);
        }
    }

    function checkIfUpdatedEmailExists($email, $oldEmail, $conn) {
        $found = false;
        if ($email) {
            $sql = "select DISTINCT email from user";
            $res = mysqli_query($conn, $sql);
            if ($res) {
                while ($row = mysqli_fetch_assoc($res)) {
                    if ($row['email'] == $email) {
                        $found = true;
                        break;
                    }
                }
            }
            return $found;
        }
        return $found;
    }
    
    if(isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);
        echo json_encode(["data" => $request->data]);
        $name = null;
        $email = null;
        $password = null;
        $oldEmail = mysqli_real_escape_string($conn, trim($request->data->oldEmail));
        
        if(property_exists((object) $request->data,'name')) {
            $name = mysqli_real_escape_string($conn, trim($request->data->name));
        }
        
        if (property_exists((object) $request->data,'email')) {
            $email = mysqli_real_escape_string($conn, trim($request->data->email));
        }

        if (property_exists((object) $request->data,'password')) {
            $password = mysqli_real_escape_string($conn, trim($request->data->password));
        }
        
        if (checkIfUpdatedEmailExists($email, $oldEmail, $conn)) {
            http_response_code(403);
        } else {
            updateDetails($name, $email, $password, $oldEmail, $conn);
        }
    }