function DecompileCode()
{
    var codeString = document.getElementById("codeString").value;
    var arrayOfStrings = Decompile(codeString);
    PrintString(arrayOfStrings);
    PrintReadableString(arrayOfStrings);
}

function Decompile(codeString)
{
    var codeArray = [];
    
    // loop through the code string and turn them into opcodes
    for (i = 0; i < codeString.length; i+=2)
    {
        var opCode = codeString.slice(i, i+2);
        codeArray.push(opCode);
    }
    
    // decompile the op codes into strings
    var returnStrings = [];
    var i = 0;
    while (i < codeArray.length)
    {
        // extract opcode
        var opCode = codeArray[i];
        
        // extract variables
        var returnString = ExtractOpCode(opCode, codeArray, i);
        
        // Advance i based on opcode pattern
        i += AdvanceCounter(returnString);
        
        // concat string
        returnStrings.push(returnString);
    }
    
    return returnStrings;
}

function PrintString(arrayOfStrings)
{
    var outputHTML = document.getElementById("codeOutput");
    var stringConcat = "";
    for (i = 0; i < arrayOfStrings.length; i++)
    {
        stringConcat += arrayOfStrings[i] + "<br/>";
    }
    outputHTML.innerHTML = stringConcat;
}

function PrintReadableString(arrayOfStrings)
{
    var outputHTML = document.getElementById("codeReadOutput");
    var stringConcat = "";
    for (i = 0; i < arrayOfStrings.length; i++)
    {
        stringConcat += opCodeToText(arrayOfStrings[i]) + "<br/>";
    }
    outputHTML.innerHTML = stringConcat;
}

function opCodeToText(opCodeAndVariable)
{
    var variables = opCodeAndVariable.split(" ");
    var returnValue = "";
    if (variables[0] == "01")
    {
        returnValue += "SET_VAL @" + variables[1] + " #" + variables[2];
    }
    
    // todo:: finish this up. so lazy, can't move.
    
    return returnValue;
}

function ExtractOpCode(opCode, codeArray, index)
{
    var returnValue = "" + opCode;
    index += 1;
    
    // "0X"
    if (opCode == "01")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 8);
    }
    
    if (opCode == "02")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }
    
    if (opCode == "03" || opCode == "04" || opCode == "05")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }
       
    if (opCode == "06" || opCode == "07" || opCode == "08" || opCode == "09" || opCode == "0a" || opCode == "0b" || opCode == "0c")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }
    
    if (opCode == "0d")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }
    
    if (opCode == "0e")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }
    
    if (opCode == "0f")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);        
    }
    
    // "1X"
    if (opCode == "10" || opCode == "11" || opCode == "12")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }    
    
    // 13 skipped due to no variables
    if (opCode == "14")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);   
    }    
    
    if (opCode == "15")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);   
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);          
    }     
    
    if (opCode == "16" || opCode == "17" || opCode == "18")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);   
    }    
    
    // 19 missing?
    if (opCode == "1a")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }     
    
    // a few missing here too...
    if (opCode == "1b" || opCode == "1e")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 1);
    }        
    
    if (opCode == "1f")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;        
        returnValue += " " + ExtractVariable(codeArray, index, 1);
    }            
    
    // "2X"
    
    if (opCode == "20" || opCode == "21" || opCode == "22" || opCode == "23" || opCode == "24")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;        
        returnValue += " " + ExtractVariable(codeArray, index, 1);
    }
    
    if (opCode == "25" || opCode == "26" || opCode == "27" || opCode == "2b")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }  
    
    // "3X"
    if (opCode == "32")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 2);
    }
    
    if (opCode == "33")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 2);
        index += 2;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }
    
    if (opCode == "34")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 2);
        index += 2;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }
    
    if (opCode == "35")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 2);
        index += 2;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }
    
    if (opCode == "36")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 2);
        index += 2;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }
    
    if (opCode == "37")
    {
        returnValue += " " + ExtractVariable(codeArray, index, 2);
        index += 2;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
        index += 4;
        returnValue += " " + ExtractVariable(codeArray, index, 4);
    }
    
    
    return returnValue;
}

function ExtractVariable(codeArray, index, length)
{
    var returnValue = "";
    for (i = length-1; i >= 0; i--)
    {
        returnValue += codeArray[index+i];
    }
    return returnValue;
}

function AdvanceCounter(returnString)
{
    var returnStringReplaced = returnString.replace(/ /g, "");
    return returnStringReplaced.length/2;
}


