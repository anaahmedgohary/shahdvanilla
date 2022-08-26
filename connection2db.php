<?php
$servername = "localhost";
$username = "pma";
$password = "";
$dbname = "mrblister";
$Conn = new mysqli($servername, $username, $password, $dbname);
if($Conn->connect_error){
    die("Sorry, please try again: " . $conn->connect_error);
}