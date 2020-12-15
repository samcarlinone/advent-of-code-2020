// Shared
const input = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`
// const input = document.querySelector('pre').innerText.trim()

// Part 1
const applyBitmask = (n, bitmask) => [...n.padStart(36, '0')].map((original, index) => bitmask[index] === 'X' ? original : (bitmask[index] === '1' ? '1' : '0')).join('')

let mask = ''
let mem = {}

input.split('\n').forEach(line => {
  if (line.indexOf('mask') === 0) {
    mask = line.split('=')[1].trim()
  } else {
    const [location, value] = /mem\[(\d+)\] = (\d+)/.exec(line).slice(1, 3)
    mem[+location] = Number.parseInt(applyBitmask((+value).toString(2), mask), 2)
  }
})

console.log(`Part 1 sum of memory = ${Object.values(mem).reduce((t, c) => t + c)}`)

// Part 2
const getAllAddresses = (n, bitmask) => {
  const base = (+n).toString(2).padStart(36, '0')
  
  let results = ['']

  for (let i = 0; i < 36; i++) {
    if (bitmask[i] === '0') results = results.map(r => r + base[i])
    if (bitmask[i] === '1') results = results.map(r => r + '1')

    if (bitmask[i] === 'X') results = [...results.map(r => r + '0'), ...results.map(r => r + '1')]
  }

  return results
}

mask = ''
mem = {}

input.split('\n').forEach(line => {
  if (line.indexOf('mask') === 0) {
    mask = line.split('=')[1].trim()
  } else {
    const [location, value] = /mem\[(\d+)\] = (\d+)/.exec(line).slice(1, 3)

    console.log(location, mask)
    
    getAllAddresses(location, mask)
      .map(l => Number.parseInt(l, 2))
      .forEach(l => mem[l] = +value)
  }
})

console.log(`Part 2 sum of memory = ${Object.values(mem).reduce((t, c) => t + c)}`)
