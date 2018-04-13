window.addEventListener('load', function(){
  var loader = new cvjs.utils.ImageLoader();
  var radios = document.querySelectorAll('input[type=radio][name="image"]');

  loader.load('../assets/textures/iu01.jpg').subscribe(run);
  
  function changeHandler(event) {
    loader.load('../assets/textures/' + this.value).subscribe(run);
  }

  Array.prototype.forEach.call(radios, function(radio) {
    radio.addEventListener('change', changeHandler);
  });

  function run(image) {
    var width = 300;
    var height = image.height * (width / image.width);

    var originalCanvas = document.querySelector('#original');
    var originalCtx = originalCanvas.getContext('2d');
    originalCanvas.width = width;
    originalCanvas.height = height;

    var averagingCanvas = document.querySelector('#averaging');
    var averagingCtx = averagingCanvas.getContext('2d');
    averagingCanvas.width = width;
    averagingCanvas.height = height;

    originalCtx.drawImage(image, 0, 0, width, height);
    averagingCtx.drawImage(cvjs.filtering.averaging.averaging(image, 9), 0, 0, width, height);
  }
});