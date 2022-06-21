function strChange(title) {
  return title.split(' ').join('-').toLowerCase();
}
const resultStr = strChange('Hello-Books Sword A World');
console.log(resultStr)

function arrChange(arr) {
  let reg = /^\d+$/;
  return arr.map(item => {
    if (reg.test(item)) {
      return item * item
    }
  }).sort((a, b) => b - a).filter(item => item);
}

const result = arrChange([-5, 8.8, 2, 3, -3.9, 9, 4]);
console.log(result)

const tempFn = async () => {
  const [data] = await axios.get('/itemlist.json')
}
