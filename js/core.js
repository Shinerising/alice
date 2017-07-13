/*global
  console,
  FormData,
  fetch
 */

function genFormData(p) {
	'use strict';
	var data = new FormData(),
		val,
		k,
		i,
		l;
	for (k in p) {
		if (p.hasOwnProperty(k)) {
			val = p[k];
			if (Array.isArray(val)) {
				for (i = 0, l = val.length; i < l; i += 1) {
					data.append(k + '[]', val[i]);
				}
			} else {
				data.append(k, val);
			}
		}
	}
	return data;
}

function rectsIntersect(a, b) {
	'use strict';
	return a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
}

function getPageRect() {
	'use strict';
	var isquirks, page, doc, x, y, w, h;
	isquirks = document.compatMode !== 'BackCompat';
	page = isquirks ? document.documentElement : document.body;
	doc = document.documentElement;
	x = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	y = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	w = window.innerWidth === undefined ? window.innerWidth : page.clientWidth;
	h = window.innerHeight === undefined ? window.innerHeight : page.clientHeight;
	return [x, y, x + w, y + h];
}

function getElementRect(element) {
	'use strict';
	var x = 0,
		y = 0,
		w = element.offsetWidth,
		h = element.offsetHeight;
	while (element.offsetParent !== null) {
		x += element.offsetLeft;
		y += element.offsetTop;
		element = element.offsetParent;
	}
	return [x, y, x + w, y + h];
}

function getElementTop(element) {
	'use strict';
	var y = 0;
	while (element.offsetParent !== null) {
		y += element.offsetTop;
		element = element.offsetParent;
	}
	return y;
}

function VisibilityMonitor(showfn, hidefn) {
	'use strict';

	function check() {
		var elements = document.getElementsByClassName('lazyload'),
			i,
			isshown,
			lockitems,
			top_temp;

		for (i = 0; i < elements.length; i += 1) {
			isshown = elements[i].classList.contains('show');
			if (rectsIntersect(getPageRect(), getElementRect(elements[i])) !== isshown) {
				isshown = !isshown;
				if (isshown) {
					if (elements[i].complete) {
						showfn(elements[i]);
					} else if (elements[i].complete === undefined) {
						showfn(elements[i]);
					}
				} else {
					if (hidefn) {
						hidefn(elements[i]);
					}
				}
			}
		}
		lockitems = document.getElementsByClassName('lockonhead');
		for (i = 0; i < lockitems.length; i += 1) {
			if (lockitems[i].originalTop) {
				top_temp = lockitems[i].originalTop;
			} else {
				top_temp = getElementTop(lockitems[i]);
			}
			if (top_temp < window.scrollY) {
				lockitems[i].classList.add('fixed');
				lockitems[i].originalTop = top_temp;
			} else {
				lockitems[i].classList.remove('fixed');
				lockitems[i].originalTop = 0;
			}
		}

	}
	if (window.attachEvent) {
		window.attachEvent('onresize', check);
		window.attachEvent('onscroll', check);
	} else if (window.addEventListener) {
		window.addEventListener('resize', check, true);
		window.addEventListener('scroll', check, true);
	}
	check();
	setInterval(function () {
		check();
	}, 1000);
}



var visibilityMonitor = new VisibilityMonitor(
	function (element) {
		'use strict';
		element.classList.add('show');
		setTimeout(function () {
			element.classList.remove('lazyload');
		}, 500);
	},
	null
);

var text = {};

