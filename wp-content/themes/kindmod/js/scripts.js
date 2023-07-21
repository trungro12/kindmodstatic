function createAandClick(url, target = "_self") {
    url = decodeURIComponent(atob(url));
    let a = document.createElement("a");
    a.setAttribute("style", "display: none");
    a.href = url;
    a.target = target;
    a.rel = "noopener nofollow noreferrer";
    a.click();
    a.innerHTML = "SomeText";
    document.body.appendChild(a);
}

// lazy
const autoLoadDuration = 5;
const eventList = [
  "click",
  "keydown",
  "mousemove",
  "wheel",
  "touchmove",
  "touchstart",
  "touchend",
];

// const autoLoadTimeout = setTimeout(runScripts, autoLoadDuration * 1000);

$(function () {
  eventList.forEach(function (event) {
    window.addEventListener(event, triggerScripts, { passive: true });
  });
});

function triggerScripts() {
  runScripts();
  // clearTimeout(autoLoadTimeout);
  eventList.forEach(function (event) {
    window.removeEventListener(event, triggerScripts, { passive: true });
  });
}

function runScripts() {
  document.querySelectorAll("script[lazy]").forEach(function (scriptTag) {
    scriptTag.setAttribute("src", scriptTag.getAttribute("data-src"));
  });
}