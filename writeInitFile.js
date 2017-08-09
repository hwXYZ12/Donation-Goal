function writeInitFile(filepath, json){
    
    // get the entire file and return it as a string
    if(fs.existsSync(filepath)){
            let stats = fs.statSync(filepath);
            let fd = fs.openSync(filepath, "w");
            let buffer = Buffer.from(JSON.stringify(json));
            fs.writeSync(fd, buffer, 0, buffer.length, 0);                 
            fs.closeSync(fd);
    } else{
        console.log("ERROR - Couldn't find the file.");
    }
}