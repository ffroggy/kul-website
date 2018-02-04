$(window).on('load', function() {
$(".toool").tooltip();

//Project View
$(".project").click(function() {
    $.ajax({
        method: "GET",
        dataType: "json",
        url:"/projects/ajax/project/"+$(this).attr('id'),
        error: function() {
            $("#prdet-header").text("Unknown");
            $("#prdet-descr").text("The AJAX request failed! Please try reloading the page. If the issue persists, please email Nicholas at nachera@live.ccom");
            $("#project-detail").modal('show');
        },
        success: function(data) {
            console.log(data);
            show_project(data);
        }
    });
});

function show_project(data) {
    $("#prdet-skills").text("");
    if (data.status != "success") {
        $("#prdet-header").text("Unknown");
        $("#prdet-descr").text("Hmm, this project doesn't have a description yet. Sorry about that!");
    } else {
        $("#prdet-header").text(data.name);
        $("#prdet-descr").text(data.descr);
        for (skill of data.skills) {
            $("#prdet-skills").append("<div class='skill proj-det-skill'>"+
            "<img src='/static/projects/"+skill.img+".png' class='skill-icon'>"+
            "<p class='skill-descr'>"+skill.name+"</p></div>");
        }
    }
    $("#project-detail").modal('show');
}

//Skills View
$(".disp-picker").click(function() {
    if ($(this).hasClass('active'))
        return;

    $(".disp-picker").removeClass('active');
    $(this).addClass('active');

    var id = $(this).attr('id');

    $(".proj-wrap").fadeOut("fast", function() {console.log("fun");$(".proj-wrap[id="+id+"-content]").fadeIn("fast");});
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
        proj_html += "<li class='list-group-item sk-collapse' data-toggle='collapse' data-target='#sp"+proj.id+"'>";
        proj_html += "<div class='proj-header'>";
        proj_html += "<h6><b>"+proj.name+"</b></h6> <p class='toool proj-mag-"+proj.mag+"' data-toggle='tooltip' title='Project Size'>"+proj.mag_nice+"</p>";
        proj_html += "</div>";
        proj_html += "<p class='collapse' id='sp"+proj.id+"'>"+proj.descr+"</p>";
        proj_html += "</li>";
    }
    $("#skdet-proj").html(proj_html);
    $(".toool").tooltip();
}

$("#prdet-close").click(function() {
    $("#prdet-header").text("");
    $("#prdet-descr").text("");
    $("#prdet-proj").html("");
    $("#prdet-skills").html("");
});

$("#skdet-close").click(function() {
    $("#skdet-header").text("");
    $("#skdet-descr").text("");
    $("#skdet-proj").html("");
    update_prof(0);
});
});