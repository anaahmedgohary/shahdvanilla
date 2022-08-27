$("document").ready(function () {






  $("#cartbodyinp").val(localStorage.getItem("mycart"));
  $("#orderTotal").val($("#TotalValue").text());





  $("#sendOrderForm").on("submit", function (e) {
    e.preventDefault(); //prevent default form submition
    // var FormDataOrigin = $("#cart-Rows");
    // var FormData = JSON.stringify(FormDataOrigin);
    //var storedCart = localStorage.getItem("mycart");
    var FormData2 = $('#sendOrderForm').serialize();

    $.ajax({
      type: "post",
      url: "sendOrders.php",
      data: FormData2,
      dataType: "json",
      encode: false,
      
      success: function (response) {
        response = JSON.parse(response);

        if (response == "ok") {
          $("sendmessage").html("Your message has been sent successfully.");
        } else {
          $("errormessage").html(response);
        }
      },
    });
  });
});
