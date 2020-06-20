var file = document.getElementById('customBgImage');
var canvas = document.getElementById('frame');
var ctx = canvas.getContext('2d');
var bgImg;
var canvasWidth = 1920;
var canvasHeight = 1080;

function loadLocalImage(e) {
    var fileData = e.target.files[0];
    if(!fileData.type.match('image.*')) { //iamge以外のファイルが指定された時
        alert('画像ファイルを指定してください');
        return;
    }

	document.querySelector('#customBgImage + label .form-file-text').innerText = fileData.name;

	console.log(fileData.name + " loaded.");

    var reader = new FileReader();
    reader.onload = function() {
        bgImg = reader.result;
        draw();
    }
    reader.readAsDataURL(fileData);
}

file.addEventListener('change', loadLocalImage, false);

function draw(imgSrc) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    var img = new Image();
    img.src = bgImg;
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));

        var data = canvas.toDataURL();

    	var thumbnail = document.getElementById('output');
        thumbnail.setAttribute('src',data);
    }
}