// Shared
const input = document.querySelector('pre').innerText.trim()

const parseLine = (line) => {
  const [outer, contained] = line.replace(/bags?/g, '').split('contain').map(s => s.trim())

  return [outer, contained.replace('.', '').split(',').map(s => {
    const split = s.trim().split(' ')

    return {
      count: +split[0],
      name: split.slice(1).join(' ').trim()
    } 
  })]
}

const bags = {}

input.split('\n').forEach(line => {
  const [outer, contained] = parseLine(line)
  bags[outer] = contained
})

// Part 1
function containsShiny(bag) {
  if (bag.name === 'other' || bag.name === undefined) return 0
  if (bag.name === 'shiny gold') return 1

  return bags[bag.name].map(containsShiny).reduce((t, i) => t + i)
}

const count = Object.keys(bags).map(name => containsShiny({name})).map(c => Math.min(c, 1)).reduce((t, c) => t + c)

console.log(`${count - 1} shiny gold carrying bags`)

// Part 2
function countInside(bag) {
  if (bag === undefined || bag.name === 'other') return 0

  return bags[bag.name].map(countInside).reduce((t, c) => t + c) * bag.count + bag.count
}

console.log(`${countInside({name: 'shiny gold', count: 1}) - 1} bags inside your shiny gold one`)
