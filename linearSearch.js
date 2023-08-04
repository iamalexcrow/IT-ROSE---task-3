let randomPoint = {
  "x": Math.floor(Math.random() * 100),
  "y": Math.floor(Math.random() * 100),
  "z": Math.floor(Math.random() * 100)
}

let startingPoint = {
  x: 50,
  y: 50,
  z: 50,
};

const searchPoints = [];

function findDistance(s, r) {
  const deltaX = r.x - s.x;
  const deltaY = r.y - s.y;
  const deltaZ = r.z - s.z;
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);
  searchPoints.push(r);
  return distance;
}

function searchAlgorithm() {
  let maxDistance = findDistance(randomPoint, startingPoint)

  Object.keys(startingPoint).forEach((key) => {

    const coordinateUp = Object.assign({},startingPoint,{[key]:startingPoint[key]+1});
    const coordinateDown = Object.assign({},startingPoint,{[key]:startingPoint[key]-1});
    const distanceUp = findDistance(randomPoint, coordinateUp);
    const distanceDown = findDistance(randomPoint, coordinateDown);

    if(distanceUp === distanceDown) {
      return
    } else {
      let operand;
      let obj;
      let current
      
      if (distanceUp < distanceDown) {
        operand = 1;
        obj = coordinateUp;
        current = distanceUp;
      } else {
        operand =-1;
        obj = coordinateDown;
        current = distanceDown;
      }
      while (current < maxDistance) {
        maxDistance = current;
        startingPoint = obj;
        obj = Object.assign({},obj,{[key]:obj[key]+operand})
        current = findDistance(randomPoint, obj);
      }
    }
  })
  return {
    "result": {
      "random_point": startingPoint,
      "search_points": searchPoints,
      "calls": searchPoints.length,
    },
  };
}
searchAlgorithm();
