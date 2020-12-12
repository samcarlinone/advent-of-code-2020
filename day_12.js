// Shared
const input = document.querySelector('pre').innerText.trim()

const DEG2RAD = Math.PI / 180

// Part 1
const actions = {
  N: (ship, dist) => ({y: ship.y + dist}),
  S: (ship, dist) => ({y: ship.y - dist}),
  E: (ship, dist) => ({x: ship.x + dist}),
  W: (ship, dist) => ({x: ship.x - dist}),
  L: (ship, dist) => ({heading: ship.heading + dist}),
  R: (ship, dist) => ({heading: ship.heading - dist}),
  F: (ship, dist) => ({
      x: ship.x + Math.cos(ship.heading * DEG2RAD) * dist,
      y: ship.y + Math.sin(ship.heading * DEG2RAD) * dist,
  })
}

let ship = { x: 0, y: 0, heading: 0 }

input.split('\n')
  .forEach(line => ship = {...ship, ...actions[line[0]](ship, +line.slice(1))})

console.log(`Part 1 Manhattan distance ${Math.round(Math.abs(ship.x) + Math.abs(ship.y))}`)

// Part 2
const actions2 = {
  N: (ship, dist) => ({waypointY: ship.waypointY + dist}),
  S: (ship, dist) => ({waypointY: ship.waypointY - dist}),
  E: (ship, dist) => ({waypointX: ship.waypointX + dist}),
  W: (ship, dist) => ({waypointX: ship.waypointX - dist}),
  L: (ship, dist) => ({
    waypointX: Math.cos(dist * DEG2RAD) * ship.waypointX - Math.sin(dist * DEG2RAD) * ship.waypointY,
    waypointY: Math.sin(dist * DEG2RAD) * ship.waypointX + Math.cos(dist * DEG2RAD) * ship.waypointY,
  }),
  R: (ship, dist) => ({
    waypointX: Math.cos(-dist * DEG2RAD) * ship.waypointX - Math.sin(-dist * DEG2RAD) * ship.waypointY,
    waypointY: Math.sin(-dist * DEG2RAD) * ship.waypointX + Math.cos(-dist * DEG2RAD) * ship.waypointY,
  }),
  F: (ship, dist) => ({
    x: ship.x + dist * ship.waypointX,
    y: ship.y + dist * ship.waypointY,
  }),
}

let ship2 = { x: 0, y: 0, waypointX: 10, waypointY: 1 }

input.split('\n')
  .forEach(line => ship2 = {...ship2, ...actions2[line[0]](ship2, +line.slice(1))})

console.log(`Part 2 Manhattan distance ${Math.round(Math.abs(ship2.x) + Math.abs(ship2.y))}`)
