export default class Particle {

  constructor(x, y, maxRadius, colour){
    this._x = x;
    this._y = y;
    this._maxRadius=maxRadius;
    this._radius = 0;
    this._colour = colour;
  }

  get x(){
    return this._x;
  }
  get y(){
    return this._y;
  }
  get radius(){
    return this._radius;
  }
  set radius(radius){
    this._radius = radius;
  }
  get maxRadius(){
    return this._maxRadius;
  }
  get colour(){
    return this._colour;
  }
  set colour(colour){
    this._colour=colour;
  }

}