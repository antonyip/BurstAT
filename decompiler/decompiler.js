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
        i += AdvanceCounter(opCode);
        
        // concat string
        returnStrings.push(returnString);
    }
    
    return returnStrings;
}

function PrintString(arrayOfStrings)
{
    for (i = 0; i < arrayOfStrings.length; i++)
    {
        document.writeln(arrayOfStrings[i] + "<br/>");
        //console.log(arrayOfStrings[i] + "\n");
    }
}

function ExtractOpCode(opCode, codeArray, index)
{
    return "" + opCode;
}

function AdvanceCounter(opCode)
{
    return 1;
}

var code = "000102030405";
var decompiledCode = Decompile(code);
PrintString(decompiledCode);
