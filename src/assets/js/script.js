$(document).ready(function() {
    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
        $('.fab').toggleClass('fav-active')
        $(this).toggleClass('navbar-active');
        $('#create-text').toggle(300);
        getValues();

    });

    $("#searchbtn").on('click', function() {
        $('.search-form').toggleClass('search-form-active');
    });

});


$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

$(".dropdown-menu li a").click(function() {
    var selText = $(this).text();
    $(this).parents('.btn-group').find('.dropdown-toggle').html(selText);
});
