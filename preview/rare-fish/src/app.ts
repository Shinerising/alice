import { Element } from './element.interface';
import { DOM } from './common'
import { emit } from 'process';

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
  }

  private initialCanvasSize(){
    const container = DOM.query('#container-main');
    container.style.fontSize = `${100 / this.height}vh`;
    const canvas = DOM.query('#canvas-main');
    canvas.style.width = `${this.width}em`;
    canvas.style.height = `${this.height}em`;
  }

  private applyResource(elementResource: Element[]) {
    return new Promise<boolean>((resolve) => {
      elementResource.forEach(element => {
        let id = element.name;
        console.log(id);
        let node = DOM.query(`[data-id='${id}']`);
        if(node){
          let img = new Image();
          img.src = this.prefix + element.path;
          img.width = element.width;
          img.height = element.height;
          img.style.width = `${element.width}em`;
          img.style.height = `${element.height}em`;
          img.onload = () => {
          };
          node.appendChild(img);
        }
      });
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