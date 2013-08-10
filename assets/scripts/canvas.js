
function canvas_init() {
    prop.canvas={};

    prop.canvas.context=$("#canvas").get(0).getContext("2d");

    prop.canvas.scale=1; // pixels per meter

    prop.canvas.size={
	height:0,
	width:0
    };

    prop.canvas.pan={
	x:0,
	y:0
    };

    loaded("canvas");
}

function canvas_resize() {
    prop.canvas.size.height=$(window).height();
    prop.canvas.size.width=$(window).width();
    prop.canvas.context.canvas.height=prop.canvas.size.height;
    prop.canvas.context.canvas.width=prop.canvas.size.width;
}

function canvas_clear() {
    prop.canvas.context.fillStyle="#ddd";
    prop.canvas.context.fillRect(0,0,prop.canvas.size.width,prop.canvas.size.height);
}

function canvas_draw_tiles() {
    var viewport={};
    viewport.top=-prop.canvas.pan.y-prop.canvas.size.height/2-prop.map.tile.height/2;
    viewport.bottom=-prop.canvas.pan.y+prop.canvas.size.height/2+prop.map.tile.height/2;
    viewport.left=-prop.canvas.pan.x-prop.canvas.size.width/2-prop.map.tile.width/2;
    viewport.right=-prop.canvas.pan.x+prop.canvas.size.width/2+prop.map.tile.width/2;
    for(var i in prop.map.tiles) {
	var t=prop.map.tiles[i];
	var pos=map_tile_meters(t.pos.x,t.pos.y);
	if((pos.x < viewport.left) || (pos.x > viewport.right) || (pos.y < viewport.top) || (pos.y > viewport.bottom))
	    continue;
	prop.canvas.context.save();
	prop.canvas.context.translate(f(pos.x),f(pos.y));
	prop.canvas.context.beginPath();
	for(var j=0;j<7;j++) {
	    var angle=(j/6)*Math.PI*2;
	    prop.canvas.context.lineTo(f(Math.cos(angle)*prop.map.tile.radius/2.1),
				       f(Math.sin(angle)*prop.map.tile.radius/2.1));
	}
	prop.canvas.context.fillStyle="#fff";
	prop.canvas.context.fill();
	prop.canvas.context.restore();
    }
}

function canvas_draw() {
    canvas_draw_tiles();
}

function canvas_update() {
    canvas_clear();
    prop.canvas.context.save();
    prop.canvas.context.translate(f(prop.canvas.size.width/2+prop.canvas.pan.x)+0.5,
				  f(prop.canvas.size.height/2+prop.canvas.pan.y)+0.5);
    canvas_draw();
    prop.canvas.context.restore();
}