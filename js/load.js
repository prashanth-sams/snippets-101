/**
 * Copyright Prashanth Sams. Licensed under MIT
 * See license text at https://opensource.org/licenses/MIT
 */

var toolToFilter = "ALLSNIPPETS";

$(document).ready(function () {
    $("input:radio").click(function () {
        toolToFilter = $("input[type='radio'].form-check-input:checked").val().toUpperCase();
        filterContent(toolToFilter);
    });

    filterContent(toolToFilter);
});

function filterContent(tool) {
    $.getJSON("data/snippets.json", function (data) {        
        var dataFiltered = toolToFilter == "ALLSNIPPETS" ? data : data.filter(tip => new RegExp('\\b' + toolToFilter + '\\b', 'i').test(tip.tool));
        var cardsToRemove = document.querySelectorAll(".cardItem");

        $(cardsToRemove).remove();

        for (i in dataFiltered) {
            appendText(dataFiltered[i]);
        }

    }).fail(function () {
        console.log("Error to load the data from JSON file");
    });
}

// function appendText(number, tool, tip, link) {
function appendText(data) {
    var template = $("#template").html();
    var output = Mustache.render(template, data);

    $("#cardList").append(output);
}