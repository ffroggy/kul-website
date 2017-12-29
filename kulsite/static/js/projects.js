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
    error: function() {
        console.log("AJAX Error :(");
        alert("AJAX error :'( Please try reloading the page.");
    },
    success: function(data) {
        console.log(data);
        show_skill(data);
    }
});
});

function show_skill(data) {
    if (data.status != "success") {
        $("#skdet-header").text("Unknown");
        $("#skdet-descr").text("The description for this skill doesn't exist yet! Sorry about that!");
        $("#skdet-prof").text("0");
    } else {
        $("#skdet-header").text(data.name);
        $("#skdet-descr").text(data.descr);
        $("#skdet-prof").text(data.prof);
    }
    $("#skill-detail").modal('show');
}

$("#skdet-close").click(function() {
    $("#skdet-header").text("");
    $("#skdet-descr").text("");
    $("#skdet-prof").text("");
});

});