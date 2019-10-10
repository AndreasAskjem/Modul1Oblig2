let numbers = [7, 3, 1, 5, 8];
var svgTag = document.getElementById('chart');
let selectedBar = null;
showChart();

function showChart() {
    let svgInnerHtml = '';
    for (let i = 0; i < numbers.length; i++) {
        svgInnerHtml += createBar(numbers[i], i+1);
    }
    svgTag.innerHTML = svgInnerHtml;
    let valgtStolpe = document.getElementById('selectedBar');

    if(selectedBar===null){
        valgtStolpe.innerHTML = `Valgt stolpe: <i>ingen</i>`;
    }
    else{
        valgtStolpe.innerHTML =  `Valgt stolpe: ${selectedBar}`;
    }
    //document.getElementById('selectedBar').innerHTML = `Valgt stolpe: ${selectedBar}`;
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
    let border = '';
    if(barNo == selectedBar){
        border = 'class="blackBorder"';
    }
    // Added onclick so the bars can react to clicks.
    return `<rect id="rect${barNo}" width="${width}" height="${height}"
    x="${x}" y="${y}" fill="${color}"
    ${border}
    onclick="barOnClick(${barNo})"></rect>`;
}

function calcColor(min, max, val) {
    var minHue = 240, maxHue = 0;
    var curPercent = (val - min) / (max - min);
    var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
    return colString;
}


//Changes borders of bars and toggles buttons when bars are clicked.
function barOnClick(barNo){
    let clickedBar = barNo;
    if(clickedBar == selectedBar){
        selectedBar = null;
        disableButtons();
    }
    else{
        selectedBar = barNo;
        enableButtons();
    }
    showChart();
}


// Adds the input to the end of numbers[].
function addBar(){
    let input = Number(document.getElementById('inputValue').value);
    emptyInput();
    if(verifyInputValue(input)){
        numbers.push(input);
        selectedBar = `<i>ingen</i>`;
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
        numbers[selectedBar-1] = input;
        selectedBar = `<i>ingen</i>`;
        disableButtons();
        showChart();
    }
    else{
        errorMessage();
    }
}

// Removes the selected bar.
function removeBar(){
    numbers.splice(selectedBar-1, 1);
    emptyInput();
    selectedBar = `<i>ingen</i>`;
    disableButtons();
    showChart();
}


// Returns true if the input value is valid (integer between 1 and 10).
function verifyInputValue(input){
    return((input > 0) && (input <= 10) && (Number.isInteger(input)));
}

function enableButtons(number){
    selectedBar.innerHTML = `Valgt stolpe: ${number}`;
    document.getElementById('buttonChangeBar').disabled = false;
    document.getElementById('buttonRemoveBar').disabled = false;
}

function disableButtons(){
    document.getElementById('buttonChangeBar').disabled = true;
    document.getElementById('buttonRemoveBar').disabled = true;
}

function errorMessage(){
    alert('Du må bruke heltall fra 1 til 10!');
}

// Empties the input area and focuses on it.
emptyInput();
function emptyInput(){
    document.getElementById('inputValue').value = '';
    document.getElementById('inputValue').focus();
}