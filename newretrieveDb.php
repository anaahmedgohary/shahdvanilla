<?php 
include "./conn2mrblister.php";

$query="select * from ratingtable limit 50"; // Fetch all the data from the table customers

$result=mysqli_query($conn,$query);

?>