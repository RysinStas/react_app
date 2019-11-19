<?php
require_once "../config.php";

if (empty($_POST)) {
    $_POST = json_decode(file_get_contents("php://input"), true) ? : [];
}
// Define variables and initialize with empty values
$username = $password = $err = "";
$result = [];

//    id: uuid.v4(),
//    content: content,
//    user: username,
//    created_at: Date.now()

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $sql = "SELECT id FROM users WHERE username = ?";
    $stmt = mysqli_prepare($link, $sql);
    mysqli_stmt_bind_param($stmt, "s", $param_username);
    $param_username = $_POST['username'];
    if(mysqli_stmt_execute($stmt)){
        // Store result
        mysqli_stmt_store_result($stmt);
        mysqli_stmt_bind_result($stmt, $username);
    }
    if(!mysqli_stmt_execute($stmt)){
        $err .= "Bad sql SELECT id FROM users WHERE username =" . $_POST['username'];
    }
    mysqli_stmt_close($stmt);

    // Prepare an insert statement
    $sql = "INSERT INTO posts (post_id, user_id, content) VALUES (?, ?, ?)";

    if($stmt = mysqli_prepare($link, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "sds", $param_post_id, $param_user_id, $param_content);

        // Set parameters
        $param_post_id = $_POST['username'];
        $param_user_id = $username;
        $param_content = $_POST['content'];

        // Attempt to execute the prepared statement
        if(!mysqli_stmt_execute($stmt)){
            $err .= "Something went wrong. Please try again later." . implode(',',$_POST);
            $err .= "param_post_id" . $param_post_id;
            $err .= "param_user_id" . $param_user_id;
            $err .= "param_content" . $param_content;
        }
    }

    // Close statement
    mysqli_stmt_close($stmt);

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

