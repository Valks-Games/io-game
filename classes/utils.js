module.exports = class Utils {
  // Returns the length of a object {}.
  static objectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
}