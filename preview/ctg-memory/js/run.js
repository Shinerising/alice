let linkCheck = (link) => {
  if (link.endsWith('/index.html') || link.endsWith('/')) {
    startLoading();
  }
  if (link.endsWith('/index1.html')) {
    if (document.getElementById("bg-music")) {
      document.getElementById("bg-music").volume = 0.4;
    }
  } else {
    if (document.getElementById("bg-music")) {
      document.getElementById("bg-music").volume = 1;
    }
  }
  musicPlay(true);
}
let openLink = (link, isClick) => {
  let node = link + ' #container > div';
  $('#container').fadeOut('fast');
  $('#container').load(node, (result) => {
    $('#container').fadeIn('fast');
    if (isClick) {
      window.history.pushState({
        link: link
      }, document.title, link);
    }
    setClickEvent();

    linkCheck(link);
  });
}
let setClickEvent = () => {
  $('#container a').on('click', (e) => {
    let link = e.currentTarget.href;
    if (!link.includes('javascript')) {
      e.preventDefault();
      openLink(link, true);
    }
  })
}
let setHistoryEvent = () => {
  window.addEventListener('popstate', (e) => {
    e.preventDefault();
    openLink(document.location.pathname);
  });
}
let startLoading = () => {
  let bar = 0　
  let line = "|"　
  let amount = "|"
  let loadCount = () => {
    bar = bar + 2　
    amount = amount + line　
    document.loading.chart.value = amount　
    document.loading.percent.value = bar + "%"　
    if (bar < 99)　 {
      setTimeout(loadCount, 100);
    }　
    else {
      openLink('/index1.html', true);
    }
  }　
  loadCount();
}

$(document).ready(() => {
  setClickEvent();
  setHistoryEvent();
  let link = window.location.pathname;
  linkCheck(link);
});