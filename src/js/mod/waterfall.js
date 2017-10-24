var Waterfall = (function () {
  var $cnt, $items

  function render($c) {
    $cnt = $c
    $items = $cnt.children()

    var nodeWidth = $items.outerWidth(true),
      colNum = parseInt($(window).width() / nodeWidth),
      colSumHeight = []

    for (var i = 0; i < colNum; i++) {
      colSumHeight.push(0)
    }

    $items.each(function () {
      var $cur = $(this)

      //找出当前数组中最小的值，及索引
      var idx = 0,
        minHeight = colSumHeight[0]
      for (let i = 0; i < colSumHeight.length; i++) {
        if (minHeight > colSumHeight[i]) {
          minHeight = colSumHeight[i]
          idx = i
        }
      }
      //设置当前note的位置idx
      $cur.css({
        left: nodeWidth * idx,
        top: minHeight
      })
      //改变数组中idx的高度
      colSumHeight[idx] += $cur.outerHeight(true)
    })
  }

  $(window).on('resize', function () {
    render($cnt)
  })

  return {
    init: render
  }
})();

module.exports = Waterfall