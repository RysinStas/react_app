<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'twitter_app');
define('DB_PASSWORD', 'qwerty');
define('DB_NAME', 'twitter');

function json_response($data) {
    header_remove();
    header('Access-Control-Allow-Origin: *');
    http_response_code(200);
    header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
    header('Content-Type: application/json');    
    header('Status: 200 OK');
    return json_encode(
        array (
            'result'=> $data
        )
    );
//    return json_encode(
//    	array(
//    		'posts' => array(
//    			'content' =>"test content from server",
//				'created_at'=>1573815956878,
//				'id'=>"adfb5f0a-3df3-1111-962d-086fb29a42e6",
//				'user'=>"server",
//                'result'=>$data
//			)
//		)
//    );
}
// if you are doing ajax with application-json headers
if (empty($_POST)) {
    $_POST = json_decode(file_get_contents("php://input"), true) ? : [];
}
function register_user () {
    $result = "";
    /* Attempt to connect to MySQL database */
    $mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    // Validate username
    if (empty(trim($_POST["username"]))){
        $username_err = "Please enter a username.";
    } else {
        // Prepare a select statement
        $sql = "SELECT id FROM users WHERE username = ?";

        if($stmt = $mysqli->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bind_param("s", $param_username);

            // Set parameters
            $param_username = trim($_POST["username"]);

            // Attempt to execute the prepared statement
            if($stmt->execute()){
                // store result
                $stmt->store_result();

                if($stmt->num_rows == 1){
                    $username_err = "This username is already taken.";
                } else{
                    $username = trim($_POST["username"]);
                }
            } else{
                $username_err = "Oops! Something went wrong. Please try again later.";
            }
        }

        // Close statement
        $stmt->close();
    }

    // Validate password
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Password must have atleast 6 characters.";
    } else{
        $password = trim($_POST["password"]);
    }

    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm password.";
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }

    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err)){

        // Prepare an insert statement
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";

        if($stmt = $mysqli->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bind_param("ss", $param_username, $param_password);

            // Set parameters
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash

            // Attempt to execute the prepared statement
            if($stmt->execute()){
                // Redirect to login page
                $result = "User created";
            } else{
                $result =  "Something went wrong. Please try again later.";
            }
        }

        // Close statement
        $stmt->close();
    } else {
        $result = $username_err. $password_err. $confirm_password_err;
    }

    // Close connection
    $mysqli->close();
    return $result;
}
$result=register_user();
echo json_response($result);
die();
?>