var text_list = {
	eng: {
		title: "Hello! I'm Alice!",
		index_title: "Hello! I'm Alice!",
		resume_title: "My Resume",
		mywork_title: "My Collection",
		about_title: "Contact Me",
		menu_index: "Index",
		menu_resume: "Resume",
		menu_mywork: "Collection",
		menu_about: "Contact",
		index_content: "",
		year: (new Date()).getFullYear()
	},
	chs: {
		title: "您好！我是阎泽群！",
		index_title: "您好！我是阎泽群！",
		resume_title: "我的简历",
		mywork_title: "我的作品",
		about_title: "我的联系方式",
		menu_index: "首页",
		menu_resume: "我的简历",
		menu_mywork: "我的作品",
		menu_about: "联系我",
		index_content: "",
		year: (new Date()).getFullYear()
	},
	cht: {
		title: "您好！我是閻澤群！",
		index_title: "您好！我是閻澤群！",
		resume_title: "我的簡歷",
		mywork_title: "我的作品",
		about_title: "我的聯繫方式",
		menu_index: "首頁",
		menu_resume: "我的簡歷",
		menu_mywork: "我的作品",
		menu_about: "聯繫我",
		index_content: "",
		year: (new Date()).getFullYear()
	},
	jan: {
		title: "こんにちは、閻 澤群です！",
		index_title: "こんにちは、閻 澤群です！",
		resume_title: "私の履歴",
		mywork_title: "私の仕事",
		about_title: "私の連絡先",
		menu_index: "ホーム",
		menu_resume: "履歴",
		menu_mywork: "コレクション",
		menu_about: "コンタクト",
		index_content: "",
		year: (new Date()).getFullYear()
	}
};

var lang = window.navigator.userLanguage || window.navigator.language;

if (lang.toLowerCase().indexOf("en") !== -1) {
	text = text_list.eng;
} else if (lang.toLowerCase().indexOf("tw") !== -1) {
	text = text_list.cht;
} else if (lang.toLowerCase().indexOf("hk") !== -1) {
	text = text_list.cht;
} else if (lang.toLowerCase().indexOf("hant") !== -1) {
	text = text_list.cht;
} else if (lang.toLowerCase().indexOf("zh") !== -1) {
	text = text_list.chs;
} else if (lang.toLowerCase().indexOf("ja") !== -1) {
	text = text_list.jan;
} else {
	text = text_list.eng;
}

document.querySelectorAll('[data]').forEach(function (ele) {
	'use strict';
	if (text[ele.getAttribute('data')]) {
		ele.innerHTML = text[ele.getAttribute('data')];
	}
});

document.querySelectorAll('.button').forEach(function (item) {
	'use strict';
	item.addEventListener('click', function (e) {
		e.preventDefault();
		document.getElementsByClassName('section-wrapper')[0].classList.remove('index', 'resume', 'mywork', 'about');
		if (e.target.hash === "#index") {
			document.getElementsByClassName('section-wrapper')[0].classList.add('index');
		} else if (e.target.hash === "#resume") {
			document.getElementsByClassName('section-wrapper')[0].classList.add('resume');
		} else if (e.target.hash === "#mywork") {
			document.getElementsByClassName('section-wrapper')[0].classList.add('mywork');
		} else if (e.target.hash === "#about") {
			document.getElementsByClassName('section-wrapper')[0].classList.add('about');
		}
		document.getElementsByClassName('active')[0].classList.remove('active');
		this.classList.add('active');
	});
});

document.querySelectorAll('.lang-button').forEach(function (item) {
	'use strict';
	item.addEventListener('click', function (e) {
		e.preventDefault();
		if (e.target.hash === "#english") {
			text = text_list.eng;
		} else if (e.target.hash === "#chinese") {
			text = text_list.chs;
		} else if (e.target.hash === "#tchinese") {
			text = text_list.cht;
		} else if (e.target.hash === "#japanese") {
			text = text_list.jan;
		}
		document.querySelectorAll('[data]').forEach(function (ele) {
			if (text[ele.getAttribute('data')]) {
				ele.innerHTML = text[ele.getAttribute('data')];
				ele.classList.add('blur');
			}
		});
		window.requestAnimationFrame(function () {
			document.querySelectorAll('[data]').forEach(function (ele) {
				ele.classList.remove('blur');
			});
		});
		if (document.getElementsByClassName('selected').length) {
			document.getElementsByClassName('selected')[0].classList.remove('selected');
		}
		this.classList.add('selected');
	});
});

setTimeout(function () {
	'use strict';
	document.body.classList.add('show');
}, 500);
