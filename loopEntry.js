const UPDATE_INTERVAL = 2000;
const TRANSACTION_LOG = "C:\\Users\\Will\\Desktop\\more stuff\\even more stuff\\transactionLog.txt";
const INIT_FILE = "initFile.json";
const DONATION_LIMIT = 100;
const RECORD_SPLIT_STRING = '-'.repeat(50);
const PAYPAL_FEES = (amt) => { let x = parseInt(amt - Math.ceil(amt*0.029) - 30);
                                if (x < 0)
                                    return 0
                                else
                                    return x;};
const PIXELS_PER_CHAR = 33;
const SCROLL_SPEED_LININTERP_M = 3.0/39;
const SCROLL_SPEED_LININTERP_X0 = -5;
const SCROLL_SPEED_LININTERP_Y0 = 5;
const DONATORS_FILE = "donators.json";

// access the filesystem api once in the whole program scope
const fs = require('fs');

(() => {

    // run intialization routine
    initialize();

    // get the initial donation key
    let lastDonationKey = readDonationTotal();

    // every update cycle we retrieve information from the transation log
    // and update the display accordingly
    // we use a recursive function in order to properly scope the variables
    // we want to use
    setTimeout(updateGoal, UPDATE_INTERVAL, lastDonationKey);
})()