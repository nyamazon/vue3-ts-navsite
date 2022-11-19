const patt = /^1$/;
const msgStr = '1';
console.log(!patt.test(msgStr));
console.log(msgStr.length > 1);
if (msgStr.length > 1 || !patt.test(msgStr)) {
  console.log('enter');
  return;
}
console.log('failed');
