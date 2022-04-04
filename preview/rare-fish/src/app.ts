import { Resource, Element } from './element.interface';
import { DOM, Util } from './common';

HTMLElement.prototype.addClass = function (className: string) {
  if (!this.classList.contains(className)) {
    this.classList.add(className);
  }
};

HTMLElement.prototype.removeClass = function (className: string) {
  if (this.classList.contains(className)) {
    this.classList.remove(className);
  }
};
HTMLElement.prototype.toggleClass = function (className: string) {
  if (!this.classList.contains(className)) {
    this.classList.add(className);
  } else {
    this.classList.remove(className);
  }
};

export class App {
  private width: number = 38976;
  private height: number = 2008;
  private isTail: boolean = false;

  constructor() {
  }

  public async start() {
    await this.waitDocumentReady();
    const resource = await this.getResource();

    this.width = resource.width;
    this.height = resource.height;

    this.initialCanvasSize();
    const result = await this.applyResource(resource);

    if (result) {
      await Util.timeout(500);
      this.enableStartButton();
      this.enableHomeButton();
      
      if (location.search.includes('scrolloverride')) {
        this.enableSwipeOverride();
      }

      //await Util.timeout(2000);
      //this.enableAutoPlayButton();
    } else {
      this.showErrorMessage();
    }
  }

  private showErrorMessage() {
    DOM.query('.loading-title').textContent = '资源加载失败！请您尝试刷新页面。';
    DOM.query('.loading-count').addClass('hidden');
    DOM.query('.loading-refresh').removeClass('hidden');
    DOM.query('.loading-refresh').onclick = async () => {
      location.reload();
    }
  }

