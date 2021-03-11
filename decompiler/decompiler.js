
var opCode = {
    0x01: "SET",
    0x02: "SET",
    0x03: "CLR",
    0x04: "INC",
    0x05: "DEC",
    0x06: "ADD",
    0x07: "SUB",
    0x08: "MUL",
    0x09: "DIV",
    0x0a: "BOR",
    0x0b: "AND",
    0x0c: "XOR",
    0x0d: "NOT",
    0x0e: "SET",
    0x0f: "SET",
    0x10: "PSH",
    0x11: "POP",
    0x12: "JSR",
    0x13: "RET",
    0x14: "SET",
    0x15: "SET",
    0x16: "MOD",
    0x17: "SHL",
    0x18: "SHR",
    0x1a: "JMP",
    0x1b: "BZR",
    0x1e: "BNZ",
    0x1f: "BGT",
    0x20: "BLT",
    0x21: "BGE",
    0x22: "BLE",
    0x23: "BEQ",
    0x24: "BNE",
    0x25: "SLP",
    0x26: "FIZ",
    0x27: "STZ",
    0x28: "FIN",
    0x29: "STP",
    0x2a: "SLP_IMD", /* not implemented in javascript compiler */
    0x2b: "ERR",
    0x30: "PCS",
    0x32: "FUN",
    0x33: "FUN",
    0x34: "FUN",
    0x35: "FUN",
    0x36: "FUN",
    0x37: "FUN"
};


var funcNames = {
    0x0100: "get_A1",
    0x0101: "get_A2",
    0x0102: "get_A3",
    0x0103: "get_A4",
    0x0104: "get_B1",
    0x0105: "get_B2",
    0x0106: "get_B3",
    0x0107: "get_B4",
    0x0110: "set_A1",
    0x0111: "set_A2",
    0x0112: "set_A3",
    0x0113: "set_A4",
    0x0114: "set_A1_A2",
    0x0115: "set_A3_A4",
    0x0116: "set_B1",
    0x0117: "set_B2",
    0x0118: "set_B3",
    0x0119: "set_B4",
    0x011a: "set_B1_B2",
    0x011b: "set_B3_B4",
    0x0120: "clear_A",
    0x0121: "clear_B",
    0x0122: "clear_A_B",
    0x0123: "copy_A_From_B",
    0x0124: "copy_B_From_A",
    0x0125: "check_A_Is_Zero",
    0x0126: "check_B_Is_Zero",
    0x0127: "check_A_equals_B",
    0x0128: "swap_A_and_B",
    0x0129: "OR_A_with_B",
    0x012a: "OR_B_with_A",
    0x012b: "AND_A_with_B",
    0x012c: "AND_B_with_A",
    0x012d: "XOR_A_with_B",
    0x012e: "XOR_B_with_A",
    0x0140: "add_A_to_B",
    0x0141: "add_B_to_A",
    0x0142: "sub_A_from_B",
    0x0143: "sub_B_from_A",
    0x0144: "mul_A_by_B",
    0x0145: "mul_B_by_A",
    0x0146: "div_A_by_B",
    0x0147: "div_B_by_A",
    0x0200: "MD5_A_to_B",
    0x0201: "check_MD5_A_with_B",
    0x0202: "HASH160_A_to_B",
    0x0203: "check_HASH160_A_with_B",
    0x0204: "SHA256_A_to_B",
    0x0205: "check_SHA256_A_with_B",
    0x0300: "get_Block_Timestamp",
    0x0301: "get_Creation_Timestamp",
    0x0302: "get_Last_Block_Timestamp",
    0x0303: "put_Last_Block_Hash_In_A",
    0x0304: "A_to_Tx_after_Timestamp",
    0x0305: "get_Type_for_Tx_in_A",
    0x0306: "get_Amount_for_Tx_in_A",
    0x0307: "get_Timestamp_for_Tx_in_A",
    0x0308: "get_Ticket_Id_for_Tx_in_A",
    0x0309: "message_from_Tx_in_A_to_B",
    0x030a: "B_to_Address_of_Tx_in_A",
    0x030b: "B_to_Address_of_Creator",
    0x0400: "get_Current_Balance",
    0x0401: "get_Previous_Balance",
    0x0402: "send_to_Address_in_B",
    0x0403: "send_All_to_Address_in_B",
    0x0404: "send_Old_to_Address_in_B",
    0x0405: "send_A_to_Address_in_B",
    0x0406: "add_Minutes_to_Timestamp"
}


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
    var stack;
    while (i < codeArray.length)
    {
        // extract opcode
        var opCode = codeArray[i];
        stack = i;
        // extract variables
        var returnString = ExtractOpCode(opCode, codeArray, i);
        
        // Advance i based on opcode pattern
        i += AdvanceCounter(returnString);
        
        // concat string
        returnStrings.push(stack.toString(16).padStart(4, '0')+ " " +returnString);
    }
    
    return returnStrings;
}

