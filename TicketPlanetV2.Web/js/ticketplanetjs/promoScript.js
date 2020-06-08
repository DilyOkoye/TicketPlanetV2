$("#btnVoucher").on('click', function ()
{
    $('#btnVoucher').attr('disabled', true);
    $('#loadVoucherCode').show()
    var VoucherCode = $("#VoucherCode").val();
    var Amount = $("#Amount").val();

    //  alert(Amount);

    $.ajax({
        url: "/Movies/VerifyCoupon",
        data: { coupon: VoucherCode },
    dataType: "json",
    type: "POST",

    success: function (data)
    {
        $('#btnVoucher').attr('disabled', false);
        $('#loadVoucherCode').hide()
        //  alert(data.nErrorCode)
        if (data != null)
        {

            if (data.nErrorCode == 1)

            {
                if (Amount != "")
                {

                    var amt = Number(Amount.replace(/[^0-9\.-]+/g, ""));

                    var tranAmount = (data.CouponValue / 100) * amt;

                    $("#Amount").val(tranAmount);
                }

                $('#searchResults1').hide()
                $('#searchResults').delay(800).slideDown(500);
                $('#searchResults').html(data.sErrorText)
                alertify.log(data.sErrorText, "", 0);

                $("#lblCoupon").text(data.sErrorText);
                $("#lblCoupon").show();
                $("#nErrorCode").val(data.nErrorCode);

                $("#IsCoupon").val("Y");
                $("#Coupon").val(VoucherCode);
                $("#CouponValue").val(data.CouponValue);
                $("#CouponAgentId").val(data.CouponAgentId);
                $("#CouponAssignId").val(data.CouponAssignId);
                $("#CouponID").val(data.CouponId);

            }
            else
            {
                alertify.error(data.sErrorText, "", 0);

                $("#lblCoupon").hide();
                ("#nErrorCode").val(data.nErrorCode);
                $("#IsCoupon").val("N");
            }


        }
        else
        {
            $("#lblCoupon").hide();

        }

    }
});


});


$("#btnPromo").on('click', function ()
{
    $('#btnPromo').attr('disabled', true);
    var PromoCode = $("#PromoCode1").val();


    //alert(PromoCode);

    $.ajax({
        url: "/Movies/VerifyPromoCode",
        data: { PromoCode: PromoCode },
    dataType: "json",
    type: "POST",

    success: function (data)
    {
        $('#btnPromo').attr('disabled', false);
        //  alert(data.nErrorCode)
        if (data != null)
        {
            $('#btnPromo').attr('disabled', false);
            if (data.nErrorCode == 0)
            {
                $("#IntializePayment").hide();
                $("#amtDiv").hide();
                $("#btnSaveTrans").show();
                $("#PromoCode").val(data.PromoCode);
                alertify.log(data.sErrorText, "", 0);

            }
            else if (data.nErrorCode == -4)
            {
                alertify.error(data.sErrorText, "", 0);

            }
            else
            {
                alertify.error(data.sErrorText, "", 0);

                ("#nErrorCode").val(data.nErrorCode);
            }


        }
        else
        {
            $("#lblCoupon").hide();

        }
        $('#btnPromo').attr('disabled', false);


    }
});


});


$("#btnSaveTrans").on('click', function ()
{
    $("#loaderbody").show();


    var PromoCode = $("#PromoCode").val();
    var Fullname = $("#Fullname").val();
    var phoneNo = $("#phoneNo").val();
    var email = $("#email").val();
    var NoOfPersons = $("#NoOfPersons").val();
    var MovieCategory = $("#MovieCategory").val();
    var CinemaCompanyID = $("#CinemaCompanyID").val();
    var MovieDay = $("#MovieDay").val();
    var MovieTime = $("#MovieTime").val();
    var MovieName = $("#MovieName").val();

    //alert(MovieDay)
    //alert(MovieCategory)

    if ($("#Fullname").val() === "" || $('#phoneNo').val() === "" ||
                   $('#email').val() === "" ||
                   $('#NoOfPersons').val() === "" ||
                   $('#MovieCategory').val() === "" ||
                   $('#MovieDay').val() === "" || $('#MovieTime').val() === "") {

        alertify.error("One or Two Compulsory Fields is Empty");
        $("#loaderbody").hide();
        $('#btnSaveTrans').attr('btnSaveTrans', false);
        return;
    }


    if (NoOfPersons > 1)
    {
        alertify.error("Ticket Planet Awoof Promo is Limited to Just One Person", "", 0);
        $("#loading").hide();
        $('#btnSaveTrans').attr('btnSaveTrans', false);
        return;
    }


    if (MovieCategory != "1") {
        alertify.error("Promo tickets are  Limited to Regular", "", 0);
        $("#loading").hide();
        $('#btnSaveTrans').attr('btnSaveTrans', false);
        return;
    }

    $.ajax({
        url: "/Movies/SavePromoTransaction",
        data: {
        PromoCode: PromoCode, Fullname: Fullname, phoneNo: phoneNo,email:email,NoOfPersons: NoOfPersons, MovieCategory: MovieCategory,
        CinemaCompanyID: CinemaCompanyID, MovieDay: MovieDay, MovieTime: MovieTime, MovieName: MovieName
        },
    dataType: "json",
    type: "POST",

    success: function (data)
    {
        $('#btnSaveTrans').attr('btnSaveTrans', false);

        //  alert(data.nErrorCode)
        if (data != null)
        {
            if (data.nErrorCode == 0)
            {

                var _addInvoiceUrl = '@(Html.Raw(Url.Action("PaymentConfirmationViaPromo", "Movies", new { tranRef = "TransactionRef1", origRef = "origRef1" })))';
                var url = _addInvoiceUrl.replace('TransactionRef1', data.TransactionRef).replace('origRef1', data.origRef);
                //window.location.href = url;
                //var url = "/Movies/PaymentConfirmationViaPromo?tranRef=" + data.TransactionRef +"?origRef=" + data.origRef;
                window.location.href = url;
            }

            else if (data.nErrorCode == -1)
            {
                alertify.error(data.sErrorText, "", 0);


            }


        }
        else
        {
            alertify.error("An Error Occured While Processing Your Request", "", 0);

        }

        $("#loading").hide();
    }
});


});