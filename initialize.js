function findRuleByName(theName){
    let ss = document.styleSheets;
    for(let i = 0; i < ss.length; ++i){
        for(let j = 0; j < ss[i].cssRules.length; ++j){
            if(ss[i].cssRules[j].name == theName)
                return ss[i].cssRules[j];
        }
    }
    throw Exception();
}

function findRuleBySelectorText(theSelectorText){
    let ss = document.styleSheets;
    for(let i = 0; i < ss.length; ++i){
        for(let j = 0; j < ss[i].cssRules.length; ++j){
            if(ss[i].cssRules[j].selectorText == theSelectorText)
                return ss[i].cssRules[j];
        }
    }
    throw Exception();
}

function initialize(){
    
    // get the initFile as a JSON
    let init = JSON.parse(readEntireFile(INIT_FILE));

    // set the overall goal of the donations
    document.getElementById('donationGoal').textContent = init['message'];

    // setup scrolling message speed and width
    // get CSS rule
    let ourOnlyAnimation = findRuleByName("marquee");
    
    // remove the existing 100% rule
    ourOnlyAnimation.deleteRule("100%");
    
    // create new 100% rule based on the message size
    let message = init['scrollingMessage'];
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

    // set most recent donator
    document.getElementById('recentDonator').textContent = init['donator']+":";

    // set most recent donator's amount
    document.getElementById('recentAmount').textContent = "$"+(init['amount']/100).toFixed(2);

    // set the current amount
    document.getElementById('currentAmount').textContent = "$"+(init['current']/100).toFixed(2);
    
    // set the target amount
    document.getElementById('targetAmount').textContent = "$"+(init['target']/100).toFixed(2);

    // update the donation progress bar
    let bar = document.querySelector("#donationProgressBar div");
    let progress = (100*init['current'] / init['target']).toString();
    bar.style.width = progress+"%";

}