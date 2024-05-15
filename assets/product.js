parcelRequire = (function (e, r, t, n) {
	var i,
		o = "function" == typeof parcelRequire && parcelRequire,
		u = "function" == typeof require && require;
	function f(t, n) {
		if (!r[t]) {
			if (!e[t]) {
				var i = "function" == typeof parcelRequire && parcelRequire;
				if (!n && i) return i(t, !0);
				if (o) return o(t, !0);
				if (u && "string" == typeof t) return u(t);
				var c = new Error("Cannot find module '" + t + "'");
				throw ((c.code = "MODULE_NOT_FOUND"), c);
			}
			(p.resolve = function (r) {
				return e[t][1][r] || r;
			}),
				(p.cache = {});
			var l = (r[t] = new f.Module(t));
			e[t][0].call(l.exports, p, l, l.exports, this);
		}
		return r[t].exports;
		function p(e) {
			return f(p.resolve(e));
		}
	}
	(f.isParcelRequire = !0),
		(f.Module = function (e) {
			(this.id = e), (this.bundle = f), (this.exports = {});
		}),
		(f.modules = e),
		(f.cache = r),
		(f.parent = o),
		(f.register = function (r, t) {
			e[r] = [
				function (e, r) {
					r.exports = t;
				},
				{},
			];
		});
	for (var c = 0; c < t.length; c++)
		try {
			f(t[c]);
		} catch (e) {
			i || (i = e);
		}
	if (t.length) {
		var l = f(t[t.length - 1]);
		"object" == typeof exports && "undefined" != typeof module
			? (module.exports = l)
			: "function" == typeof define && define.amd
			? define(function () {
					return l;
			  })
			: n && (this[n] = l);
	}
	if (((parcelRequire = f), i)) throw i;
	return f;
})(
	{
		ZNKV: [
			function (require, module, exports) {
				document.addEventListener("DOMContentLoaded", function () {
					var e = $("[data-js='slider']");
					e.length &&
						(function (e) {
							var a,
								n = $("[data-js='slider-thumbnail']"),
								t = new Swipe(e[0], {
									startSlide: 0,
									draggable: !0,
									autoRestart: !0,
									continuous: !0,
									disableScroll: !1,
									stopPropagation: !0,
									callback: function (e) {
										o(e);
									},
								});
							function o(e) {
								a && a.removeClass("active"),
									n.eq(e).addClass("active"),
									(a = n.eq(e));
							}
							(window.slider = t),
								$('[data-js="slider-prev"]').click(function () {
									t.prev();
								}),
								$('[data-js="slider-next"]').click(function () {
									t.next();
								}),
								n.click(function (e) {
									var a = parseInt(
										$(e.currentTarget).attr("data-js-index")
									);
									t.slide(a);
								}),
								o(0);
						})(e);
					var a = $('[data-js="photo-note-toggle"]');
					if (a.length) {
						var n = $('[data-js="photo-note"]');
						a.on("click", function () {
							var e = n.hasClass("is-open");
							n.toggleClass("is-open"),
								"function" == typeof ga &&
									ga(
										"send",
										"event",
										"Photo Retouch Note",
										e ? "Closed" : "Opened"
									);
						});
					}
					var t = $('[data-js="backing-selector-open"]'),
						o = $('[data-js="backing-selector-close"]');
					if (t.length) {
						var r = $('[data-js="backing-selector"]');
						t.on("click", function () {
							"function" == typeof ga &&
								ga("send", "event", "Backing Selector", "Open"),
								r.addClass("opened");
						}),
							o.on("click", function () {
								r.removeClass("opened"),
									"function" == typeof ga &&
										ga(
											"send",
											"event",
											"Backing Selector",
											"Closed"
										);
							});
					}
					var i = $('[data-js-diamond="diamond-selector"]');
					if (i.length) {
						var d = $('[data-js-diamond="add"]'),
							s = $('[data-js-diamond="remove"]'),
							c = $('[data-js-diamond="radio"]'),
							l = $('[data-js-diamond="container"]')[0];
						d.on("click", function () {
							i.addClass("opened"),
								"function" == typeof ga &&
									ga(
										"send",
										"event",
										"Diamond Selector",
										"Opened"
									);
						}),
							s.on("click", function () {
								i.removeClass("opened"),
									"function" == typeof ga &&
										ga(
											"send",
											"event",
											"Diamond Selector",
											"Closed"
										);
							}),
							c.change(function (e) {
								"Center diamond" === e.target.value
									? (l.dataset.diamond = "center")
									: "Three diamonds" === e.target.value &&
									  (l.dataset.diamond = "three");
							});
					}
					var g = $('[data-js-engraving="engraving-selector"]');
					if (g.length) {
						var u = function () {
								g.addClass("opened"),
									h.focus(),
									"function" == typeof ga &&
										ga(
											"send",
											"event",
											"Engraving Selector",
											"Opened"
										);
							},
							v = function () {
								h.val(""),
									x.html(p),
									m(),
									!1,
									g.removeClass("opened"),
									"function" == typeof ga &&
										ga(
											"send",
											"event",
											"Engraving Selector",
											"Closed"
										);
							},
							f = function (e) {
								b.show().html(e), S.addClass("btn--disabled");
							},
							m = function () {
								b.hide(), S.removeClass("btn--disabled");
							},
							p = "ABC",
							h = g.find('[data-js-engraving="engraving-input"]'),
							x = g.find('[data-js-engraving="preview"]'),
							b = g.find('[data-js-engraving="error"]'),
							y = $('[data-js-engraving="radio"]'),
							S = $('[data-js="add-to-cart"]'),
							j = g.attr("data-js-engraving-type");
						"square" === j && (p = "A"),
							"signet" === j && (p = "ABC"),
							y.change(function (e) {
								"Engraved" === e.target.value ? u() : v();
							}),
							h.keyup(function (e) {
								var a = e.target.value;
								if ("band" === j) {
									if (a.length > 30)
										return (
											!0,
											f(
												"Please <a href='mailto:care@automicgold.com'>email us</a> for engravings with more than 30&nbsp;characters.</a>"
											),
											void (
												"function" == typeof ga &&
												ga(
													"send",
													"event",
													"Band Engraving Selector",
													"Engraving too long"
												)
											)
										);
								} else if ("bar" === j) {
									if (a.length > 9)
										return (
											!0,
											f(
												"Please <a href='mailto:care@automicgold.com'>email us</a> for engravings with more than 9&nbsp;characters.</a>"
											),
											void (
												"function" == typeof ga &&
												ga(
													"send",
													"event",
													"Bar Engraving Selector",
													"Engraving too long"
												)
											)
										);
								} else if ("diamond-bar" === j) {
									if (a.length > 5)
										return (
											!0,
											f(
												"Please <a href='mailto:care@automicgold.com'>email us</a> for engravings with more than 5&nbsp;characters.</a>"
											),
											void (
												"function" == typeof ga &&
												ga(
													"send",
													"event",
													"Diamond Bar Engraving Selector",
													"Engraving too long"
												)
											)
										);
                                    } else if ("fourteen" === j) {
									if (a.length > 14)
										return (
											!0,
											f(
												"Please <a href='mailto:care@automicgold.com'>email us</a> for engravings with more than 14&nbsp;characters.</a>"
											),
											void (
												"function" == typeof ga &&
												ga(
													"send",
													"event",
													"Diamond Bar Engraving Selector",
													"Engraving too long"
												)
											)
										);  
									} else if ("six" === j) {
										if (a.length > 6)
											return (
												!0,
												f(
													"Please <a href='mailto:care@automicgold.com'>email us</a> for engravings with more than 6&nbsp;characters.</a>"
												),
												void (
													"function" == typeof ga &&
													ga(
														"send",
														"event",
														"Three Stone Sapphire Ring",
														"Engraving too long"
													)
												)
											); 	  
								} else if ("square" === j) {
									if (a.length > 1)
										return (
											!0,
											f(
												"Please <a href='mailto:care@automicgold.com'>email us</a> for engravings with more than one&nbsp;characters.</a>"
											),
											void (
												"function" == typeof ga &&
												ga(
													"send",
													"event",
													"Square Ring Engraving Selector",
													"Engraving too long"
												)
											)
										);
								} else if ("signet" === j) {
									if (a.length > 3)
										return (
											!0,
											f(
												"Please <a href='mailto:care@automicgold.com'>email us</a> for engravings with more than three&nbsp;characters.</a>"
											),
											void (
												"function" == typeof ga &&
												ga(
													"send",
													"event",
													"Signet Ring Engraving Selector",
													"Engraving too long"
												)
											)
										);
								} else if ("seven" === j) {
									if (a.length > 7)
										return (
											!0,
											f(
												"Please <a href='mailto:care@automicgold.com'>email us</a> for engravings with more than seven&nbsp;characters.</a>"
											),
											void (
												"function" == typeof ga &&
												ga(
													"send",
													"event",
													"Gemstone Bar Engraving Selector",
													"Engraving too long"
												)
											)
										);
								} else if (a.length > 3)
									return (
										!0,
										f(
											"Please <a href='mailto:care@automicgold.com'>email us</a> for engravings with more than 3&nbsp;characters.</a>"
										),
										void (
											"function" == typeof ga &&
											ga(
												"send",
												"event",
												"Engraving Selector",
												"Engraving too long"
											)
										)
									);
								if ((x.text(a), "" === a.trim()))
									return (
										!0, void f("Engraving can't be empty.")
									);
								/k{3}/i.test(a) &&
									((a = "BLM"), h.val("BLM"), x.text(a)),
									!1,
									m();
							});
					}
					var k = document.querySelector("#BackorderForm");
					if (k) {
						var C = document.querySelector("#backorder-email"),
							E =
								document.querySelector(
									"#backorder-title"
								).value,
							w = document.querySelector("#backorder-url").value,
							B = document.querySelector("#backorder-message");
						k.addEventListener("submit", function (e) {
							e.preventDefault(),
								C &&
								C.value &&
								/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
									C.value
								)
									? $.post({
											url: "https://api.airtable.com/v0/appQA55n7SBpjVA4T/Backorders",
											headers: {
												Authorization:
													"Bearer keyHi46rVjdlrOJXe",
												"Content-type":
													"application/json",
											},
											dataType: "json",
											processData: !1,
											data: JSON.stringify({
												fields: {
													email: C.value,
													title: E,
													url: w,
													variation:
														window.selectedVariant ||
														"Could not find selected variant variable",
													date: new Date(),
												},
											}),
									  })
											.then(function () {
												k.classList.add("success"),
													(B.innerText = "Got it!"),
													(document.getElementById(
														"backorder-email"
													).disabled = !0),
													(document.getElementById(
														"backorder-submit"
													).disabled = !0);
											})
											.catch(function (e, a, n) {
												k.classList.add("error"),
													(B.innerText =
														"Uh-oh. Something went wrong... Try again?");
											})
									: (k.classList.add("error"),
									  (B.innerText =
											"Please provide a valid email address"));
						});
					}
				});
			},
			{},
		],
	},
	{},
	["ZNKV"],
	null
);
