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
		index_content1: "My name is Alice Yan. I am a Chinese girl who graduated from Peking University. And my major is Digital Animation in the field of Computer Technology. I found my interests in cartoons when I was little, by the reason I kept improving my drawing skills by communicating with animators and practicing on my board. And now I could describe a full story by animation that created all by my own. I’m proud of it, and I know my career is on it.",
		index_content2: "Once I fortunately gained an opportunity to visit Stanford university as a exchange student. During this period I was shocked by the unforgettable academic atmosphere in American colleges and the superior innovation ability of students. Such fresh air attracted me very much and I determined to become one of the elements someday.",
		index_content3: "My motto is: I want to work miracles. I believe that youth requires adventure and exploration, just like \"Alice's adventures in the wonderland\". Since I was a child I was considered as a rebellious, lonely girl. But I know that the true spirit of life should be the courage to seek breakthrough and challenge, but not to Succumb to difficulties. I’d like to keep running, cross mountains and rivers, overcome obstacles and barriers, to find the bright sunshine in the distance. I believe there will be a wider stage waiting for me, and I will present all my talent and charm to the world!",
		resume_name: "Alice Yan",
		resume_title1: "Digital Animator",
		resume_title2: "Game Designer",
		resume_type1: "Education",
		resume_type2: "Experience",
		resume_org1: "Peking University",
		resume_time1: "Sep 2015 - Current",
		resume_pro1: "master of digital animation",
		resume_info1: "Learnt the courses about computer animation, character design and storyboard, created many digital animation products and video games that gained huge popularity in schools.",
		resume_org2: "Stanford University",
		resume_time2: "July 2014 - Sep 2014",
		resume_pro2: "exchange visitor",
		resume_info2: "Completed several summer lessons about culture research and digital arts, visited the Giants located in silicon valley and studied the advanced environment of working and living.",
		resume_org3: "Ministry of Culture of the PRC",
		resume_time3: "Aug 2015 - Current",
		resume_pro3: "research assistant",
		resume_info3: "Participated in the integration, classification and analysis of national cultural resources, and researched the local cultural characteristics of various regions and diverse cultural transmission.",
		resume_org4: "Center for ETL of Peking University",
		resume_time4: "Aug 2015 - Aug 2016",
		resume_pro4: "project leader",
		resume_info4: "Led the team to finish the deep data mining of culture data with professional vision, published a number of research papers as well.",
		resume_org5: "Peking University Press",
		resume_time5: "Apr 2015 - July 2015",
		resume_pro5: "office assistant",
		resume_info5: "Responsible for the analysis work of press materials, meanwhile organized several social practice events.",
		resume_org6: "Peking University",
		resume_time6: "June 2015 - June 2016",
		resume_pro6: "faculty assistant",
		resume_info6: "Supervise and handle the students' courses, examinations and employment issues, and assist  teachers in the completion of the school work.",
		resume_skill: "skills",
		resume_skill1: "Animation",
		resume_skill2: "Storyboard",
		resume_skill3: "Scene Design",
		resume_skill4: "3D Modeling",
		resume_social: "my social",
		resume_download: "Download",
		about_p1: "Glad to see you my friends! You can find me on these social networks!",
		about_p2: "And you can also send me Email! Here's my mail address:",
		about_p3: "Thank you to visit my site!",
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
		index_content1: "我的名字叫阎泽群，我是一个来自北京大学的中国女孩，在大学学习与计算机技术相关的数字动画创作专业。在我很小的时候我就发现了自己对于卡通动画的兴趣，因此我从小就开始锻炼自己绘画和艺术方面的能力。如今我已经可以自如地使用动画来呈现一个完整的故事，我为此感到自豪，并相信这就是自己的事业所在。",
		index_content2: "我曾经有幸得到了一次前往斯坦福大学交流参观的机会，在这次旅途中，令人难以忘怀的美国学院氛围和同学们超乎寻常的创造力让我感到震惊，这种带有浓厚异国情调和文化感染力的环境令我无比神往，也让我有了进一步努力的动力和方向。",
		index_content3: "我的人生信条是，我愿与奇迹同行。我相信年轻这个词包含着冒险与探索精神，正如童话故事《爱丽丝的奇异幻境》中描绘的那样。我从小就被当成是一个叛逆、孤独的女孩，但我相信，不愿被世俗所困，努力寻求突破和挑战，正是人生的真正意义。我愿不断披荆斩棘、跋山涉水，直至看见远方的朝阳。我相信会有更大的舞台等待着我去展现自己的才华与魅力！",
		resume_name: "阎泽群",
		resume_title1: "数字动画师",
		resume_title2: "游戏设计师",
		resume_type1: "教育经历",
		resume_type2: "项目经验",
		resume_org1: "北京大学",
		resume_time1: "2015年9月 - 现在",
		resume_pro1: "计算机动画创作专业硕士",
		resume_info1: "学习计算机动画、角色与游戏设计、故事版创作等相关课程，制作了一系列具有市场价值的数字动画以及视频游戏等作品。",
		resume_org2: "斯坦福大学",
		resume_time2: "2014年7月 - 2014年9月",
		resume_pro2: "交换访问者",
		resume_info2: "完成各项与文化研究、数字艺术发展相关的暑期课程，并在硅谷各大企业进行交流访问活动，深入了解当地人文情怀。",
		resume_org3: "中华人民共和国文化部",
		resume_time3: "2015年8月 - 现在",
		resume_pro3: "研究助理",
		resume_info3: "参与国家文化资源的整合、归类和分析工作，研究中国各个地区与民族的地方文化特色以及多样化的文化传达方式。",
		resume_org4: "北京大学教师教学发展中心",
		resume_time4: "2015年8月 - 2016年8月",
		resume_pro4: "课题组组长",
		resume_info4: "以专业眼光进行文化数据的深度挖掘和分类，带领课题组进行分析和探讨工作，同时完成了多篇文化领域研究论文。",
		resume_org5: "北京大学出版社",
		resume_time5: "2015年4月 - 2015年7月",
		resume_pro5: "办公室助理",
		resume_info5: "负责出版资料的整理和分析工作，同时组织了多次社会实践活动。",
		resume_org6: "北京大学",
		resume_time6: "2015年6月 - 2016年6月",
		resume_pro6: "学生助理",
		resume_info6: "主管校内学生的组织与实践工作，协调和处理同学们的课程、考试和就业问题，协助教务处老师完成各项校内工作。",
		resume_skill: "我的技能",
		resume_skill1: "动画制作",
		resume_skill2: "故事版",
		resume_skill3: "场景设计",
		resume_skill4: "3D建模",
		resume_social: "社交媒体",
		resume_download: "下载简历",
		about_p1: "很高兴和您成为朋友！您可以在以下的社交网络上联系我。",
		about_p2: "您也可以给我发送电子邮件，下面是我的邮箱地址：",
		about_p3: "感谢您访问我的网站！",
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
		index_content1: "我的名字叫閻澤群，我是一個來自北京大學的中國女孩，在大學學習與計算機技術相關的數字動畫創作專業。在我很小的時候我就發現了自己對於卡通動畫的興趣，因此我從小就開始鍛鍊自己繪畫和藝術方面的能力。如今我已經可以自如地使用動畫來呈現一個完整的故事，我為此感到自豪，並相信這就是自己的事業所在。",
		index_content2: "我曾經有幸得到了一次前往斯坦福大學交流參觀的機會，在這次旅途中，令人難以忘懷的美國學院氛圍和同學們超乎尋常的創造力讓我感到震驚，這種帶有濃厚異國情調和文化感染力的環境令我無比神往，也讓我有了進一步努力的動力和方向。",
		index_content3: "我的人生信條是，我願與奇跡同行。我相信年輕這個詞包含著冒險與探索精神，正如童話故事《愛麗絲的奇異幻境》中描繪的那樣。我從小就被當成是一個叛逆、孤獨的女孩，但我相信，不願被世俗所困，努力尋求突破和挑戰，正是人生的真正意義。我願不斷披荊斬棘、跋山涉水，直至看見遠方的朝陽。我相信會有更大的舞台等待著我去展現自己的才華與魅力！",
		resume_name: "閻澤群",
		resume_title1: "數字動畫師",
		resume_title2: "遊戲設計師",
		resume_type1: "教育經歷",
		resume_type2: "項目經驗",
		resume_org1: "北京大學",
		resume_time1: "2015年9月 - 現在",
		resume_pro1: "計算機動畫創作專業碩士",
		resume_info1: "學習計算機動畫、角色與遊戲設計、故事版創作等相關課程，製作了一系列具有市場價值的數字動畫以及視頻遊戲等作品。",
		resume_org2: "斯坦福大學",
		resume_time2: "2014年7月 - 2014年9月",
		resume_pro2: "交換訪問者",
		resume_info2: "完成各項與文化研究、數字藝術發展相關的暑期課程，並在硅谷各大企業進行交流訪問活動，深入瞭解當地人文情懷。",
		resume_org3: "中華人民共和國文化部",
		resume_time3: "2015年8月 - 現在",
		resume_pro3: "研究助理",
		resume_info3: "參與國家文化資源的整合、歸類和分析工作，研究中國各個地區與民族的地方文化特色以及多樣化的文化傳達方式。",
		resume_org4: "北京大學教師教學發展中心",
		resume_time4: "2015年8月 - 2016年8月",
		resume_pro4: "課題組組長",
		resume_info4: "以專業眼光進行文化數據的深度挖掘和分類，帶領課題組進行分析和探討工作，同時完成了多篇文化領域研究論文。",
		resume_org5: "北京大學出版社",
		resume_time5: "2015年4月 - 2015年7月",
		resume_pro5: "辦公室助理",
		resume_info5: "負責出版資料的整理和分析工作，同時組織了多次社會實踐活動。",
		resume_org6: "北京大學",
		resume_time6: "2015年6月 - 2016年6月",
		resume_pro6: "學生助理",
		resume_info6: "主管校內學生的組織與實踐工作，協調和處理同學們的課程、考試和就業問題，協助教務處老師完成各項校內工作。",
		resume_skill: "我的技能",
		resume_skill1: "動畫製作",
		resume_skill2: "故事版",
		resume_skill3: "場景設計",
		resume_skill4: "3D建模",
		resume_social: "社交媒體",
		resume_download: "下載簡歷",
		about_p1: "很高興和您成為朋友！您可以在以下的社交網路上聯繫我。",
		about_p2: "您也可以給我發送電子郵件，下面是我的電郵地址：",
		about_p3: "感謝您訪問我的站點！",
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
		index_content1: "私の名前は閻 澤群です。私は北京大学を卒業した中国人の女の子です。私の専攻はコンピュータ技術分野のデジタルアニメーションです。アニメーターとコミュニケーションをとり、私のボードで練習して描くスキルを向上させた理由で、私が少しでも漫画に興味を持ちました。そして今私は自分自身ですべてを創造したアニメーションで完全なストーリーを描くことができました。私はそれを誇りに思い、私は自分のキャリアがそれにあることを知っています。",
		index_content2: "スタンフォード大学を交換留学生として訪ねる機会が得られたのは幸いでした。この間、私はアメリカの大学の忘れられない学問的雰囲気と学生の優れたイノベーション能力に衝撃を受けました。そのような新鮮な空気は私を非常に魅了し、いつかは要素の1つになることを決めました。",
		index_content3: "私のモットーは：私は奇跡を働きたい。私は若者は「アリスの冒険」のように冒険と探検を必要としていると信じています。私が子供だったので、私は反抗的で孤独な女の子とみなされました。しかし、私は人生の真の精神は、突破口と挑戦を求める勇気でなければならないが、困難に屈することはないことを知っている。私は走り続け、山と川を渡り、障害や障壁を乗り越えて、遠くの明るい日差しを見つけたい。私は待っているステージが広がると信じて、私の才能と魅力を世界に紹介します！",
		resume_name: "閻 澤群",
		resume_title1: "デジタルアニメーター",
		resume_title2: "ゲームデザイナー",
		resume_type1: "教育経験",
		resume_type2: "プロジェクト実績",
		resume_org1: "北京大学",
		resume_time1: "2015年9月 - 今",
		resume_pro1: "デジタルアニメーションのマスター",
		resume_info1: "コンピュータアニメーション、キャラクターデザイン、ストーリーボードに関するコースを学び、多くのデジタルアニメーション製品やビデオゲームを作り、学校で大きな人気を得ました。",
		resume_org2: "スタンフォード大学",
		resume_time2: "2014年7月 - 2014年9月",
		resume_pro2: "交流訪問者",
		resume_info2: "文化研究とデジタルアートに関する夏のレッスンをいくつか行い、シリコンバレーにあるジャイアンツを訪れ、先進的な生活環境を学びました。",
		resume_org3: "中華人民共和国文化部",
		resume_time3: "2015年8月 - 今",
		resume_pro3: "リサーチアシスタント",
		resume_info3: "国の文化資源の統合、分類、分析に参加し、様々な地域の文化的特徴や文化的多様性を研究した。",
		resume_org4: "北京大学ETLセンター",
		resume_time4: "2015年8月 - 2016年8月",
		resume_pro4: "チームリーダー",
		resume_info4: "専門的なビジョンで文化データの深いデータマイニングを完了するようチームに指導し、多くの研究論文を発表しました。",
		resume_org5: "北京大学プレス",
		resume_time5: "2015年4月 - 2015年7月",
		resume_pro5: "アシスタント",
		resume_info5: "その一方で、報道資料の分析作業を担当し、いくつかの社会練習イベントを企画しました。",
		resume_org6: "北京大学",
		resume_time6: "2015年6月 - 2016年6月",
		resume_pro6: "アシスタント",
		resume_info6: "学生のコース、試験、雇用問題を監督し、取り扱い、学校の仕事の完了時に教師を助ける。",
		resume_skill: "私のスキル",
		resume_skill1: "アニメーション",
		resume_skill2: "ストーリボード",
		resume_skill3: "シーンデザイン",
		resume_skill4: "3Dモデリング",
		resume_social: "ソーシャル",
		resume_download: "ダンロード",
		about_p1: "あなたの友人であることがうれしいです！あなたは以下のソーシャルネットワーク上で私に連絡することができます。",
		about_p2: "メールはもちろんオッケーだ、私のメールアドレスはここ：",
		about_p3: "このサイトを訪問していただきありがとうございます！",
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

