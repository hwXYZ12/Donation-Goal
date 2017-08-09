function readDonationTotal(){
    
    // get the top of the file and return the integer there
    if(fs.existsSync(TRANSACTION_LOG)){
            let stats = fs.statSync(TRANSACTION_LOG);
            let fd = fs.openSync(TRANSACTION_LOG, "r");
            let bufferSize = (stats.size < DONATION_LIMIT) ? stats.size : DONATION_LIMIT;
            let buffer = new Buffer(bufferSize);
            fs.readSync(fd, buffer, 0, buffer.length, 0);
            let data = buffer.toString("utf8", 0, buffer.length).split('\r\n')[0];										
            let donationCount = parseInt(data, 10);                  
            fs.closeSync(fd);
            return donationCount;      
    } else{
        console.log("ERROR - Couldn't retrieve the total number of donations.");
        return -1;
    }
}