  private enableSwipeOverride() {
    DOM.query('html').style.scrollBehavior = 'auto';
    let startX=0, startY=0, moveEndX=0, moveEndY=0;  
    window.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    });
    window.addEventListener("touchmove", (e) => {
      e.preventDefault();
        moveEndX = e.changedTouches[0].pageX;
        moveEndY = e.changedTouches[0].pageY;
        const x = moveEndX - startX;
        const y = moveEndY - startY;
        if (document.scrollingElement) {
          document.scrollingElement.scrollBy(x * -1, y * -1);
        }
    }, { passive: false });
  }

  private setMusic() {
    const audio = DOM.query('#bgm') as HTMLAudioElement;
    if (audio.paused) {
      try {
        audio.currentTime = 0;
        audio.volume = .2;
        audio.play();
      }
      catch {

      }
    } else {
      audio.volume = .2;
    }
  }

  private playMusic() {
    const func = () => {
      document.removeEventListener('touchstart', func);

      const audio = DOM.query('#bgm') as HTMLAudioElement;
      audio.volume = 0;
      audio.play();
    };
    document.addEventListener('touchstart', func, false);
  }

  private toggleFullScreen() {
    if (!document.documentElement.requestFullscreen) {
      return;
    }
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  private enableHomeButton() {
    const button = DOM.query('.home-button');
    button.onclick = (e) => {
      e.preventDefault();
      if (document.scrollingElement) {
        document.scrollingElement.scrollLeft = 0;
      }
    }
  }

  private enableAutoPlayButton() {
    const button = DOM.query('.loading-autoplay');
    button.onclick = async () => {
      button.addClass('hidden');
      DOM.query('.loading-button').click();

      await Util.timeout(5000);
      this.startAutoPlayInterval();
    }
    button.removeClass('hidden');
  }

  private startAutoPlayInterval() {
    const id = setInterval(() => {
      if (!this.isTail) {
        window.scrollBy({
          top: 0,
          left: 10,
          behavior: 'smooth'
        });
      } else {
        clearInterval(id);
      }
    }, 10);
  }

  private enableStartButton() {
    const panel = DOM.query('#nav-loading');
    const button = DOM.query('.loading-button');
    const title = DOM.query('.loading-title');
    title.textContent = '媒体资源加载成功！';
    button.onclick = async () => {
      //this.toggleFullScreen();

      button.addClass('hidden');
      panel.addClass('hidden');
      DOM.query('#canvas-main').removeClass('loading');

      this.setScrollEvent();
      this.setIntersectionObserver();
      this.startAnimation();

      await Util.timeout(1000);
      this.setMusic();

      panel.remove();
    }
    DOM.query('.loading-count').addClass('hidden');
    button.removeClass('hidden');
  }

  private startAnimation() {
    const overlay = DOM.query('#overlay');
    const slider = DOM.query('.indicator-slide');
    const home = DOM.query('.indicator-home');

    const x = window.scrollX;
    const t = x + window.innerWidth - window.document.body.scrollWidth;
    overlay.removeClass('head');
    overlay.removeClass('tail');
    if (x < 10) {
      this.isTail = false;
      overlay.addClass('head');
      slider.style.display = 'block';
    } else if (t > -10) {
      this.isTail = true;
      overlay.addClass('tail');
      slider.style.display = 'none';
    } else {
      slider.style.display = 'block';
      this.isTail = false;
    }

    if (t > -25) {
      home.removeClass('hidden');
    } else {
      home.addClass('hidden');
    }

    slider.addClass('hidden');

    this.checkScrollEffect(x / (window.document.body.scrollWidth - window.innerWidth));

    DOM.queryAll('[data-ani="instant"]').forEach(node => {
      node.addClass('active');
    });

    Util.setIdle(() => {
      slider.removeClass('hidden');
    }, 5000);
  }

  private setScrollEvent() {
    const body = DOM.query('body');
    const overlay = DOM.query('#overlay');
    const slider = DOM.query('.indicator-slide');
    const home = DOM.query('.indicator-home');

    body.style.overflow = "auto";
    body.style.width = "auto";
    body.style.height = "auto";

    window.addEventListener('scroll', () => {
      const x = window.scrollX;
      const t = x + window.innerWidth - window.document.body.scrollWidth;
      overlay.removeClass('head');
      overlay.removeClass('tail');
      if (x < 10) {
        this.isTail = false;
        overlay.addClass('head');
        home.addClass('hidden');
        slider.style.display = 'block';
      } else if (t > -10) {
        this.isTail = true;
        overlay.addClass('tail');
        home.addClass('hidden');
        slider.style.display = 'none';
      } else {
        home.removeClass('hidden');
        slider.style.display = 'block';
        this.isTail = false;
      }

      if (t > -25) {
        home.removeClass('hidden');
      } else {
        home.addClass('hidden');
      }

      slider.addClass('hidden');

      this.checkScrollEffect(x / (window.document.body.scrollWidth - window.innerWidth));

      Util.notIdle();
    }, false);
  }

  private checkScrollEffect(percent: number) {
    DOM.queryAll('[data-sccfx]').forEach(node => {
      let effect = node.getAttribute('data-sccfx');
      if (effect) {
        node.style.transform = `translate(${percent * parseInt(effect)}em,0)`;
      }
    });
  }

  private setIntersectionObserver() {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            const target = entry.target as HTMLElement;
            target.addClass('active');

            if (target.hasAttribute('data-with')) {
              const withNode = DOM.queryAll(`[data-trg="${target.getAttribute('data-id')}"]`);
              if (withNode) {
                withNode.forEach(item => item.addClass('active'));
              }
            }

            io.unobserve(target);
          }
        });
      });
    DOM.queryAll('[data-trg="scrollin"]').forEach(node => {
      io.observe(node);
    });
  }

  private initialCanvasSize() {
    const container = DOM.query('#container-main');
    container.style.fontSize = `${100 / this.height}vh`;
    const canvas = DOM.query('#canvas-main');
    canvas.style.width = `${this.width}em`;
    canvas.style.height = `${this.height}em`;
  }

  private applyResource(resource: Resource) {
    return new Promise<boolean>(async (resolve) => {
      const audio = DOM.query('#bgm') as HTMLAudioElement;
      if (resource.music) {
        audio.src = resource.music;
        this.playMusic();
      }

      const countLabel = DOM.query('.loading-count>span');
      const prefix = resource.origin;
      let max = 0;
      let count = 0;
      let error = 0;

      resource.elements.forEach(element => {
        let id = element.name;
        let list = DOM.queryAll(`[data-id='${id}']`);
        if (list) {
          list.forEach(node => {
            max++;
            const x = element.rdm_x ? element.x + Math.round((1 - Math.random() * 2) * element.rdm_x) : element.x;
            const y = element.rdm_y ? element.y + Math.round((1 - Math.random() * 2) * element.rdm_y) : element.y;

            let img = new Image();
            img.onload = () => {
              count++;
              countLabel.textContent = `${Math.floor(count / max * 100)}%`;
            };
            img.onerror = (e) => {
              error++;
            }
            img.src = prefix + element.path;
            img.width = element.width;
            img.height = element.height;
            img.style.width = `${element.width}em`;
            img.style.height = `${element.height}em`;
            if (element.opacity) {
              img.style.opacity = element.opacity.toString();
            }
            node.style.left = `${x}em`;
            node.style.top = `${y}em`;
            node.appendChild(img);
          });
        }
      });

      while (count < max) {
        if (error) {
          return resolve(false);
        }

        await Util.timeout(100);
      }

      resolve(true);
    });
  }

  private waitDocumentReady(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        resolve(true);
      } else {
        const callback = () => {
          document.removeEventListener('DOMContentLoaded', callback);
          resolve(true);
        };
        document.addEventListener('DOMContentLoaded', callback);
      }
    });
  }

  private getResource() {
    return new Promise<Resource>((resolve, reject) => {
      const url = 'resource.json';
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}