function isAlike(str, qu) {
  if (str.length !== qu.length) {
    return
  }
  const arr = qu.split('')
  const arr2 = []
  for (let i = 0; i < str.length; i++) {
    arr.forEach((item) => {
      if (item === str[i]) {
        arr2.push(item)
      }
    })
  }
  return arr.length === arr2.length
}

function aa(arr) {
  let arr2 = []
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    let arr3 = []
    for (let j = i + 1; j < arr.length; j++) {
      if (isAlike(arr[i], arr[j])) {
        arr3.push(arr[j])
        arr.splice(j, 1)
        obj[arr[i]] = arr3
      } else {
        obj[arr[j]] = [arr[j]]
      }
    }
  }

  let obj2 = Object.keys(obj)
  let arr4 = []
  obj2.forEach((item) => {
    if (obj[item]) {
      arr4.push([...new Set([...obj[item], item])])
    }
  })
  return arr2
}
console.log(aa(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))

// console.log(isAlike('atef', 'tea'))
