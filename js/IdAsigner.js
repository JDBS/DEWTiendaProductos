
class IdAsigner{
  constructor(){
    this.lastId=0;
  }

  getId(){
    this.lastId++;
    return this.lastId;
  }
}

var idAsigner=new IdAsigner();