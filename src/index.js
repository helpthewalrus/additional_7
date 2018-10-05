module.exports = function solveSudoku(matrix) {
  const solvedSudoku = (matrix) => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (matrix[y][x] === 0) return false;
      }
    }
    return true;
  } 

  const possibleValuesDict = (matrix, i, j) => {
    const possibleValues = {};
    for (let p = 1; p < 10; p++) possibleValues[p] = 0;
    //checking vertical lines
    for (let y = 0; y < 9; y++) {
      if (matrix[y][j] !== 0) {
        possibleValues[matrix[y][j]] = 1;
      }
    }
    //checking horizontal lines
    for (let x = 0; x < 9; x++) {
      if (matrix[i][x] !== 0) {
        possibleValues[matrix[i][x]] = 1;
      }
    }
    //checking 3 * 3 squares
    let side1 = 0,
        side2 = 0;

    if (i <= 2) side1 = 0; 
    else if (i >= 3 && i <= 5) side1 = 3;    
    else side1 = 6;
    
    if (j <= 2) side2 = 0; 
    else if (j >= 3 && j <= 5) side2 = 3;    
    else side2 = 6;
      
    for (let y = side1; y < (side1 + 3); y++) {
      for (let x = side2; x < (side2 + 3); x++) {
        if (matrix[y][x]) {
          possibleValues[matrix[y][x]] = 1;
        } 
      }
    }
  
    for (let p = 1; p < 10; p++) {
      (possibleValues[p]) ? possibleValues[p] = 0 : possibleValues[p] = p;
    } 
    return possibleValues;
  }
  
  const totalSudokuSolving = (matrix) => {
    let i,
        j,
        possibleValues = {};       

    if (solvedSudoku(matrix)) {
      return matrix;
    }
      
    else {
      loop:
        for (let y = 0; y < 9; y++) {
          for (let x = 0; x < 9; x++) {
            if (matrix[y][x] === 0) {
              i = y;
              j = x;
              break loop;
            }
          }
        }
      possibleValues = possibleValuesDict(matrix, i, j);

      let switcher = true; 
        for (let p = 1; p < 10; p++) {
          if (possibleValues[p]) {
            switcher = false;
            matrix[i][j] = possibleValues[p];
            let recursiveSolving = totalSudokuSolving(matrix);
            if (recursiveSolving) {
              return recursiveSolving;
            }
          }
          matrix[i][j] = 0;  
        }
      if (switcher) {
        return false;    
      }
    }
  }
  return totalSudokuSolving(matrix);
}