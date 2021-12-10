const STEPS = 5; // is preferably an odd number
const USER_COLOR = '#0161b2';

document.addEventListener('DOMContentLoaded', function () {
	var btnGenerateColorScheme = document.getElementById('generate-color-scheme'),
		btnGenerateColorScale = document.getElementById('generate-color-scale'),
		colorScheme = document.querySelector('.color-scheme'),
		userColorInput = document.getElementById('user-color'),
		userColorPicker = document.getElementById('user-color-picker'),
		position = document.getElementById('color-position'),
		btnClear = document.getElementById('clear'),
		colorScale = document.querySelector('.color-scale'),
		stepsInput = document.getElementById('user-steps'),
		chromaColor, colorList;

	userColorInput.value = USER_COLOR;
	stepsInput.value = STEPS;

	btnGenerateColorScheme.addEventListener('click', function () {
		// Reinitialize the color list.
		colorList = [];

		// Get the steps count
		steps = stepsInput.value;

		// Get the color value.
		userColor = userColorInput.value;

		// Reset the content of the color scheme list.
		colorScheme.innerHTML = '';

		// Initialize Chroma.
		chromaColor = chroma(userColor);

		// Create a monchromatic color scheme.
		switch (position.value) {
			//start
			case '1': for (var i = 0; i < steps; i++) {
				colorList[i] = chromaColor.darken(i);
			}
				break;
			//middle
			case '2': for (var i = 0; i < steps; i++) {
				colorList[i] = chromaColor.darken(i - Math.floor(steps / 2));
			}
				break;
			//end	
			case '3': for (var i = 0; i < steps; i++) {
				colorList[i] = chromaColor.darken(i - (steps - 1));
			}
				break;
		}

		// Generate some elements.
		for (var j = 0; j < colorList.length; j++) {
			var newItem = document.createElement('li');

			newItem.style.backgroundColor = colorList[j];
			newItem.innerHTML = `<div class="color-info">
									<span>${colorList[j]}</span>
									<span>${chroma(colorList[j]).css()}</span>
									<span>${chroma(colorList[j]).css('hsl')}</span>
								</div>`;

			colorScheme.appendChild(newItem);
		}
	});

	btnClear.addEventListener('click', function () {
		colorScheme.innerHTML = '';
	});

	userColorInput.addEventListener('input', function () {
		userColorPicker.value = userColorInput.value;
	});

	userColorPicker.addEventListener('input', function () {
		userColorInput.value = userColorPicker.value;
	});
});