
  var btnSave;
  var btnLoad;
  var btnAdd;
  var txtData;
  var txtLoadData;
  var groups;
  var items;
  var timeline;
  
  /**
   * Get URL parameter
   * http://www.netlobo.com/url_query_string_javascript.html
   */
  var count = 10;


  function saveData() {
    // get the data from the DataSet
    // Note that we specify the output type of the fields start and end
    // as ISODate, which is safely serializable. Other serializable types
    // are Number (unix timestamp) or ASPDate.
    //
    // Alternatively, it is possible to configure the DataSet to convert
    // the output automatically to ISODates like:
    //
    //   var options = {
    //     type: {start: 'ISODate', end: 'ISODate'}
    //   };
    //   var items = new vis.DataSet(options);
    //   // now items.get() will automatically convert start and end to ISO dates.
    //
    
    
    var data = items.get({
      type: {
        start: 'ISODate',
        end: 'ISODate'
      }
    });
    


    // serialize the data and put it in the textarea
    var txt = JSON.stringify(data, null, 2);
    
    txtData.value = txt;
    
  }
  
  function loadData () {
    // get and deserialize the data
    var text = txtLoadData.innerHTML;
    var data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        return false;
    }
  
      // update the data in the DataSet
      //
      // Note: when retrieving updated data from a server instead of a complete
      // new set of data, one can simply update the existing data like:
      //
      //   items.update(data);
      //
      // Existing items will then be updated, and new items will be added.
      items.clear();
      items.add(data);
  
      // adjust the timeline window such that we see the loaded data
      timeline.fit();
    
  }
  
  function addGroup(){
  
    var l = groups.getIds().length;
    var g = [{id:1,content:'Truck'}];
    g[0].id =l+1;
    
    
    groups.add( g);
      timeline.setGroups(groups);
  }
  
    
  function allowDrop(ev) {
      ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  // -----------------------
  
  onload = function(e){

  
    btnSave = document.getElementById('save');
    btnLoad = document.getElementById('load');
    btnAdd = document.getElementById('add');
    txtData = document.getElementById('project_data');
    txtLoadData = document.getElementById('loaded_data');
  
  
  
    // create groups
    groups = new vis.DataSet([
      {id: 1, content: 'Truck&nbsp;1'},
      {id: 2, content: 'Truck&nbsp;2'},
      {id: 3, content: 'Truck&nbsp;3'},
      {id: 4, content: 'Truck&nbsp;4'}
    ]);
  
    // create items
    items = new vis.DataSet();
  
    var order = 1;
    var truck = 1;
    for (var j = 0; j < 4; j++) {
      var date = new Date();
      for (var i = 0; i < count/4; i++) {
        date.setSeconds(date.getSeconds() +  10 * (Math.random() < 0.2));
        var start = new Date(date);
  
        date.setSeconds(date.getSeconds() + 2 + Math.floor(Math.random()*4));
        var end = new Date(date);
  
        items.add({
          id: order,
          group: truck,
          start: start,
          end: end,
          content: 'Order ' + order
        });
  
        order++;
      }
      truck++;
    }
  
    // specify options
    var options = {
      showCurrentTime: false,
      showCustomTime: true,
      type:'range',
      stack: false,
      start: new Date(),
      end: new Date(60*1000 + (new Date()).valueOf()),
      editable: true,
      margin: {
        item: 10, // minimal margin between items
        axis: 5   // minimal margin between items and the axis
      },
      orientation: 'top',
      zoomMax:1000000000,
      
  
      onUpdate: function (item, callback) {
        item.content = prompt('Edit items text:', item.content);
        if (item.content != null) {
          callback(item); // send back adjusted item
        }
        else {
          callback(null); // cancel updating the item
        }
      },
  
      onRemove: function (item, callback) {
        if (confirm('Remove item ' + item.content + '?')) {
          callback(item); // confirm deletion
        }
        else {
          callback(null); // cancel deletion
        }
      }
      

  };

  
  // create a Timeline
  var container = document.getElementById('mytimeline');
  timeline = new vis.Timeline(container, null, options);
  timeline.setGroups(groups);
  timeline.setItems(items);
  timeline.setCustomTime(0);

  loadData();
  
  
  btnSave.onclick = saveData;
  btnLoad.onclick = loadData;
  btnAdd.onclick = addGroup;
  
  
  
  };

  