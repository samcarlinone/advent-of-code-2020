// Part 1
const lineRegex = /(?<min>\d+)-(?<max>\d+) (?<letter>\w): (?<password>\w+)/

const groups = document.querySelector('pre').innerText.split('\n')
  .map(line => lineRegex.exec(line)?.groups)
  .filter(g => g)

function checkPassword(group) {
  const counts = {}
  
  group.password.split('')
    .forEach(letter => counts[letter] = (counts[letter] ?? 0) + 1)

  return +group.min <= counts[group.letter] && counts[group.letter] <= +group.max
}

const validCount = groups
  .map(checkPassword)
  .reduce((total, valid) => total + valid)

console.log(`There are ${validCount} valid passwords.`)

// Part 2
function checkPasswordPart2(group) {
  return (group.password[+group.min - 1] === group.letter) !== (group.password[+group.max - 1] === group.letter)
}

const validCountPart2 = groups
  .map(checkPasswordPart2)
  .reduce((total, valid) => total + valid)

console.log(`For part 2 there are ${validCountPart2} valid passwords.`)
