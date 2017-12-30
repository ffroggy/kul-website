$(window).on('load', function() {
var index = 0;
var titles = [
    "Visionary",
    "Developer",
    "Writer",
    "Scholar",
    "Pie Enthusiast",
    "Pi Enthusiast",
    "Raspberry Pi Enthusiast",
    "Cryptocurrency Collector",
    "Open Source Believer",
    "Burrito Lover",
    "Bibliophile",
    "Riddler",
    "Storyteller",
    "Web Programmer",
];
function updateSubtitle() {
    var old_len = titles[index].length;
    index = (index + 1) % titles.length;
    var new_title = titles[index]

    if (old_len <= new_title.length) {
        $(".home-subtitle").animate({width: getTextWidth(new_title)},{duration: 100});
    }
    $(".home-subtitle").hide({
        effect:'slide',
        direction: 'left',
        duration: 500,
        complete: function() {
            $(".home-subtitle").text(new_title);
        }
    });
    $(".home-subtitle").show({effect: 'slide', direction:'right', duration:500,});
    if (old_len > new_title.length) {
        $(".home-subtitle").animate({width: getTextWidth(new_title)},{duration: 100});
    }


    var t = setTimeout(updateSubtitle, 3000);
}
updateSubtitle();

function getTextWidth(text) {
    $(".ruler").text(text);
    return $(".ruler").width();
}
})