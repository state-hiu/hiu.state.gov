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

var parseCSW = function(xml, prefixFilter, regionFilter, regionName)
{
    var layers = [];
    $(xml).find("SearchResults").find('MD_Metadata').each(function(){
        var that = $(this);
        var i = that.find("identificationInfo").find("MD_DataIdentification");
        var distro = that.find("distributionInfo").find("MD_Distribution");
        /////////////
        var b = i.find('EX_GeographicBoundingBox:first');
        var url_detail = distro.find('onLine').filter(function(){return $(this).find('protocol').find('CharacterString').text()=="WWW:LINK-1.0-http--link";}).find('URL').text().trim();
        /////////////
        if(url_detail.startsWith(prefixFilter) && b.length > 0)
        {
            var title = i.find('title').find('CharacterString').text();
            var date_published = i.find('date').find('DateTime').text();
            var url_thumbnail_200x150 = i.find('graphicOverview').find('fileName').text().trim();
            var abstract_text = ellipsis(i.find('abstract').find('CharacterString').text().replace('\n',''), 200);
            var layer_regions = i.find('descriptiveKeywords').filter(function(){return $(this).find('type').text().trim()=="place";}).find('keyword').map(function(){return $(this).text().trim();}).get();
            var keywords = [];
            var url_shapefile = distro.find('onLine').filter(function(){return $(this).find('protocol').text().trim()=="WWW:DOWNLOAD-1.0-http--download";}).filter(function(){return $(this).find('name').text().trim().endsWith(".zip");}).find('URL').text().trim();
            var url_geojson = distro.find('onLine').filter(function(){return $(this).find('protocol').text().trim()=="WWW:DOWNLOAD-1.0-http--download";}).filter(function(){return $(this).find('name').text().trim().endsWith(".json");}).find('URL').text().trim();
            var url_kml = distro.find('onLine').filter(function(){return $(this).find('protocol').text().trim()=="WWW:DOWNLOAD-1.0-http--download";}).filter(function(){return $(this).find('description').text().trim().endsWith("(KML Format)");}).find('URL').text().trim();
            var layer = {
                "title": title,
                "date_published": formatDate(new Date(Date.parse(date_published))),
                "region": regionName,
                "abstract": abstract_text,
                "url_detail": url_detail,
                "url_shapefile": url_shapefile,
                "url_geojson": url_geojson,
                "url_kml": url_kml,
                "url_region": "",
                "url_thumbnail_200x150": url_thumbnail_200x150
            };
            if(regionFilter !== undefined)
            {
                if($(layer_regions).filter(regionFilter).length > 0)
                {
                    layers.push(layer);
                }
            }
            else
            {
                layers.push(layer)
            }
        }
    });
    return layers;
};

