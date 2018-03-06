// ---------------------------------------
// APP CONSTANT
// ---------------------------------------
const CANVAS = {WIDTH: 800, HEIGHT:600};
const ALPHABET = {MIN:161, MAX:500};
// const ALPHABET = {MIN:97, MAX:126};
const LENGTHCHARSERIES = {MIN:8, MAX:25};
const DEPTH = {MIN:1, MAX:5};
const DEPTHCOLOR = ["#2EE57B","#0dcb5d","#1AB25A","#129C4C","#0D7B3B"];

// ---------------------------------------
// APP CREATION
// ---------------------------------------
var app = new PIXI.Application(CANVAS.WIDTH, CANVAS.HEIGHT, {backgroundColor: 0x000000});
document.body.appendChild(app.view);

// ---------------------------------------
var textStyle = {
  fontFamily: "Consolas",
  fontSize: 13,
  fontWeight: "normal",
  fill: ["#0dcb5d"], // gradient
  /*stroke: "#4a1850",
  strokeThickness: 1,
  dropShadow: true,
  dropShadowColor: "#0dcb5d",
  dropShadowBlur: 4,
  dropShadowAngle: 0,
  dropShadowDistance: 6*/
};

textStyle.fill = DEPTHCOLOR[0];
var styleDepth1 = new PIXI.TextStyle(textStyle);
textStyle.fill = DEPTHCOLOR[1];
var styleDepth2 = new PIXI.TextStyle(textStyle);
textStyle.fill = DEPTHCOLOR[2];
var styleDepth3 = new PIXI.TextStyle(textStyle);
textStyle.fill = DEPTHCOLOR[3];
var styleDepth4 = new PIXI.TextStyle(textStyle);
textStyle.fill = DEPTHCOLOR[4];
var styleDepth5 = new PIXI.TextStyle(textStyle);

var textStyleSettings = [styleDepth1, styleDepth2, styleDepth3, styleDepth4, styleDepth5];


// var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
// richText.x = 30;
// richText.y = 180;
// app.stage.addChild(richText);

// document.getElementById('btnMove').addEventListener('click', function() {
//     // alert('test button');    
//     richText.x = 200;
//     richText.y = 300;
// });





class CharList {

    // position.x
    // position.y
    // charList[]
    // pixiTextList[]
    // depth


    constructor(x = 0) {
        this.position = {x: x, y:0},
        this.charList = new Array();
        this.pixiTextList = new Array();

        this.generateRandomPosition();
        this.generateRandomDepth();
        this.generateRandomCharList();
        this.generatePixiTextList();
    }

    /**
     * Generate Random X Y position from canvas dimensions
     */
    generateRandomPosition() {
        const x = (this.x !== 0) ? this.x : getRandomInt(0, CANVAS.WIDTH);
        const y = 1; //getRandomInt(0, CANVAS.HEIGHT);
        this.position = {x:x, y:y};
    }

    /**
     * Generate Random depth 
     */
    generateRandomDepth() {
        this.depth = getRandomInt(DEPTH.MIN, DEPTH.MAX);
    }

    /**
     * Adds a char to list.
     *
     * @param      {integer}  charCode  The character code
     */
    addChartoList(charCode) {
        this.charList.push(charCode);
    }

    /**
     * Generate a random char number list
     */
    generateRandomCharList() {
      const newRandomMaxLength = getRandomInt(LENGTHCHARSERIES.MIN, LENGTHCHARSERIES.MAX);
        for(let i=0; i<newRandomMaxLength; i++) {
            const newRandomCharToAdd = String.fromCharCode(getRandomInt(ALPHABET.MIN, ALPHABET.MAX));
            this.addChartoList(newRandomCharToAdd);
        }
    }

    /**
     * Generate the corresponding pixi objects from the charlist
     * TODO: replace 10 with a ratio from the textstyle fontsize
     */
    generatePixiTextList() {
        let i = 0;
        for ( var singleChar in this.charList) {
            // const newPixiChar = new PIXI.Text(this.charList[singleChar], styleDepth5);
            const newPixiChar = new PIXI.Text(this.charList[singleChar], textStyleSettings[this.depth-1]);
            // console.log(singleChar);
            newPixiChar.x = this.position.x;
            newPixiChar.y = this.position.y + i*10;
            this.pixiTextList.push(newPixiChar);
            i++;
        }
    }

    /**
     * Display the current charlist
     */
    displayPixiTextList() {
        this.pixiTextList.forEach(function(pixiText) {
            app.stage.addChild(pixiText);
            // console.log(style);
        });
    }

}

// GENERATE 20 OBJECTS OF CHARLIST
// let charSerieList = new Object();
// console.log(tmp);

for ( let i=0; i< CANVAS.WIDTH; i+=10 ) {
  let tmp = new CharList(i);
  tmp.displayPixiTextList();

}

// for (let i=0; i< 600; i++) {
//   console.log(String.fromCharCode(i) + '' + i);
// }


document.getElementById('btnAnimate').addEventListener('click', function() {
  // console.log(String.fromCharCode(getRandomInt()));

});

