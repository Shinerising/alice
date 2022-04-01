import { Element } from './element.interface';
import { DOM, Util } from './common';
import { rejects } from 'assert';
import { domainToASCII } from 'url';

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
  private prefix: string = './images/';
  private width:number = 38976;
  private height:number = 2008;

  constructor(){
  }

  public async start() {
    await this.waitDocumentReady();
    this.initialCanvasSize();
    const elementResource = await this.getElementResource();
    const result = await this.applyResource(elementResource);

    if (result) {
      await Util.timeout(500);
      this.enableStartButton();
    } else{

    }
  }

  private toggleFullScreen() {
    if(!document.documentElement.requestFullscreen){
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

  private enableStartButton(){
    const panel = DOM.query('#nav-loading');
    const button = DOM.query('.loading-button');
    button.onclick = async () => {
      //this.toggleFullScreen();

      button.addClass('hidden');
      panel.addClass('hidden');
      DOM.query('#canvas-main').removeClass('loading');

      this.setScrollEvent();
      this.setIntersectionObserver();
      this.startAnimation();

      await Util.timeout(1000);

      panel.remove();
    }
    DOM.query('.loading-count').addClass('hidden');
    button.removeClass('hidden');
  }

  private startAnimation() {
    const overlay = DOM.query('#overlay');
    const canvas = DOM.query('#canvas-main');
    const slider = DOM.query('.indicator-slide');
    
    const x = window.scrollX;
    overlay.removeClass('head');
    overlay.removeClass('tail');
    if(x < 10){
      overlay.addClass('head');
    } else if (x + window.innerWidth - window.document.body.scrollWidth > -10) {
      overlay.addClass('tail');
      slider.style.display = 'none';
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

  private setScrollEvent(){
    const body = DOM.query('body');
    const overlay = DOM.query('#overlay');
    const canvas = DOM.query('#canvas-main');
    const slider = DOM.query('.indicator-slide');

    body.style.overflow = "auto";
    body.style.width = "auto";
    body.style.height = "auto";

    window.addEventListener('scroll', () => {
      const x = window.scrollX;
      overlay.removeClass('head');
      overlay.removeClass('tail');
      if(x < 10){
        overlay.addClass('head');
      } else if (x + window.innerWidth - window.document.body.scrollWidth > -10) {
        overlay.addClass('tail');
        slider.style.display = 'none';
      }

      slider.addClass('hidden');

      this.checkScrollEffect(x / (window.document.body.scrollWidth - window.innerWidth));

      Util.notIdle();
    }, false);
  }

  private checkScrollEffect(percent:number){
    DOM.queryAll('[data-sccfx]').forEach(node => {
      let effect = node.getAttribute('data-sccfx');
      if (effect) {
        node.style.transform = `translate(${percent*parseInt(effect)}em,0)`;
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
          }
        });
      });
      DOM.queryAll('[data-trg="scrollin"]').forEach(node => {
        io.observe(node);
      });
  }

  private initialCanvasSize(){
    const container = DOM.query('#container-main');
    container.style.fontSize = `${100 / this.height}vh`;
    const canvas = DOM.query('#canvas-main');
    canvas.style.width = `${this.width}em`;
    canvas.style.height = `${this.height}em`;
  }

  private applyResource(elementResource: Element[]) {
    return new Promise<boolean>(async (resolve) => {
      const countLabel = DOM.query('.loading-count>span');
      let max = 0;
      let count = 0;
      let error = 0;

      elementResource.forEach(element => {
        let id = element.name;
        let node = DOM.query(`[data-id='${id}']`);
        if(node){
          max ++;
          let img = new Image();
          img.onload = () => {
            count ++;
            countLabel.textContent = `${Math.floor(count/max*100)}%`;
          };
          img.onerror = (e) => {
            error ++;
          }
          img.src = this.prefix + element.path;
          img.width = element.width;
          img.height = element.height;
          img.style.width = `${element.width}em`;
          img.style.height = `${element.height}em`;
          node.style.left = `${element.x}em`;
          node.style.top = `${element.y}em`;
          node.appendChild(img);
        }
      });

      while (count < max) {
        if(error){
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

  private getElementResource() {
    return new Promise<Element[]>((resolve, reject) => {
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