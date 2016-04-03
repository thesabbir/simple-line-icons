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
});