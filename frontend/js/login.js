$(document).ready(function () {
    $('#btn').on('click', function() {
        $('.logincontainer').toggle('toggle');
        $('.signupcontainer').toggle('display:"block"');

        if ($(this).html() === "Login") {
            $(this).html("Sign Up")
        } else {
            $(this).html("Login")
        }
        
    });

    $('#login').submit(function (event) {
        event.preventDefault();
        var formData = $(this).serialize();
      
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/api/auth/login",
            data: formData,
            dataType: "json",
            success: function (data, status, xhr) {
                if (data) {
                    window.location.href = "../home.html";
                }
                else {
                    alert('fail to insert, ' + data.errormessage);
                }
            },
    
            error: function () {
                alert("error");
            }
        });
    });

    $('#signup').submit(function (event) {
        event.preventDefault();

        var formData = $(this).serialize();
         
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/api/auth/register",
            data: formData,
            dataType: "json",
            success: function (data, status, xhr) {
                if (data) {
                    window.location.href = "../home.html";
                }
                else {
                    alert('fail to insert, ' + data.errormessage);
                }
            },
    
            error: function () {
                alert("error");
            }
        });
    });
   
});
