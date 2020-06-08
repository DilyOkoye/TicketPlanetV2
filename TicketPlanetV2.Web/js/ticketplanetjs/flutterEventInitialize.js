$(function () {



    function InitFlwTransaction(data) {
        return $.ajax({
            type: "POST",
            url: "/Events/FlutterwaveEventPayment/",
            data: data,
            dataType: 'json',
        contentType: 'application/json;charset=utf-8'
    });
}

        $("#IntializeFlwPayment").click(function (e) {


            if ($("#IsFreeEvent").val() == "N") {

                if ($("#Fullname").val() === "" || $('#phoneNo').val() === "" ||
                    $('#email').val() === "" ||
                    $('#NoOfPersons').val() === "" ||
                    $('#TicketCategory').val() === "" ||
                    $('#Amount').val() === "" ||
                    $('#comments').val() === "") {

                    alertify.error("One or Two Compulsory Fields is Empty");
                    return;
                }

            }
            else {
                if ($("#Fullname").val() === "" || $('#phoneNo').val() === "" ||
                    $('#email').val() === "" ||
                    $('#NoOfPersons').val() === "" || $('#currency').val() === "") {

                    alertify.error("One or Two Compulsory Fields is Empty");
                    return;
                }
            }

            $("#loaderbody").show();
            e.preventDefault();

            var currency = $("#currency").val();
            console.log(currency);
            var data = JSON.stringify({
                Fullname: $("#Fullname").val(),
                phoneNo: $("#phoneNo").val(),
                email: $("#email").val(),
                NoOfPersons: $("#NoOfPersons").val(),
                TicketCategory: $("#TicketCategory").val(),
                Amount: $("#Amount").val(),
                comments: $("#comments").val(),
                IsFreeEvent: $("#IsFreeEvent").val(),
                TicketType: $("#TicketType").val(),
                TicketCategoryName: $("#TicketCategory>option:selected").text(),
                CouponValue: $("#CouponValue").val(),
                Validated: "N",
                ReferalId: $("#referalId").val()

            });


            $.when(InitFlwTransaction(data)).then(function (response) {
                if (response.error == false) {
                    $('#loaderbody').hide();
                    //console.log(response.result);
                    //console.log(('#amtCharge').val());
                    //console.log(totalAmounts);
                    //console.log(response.result);
                    payWithRave(response.result.publicKey, response.result, currency);
                    //window.location.href = response.result.data.authorization_url;

                } else {
                    $("#loaderbody").hide();
                }

            }).fail(function () {
                $("#loaderbody").hide();
            });

        });

});

//const API_publicKey = "<ADD YOUR PUBLIC KEY HERE>";

function payWithRave(pbKeys, data, currency) {
    //var phone = $('#njj').val();
    var country = "";
    var curr;
    switch (currency) {
        case "1":
            country = 'NG';
            curr = "NGN"
            break;
        case "2":
            country = 'NG';
            curr = "GBP"
            break;
        case "3":
            country = 'NG';
            curr = "EUR"
            break;
        case "4":
            country = 'NG';
            curr = "USD"
            break;
        case "5":
            country = 'GH';
            curr = "GHS"
            break;
        case "6":
            country = 'KE';
            curr = "KES"
            break;
        case "7":
            country = 'NG';
            curr = "UGX"
            break;
        case "8":
            country = 'NG';
            curr = "TZX"
            break;

        default:
            country = 'NG';
            curr = "NGN"
            break;
    }

       
    var txtRef = data.Reference;
    console.log(country);
    console.log(curr);

    var x = getpaidSetup({
        PBFPubKey: pbKeys,
        customer_email: data.email,
        amount: data.amount,
        customer_phone: data.phoneNo,
        customer_fullName: data.firstname,
        currency: curr,
        country: country,
        txref: data.Reference,
        meta: [{
            metaname: "TICKETPLANET LIMITED",
            metavalue: "1133395"
        }],
        onclose: function () { },
        callback: function (response) {
            //var fltRef = response.tx.txRef; // collect txRef returned and pass to a server page to complete status check.
            //console.log("This is the response returned after a charge", response);
            //console.log(response);
            if (response.tx.chargeResponseCode == "00")
            {
                    
                var flutterRef = response.tx.flwRef;
                var tkReference = response.tx.txRef;

                $.ajax({
                        
                    url: "/Events/updateFlutterPayment",
                    data: { reference: response.tx.txRef, flwRef: response.tx.flwRef },
                dataType: "json",
                type: "POST",
                success: function (data) {
                    if (data.error == false) {
                        //redirect to confirmation payment page
                        alert("Payment Successful, please check your email for payment confirmation.");
                                
                                
                        //console.log(response.tx.redirectUrl);
                        window.location.href = "https://ticketplanet.ng/Events/paymentConfirmationFlw?reference=" + response.tx.txRef + "&flwRef=" + response.tx.flwRef;
                                
                    } else {
                        //alert("Error to update table for SUCCESSFUL");
                    }
                }
            });

            //window.location.href = "https://ticketplanet.ng/Events/paymentConfirmationFlw?reference=" + tkReference + "&fltRef=" + flutterRef;

        } else {
                // redirect to a failure page.

    }

x.close(); // use this to close the modal immediately after payment.
}
});
}