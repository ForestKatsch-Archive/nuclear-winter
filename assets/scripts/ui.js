
var MOUSE_LEFT=1;

function ui_init() {
    prop.ui={};

    prop.ui.scroll={};
    prop.ui.scroll.sensitivity=25;

    prop.ui.drag={};
    prop.ui.drag.dragging=false;
    prop.ui.drag.start_mouse={
	x:0,
	y:0
    };
    prop.ui.drag.start_offset={
	x:0,
	y:0
    };

    $("#canvas").mousewheel(function(e,d,dx,dy) {
	prop.canvas.pan.x-=dx*prop.ui.scroll.sensitivity;
	prop.canvas.pan.y+=dy*prop.ui.scroll.sensitivity;
	map_resize();
    });
			
    $("#canvas").mousedown(function(e) {
	if(e.which == MOUSE_LEFT) {
	    prop.ui.drag.dragging=true;
	    prop.ui.drag.start_mouse.x=e.pageX;
	    prop.ui.drag.start_mouse.y=e.pageY;
	    prop.ui.drag.start_offset.x=prop.canvas.pan.x;
	    prop.ui.drag.start_offset.y=prop.canvas.pan.y;
	}
    });
    
    $("#canvas").mousemove(function(e) {
	if(prop.ui.drag.dragging == true) {
	    var offset={
		x:prop.ui.drag.start_mouse.x-e.pageX,
		y:prop.ui.drag.start_mouse.y-e.pageY
	    };
	    prop.canvas.pan.x=prop.ui.drag.start_offset.x-offset.x;
	    prop.canvas.pan.y=prop.ui.drag.start_offset.y-offset.y;
	}
    });
    
    $("#canvas").mouseup(function(e) {
	if(e.which == MOUSE_LEFT) {
	    prop.ui.drag.dragging=false;
	}
    });
    
    loaded("ui");
}