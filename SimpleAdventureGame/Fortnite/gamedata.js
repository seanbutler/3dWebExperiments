
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
          "description":"All the kids at school are telling you they spent all weekend playing Fortnite even though they are only 8.",
          "events":[
                {"title":"Wait","response":1},
                {"title":"Ask Parents","response":2}
              ]
      },
      {
          // 1
          "description":"At this rate it will take years (4 literally) before you can play Fortnite.",
          "events":[
              {"title":"OK","response":0}
          ]
      },
      {
          // 2
          "description":"you wait till dad gets home, and ask him, but dad works in the games industry and knows how compelling these monetised games can be, also he points out you are too young and the classification is for 12 year olds and up. So no dice kiddo.",
          "events":[
                {"title":"Dang","response":0},
              ]
      }    ]

  };
