function _createNumbersRange(min:number, max: number) : Array<number> {
  const numbersRange : Array<number> = [];
  for(let i = min; i <= max; i++) {
    numbersRange.push(i);
  }
  return numbersRange;
}

function _shuffle(array : Array<number>) : Array<number> {
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array;
}

function _sliceAndSort(shuffledArray : Array<number>) : Array<number> {
  const COLUMN_SIZE = 5;
  return shuffledArray.slice(0, COLUMN_SIZE).sort((a, b) => a - b);
}

function _getColumnNumbers(array : Array<number>) : Array<number> {
  return _sliceAndSort(_shuffle(array));
}

/**
 * Generates a bingo card containing a collection of shuffled, sorted numbers for each column
 * @returns a bingo card
 */
export default function createBingoCard(): Array<Array<number>> {
  const MIN_NUMBER: number = 1;
  const MAX_NUMBER: number = 75;
  const COLUMNS: number = 5;
  const RANGE_LENGTH: number = MAX_NUMBER / COLUMNS;

  const board: Array<Array<number>> = [];

  for(let i = MIN_NUMBER; i <= COLUMNS; i++) {
    
    const minNumberLoop: number = ((i - 1) * RANGE_LENGTH) + 1;
    const maxNumberLoop: number = RANGE_LENGTH * i;

    board.push(_getColumnNumbers(_createNumbersRange(minNumberLoop, maxNumberLoop)));

  }

  return board;

}