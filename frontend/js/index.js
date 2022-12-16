$(document).ready(function () {
    const btn = document.querySelectorAll(".link");

    $('.create').on('click', function() {
        $('#create-btn').toggle('toggle-button');
        $('#create-meeting-form').toggle('toggle-form'); 
    });


    function getAll() {
        $.ajax({
            type: "GET",
            url: "http://localhost:5000/api/meeting/all",
            dataType: "json",
            success: function (data, status, xhr) {

                $("#showAll table").empty();

                var table = '<tr><th>No</th><th>Topic</th><th>Location</th><th>Date</th><th>Action</th></tr>';
                
                for (let i = 0; i < data.length; i++) {
                    table += '<tr><td>' + (i+1) + '</td>';
                    table += '<td>' + data[i].name + '</td>';
                    table += '<td>' + data[i].location + '</td>';
                    table += '<td>' + data[i].date + '</td>';
                    table += '<td><button value="'+ data[i]._id +'" class="Delete">Delete</button></td></tr>';
                }
    
                $('#showAll table').html(table);
            },
    
            error: function () {
                alert("error");
            }
        });
    }

    getAll();

    $('.table').on('click', '.Delete', function() {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:5000/api/meeting/delete/" + $(this).val(),
            dataType: "json",
            success: function (data, status, xhr) {
                getAll();
            },
    
            error: function () {
                alert("error");
            }
        });
    });

    $('#create-meeting-form').submit(function (event) {
        event.preventDefault();
    
        var formData = $(this).serialize();
        console.log(formData); 
    
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/api/meeting/create",
            data: formData,
            dataType: "json",
            success: function (data, status, xhr) {
                if (data) {
                    console.log(data);
                    tr = '<tr><td>' + ($('#showAll table tr').length)  + '</td>'
                        + '<td>' + data.name + '</td>'
                        + '<td>' + data.location + '</td>'
                        + '<td>' + data.date + '</td>'
                        + '<td><button value="'+ data._id +'" class="Delete">Delete</button></td></tr>';
                    
                    $('#showAll table tr:last').after(tr);

                    $('#create-btn').toggle('toggle-button');
                    $('#create-meeting-form').toggle('toggle-form'); 
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

    $('#logout').click( function () {
        window.location.href = "../login.html";
    });
});


