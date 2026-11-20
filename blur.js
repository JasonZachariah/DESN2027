const BLUR = "1px";
const THRESHOLD = "0 1 1";

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

function applyBlurEffect() {
  ensureThresholdFilter();
  document.querySelectorAll(".p1_2027_blur").forEach(function (element) {
    element.style.filter = "blur(" + BLUR + ") url(#svgThreshold)";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyBlurEffect);
} else {
  applyBlurEffect();
}
