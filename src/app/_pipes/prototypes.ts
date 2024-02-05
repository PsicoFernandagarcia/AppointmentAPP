export{};
declare global{

  interface Date {
    equalTo(compareTo:Date): boolean;
    diffInHours(compareTo:Date):number;
    isBetweenOneHour():boolean;
  }

  interface String{
    removeAccents(): string;
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
Date.prototype.isBetweenOneHour = function(){
  const now = new Date();
  if (now.getFullYear() !== this.getFullYear()) return false;
  if (now.getMonth() !== this.getMonth()) return false;
  if (now.getDate() !== this.getDate()) return false;
  return Math.abs(now.getHours() - this.getHours()) <= 1;
}

String.prototype.removeAccents = function() {
    return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

