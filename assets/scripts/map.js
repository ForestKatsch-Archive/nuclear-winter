
var Tile=function(pos) {
    this.pos={
	x:pos[0],
	y:pos[1]
    };
};

function map_init() {
    prop.map={};

    prop.map.tile={};
    prop.map.tile.radius=200; // radius of single tile in meters
    prop.map.tile.height=Math.sin(Math.PI/3)*prop.map.tile.radius;
    prop.map.tile.width=2*(Math.cos(Math.PI/3)*prop.map.tile.radius);

    prop.map.tiles={};

    map_generate();

    loaded("map");
    map_tile_meters(0,0);
}

function map_generate() {
    var size=2;
    for(var x=-size;x<size;x++) {
	for(var y=-size;y<size;y++) {
	    prop.map.tiles[map_tile_name(x,y)]=new Tile([x,y]);
	}
    }
}

function map_tile_name(x,y) {
    return x+","+y
}

function map_tile_meters(x,y) {
    // returns the meter location of tile (x,y)
    
}
