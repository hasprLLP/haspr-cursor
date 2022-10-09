"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Cursor;

var _react = _interopRequireWildcard(require("react"));

var _gsap = require("gsap/dist/gsap.js");

var _actions = require("./actions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//` Context API and Hooks
//` GSAP Animation Engine
//` Cursor Data Reducer
//& Cursor
function Cursor() {
  //$ References
  const cursorRef = (0, _react.useRef)(null); //` Main Cursor Ref

  const textRef = (0, _react.useRef)(null); //` Cursor Text Ref

  const videoRef = (0, _react.useRef)(null); //` Cursor Video Ref

  if (typeof document === 'undefined') {
    _react.default.useLayoutEffect = _react.default.useEffect;
  } //$ Global Cursor Actions States


  const {
    sticky,
    magnetic,
    intensity,
    jelly,
    text,
    video
  } = (0, _actions.SelectCursor)(); //$ GSAP 60FPS Ticker Hook

  const useTicker = (callback, paused) => {
    _react.default.useLayoutEffect(() => {
      if (!paused && callback) {
        _gsap.gsap.ticker.add(callback); //` Run requestAnimationFrame


        _gsap.gsap.ticker.fps(60); //` at 60FPS Locked

      } //@ Cleanup on Exit


      return () => {
        _gsap.gsap.ticker.remove(callback);

        _gsap.gsap.ticker.fps(60);
      };
    }, [callback, paused]);
  }; //$ Get Scale and Angle Functions
  //@ Function for Mouse Move Scale Change


  function getScale(diffX, diffY, intensity) {
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return Math.min(distance / intensity, 0.35);
  } //@ Function For Mouse Movement Angle in Degrees


  function getAngle(diffX, diffY) {
    return Math.atan2(diffY, diffX) * 180 / Math.PI;
  } //@ Custom useInstance Hook


  const EMPTY = {};

  const useInstance = function useInstance() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const ref = (0, _react.useRef)(EMPTY);

    if (ref.current === EMPTY) {
      ref.current = typeof value === 'function' ? value() : value;
    }

    return ref.current;
  }; //$ Animation Variable Declarations


  const pos = useInstance(() => ({
    x: 0,
    y: 0
  })); //` Cursor Position

  const vel = useInstance(() => ({
    x: 0,
    y: 0
  })); //` Cursor Velocity

  const set = useInstance(); //` GSAP Quicksetter Function
  //@ GSAP Quick Setter init

  _react.default.useLayoutEffect(() => {
    set.x = _gsap.gsap.quickSetter(cursorRef.current, 'x', 'px');
    set.y = _gsap.gsap.quickSetter(cursorRef.current, 'y', 'px');
    set.r = _gsap.gsap.quickSetter(cursorRef.current, 'rotate', 'deg');
    set.sx = _gsap.gsap.quickSetter(cursorRef.current, 'scaleX');
    set.sy = _gsap.gsap.quickSetter(cursorRef.current, 'scaleY');
    set.rt = _gsap.gsap.quickSetter(textRef.current, 'rotate', 'deg');
    set.rv = _gsap.gsap.quickSetter(videoRef.current, 'rotate', 'deg');
  }, [set]); //& Cursor Animation


  const animation = (0, _react.useCallback)(() => {
    //@ Start Animation
    var rotation = getAngle(vel.x, vel.y); //` Cursor Movement Angle

    var scale = getScale(vel.x, vel.y, intensity); //` Cursor Blob Squeeze Amount
    //$ For Sticky Magnetic and Normal Cursor

    if (magnetic || !jelly) {
      //@ Do-While Sticky & Magnetic
      if (magnetic) {
        const target = document.getElementById(magnetic); //` Get Element to Stick

        const bound = target.getBoundingClientRect(); //` Get Target Width Height and Other Properties

        const stickX = bound.left + target.offsetWidth / 2; //` Stick X Position

        const stickY = bound.top + target.offsetHeight / 2; //` Stick Y Position

        const snapX = stickX - (stickX - pos.x) * 0.125; //` Move Cursor X while Sticked or Magnetized

        const snapY = stickY - (stickY - pos.y) * 0.125; //` Move Cursor Y while Sticked or Magnetized
        //@ Post Animation to Cursor

        _gsap.gsap.to(cursorRef.current, {
          x: snapX,
          y: snapY,
          ease: _gsap.Power4.easeOut,
          duration: 0.55
        });
      } else {
        //@ Do-While Normal Cursor
        set.x(pos.x);
        set.y(pos.y);
      } //@ Set Rotation and Squeeze null


      set.r(0);
      set.sx(1);
      set.sy(1);
      set.rt(0);
    } else {
      //$ For All Other Cursor Scenarios
      set.x(pos.x);
      set.y(pos.y);
      set.r(rotation);
      set.sx(1 + scale);
      set.sy(1 - scale);
      set.rt(-rotation);
      set.rv(-rotation);
    }
  }, [sticky, magnetic, intensity, jelly]); //& Get Mouse Position

  _react.default.useLayoutEffect(() => {
    const setFromEvent = e => {
      e.preventDefault();
      const x = e.clientX; //` Client Mouse X

      const y = e.clientY; //` Client Mouse Y

      let snapX = 0; //` Sticky or Magnetic X Amount

      let snapY = 0; //` Sticky or Magnetic Y Amount

      cursorRef.current.classList.remove('-destroyed'); //` Show Cursor
      //@ Do-While Sticky or Magnetic

      if (sticky || magnetic) {
        //@ For Sticky Cursor DO-This
        const target = document.getElementById(sticky || magnetic); //` Get Element to Stick

        const bound = target.getBoundingClientRect(); //` Get Target Width Height and Other Properties

        const stickX = bound.left + target.offsetWidth / 2; //` Stick X Position

        const stickY = bound.top + target.offsetHeight / 2; //` Stick Y Position

        if (magnetic) {
          snapX = stickX - (stickX - x) * 0.55; //` Move Cursor X while Sticked or Magnetized

          snapY = stickY - (stickY - y) * 0.55; //` Move Cursor Y while Sticked or Magnetized
        } //@ For Magnetic Cursor DO-This


        if (sticky) {
          const magX = (x - bound.left - target.offsetWidth / 2) * 0.2; //` Move Magnetic Element X Amount

          const magY = (y - bound.top - target.offsetHeight / 2) * 0.2; //` Move Magnetic Element Y Amount
          //@  Post Magnetic Movement Animation to Element

          _gsap.gsap.to(target, {
            x: magX,
            y: magY,
            ease: _gsap.Power4.easeOut,
            duration: 0.35
          });
        } //@ For Magnetic Cursor DO-This


        if (magnetic) {
          const magX = (x - bound.left - target.offsetWidth / 2) * 0.125; //` Move Magnetic Element X Amount

          const magY = (y - bound.top - target.offsetHeight / 2) * 0.125; //` Move Magnetic Element Y Amount
          //@  Post Magnetic Movement Animation to Element

          _gsap.gsap.to(target, {
            x: magX,
            y: magY,
            ease: _gsap.Power4.easeOut,
            duration: 0.75
          });
        }
      } //$ Set Main Cursor Position and Velocity


      _gsap.gsap.to(pos, {
        x: snapX || x,
        y: snapY || y,
        duration: 0.75,
        ease: _gsap.Power4.easeOut,
        onUpdate: () => {
          vel.x = x - pos.x;
          vel.y = y - pos.y;
        }
      }); //@ Run Animation Function


      animation();
    }; //@ Mouse Move Listeners


    window.addEventListener('mousemove', setFromEvent);
    return () => {
      window.removeEventListener('mousemove', setFromEvent);
    };
  }, [sticky, magnetic]); //$ Reset Magnetic Fields


  (0, _react.useEffect)(() => {
    //@ Do-When Magnetic Element ID Lost
    if (!magnetic && !sticky) {
      //@ Reset All Magnetic Element to Original Position
      document.querySelectorAll('[data-magnetism]').forEach(magItem => {
        //@ Reset Position Animation Data to Element
        _gsap.gsap.to(magItem, {
          x: 0,
          y: 0,
          ease: _gsap.Power4.easeOut,
          duration: 0.8
        });
      });
    }
  }, [magnetic, sticky]); //$ Run All Animations with 60FPS (Adjust for Higher Refresh Monitors too)

  useTicker(animation); //& Cursor UI

  return /*#__PURE__*/_react.default.createElement("div", {
    ref: cursorRef,
    id: 'cursor-id',
    className: 'cursor -hidden -destroyed'
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: textRef,
    id: 'cursor-text',
    className: 'cursor-inner-text'
  }, text === 'CLOSE' || text === 'PLAY' ? /*#__PURE__*/_react.default.createElement("img", {
    alt: "Cursor",
    src: "/static/svg/".concat(text, ".svg"),
    priority: true,
    className: "cursor-media-svg"
  }) : text), /*#__PURE__*/_react.default.createElement("div", {
    ref: videoRef,
    id: 'media-id',
    className: 'cursor-media'
  }, /*#__PURE__*/_react.default.createElement("video", {
    id: "video-id",
    src: video,
    autoPlay: true,
    muted: true,
    loop: true
  })));
}