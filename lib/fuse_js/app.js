require([
  '../lib/fuse_js/mustache.js',
  '../lib/fuse_js/fuse.min.js',
  'text!../fuse_js/templates/question_view.mustache',
  'text!../fuse_js/templates/result_list.mustache',
  'text!../fuse_js/templates/result_list_matches.mustache',
  'text!products_complete.json'
], function (Mustache, Fuse, questionView, resultList, resultListMatches, products) {

  //listener for products filter dropdown menu
  $('.dropdown-menu').find('a').click(function(e) {
      e.preventDefault();
      var param = $(this).attr("href").replace("#","");
      var concept = $(this).text();

      /*console.log('selected href');
      console.log($(this).attr("href"));*/

      if ($(this).attr("href") == '#all') {
        $('span#search_concept').text('');
        $('span#filter-label').text(concept);
        $('#filter_param').val(param);

        $('#product-count').text(ObjectLength(questions) + ' total products');

        if ($('#inputSuccess1').val().length < 1 ) {
            searchQuery(' ');
        } else {
            searchQuery($('#inputSuccess1').val());
        }

      } else {
        $('span#search_concept').text('Filter: ');
        $('span#filter-label').text(concept);
        $('#filter_param').val(param);

        /*console.log('filtered objects');*/
        var filterObjectsNum = filterObjects(questions,param);

        /*console.log('filterObjectsNum: ');
        console.log(filterObjectsNum);*/

        /*console.log('ObjectLength count: ');
        console.log(ObjectLength(filterObjects(questions,param)));*/

        $('#product-count').text(ObjectLength(filterObjects(questions,param)) + ' total products');

        /*console.log('what is the inputSuccess1 value?');
        console.log($('#inputSuccess1').val());
        console.log($('#inputSuccess1').val().length);*/

        //re-populate items

        if ($('#inputSuccess1').val().length < 1 ) {
            searchQuery(' ');
        } else {
            searchQuery($('#inputSuccess1').val());
        }

      }
  });

  window.ObjectLength = function ( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
  };

  window.filterObjects = function ( object, filter ) {
    //console.log('object');
    //console.log(object);

    var filteredCopy = object.slice(0,object.length);

    var key = filteredCopy.length;
    while (key--) {
        //console.log('object[key].region_id');
        //console.log(filteredCopy[key].region_id);

        //console.log('filter');
        //console.log(filter);

        if (filteredCopy[key].item) {
          if (filteredCopy[key].item.region_id != filter) {
            //console.log('filtering out')
            filteredCopy.splice(key,1);
          }
        } else if (filteredCopy[key].region_id != filter) {
          //console.log('filtering out')
          filteredCopy.splice(key,1);
        }
    }

    return filteredCopy;
  };

  var moreThanOneJpegTest = function( object ) {
        //console.log('moreThanOneJpegTest called');
        var length = 0;
        var jpegArrayKeys = [];
        for( var key in object ) {
            if( object.hasOwnProperty(key) ) {
                //console.log('print key');
                //console.log(key);
                //console.log(key.indexOf("product_jpg"));
                if( key.indexOf("product_jpg") > -1 ) {
                    //console.log('product_jpg value: ');
                    //console.log(object[key]);
                    if (object[key]) {
                      //console.log('pushing key ');
                      ++length;
                      jpegArrayKeys.push(key);
                    }
                }
            }
        }

        //console.log('printing product jpg keys');
        jpegArrayKeys.sort();
        //console.log(jpegArrayKeys);
        
        return {
            length: length,
            jpegArrayKeys: jpegArrayKeys
        };
        //need to order javascript array keys
        
    };

  var addNewLabel = function( object ) {
    //console.log('addNewLabel starts');

    var d = new Date();
    var curr_date = d.getDate();
    var past_60_days = d.setDate(d.getDate()-60);

    /*console.log("past 60 days");
    console.log(past_60_days);*/

    /*loop through json and match today's date with match-date*/
    var jsonCount = 0;

    for( var key in object) {
        /*console.log('looping through questions');
        console.log(key);
        console.log(object[key]);
        console.log(object[key].id);*/

        var item;

        if (object[key].item) {
              item = object[key].item;
          } else {
              item = object[key];
          }
        
        console.log('json properties');
        console.log(item);
        //console.log(item.date_published);

        var newDate = new Date(item.date_published);

        if ( newDate > past_60_days) {

            console.log('new date');
            console.log(newDate);

            console.log('id');
            console.log(item.id);

            jsonCount++;

            /*add new to the product*/
            var id = item.id;

            /*stackoverflow.com/questions/7951505/about-jquery-append-and-how-to-check-if-an-element-has-been-appended*/
            if($('h4#'+id+' .new-product').length <= 0) {
                $('h4#'+id).append("<span class='new-product'> new</span>");
            }
        }

        var interactiveContent = '<span class="new-product">'+ ' interactive' +'</span> <p>';

        var button_text = '<a href=' + item.baseurl + ' class="btn btn-primary" style="padding: 3px 10px;background-color:#269419;color:#fff" type="button">View interactive</a>'
        
        if (item.interactive == true) {
            $('h4#'+id).append(interactiveContent);
            $("div[title='"+item.title+"'] .dropdown").replaceWith(button_text);
        }

    }
  }

  var completeDropdown = function( object ) {
      for( var key in object) {
          /*console.log('looping through questions');
          console.log(key);
          console.log(object[key]);
          console.log(object[key].id);*/

          var item;

          if (object[key].item) {
                item = object[key].item;
            } else {
                item = object[key];
            }

          var JpegLength = moreThanOneJpegTest( item ).length
          var jpegArrayKeys = moreThanOneJpegTest( item ).jpegArrayKeys
          //console.log('Jpef Length');
          //console.log('Jpef Length');
          //console.log(JpegLength);
         if ( JpegLength > 1) {
              //for (key in layer.feature.properties) {
                  //console.log('printing');
                  //console.log(layer.feature.properties[key]);
                  //console.log(key);
             // }
              /*console.log('inner loop!!');
              console.log('printing JpegLength');
              console.log(JpegLength);*/

              //modify first JPG link text to say page 1 of x
              $( "div[title='"+item.title+"'] .dropdown-menu li:last-child a" ).text("JPG - page 1 of "+JpegLength);


              for (i = 1; i < JpegLength; i++) { 
                  /*console.log('printing i');
                  console.log(i);
                  console.log('printing jpegArrayKey');
                  console.log(jpegArrayKeys[i]);*/
                  var tempVal = jpegArrayKeys[i];
                  /*console.log('obj key');
                  console.log(item[tempVal]);*/
                  $( "div[title='"+item.title+"'] .dropdown-menu" ).append('<li><a href="'+ item[tempVal] +'">JPG - page '+(i+1)+' of '+JpegLength+'</a></li>');
                  //console.log(layer.feature.properties[moreThanOneJpegTest(layer.feature.properties.jpegArrayKeys[i])]);
              }
          }
      }
    }

  var resultHighlighter = function (qs) {
    
    console.log('highlighter started');

    for (var key in qs) {
      console.log('key and val');
      console.log(key);
      console.log(qs[key]);


      console.log('pair');
      console.log(qs[key].matches.shift());

      var pair = qs[key].matches.shift();

      //loop through matches
      for (var i = 0; i < qs[key].matches.length; i++) {
          console.log('loop match');
          console.log(qs[key].matches[i]);
          console.log(qs[key].matches[i].key);

          var itemKey = qs[key].matches[i].key;

          console.log('itemKey');
          console.log(itemKey);


          console.log('item match');
          console.log(qs[key].item.keywords);

          var text = qs[key].item[itemKey];

          console.log('text');
          console.log(text);

          var result = [];

          var pair = qs[key].matches[i].indices.shift();

          if (text.length > 0) {
            for (var i = 0; i < text.length; i++) {
              var char = text.charAt(i)
              if (pair && i == pair[0]) {
                result.push('<b>')
              }
              result.push(char)
              if (pair && i == pair[1]) {
                result.push('</b>')
                pair = matches.shift()
              }
            }
          }

          console.log(result.join(''));
          console.log('result in bold');
          console.log(result);
                
        }
    }

    return qs;

  }

  var renderResultList = function (qs) {
    //console.log('renderResultList called');
    $("#result-list-container")
      .empty()
      .append(Mustache.to_html(resultList, {results: qs}))

      //console.log('Mustache.to_html appended');
      addNewLabel(qs);
      completeDropdown(qs);
  }

  var renderResultListMatches = function (qs) {
    //console.log('renderResultListMatches called');
    $("#result-list-container")
      .empty()
      .append(Mustache.to_html(resultListMatches, {results: qs}))

    //console.log('Mustache.to_html appended');

    addNewLabel(qs);
    completeDropdown(qs);

    //console.log('completeDropdown complete');
  }

  //parsing json, used to show back the results on the screen
  //The map() method creates a new array with the results of calling a provided function on every element in this array.
  window.questions = JSON.parse(products).features.map(function (raw) {
    return {
      id: raw.properties.product_id,
      title: raw.properties.title,
      interactive: raw.properties.interactive,
      date_published: raw.properties.date_published,
      region_id: raw.properties.region_id,
      region_title: raw.properties.region_title,
      description: raw.properties.description,
      baseurl: raw.properties.baseurl,
      product_pdf: raw.properties.product_pdf,
      product_jpg: raw.properties.product_jpg,
      product_jpg_pg2: raw.properties.product_jpg_pg2,
      product_jpg_pg3: raw.properties.product_jpg_pg3,
      product_jpg_pg4: raw.properties.product_jpg_pg4,
      product_jpg_pg5: raw.properties.product_jpg_pg5,
      product_jpg_pg6: raw.properties.product_jpg_pg6,
      product_jpg_pg7: raw.properties.product_jpg_pg7,
      thumbnail_150: raw.properties.thumbnail_150,
      thumbnail_300: raw.properties.thumbnail_300,
      keywords: raw.properties.keywords,
      tweet: encodeURIComponent(raw.properties.tweet)
    }
  })

  /*console.log('questions array: ');
  console.log(questions);*/

  /*console.log('total products');
  console.log(ObjectLength(questions));*/

  //after JSON is parsed the code below populates the product filter dropdown with the counts for each region
  $('#product-count').prepend(ObjectLength(questions) + ' ');

  $( ".dropdown-menu li" ).each(function( index ) {
    //console.log( index + ": " + $( this ).text() );
    var param = $(this).find('a').attr("href").replace("#","");
    /*console.log('found filtered-count: ');
    console.log($(this).find('#filtered-count'));*/

    if (param == 'all') {
      $('#product-count').text(ObjectLength(questions) + ' total products');
      $(this).find('#filtered-count').text(' (' + ObjectLength(questions) + ')');
    } else {

      //console.log('filtered objects1');
      //need to wait for deferred object (questions) to complete?
      var filterObjectsNum = filterObjects(questions,param);
      /*console.log('filterObjectsNum1: ');
      console.log(filterObjectsNum);*/

      /*console.log('ObjectLength count1: ');
      console.log(ObjectLength(filterObjects(questions,param)));*/

      $(this).find('#filtered-count').text(' (' + ObjectLength(filterObjects(questions,param)) + ')');
    }
    
  });


  renderResultList(questions);

  $('a.all').bind('click', function () {
    renderResultList(questions)
    $('input').val('')
  })

  var debounce = function (fn) {
    var timeout
    return function () {
      var args = Array.prototype.slice.call(arguments),
          ctx = this

      clearTimeout(timeout)
      timeout = setTimeout(function () {
        fn.apply(ctx, args)
      }, 100)
    }
  }

    var options = {
      //include: ["score"],
      include: ["matches"],
      shouldSort: true,
      tokenize: true,
      threshold: 0.15,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        "id",
        "region_id",
        "region_title",
        "title",
        "description",
        "keywords"
      ]
    }


  var searchQuery = function (query) {

      if (query < 2) {
      //var config = $('#configuration').val();
      //config.trim();
      //console.log('this val less than 2');
      var json_config = null;
    }

    //json_config = { fields: { title: {boost: 2}, description: {boost: 2}, keywords: {boost: 2}, region_id: {boost: 1}, region_title: {boost: 1}, id: {boost: 1} }, boolean: "AND" };

    //var query = $(this).val()
    var results = null;

    var filter = 'all';

    /*console.log('what is the query?');
    console.log(query);*/

    if (json_config == null) {
        /*console.log("producing results");

        console.log('what is #filter_param1');
        console.log($('#filter_param').val());

        console.log('questions: ');
        console.log(questions);

        console.log('options: ');
        console.log(options);*/

        filter = $('#filter_param').val();

        var fuse = new Fuse(questions, options); // "list" is the item array
        var results = fuse.search(query);

        /*console.log('test search1: ');
        console.log(results);*/

        /*
        results = idx.search(query);
        results = idx.search(query).map(function (result) {
            return questions.filter(function (q) { 
              //return q.id === parseInt(result.ref, 10) 
              return q.id === result.ref 
            })[0]
        })
        */

    } else {

          /*console.log("not producing results");
          console.log("print data2");
          console.log(data2);
          console.log('what is #filter_param');
          console.log($('#filter_param').val());*/
          
          filter =$('#filter_param').val();

          var fuse = new Fuse(questions, options); // "list" is the item array
          var results = fuse.search(query)

          /*console.log('test search2: ');
          console.log(results);*/

          /*
          results = idx.search(query, json_config).map(function (result) {
            return questions.filter(function (q) { 
              return q.id === result.ref 
            })[0]
        })
        */

    }

    /*console.log('what are the results?');
    console.log(results);

    console.log('count before filter');
    console.log(ObjectLength(results));*/

    if (filter != 'all') {
      results = filterObjects(results,filter);
    }

    /*console.log('count after filter');
    console.log(ObjectLength(results));*/

    if ( ObjectLength(results) > 1 ) {
      $('#product-count').html(ObjectLength(results) + ' results');
    } else if ( ObjectLength(results) == 1 ) {
      $('#product-count').html(ObjectLength(results) + ' result');
    } else if ( ObjectLength(results) == 0 && query == 0) {
      if (filter != 'all') {
        $('#product-count').html(ObjectLength(filterObjects(questions,filter)) + ' total products');
      } else {
        $('#product-count').html(ObjectLength(questions) + ' total products');
      }
    } else {
      $('#product-count').html('');
    }
    
    //haven't finished this, having problems with generating a match index for keywords
    //resultHighlighter(results);

    if (query === '') {
        //console.log("no characters");
        renderResultList(questions);
    } else {
      renderResultListMatches(results);
    }

  }

  //debounce limits the rate at which a function can fire.
  $('input').bind('keyup', debounce(function () {
    console.log('keyup called');
    console.log('this val');
    console.log($(this).val());

    searchQuery($(this).val());

  }))


})