function PrintString(arrayOfStrings)
{
    var outputHTML = document.getElementById("codeOutput");
    var stringConcat = "";
    for (i = 0; i < arrayOfStrings.length; i++)
    {
        stringConcat += arrayOfStrings[i] + "\n";
    }
    outputHTML.innerHTML = stringConcat;
}

function PrintReadableString(arrayOfStrings)
{
    var outputHTML = document.getElementById("codeReadOutput");
    var stringConcat = "";
    for (i = 0; i < arrayOfStrings.length; i++)
    {
        stringConcat += opCodeToText(arrayOfStrings[i]) + "\n";
    }
    outputHTML.innerHTML = stringConcat;
}

function opCodeToText(opCodeAndVariable)
{
    var variables = opCodeAndVariable.split(" ");
    var ret = "0x"+variables[0]+" ";
    var opCodeNum = parseInt(variables[1], 16);
    var arg1 = parseInt(variables[2], 16);
    var arg2 = parseInt(variables[3], 16);
    var arg3 = parseInt(variables[4], 16);
    var funCodeNum = arg1;
    switch ( opCodeNum ) {
        case 0x01:
            ret += opCode[ opCodeNum ] + 
                    " @var" + arg1 +
                    " #" + variables[3];
            break;
        case 0x02:
        case 0x06:
        case 0x07:
        case 0x08:
        case 0x09:
        case 0x0a:
        case 0x0b:
        case 0x0c:
        case 0x16:
        case 0x17:
        case 0x18:
            ret += opCode[ opCodeNum ] + 
                    " @var" + arg1 +
                    " $var" + arg2;
            break;
        case 0x03:
        case 0x04:
        case 0x05:
        case 0x0d:
        case 0x11:
            ret += opCode[opCodeNum] +
                    " @var" + arg1;
            break;
        case 0x0e:
            ret += opCode[opCodeNum] +
                    " @var" + arg1 +
                    " $($var"+arg2+")";
            break;
        case 0x0f:
            ret += opCode[opCodeNum] +
                    " @var" + arg1 +
                    " $($var" + arg2 + " + $var" + arg3 + ")";
            break;
        case 0x10:
        case 0x25:
        case 0x26:
        case 0x27:
            ret += opCode[opCodeNum] +
                    " $var" + arg1;
            break;
        case 0x12:
        case 0x1a:
        case 0x2b:
            ret += opCode[opCodeNum] +
                    " :0x"+arg1.toString(16).padStart(4, '0');
            break;
        case 0x13:
        case 0x28:
        case 0x29:
        case 0x2a:
        case 0x30:
            ret += opCode[ opCodeNum ];
            break;
        case 0x14:
            ret += opCode[opCodeNum] +
                    " @($var" + arg1 + ") $var" + arg2;
            break;
        case 0x15:
            ret += opCode[opCodeNum] +
                    " @($var" + arg1 + " + $var" + arg2 + ")" + 
                    " $var"+arg3;
            break;
        case 0x1b:
        case 0x1e:
            if (arg2 > 0x7f) //negative index
                arg2 -= 0x100;
            var jmp_address = parseInt(variables[0], 16) + arg2;
            ret += opCode[ opCodeNum ] + 
                    " $var" + arg1 + 
                    " :0x" + jmp_address.toString(16).padStart(4, '0');
            break;
        case 0x1f:
        case 0x20:
        case 0x21:
        case 0x22:
        case 0x23:
        case 0x24:
            if (arg3 > 0x7f) //negative index
                arg3 -= 0x100;
            var jmp_address = parseInt(variables[0], 16) + arg3;
            ret += opCode[ opCodeNum ] +
                    " $var" + arg1 +
                    " $var" + arg2 +
                    " :0x" + jmp_address.toString(16).padStart(4, '0');
            break;
        case 0x32:
            ret += opCode[ opCodeNum ] +
                    " " + funcNames[ funCodeNum ];
            break;
        case 0x33:
            ret += opCode[ opCodeNum ] +
                    " " + funcNames[ funCodeNum ] +
                    " $var" + arg2;
            break;
        case 0x34:
            ret += opCode[ opCodeNum ] +
                    " " + funcNames[ funCodeNum ] +
                    " $var" + arg2 +
                    " $var" + arg3;
            break;
        case 0x35:
            ret += opCode[ opCodeNum ] +
                    " @var" + arg2 +
                    " " + funcNames[ funCodeNum ];
            break;
        case 0x36:
            ret += opCode[ opCodeNum ] +
                    " @var" + arg2 +
                    " " + funcNames[ funCodeNum ] +
                    " $var" + arg3;
            break;
        case 0x37:
            ret += opCode[ opCodeNum ] +
                    " @var" + arg2 +
                    " " + funcNames[ funCodeNum ] +
                    " $var" + arg3 +
                    " $var" + parseInt(variables[5], 16);
            break;
    }

    return ret;
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


