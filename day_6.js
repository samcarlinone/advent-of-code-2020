// Shared
const input = document.querySelector('pre').innerText.trim()

// Part 1
const countGroup = (group) => {
  const map = {}

  group.split('\n').forEach(line => line.split('').forEach(question => map[question] = true))

  return Object.keys(map).length
}

const count = input.split('\n\n').map(countGroup).reduce((t, c) => t + c)

console.log(`Sum of groups with some yes ${count}`)

// Part 2
const countGroup2 = (group) => {
  const map = {}

  group.split('\n').forEach(line => line.split('').forEach(question => map[question] = (map[question] ?? 0) + 1))

  return Object.values(map).filter(item => item === group.split('\n').length).length
}

const count2 = input.split('\n\n').map(countGroup2).reduce((t, c) => t + c)

console.log(`Sum of groups with all yes ${count2}`)
