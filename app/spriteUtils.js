export const moveDown = (sprite, floor) => () => {
	if (sprite.y < floor - sprite.height) sprite.y += 1
}