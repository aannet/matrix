// ---------------------------------------
// APP CONSTANT
// ---------------------------------------
const CANVAS = {WIDTH: 800, HEIGHT:600};
const ALPHABET = {MIN:161, MAX:500};
// const ALPHABET = {MIN:97, MAX:126};
const LENGTHCHARSERIES = {MIN:20, MAX:50};
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
  fontSize: 15,
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

    //The "property" way of defining the class attributes may not be the best but it was a test
    
    // position.x
    // position.y
    // charList[]
    // pixiTextList[]
    // depth
    // length
    // currentIndex


    constructor(argx = 0) {
        this.position = {x: 0, y:0},
        this.charSerie = new Array();
        this.pixiTextSerie = new Array();
        this.currentIndex = 0;

        this.generateRandomPosition();
        this.generateRandomDepth();
        this.generateRandomCharSerie();
        this.generatePixiTextSerie();
    }

    /**
     * Generate Random X Y position from canvas dimensions
     */
    generateRandomPosition() {
        //const xx = ((this.x != 0) ? this.x : getRandomInt(0, CANVAS.WIDTH));
        //const yy = 100; //getRandomInt(0, CANVAS.HEIGHT);

        const xx = getRandomInt(0, CANVAS.WIDTH);
        const yy = getRandomInt(0, CANVAS.HEIGHT);

        this.position = {x:xx, y:yy};
    }

    /**
     * Generate Random depth 
     */
    generateRandomDepth() {
        this.depth = getRandomInt(DEPTH.MIN, DEPTH.MAX);
    }

    /**
     * Adds a char to Serie.
     *
     * @param      {integer}  charCode  The character code
     */
    addCharToSerie(charCode) {
        this.charSerie.push(charCode);
    }

    /**
     * Generate a random char number Serie
     */
    generateRandomCharSerie() {
      const newRandomMaxLength = getRandomInt(LENGTHCHARSERIES.MIN, LENGTHCHARSERIES.MAX);
        for(let i=0; i<newRandomMaxLength; i++) {
            const newRandomCharToAdd = String.fromCharCode(getRandomInt(ALPHABET.MIN, ALPHABET.MAX));
            this.addCharToSerie(newRandomCharToAdd);
        }
    }

    /**
     * Generate the corresponding pixi objects from the charSerie
     * TODO: replace 10 with a ratio from the textstyle fontsize
     */
    generatePixiTextSerie() {
        let i = 0;
        for ( var singleChar in this.charSerie) {
            // const newPixiChar = new PIXI.Text(this.charSerie[singleChar], styleDepth5);
            const newPixiChar = new PIXI.Text(this.charSerie[singleChar], textStyleSettings[this.depth-1]);
            // console.log(singleChar);
            newPixiChar.x = this.position.x;
            newPixiChar.y = this.position.y + i*15;
            this.pixiTextSerie.push(newPixiChar);
            i++;
        }
    }

    /**
     * Display the complete charSerie
     */
    displayFullPixiTextSerie() {
        let i = 0;
        for ( var singleChar in this.charSerie) {
            this.displaySinglePixiText(i);
            i++;
        }
    }

    /**
     * Display a single char from the complete char serie 
     *
     * @param      {index}  index   The index of the char serie
     */
    displaySinglePixiText(index) {
        try {
            if (typeof(index) !== 'number') {
                throw('Index is not defined or is not an integer');
            }
            index = parseInt(index)
            if (index < 0 || index > this.charSerie.length) {
                throw('Index is out of boundaries');
            }
            const pixiText = this.pixiTextSerie[index];

            if (pixiText.position.y < CANVAS.HEIGHT && pixiText.position.y > 0
                && pixiText.position.x > 0 && pixiText.position.x < CANVAS.WIDTH) {
                app.stage.addChild(pixiText);
            }
        }
        catch(e) {
            console.log('Error in displaySinglePixiText :' + e);
        }
    }


    /**
     * { function_description }
     *
     * @return     {boolean}  currentindex or false if max
     */
    displayNextSinglePixiText() {

        if ( this.currentIndex + 1 < this.charSerie.length ) {
            this.currentIndex++;
            
            this.displaySinglePixiText(this.currentIndex);
            return this.currentIndex;
        }
        else {
            return false;
        }
    }



    /**
     * Return the char serie length
     * Not used
     *
     * @return     {integer}  { description_of_the_return_value }
     */
    length() {
       return this.charSerie.length;
    }

}

// TODO : GENERATE 20 OBJECTS OF CHARSerie
// let charSerieList = new Object();
// console.log(tmp);

// for ( let i=10; i< CANVAS.WIDTH; i+=10 ) {
//   let tmp = new CharList(i);
//   tmp.displayPixiTextList();
// }

/*
class CharListManager {

    constructor() {

    }


    animate() {

    }


}

  let tmp = new CharList(50);
  tmp.displayFullPixiTextList();
*/




document.getElementById('btnCreate').addEventListener('click', function() {
  // let tmp = new CharList(50);
  // tmp.displayFullPixiTextSerie();



    let mycharlist = new CharList();

 /*
    let i = 0;
    for (let i = 0; i < mycharlist.length(); i++) {
        mycharlist.displaySinglePixiText(i);
        
    }*/


    var myVar = setInterval(myTimer, 50);
    
    function myTimer() {
        let ret = mycharlist.displayNextSinglePixiText();
        if ( ret === false ) window.clearInterval(myVar);
    }
});



document.getElementById('btnAnimate').addEventListener('click', function() {

    //GENERATION
    charlistArray = new Array();
    let max = 100;
    for (let i = 0; i< max; i++) {
        let mycharlist = new CharList();
        charlistArray.push(mycharlist);
    }

    //ANIMATE
    var myVar = setInterval(myTimer, 100);
    
    function myTimer() {

        for (let i = 0; i< max; i++) {
            charlistArray[i].displayNextSinglePixiText();
        }

        // let ret = mycharlist.displayNextSinglePixiText();
        // if ( ret === false ) window.clearInterval(myVar);
    }


});
