let n = 20
let m = 4
let arr  = [3, 7, 8, 4]
let lengthArr = []
arr.forEach(ele => {
  switch (ele) {
    case 1:
      return lengthArr.push({ 1: 2 })
    case 2:
      return lengthArr.push({ 2: 5 })
    case 3:
      return lengthArr.push({ 3: 3 })
    case 4:
      return lengthArr.push({ 4: 4 })
    case 5:
      return lengthArr.push({ 5: 5 })
    case 6:
      return lengthArr.push({ 6: 6 })
    case 7:
      return lengthArr.push({ 7: 3 })
    case 8:
      return lengthArr.push({ 8: 7 })
    case 9:
      return lengthArr.push({ 9: 6 })
  }
})
console.log(lengthArr)
for (let index = 0; index < lengthArr.length; index++) {
  let obj = lengthArr[index]
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key]
      if (element > lengthArr[]) {}
    }
  }
  
}
