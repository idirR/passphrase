



function drawDiceInputs(){
    let numRows = document.getElementById("numWords").value;
    let innerHTML = "";
    for (let i = 0; i < numRows; i++){
        innerHTML += "<div class='row' id='row" + (i + 1).toString() + "'>";

        for (let j = 1; j <= 5; j++){
            innerHTML += "<input type='text' class='dice-digit' id='" + (i * 5 + j).toString() + "' pattern='[1-6]' maxlength='1' />";
        }
        innerHTML += "</div>";
    }
    document.getElementById("dice-inputs").innerHTML = innerHTML;
    clearPassphrase();
}

// Clear 
function clearDiceInputs(){
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].type == "text"){
            inputs[i].value = "";
        }
    }
    clearPassphrase();
}


function clearPassphrase(){
    document.getElementById("generated-passphrase").innerHTML = "";
}



function getOptions(){
    let options = {};
    options["separator"] = " ";

    let opts = document.getElementById("numWords");
    options["numWords"] = parseInt(opts.value);

    opts = document.getElementById("wordList");
    options["wordList"] = opts.value;

    opts = document.getElementById("separatorType");
    options["separator"] = opts.value;

    opts = document.getElementById("capitalization");
    options["capitalize"] = opts.value;



    return options;
}




// Étant donné les entrées et les options, générer une phrase secrète
function generatePassphrase(){
    let passphrase = ""
    let passphraseWords = [];
    let options = getOptions();
    let separator = options["separator"];
    let capitalize = options["capitalize"];
    let numWords = options["numWords"];
    let list = options["wordList"];
    let wordList;
    switch (list){
      
        case "diceware_fr":
            wordList = diceware_fr;
            break;
       
    }

    //pour chaque rangée, obtenez les cinq entrées
    //si les cinq lancers sont valides, ajoutez un mot
    let rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++){
        let diceinputs = rows[i].getElementsByClassName("dice-digit");
        let dicerolls = [];
        let validInput = true;
        for (let d = 0; d < diceinputs.length; d++){
            dicerolls.push(diceinputs[d].value);
        }
        for (let j = 0; j < dicerolls.length; j++){
            if (! /^[1-6]/.test(dicerolls[j])){
                validInput = false;
            }
        }

        if (validInput){
            let chunk = dicerolls.join("");
            let word = wordList[chunk];
            passphraseWords.push(word);
        }
    }

  
    if (capitalize === "none"){
        for (let i = 0; i < passphraseWords.length; i++){
            passphrase += (passphraseWords[i] + separator);
        }
    } 

   

    document.getElementById("generated-passphrase").innerHTML = passphrase;
}

window.onload = function(){
    document.getElementById("clear").onclick = clearDiceInputs;
  
    document.getElementById("wordList").onchange = generatePassphrase;
    document.getElementById("numWords").onchange = drawDiceInputs;
    document.getElementById("separatorType").onchange = generatePassphrase;
    
    window.addEventListener("input", generatePassphrase);
    drawDiceInputs(); 
}
