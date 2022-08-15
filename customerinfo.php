<?php
$timestamp = $_POST['timestamp'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$location = $_POST['location'];
$orderid = $_POST['orderid'];
$conn = new mysqli('localhost', 'pma', '', 'shahd');
if($conn->connect_error){
    die('Sorry, please try again : '.$conn->connect_error);
}else{
    $stmt = $conn->prepare("INSERT INTO customer(custtofo, name, phone, location, orderid) 
    values(?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $timestamp, $name, $phone, $location, $orderid);
    $stmt->execute();
    //echo "Thank you. Now choose payment method";
    $stmt->close();
    $conn->close();

};

?>


