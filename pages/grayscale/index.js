window.addEventListener('load', function(){
  var loader = new cvjs.utils.ImageLoader();
  var image = loader.load('../assets/textures/iu01.jpg', run);
  var radios = document.querySelectorAll('input[type=radio][name="image"]');

  function changeHandler(event) {
    image = loader.load('../assets/textures/' + this.value, run);
  }

  Array.prototype.forEach.call(radios, function(radio) {
    radio.addEventListener('change', changeHandler);
  });

  function run() {
    var width = 300;
    var height = image.height * (width / image.width);

    var originalCanvas = document.querySelector('#original');
    var originalCtx = originalCanvas.getContext('2d');
    originalCanvas.width = width;
    originalCanvas.height = height;

    var averageCanvas = document.querySelector('#average');
    var averageCtx = averageCanvas.getContext('2d');
    averageCanvas.width = width;
    averageCanvas.height = height;

    var yuvCanvas = document.querySelector('#yuv');
    var yuvCtx = yuvCanvas.getContext('2d');
    yuvCanvas.width = width;
    yuvCanvas.height = height;

    var hslCanvas = document.querySelector('#hsl');
    var hslCtx = hslCanvas.getContext('2d');
    hslCanvas.width = width;
    hslCanvas.height = height;

    var hsvCanvas = document.querySelector('#hsv');
    var hsvCtx = hsvCanvas.getContext('2d');
    hsvCanvas.width = width;
    hsvCanvas.height = height;

    var hsiCanvas = document.querySelector('#hsi');
    var hsiCtx = hsiCanvas.getContext('2d');
    hsiCanvas.width = width;
    hsiCanvas.height = height;

    originalCtx.drawImage(image, 0, 0, width, height);
    averageCtx.drawImage(cvjs.grayscale.grayscale(image, cvjs.grayscale.GRAYSCALE_TYPE.AVERAGE), 0, 0, width, height);
    yuvCtx.drawImage(cvjs.grayscale.grayscale(image, cvjs.grayscale.GRAYSCALE_TYPE.YUV), 0, 0, width, height);
    hslCtx.drawImage(cvjs.grayscale.grayscale(image, cvjs.grayscale.GRAYSCALE_TYPE.HSL), 0, 0, width, height);
    hsvCtx.drawImage(cvjs.grayscale.grayscale(image, cvjs.grayscale.GRAYSCALE_TYPE.HSV), 0, 0, width, height);
    hsiCtx.drawImage(cvjs.grayscale.grayscale(image, cvjs.grayscale.GRAYSCALE_TYPE.HSI), 0, 0, width, height);
  }
});