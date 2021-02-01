module.exports = function check(str, bracketsConfig) {
  let counters = new Object();
  bracketsConfig.map(el => el[0] === el[1] ? counters[el[0]] = 0 : el);
  let newBracketsConfig = bracketsConfig.map(el => el[0] === el[1] ? el.map((e, i) => i === 1 ? e.repeat(2) : e) : el);
  let open = new Set(newBracketsConfig.map(newBracketsConfig => newBracketsConfig[0]));
  let close = new Set(newBracketsConfig.map(newBracketsConfig => newBracketsConfig[1]));
  let relevant = newBracketsConfig.reduce((acc, [open, close]) => ({ ...acc, [close]: open }), {});
  let stack = [];
  for (let char of str) {
    if (char in counters && counters[char] === 0) {
      counters[char] = 1;
    } else if (char in counters && counters[char] === 1) {
      counters[char] = 0;
      char = char.repeat(2);
    }
    if (open.has(char)) {
      stack.push(char);
    }
    if (close.has(char)) {
      if (relevant[char] !== stack.pop()) return false;
    }
  }

  return stack.length === 0;
};
