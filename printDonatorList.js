fs = require('fs');

function readEntireFile(fileLocation){
    
    // get the entire file and return it as a string
    if(fs.existsSync(fileLocation)){
            let stats = fs.statSync(fileLocation);
            let fd = fs.openSync(fileLocation, "r");
            let bufferSize = stats.size;
            let buffer = new Buffer(bufferSize);
            fs.readSync(fd, buffer, 0, buffer.length, 0);
            let data = buffer.toString("utf8", 0, buffer.length);;                  
            fs.closeSync(fd);
            return data;      
    } else{
        console.log("ERROR - Couldn't retrieve the donation file.");
        return "error";
    }
}

function writeFormattedJSON(filepath, json){
    
    // get the entire file and return it as a string
    if(fs.existsSync(filepath)){
            let stats = fs.statSync(filepath);
            let fd = fs.openSync(filepath, "w");

            // build a formatted string from the json
            let formattedString = "";
            Object.entries(json).sort((a,b)=>{
                return parseInt(b[1]) - parseInt(a[1]);
            }).forEach((val, index, arr)=>{
                formattedString += val[0] + ": $" + (val[1]/100).toFixed(2) + "  \n";
            });

            let buffer = Buffer.from(formattedString);
            fs.writeSync(fd, buffer, 0, buffer.length, 0);                 
            fs.closeSync(fd);
    } else{
        console.log("ERROR - Couldn't find the file.");
    }
}

const DONATORS_FILE = "donators.json";
const FORMATTED_DONATORS_LIST = "donatorListFormatted.txt";
let donatorList = JSON.parse(readEntireFile(DONATORS_FILE));
writeFormattedJSON(FORMATTED_DONATORS_LIST, donatorList);