(function (controller, $, undefined) {
  controller.faultTree = {}

  var stack = []

  function loadData() {
    $.getJSON("data/mock.json", function (data) {
      controller.faultTree = data
      view.updateTree(getNextLayer(""), false);
    }).fail(function(jqxhr, status, error) {
      var err = status + ", " + error;
      console.log("Request Failed: " + err);
    })
  }

  function getCurrentObj() {
    var obj = controller.faultTree
    $.each(stack, function(i, val) {
      obj = obj[stack[i]]
    });

    return obj
  }

  function getNextLayer(key) {
    var nextLayer = [];
    var curObj = getCurrentObj();
    var nextObj = curObj;

    if (key) {
      nextObj = curObj[key];
      stack.push(key);
    }

    $.each(nextObj, function(i, val) {
      if (i == "desp") {
        nextLayer.push({"content": val, "hasNext": false});
      } else {
        nextLayer.push({"content": i, "hasNext": true});
      }
    });

    return nextLayer;
  }

  $(function () {
    loadData();
  });

  $("ul").on("click", "li."+view.nodeName, function(event) {
    clicked = $(event.target).html();
    view.updateTree(getNextLayer(clicked), true);

    event.preventDefault();
  });

  $("ul").on("click", "li."+view.navName, function(event) {
    stack.pop()
    view.updateTree(getNextLayer(stack.pop()), stack.length >= 1);
    event.preventDefault();
  });
} (window.controller = window.controller || {}, jQuery));