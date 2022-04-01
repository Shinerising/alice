type debounceFunction = (...args: string[]) => void;
export class Util {
  public static debounce(fn: debounceFunction, wait: number) {
    let timeout: NodeJS.Timeout;

    return (...args: string[]) => {
      const later = () => {
        clearTimeout;
        fn(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  private static idleCounter = 0;
  public static setIdle(fn: debounceFunction, wait: number) {
    let isIdle = false;
    const later = () => {
      if (this.idleCounter > wait && !isIdle) {
        isIdle = true;
        fn();
      } else {
        isIdle = false;
        this.idleCounter += 100;
      }

      setTimeout(later, 100);
    };
    later();
  }
  public static notIdle() {
    this.idleCounter = 0;
  }
  public static timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  public static isURL(query: string) {
    // eslint-disable-next-line
    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/ig;
    return query.length < 2083 && urlRegex.test(query);
  }
}

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