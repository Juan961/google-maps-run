function getNewBatery():number {
  return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
}

function getDistanceToMove():number {
  return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
}

function getDistanceToMark(mark:Array<number>, position_x:number, position_y:number):number {
  return Math.sqrt(Math.pow(mark[0] - position_x, 2) + Math.pow(mark[1] - position_y, 2));
}

export { getNewBatery, getDistanceToMove, getDistanceToMark };