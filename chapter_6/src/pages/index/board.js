const MATRIX_SIZE = 4

const MOVE_DIRECTION = {
  LEFT: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3
}

module.exports.MOVE_DIRECTION = MOVE_DIRECTION

function printMatrix(matrix) {
  for (let row of matrix) {
    console.log(row.join(' '))
  }
}

class Board {

  constructor() {
    this.matrix = []
    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = []
      for (let j = 0; j < MATRIX_SIZE; j++) {
        row.push(0)
      }
      this.matrix.push(row)
    }
  }

  randomIndex() {
    return Math.floor(Math.random() * MATRIX_SIZE)
  }

  startGame() {
    // 初始化两个cell
    for (let i = 0; i < 2; i++) {
      this.matrix[this.randomIndex()][this.randomIndex()] = Math.random() < 0.8 ? 2 : 4
    }
  }

  moveValidNumToLeft(matrix) {
    const movedMatrix = []
    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = []
      for (let j = 0; j < MATRIX_SIZE; j++) {
        if (matrix[i][j] !== 0) {
          row.push(matrix[i][j])
        }
      }
      while (row.length < MATRIX_SIZE) {
        row.push(0)
      }
      movedMatrix.push(row)
    }
    return movedMatrix
  }

  move(direction) {
    if (!this.canMove(direction)) {
      console.log('该方向不可用')
    }
    const rotatedMatrix = this.transformMatrixToDirectionLeft(this.matrix, direction)
    const leftMovedMatrix = this.moveValidNumToLeft(rotatedMatrix)
    // 相同数字合并
    for (let i = 0; i < MATRIX_SIZE; i++) {
      for (let j = 0; j < MATRIX_SIZE - 1; j++) {
        if (leftMovedMatrix[i][j] > 0 && leftMovedMatrix[i][j] === leftMovedMatrix[i][j + 1]) {
          leftMovedMatrix[i][j] *= 2;
          // score += movedMatrix[i][j];
          leftMovedMatrix[i][j + 1] = 0;
        }
      }
    }
    const againMovedMatrix = this.moveValidNumToLeft(leftMovedMatrix)
    this.matrix = this.reverseTransformMatrixToDirectionLeft(againMovedMatrix, direction)
  }

  transformMatrixToDirectionLeft(matrix, direction) {
    switch (direction) {
      case MOVE_DIRECTION.LEFT:
        return matrix
      case MOVE_DIRECTION.TOP:
        return this.rotateMultipleTimes(matrix, 3);
      case MOVE_DIRECTION.RIGHT:
        return this.rotateMultipleTimes(matrix, 2);
      case MOVE_DIRECTION.BOTTOM:
        return this.rotateMatrix(matrix);
      default:
        return matrix
    }
  }

  reverseTransformMatrixToDirectionLeft(matrix, direction) {
    switch (direction) {
      case MOVE_DIRECTION.LEFT:
        return matrix
      case MOVE_DIRECTION.TOP:
        return this.rotateMultipleTimes(matrix, 1);
      case MOVE_DIRECTION.RIGHT:
        return this.rotateMultipleTimes(matrix, 2);
      case MOVE_DIRECTION.BOTTOM:
        return this.rotateMultipleTimes(matrix, 3);
      default:
        return matrix
    }
  }

  rotateMultipleTimes(matrix, rotateNum) {
    let newMatrix = matrix
    while (rotateNum > 0) {
      newMatrix = this.rotateMatrix(newMatrix)
      rotateNum--
    }
    return newMatrix
  }

  // 顺时针旋转90°
  rotateMatrix(matrix) {
    const rotatedMatrix = []
    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = []
      for (let j = MATRIX_SIZE - 1; j >= 0; j--) {
        row.push(matrix[j][i])
      }
      rotatedMatrix.push(row)
    }
    return rotatedMatrix
  }

  canMove(direction) {
    let matrix = JSON.parse(JSON.stringify(this.matrix))
    const rotatedMatrix = this.transformMatrixToDirectionLeft(matrix, direction)
    // 根据direction, 改为向左判断
    for (let i = 0; i < MATRIX_SIZE; i++) {
      for (let j = 0; j < MATRIX_SIZE; j++) {
        // 如果有两个连着相等的,可以滑动
        if (rotatedMatrix[i][j] > 0 && rotatedMatrix[i][j] === rotatedMatrix[i][j + 1]) {
          return true;
        }
        // 如果有数字左边有0,可以滑动
        if (rotatedMatrix[i][j] === 0 && rotatedMatrix[i][j + 1] > 0) {
          return true;
        }
      }
    }
  }

}

module.exports.Board = Board
