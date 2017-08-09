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