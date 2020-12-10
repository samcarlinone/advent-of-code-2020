// Shared
const input = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`
// const input = document.querySelector('pre').innerText.trim()

const lines = input.split('\n').map(s => +s)

const sortedLines = lines.slice().sort((a, b) => a - b)

// Part 1
let differences = [0, 0, 0, 1] // (Don't forget the device difference)
differences[sortedLines[0]]++  // (and the wall adapter difference)

for (let i = 0; i < sortedLines.length - 1; i++) {
  differences[sortedLines[i + 1] - sortedLines[i]]++
}

console.log(`1 differences x 3 differences = ${differences[1] * differences[3]}`)

// Part 2
const memo = {}

function memoizedCount(index, lastJoltage) {
  let outer = memo[index]

  if (outer && outer[lastJoltage]) return outer[lastJoltage]

  outer = memo[index] = {}

  return outer[lastJoltage] = countConfigurations(index, lastJoltage)
}

function countConfigurations(index, lastJoltage) {
  let count = 0

  if (index === sortedLines.length - 1) return sortedLines[index - 1] - lastJoltage <= 3 ? 1 : 0

  if (sortedLines[index] - lastJoltage <= 3)
    count += memoizedCount(index + 1, sortedLines[index])

  if (index === sortedLines.length - 2) return count + (sortedLines[index - 2] - lastJoltage <= 3 ? 1 : 0)

  if (sortedLines[index + 1] - lastJoltage <= 3)
    count += memoizedCount(index + 2, sortedLines[index + 1])

  if (index === sortedLines.length - 3) return count + (sortedLines[index - 3] - lastJoltage <= 3 ? 1 : 0)

  if (sortedLines[index + 2] - lastJoltage <= 3)
    count += memoizedCount(index + 3, sortedLines[index + 2])

  return count
}

console.log(`Total possible configurations = ${memoizedCount(0, 0)}`)
