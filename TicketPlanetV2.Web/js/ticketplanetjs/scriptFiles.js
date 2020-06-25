function buildFrames(src, filmCode, filmTitle) {
    return `
            <div id="id01" class ="w3-modal movieFrame">
                <div class ="w3-modal-content">
                  <header class ="w3-black">
                    <button class ="w3-button w3-display-topright w3-text-white w3-black closeFrame">X</button>
                    <h4 class ="w3-center w3-text-white"><b>${filmTitle}</b></h4>
                    <hr>
                  </header>
                  <div class ="w3-container">

                    <div class ="w3-center spinning">
                      <div class ="" role="status">
                        <span class ="sr-only">Loading...</span>
                        Loading...
                      </div>
                    </div>
                    <iframe id="iframes" width="100%" height="450" src="${src}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                  </div>
                  <footer class ="w3-container w3-black">
                    <button class ="w3-button w3-right w3-black w3-text-white closeFrame">Close</button>
                  </footer>
                </div>
            </div>
        `
}

$(".btnViewTrailer").on('click', function () {

    //e.preventDefault();
    //console.log('Event', e);
    const src = $(this).data('src');
    const filmCode = $(this).data('filmcode');
    const filmTitle = $(this).data('title');
    const overlay = buildFrames(src, filmCode, filmTitle);

    //alert("Src =" + src);
    //console.log('Source', src);
    //console.log('filmCode', filmCode);

    $("body").append(overlay);
    $('.spinning').fadeOut(2000);
    $('.movieFrame').show();

    $(document).on('click', ".closeFrame", function () {
        //console.log('Clicked');
        //document.getElementById('iframe').stopVideo();
        $('.movieFrame').remove();

    });
});