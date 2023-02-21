export{};
declare global{

  interface Date {
    equalTo(compareTo:Date): boolean;
    diffInHours(compareTo:Date):number;
  }
}

// Add the implementation
Date.prototype.equalTo = function (compareTo:Date) {
  return this.getFullYear() === compareTo.getFullYear()
  && this.getMonth() === compareTo.getMonth()
  && this.getDate() === compareTo.getDate()
};

Date.prototype.diffInHours = function( compareTo: Date){
  var diff =(this.getTime() - compareTo.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}
