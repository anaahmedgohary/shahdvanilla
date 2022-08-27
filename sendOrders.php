<?php
include './connection2db.php';

$cartbody = $_POST['cartbody'];
$totalprice = $_POST['totalprice'];

$stmt = $conn->prepare("INSERT INTO orderslog (orderjson, ordertotal)
values(?,?)");
$stmt->bind_param("ss", $cartbody, $totalprice);
$stmt->execute();
echo "order sent";
$stmt->close();
$conn->close();






?>