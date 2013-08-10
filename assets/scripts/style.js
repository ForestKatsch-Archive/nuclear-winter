
function style_init() {
    prop.style={};
    prop.style.background="#e6e6e6";

    prop.style.shadow={};
    prop.style.shadow.color="#bbb";

    prop.style.tiles={};

    prop.style.tiles.snow={};
    prop.style.tiles.snow.color="#fff";
    prop.style.tiles.snow.shadow={};
    prop.style.tiles.snow.shadow.color=prop.style.shadow.color;
    prop.style.tiles.snow.shadow.offset={};
    prop.style.tiles.snow.shadow.offset.x=0;
    prop.style.tiles.snow.shadow.offset.y=1;

    prop.style.tiles.grass={};
    prop.style.tiles.grass.color="#bfb";
    prop.style.tiles.grass.shadow={};
    prop.style.tiles.grass.shadow.color=prop.style.shadow.color;
    prop.style.tiles.grass.shadow.offset={};
    prop.style.tiles.grass.shadow.offset.x=0;
    prop.style.tiles.grass.shadow.offset.y=1;

    prop.style.tiles.sand={};
    prop.style.tiles.sand.color="#ffb";
    prop.style.tiles.sand.shadow={};
    prop.style.tiles.sand.shadow.color=prop.style.shadow.color;
    prop.style.tiles.sand.shadow.offset={};
    prop.style.tiles.sand.shadow.offset.x=0;
    prop.style.tiles.sand.shadow.offset.y=1;

    prop.style.tiles.water={};
    prop.style.tiles.water.deep_color="#578";
    prop.style.tiles.water.deep=10; // the depth the ocean must be to be considered "deepest" in units of hex radius
    prop.style.tiles.water.color="#cef";
    prop.style.tiles.water.shadow={};
    prop.style.tiles.water.shadow.color=prop.style.shadow.color;
    prop.style.tiles.water.shadow.offset={};
    prop.style.tiles.water.shadow.offset.x=0;
    prop.style.tiles.water.shadow.offset.y=1;

    loaded("style");
}

