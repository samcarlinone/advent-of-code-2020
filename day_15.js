// Shared
const input = '16,11,15,0,1,7'
const lines = input.split(',').map(s => +s)

const findNthNumber = (target) => {
  // For part 2 you want the increased performance of Map over the regular JS Object
  const numbers = new Map()

  lines.slice(0, -1).forEach((n, turn) => numbers.set(n, turn + 2))

  let lastN = lines.slice(-1)[0]

  for (let i = lines.length + 1; i <= target; i++) {
    const lastSeen = numbers.get(lastN)
    numbers.set(lastN, i)

    if (lastSeen === undefined) lastN = 0
    else lastN = i - lastSeen
  }

  return lastN
}

// Part 1
console.log(`2020th number is ${findNthNumber(2020)}`)

// Part 2
console.log(`30000000th number is ${findNthNumber(30000000)}`)
