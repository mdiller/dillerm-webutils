
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

// from https://gist.github.com/mjackson/5311256
function rgbToHsv(rgb) {
	var { r, g, b } = rgb;
	r /= 255, g /= 255, b /= 255;
  
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, v = max;
  
	var d = max - min;
	s = max == 0 ? 0 : d / max;
  
	if (max == min) {
	  h = 0;
	} else {
	  switch (max) {
		case r: h = (g - b) / d + (g < b ? 6 : 0); break;
		case g: h = (b - r) / d + 2; break;
		case b: h = (r - g) / d + 4; break;
	  }
  
	  h /= 6;
	}
  
	return {
		h: h * 356,
		s: s * 100,
		v: v * 100
	};
}

// from https://gist.github.com/mjackson/5311256
function hsvToRgb(hsv) {
	var { h, s, v } = hsv;
	h /= 356, s /= 100, v /= 100;
	var r, g, b;

	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}

	return {
		r: r * 255,
		g: g * 255,
		b: b * 255
	};
}

function hexToHsv(hex) {
	return rgbToHsv(hexToRgb(hex));
}

function rgbToHex(rgb) {
	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	return "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
}

// gradient is an array of colors representing the gradient. ie: [ "#ff0000", "#00ff00", "#0000ff" ]
function getColorFromGradient(percent, gradient) {
	if (typeof gradient === 'string') {
		gradient = [ gradient ];
	}
	if (gradient.length == 1) {
		gradient = [ gradient[0], gradient[0] ]
	}
	var index = Math.floor((percent * (gradient.length - 1)) - 0.0001);
	if (index < 0) {
		index = 0;
	}
	var min_color_rgb = hexToRgb(gradient[index]);
	var max_color_rgb = hexToRgb(gradient[index + 1]);
	var adjusted_percent = (percent - index * (1 / (gradient.length - 1))) * (gradient.length - 1);

	var color = {
		r: parseInt((max_color_rgb.r * adjusted_percent) + (min_color_rgb.r * (1 - adjusted_percent))),
		g: parseInt((max_color_rgb.g * adjusted_percent) + (min_color_rgb.g * (1 - adjusted_percent))),
		b: parseInt((max_color_rgb.b * adjusted_percent) + (min_color_rgb.b * (1 - adjusted_percent))),
	}
	return rgbToHex(color);
}


const COOL_GRADIENT = [ "#0000ff", "#00ff00", "#ffffff" ];

class ColorGradient {
	constructor(colors) {
		this.colors = colors;
	}

	getColor(percent) {
		return getColorFromGradient(percent, this.colors);
	}
}

function debounce(func, wait_ms, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait_ms);
		if (callNow) func.apply(context, args);
	};
}

// directly taken from https://github.com/szchenghuang/debounce-async
function debounceAsync(
	func,
	wait = 0,
	{
	  leading = false,
	  cancelObj = 'canceled'
	} = {}
  ) {
	let timerId, latestResolve, shouldCancel
  
	return function ( ...args ) {
	  if ( !latestResolve ) { // The first call since last invocation.
		return new Promise( ( resolve, reject ) => {
		  latestResolve = resolve
		  if ( leading ) {
			invokeAtLeading.apply( this, [ args, resolve, reject ] );
		  } else {
			timerId = setTimeout( invokeAtTrailing.bind( this, args, resolve, reject ), wait )
		  }
		})
	  }
  
	  shouldCancel = true
	  return new Promise( ( resolve, reject ) => {
		latestResolve = resolve
		timerId = setTimeout( invokeAtTrailing.bind( this, args, resolve, reject ), wait )
	  })
	}
  
	function invokeAtLeading( args, resolve, reject ) {
	  func.apply( this, args ).then( resolve ).catch( reject )
	  shouldCancel = false
	}
  
	function invokeAtTrailing( args, resolve, reject ) {
	  if ( shouldCancel && resolve !== latestResolve ) {
		// reject( cancelObj )
	  } else {
		func.apply( this, args ).then( resolve ).catch( reject )
		shouldCancel = false
		clearTimeout( timerId )
		timerId = latestResolve = null
	  }
	}
  }


function escapeRegex(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export {
	ColorGradient,
	escapeRegex,
	debounce,
	debounceAsync,
	hexToHsv,
	hexToRgb,
	rgbToHex,
	rgbToHsv,
	hsvToRgb
}
