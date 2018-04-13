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

    var redSingleCanvas = document.querySelector('#red_single');
    var redSingleCtx = redSingleCanvas.getContext('2d');
    redSingleCanvas.width = width;
    redSingleCanvas.height = height;

    var redGrayScaleCanvas = document.querySelector('#red_grayscale');
    var redGrayScaleCtx = redGrayScaleCanvas.getContext('2d');
    redGrayScaleCanvas.width = width;
    redGrayScaleCanvas.height = height;

    var greenSingleCanvas = document.querySelector('#green_single');
    var greenSingleCtx = greenSingleCanvas.getContext('2d');
    greenSingleCanvas.width = width;
    greenSingleCanvas.height = height;

    var greenGrayScaleCanvas = document.querySelector('#green_grayscale');
    var greenGrayScaleCtx = greenGrayScaleCanvas.getContext('2d');
    greenGrayScaleCanvas.width = width;
    greenGrayScaleCanvas.height = height;

    var blueSingleCanvas = document.querySelector('#blue_single');
    var blueSingleCtx = blueSingleCanvas.getContext('2d');
    blueSingleCanvas.width = width;
    blueSingleCanvas.height = height;

    var blueGrayScaleCanvas = document.querySelector('#blue_grayscale');
    var blueGrayScaleCtx = blueGrayScaleCanvas.getContext('2d');
    blueGrayScaleCanvas.width = width;
    blueGrayScaleCanvas.height = height;

    originalCtx.drawImage(image, 0, 0, width, height);
    redSingleCtx.drawImage(cvjs.channel.channel(image, cvjs.channel.CHANNEL_TYPE.RED, cvjs.channel.CHANNEL_PRESENT_FLAG.SINGLE), 0, 0, width, height);
    redGrayScaleCtx.drawImage(cvjs.channel.channel(image, cvjs.channel.CHANNEL_TYPE.RED, cvjs.channel.CHANNEL_PRESENT_FLAG.GRAYSCALE), 0, 0, width, height);
    greenSingleCtx.drawImage(cvjs.channel.channel(image, cvjs.channel.CHANNEL_TYPE.GREEN, cvjs.channel.CHANNEL_PRESENT_FLAG.SINGLE), 0, 0, width, height);
    greenGrayScaleCtx.drawImage(cvjs.channel.channel(image, cvjs.channel.CHANNEL_TYPE.GREEN, cvjs.channel.CHANNEL_PRESENT_FLAG.GRAYSCALE), 0, 0, width, height);
    blueSingleCtx.drawImage(cvjs.channel.channel(image, cvjs.channel.CHANNEL_TYPE.BLUE, cvjs.channel.CHANNEL_PRESENT_FLAG.SINGLE), 0, 0, width, height);
    blueGrayScaleCtx.drawImage(cvjs.channel.channel(image, cvjs.channel.CHANNEL_TYPE.BLUE, cvjs.channel.CHANNEL_PRESENT_FLAG.GRAYSCALE), 0, 0, width, height);
  }
});