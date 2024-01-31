/*! @name videojs-dynamic-watermark @version 1.1.0 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js'), require('global/window')) :
  typeof define === 'function' && define.amd ? define(['video.js', 'global/window'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsDynamicWatermark = factory(global.videojs, global.window));
}(this, (function (videojs, window) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);
  var window__default = /*#__PURE__*/_interopDefaultLegacy(window);

  var version = "1.1.0";

  var defaults = {
    elementId: 'unique-id',
    watermarkText: 'sbbullet',
    changeDuration: 1000,
    cssText: 'display: inline-block; color: grey; background-color: transparent; font-size: 1rem; z-index: 9999; position: absolute; @media only screen and (max-width: 992px){font-size: 0.8rem;}'
  }; // Cross-compatibility for Video.js 5 and 6.

  var registerPlugin = videojs__default['default'].registerPlugin || videojs__default['default'].plugin;
  var dom = videojs__default['default'].dom || videojs__default['default'];

  var applyCssStyles = function applyCssStyles(el, options) {
    el.innerHTML = options.watermarkText;
    el.style.cssText = options.cssText;
  };

  var createDyanmicWatermarkElement = function createDyanmicWatermarkElement(player, options) {
    var el = dom.createEl('div', {}, {
      id: options.elementId
    });
    applyCssStyles(el, options);
    return el;
  };

  var setRandomPosition = function setRandomPosition(player, element, options) {
    var playerHeight = player.currentHeight();
    var playerWidth = player.currentWidth();
    var playerAspectRatio = playerWidth / playerHeight;
    var videoAspectRatio = player.videoWidth() / player.videoHeight();
    var watermarkEl = element.getBoundingClientRect();
    var startPosX = 0;
    var startPosY = 0;

    if (videoAspectRatio > playerAspectRatio) {
      var currentVideoHeight = playerWidth / videoAspectRatio;
      var verticlePadding = (playerHeight - currentVideoHeight) / 2;
      startPosX = Math.floor(Math.random() * (playerWidth - watermarkEl.width));
      startPosY = Math.floor(verticlePadding + Math.random() * (currentVideoHeight - watermarkEl.height));
    } else if (videoAspectRatio < playerAspectRatio) {
      var currentVideoWidth = playerHeight * videoAspectRatio;
      var horizontalPadding = (playerWidth - currentVideoWidth) / 2;
      startPosY = Math.floor(Math.random() * (playerHeight - watermarkEl.height));
      startPosX = Math.floor(horizontalPadding + Math.random() * (currentVideoWidth - watermarkEl.width));
    } else {
      startPosX = Math.floor(Math.random() * (playerWidth - watermarkEl.width));
      startPosY = Math.floor(Math.random() * (playerHeight - watermarkEl.height));
    }

    element.style.left = startPosX + 'px';
    element.style.top = startPosY + 'px';
    var timeout = setTimeout(function () {
      var dynamicWatermarkEl = window__default['default'].document.getElementById(options.elementId);

      if (!dynamicWatermarkEl) {
        dynamicWatermarkEl = createDyanmicWatermarkElement(player, options);
        player.el().appendChild(dynamicWatermarkEl);
      } else {
        applyCssStyles(dynamicWatermarkEl, options);
      }

      setRandomPosition(player, dynamicWatermarkEl, options);
    }, options.changeDuration);
    player.on('dispose', function () {
      clearTimeout(timeout);
    });
  };

  var startDynamicWatermarking = function startDynamicWatermarking(player, options) {
    var el = createDyanmicWatermarkElement(player, options);
    player.el().appendChild(el);
    setRandomPosition(player, el, options);
  };
  /**
   * Function to invoke when the player is ready.
   *
   * This is a great place for your plugin to initialize itself. When this
   * function is called, the player will have its DOM and child components
   * in place.
   *
   * @function onPlayerReady
   * @param    {Player} player
   *           A Video.js player object.
   *
   * @param    {Object} [options={}]
   *           A plain object containing options for the plugin.
   */


  var onPlayerReady = function onPlayerReady(player, options) {
    player.addClass('vjs-dynamic-watermark');
    startDynamicWatermarking(player, options);
  };
  /**
   * A video.js plugin.
   *
   * In the plugin function, the value of `this` is a video.js `Player`
   * instance. You cannot rely on the player being in a "ready" state here,
   * depending on how the plugin is invoked. This may or may not be important
   * to you; if not, remove the wait for "ready"!
   *
   * @function dynamicWatermark
   * @param    {Object} [options={}]
   *           An object of options left to the plugin author to define.
   */


  var dynamicWatermark = function dynamicWatermark(options) {
    var _this = this;

    this.ready(function () {
      onPlayerReady(_this, videojs__default['default'].mergeOptions(defaults, options));
    });
  }; // Register the plugin with video.js.


  registerPlugin('dynamicWatermark', dynamicWatermark); // Include the version number.

  dynamicWatermark.VERSION = version;

  return dynamicWatermark;

})));
