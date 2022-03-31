
/**
 * DOM API
 */
 export class DOM {
    /**
     * Select one node
     * @param  {string} selector Selector
     * @return {HTMLElement} DOM element
     */
    public static query(selector: string): HTMLElement {
      return document.querySelector(selector) as HTMLElement;
    }
  
    /**
     * Select multiple nodes
     * @param  {string} selector Selector
     * @return {NodeListOf<HTMLElement>} DOM Elements
     */
    public static queryAll(selector: string): NodeListOf<HTMLElement> {
      return document.querySelectorAll(selector);
    }
  }