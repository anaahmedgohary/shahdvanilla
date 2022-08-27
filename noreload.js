$("document").ready(function(){


    $('#customerForm').on('submit',function(e){

        e.preventDefault(); //prevent default form submition
        // make form into json
        var FormData = $('#customerForm').serialize();

        $.ajax({
            type : 'post',
            url : 'customerinfo.php',
            data : FormData,
            dataType : 'json',
            encode : true,
            /* beforeSend : function(){

                $('#cusFormSubmit').html('Loading');
            }, */
            success : function(response){

                response = JSON.parse(response);

                if(response== "ok"){

                    $('sendmessage').html('Your message has been sent successfully.');
                }else{

                    $('errormessage').html(response);
                    console.log(response)
                }

            }

        });

        $("#cusFormSubmit").attr("disabled", true);

    });

    
    


});

