<?php
require_once "../config.php";
if (empty($_POST)) {
    $_POST = json_decode(file_get_contents("php://input"), true) ? : [];
}

// Define variables and initialize with empty values
$username = $password = $confirm_password = $err = "";
$result = [];
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Validate username
    if(empty(trim($_POST["username"]))){
        $err .= "Please enter a username. ";
    } else{
        // Prepare a select statement
        $sql = "SELECT id FROM users WHERE username = ?";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            // Set parameters
            $param_username = trim($_POST["username"]);

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);

                if(mysqli_stmt_num_rows($stmt) == 1){
                    $err .= "This username is already taken. ";
                } else{
                    $username = trim($_POST["username"]);
                }
            } else{
                $err .=  "Oops! Something went wrong. Please try again later. ";
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Validate password
    if(empty(trim($_POST["password"]))){
        $err .= "Please enter a password. ";
    } elseif(strlen(trim($_POST["password"])) < 6){
        $err .= "Password must have atleast 6 characters. ";
    } else{
        $password = trim($_POST["password"]);
    }

    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $err .= "Please confirm password. ";
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $err .= "Password did not match. ";
        }
    }

    // Check input errors before inserting in database
    if( empty($err) ){

        // Prepare an insert statement
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_password);

            // Set parameters
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash

            // Attempt to execute the prepared statement
            if(!mysqli_stmt_execute($stmt)){
                $err .= "Something went wrong. Please try again later. ";
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Close connection
    mysqli_close($link);
}
if (empty($err)) {
    $result = array('success' => true);
} else {
    $result = array('success' => false, 'err' => $err) ;
}


echo json_response($result);
die();
?>

