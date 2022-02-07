export default function () {
  window.ga =
    window.ga ||
    function () {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = +new Date();
  ga('create', 'G-XT7TWGXRRS', 'auto');
  ga('send', 'pageview');
}
