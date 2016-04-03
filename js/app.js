$(document).ready(function() {
    $('.code-preview').hide();
    $('.show-code').click(function (e) {
        $(this).children('.name').toggle();
        $(this).children('.code-preview').toggle();
        e.stopPropagation();
        return false;
    });
    $("#quick-search").keyup(function () {
        var srch = $(this).val().trim();
        $(".icon-preview-box").hide()
            .filter(function () {
                return $(this).html().trim().indexOf(srch) != -1;
            }).show();
    });
    $(".font-size-changer a").click(function (e) {
        e.preventDefault();
        $(".font-size-changer .active").removeClass("active");
        $(".icon-preview-box").removeClass("small-icons medium-icons large-icons").addClass($(this).attr("class"));
        $(this).addClass("active");
    });
});