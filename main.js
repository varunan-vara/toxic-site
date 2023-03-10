let totalWeight = 0; let prevWeight; let undividedGPA = 0;

// Set a dictionary of attributes to element
function setAttributes(element, attributesDict) {
    for (const [key, value] of Object.entries(attributesDict)) {
        element.setAttribute(key, value);
    }
}

// A function that returns divs with inputs and accompanying names and classes
// colNum is the number of columns in the table
// elRowClasses is the class given to all the items in the row
// elColClasses is the class given to each item per row, input should 
// be an array
//
// Format would be div.{elRowClasses}Item, input.{elRowClasses}TextField.{
// elColClasses}TextField->name{elColClasses}{numberCounter}
function insertRow(gridEl,colNum, elRowClasses, elColClasses) {
    let textField;
    let textFieldDiv;
    let returnVals = [];
    for (let i = 0; i < colNum; i ++) {
        textField = document.createElement("input");
        setAttributes(textField, {"type": "text"});
        textField.className += `${elRowClasses}TextField`;
        textField.className += ` ${elColClasses[i % 3]}TextField`;
        textField.name = `${elColClasses[i % 3]}${i}`;

        textFieldDiv = document.createElement("div");
        textFieldDiv.className += `${elRowClasses}Item`;
        textFieldDiv.appendChild(textField);
        gridEl.appendChild(textFieldDiv);
    }
    return returnVals;
}


// All the onload functions are here for all the windows. This isn't the most efficient
// method of doing this, but it works
window.onload = function() {
    try {
        // Insert
        document.getElementById("addGPACalcButton").addEventListener("click", e => {
            insertRow(document.getElementById("TotalGpaGrid"), 3, "inputGrid", ["courseName", "weighting", "mark"]);
        })
        // Delete
        document.getElementById("removeGPACalcButton").addEventListener("click", e => {
            let grid = document.getElementById("TotalGpaGrid");
            for (let i = 0; i < 3; i ++) {grid.removeChild(grid.lastChild);}
        })
        // Calculate
        document.getElementById("totalGPACalcButton").addEventListener("click", e => {
            // let totalWeight = 0; let prevWeight; let undividedGPA = 0; <- This is global
            let x = document.getElementById("totalGPAForm").elements;
            for (let i = 0; i < x.length; i ++) {
                if (x[i].className.includes("weighting")) {
                    if (isNaN(x[i].value) || x[i].value == "") {
                        alert("The weighting values are not decimal or blank!")
                        return;
                    }
                    prevWeight = parseFloat(x[i].value);
                    totalWeight += prevWeight;
                    console.log(`Weighting for ${i}: ${prevWeight}`)
                } else if (x[i].className.includes("mark")){
                    if (isNaN(x[i].value) || x[i].value == "") {
                        alert("The mark values are not decimal or blank!")
                        return;
                    }
                    undividedGPA += (prevWeight * parseFloat(x[i].value));
                }
            }
            console.log(`${undividedGPA} : ${totalWeight}`);
            document.getElementById("outputSpan").innerHTML = (undividedGPA / totalWeight).toFixed(2).toString();
            document.getElementById("outputGPASpan").innerHTML = (undividedGPA / totalWeight / 25).toFixed(2).toString();

            
        })

        // Default add three rows
        insertRow(document.getElementById("TotalGpaGrid"), 3, "inputGrid", ["courseName", "weighting", "mark"]);
        insertRow(document.getElementById("TotalGpaGrid"), 3, "inputGrid", ["courseName", "weighting", "mark"]);
        insertRow(document.getElementById("TotalGpaGrid"), 3, "inputGrid", ["courseName", "weighting", "mark"]);
    } catch (e) {
        console.log("This page is not CalculateGPA - skipped eventlisteners")
    }
}