// Shared
const source = document.querySelector('pre').innerText.trim()

const map = source.replace(/\n/g, '').split('')

const width = source.split('\n')[0].length
const height = source.split('\n').length

const posToIndex = (x, y) => y * width + (x % width)

const countTrees = (dx, dy) => {
  let x = 0
  let y = 0
  let trees = 0

  while(y < height) {
    x += dx
    y += dy

    if (map[posToIndex(x, y)] === '#') trees++
  }

  return trees
}

// Part 1
console.log(`You hit ${countTrees(3, 1)} trees`)

// Part 2
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]

const treeCounts = []

for (let [dx, dy] of slopes) {
  treeCounts.push(countTrees(dx, dy))
}

console.log(`Product of all routes is ${treeCounts.reduce((t, c) => t * c)}`)
