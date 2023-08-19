const homeUrl = "https://kindmod.com/redirect-link";
// const homeUrl = "http://localhost:5500/index.html";
const timetoWait = 7;
var time = timetoWait;

// cookie
function setCookie(name, value = "", days = null) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function currentTimestamp(timezone = 7) {
  const date = new Date();
  date.setHours(date.getHours() + timezone);
  return Math.floor(date.getTime() / 1000);
}

function getHostUrl(url) {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (error) {
    return null;
  }
}

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

const openInNewTab = (url, target = "_blank") => {
  const a = document.createElement("a");
  a.rel = "nofollow noopener noreferrer";
  a.href = url;
  a.target = target;
  a.click();
  a.remove();
};

function copy(text) {
  navigator.clipboard.writeText(text);
  alert("Đã Copy!");
}

function getRefLink() {
  const refLink = getCookie("ref_link");
  return refLink ? decodeURIComponent(atob(refLink)) : null;
}

function setRefLink(url) {
  setCookie("ref_link", btoa(encodeURIComponent(url)));
}

function deleteRefLink() {
  deleteCookie("ref_link");
}

function getDirectLink() {
  const directLink = getCookie("direct_link");
  return directLink ? decodeURIComponent(atob(directLink)) : "";
}

function setDirectLink(url) {
  setCookie("direct_link", btoa(encodeURIComponent(url)));
}

function deleteDirectLink() {
  deleteCookie("direct_link");
}

function getStep() {
  return getCookie("_step");
}

function setStep(step) {
  setCookie("_step", step);
}

function deleteStep() {
  deleteCookie("_step");
}

var isTab = true;
// $(window).focus(function () {
//   isTab = true;
// });

// $(window).blur(function () {
//   isTab = false;
// });

var page = getQueryVariable("url") || btoa(encodeURIComponent(homeUrl));
const link = decodeURIComponent(atob(page));
// const link = `https://link1s.com/full?api=37fbb8008200612b7c5c0dfcde5113722e046632&url=${page}&type=1`;

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

function showLink(isShow = true) {
  if (!isShow) return $("a.link-out-btn").css("display", "none");

  const directLink = getDirectLink();

  document.getElementById("nametime").innerHTML = "0<br/>";
  document.getElementById("waitlink").style.display = "none";
  $("a.link-out-btn").css("display", "inline-block");
  $("a.link-out-btn").each((i, e) => (e.href = directLink));
  deleteDirectLink();
}

function showAds() {
  $("head")
    .append(`<script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2242202070298795"
  crossorigin="anonymous"></script>`);
  $(".adsense").empty()
    .append(`<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2242202070298795" data-ad-slot="1551808879"
  data-ad-format="auto" data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`);
}
$(() => {
  const directLink = getDirectLink();
  if (!directLink) setDirectLink(link);

  const refLink = getRefLink();
  if (!refLink) setRefLink(document.referrer);

  const step = getStep();

  if (!step) {
    setStep(1);
    top.location.replace(homeUrl);
    return;
  }

  showFlashSale();

  if (step == "1") {
    const queryUrl = getQueryVariable("url");
    if (queryUrl) return top.location.replace(homeUrl);
    return step1();
  }
  if (step == "2") return step2();
  else if (step != "2") {
    deleteStep();
    top.location.reload();
    return;
  }

  function step1() {
    showAds();
    $("#step").text("Step 1");
    showCaptcha();
    $("#getLink").click(() => {
      openInNewTab("https://shope.ee/8zc4oXqyep");
      setStep(2);
      top.location.replace(homeUrl);
    });
  }

  function step2() {
    showAds();
    $("#step").text("Step 2");
    gett("timecount").innerHTML = timetoWait;
    $("#waitlink").show();
    init();
    setCountLinkRef(refLink);
    deleteRefLink();
    deleteStep();
  }
});

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

// Shopee Flashsale
async function showFlashSale() {
  const urlFlashSaleApi =
    "aHR0cHMlM0ElMkYlMkZkYXRhYmFzZS1saXZlLWRlZmF1bHQtcnRkYi5hc2lhLXNvdXRoZWFzdDEuZmlyZWJhc2VkYXRhYmFzZS5hcHAlMkZzaG9wZWUlMkZmbGFzaHNhbGVzLmpzb24=";
  $.ajax({
    url: decodeURIComponent(atob(urlFlashSaleApi)),
    error: function (err) {
      console.log(err);
    },
    success: function (data) {
      showShopeeVoucherHTML(data);
      $(".lazy").Lazy();
    },

    timeout: 4000, // sets timeout to 3 seconds
  });
}

