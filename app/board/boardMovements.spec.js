import {moveToFloor, moveToLeft, moveToRight} from './boardMovements'
import {changeBoardImages} from './boardActions'
import {gameOver} from '../appActions'
import {generateActivePiece} from '../piece/pieceActions'

describe('boardMovements', () => {
	function createTestActivePiece(tileSize, columns = 1, rows = 1) {
		return {x: 0, y: 0, width: tileSize * columns, height: tileSize * rows}
	}

	describe('#moveToFloor', () => {
		const tileSize = 2
		let board, activePiece

		beforeEach(() => {
			board = [[{free: true}, {free: true}], [{free: true}, {free: true}]]
			activePiece = createTestActivePiece(tileSize)
		})

		test('should occupy cells when floor is reached with default speed', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			activePiece.y = 2
			moveToFloor(appState, jest.fn())
			expect(board[0][1].free).toBeFalsy()
		})

		test('should occupy cells when floor is reached with provided speed', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToFloor(appState, jest.fn(), tileSize * 2)
			expect(board[0][1].free).toBeFalsy()
		})

		test('should release row when whole row is occupied', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToFloor(appState, jest.fn(), tileSize)
			moveToFloor(appState, jest.fn(), tileSize)
			appState.activePiece = createTestActivePiece(tileSize)
			appState.activePiece.x = tileSize
			moveToFloor(appState, jest.fn(), tileSize)
			moveToFloor(appState, jest.fn(), tileSize)
			expect(board[0][1].free).toBeTruthy()
			expect(board[1][1].free).toBeTruthy()
		})

		test('should release all occupied rows', () => {
			activePiece = createTestActivePiece(tileSize, 2)
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToFloor(appState, jest.fn(), tileSize)
			appState.activePiece = createTestActivePiece(tileSize, 2)
			appState.activePiece.x = tileSize
			moveToFloor(appState, jest.fn(), tileSize)
			expect(board[0][1].free).toBeTruthy()
			expect(board[1][1].free).toBeTruthy()
			expect(board[0][0].free).toBeTruthy()
			expect(board[1][0].free).toBeTruthy()
		})

		test('should occupy cells when floor is reached with on x bigger the width', () => {
			activePiece.x = tileSize
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToFloor(appState, jest.fn(), tileSize)
			moveToFloor(appState, jest.fn(), tileSize)
			expect(board[1][1].free).toBeFalsy()
		})

		test('should increment activePiece y by default speed', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToFloor(appState, jest.fn())
			expect(activePiece.y).toBe(1)
		})

		test('should increment activePiece y by provided speed', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToFloor(appState, jest.fn(), tileSize)
			expect(activePiece.y).toBe(2)
		})

		test('should not increment activePiece y by provided speed when floor is reached by one of piece tile', () => {
			board = [[{free: true}, {free: true}], [{free: true}, {free: false}]]
			activePiece = createTestActivePiece(tileSize, 2)
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToFloor(appState, jest.fn(), tileSize)
			expect(activePiece.y).toBe(0)
		})

		test('should not increment activePiece x', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToFloor(appState, jest.fn())
			expect(activePiece.x).toBe(0)
		})

		test('should dispatch GENERATE_ACTIVE_PIECE and CHANGE_BOARD_IMAGES actions when floor is reached', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			const dispatch = jest.fn()
			moveToFloor(appState, dispatch, tileSize)
			moveToFloor(appState, dispatch, tileSize)
			expect(dispatch).toHaveBeenCalledWith(generateActivePiece())
			expect(dispatch).toHaveBeenCalledWith(changeBoardImages())
		})

		test('should dispatch GAME_OVER action when floor is  0', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			const dispatch = jest.fn()
			moveToFloor(appState, dispatch, tileSize)
			moveToFloor(appState, dispatch, tileSize)
			appState.activePiece = createTestActivePiece(tileSize)
			moveToFloor(appState, dispatch, tileSize)
			moveToFloor(appState, dispatch, tileSize)
			appState.activePiece = createTestActivePiece(tileSize)
			moveToFloor(appState, dispatch)
			expect(dispatch).toHaveBeenCalledWith(gameOver())
		})
	})

	describe('#moveToRight', () => {
		const tileSize = 2
		let board, activePiece

		beforeEach(() => {
			board = [[{free: true}, {free: true}], [{free: true}, {free: true}]]
			activePiece = createTestActivePiece(tileSize)
		})

		test('should increment activePiece x by tail size', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToRight(appState)
			expect(activePiece.x).toBe(2)
		})

		test('should not increment activePiece x when right border is reached', () => {
			board = [[{free: true}, {free: true}], [{free: false}, {free: true}]]
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToRight(appState)
			expect(activePiece.x).toBe(0)
		})

		test('should not increment activePiece x when right border is reached for one piece row', () => {
			board = [[{free: true}, {free: true}], [{free: true}, {free: false}]]
			activePiece = createTestActivePiece(tileSize, 1, 2)
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToRight(appState)
			expect(activePiece.x).toBe(0)
		})

		test('should not increment activePiece y', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToRight(appState)
			expect(activePiece.y).toBe(0)
		})
	})

	describe('#moveToLeft', () => {
		const tileSize = 2
		let board, activePiece

		beforeEach(() => {
			board = [[{free: true}, {free: true}], [{free: true}, {free: true}]]
			activePiece = createTestActivePiece(tileSize)
			activePiece.x = tileSize
		})

		test('should decrement activePiece x by tail size', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToLeft(appState)
			expect(activePiece.x).toBe(0)
		})

		test('should not decrement activePiece x when left border is reached', () => {
			board = [[{free: false}, {free: true}], [{free: true}, {free: true}]]
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToLeft(appState)
			expect(activePiece.x).toBe(tileSize)
		})

		test('should not decrement activePiece x when right border is reached for one piece row', () => {
			board = [[{free: true}, {free: true}], [{free: false}, {free: true}]]
			activePiece = createTestActivePiece(tileSize, 1, 2)
			activePiece.x = tileSize
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToLeft(appState)
			expect(activePiece.x).toBe(tileSize)
		})

		test('should not increment activePiece y', () => {
			const appState = {board: board, activePiece: activePiece, tileSize}
			moveToLeft(appState)
			expect(activePiece.y).toBe(0)
		})
	})
})