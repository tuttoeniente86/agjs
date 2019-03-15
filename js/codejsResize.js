$(document).ready(function() {
    $('#imageFile').change(function(evt) {
	//carica img temporanea in pagina che verrà utilizzata da ridimensionare
        var files = evt.target.files;
        var file = files[0];

        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview').src = e.target.result;
				document.getElementById('preview').style.display = 'none';
            };
            reader.readAsDataURL(file);			
        }
    });
});

function ResizeImage() {
	var el = document.getElementById("coloreLogo");
	var imgLogo = el.options[el.selectedIndex].value;
	var imgSrc;
	
	if('' != imgLogo){		
		if("N" == imgLogo){
			imgSrc = "https://drive.google.com/uc?export=view&id=1dl_xURTGLm2gsuIg8az9-0RCgUZo984X";
		}else if("B" == imgLogo){
			imgSrc = "https://drive.google.com/uc?export=view&id=1uAArxOGkSDLl84IXh-VsF5-Q6uHSFWRp";
		}else if("G" == imgLogo){
			imgSrc = "https://drive.google.com/uc?export=view&id=18oUlztHRw9hkGb4zqpZSyduY7fiuBD8l";
		}	
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imageFile').files;
        var file = filesToUploads[0];		 
        if (file) {
						
            var reader = new FileReader();
            // Set the image once loaded into file reader
            reader.onload = function(e) {			

                var img = document.createElement("img");
                img.src = e.target.result;
				
				var img2 = loadImage(imgSrc, e);
				//var imgLogo = document.createElement("img");
				//imgLogo.src = imgSrc;
				
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img2, 0, 0);

				//dimensioni massime immagine
                var MAX_WIDTH = 100;
                var MAX_HEIGHT = 100;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }								
				
                canvas.width = width;
                canvas.height = height;
				
                var ctx = canvas.getContext("2d");
				
                ctx.drawImage(img, 0, 0, width, height);
				
				ctx.globalAlpha = 0.5;
				
				
				var width2 = img2.width;
                var height2 = img2.height;

                if (width2 > height2) {
                    if (width2 > MAX_WIDTH) {
                        height2 *= MAX_WIDTH / width2;
                        width2 = MAX_WIDTH;
                    }
                } else {
                    if (height2 > MAX_HEIGHT) {
                        width2 *= MAX_HEIGHT / height2;
                        height2 = MAX_HEIGHT;
                    }
                }
        
				ctx.drawImage(img2, 320, 320, 100, 100);						
				
				
                
				
				//dataurl = watermarkedDataURL(canvas, 'prova');
			//	dataurl = watermarkedDataURLIMG(canvas, logoColor);
				dataurl = canvas.toDataURL(file.type);
                document.getElementById('output').src = dataurl;
				
				
				
				//creo download
				var link = document.createElement('a');
				var date = new Date();
				var data = 'imgAG-'.concat(date.getDate(),'_',date.getMonth()+1,'_',date.getFullYear(),'-',date.getHours(),':',date.getMinutes());				
				var linkdwn = data.concat('.png');
				link.download = linkdwn;
				link.href = dataurl;
				link.click();
				
            }
            reader.readAsDataURL(file);
        }

    } else {
        alert('MOIRA QUESTA OPERAZIONE NON  VIENE SUPPORTATA DA QUESTO BROWSER, UTILIZZA LE ULTIME VERSIONI DI CHROME O FIREFOX');
    }
	} else {
        alert('SELEZIONA UN COLORE DEL LOGO');
    }
}


function watermarkedDataURL(canvas,text){
  var tempCanvas=document.createElement('canvas');
  var tempCtx=tempCanvas.getContext('2d');
  var cw,ch;
  cw=tempCanvas.width=canvas.width;
  ch=tempCanvas.height=canvas.height;
  tempCtx.drawImage(canvas,0,0);
  tempCtx.font="24px verdana";
  var textWidth=tempCtx.measureText(text).width;
  tempCtx.globalAlpha=.50;
  tempCtx.fillStyle='white'
  tempCtx.fillText(text,cw-textWidth-10,ch-20);
  tempCtx.fillStyle='black'
  tempCtx.fillText(text,cw-textWidth-10+2,ch-20+2);

  return(tempCanvas.toDataURL());
}

function watermarkedDataURLIMG(canvas,coloreLogo){
	var logoSrc;
	if("N" == coloreLogo){
		logoSrc = "./img/Logo_nero.png";
	}else if("B" == coloreLogo){
		logoSrc = "./img/Logo_bianco.png";
	}else if("G" == coloreLogo){
		logoSrc = "./img/Logo_grigio.png";
	}
	
	var tempCanvas=document.createElement('canvas');
	var tempCtx=tempCanvas.getContext('2d');
	var cw,ch;
	cw=tempCanvas.width=canvas.width;
	ch=tempCanvas.height=canvas.height;
	tempCtx.drawImage(canvas,0,0);
	tempCtx.globalAlpha=.50;
	var imageObj2 = new Image();  
	imageObj2.src = logoSrc;
	tempCtx.drawImage(imageObj2, 10, 10, 50,50);  
	
  

  

  return(tempCanvas.toDataURL());
}

function loadImage(src, onload) {
    // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
    var img = new Image();

    img.onload = onload;
    img.src = src;

    return img;
}

