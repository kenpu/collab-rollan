$(function() {
    var body = $("body");
    var box = $("<div class='box'></div>")
    $("<div><input type='text'></input><span></span></div>").appendTo(box);
    body.append(box)

    var input = $("input", box);
    var counter = $("span", box);

    var canvas = $("<canvas id='TheCanvas'></canvas>").appendTo(body);
    var canvasWidth = body.width();
    var canvasHeight = 0;
    $("*").each(function() {
        var offset = $(this).offset();
        var h = offset.top + $(this).outerHeight();
        if(canvasHeight < h) canvasHeight = h;
    });

    var colors = [
        '#880', '#ccc'
    ];
    var colorIndex = 0;

    canvas.attr({
        width: canvasWidth,
        height: canvasHeight
    });

    var ctx = canvas[0].getContext('2d');
    console.debug("kens_debug", canvas, ctx);
    function turnOff() {
        canvas.css('display', 'none');
    }
    function turnOn() {
        canvas.css('display',  'block');
    }
    function highlight(el) {
        var offset = el.offset();
        var x0 = offset.left,
            y0 = offset.top,
            w = el.width(),
            h = el.height();
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = colors[colorIndex % colors.length];
        colorIndex += 1;
        ctx.fillRect(x0, y0, w, h);
        ctx.restore();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    input.bind("keyup", function() {
        var val = input.val();
        turnOn();
        clearCanvas();
        try {
            var matches = $(val);
            counter.text(matches.size());
            matches.each(function() {
                highlight($(this));
            });
        } catch(e) {
            counter.text("error:" + e);
        }
    });

    canvas.bind('click', function() {
        turnOff();
    });
});
