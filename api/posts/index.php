<?php
require_once "../config.php";

if (empty($_POST)) {
    $_POST = json_decode(file_get_contents("php://input"), true) ? : [];
}

$username = $password =  $message = $user_id = "";
$result = $data = [];

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    if (isset($_POST['delete'])) {
        $sql = "DELETE FROM posts WHERE post_id='" . $_POST['delete'] . "'";
        if(!mysqli_query($link, $sql)){
            $err .=  "ERROR: Could not able to execute $sql. " . mysqli_error($link);
        }
        // Close connection
        mysqli_close($link);
    } else {
        $sql = "SELECT id FROM users WHERE username = '" . $_POST['username'] . "'";
        $sql_result = mysqli_query($link, $sql);
        $row = mysqli_fetch_array($sql_result);
        $user_id = $row['id'];
        mysqli_free_result($sql_result);

        $sql = "INSERT INTO posts (post_id, user_id, content) VALUES ('" . $_POST['post_id'] . "', '" . $user_id . "', '" . $_POST['content'] . "')";
        if (!mysqli_query($link, $sql)) {
            $err .= "ERROR: Could not able to execute $sql. " . mysqli_error($link);
        }
        // Close connection
        mysqli_close($link);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "GET"){

    $sql = "SELECT posts.post_id, users.username, posts.content, posts.created_at FROM posts INNER JOIN users ON posts.user_id = users.id";

    $sql_result = mysqli_query($link, $sql);

    for ($data = []; $row = mysqli_fetch_assoc($sql_result); $data[] = $row);

    mysqli_free_result($sql_result);
    // Close connection
    mysqli_close($link);
}

if (empty($err)) {
    $result = array('success' => true, 'data' => $data);
} else {
    $result = array('success' => false, 'err' => $err) ;
}

echo json_response($result);
die();
?>

