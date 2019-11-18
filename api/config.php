<?php

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'twitter_app');
define('DB_PASSWORD', 'qwerty');
define('DB_NAME', 'twitter');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($link === false) {
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

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
}