<?php
include "./connection2db.php"

// Fetch all the data from the table
$query="select * from ratingtable limit 50"; 

$result=mysqli_query($conn,$query);
?>