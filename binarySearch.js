let randomPoint = {
  x: Math.floor(Math.random() * 100),
  y: Math.floor(Math.random() * 100),
  z: Math.floor(Math.random() * 100),
};

let startingPoint = {
  x: 50,
  y: 50,
  z: 50,
};

// TO KEEP TRACK OF THE CALLS
const searchPoints = [];

// ROUND UP OR ROUND DOWN THE FINAL RESULT
function customRound(number) {
  const decimalPart = number - Math.floor(number);
  if (decimalPart >= 0.5) {
    return Math.ceil(number);
  } else {
    return Math.floor(number);
  }
}

// SEACRCH FUNCTION
function findDistance(s, r) {
  const deltaX = r.x - s.x;
  const deltaY = r.y - s.y;
  const deltaZ = r.z - s.z;
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);
  searchPoints.push(r);
  return distance;
}

// SEARCH ALGORITHM
function searchAlgorithm() {
  //STEP 1 - DETERMINE THE CURRENT DISTANCE FROM OUR POINT TO THE RANDOM POINT
  let maxDistance = findDistance(randomPoint, startingPoint);
  // IF DISTANCE IS 0 - WE ARE LUCKY - WE FOUND THE RANDOM POINT
  //  OTHERWISE WE START THE SEARCH
  if (maxDistance) {
    //FOR EACH COORDINATE WE DO THE FOLLOWING:
    Object.keys(startingPoint).forEach((key) => {
      //WE DECLARE SOME VARIABLES FOR EACH ITERATION
      let currentObj = Object.assign({}, startingPoint);
      let currentDist = maxDistance;
      let min = 0;
      let max = 100;

      //SINCE WE IMPLEMENT BINARY SEARCH WE IMPLEMENT A LOOP - 7 times should be enough to find the coordinate of a random point
      for (let i = 0; i < 7; i++) {
        // WE CREATE TWO COPIES OF THE CURRENT OBJ. WE MODIFY THE CURRENT KEY OF THE FIRST OBJECT BY GOING HALFWAY UP, IN THE SECOND ONE WE MODIFY THE KEY BY GOING HALFWAY DOWN
        const coordinateUp = Object.assign({}, currentObj, { [key]: (currentObj[key] + max) / 2 });
        const coordinateDown = Object.assign({}, currentObj, { [key]: (currentObj[key] + min) / 2 });
        // WE USE OUR DISTANCE FUNCTION TO CALCULATE DISTANCE BETWEEN OUR RANDOM POINT AND OUR NEW OBJECTS
        const distanceUp = findDistance(randomPoint, coordinateUp);
        const distanceDown = findDistance(randomPoint, coordinateDown);

        // IF OUR CURRENT DISTANCE IS SMALLER THAN DISTANCES FROM NEW OBJECTS - WE UPDATE MIN AND MAX VALUES AND MOVE TO THE NEXT CYCLE
        if (currentDist < distanceUp && currentDist < distanceDown) {
          if (distanceUp < distanceDown) {
            min = coordinateDown[key];
            max = coordinateUp[key];
          } else {
            max = coordinateUp[key];
            min = coordinateDown[key];
          }
          // OTHERWISE WE COMPARE WHAT OBJECT THE DISTANCE IS SMALLER, WE UPDATE MIN, MAX CURRENT OBJ, CURRENT DIST VALUES AND MOVE TO THE NEXT CYCLE
        } else {
          if (distanceUp < distanceDown) {
            min = currentObj[key];
            currentObj = coordinateUp;
            currentDist = distanceUp;
          } else {
            max = currentObj[key];
            currentDist = distanceDown;
            currentObj = coordinateDown;
          }
        }
      }
      // REMOVE DECIMALS FOR THE FOUND COORDINATES
      startingPoint = Object.assign(currentObj, {
        [key]: customRound(currentObj[key]),
      });
    });
  }

  // RETURN RESULT IN THE REWUESTED FORMAT
  return {
    "result": {
      "random_point": startingPoint,
      "search_points": searchPoints,
      "calls": searchPoints.length,
    },
  };
}

searchAlgorithm();
