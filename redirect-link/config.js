const homeUrl = "https://kindmod.com/redirect-link";
var time = 1;

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; vars.length > i; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return !1;
}

const openInNewTab = (url, target = '_blank') => {
  const a = document.createElement('a');
  a.rel = 'nofollow noopener noreferrer';
  a.href = url;
  a.target = target;
  a.click();
  a.remove();
}

function copy(text) {
  navigator.clipboard.writeText(text);
  alert("Đã Copy!");
}

var isTab = true;
$(window).focus(function () {
  isTab = true;
});

$(window).blur(function () {
  isTab = false;
});

var page = getQueryVariable("url") || btoa(encodeURIComponent(homeUrl));
// const link = `http://ouo.io/qs/mb0s4Eb3?s=${atob(page)}`;

const link = `https://link1s.com/full?api=37fbb8008200612b7c5c0dfcde5113722e046632&url=${page}&type=1`;

function gett(id) {
  if (document.getElementById) return document.getElementById(id);
  if (document.layers) return document.layers.id;
  if (window.opera) return window.opera.id;
}

function countDown() {
  if (!isTab) return;
  if (!gett("timecount")) {
    clearInterval(this);
    return;
  }
  time--;
  gett("timecount").innerHTML = time;
  if (time < 1) showLink();
}

function init() {
  if (gett("timecount")) {
    setInterval(countDown, 1000);
    gett("timecount").innerHTML = time;
  } else setTimeout(init, 50);
}

$(() => {
  gett("timecount").innerHTML = '0';

  const getLinkBtn = $("#getLink");

  getLinkBtn.click(() => {
    openInNewTab('https://shope.ee/8zc4oXqyep');
    getLinkBtn.remove();
    $('#waitlink').show();
    init();
  });
});

// document.onload = init();


function showLink() {
  document.getElementById("nametime").innerHTML = "0<br/>";
  document.getElementById("waitlink").style.display = "none";
  $("a.link-out-btn").css("display", "inline-block");
  $("a.link-out-btn").each((i, e) => (e.href = link));
}

$(function () {
  $("form[name=taolinkrutgon]").on("submit", function (n) {
    n.preventDefault();
    const _link = $("input[name=link]", $(this)).val();
    const linkFinal = homeUrl + "?url=" + btoa(encodeURIComponent(_link));
    const inputMake = $("<input>", {
      value: linkFinal,
      readonly: true,
    });
    const btnCopy = `<button onclick="copy('${linkFinal}')" class="taolink ripple" type="button">Copy</button>`;
    $("#taoxong").empty().append(inputMake).append(btnCopy);
  });
});
