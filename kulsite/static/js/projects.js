$(window).on('load', function() {
$(".disp-picker").click(function(){
    $(".disp-picker").removeClass('active');
    $(this).addClass('active');

    var id = $(this).attr('id');
    $(".proj-wrap").hide(300);
    $(".proj-wrap[id="+id+"-content]").show(300);
});

$(".skill").click(function() {
$.ajax({
    method: "GET",
    dataType: "json",
    url:"/projects/ajax/skill/"+$(this).attr('id'),
    data: {
        cool:"hi",
    },
    error: function() {
        console.log("AJAX Error :(");
        alert("AJAX ERROR!");
    },
    success: function(data) {
        alert("Success!!");
        console.log(data);
    }
});
});

});