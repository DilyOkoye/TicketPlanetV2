function GetCinemaLoactions()
{
    var cinema = $("#drpCinemaCompany").val();
    $.ajax
        ({
            url: "GetCinemaLocation/Movies",
            type: 'POST',
            datatype: 'application/json',
            contentType: 'application/json',
            data: JSON.stringify({
                cinema: +cinema
            }),

            success: function (data) {
                console.log("Result", data);
                $("#drpLocation").html("");
                $.each(data, function (item, lct) {
                    // alert(lct.LocationName)
                    $("#drpLocation").append($('<option></option>').val(cinema === "3" ? lct.SiteId:lct.Itbid).html(lct.CinemaName));
                });
               

                GetMovies();
            },
            error: function () {
                alert("Whooaaa! Something went wrong..");
            }
        });
} 


$("#drpLocation").on('change', function () {
    $('#OthersFilmHouse').html('');
    var company = $('#drpCinemaCompany').val();
    var location = $('#drpLocation').val();
    $.ajax({
        url: "GetMoviesViaLocation/Movies",
        type: 'POST',
        cache: false,
        dataType: 'html',
        data: { company: company, location: location },
        success: function (data, textStatus, XMLHttpRequest) {
            if (data !== null)
            {
             
                $('#FilmHouse').show();
                $('#OthersFilmHouse').html('');
                $('#OthersFilmHouse').html(data);
                   
            }

           
        },

        error: function (xhr, ajaxOptions, thrownError) {
            $('#screenDiv').hide();
        },


    });

});


function GetMovies()
{
    var company = $('#drpCinemaCompany').val();
    var location = $('#drpLocation').val();
    $.ajax({
        url: "GetMoviesViaLocation/Movies",
        type: 'POST',
        cache: false,
        dataType: 'html',
        data: { company: company, location: location },
        success: function (data, textStatus, XMLHttpRequest) {
            if (data !== null) {

                $('#FilmHouse').show();
                $('#OthersFilmHouse').html('');
                $('#OthersFilmHouse').html(data);

            }


        },

        error: function (xhr, ajaxOptions, thrownError) {
            $('#screenDiv').hide();
        },


    });


}




