// Shared
const input = document.querySelector('pre').innerText.trim()

const passports = input.split('\n\n')
  .map(s => s.split(/[ ]|\n/g)
    .reduce((pass, pair) => {
      const [key, value] = pair.split(':')
      pass[key] = value
      return pass
    }, {})
  )

// Part 1
const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
]

const validPassports = passports.reduce((total, pass) => {
  return (requiredFields.every(field => pass[field]) ? 1 : 0) + total
}, 0)

console.log(`Part 1 has ${validPassports} valid passports`)

// Part 2
const requiredFields2 = [
  ['byr', (year) => 1920 <= +year && +year <= 2002],
  ['iyr', (year) => 2010 <= +year && +year <= 2020],
  ['eyr', (year) => 2020 <= +year && +year <= 2030],
  ['hgt', (height) => {
    const num = +height.slice(0, -2)
    
    if (height.slice(-2) === 'cm') return 150 <= num && num <= 193
    if (height.slice(-2) === 'in') return 59 <= num && num <= 76

    return false
  }],
  ['hcl', (color) => /^#[0-9a-f]{6}$/.test(color)],
  ['ecl', (code) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(c => c === code)],
  ['pid', (id) => /^[0-9]{9}$/.test(id)],
]

const validPassports2 = passports.reduce((total, pass) => {
  return (requiredFields2.every(([field, validator]) => (pass[field] && validator(pass[field]))) ? 1 : 0) + total
}, 0)

console.log(`Part 2 has ${validPassports2} valid passports`)

