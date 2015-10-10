var buildBoundingBox = function(b)
{
    var g = [0,0,0,0];
    try{
        g =
        [
            parseFloat(parseFloat(b.find('westBoundLongitude').text().trim()).toFixed(4)),
            parseFloat(parseFloat(b.find('southBoundLatitude').text().trim()).toFixed(4)),
            parseFloat(parseFloat(b.find('eastBoundLongitude').text().trim()).toFixed(4)),
            parseFloat(parseFloat(b.find('northBoundLatitude').text().trim()).toFixed(4))
        ];
    }catch(err){g = [0,0,0,0];}
    return g;
};

var ellipsis = function(text,len)
{
    if(len==-1)
        return text;
    else
        return (text.length>len)?(text.substring(0,len-3)+'...'):text;
};

var sortLayers = function(layers)
{
    return layers.sort(function(a, b){
        return a.options.zIndex - b.options.zIndex;
    });
};

var updateRenderOrder = function(layers)
{
    for(var i = 0; i < layers.length; i++)
    {
        layers[i].bringToFront();
    }
}
