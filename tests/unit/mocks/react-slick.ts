import 'core-js/es/map'
import 'core-js/es/set'
import 'raf/polyfill'

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function (callback) {
    setTimeout(callback, 0)
  }

export {}
