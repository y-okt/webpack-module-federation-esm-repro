import something from 'test-pkg-123';

export function logPureEsmResult() {
  document.body.innerHTML += `<div>pure-esm.mjs: <b>${typeof something}</b></div>`;
}
