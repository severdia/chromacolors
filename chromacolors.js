document.addEventListener('DOMContentLoaded', function() {
	var btnGenerateColorScheme = document.querySelector('#generate-color-scheme'),
		btnGenerateColorScale = document.querySelector('#generate-color-scale'),
		colorScheme = document.querySelector('.color-scheme'),
		colorScale = document.querySelector('.color-scale'),
		steps =  5, // is preferably an odd number
		chromaColor, userColor, colorList;

	btnGenerateColorScheme.addEventListener('click', function() {
		// Reinitialize the color list.
		colorList = [];

		// Get the steps count
		steps =  document.querySelector('#user-steps').value;
	
		// Get the color value.
		userColor = document.querySelector('#user-color').value;
	
		// Reset the content of the color scheme list.
		colorScheme.innerHTML = '';

		// Initialize Chroma.
		chromaColor = chroma(userColor);

		// Create a monchromatic color scheme.
		for (var i = 0; i < steps; i++) {
			colorList[i] = chromaColor.darken(i - Math.floor(steps / 2));
		}

		// Generate some elements.
		for (var j = 0; j < colorList.length; j++) {
			var newItem = document.createElement('li');

			newItem.style.backgroundColor = colorList[j];
			newItem.innerHTML = '<div class="color-info">' +
				'<span>' + colorList[j] + '</span>' +
				'<span>' + chroma(colorList[j]).css() + '</span>' +
				 '<span>' + chroma(colorList[j]).css('hsl') + '</span>' +
				'</div>';

			colorScheme.appendChild(newItem);
		}
	});
});