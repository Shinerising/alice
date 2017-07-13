/*global
  console,
  FormData,
  fetch
 */

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
		resume_name: "Alice Yan",
		resume_title1: "Digital Animator",
		resume_title2: "Game Designer",
		resume_type1: "Education",
		resume_type2: "Experience",
		resume_org1: "Peking University",
		resume_time1: "",
		resume_pro1: "master of digital animation",
		resume_info1: "",
		resume_org2: "Stanford University",
		resume_time2: "",
		resume_pro2: "visiting scholar",
		resume_info2: "",
		resume_org3: "Ministry of Culture of the PRC",
		resume_time3: "",
		resume_pro3: "research assistant",
		resume_info3: "",
		resume_org4: "Center for ETL of Peking University",
		resume_time4: "",
		resume_pro4: "project leader",
		resume_info4: "",
		resume_org5: "Peking University Press",
		resume_time5: "",
		resume_pro5: "office assistant",
		resume_info5: "",
		resume_org6: "Peking University",
		resume_time6: "",
		resume_pro6: "faculty assistant",
		resume_info6: "",
		resume_skill: "skills",
		resume_skill1: "Animation",
		resume_skill2: "Storyboard",
		resume_skill3: "Scene Design",
		resume_skill4: "3D Modeling",
		resume_social: "my social",
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
		resume_name: "阎泽群",
		resume_title1: "数字动画师",
		resume_title2: "游戏设计师",
		resume_type1: "教育经历",
		resume_type2: "项目经验",
		resume_org1: "北京大学",
		resume_time1: "",
		resume_pro1: "数字动画专业硕士",
		resume_info1: "",
		resume_org2: "斯坦福大学",
		resume_time2: "",
		resume_pro2: "访问学者",
		resume_info2: "",
		resume_org3: "中国文化部",
		resume_time3: "",
		resume_pro3: "研究助理",
		resume_info3: "",
		resume_org4: "北京大学教师教学发展中心",
		resume_time4: "",
		resume_pro4: "课题组组长",
		resume_info4: "",
		resume_org5: "北京大学出版社",
		resume_time5: "",
		resume_pro5: "办公室助理",
		resume_info5: "",
		resume_org6: "北京大学",
		resume_time6: "",
		resume_pro6: "学生助理",
		resume_info6: "",
		resume_skill: "我的技能",
		resume_skill1: "动画制作",
		resume_skill2: "故事版",
		resume_skill3: "场景设计",
		resume_skill4: "3D建模",
		resume_social: "社交媒体",
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
		resume_name: "Alice Yan",
		resume_title1: "Digital Animator",
		resume_title2: "Game Designer",
		resume_type1: "Education",
		resume_type2: "Experience",
		resume_org1: "Peking University",
		resume_time1: "",
		resume_pro1: "",
		resume_info1: "",
		resume_org2: "Stanford University",
		resume_time2: "",
		resume_pro2: "",
		resume_info2: "",
		resume_org3: "Ministry of Culture of the PRC",
		resume_time3: "",
		resume_pro3: "",
		resume_info3: "",
		resume_org4: "Center for ETL of Peking University",
		resume_time4: "",
		resume_pro4: "",
		resume_info4: "",
		resume_org5: "Peking University Press",
		resume_time5: "",
		resume_pro5: "",
		resume_info5: "",
		resume_org6: "Peking University",
		resume_time6: "",
		resume_pro6: "",
		resume_info6: "",
		resume_skill: "skills",
		resume_skill1: "Animation",
		resume_skill2: "Storyboard",
		resume_skill3: "Scene Design",
		resume_skill4: "3D Modeling",
		resume_social: "my social",
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
		resume_name: "Alice Yan",
		resume_title1: "Digital Animator",
		resume_title2: "Game Designer",
		resume_type1: "Education",
		resume_type2: "Experience",
		resume_org1: "Peking University",
		resume_time1: "",
		resume_pro1: "",
		resume_info1: "",
		resume_org2: "Stanford University",
		resume_time2: "",
		resume_pro2: "",
		resume_info2: "",
		resume_org3: "Ministry of Culture of the PRC",
		resume_time3: "",
		resume_pro3: "",
		resume_info3: "",
		resume_org4: "Center for ETL of Peking University",
		resume_time4: "",
		resume_pro4: "",
		resume_info4: "",
		resume_org5: "Peking University Press",
		resume_time5: "",
		resume_pro5: "",
		resume_info5: "",
		resume_org6: "Peking University",
		resume_time6: "",
		resume_pro6: "",
		resume_info6: "",
		resume_skill: "skills",
		resume_skill1: "Animation",
		resume_skill2: "Storyboard",
		resume_skill3: "Scene Design",
		resume_skill4: "3D Modeling",
		resume_social: "my social",
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
				ele.classList.add('blur');
			}
		});
		setTimeout(function () {
			document.querySelectorAll('[data]').forEach(function (ele) {
				ele.innerHTML = text[ele.getAttribute('data')];
				ele.classList.remove('blur');
			});
		}, 200);
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