if (document.location.href.indexOf("?index") !== -1) {
	document.getElementsByClassName('section-wrapper')[0].classList.add('index');
} else if (document.location.href.indexOf("?resume") !== -1) {
	document.getElementsByClassName('section-wrapper')[0].classList.add('resume');
} else if (document.location.href.indexOf("?mywork") !== -1) {
	document.getElementsByClassName('section-wrapper')[0].classList.add('mywork');
} else if (document.location.href.indexOf("?about") !== -1) {
	document.getElementsByClassName('section-wrapper')[0].classList.add('about');
}

document.querySelectorAll('.section-button').forEach(function (item) {
	'use strict';
	item.addEventListener('click', function (e) {
		e.preventDefault();
		document.getElementsByClassName('section-wrapper')[0].classList.remove('index', 'resume', 'mywork', 'about');
		if (e.target.hash === "#index") {
			document.getElementsByClassName('section-wrapper')[0].classList.add('index');
			window.history.pushState(null, "", "?index");
		} else if (e.target.hash === "#resume") {
			document.getElementsByClassName('section-wrapper')[0].classList.add('resume');
			window.history.pushState(null, "", "?resume");
		} else if (e.target.hash === "#mywork") {
			document.getElementsByClassName('section-wrapper')[0].classList.add('mywork');
			window.history.pushState(null, "", "?mywork");
		} else if (e.target.hash === "#about") {
			document.getElementsByClassName('section-wrapper')[0].classList.add('about');
			window.history.pushState(null, "", "?about");
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
		}, 300);
		if (document.getElementsByClassName('selected').length) {
			document.getElementsByClassName('selected')[0].classList.remove('selected');
		}
		this.classList.add('selected');
	});
});

document.querySelectorAll('.collection-image').forEach(function (item) {
	'use strict';
	item.addEventListener('click', function (e) {
		e.preventDefault();
		if (this.classList.contains('focus')) {
			this.classList.remove('focus');
			document.getElementById('collection').classList.remove('hasFocus');
		} else {
			document.querySelectorAll('.focus').forEach(function (ele) {
				ele.classList.remove('focus');
			});
			this.classList.add('focus');
			document.getElementById('collection').classList.add('hasFocus');
		}
	});
});

setTimeout(function () {
	'use strict';
	document.body.classList.add('show');
}, 500);
