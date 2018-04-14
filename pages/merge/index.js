window.addEventListener('load', function(){
  var loader = new cvjs.utils.ImageLoader();
  var image1;
  var image2;

  loader.load('../assets/textures/iu01.jpg').subscribe(load1);
  loader.load('../assets/textures/iu02.jpg').subscribe(load2);

  function load1(image) {
    image1 = image;
    run();
  }

  function load2(image) {
    image2 = image;
    run();
  }

  function run() {
    if (!image1 || !image2) {
      return;
    }

    var width = 300;
    var height = image1.height * (width / image1.width);

    var original1Canvas = document.querySelector('#original_iu01');
    var original1Ctx = original1Canvas.getContext('2d');
    original1Canvas.width = width;
    original1Canvas.height = height;

    var original2Canvas = document.querySelector('#original_iu02');
    var original2Ctx = original2Canvas.getContext('2d');
    original2Canvas.width = width;
    original2Canvas.height = height;

    var remainderCanvas = document.querySelector('#merge_remainder');
    var remainderCtx = remainderCanvas.getContext('2d');
    remainderCanvas.width = width;
    remainderCanvas.height = height;

    var minCanvas = document.querySelector('#merge_min');
    var minCtx = minCanvas.getContext('2d');
    minCanvas.width = width;
    minCanvas.height = height;

    var weightCanvas = document.querySelector('#merge_weight');
    var weightCtx = weightCanvas.getContext('2d');
    weightCanvas.width = width;
    weightCanvas.height = height;

    var weightElement = document.querySelector('#weight');
    weightElement.addEventListener('input', function(e) {
      var value = parseInt(e.target.value, 10) ;
      var weight1 = value / 100;
      var weight2 = (100 - value) / 100;
      weightCtx.drawImage(cvjs.merge.merge(image1, image2, cvjs.merge.MERGE_TYPE.WEIGHT, weight1, weight2), 0, 0, width, height);
    });

    original1Ctx.drawImage(image1, 0, 0, width, height);
    original2Ctx.drawImage(image2, 0, 0, width, height);
    remainderCtx.drawImage(cvjs.merge.merge(image1, image2, cvjs.merge.MERGE_TYPE.REMAINDER), 0, 0, width, height);
    minCtx.drawImage(cvjs.merge.merge(image1, image2, cvjs.merge.MERGE_TYPE.MIN), 0, 0, width, height);
    weightCtx.drawImage(cvjs.merge.merge(image1, image2, cvjs.merge.MERGE_TYPE.WEIGHT, 0, 1), 0, 0, width, height);
  }
});