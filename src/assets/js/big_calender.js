$(function() {
    $('[data-toggle="calendar"] > .row > .calendar-day > .events > .event').popover({
        container: 'body',
        content: 'Hello World',
        html: true,
        placement: 'bottom',
        template: '<div class="popover calendar-event-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });

    $('[data-toggle="calendar"] > .row > .calendar-day > .events > .event').on('show.bs.popover', function() {
        var attending = parseInt($(this).find('div.progress>.progress-bar').attr('aria-valuenow')),
            total = parseInt($(this).find('div.progress>.progress-bar').attr('aria-valuemax')),
            remaining = total - attending,
            displayAttending = attending - $(this).find('div.attending').children().length,
            html = [
                '<button type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>',
                '<h4>' + $(this).find('h4').text() + '</h4>',
                '<div class="desc">' + $(this).find('div.desc').html() + '</div>',
                '<div class="location">' + $(this).find('div.location').html() + '</div>',
                '<div class="datetime">' + $(this).find('div.datetime').html() + '</div>',
                '<div class="space">Attending <span class="pull-right">Available spots</span></div>',
                '<div class="attending">',
                $(this).find('div.attending').html(),
                '<span class="attending-overflow">+' + displayAttending + '</span>',
                '<span class="pull-right">' + remaining + '</span>',
                '</div>',
                '<a href="#signup" class="btn btn-success" role="button">Sign up</a>'
            ].join('\n');

        $(this).attr('title', $(this).find('h4').text());
        $(this).attr('data-content', html);
    });

    $('[data-toggle="calendar"] > .row > .calendar-day > .events > .event').on('shown.bs.popover', function() {
        var $popup = $(this);
        $('.popover:last-child').find('.close').on('click', function(event) {
            $popup.popover('hide');
        });
    });
});