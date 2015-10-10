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
};

var formatDate = function(d)
{
    if(d !== undefined)
    {
        return d.getFullYear()+"-"+((d.getMonth()<9)?("0"+(d.getMonth()+1)):(d.getMonth()+1))+"-"+((d.getDate()<10)?("0"+d.getDate()):d.getDate());
    }
    else
    {
        return "";
    }
};

var parseCSW = function(xml, prefixFilter)
{
    var layers = [];
    $(xml).find("SearchResults").find('MD_Metadata').each(function(){
        var that = $(this);
        var i = that.find("identificationInfo").find("MD_DataIdentification");
        var distro = that.find("distributionInfo").find("MD_Distribution");
        /////////////
        var b = i.find('EX_GeographicBoundingBox:first');
        var url_detail = distro.find('onLine').filter(function(){return that.find('protocol').find('CharacterString').text()=="WWW:LINK-1.0-http--link";}).find('URL').text().trim();
        /////////////
        if(url_detail.startsWith(prefixFilter) && b.length > 0)
        {
            var title = i.find('title').find('CharacterString').text();
            var date_published = i.find('date').find('DateTime').text();
            var url_thumbnail_200x150 = i.find('graphicOverview').find('fileName').text().trim();
            var abstract_text = ellipsis(i.find('abstract').find('CharacterString').text().replace('\n',''), 100);
            var layer = {
                "title": title,
                "date_published": date_published,
                "region": "",
                "abstract": abstract_text,
                "url_detail": url_detail,
                "url_region": "",
                "url_thumbnail_200x150": url_thumbnail_200x150
            };
            layers.push(layer);
        }
    });
    return layers;
};

