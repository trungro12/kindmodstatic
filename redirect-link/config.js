const homeUrl = "https://kindmod.com/redirect-link";
var time = 4;

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

function showPopAds() {
  $("body").append(
    `<script src="./popads.js" type="text/javascript" data-cfasync="false"></script>`
  );
}
$(() => {
  const arrHostShowAds = ["www.skidrowreloaded.com"];
  gett("timecount").innerHTML = "0";

  const getLinkBtn = $("#getLink");

  const { hostname } = new URL(link);
  if (arrHostShowAds.includes(hostname)) {
    getLinkBtn.attr("href", "javascript:void(0)");
    checkAdblock();
    showPopAds();
  } else {
    getLinkBtn.attr("href", "https://shope.ee/8zc4oXqyep");
    getLinkBtn.attr("target", "_blank");
  }
  // getLinkBtn.attr("rel", "nofollow noopener noreferrer");
  getLinkBtn.show();

  // add fb like
  // $("#fb-like").attr(
  //   "src",
  //   "https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fkindmod.com&width=450&layout&action&size&share=false&height=35"
  // );

  getLinkBtn.click(() => {
    // openInNewTab("https://shope.ee/8zc4oXqyep");
    getLinkBtn.remove();
    $("#waitlink").show();
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

// Shopee Flashsale
$(async function () {
  const url =
    "aHR0cHMlM0ElMkYlMkZkYXRhYmFzZS1saXZlLWRlZmF1bHQtcnRkYi5hc2lhLXNvdXRoZWFzdDEuZmlyZWJhc2VkYXRhYmFzZS5hcHAlMkZzaG9wZWUlMkZmbGFzaHNhbGVzLmpzb24=";
  $.ajax({
    url: decodeURIComponent(atob(url)),
    error: function (err) {
      console.log(err);
    },
    success: function (data) {
      showShopeeVoucherHTML(data);
    },

    timeout: 4000, // sets timeout to 3 seconds
  });
});

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
        <div class="shopeeImage"><img src="${voucher.image}" alt="${voucher.title}"></div>
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
          `<b style="text-align: center; margin: auto; display: block; color:red">[Adblock Detected] Vui lòng tắt chặn quảng cáo và tải lại trang!</b>`
        ).insertBefore("#getLink");
        $("#getLink").remove();
      }
    }
  });
}
