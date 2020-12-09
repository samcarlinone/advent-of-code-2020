// Shared
const input = document.querySelector('pre').innerText.trim()

const lines = input.split('\n').map(n => +n)

// Part 1
const findInvalidNumber = (preamble, numbers) => {
  const sumSet = {}
  const sumList = []

  const addToSums = n => {
    sumList.forEach(p => sumSet[p + n] = (sumSet[p + n] ?? 0) + 1)
    sumList.push(n)
  }

  const removeFromSums = () => {
    const n = sumList.shift()
    sumList.forEach(p => sumSet[p + n] -= 1)
  }

  preamble.forEach(addToSums)

  for (let number of numbers) {
    if (!sumSet[number]) return number

    removeFromSums()
    addToSums(number)
  }

  throw 'No Invalid Number Found'
}

const preambleSize = 25
const preamble = lines.slice(0, preambleSize)
const numbers = lines.slice(preambleSize)

const invalid = findInvalidNumber(preamble, numbers)

console.log(`The invalid numbers is ${invalid}`)

// Part 2
const findRangeWithSum = (targetSum) => {
  for (let chunkSize = 2; chunkSize < lines.length; chunkSize++) {
    let runningSum = 0
  
    for (let i = 0; i < chunkSize; i++) {
      runningSum += lines[i]
    }
  
    for (let i = 0; i < lines.length - chunkSize; i++) {
      if (runningSum === targetSum) return [i, i + chunkSize]
      runningSum -= lines[i]
      runningSum += lines[i + chunkSize]
    }
  }

  throw 'Target Sum Not Found'
}

const [start, end] = findRangeWithSum(invalid)
const range = lines.slice(start, end)

const min = range.reduce((t, c) => Math.min(t, c))
const max = range.reduce((t, c) => Math.max(t, c))

console.log(`The sum of the min and max in the range is ${min + max}`)
