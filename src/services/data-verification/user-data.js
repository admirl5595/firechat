export function verifyFName(fName) {
  var hasNum = /\d/;

  return fName.length > 0 && !hasNum.test(fName);
}

export function verifyLName(lName) {
  var hasNum = /\d/;

  return lName.length > 0 && !hasNum.test(lName);
}