function showShopeeVoucherHTML(data = []) {
  // sort
  data.sort((a, b) => {
    try {
      const first = parseInt(a.content.match(/\*\*Giảm ([0-9]+)%\*\*/m)[1]);
      const second = parseInt(b.content.match(/\*\*Giảm ([0-9]+)%\*\*/m)[1]);
      return second - first;
    } catch (error) {
      return 0;
    }
  });

  let html = "";
  for (const voucher of data) {
    html += `
      <div class="box-voucher">
      <a href="${voucher.link}" target="_blank" rel="nofollow noreferrer noopener">
        <div class="shopeeImage"><img class="lazy" data-src="${voucher.image}" alt="${voucher.title}"></div>
        <div class="shopeeTitle">${voucher.title}</div>
        <div class="shopeeContent">${voucher.content}</div>
        <div class="shopeeTime">${voucher.startTime} - ${voucher.endTime}</div>
      </a>
    </div>
      `;
  }

  $("#shopeeVoucherContent").empty().append(html);
  $("#shopeeShow").show();
}

/**
 * CUSTOM FUNCTION
 */

// adblock
function checkAdblock() {
  $(async function () {
    const htmlAdblock =
      '<div id="ignielAdBlock"><div class="isiAds"><span class="judul">Adblock Detected</span><br><svg viewBox="0 0 24 24"><path d="M13,13H11V7H13M12,17.3A1.3,1.3 0 0,1 10.7,16A1.3,1.3 0 0,1 12,14.7A1.3,1.3 0 0,1 13.3,16A1.3,1.3 0 0,1 12,17.3M15.73,3H8.27L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3Z"></path></svg><br>Please turn off your adblock to continue, after you turn it off then reload this page. <br><br><br>Vui lòng tắt chặn quảng cáo và tải lại trang!</div></div>';
    let adBlockEnabled = false;
    const googleAdUrl =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    try {
      await fetch(new Request(googleAdUrl)).catch(
        (_) => (adBlockEnabled = true)
      );
    } catch (e) {
      adBlockEnabled = true;
    } finally {
      // if(adBlockEnabled) $('body').empty().append(htmlAdblock);
      if (adBlockEnabled) {
        $(
          `<b class="alert-text">[Adblock Detected] Vui lòng tắt chặn quảng cáo và tải lại trang!</b>`
        ).insertBefore("#getLink");
        $("#getLink").remove();
      }
    }
  });
}

/**
 * FIREBASE
 */

const firebaseDatabaseURL =
  "https://database-live-default-rtdb.asia-southeast1.firebasedatabase.app";

/**
 * Set count link referrer by firebase databse
 */
async function setCountLinkRef(refLink) {
  const hostname = getHostUrl(refLink);
  if (!hostname) return false;

  const host = hostname.replace(/\./g, "-");

  const urlApi =
    firebaseDatabaseURL + `/kindmod-redirect/link-ref/${host}.json`;
  const payload = {
    count: {
      ".sv": { increment: 1 },
    },
  };

  $.ajax({
    type: "PUT",
    url: urlApi,
    data: JSON.stringify(payload),
    error: function (e) {},
    success: function (data) {},
    dataType: "json",
    contentType: "application/json",
  });
}

// RECAPTCHA V2

function showCaptcha(sitekey = "6LcoVlMUAAAAAMHhgoVVHfvy5-brxndleJzIzXCd") {
  if (!sitekey) sitekey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const html = `<span id="captcha-loading" class="alert-text">Loading...</span><div
  class="g-recaptcha"
  data-sitekey="${sitekey}"
  data-callback="onRecaptchaSuccess"
  data-expired-callback="onRecaptchaResponseExpiry"
  data-error-callback="onRecaptchaError"
></div><script src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad" async defer></script>`;
  $("#captcha").append(html);
  $("#timeout").hide();
}

function onRecaptchaLoad() {
  $("#captcha-loading").hide();
}

function onRecaptchaSuccess() {
  $("#getLink").show();
}

function onRecaptchaResponseExpiry() {
  $("#getLink").hide();
}

function onRecaptchaError() {
  $("#getLink").hide();
}
