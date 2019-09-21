let numbers = [7, 3, 2, 5, 8];
var svgTag = document.getElementById('chart');
showChart();

function showChart() {
    let svgInnerHtml = '';
    for (let i = 0; i < numbers.length; i++) {
        svgInnerHtml += createBar(numbers[i], i+1);
    }
    svgTag.innerHTML = svgInnerHtml;
}

// Creates and returns SVG elements (rectangles used as bars).
function createBar(number, barNo) {
    let width = 8;
    const spacing = 2;
    
    // Makes the bars thinner if there's too many to fit all of them.
    if(((width + spacing) * numbers.length) > 80){
        width = Math.floor((80 - (numbers.length * spacing)) / numbers.length);
        if(width < 1){
            width = 1;
        }
    }
    
    let x = (barNo - 1) * (width + spacing);
    // Reduced height from 10 to 5 to stop tall bars from getting cut off.
    let height = number * 5;
    let y = 60 - height;
    let color = calcColor(1, 10, barNo);
    // Added onclick so the bars can react to clicks.
    return `<rect id="rect${barNo}" width="${width}" height="${height}"
            x="${x}" y="${y}" fill="${color}"
            onclick="barOnClick(${barNo})"></rect>`;
}

function calcColor(min, max, val) {
    var minHue = 240, maxHue = 0;
    var curPercent = (val - min) / (max - min);
    var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
    return colString;
}

let selectedBarPosition; //int, counts from 0.
let selectedBar = document.getElementById('selectedBar'); //element
let aBarIsSelected = false; //bool
let clickedBar; //element
let previousClickedBar; //element

//Changes borders of bars and taggles buttons when bars are clicked
function barOnClick(number){
    clickedBar = document.getElementById(`rect${number}`);
    
    if(clickedBar == previousClickedBar){
        aBarIsSelected = !aBarIsSelected;
    }

    if(aBarIsSelected && (clickedBar == previousClickedBar)){
        removeBorder(number);
        disableButtons();
    }
    else{
        addBorder(number);
        aBarIsSelected = false;
    }

    previousClickedBar = clickedBar;
}

// Removes the border of the previously clicked bar, and adds border to the clicked bar.
function addBorder(number){
    selectedBarPosition = number-1;
    try{previousClickedBar.classList.remove('blackBorder');}
    catch{}
    try{clickedBar.classList.add('blackBorder');}
    catch{}
    enableButtons(number);
}

// Removes the border of the selected bar, if it has a border.
function removeBorder(){
    try{clickedBar.classList.remove('blackBorder');}
    catch{}
}

// Adds the input to the end of numbers[] and redraws chart.
function addBar(){
    let input = Number(document.getElementById('inputValue').value);
    emptyInput();
    if(verifyInputValue(input)){
        numbers.push(input);
        // MUST CHECK IF INPUT IS VALID
        removeBorder();
        disableButtons();
        showChart();
    }
    else{
        errorMessage();
    }
}

// Changes the height of selected bar.
function changeBar(){
    let input = Number(document.getElementById('inputValue').value);
    emptyInput();
    if(verifyInputValue(input)){
        numbers[selectedBarPosition] = input;
        disableButtons();
        showChart();
    }
    else{
        errorMessage();
    }
}

// Removes the selected bar.
function removeBar(){
    numbers.splice(selectedBarPosition, 1);
    emptyInput();
    disableButtons();
    showChart();
}

function enableButtons(number){
    selectedBar.innerHTML = `Valgt stolpe: ${number}`;
    document.getElementById('buttonChangeBar').disabled = false;
    document.getElementById('buttonRemoveBar').disabled = false;
}

function disableButtons(){
    selectedBar.innerHTML = `Valgt stolpe: <i>ingen</i>`;
    document.getElementById('buttonChangeBar').disabled = true;
    document.getElementById('buttonRemoveBar').disabled = true;
}

// Returns true if the input value is valid (integer between 1 and 10).
function verifyInputValue(input){
    return((input > 0) && (input <= 10) && (Number.isInteger(input)));
}

function errorMessage(){
    alert('Du må bruke heltall fra 1 til 10!');
}

// Empties the input area.
emptyInput();
function emptyInput(){
    document.getElementById('inputValue').value = '';
    document.getElementById('inputValue').focus();
}