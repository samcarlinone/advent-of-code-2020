// Shared
const binWalk = (n, moves) => {
  let low = 0
  let high = n
  let pointer = Math.floor(n / 2)

  for (let move of moves) {
    if (move === 1) high = pointer
    if (move === -1) low = pointer

    pointer = Math.floor((high - low) / 2) + low
  }

  return pointer
}

const getIndex = pass => {
  const row = binWalk(128, pass.slice(0, 7).split('').map(c => c === 'F' ? 1 : -1))
  const column = binWalk(8, pass.slice(7).split('').map(c => c === 'L' ? 1 : -1))

  return row * 8 + column
}

// Part 1
const input = document.querySelector('pre').innerText.trim()
const ids = input.split('\n').map(getIndex)

const highestId = ids.reduce((h, c) => Math.max(h, c), 0)

console.log(`The highest ID is ${highestId}`)

// Part 2
const map = {}

ids.forEach(index => map[index] = true)

for (let i = 0; i < highestId; i++) {
  if (!map[i] && (map[i - 1] && map[i + 1])) {
    console.log(`The missing ID is ${i}`)
    break
  }
}