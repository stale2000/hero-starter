/* 

  The only function that is required in this file is the "move" function

  You MUST export the move function, in order for your code to run
  So, at the bottom of this code, keep the line that says:

  module.exports = move;

  The "move" function must return "North", "South", "East", "West", or "Stay"
  (Anything else will be interpreted by the game as "Stay")
  
  The "move" function should accept two arguments that the website will be passing in: 
    - a "gameData" object which holds all information about the current state
      of the battle

    - a "helpers" object, which contains useful helper functions
      - check out the helpers.js file to see what is available to you

    (the details of these objects can be found on javascriptbattle.com/rules)

  This file contains four example heroes that you can use as is, adapt, or
  take ideas from and implement your own version. Simply uncomment your desired
  hero and see what happens in tomorrow's battle!

  Such is the power of Javascript!!!

*/

//TL;DR: If you are new, just uncomment the 'move' function that you think sounds like fun!
//       (and comment out all the other move functions)




// The "stale2000 Assassin"
// This hero will attempt to kill the closest weaker enemy hero.
// also it heals nearby allies
// also it will always kill an enemy if able
// also it prioritizes not dieing
var move = function(gameData, helpers) {
  var myHero = gameData.activeHero;
  //Get stats on the nearest health well
  var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
    if (boardTile.type === 'HealthWell') {
      return true;
    }
  });
  var distanceToHealthWell = healthWellStats.distance;
  var directionToHealthWell = healthWellStats.direction;

  // get stats for nearest ally
  var allyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team === myHero.team;
  });

  // get stats for nearest enemy
  var enemyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team !== myHero.team;
  });

  if (myHero.health <= 30 && distanceToHealthWell === 1) {
    //Always heal if you are about to die and can stop it
     return directionToHealthWell;
  }

  // If you can kill an enemy then kill it
  if (enemyStats.distance === 1 && (enemyStats.health <= 30 || enemyStats.health <= myHero.health))
  {
    return enemyStats.direction;
  }

  // If near an ally, heal them
  if (allyStats.distance === 1 && allyStats.health < 100)
  {
    return allyStats.direction;
  }

  if (myHero.health < 100 && distanceToHealthWell <= 2) {
    //Heal if you aren't full health and are close to a health well already
     return directionToHealthWell;
  }
  if (myHero.health < 60) {
    return helpers.findNearestHealthWell(gameData);
  } else {
	if (helpers.findNearestWeakerEnemy(gameData) != undefined) {
      return helpers.findNearestWeakerEnemy(gameData);
    }else {
      return helpers.findNearestEnemy(gameData);
    }
  }
};



// Export the move function here
module.exports = move;
