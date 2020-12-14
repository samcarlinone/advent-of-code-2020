// Shared
const input = document.querySelector('pre').innerText.trim()

// Part 1
const arrival = +input.split('\n')[0]

const busses = input.split('\n')[1].split(',')
  .filter(bus => bus !== 'x')
  .map(bus => +bus)

const checkTime = (arrival, busId) => busId - (arrival % busId)

const shortestWait = busses.reduce((smallest, busId) => Math.min(checkTime(arrival, busId), smallest), Number.MAX_SAFE_INTEGER)
const shortestBusId = busses.find(busId => checkTime(arrival, busId) === shortestWait)

console.log(`Part 1 result is ${shortestWait * shortestBusId}`)

// Part 2
// (Adapted from the mathematics here: https://math.stackexchange.com/questions/2218763/how-to-find-lcm-of-two-numbers-when-one-starts-with-an-offset)
// (This solution requires the BigInt JS feature: https://caniuse.com/bigint)

const schedule = input.split('\n')[1].split(',')
    .map((busId, offset) => ([Number.isNaN(+busId) ? null : BigInt(busId), BigInt(offset)]))
    .filter(entry => entry[0] !== null)

const divMod = (a, b) => [a / b, ((a % b) + b) % b]

const extendedGCD = (a, b) => {
  let [oldR, r] = [a, b]
  let [oldS, s] = [1n, 0n]
  let [oldT, t] = [0n, 1n]

  while(r !== 0n) {
      let [q, remainder] = divMod(oldR, r);

      [oldR, r] = [r, remainder];
      [oldS, s] = [s, oldS - q * s];
      [oldT, t] = [t, oldT - q * t];
  }

  return {
    gcd: oldR,
    s: oldS,
    t: oldT,
  }
}

const combinePhasedRotations = (aPeriod, aPhase, bPeriod, bPhase) => {
  const {gcd, s} = extendedGCD(aPeriod, bPeriod)

  const phaseDifference = aPhase - bPhase
  const pdMult = phaseDifference / gcd

  const combinedPeriod = (aPeriod / gcd) * bPeriod
  const combinedPhase = divMod((aPhase - s * pdMult * aPeriod), combinedPeriod)[1]

  return [combinedPeriod, combinedPhase]
}

const [period, phase] = schedule.reduce((result, entry) => combinePhasedRotations(...result, ...entry))

console.log(`Part 2 result is ${period - phase}`)
