$(document).ready(function () {
    //$('#loaderbody').show();
    var filmName = $("#MovieName").val();
    var cinemaLocation = $("#CinemaCompanyID").val();
    var filmCode = $("#FilmCode1").val();
    $.ajax({
        url: '/Movies/GetMovieDays',
        data: { filmName: filmName, cinemaLocation: cinemaLocation},
    dataType: "json",
    type: "POST",

    success: function (data) {
        // alert("hhh")
        $("#MovieDay").html("");
        $("#MovieDay").append($('<option></option>').val(null).html("--Select Movie Day--"));
        $('#loaderbody').hide();

        //console.log(data);

        if (data.list == 0) {
            alert("No Movie Day available");
        }

        $.each(data.list, function (item, lct)
        {
            //alert(lct.PerformDate)
            //alert(lct.FilmCode)
            $("#MovieDay").append($('<option></option>').val(lct.PerformDate).html(lct.PerformDate))

        })

        //alert(data.FCode);

        $("#FilmCode").val(data.FCode);
    },
    error: function (data) {
        if (data == 0) {
            alert("No Movie time available");
        }
    }

});

});

$("#CinemaCompanyID").on('change', function () {
    $('#MovieDay').prop('disabled', false);
    $('#MovieDay option:eq(0)').attr('selected', 'selected')

    var filmName = $("#MovieName").val();
    var cinemaLocation = $("#CinemaCompanyID").val();
    $("#MovieTime").html("");
    $("#MovieTime").val("");

    //   alert(FromRoute)
    $.ajax({
        url:'/Movies/GetMovieDays',
        data: { filmName: filmName, cinemaLocation: cinemaLocation},
    dataType: "json",
    type: "POST",

    success: function (data) {
        // alert("hhh")
        $("#MovieDay").html("");
        $("#MovieDay").append($('<option></option>').val(null).html("--Select Movie Time--"));

        $.each(data.list, function (item, lct) {
            //alert(lct.PerformDate)
            //alert(lct.FilmCode)
            if (lct.PerformDate != null) {
                $("#MovieDay").append($('<option></option>').val(lct.PerformDate).html(lct.PerformDate))
            } else {
                alert("No movie Time available");
            }

        })

        //alert(data.FCode);

        $("#FilmCode").val(data.FCode);
    }
});


});



$("#MovieDay").on('change', function () {
    $('#loaderbody').show();
    $('#MovieTime').prop('disabled', false);
    $('#MovieTime option:eq(0)').attr('selected', 'selected')

    var MovieDay = $("#MovieDay").val();
    var CinemaCompanyID = $("#CinemaCompanyID").val();
    var FilmCode = $("#FilmCode").val();


    //   alert(FromRoute)
    $.ajax({
        url: '/Movies/GetMovieTime',
        data: { MovieDay: MovieDay, CinemaCompanyID: CinemaCompanyID, FilmCode: FilmCode },
    dataType: "json",
    type: "POST",

    success: function (data) {
        // alert("hhh")
        $("#MovieTime").html("");
        $("#MovieTime").append($('<option></option>').val(null).html("Movie Time"));

        //if (data.length == 0) {
        //    alert(data);
        //}

        if (data.location == '0') {
            alert("No Movie time available for today, Please select another day!");
        }
        $.each(data, function (item, lct)
        {
            if (lct.StartTime != null) {
                $("#MovieTime").append($('<option></option>').val(lct.StartTime).html(lct.StartTime))
            }


        })



        $('#loaderbody').hide();

        $("#Amount").html("");

        $("#Amount").val("");
    }
});


});


//    $("#MovieTime").click(function () {
//        $("#loaderbody").show();
//        var MovieTime = $("#MovieTime").val();

//        $.ajax({
//            url: "@Url.Action("CheckMovieTime", "Movies")",
//            data: { movieTime: MovieTime },
//        dataType: "json",
//        type: "POST",
//        success: function (data) {
//            if (data.false) {
//                alert("No Movie for this time");
//            }
//        }
//    });
//});

