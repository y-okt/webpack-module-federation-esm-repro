import something from "test-pkg-123";

export function logRegularJsResult() {
  document.body.innerHTML += `<div>regular-js.js: <b>${typeof something}</b></div>`;
}
