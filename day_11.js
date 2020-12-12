// Shared
const input = document.querySelector('pre').innerText.trim()

const map = input.replace(/\n/g, '').split('')

const width = input.split('\n')[0].length
const height = input.split('\n').length

const getIndex = (x, y) => {
  if (x < 0 || width <= x) return undefined
  if (y < 0 || height <= y) return undefined

  return y * width + x
}

// Part 1
const simulatePart1 = (map) => {
  const result = [...map]

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let filledSeatsAdjacent = 0

      for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
          if (dx === 0 && dy === 0) continue
    
          if (map[getIndex(x + dx, y + dy)] === '#') filledSeatsAdjacent++
        }
      }

      const tile = map[getIndex(x, y)]

      if (tile === 'L' && filledSeatsAdjacent === 0) result[getIndex(x, y)] = '#'
      if (tile === '#' && filledSeatsAdjacent >= 4) result[getIndex(x, y)] = 'L'
    }
  }

  return result
}

let lastMap = map
let stable = false

while (!stable) {
  const step = simulatePart1(lastMap)
  
  if (step.every((tile, index) => tile === lastMap[index])) stable = true

  lastMap = step
}

console.log(`There are ${lastMap.filter(tile => tile === '#').length} filled seats`)

// Part 2
const simulatePart2 = (map) => {
  const result = [...map]

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let filledSeatsAdjacent = 0

      for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
          if (dx === 0 && dy === 0) continue

          let lookDistance = 1

          while (map[getIndex(x + dx * lookDistance, y + dy * lookDistance)] === '.') lookDistance++
    
          if (map[getIndex(x + dx * lookDistance, y + dy * lookDistance)] === '#') filledSeatsAdjacent++
        }
      }

      const tile = map[getIndex(x, y)]

      if (tile === 'L' && filledSeatsAdjacent === 0) result[getIndex(x, y)] = '#'
      if (tile === '#' && filledSeatsAdjacent >= 5) result[getIndex(x, y)] = 'L'
    }
  }

  return result
}

lastMap = map
stable = false

while (!stable) {
  const step = simulatePart2(lastMap)
  
  if (step.every((tile, index) => tile === lastMap[index])) stable = true

  lastMap = step
}

console.log(`There are ${lastMap.filter(tile => tile === '#').length} filled seats in part 2`)
