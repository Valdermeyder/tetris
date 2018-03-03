export const moveDown = (sprite, speed = 1) => {
	sprite.y += speed
}

export const moveRight = (sprite, step) => {
	sprite.x += step
}

export const moveLeft = (sprite, step) => {
	sprite.x -= step
}
