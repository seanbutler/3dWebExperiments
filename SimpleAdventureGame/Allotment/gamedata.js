
var gamedata = {

  "globals": {
    "prompt":"Now...",
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
          // 0
          "description":"You are standing in the hallway, trying to go to the allotment.",
          "events":[
                {"title":"Wait","response":1},
                {"title":"Go Through the Door","response":2}
              ]
      },
      {
          // 1
          "description":"There are some noises from elsewhere in the house, not sure what is happening.",
          "events":[
                {"title":"Wait","response":0},
                {"title":"Call Out","response":3},
              ]
      },
      {
          // 2
          "description":"Dude, you cant leave a little one alone in the house. I'm calling social services on you.",
          "events":[
              {"title":"Start Over","response":0}
          ]
      },
      {
          // 3
          "description":"You and the littlest one are standing in the hallway, trying to go to the allotment.",
          "events":[
                {"title":"Wait","response":4},
                {"title":"Go Through the Door","response":6},
              ]
      },
      {
          // 4
          "description":"You hear a whining noise and look around, its coming from the small person.",
          "events":[
                {"title":"Whats up little one?","response":5},
                {"title":"Go Through the Door","response":7},
              ]
      },
      {
          // 5
          "description":"She is dancing on the spot and looking around",
          "events":[
              {"title":"Food?","response":4},
              {"title":"Water?","response":4},
              {"title":"Toilet?","response":6},
              ]
      },
      {
          // 6
          "description":"You visit the bathroom. She uses the facilities, you help wash hands.",
          "events":[
              {"title":"Back to the hallway","response":10}
              ]
      },
      {
          // 7
          "description":"The noise rises in pitch and intensity",
          "events":[
              {"title":"Err","response":4}
              ]
      },
      {
          // 8
          "description":"You are both outside the house, the door is closed, the driveway has weeds growning on it. There is a street to the south.",
          "events":[
                { "title":"Go In","response":0},
                { "title":"Go South","response":9},
              ]
      },
      {
          // 9
          "description":"Finally You are at the allotment! Now pick some vegetables.",
          "events":[
              {"title":"Start Over","response":0}
          ]
      },
      {
          // 10
          "description":"You and the littlest one are standing in the hallway. Everything seems normal.",
          "events":[
                {"title":"Wait","response":4},
                {"title":"Go Through the Door","response":8},
              ]
      },
    ]

  };
