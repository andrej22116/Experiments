export default class PartialColoredImage {
	constructor( originalImg, mask, color, intencity, mode ) {
		let originalImgCanvasCtx = document.createElement('canvas').getContext('2d');
		let maskImgCanvasCtx = document.createElement('canvas').getContext('2d');
		let resultImgCanvasCtx = document.createElement('canvas').getContext('2d');

		originalImgCanvasCtx.canvas.width = originalImg.width;
		originalImgCanvasCtx.canvas.height = originalImg.height;

		maskImgCanvasCtx.canvas.width = originalImg.width;
		maskImgCanvasCtx.canvas.height = originalImg.height;

		resultImgCanvasCtx.canvas.width = originalImg.width;
		resultImgCanvasCtx.canvas.height = originalImg.height;

		originalImgCanvasCtx.drawImage(originalImg, 0, 0);
		//maskImgCanvasCtx.drawImage(mask, 0, 0);

		this.state = {
			originalImgData: originalImgCanvasCtx.getImageData(
				0, 0, originalImg.width, originalImg.height
			),
			maskImgData: maskImgCanvasCtx.getImageData(
				0, 0, originalImg.width, originalImg.height
			),
			resultImageData: originalImgCanvasCtx.getImageData(
				0, 0, originalImg.width, originalImg.height
			),
			resultImgCtx: resultImgCanvasCtx,
			color: PartialColoredImage.__hexToRgb(color) 
				|| PartialColoredImage.__hexToRgb("#ffffff"),
			mode: mode || 1,
		}
	}
	
	get color() { return this.state.color; }
	set color( color ) {
		this.state.color = color;
	}

	get src() {
		return this.state.resultImgCtx.canvas.toDataURL();
	}

	filter() {
		this.__multiplyFilter();
	}
	
	static availableModes() {
		return {
			MULTIPLY : 1,
		}
	}

	static __hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	__multiplyFilter() {
		const srcData = this.state.originalImgData.data;
		const masc = this.state.maskImgData.data;
		const result = this.state.resultImageData;
		const resultData = result.data;
		const red = this.state.color.r;
		const green = this.state.color.g;
		const blue = this.state.color.b;

		for (let i = 0; i < srcData.length; ++i) {
			resultData[i] = ((srcData[i] * red) / 255) * 0.9 + srcData[i] * 0.1;
			++i;

			resultData[i] = ((srcData[i] * green) / 255) * 0.9 + srcData[i] * 0.1;
			++i;

			resultData[i] = ((srcData[i] * blue) / 255) * 0.9 + srcData[i] * 0.1;
			++i;
		}

		this.state.resultImgCtx.putImageData(result, 0,0);
	}
}