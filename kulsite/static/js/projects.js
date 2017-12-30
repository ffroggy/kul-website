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
        $("#skdet-header").text("Unknown");
        $("#skdet-descr").text("The AJAX request failed! Please try reloading the page. If the issue persists, please email Nicholas at nachera@live.ccom");
        $("#skill-detail").modal('show');
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
    } else {
        $("#skdet-header").text(data.name);
        $("#skdet-descr").text(data.descr);
    }
    $("#skill-detail").modal('show');
    update_prof(data.prof);
    show_projects(data.proj);
}

function update_prof(prof_int) {
    console.log(prof_int);
    if (!prof_int || prof_int==0){
        return;
    }
    prof_int--;
    //Iterate prof_int for our function later

    var section = 20; //section size (100/num_sections)
    $("#skdet-p-level").width(((section*prof_int)+(section/2))+"%");
}

function show_projects(projects) {
    var proj_html = "";
    for (proj of projects) {
        proj_html += "<li class='list-group-item sk-collapse' data-toggle='collapse' data-target='#p"+proj.id+"'>";
        proj_html += "<h6><b>"+proj.name+"</b></h6>";
        proj_html += "<p class='collapse' id='p"+proj.id+"'>"+proj.descr+"</p>";
        proj_html += "</li>";
    }
    $("#skdet-proj").html(proj_html);
}

$("#skdet-close").click(function() {
    $("#skdet-header").text("");
    $("#skdet-descr").text("");
    $("#skdet-proj").html("");
    update_prof(0);
});
});