$("#MovieTime").on('change', function ()
{
    var MovieCategory = $("#MovieCategory").val();
    var NoOfPersons = $("#NoOfPersons").val();
    var CinemaCompanyID = $("#CinemaCompanyID").val();
    var MovieDay = $("#MovieDay").val();
    var FilmCode = $("#FilmCode").val();
    var CouponValue = $("#CouponValue").val();
    var MovieTime = $("#MovieTime").val();

    $("#loaderbody").show();
    //var MovieTime = $("#MovieTime").val();
    //console.log(MovieTime);
    $.ajax({
        url: '/Movies/CheckMovieTime',
        data: { movieTime: MovieTime, movieDay: MovieDay },
    dataType: "json",
    type: "POST",
    success: function(data) {
        //console.log(data);
        if (data.nErrorCode == '0') {
                    
            alert("The current Movie time has expired, Please select another time");
            $("#loaderbody").hide();
            alertify.error("The current Movie time has expired, Please select another time");
            $("#Amount").val("");
            $("#Amount").html("");
        }
        else {
            if (MovieCategory == null || MovieCategory === "")
            {
                $("#loaderbody").hide();
                $(".amountText").show();
                return;
            }


            $.ajax({
                url: '/Movies/GetMovieAmountViaTime',
                data: { MovieCategory: MovieCategory, NoOfPersons: NoOfPersons, CinemaCompanyID: CinemaCompanyID, MovieDay: MovieDay, FilmCode: FilmCode, CouponValue: CouponValue, MovieTime: MovieTime },
            dataType: "json",
            type: "POST",

            success: function (data)
            {
                //$("#loaderbody").show();

                if (data.OrigAmount == null)
                {
               

                    if (data.Amount == "0.00") {
                        alert("No Amount Available");
                        $("#loaderbody").hide();
                        $("#Amount").val(data.Amount);
                        $("#amtCharge").val(data.amtCharge);
                        $(".amountText").show();
                    
                    }
                    else {
                        $("#loaderbody").hide();
                        $("#Amount").val(data.Amount);
                        $(".amountText").show();
                        $("#amtCharge").val(data.amtCharge);
                    }

                }
                else if(data.OrigAmount != null)
                {
                    $("#loaderbody").hide();
                    $("#Amount").val(data.Amount);
                    $("#OrigAmount").text(data.OrigAmount);
                    $("#OrigAmount").show();
                    $("#NewAmount").text(data.OrigAmount);
                    $("#OrigAmount").show();
                    $("#CouponValue").val(data.CouponValue);
                    $(".amountText").hide();
                    $("#amtCharge").val(data.amtCharge);
                }
                //$('#loaderbody').hide();
            },
            error: function () {
                $('#loaderbody').hide();
                $(".amountText").hide();
            }
        });
    }
    //$("#loaderbody").hide();
}
});
        
       
});


$("#NoOfPersons").on('change', function () {

    $("#loaderbody").show();
    var MovieCategory = $("#MovieCategory").val();
    var NoOfPersons = $("#NoOfPersons").val();
    var CinemaCompanyID = $("#CinemaCompanyID").val();
    var MovieDay = $("#MovieDay").val();
    var FilmCode = $("#FilmCode").val();
    var CouponValue = $("#CouponValue").val();
    var MovieTime = $("#MovieTime").val();

    if (MovieCategory == null) {
        $("#loaderbody").hide();
    }
    if (MovieDay == "") {
        $("#loaderbody").hide();
    }

    if (MovieTime == "") {
        $("#loaderbody").hide();
    }

    $.ajax({
        url: '/Movies/GetMovieAmount',
        data: { MovieCategory: MovieCategory, NoOfPersons: NoOfPersons, CinemaCompanyID: CinemaCompanyID, MovieDay: MovieDay, FilmCode: FilmCode, CouponValue: CouponValue, MovieTime: MovieTime },
    dataType: "json",
    type: "POST",

    success: function (data)
    {
        //$('#loaderbody').show();
        if (data.OrigAmount == null)
        {

            $("#Amount").val(data.Amount);
            $('#amtCharge').val(data.amtCharge);
            $('#loaderbody').hide();
            $(".amountText").show();
            var x = $("#Amount").val(data.Amount);
            var y = $("#amtCharge").val(data.amtCharge);
            var totalAmounts = parseFloat(x) + parseFloat(y);
            //alert(totalAmounts);
        }
        else if(data.OrigAmount != null)
        {
            $("#Amount").val(data.Amount);
            $("#amtCharge").val(data.amtCharge);
            $("#OrigAmount").text(data.OrigAmount);
            $("#OrigAmount").show();
            $("#NewAmount").text(data.OrigAmount);
            $("#OrigAmount").show();
            $("#CouponValue").val(data.CouponValue);
            $("#loaderbody").hide();
            $(".amountText").hide();
            var x = $("#Amount").val(data.Amount);
            var y = $("#amtCharge").val(data.amtCharge);
            var totalAmounts = parseInt(data.Amount) + parseInt(data.amtCharge);
            //alert(totalAmounts);
        }


    }
});


});



