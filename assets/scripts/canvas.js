
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

    prop.canvas.zoom=1;

    prop.canvas.hexagon=[]; // all of the points in a hexagon

    for(var i=0;i<6;i++) {
	var angle=(i/6)*Math.PI*2;
	prop.canvas.hexagon.push([f(Math.cos(angle)*(prop.map.tile.radius-prop.map.tile.gap)/2),
				  f(Math.sin(angle)*(prop.map.tile.radius-prop.map.tile.gap)/2)]);
    }

    loaded("canvas");
}

function canvas_resize() {
    prop.canvas.size.height=$(window).height();
    prop.canvas.size.width=$(window).width();
    prop.canvas.context.canvas.height=prop.canvas.size.height;
    prop.canvas.context.canvas.width=prop.canvas.size.width;
}

function canvas_clear() {
    prop.canvas.context.fillStyle=prop.style.background;
    prop.canvas.context.fillRect(0,0,prop.canvas.size.width,prop.canvas.size.height);
}

function canvas_hexagon() {
    for(var i=0;i<6;i++) {
	prop.canvas.context.lineTo(prop.canvas.hexagon[i][0],
				   prop.canvas.hexagon[i][1]);
    }
}

function canvas_draw_tile_snow(t) {
    prop.canvas.context.beginPath();
    canvas_hexagon();
    prop.canvas.context.fillStyle=prop.style.tiles.snow.color;
    prop.canvas.context.fill();
}

function canvas_draw_tile_grass(t) {
    prop.canvas.context.beginPath();
    canvas_hexagon();
    prop.canvas.context.fillStyle=prop.style.tiles.grass.color;
    prop.canvas.context.fill();
}

function canvas_draw_tile_sand(t) {
    prop.canvas.context.beginPath();
    canvas_hexagon();
    prop.canvas.context.fillStyle=prop.style.tiles.sand.color;
    prop.canvas.context.fill();
}

function canvas_draw_tile_water(t) {
    prop.canvas.context.beginPath();
    canvas_hexagon();
    prop.canvas.context.fillStyle=prop.style.tiles.water.color;
    prop.canvas.context.fill();
    prop.canvas.context.globalAlpha=trange(0,t.depth,prop.map.tile.radius*prop.style.tiles.water.deep,0,1);
    prop.canvas.context.setCompositeOperation="darker";
    prop.canvas.context.fillStyle=prop.style.tiles.water.deep_color;
    prop.canvas.context.fill();
    prop.canvas.context.globalAlpha=1;
}

function canvas_draw_tile_shadow(t) {
    prop.canvas.context.save();
    prop.canvas.context.translate(prop.style.tiles[t.type].shadow.offset.x,
				  prop.style.tiles[t.type].shadow.offset.y);
    prop.canvas.context.beginPath();
    canvas_hexagon();
    prop.canvas.context.fillStyle=prop.style.tiles[t.type].shadow.color;
    prop.canvas.context.fill();
    prop.canvas.context.restore();
}

function canvas_draw_tile(t) {
    if(prop.canvas.lod > 0)
	canvas_draw_tile_shadow(t);
    if(t.type == "water") {
	canvas_draw_tile_water(t);
    } else if(t.type == "snow") {
	canvas_draw_tile_snow(t);
    } else if(t.type == "grass") {
	canvas_draw_tile_grass(t);
    } else if(t.type == "sand") {
	canvas_draw_tile_sand(t);
    }
}

function canvas_viewport() {
    var viewport={};
    viewport.top=-prop.canvas.pan.y-prop.canvas.size.height/2
    viewport.bottom=-prop.canvas.pan.y+prop.canvas.size.height/2;
    viewport.left=-prop.canvas.pan.x-prop.canvas.size.width/2;
    viewport.right=-prop.canvas.pan.x+prop.canvas.size.width/2;
    viewport.top/=prop.canvas.scale*prop.canvas.zoom;
    viewport.bottom/=prop.canvas.scale*prop.canvas.zoom;
    viewport.left/=prop.canvas.scale*prop.canvas.zoom;
    viewport.right/=prop.canvas.scale*prop.canvas.zoom;
    viewport.top-=prop.map.tile.height/2;
    viewport.bottom+=prop.map.tile.height/2;
    viewport.left-=prop.map.tile.width/2;
    viewport.right+=prop.map.tile.width/2;
    return viewport;
}

function canvas_draw_tiles() {
    var viewport=canvas_viewport();
    var tiles_drawn=0;
    for(var i in prop.map.tiles) {
	var t=prop.map.tiles[i];
	var pos=map_tile_meters(t.pos.x,t.pos.y);
	if((pos.x < viewport.left) || (pos.x > viewport.right) || (pos.y < viewport.top) || (pos.y > viewport.bottom))
	    continue;
	prop.canvas.context.save();
	prop.canvas.context.translate(f(pos.x),f(pos.y));
	canvas_draw_tile(t);
	prop.canvas.context.restore();
	tiles_drawn+=1;
    }
}

function canvas_draw() {
    canvas_draw_tiles();
}

function canvas_update() {
    prop.canvas.lod=f(trange(0.5,prop.canvas.zoom,10,5,15));
    canvas_clear();
    prop.canvas.context.save();
    prop.canvas.context.translate(f(prop.canvas.size.width/2+prop.canvas.pan.x),
				  f(prop.canvas.size.height/2+prop.canvas.pan.y));
    prop.canvas.context.scale(prop.canvas.scale,prop.canvas.scale);
    prop.canvas.context.scale(prop.canvas.zoom,prop.canvas.zoom);
    canvas_draw();
    prop.canvas.context.restore();
}