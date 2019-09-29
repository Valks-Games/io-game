class Utils {
	static angleTowardsMouse() {
		const dx = winMouseX - width / 2;
		const dy = winMouseY - height / 2;
		const angle = Math.atan2(dy, dx);

		return angle;
	}
}