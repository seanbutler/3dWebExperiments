

var ENGINE = (function() {

  var currentLocation = 0;

  return {

    printPrompt : function(){
        document.getElementById("prompt").innerHTML = gamedata.globals.prompt;
    },


    printCurrentState : function(){
        document.getElementById("state").innerHTML = gamedata.states[currentLocation].description;
        var choices = "";
        for(var i=0,l=gamedata.states[currentLocation].events.length;i<l;i++){
          choices +="<p>";
            choices += "<button onclick='ENGINE.setState(" + gamedata.states[currentLocation].events[i].response + ")'>"
                                                   + gamedata.states[currentLocation].events[i].title + "</button>";
                                                   choices +="<p>";
        }
        document.getElementById("events").innerHTML = choices;
    },


    setState : function(num) {
        currentLocation = num;
        ENGINE.printPrompt();
        ENGINE.printCurrentState();
    }

  }
}());

ENGINE.setState(0);
