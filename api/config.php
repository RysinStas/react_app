<?php

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'twitter_app');
define('DB_PASSWORD', 'qwerty');
define('DB_NAME', 'twitter');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
$err='';
// Check connection
if ($link === false) {
    $err .= "ERROR: Could not connect. " . mysqli_connect_error();
}

$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);";
$sql_result=mysqli_query($link, $sql);
if (!$sql_result){
    $err .=  "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
mysqli_free_result($sql_result);

$sql = "CREATE TABLE IF NOT EXISTS posts (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    post_id VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";

$sql_result=mysqli_query($link, $sql);
if (!$sql_result){
    $err .=  "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}

function json_response($data) {
    header_remove();
    header('Access-Control-Allow-Origin: *');
    http_response_code(200);
    header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
    header('Content-Type: application/json');
    header('Status: 200 OK');
    return json_encode($data);
}