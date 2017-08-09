function updateGoal(lastDonationKey){
    
    // get from file the current donation number
    let newDonationKey = readDonationTotal();

    // read the entire file and split it into records
    let donations = readEntireFile(TRANSACTION_LOG).split(RECORD_SPLIT_STRING);

    // read initialization file
    let init = JSON.parse(readEntireFile(INIT_FILE));

    let currentTotal = init['current'];
    let total = init['target'];

    // process each new donation
    if(newDonationKey > 0){

        let theDonation = donations[lastDonationKey];   

        // keep track of the last donation message
        if(lastDonationKey != newDonationKey){

            // setup the scrolling message
            startIndex = theDonation.indexOf("message: ")+9;
            endIndex = theDonation.indexOf("amount",startIndex);
            let message = theDonation.substring(startIndex, endIndex-2);

            // setup scrolling message speed and width
            // get CSS rule
            let ourOnlyAnimation = findRuleByName("marquee");
            
            // remove the existing 100% rule
            ourOnlyAnimation.deleteRule("100%");
            
            // create new 100% rule based on the message size
            let someVar = message.length*PIXELS_PER_CHAR;
            let newSpeed = SCROLL_SPEED_LININTERP_M*(message.length+SCROLL_SPEED_LININTERP_X0)+SCROLL_SPEED_LININTERP_Y0;
            ourOnlyAnimation.appendRule("100% { left: "+-1*someVar+"px; }");

            // edit the animation css rule and change the
            // animation speed (again based on the message size)
            let rule34 = findRuleBySelectorText(".marquee div");
            rule34.style.animation = "marquee "+newSpeed+"s linear infinite";
            rule34.style.width = someVar+"px";

            // assign the animation to our element (which will hopefully cause the animation to run)
            // and set the scrolling message
            let scroll = document.querySelectorAll(".marquee > div > span > label")
            scroll.forEach(function(element) {
                element.textContent= message;
            }, this);            

            // setup the recent donator name
            startIndex = theDonation.indexOf("name: ")+6;
            endIndex = theDonation.indexOf("message",startIndex);
            let uname = theDonation.substring(startIndex, endIndex-2);
            document.getElementById('recentDonator').textContent = uname+":";

            // prepare to write the donation message and donator name to the init file
            init['scrollingMessage'] = message;
            init['donator'] = uname;
        }

        for(let i = lastDonationKey; i < newDonationKey; ++i){
                theDonation = donations[i];
                
                // increment the donation total
                let startIndex = theDonation.indexOf("AMT: ")+5;
                let endIndex = theDonation.indexOf("\r\n",startIndex);
                let amt = parseInt(Math.round(parseFloat(theDonation.substring(startIndex, endIndex))*100));
                currentTotal += PAYPAL_FEES(amt);
                let fixedTotal = (currentTotal/100.0).toFixed(2);
                document.getElementById('currentAmount').textContent = "$"+fixedTotal;
                document.getElementById('recentAmount').textContent = "$"+ (amt/100.0).toFixed(2);

                // update the donation progress bar
                let bar = document.querySelector("#donationProgressBar div");
                let progress = (100*currentTotal / total).toString();
                bar.style.width = progress+"%";

                // prepare to write the current total to the init file
                // as well as the recent donation amount
                init['current'] = currentTotal;
                init['amount'] = amt;
                
                // get the donator name
                startIndex = theDonation.indexOf("name: ")+6;
                endIndex = theDonation.indexOf("message",startIndex);
                let uname = theDonation.substring(startIndex, endIndex-2);

                // if the donator is in the donator json then
                // add the amount to their total
                // otherwise add them to the json and set their
                // inital value

                // get the donators json
                let donators = JSON.parse(readEntireFile(DONATORS_FILE));

                // format amt to dollars and cents
                if(uname in donators){
                    donators[uname] += amt;
                } else {
                    donators[uname] = amt;
                }

                // write new current total and new scrolling message
                // to the donators file
                writeInitFile(DONATORS_FILE, donators);

                
        }     

        // write new current total and new scrolling message
        // to the init file
        writeInitFile(INIT_FILE, init);
    }

    setTimeout(updateGoal, UPDATE_INTERVAL, newDonationKey);
}