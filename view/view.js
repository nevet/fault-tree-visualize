(function (view, $, undefined) {
  view.nodeName = "fault_node"
  view.leafName = "fault_leaf"
  view.navName = "item_nav"

  var body = $("body")
  var canvas = $("#canvas")
  var itemNav = $("#canvas ."+view.navName)

  view.updateTree = function(data, needNav) {
    removeOld();

    if (needNav) {
      itemNav.addClass("clickable");
    } else {
      itemNav.removeClass("clickable");
    }

    $.each(data, function(i, val) {
      content = val["content"];
      node = $("<li></li>");

      if (val["hasNext"]) {
        node.addClass(view.nodeName);
        node.addClass("clickable");
      } else {
        node.addClass(view.leafName);
      }

      node.html(content);
      node.appendTo(canvas);
    });
  }

  function removeOld() {
    $("#canvas li").remove("."+view.nodeName + ",." + view.leafName)
  }
} (window.view = window.view || {}, jQuery));