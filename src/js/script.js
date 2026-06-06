var numberOfFrequencies = 1;
var inputColor1 = "#5603fc";
var inputColor2 = "#fc0303";
var glow = true;
var glowStrength = 10;
var textColor = "#FFFFFF";
var amplitude = 300;
var spectrumScale = 1;
var spectrumX = 0.5;
var sprcctrumY = 0.5;
var opacity = 1;

var textX = 0.5;
var textY = 0.5;

var imgName ="";
var useImg = false;

function livelyAudioListener(audioArray) {
    drawSpectrum(audioArray);

}


function livelyPropertyListener(name, val)
{
    // or switch-case...
    if(name =="color1"){
        inputColor1 = hexToRGB(val);
    }
    else if(name =="color2"){
      inputColor2 = hexToRGB(val);
    }
    else if(name == "background"){
        document.body.style.backgroundColor = val;
    }
    else if(name == "glow"){
        glow = val;
    }
    else if(name == "glowStrength"){
        glowStrength = val;
    }
    else if(name == "textColor"){
        textColor = val;
        document.getElementById("audioData").style.color = val;
    }
    else if(name == "amplitude"){
        amplitude = val;
    }
    else if(name == "spectrumScale"){
        spectrumScale = Number(val)/100;
    }
    else if( name == "spectrumX"){
        spectrumX = val/100;
    }
    else if( name == "spectrumY"){
        spectrumY = val/100;
    }
    else if(name == "textScale"){
        document.getElementById("audioData").style.fontSize = 50 * (val/100) +"px";
        document.getElementById("audioData").style.left = window.innerWidth * (textX)- (document.getElementById("audioData").clientWidth + 1)/2 +"px";
        document.getElementById("audioData").style.top = window.innerHeight * (textY) -(document.getElementById("audioData").clientHeight + 1)/2 +"px";
    }
    else if( name == "textX"){
        document.getElementById("audioData").style.left = window.innerWidth * (val/100)- (document.getElementById("audioData").clientWidth + 1)/2 +"px";
        textX = val/100;
    }
    else if( name == "textY"){
        document.getElementById("audioData").style.top = window.innerHeight * (val/100) -(document.getElementById("audioData").clientHeight + 1)/2 +"px";
        textY = val/100;
    }
    else if(name == "useImg"){
        if(val){
            document.getElementById("backgroundImg").style.display = "inline";
        }
        else{
            document.getElementById("backgroundImg").style.display = "none";
        }
    }
    else if(name == "imgPath"){
        imgName = val;
        document.getElementById("backgroundImg").setAttribute("src", "/"+val);
    }
    else if(name == "opacity"){
        opacity = val/100;
    }
}


function livelyCurrentTrack(audioData){
    let audioElement = document.getElementById("audioData");
    audioData.style.color = textColor
    audioElement.innerHTML = audioData;
}


function log(input) {
    let log = document.getElementById("console");
    log.innerHTML = input;
}




function drawSpectrum(audioArray) {

    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    let Wwidth = Math.round(window.innerWidth * spectrumScale);
    let Wheight = Math.round((window.innerHeight/2+amplitude) *spectrumScale);
    c.setAttribute('width', Wwidth);
    c.setAttribute('height', Wheight);

    c.style.left = Math.round(window.innerWidth*spectrumX-c.width/2)+"px";
    c.style.top = Math.round(window.innerHeight*spectrumY-c.height)+"px";
    

    ctx.clearRect(0, 0, c.width, c.height);
    if(glow){
        ctx.shadowBlur = glowStrength;
    }
    else{
        ctx.shadowBlur = 0;
    }

    ctx.globalAlpha = opacity;

    let width = c.width;
    let height = c.height;
    let offset = Math.round(0 * width);
    let numberOfSamples = 128;
    let spacing = Math.round(3*spectrumScale);
    let barwidth = Math.floor((width - 2 * offset -(numberOfFrequencies - 1) * spacing)/numberOfFrequencies);

    let a = 0;

    for(let i = 0; i < numberOfSamples; i++){
        if(i == 0){
            ctx.fillStyle = interpolateColor(inputColor1,inputColor2,a/numberOfFrequencies);
            ctx.shadowColor = interpolateColor(inputColor1,inputColor2,a/numberOfFrequencies);
            ctx.fillRect(offset+a*(barwidth+spacing), height - 50 - Math.round((amplitude*spectrumScale)*Math.min(1,audioArray[i])), barwidth, Math.round((amplitude*spectrumScale)*Math.min(1,audioArray[i])));
            a++
        }
        else{
            if(audioArray[i] != audioArray[i-1]){
                ctx.fillStyle = interpolateColor(inputColor1,inputColor2,a/numberOfFrequencies);
                ctx.shadowColor = interpolateColor(inputColor1,inputColor2,a/numberOfFrequencies);
                ctx.fillRect(offset+a*(barwidth+spacing), height - 50 - Math.round((amplitude*spectrumScale)*Math.min(1,audioArray[i])), barwidth, Math.round((amplitude*spectrumScale)*Math.min(1,audioArray[i])));
                a++
            }
        }
    }

    numberOfFrequencies = a;

}


function interpolateColor(c0, c1, f){
    let color1 = c0.split(",");
    let color2 = c1.split(",");

    
    

    let r = Math.round(Number(color1[0])+ (Number(color2[0])-Number(color1[0]))*f);
    let g = Math.round(Number(color1[1])+ (Number(color2[1])-Number(color1[1]))*f);
    let b = Math.round(Number(color1[2])+ (Number(color2[2])-Number(color1[2]))*f);

    
    
    

    let rHex = Number(r).toString(16);
    if (rHex.length < 2) {
        rHex = "0" + rHex;
    }

    let gHex = Number(g).toString(16);
    if (gHex.length < 2) {
        gHex = "0" + gHex;
    }

    let bHex = Number(b).toString(16);
    if (bHex.length < 2) {
        bHex = "0" + bHex;
    }

    let out = "#"+rHex+gHex+bHex;
    
    return out;
}

function hexToRGB(hex){
    let r = parseInt(hex.slice(1,3),16);
    let g = parseInt(hex.slice(3,5),16);
    let b = parseInt(hex.slice(5,7),16);

    return r+","+g+","+b;
}