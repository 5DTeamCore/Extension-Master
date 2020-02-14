export default (obj, path) => {
  const pathSplit = path.split('.');
  let parseObj = obj;
  for (let i = 0; i < pathSplit.length; i++) {
    if (parseObj[pathSplit[i]]) {
      parseObj = parseObj[pathSplit[i]];
    } else {
      return undefined;
    }
  }
  return parseObj;
}