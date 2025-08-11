module.exports = {
	'spacing': '30px',
	'radius': '5px',
	'colors': {
		'green':      '#5cb85c',
		'orange':     '#DC6053',

		'blue':       '#278ecc',
		'darkblue':   '#0e81c6',
		'darkerblue': '#06649A',
		'yellow':     '#f3b40a',
		'orangePro':  '#ff7200',

		'lightgrey':  '#f0f0f0',
		'greylight':  '#f0f0f0',
		'grey':       '#6f6f6e',
		'greySep':    '#d3d3d3',
		'greystrong': '#707070',
	},
	'primary': 'colors(blue)',
	'secondary': 'adjust-color(primary,$hue: 180deg)',


	'body':{
		'background':       'colors(greylight)',
		'block-background': 'colors(white)',
		'font-color':       'colors(black)',
	},
	'input':{
		'background':       'colors(white)',
		'font-color':       'colors(grey)',
		'border-color':       'colors(greySep)',
	},
	'input-focus':{
		'background':       'colors(white)',
		'border-color':       'colors(blue)',
	},
	'header':{
		'font-color':       'colors(grey)',
	},

	'link': {
		'font-color': 'primary',
		'font-color-hover': 'primary',
		'font-color-focus': 'primary',
		'underline': true,
		'underline-on-hover': false,
	},
	'btn':{
		'background': 'primary',
		'font-color': 'contrastFW(colors(white),primary)',
		'border-size': '2px',
		'radius': true,
		'uppercase': true,
		'font-weight': 400,
	},
	'griditem-minwidth': '25ch',
};