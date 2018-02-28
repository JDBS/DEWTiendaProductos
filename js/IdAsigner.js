
class IdAsigner{
  constructor(){
    this.lastId=0;
  }

  getId(){
    this.lastId++;
    console.log(this.lastId);
    return this.lastId;
  }
}

var idAsigner=new IdAsigner();