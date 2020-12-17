// Shared
const input = document.querySelector('pre').innerText.trim()

// Part 1
const [rulesString, yourString, nearbyString] = input.split('\n\n')

const rules = rulesString.split('\n')
  .map(line => 
    /\w+: (\d+-\d+) or (\d+-\d+)/.exec(line)
      .slice(1, 3)
      .map(range => range.split('-').map(n => +n))
  )
  .flat()

// (Assume only one error per ticket)
const invalidNearby = nearbyString.split('\n')
  .slice(1)
  .map(line => line.split(',').map(n => +n))
  .map(ticket => ticket.find(n => rules.every(([start, end]) => n < start || end < n)) ?? 0)
  .reduce((t, e) => t + e)

console.log(`Part 1 invalid ticket count: ${invalidNearby}`)

// Part 2
const namedRules = rulesString.split('\n')
  .map(line => {
    const [_, name, range1, range2] = /([ \w]+): (\d+-\d+) or (\d+-\d+)/.exec(line)
    const [startR1, endR1] = range1.split('-').map(n => +n)
    const [startR2, endR2] = range2.split('-').map(n => +n)
    return { name, startR1, endR1, startR2, endR2 }
  })
  
const validTickets = nearbyString.split('\n')
  .slice(1)
  .map(line => line.split(',').map(n => +n))
  .filter(ticket => ticket.every(n => rules.some(([start, end]) => start <= n && n <= end)))

const possibleRules = new Array(validTickets[0].length).fill(0)
  .map((_, i) => {
    const rules = namedRules
      .filter(({startR1, endR1, startR2, endR2}) => validTickets.every(ticket => (startR1 <= ticket[i] && ticket[i] <= endR1) || (startR2 <= ticket[i] && ticket[i] <= endR2)))

    return {
      index: i,
      rules,
    }
  })

const mappedRules = []

// Quick and dirty way to reduce down our options
while (true) {
  let stable = true

  for (let i = 0; i < possibleRules.length; i++) {
    if (possibleRules[i].rules.length === 1) {
      const {index, rules} = possibleRules.splice(i, 1)[0]
      const determinedRule = rules[0]

      for (let undeterminedRule of possibleRules) undeterminedRule.rules = undeterminedRule.rules.filter(r => r.name !== determinedRule.name)

      mappedRules[index] = determinedRule

      stable = false
      break
    }
  }

  if (stable) break
}

const yourTicket = yourString.split('\n')[1].split(',').map(n => +n)
const yourProduct = yourTicket.filter((_, i) => mappedRules[i].name.indexOf('departure') === 0).reduce((t, n) => t * n)

console.log(`Part 2 product of your depature fields: ${yourProduct}`)

