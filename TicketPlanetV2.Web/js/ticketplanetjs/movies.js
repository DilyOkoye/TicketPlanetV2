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
                $("#drpLocation").niceSelect('update'); //Tell the plugin to recreate the DIV.

                $("#OtherCinema").niceSelect('update');
                $("#Others").niceSelect('update');
                $("#FilmHouse").niceSelect('update');
                $("#OthersFilmHouse").niceSelect('update');

               // GetMovies();
            },
            error: function () {
                alert("Whooaaa! Something went wrong..");
            }
        });
} 

$("#drpLocation").on('change', function () {
    $('#screenDiv').show();
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
                console.log("Film Result", data);
                if (company === "3") {
                    alert(data);
                    $('#OtherCinema').hide();
                    $('#Others').hide();
                    $('#FilmHouse').show();
                    $('#OthersFilmHouse').html('');
                    $('#OthersPartial').html('');
                    $('#OthersFilmHouse').html(data);
                   


                    //$("#OtherCinema").niceSelect('update');
                    //$("#Others").niceSelect('update');
                    //$("#FilmHouse").niceSelect('update');
                    //$("#OthersFilmHouse").niceSelect('update');
                }
                else {
                    alert("Genesis" + data);
                    $('#Others').hide();
                    $('#OtherCinema').show();
                    
                    
                    $('#FilmHouse').hide();
                    $('#OthersPartial').html('');
                    $('#OthersFilmHouse').html('');
                    $('#OthersPartial').html(data);

                    //$("#OtherCinema").niceSelect('update');
                    //$("#Others").niceSelect('update');
                    //$("#FilmHouse").niceSelect('update');
                    //$("#OthersFilmHouse").niceSelect('update');



                }

            }

           
        },

        error: function (xhr, ajaxOptions, thrownError) {
            $('#screenDiv').hide();
        },


    });

});