$("#MovieCategory").on('change', function () {

    $("#loaderbody").show();
    var MovieCategory = $("#MovieCategory").val();
    var NoOfPersons = $("#NoOfPersons").val();
    var CinemaCompanyID = $("#CinemaCompanyID").val();
    var MovieDay = $("#MovieDay").val();
    var FilmCode = $("#FilmCode").val();
    var CouponValue = $("#CouponValue").val();
    var MovieTime = $("#MovieTime").val();
    //   alert(FromRoute)
    //console.log(MovieTime);
    //console.log(MovieDay);
    if (MovieTime == null || MovieTime == "") {
        $("#loaderbody").hide();
        $('.amountText').hide();
    }

    if (MovieDay == "" || MovieDay == "") {
        $("#loaderbody").hide();
        $('.amountText').show();
    }


    $.ajax({
        url: '/Movies/CheckMovieTime',
        data: { movieTime: MovieTime },
    dataType: "json",
    type: "POST",
    success: function(data) {
                
        if (data.nErrorCode == '0') {
            alert("The current Movie time has expire, Please select another time");
            $("#loaderbody").hide();
            alertify.error("The current Movie time has expire, Please select another time");
            $("#Amount").val("");
            $("#Amount").html("");
        }
        else {
                
            $.ajax({
               
                url: '/Movies/GetMovieAmount',
                data: { MovieCategory: MovieCategory, NoOfPersons: NoOfPersons, CinemaCompanyID: CinemaCompanyID, MovieDay: MovieDay, FilmCode: FilmCode, CouponValue: CouponValue, MovieTime: MovieTime },
            dataType: "json",
            type: "POST",
            success: function (data)
            {
                //$("#loaderbody").show();
                if (data.OrigAmount == null)
                {

                    if (data.Amount == "0.00") {
                        alert("No Amount Available");
                        $("#loaderbody").hide();
                        $("#Amount").val(data.Amount);
                        $('#amtCharge').val(data.amtCharge);
                        $(".amountText").show();
                        var x = $("#Amount").val(data.Amount);
                        var y = $("#amtCharge").val(data.amtCharge);

                        var totalAmounts = parseInt(data.Amount) + parseInt(data.amtCharge);
                        //alert(totalAmounts);
                    }
                    else if (data.Amount == null)
                    {
                        alert("No Amount Available");
                        $("#loaderbody").hide();
                        $("#Amount").val(data.Amount);
                        $("#amtCharge").val(data.amtCharge);
                        $(".amountText").show();
                        var x = $("#Amount").val(data.Amount);
                        var y = $("#amtCharge").val(data.amtCharge);
                        var totalAmounts = parseInt(data.Amount) + parseInt(data.amtCharge);
                        //alert(totalAmounts);
                    }
                    else {
                        $("#loaderbody").hide();
                        $("#Amount").val(data.Amount);
                        $("#amtCharge").val(data.amtCharge);
                        $(".amountText").show();
                        var x = $("#Amount").val(data.Amount);
                        var y = $("#amtCharge").val(data.amtCharge);
                        var totalAmounts = parseInt(data.Amount) + parseInt(data.amtCharge);
                        //alert(totalAmounts);
                    }

                }
                else if (data.OrigAmount != null)
                {
                    $("#Amount").val(data.Amount);
                    $("#amtCharge").val(data.amtCharge);
                    $("#OrigAmount").text(data.OrigAmount);
                    $("#OrigAmount").show();
                    $("#NewAmount").text(data.OrigAmount);
                    $("#OrigAmount").show();
                    $("#CouponValue").val(data.CouponValue);
                    $('#loaderbody').hide();
                    $(".amountText").hide();
                    var x = $("#Amount").val(data.Amount);
                    var y = $("#amtCharge").val(data.amtCharge);
                    var totalAmounts = parseInt(data.Amount) + parseInt(data.amtCharge);
                    //alert(totalAmounts);
                }
            }
        });
    }
    //$("#loaderbody").hide();
}
});


});