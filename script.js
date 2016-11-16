var leftArray = [];
var rightArray = [];
var leftInput;
var rightInput;
var limit=30;
var lock=0;
var table = document.getElementById("table");

function addRow(element1, element2){
    // Insert a Row in the table
    var rowLength = table.rows.length;
    var row = table.insertRow(rowLength);
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    // Add some text to the new cells:
    cell1.innerHTML = element1;
    cell2.innerHTML = element2;
}

function takeElementFromTable(){
    var Ftable = document.getElementById("table");
    var rowLength = Ftable.rows.length;
    for (i = 1; i < rowLength; i++){
        //gets cells of current row
        var oCells = table.rows[i].cells;
        //gets amount of cells of current row
        var cellLength = oCells.length;
        //loops through each cell in current row
        for(var j = 0; j < cellLength; j++){
            console.log("i: "+i+" j: "+j);
            if(j==0)leftArray[i]=oCells.item(j).innerHTML;
            if(j==1)rightArray[i]=(parseInt(oCells.item(j).innerHTML));
        }
        console.log(leftArray[i]);
        console.log(rightArray[i]);
    }
}

function takeElementFromInputTable(){
    var Ftable = document.getElementById("inputTable");
    console.log("Son dentro takeElementFromInputTable")
    leftInput = document.getElementById('oggetto').value;
    rightInput = document.getElementById('quantita').value;
}

function addElementToTable(){
    if(lock==1) alert("Hai sforato il magazzino, non verranno accettati altri componenti");
    else {
        takeElementFromInputTable();
        takeElementFromTable();
        var tot = sumOfElements(rightArray);
        if(testLimit(tot,limit)==1){
            alert("Hai sforato il magazzino, non verranno accettati altri componenti");
            lock = 1;
        } 
        var Ftable = document.getElementById("table");
        var rowLength = Ftable.rows.length;
        console.log("RowLength: "+rowLength);
        console.log("LeftInput: "+leftInput);
        console.log("RightInput: "+rightInput);
        console.log("LeftArray[1]: "+leftArray[1]);
        var mark=0;
        for(i=1;i<rowLength;i++){
            console.log("Sono nel ciclo i: "+i);
                if(leftArray[i]==leftInput){
                    rightArray[i] = rightArray[i]+parseInt(rightInput);
                    mark = 1;
                    cancelAndRedo(leftArray[i],rightArray[i],i);
                }
            
            }
        if(mark==0) addRow(leftInput,rightInput);
        
    } 
}

function cancelAndRedo(element1,element2,point){
    table.deleteRow(point);
    var row = table.insertRow(point);
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    // Add some text to the new cells:
    cell1.innerHTML = element1;
    cell2.innerHTML = element2; 
}


function setLimit(){
    var x = document.getElementById("inputLimit");
    limit = x;
}

function testLimit(parameter1, parameter2){
    var res=0;
    if(parameter1>parameter2) res=1;
    return res;
}

function sumOfElements(array){
    var sum=0;
    for(i=0;i<array.length;i++)
        sum += array[i];
    return sum;
}