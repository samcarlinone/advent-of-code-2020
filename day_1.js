// Part 1
const numbers = document.querySelector('pre').innerText
  .split('\n')
  .map(n => Number.parseInt(n))

const pair1 = numbers.find(n1 => numbers.some(n2 => n1 + n2 === 2020))
const pair2 = 2020 - pair1

console.log('Survey says')
console.log(pair1 * pair2)

// Part 2
function findTripleProduct(list, targetSum) {
  for (let i = 0; i < numbers.length - 2; i++) {
    for (let j = i + 1; j < numbers.length - 1; j++) {
      for (let k = j + 1; k < numbers.length; k++) {
        if (list[i] + list[j] + list[k] === targetSum) return list[i] * list[j] * list[k]
      }
    }
  }

  throw new Error(`Target sum ${targetSum} not found`)
}

console.log('Round 2')
console.log(findTripleProduct(numbers, 2020))
