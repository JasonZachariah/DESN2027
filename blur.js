const THRESHOLD = "0 1 1";
const BLUR_CYCLE_MS = 5000;
const BLUR_MIN = 0.5;
const BLUR_MAX = 2;

function ensureThresholdFilter() {
  let filter = document.getElementById("svgThreshold");
  if (!filter) {
    const svgNs = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNs, "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";

    filter = document.createElementNS(svgNs, "filter");
    filter.id = "svgThreshold";
    const transfer = document.createElementNS(svgNs, "feComponentTransfer");
    ["R", "G", "B", "A"].forEach(function (channel) {
      const func = document.createElementNS(svgNs, "feFunc" + channel);
      func.setAttribute("class", "transfer-func");
      func.setAttribute("type", "discrete");
      transfer.appendChild(func);
    });
    filter.appendChild(transfer);
    svg.appendChild(filter);
    document.body.appendChild(svg);
  }

  filter.querySelectorAll(".transfer-func").forEach(function (func) {
    func.setAttribute("tableValues", THRESHOLD);
  });
}

function blurAt(now) {
  const progress = (now % BLUR_CYCLE_MS) / BLUR_CYCLE_MS;
  const wave = Math.sin(progress * Math.PI);
  return BLUR_MIN + (BLUR_MAX - BLUR_MIN) * wave;
}

function applyBlurEffect() {
  ensureThresholdFilter();

  function frame(now) {
    const filter = "blur(" + blurAt(now).toFixed(3) + "px) url(#svgThreshold)";
    document.querySelectorAll(".p1_2027_blur").forEach(function (element) {
      element.style.filter = filter;
    });
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyBlurEffect);
} else {
  applyBlurEffect();
}
