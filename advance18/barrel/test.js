var colors = ["red",'yellow','blue','pink','green','orange','white'];
var colorIndex = 0,
    index = 1,
    length = 0,
    screenWith = $(window).width();

var getRandomSize = function() {
    return parseInt(Math.random()*400)+50;
};
var getColor = function() {
    var color = colors[colorIndex];
    colorIndex++;
    if(colorIndex==colors.length){
        colorIndex=0;
    }
    return color;
};
var getCard = function() {
    var $node = $('<div></div>');
    $node.text(index++);
}
