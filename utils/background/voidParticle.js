export default class Particle {
  growthRate = Math.random()/30;

  constructor(x, y, maxRadius, colourArr){
    this._x = x;
    this._y = y;
    this._maxRadius = maxRadius;
    this._radius = 0;
    this._colour = `rgb(${colourArr[0]}, ${colourArr[1]}, ${colourArr[2]})`;
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

  // get _growthRate(){
  //   return this._growthRate
  // }

  get colour(){
    return this._colour;
  }

  setRadius(frame){
    this._radius = Math.abs(this._maxRadius * Math.sin( Number(frame) * this.growthRate));
  }
}