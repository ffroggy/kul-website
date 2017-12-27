$(window).on('load', function() {
$(".disp-picker").click(function(){
    $(".disp-picker").removeClass('active');
    $(this).addClass('active');

    var id = $(this).attr('id');
    $(".proj-wrap").hide(300);
    $(".proj-wrap[id="+id+"-content]").show(300);
});

});