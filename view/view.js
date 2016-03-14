(function (view, $, undefined) {
  view.nodeName = "fault_node"
  view.leafName = "fault_leaf"
  view.navName = "item_nav"

  view.debug

  var body = $("body")

  view.updateTree = function(data, needNav) {
    var frontCanvas = $(".front_buffer .canvas");
    var backCanvas = $(".back_buffer .canvas");

    var itemNav = $(backCanvas.children(".item_nav"));
    itemNav.removeClass("clickable");
    if (needNav) {
      itemNav.addClass("clickable");
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
      node.appendTo(backCanvas);
    });

    addNew(backCanvas);
    removeOld(frontCanvas);
  }

  function addNew(canvas) {
    canvas.parent("div").removeClass("back_buffer");
    canvas.parent("div").addClass("front_buffer");
  }

  function clearBuffer(canvas) {
    canvas.children("li").remove("."+view.nodeName + ",." + view.leafName);
  }

  function removeOld(canvas) {
    clearBuffer(canvas);

    canvas.parent("div").removeClass("first_time")
    canvas.parent("div").removeClass("front_buffer")
    canvas.parent("div").addClass("back_buffer")
  }
} (window.view = window.view || {}, jQuery));