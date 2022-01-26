const names = [ "Alba", "Alejandro", "Álvaro", "Ana", "Emma", "Lucas", "Lucía", "Manuel", "Mariana", "Martín", "Ana", "Enzo", "Eric", "Eva", "Hugo", "Iván", "Juan", "Lara", "Leo", "Luz", "Mar", "Nora", "Raúl", "Sara" ]
import { getNewBatery, getDistanceToMove, getDistanceToMark } from './movement';
const { v4: uuidv4 } = require('uuid');


class Bot {
  private id:number;
  private name:string;
  private battery:number;
  private position:{
    x:number,
    y:number
  };
  private status:string;
  private distanceToFinish:number;

  constructor(size:Array<number>) {
    this.id = uuidv4();
    this.name = names[Math.round(Math.random()*(names.length-1))];
    this.battery = 100;
    this.position = {
      x: Math.floor(Math.random() * (size[0] + 1)),
      y: Math.floor(Math.random() * (size[1] + 1))
    };
    this.status = 'normal';
    this.distanceToFinish = -1;
  }

  async run(mark:Array<number>) {
    let isInTheMark:boolean = false;
    let distanceToMark:number = 0;

    while(!isInTheMark) {
      if(this.battery <= 0) {
        this.battery = 0;
        await this.sleep(6000);
        this.battery = 100;
      }

      this.battery -= getNewBatery()

      let distanceToMove = getDistanceToMove();
      
      distanceToMark = getDistanceToMark(mark, this.position.x, this.position.y);

      if (distanceToMark < distanceToMove) {
        distanceToMove = distanceToMark;
      }

      let angle = Math.atan2(mark[1] - this.position.y, mark[0] - this.position.x);
      this.position.x += Math.cos(angle) * distanceToMove;
      this.position.y += Math.sin(angle) * distanceToMove;

      let newDistanceToMark = getDistanceToMark(mark, this.position.x, this.position.y);
      this.distanceToFinish = newDistanceToMark;

      if(this.position.x == mark[0] && this.position.y == mark[1]) {
        isInTheMark = true;
      }

      await this.sleep(1000)
    }
    
  }

  private sleep(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getId() {
    return this.id;
  }

  getPosition() {
    return this.position;
  }

  getBatery() {
    return this.battery;
  }

  getName() {
    return this.name;
  }

  getDistanceToFinish() {
    return this.distanceToFinish;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status:string) {
    this.status = status;
  }

}

function initialBots():number {
  return Math.round(Math.random() * (10 - 5) + 5 )
}

function generateBot(max_x:number, max_y:number):Bot {
  return new Bot([max_x, max_y]);
}

export { initialBots, generateBot, Bot }