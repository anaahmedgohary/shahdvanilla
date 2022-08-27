<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="newOrders.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>

<body>


<table class="table">
                    <thead>
                        <tr class="tbl-main-headrs">

                            <th class="col-2 mTHeadr" scope="col">date</th>
                            <th class="col-3 mTHeadr" scope="col">Order ID</th>
                            <th class="col-2 mTHeadr" scope="col">Name</th>
                            <th class="col-2 mTHeadr" scope="col">Phone</th>
                            <th class="col-2 mTHeadr" scope="col">Location</th>
                            <!-- <th scope="col">Time of Order</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <?php include 'newordersAPI.php'; ?>

                        <?php if ($result->num_rows > 0) : ?>

                        <?php while ($array = mysqli_fetch_row($result)) : ?>

                        <tr class="new-review">
                            <td class="review-col date-col-cel"><?php echo $array[1]; ?></td>
                            <td class="review-col rate-col-cel"><?php echo $array[6]; ?></td>
                            <td class="review-col rev-col-cel"><?php echo $array[3]; ?></td>
                            <td class="review-col date-col-cel"><?php echo $array[4]; ?></td>
                            <td class="review-col name-col-cel"><?php echo $array[5]; ?></td>

                        </tr>
                        <tr>
                            <td id="orderCart" class="review-col rate-col-cel">
                                <?php echo json_decode($array[7]); ?>
                                
                                <!-- ?php echo $array[7]; ?> -->
                            </td>

                        </tr>

                        <tr>
                            <td id="wowo" class="review-col rate-col-cel"></td>

                        </tr>

                        <?php endwhile; ?>

                        <?php else : ?>
                        <tr>
                            <td colspan="3" rowspan="1" headers="">No Data Found</td>
                        </tr>
                        <?php endif; ?>

                        <?php mysqli_free_result($result); ?>

                    </tbody>
                </table>

                <!-- <script>
                    $("#wowo").html(JSON.parse($("#orderCart").text()))
                </script> -->

</body>

</body>

</html>