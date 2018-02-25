export const moveDown = (sprite, floor, speed = 1) => {
	if (sprite.y <= floor - sprite.height - speed) {
		sprite.y += speed
	}
}

export const moveRight = (sprite, rightBoundary, step) => {
	if (sprite.x <= rightBoundary - sprite.width - step) {
		sprite.x += step
	}
}

export const moveLeft = (sprite, leftBoundary, step) => {
	if (sprite.x >= leftBoundary + step) {
		sprite.x -= step
	}
}
