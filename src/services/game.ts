/**
 * 
 * @param pickedNumbers the already picked numbers
 * @param playerNumbers the numbers from the player card
 * @returns 
 */
export function hasWon(pickedNumbers: number[], playerNumbers: number[][]) {
  const flatPlayerNumbers: number[] = playerNumbers.flat();
  return flatPlayerNumbers.every((el: number) => {
      return pickedNumbers.includes(el);
  })
}