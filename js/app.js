$(document).ready(function() {
$('.code-preview').hide();
    $('.show-code').click(function (e) {
        $(this).children('.name').toggle();
        $(this).children('.code-preview').toggle();
        e.stopPropagation();
        return false;
    });
});