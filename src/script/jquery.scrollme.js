// ----------------------------------------------------------------------------------------------------
// ScrollMe
// A jQuery plugin for adding simple scrolling effects to web pages
// http://scrollme.nckprsn.com
// ----------------------------------------------------------------------------------------------------
import jQuery from 'jquery';
let scrollme = (function ($) {
	// ----------------------------------------------------------------------------------------------------
	// ScrollMe object

	let _this = {};

	// ----------------------------------------------------------------------------------------------------
	// Properties

	let $document = $(document);
	let $window = $(window);

	_this.body_height = 0;

	_this.viewport_height = 0;

	_this.viewport_top = 0;
	_this.viewport_bottom = 0;

	_this.viewport_top_previous = -1;

	_this.elements = [];
	_this.elements_in_view = [];

	_this.property_defaults =
	{
		'opacity': 1,
		'translatex': 0,
		'translatey': 0,
		'translatez': 0,
		'rotatex': 0,
		'rotatey': 0,
		'rotatez': 0,
		'scale': 1,
		'scalex': 1,
		'scaley': 1,
		'scalez': 1
	};

	_this.scrollme_selector = '.scrollme';
	_this.animateme_selector = '.animateme';

	_this.update_interval = 10;

	// Easing functions

	_this.easing_functions =
	{
		'linear': function (x) {
			return x;
		},

		'easeout': function (x) {
			return x * x * x;
		},

		'easein': function (x) {
			x = 1 - x;
			return 1 - (x * x * x);
		},

		'easeinout': function (x) {
			if (x < 0.5) {
				return (4 * x * x * x);
			}
			else {
				x = 1 - x;
				return 1 - (4 * x * x * x);
			}
		}
	};

	// Document events to bind initialisation to

	_this.init_events =
		[
			'ready',
			'page:load', // Turbolinks
			'page:change' // Turbolinks
		];

	// ----------------------------------------------------------------------------------------------------
	// Initialisation conditions

	_this.init_if = function () { return true; }

	// ----------------------------------------------------------------------------------------------------
	// Initialisation

	_this.init = function () {
		// Cancel if initialisation conditions not met

		if (!_this.init_if()) return false;

		// Load all elements to animate

		_this.init_elements();

		// Get element & viewport sizes

		_this.on_resize();

		// Recalculate heights & positions on resize and rotate

		$window.on('resize orientationchange', function () { _this.on_resize(); });

		// Recalculate heights & positions when page is fully loaded + a bit just in case

		$window.on('load', function () { setTimeout(function () { _this.on_resize(); }, 100) });

		// Start animating

		setInterval(_this.update, _this.update_interval);

		return true;
	}
	// ----------------------------------------------------------------------------------------------------
	// Get list and pre-load animated elements
	_this.init_elements = function () {
		// For each reference element

		$(_this.scrollme_selector).each(function () {
			let element = {};

			element.element = $(this);

			let effects = [];

			// For each animated element

			$(this).find(_this.animateme_selector).addBack(_this.animateme_selector).each(function () {
				// Get effect details

				let effect = {};

				effect.element = $(this);

				effect.when = effect.element.data('when');
				effect.from = effect.element.data('from');
				effect.to = effect.element.data('to');

				if (effect.element.is('[data-crop]')) {
					effect.crop = effect.element.data('crop');
				}
				else {
					effect.crop = true;
				}

				if (effect.element.is('[data-easing]')) {
					effect.easing = _this.easing_functions[effect.element.data('easing')]
				}
				else {
					effect.easing = _this.easing_functions['easeout'];
				}

				// Get animated properties

				let properties = {};

				if (effect.element.is('[data-opacity]')) properties.opacity = effect.element.data('opacity');
				if (effect.element.is('[data-translatex]')) properties.translatex = effect.element.data('translatex');
				if (effect.element.is('[data-translatey]')) properties.translatey = effect.element.data('translatey');
				if (effect.element.is('[data-translatez]')) properties.translatez = effect.element.data('translatez');
				if (effect.element.is('[data-rotatex]')) properties.rotatex = effect.element.data('rotatex');
				if (effect.element.is('[data-rotatey]')) properties.rotatey = effect.element.data('rotatey');
				if (effect.element.is('[data-rotatez]')) properties.rotatez = effect.element.data('rotatez');
				if (effect.element.is('[data-scale]')) properties.scale = effect.element.data('scale');
				if (effect.element.is('[data-scalex]')) properties.scalex = effect.element.data('scalex');
				if (effect.element.is('[data-scaley]')) properties.scaley = effect.element.data('scaley');
				if (effect.element.is('[data-scalez]')) properties.scalez = effect.element.data('scalez');

				effect.properties = properties;

				effects.push(effect);
			});

			element.effects = effects;

			_this.elements.push(element);
		});
	}

	// ----------------------------------------------------------------------------------------------------
	// Update elements

	_this.update = function () {
		window.requestAnimationFrame(function () {
			_this.update_viewport_position();

			if (_this.viewport_top_previous !== _this.viewport_top) {
				_this.update_elements_in_view();
				_this.animate();
			}

			_this.viewport_top_previous = _this.viewport_top;
		});
	}

	// ----------------------------------------------------------------------------------------------------
	// Animate stuff

	_this.animate = function () {
		// For each element in viewport

		let elements_in_view_length = _this.elements_in_view.length;

		for (let i = 0; i < elements_in_view_length; i++) {
			let element = _this.elements_in_view[i];

			// For each effect

			let effects_length = element.effects.length;

			for (let e = 0; e < effects_length; e++) {
				let effect = element.effects[e];
				let start;
				let end;
				// Get effect animation boundaries

				switch (effect.when) {
					case 'view': // Maintained for backwards compatibility
					case 'span':
						start = element.top - _this.viewport_height;
						end = element.bottom;
						break;

					case 'exit':
						start = element.bottom - _this.viewport_height;
						end = element.bottom;
						break;

					default:
						start = element.top - _this.viewport_height;
						end = element.top;
						break;
				}

				// Crop boundaries

				if (effect.crop) {
					if (start < 0) start = 0;
					if (end > (_this.body_height - _this.viewport_height)) end = _this.body_height - _this.viewport_height;
				}

				// Get scroll position of reference selector

				let scroll = (_this.viewport_top - start) / (end - start);

				// Get relative scroll position for effect

				let from = effect['from'];
				let to = effect['to'];

				let length = to - from;

				let scroll_relative = (scroll - from) / length;

				// Apply easing

				let scroll_eased = effect.easing(scroll_relative);

				// Get new value for each property

				let opacity = _this.animate_value(scroll, scroll_eased, from, to, effect, 'opacity');
				let translatey = _this.animate_value(scroll, scroll_eased, from, to, effect, 'translatey');
				let translatex = _this.animate_value(scroll, scroll_eased, from, to, effect, 'translatex');
				let translatez = _this.animate_value(scroll, scroll_eased, from, to, effect, 'translatez');
				let rotatex = _this.animate_value(scroll, scroll_eased, from, to, effect, 'rotatex');
				let rotatey = _this.animate_value(scroll, scroll_eased, from, to, effect, 'rotatey');
				let rotatez = _this.animate_value(scroll, scroll_eased, from, to, effect, 'rotatez');
				let scale = _this.animate_value(scroll, scroll_eased, from, to, effect, 'scale');
				let scalex = _this.animate_value(scroll, scroll_eased, from, to, effect, 'scalex');
				let scaley = _this.animate_value(scroll, scroll_eased, from, to, effect, 'scaley');
				let scalez = _this.animate_value(scroll, scroll_eased, from, to, effect, 'scalez');

				// Override scale values

				if ('scale' in effect.properties) {
					scalex = scale;
					scaley = scale;
					scalez = scale;
				}

				// Update properties

				effect.element.css(
					{
						'opacity': opacity,
						'transform': 'translate3d( ' + translatex + 'px , ' + translatey + 'px , ' + translatez + 'px ) rotateX( ' + rotatex + 'deg ) rotateY( ' + rotatey + 'deg ) rotateZ( ' + rotatez + 'deg ) scale3d( ' + scalex + ' , ' + scaley + ' , ' + scalez + ' )'
					});
			}
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// Calculate property values

	_this.animate_value = function (scroll, scroll_eased, from, to, effect, property) {
		let value_default = _this.property_defaults[property];

		// Return default value if property is not animated

		if (!(property in effect.properties)) return value_default;

		let value_target = effect.properties[property];

		let forwards = (to > from) ? true : false;

		// Return boundary value if outside effect boundaries

		if (scroll < from && forwards) { return value_default; }
		if (scroll > to && forwards) { return value_target; }

		if (scroll > from && !forwards) { return value_default; }
		if (scroll < to && !forwards) { return value_target; }

		// Calculate new property value

		let new_value = value_default + (scroll_eased * (value_target - value_default));

		// Round as required

		switch (property) {
			case 'opacity': new_value = new_value.toFixed(2); break;
			case 'translatex': new_value = new_value.toFixed(0); break;
			case 'translatey': new_value = new_value.toFixed(0); break;
			case 'translatez': new_value = new_value.toFixed(0); break;
			case 'rotatex': new_value = new_value.toFixed(1); break;
			case 'rotatey': new_value = new_value.toFixed(1); break;
			case 'rotatez': new_value = new_value.toFixed(1); break;
			case 'scale': new_value = new_value.toFixed(3); break;
			default: break;
		}

		// Done

		return new_value;
	}

	// ----------------------------------------------------------------------------------------------------
	// Update viewport position

	_this.update_viewport_position = function () {
		_this.viewport_top = $window.scrollTop();
		_this.viewport_bottom = _this.viewport_top + _this.viewport_height;
	}

	// ----------------------------------------------------------------------------------------------------
	// Update list of elements in view

	_this.update_elements_in_view = function () {
		_this.elements_in_view = [];

		let elements_length = _this.elements.length;

		for (let i = 0; i < elements_length; i++) {
			if ((_this.elements[i].top < _this.viewport_bottom) && (_this.elements[i].bottom > _this.viewport_top)) {
				_this.elements_in_view.push(_this.elements[i]);
			}
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// Stuff to do on resize

	_this.on_resize = function () {
		// Update viewport/element data

		_this.update_viewport();
		_this.update_element_heights();

		// Update display

		_this.update_viewport_position();
		_this.update_elements_in_view();
		_this.animate();
	}

	// ----------------------------------------------------------------------------------------------------
	// Update viewport parameters

	_this.update_viewport = function () {
		_this.body_height = $document.height();
		_this.viewport_height = $window.height();
	}

	// ----------------------------------------------------------------------------------------------------
	// Update height of animated elements

	_this.update_element_heights = function () {
		let elements_length = _this.elements.length;

		for (let i = 0; i < elements_length; i++) {
			let element_height = _this.elements[i].element.outerHeight();
			let position = _this.elements[i].element.offset();

			_this.elements[i].height = element_height;
			_this.elements[i].top = position.top;
			_this.elements[i].bottom = position.top + element_height;
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// Bind initialisation

	$document.on(_this.init_events.join(' '), function () { _this.init(); });

	// ----------------------------------------------------------------------------------------------------

	return _this;

	// ----------------------------------------------------------------------------------------------------

})(jQuery);
export default scrollme;
