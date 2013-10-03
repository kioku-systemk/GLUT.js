var GLUT = function (canvas_id) {
    var c = document.getElementById(canvas_id);
    if (!c)
        return null;
    
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    
    this.gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    
    var glut = this;
    
    window.onresize = function() {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        if (glut.onResize)
            glut.onResize(window.innerWidth, window.innerHeight);
        if (glut.onDraw)
            glut.onDraw();
    };

    (function() {
       var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
        
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
     
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());
    
    function internaldraw() {
        window.requestAnimationFrame(internaldraw);
        if (glut.onDraw)
            glut.onDraw();
    }
    internaldraw();
};
