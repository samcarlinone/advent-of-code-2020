// Shared
const input = document.querySelector('pre').innerText.trim()

const lines = input.split('\n').map(line => [line.split(' ')[0], +line.split(' ')[1]])

// Part 1
let accumulator = 0
let instructionPointer = 0
let visited = {}

while (!visited[instructionPointer]) {
  visited[instructionPointer] = true

  const [instruction, value] = lines[instructionPointer]

  if (instruction === 'jmp') {
    instructionPointer += value
    continue
  }

  if (instruction === 'acc') accumulator += value
  instructionPointer++
}

console.log(`Final accumulator value ${accumulator}`)

// Part 2
let instances = [
  {
    accumulator: 0,
    instructionPointer: 0,
    visited: {},
  }
]

while(instances.length) {
  const instance = instances.shift()

  while(!instance.visited[instance.instructionPointer] && instance.instructionPointer !== lines.length) {
    instance.visited[instance.instructionPointer] = true

    const [instruction, value] = lines[instance.instructionPointer]

    if (instruction === 'jmp') {
      if (!instance.fixed) instances.push({...instance, visited: {...instance.visited}, instructionPointer: instance.instructionPointer + 1, fixed: true})

      instance.instructionPointer += value
      continue
    }

    if (instruction === 'acc') instance.accumulator += value

    if (instruction === 'nop' && !instance.fixed) instances.push({...instance, visited: {...instance.visited}, instructionPointer: instance.instructionPointer + value, fixed: true})

    instance.instructionPointer++
  }

  if (instance.instructionPointer === lines.length) {
    console.log(`Final accumulator value for fixed program ${instance.accumulator}`)
    break
  }
}
