export{};
declare global{

  interface Date {
    equalTo(compareTo:Date): boolean;
  }
}

// Add the implementation
Date.prototype.equalTo = function (compareTo:Date) {
  return this.getFullYear() === compareTo.getFullYear()
  && this.getMonth() === compareTo.getMonth()
  && this.getDate() === compareTo.getDate()
};
