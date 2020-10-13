
var gamedata = {

  "globals": {
    "prompt":"Would you like to know more?",
    "moves": 0
  },
  "items":[
    {
      "description":"thingy",
      "location": 0
    },
    {
      "description":"thingy",
      "location": 0
    },
  ],
  "states":[
      {
          "description":"This is a Simple Interactive Fiction 'engine'.",
          "events":[
                {"title":"How does it work?","response":1},
                {"title":"Lets Get To It","response":3},
              ]
      },
      {
          "description":"It uses data stored in a easy to read/write JSON object to present your story as a series of states and actions. This is about as simple as it can possibly be and still work.",
          "events":[
                {"title":"Sounds Complicated!","response":2},
                {"title":"What is this again?","response":0},
              ]
      },
      {
          "description":"Its about as simple as it can possibly be and still work, currently about 50 lines of code.",
          "events":[
                {"title":"How does it work?","response":1},
                {"title":"What do I do then?","response":3},
              ]
      },
      {
          "description":"You edit the easy to read JSON in gamedata.js and put it in a folder on your server or local machine along with engine.js and index.html.",
          "events":[
                {"title":"Awesome","response":0},
              ]
      }
    ]

  };
