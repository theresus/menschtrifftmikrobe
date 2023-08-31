function LottieScrollTrigger(vars) {
  var containerHeight = document.getElementById('container').clientHeight
  let playhead = {frame: 0},
    target = gsap.utils.toArray(vars.target)[0],
    speeds = {slow: "+="+containerHeight, medium: "+=1000", fast: "+=500"},
    st = {
      trigger: "#container", 
      pin: true, 
      start: "top top", 
      pinSpacing: false, 
      scrub: true,
      end: 
      speeds[vars.speed] || "+=1000"
    },
      animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || "svg",
        // loop: true,
        autoplay: false,
        path: vars.path,
        markers: true
    });
  for (let p in vars) { // let users override the ScrollTrigger defaults
    st[p] = vars[p];
  }
  animation.addEventListener("DOMLoaded", function() {
    gsap.to(playhead, {
      frame: animation.totalFrames - 1,
      ease: "none",
      onUpdate: () => animation.goToAndStop(playhead.frame, true),
      scrollTrigger: st
    });
  });}

LottieScrollTrigger({
  target: "#lottieplayer",
  path: "/media/master.json",
  speed: "slow",
  scrub: .5,  // seconds it takes for the playhead to "catch up"
  //markers: true,
  // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
 })



