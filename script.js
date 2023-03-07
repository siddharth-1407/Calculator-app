const buttons = document.querySelectorAll('.js_btn');
const display = document.getElementById('input-field');
const deleteBtn = document.getElementById('delete');
const resetBtn = document.getElementById('reset');
const evaluateBtn = document.getElementById('evaluate');

buttons.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		if (display.textContent.match(/([a-zA-Z])\w+/g)) {
			display.textContent = e.target.value;
		} else {
			display.textContent = display.textContent + e.target.value;
			display.textContent = display.textContent.replace(/[*]/g, 'x');
		}
	});
});

deleteBtn.addEventListener('click', () => {
	if (display.textContent.match(/([a-zA-Z])\w+/g)) {
		display.textContent = '';
	} else {
		if (display.textContent.match(/,\s*$/)) {
			display.textContent = display.textContent.slice(0, -2);
		} else {
			display.textContent = display.textContent.slice(0, -1);
		}
	}
});

resetBtn.addEventListener('click', () => {
	display.textContent = '';
});

evaluateBtn.addEventListener('click', () => {
	try {
		display.textContent = eval(display.textContent.replace(/x/g, '*')).toLocaleString('en-US');
	} catch (error) {
		display.textContent = 'error!';
	}
});

// Handle Theme!

const themes = document.querySelectorAll('[name = "theme"]');

const storeTheme = (theme) => {
	localStorage.setItem('theme', theme); //Save theme to Local Storage
};

themes.forEach((theme) => {
	theme.addEventListener('click', () => {
		storeTheme(theme.id);
		document.documentElement.className = theme.id; //Set theme class to HTML for each radio input
	});
});

const retrieveTheme = () => {
	const activeTheme = localStorage.getItem('theme');
	themes.forEach((theme) => {
		if (theme.id === activeTheme) {
			theme.checked = true;
			document.documentElement.className = theme.id; // Get theme from local storage and set theme class to HTML
		}
	});
};
// fallback

document.onload = retrieveTheme();
