export function generateNumberRange(): number[] {
  const MIN = 1, MAX = 75;
  const numbersList = [];

  for (let i = MIN; i <= MAX; i++) {
    numbersList.push(i);
  }
  return numbersList;
}

export function getIndex(alreadyPicked: number) {
  return Math.floor(Math.random() * (75 - alreadyPicked));
}