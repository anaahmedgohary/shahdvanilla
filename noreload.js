
$('document').ready(function(){

     
     






    $('#customerForm').on('submit',function(e){

        e.preventDefault(); //prevent default form submition
        var FormData = $('#customerForm').serialize();

        $.ajax({

            type : 'post',
            url : 'customerinfo.php',
            data : FormData,
            dataTYpe : 'json',
            encode : true,
            beforeSend : function(){

                $('#cusFormSubmit').html('<span class="glyphicon glyphicon-repeat fast-right-spinner"></span> Sending');
            },
            success : function(response){

                response = JSON.parse(response);

                if(response== "ok"){

                    $('sendmessage').html('Your message has been sent successfully.');
                }else{

                    $('errormessage').html(response);
                }

            }

        });

        $("#cusFormSubmit").attr("disabled", true);

    });

    
    


});

