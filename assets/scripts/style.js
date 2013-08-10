
function style_init() {
    prop.style={};
    prop.style.background="#e6e6e6";
    prop.style.shadow={};
    prop.style.shadow.offset={};
    prop.style.shadow.offset.x=0;
    prop.style.shadow.offset.y=1;
    prop.style.shadow.color="rgba(0,0,0,0.2)";

    prop.style.tiles={};

    prop.style.tiles.snow={};
    prop.style.tiles.snow.color="#fff";

    prop.style.tiles.grass={};
    prop.style.tiles.grass.color="#bfb";

    prop.style.tiles.sand={};
    prop.style.tiles.sand.color="#ffb";

    prop.style.tiles.water={};
    prop.style.tiles.water.deep_color="#235";
    prop.style.tiles.water.deep=10; // the depth the ocean must be to be considered "deepest" in units of hex radius
    prop.style.tiles.water.color="#acf";

    loaded("style");
}

