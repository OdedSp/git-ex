'use strict'

var gProjs = [
    {
        id: "guess-num",
        name: "Guessing Numbers",
        title: "Name says it all!",
        desc: "Title says it all!",
        publishedAt: new Date(2017, 9, 29),
        labels: []
    },
    {
        id: "touch-nums",
        name: "Touch Nums",
        title: "Touch Deez Nums",
        desc: "Touch the numbers in the right order",
        publishedAt: new Date(2017, 9, 29),
        labels: []
    },
    {
        id: "balloon-pop",
        name: "Balloon Pop",
        title: "Popping balloons",
        desc: "Pop the balloons",
        publishedAt: new Date(2017, 9, 30),
        labels: []
    },
    {
        id: "in-picture",
        name: "In Picture",
        title: "Flag Quiz",
        desc: "Can you tell the difference between these flags?",
        publishedAt: new Date(2017, 9, 31),
        labels: []
    },
    {
        id: "mine-sweeper",
        name: "Mine Sweeper",
        title: "Sweep Mines",
        desc: "Seriously",
        publishedAt: new Date(2017, 10, 1),
        labels: ["Matrixes"]
    },
    {
        id: "sokoban",
        name: "Sokoban",
        title: "Better push those boxes",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        publishedAt: new Date(2017, 10, 2),
        labels: ["Matrixes", "keyboard events"]
    },
    {
        id: "calculator",
        name: "Calculator",
        title: "Calculates",
        desc: "Does basic arithmatics",
        publishedAt: new Date(2017, 10, 6),
        labels: []
    }
];

function renderPortfolio() {
    var strHtml = '';
    for (var i = 0; i < gProjs.length; i++) {
        var currProj = gProjs[i];
        strHtml += '<div class="col-md-4 col-sm-6 portfolio-item">\
        \n<a class="portfolio-link" data-toggle="modal" href="#portfolioModal' + (i+1) + '">\
        \n<div class="portfolio-hover">\
          \n<div class="portfolio-hover-content">\
            \n<i class="fa fa-plus fa-3x"></i>\
              \n</div>\
            \n</div>\
          \n<img class="img-fluid img-grid" src="img/portfolio/' + currProj.id + '.jpg" alt="">\
          \n</a>\
        \n<div class="portfolio-caption">\
        \n<h4>' + currProj.name + '</h4>\
          \n<p class="text-muted">' + currProj.title + '</p>\
          \n</div>\
      \n</div>\n'
    }
    document.querySelector('#projGrid').innerHTML = strHtml;
}

function renderPopups() {
    var strHtml = '';
    for (var i = 0; i < gProjs.length; i++) {
        var currProj = gProjs[i];
        strHtml += '<div class="portfolio-modal modal fade" id="portfolioModal' + (i+1) + '" tabindex="-1" role="dialog" aria-hidden="true">\
        \n<div class="modal-dialog">\
        \n<div class="modal-content">\
          \n<div class="close-modal" data-dismiss="modal">\
            \n<div class="lr">\
              \n<div class="rl"></div>\
                \n</div>\
              \n</div>\
            \n<div class="container">\
            \n<div class="row" >\
              \n<div class="col-lg-8 mx-auto">\
                \n<div class="modal-body">\
                  \n<!-- Project Details Go Here -->\
                    \n<h2>' + + '</h2>\
                    \n<p class="item-intro text-muted">' + currProj.name + '</p>\
                    \n<img class="img-fluid d-block mx-auto img-grid" src="img/portfolio/' + currProj.id + '.jpg" alt="">\
                    \n<p>' + currProj.desc + '</p>\
                    \n<ul class="list-inline my-list">\
                    \n<li>Date: ' + currProj.publishedAt + '</li>\
                      \n<li>Labels:' + currProj.labels[0] + '</li>\
                      \n<li>Try it: <a href="projs/'+ currProj.id +'/index.html"></a></li>\
                      \n</ul>\
                    \n<button class="btn btn-primary" data-dismiss="modal" type="button">\
                        \n<i class="fa fa-times"></i>\
                        \nClose Project</button>\
                        \n</div>\
                  \n</div>\
                \n</div>\
              \n</div>\
            \n</div>\
          \n</div>\
      \n</div>\
      \n</div>'
    }
    document.querySelector('.projModals').innerHTML += strHtml;
}

function initPage() {
    renderPortfolio();
    renderPopups();
}