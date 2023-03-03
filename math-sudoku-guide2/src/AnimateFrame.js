export  class AnimationFrame {
  constructor(fps = 25, animate) {
      this.requestID = 0;
      this.fps = fps;
      this.animate = animate;
  }
  start() {
      let then = performance.now();
      const interval = 1000 / this.fps;
      const tolerance = 0.1;

      const animateLoop = (now) => {
          this.requestID = requestAnimationFrame(animateLoop);
          const delta = now - then;

          if (delta >= interval - tolerance) {
              then = now - (delta % interval);
              this.animate(delta);
          }
      };
      this.requestID = requestAnimationFrame(animateLoop);
  }

  stop() {
      cancelAnimationFrame(this.requestID);
  }
}

export function getParameter(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return undefined;
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}