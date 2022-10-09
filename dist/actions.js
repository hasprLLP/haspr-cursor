"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectCursor = exports.GlobalCursor = exports.DispatchCursor = exports.CURSOR_VIDEO = exports.CURSOR_UNDERLINE = exports.CURSOR_TEXT = exports.CURSOR_STICKY = exports.CURSOR_SHOW = exports.CURSOR_REVEAL = exports.CURSOR_PAGECOLOR = exports.CURSOR_MAGNETIC = exports.CURSOR_HIDE = exports.CURSOR_EXCLUSION = exports.CURSOR_COLOR = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _gsap = require("gsap/dist/gsap.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//` GSAP Animation Engine
//$ Cursor Ref from DOM
const deviceWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
const isDesktop = deviceWidth > 1200 ? true : false; //$ Define Global Cursor Context

const GlobalStateContext = /*#__PURE__*/(0, _react.createContext)();
const GlobalDispatchContext = /*#__PURE__*/(0, _react.createContext)(); //$ Define Cursor Reducer

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STICKY':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          sticky: action.value
        });
      }

    case 'SET_MAGNETIC':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          magnetic: action.value
        });
      }

    case 'SET_INTENSITY':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          intensity: action.value
        });
      }

    case 'SET_JELLY':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          jelly: action.value
        });
      }

    case 'SET_TEXT':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          text: action.value
        });
      }

    case 'SET_PHOTO':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          photo: action.value
        });
      }

    case 'SET_VIDEO':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          video: action.value
        });
      }

    case 'SET_THEME':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          theme: action.value
        });
      }

    case 'SET_SHOWREEL':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          showreel: action.value
        });
      }

    case 'SET_LOADED':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          loaded: action.value
        });
      }

    case 'SET_SEQUENCE':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          sequence: action.value
        });
      }

    default:
      {
        throw new Error("Unhandled action type: ".concat(action.type));
      }
  }
}; //$ Initial States


const initialStates = {
  sticky: null,
  magnetic: null,
  intensity: 800,
  jelly: false,
  text: '',
  photo: '',
  video: '/static/videos/showreel/cursor-reel.mp4',
  theme: 'LIGHT_MODE',
  showreel: false,
  loaded: false,
  sequence: null
}; //$ Cursor Provider (App Wrapper)

const GlobalCursor = _ref => {
  let {
    children
  } = _ref;
  //@ Global Cursor Reducer Function
  const [state, dispatch] = (0, _react.useReducer)(globalReducer, initialStates);
  return /*#__PURE__*/_react.default.createElement(GlobalDispatchContext.Provider, {
    value: dispatch
  }, /*#__PURE__*/_react.default.createElement(GlobalStateContext.Provider, {
    value: state
  }, children));
}; //& Used To Set or Get Cursor Actions from Anywhere


exports.GlobalCursor = GlobalCursor;

const SelectCursor = () => (0, _react.useContext)(GlobalStateContext);

exports.SelectCursor = SelectCursor;

const DispatchCursor = () => (0, _react.useContext)(GlobalDispatchContext); //& Cursor Animation Actions
//@ 0: Array of All Timeouts Deployed Below


exports.DispatchCursor = DispatchCursor;
const timeoutIDs = []; //` Crucial for Forcefully Clearing Timeouts
//$ 0: Show Cursor

const CURSOR_SHOW = () => {
  const cursor = document.getElementById('cursor-id');
  isDesktop && cursor.classList.remove('-hidden'); //` Remove -hidden Class
}; //$ 1: Hide Cursor


exports.CURSOR_SHOW = CURSOR_SHOW;

const CURSOR_HIDE = () => {
  const cursor = document.getElementById('cursor-id');
  isDesktop && cursor.classList.add('-hidden'); //` Add -hidden Class
}; //$ 2: Set Cursor Color


exports.CURSOR_HIDE = CURSOR_HIDE;

const CURSOR_COLOR = color => {
  //` Append Class of Cursor to Include Given Color Class
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id');

    if (color) {
      cursor.className = "cursor -color-".concat(color.toLowerCase());
    } else cursor.className = 'cursor';
  }
}; //$ 3: Page Cursor Color


exports.CURSOR_COLOR = CURSOR_COLOR;

const CURSOR_PAGECOLOR = color => {
  isDesktop && CURSOR_SHOW();
  isDesktop && CURSOR_COLOR(color || 'BLACK');
}; //$ 4: Set Cursor Jelly Blob Text


exports.CURSOR_PAGECOLOR = CURSOR_PAGECOLOR;

const CURSOR_TEXT = (dispatch, text, color) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id');

    if (text !== 'END') {
      //@ Do-While ACTIVE
      color && CURSOR_COLOR(color); //` Set Color from props

      dispatch({
        type: 'SET_TEXT',
        value: text
      }); //` Dispatch Text Inside

      dispatch({
        type: 'SET_JELLY',
        value: true
      }); //` Dispatch Jelly Activator

      cursor.classList.add('-text'); //` Add -text Class to Cursor

      const id = window.setTimeout(() => {
        for (let i = 0; i < timeoutIDs.length; i++) {
          window.clearTimeout(timeoutIDs[i]);
        }
      }, 0);
      dispatch({
        type: 'SET_INTENSITY',
        value: 400
      }); //` Set Jelly Blob Strength

      _gsap.gsap.to(document.getElementById('cursor-text'), {
        duration: 0.55,
        scale: 1,
        ease: _gsap.Power3.easeOut
      }); //` Post Animation Data to Cursor Inner Text

    } else if (text === 'END') {
      //@ Do-While STOPPED
      CURSOR_COLOR(color || 'BLACK'); //` Reset Color

      const id = setTimeout(() => {
        dispatch({
          type: 'SET_TEXT',
          value: null
        });
        dispatch({
          type: 'SET_JELLY',
          value: false
        });
        dispatch({
          type: 'SET_INTENSITY',
          value: 1200
        });
      }, 550); //` Cleanup after Animation End

      timeoutIDs.push(id); //` Push This to Live Timeouts

      cursor.classList.remove('-text');

      _gsap.gsap.to(document.getElementById('cursor-text'), {
        duration: 0.55,
        scale: 0,
        ease: _gsap.Power3.easeOut
      }); //` Hide Inner Text

    }
  }
}; //$ 5: Set Cursor in Exclusion Mode


exports.CURSOR_TEXT = CURSOR_TEXT;

const CURSOR_EXCLUSION = (dispatch, state) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id');

    if (state === 'START') {
      cursor.classList.add('-opaque'); //` Do-While ACTIVE

      dispatch({
        type: 'SET_JELLY',
        value: true
      });
    } else if (state === 'END') {
      cursor.classList.remove('-opaque'); //` Do-While STOPPED

      dispatch({
        type: 'SET_JELLY',
        value: false
      });
    }
  }
}; //$ 6: Set Cursor Sticky Area


exports.CURSOR_EXCLUSION = CURSOR_EXCLUSION;

const CURSOR_STICKY = (dispatch, stick, size) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id');

    if (stick !== 'END') {
      CURSOR_SHOW();
      cursor.classList.add('-exclusion', size === 'SMALL' ? '-small' : size === 'MEDIUM' ? '-med' : null); //` Add -exclusion and -med class

      dispatch({
        type: 'SET_STICKY',
        value: stick
      }); //` Dispatch Sticky Area for  Cursor
    } else if (stick === 'END') {
      cursor.classList.remove('-exclusion', '-small'); //` Remove -exclusion and -med class

      dispatch({
        type: 'SET_STICKY',
        value: null
      }); //` Cleanup
    }
  }
}; //$ 7: Set Cursor Magnetic Area


exports.CURSOR_STICKY = CURSOR_STICKY;

const CURSOR_MAGNETIC = (dispatch, magnetic) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id');

    if (magnetic !== 'END') {
      cursor.classList.add('-opaque'); //` Add -opaque class

      dispatch({
        type: 'SET_MAGNETIC',
        value: magnetic
      }); //` Dispatch Magnetic Area for  Cursor
    } else if (magnetic === 'END') {
      cursor.classList.remove('-opaque'); //` Remove -opaque class

      dispatch({
        type: 'SET_MAGNETIC',
        value: null
      }); //` Cleanup
    }
  }
}; //$ 8: Set Cursor Jelly Video Inside


exports.CURSOR_MAGNETIC = CURSOR_MAGNETIC;

const CURSOR_VIDEO = (dispatch, video, size) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id');

    if (video !== 'END') {
      //@ Do-While ACTIVE
      cursor.classList.add('-color-correct'); //` Add Class for Color Correction

      const id = window.setTimeout(() => {
        for (let i = 0; i < timeoutIDs.length; i++) {
          window.clearTimeout(timeoutIDs[i]);
        }
      }, 0);
      dispatch({
        type: 'SET_JELLY',
        value: true
      }); //` Jellify

      dispatch({
        type: 'SET_INTENSITY',
        value: size === 'SMALL' ? 500 : size === 'MEDIUM' ? 800 : size === 'LARGE' ? 1000 : 300
      }); //` Set Jelly Strength acc to Cursor Size

      dispatch({
        type: 'SET_VIDEO',
        value: video
      }); //` Dispatch Video to Cursor

      _gsap.gsap.to(document.getElementById('media-id'), {
        duration: 0.65,
        scale: size === 'SMALL' ? 0.5 : size === 'MEDIUM' ? 0.8 : size === 'LARGE' ? 1.45 : 0,
        ease: _gsap.Power3.easeOut
      }); //` Post Animation Data to Cursor Video

    } else if (video === 'END') {
      cursor.classList.remove('-color-correct'); //` Remove Class

      const id = setTimeout(() => {
        dispatch({
          type: 'SET_VIDEO',
          value: ''
        });
        dispatch({
          type: 'SET_INTENSITY',
          value: size === 'SMALL' ? 500 : size === 'MEDIUM' ? 800 : size === 'LARGE' ? 1000 : 300
        });
        dispatch({
          type: 'SET_JELLY',
          value: false
        });
      }, 550); //` Cleanup

      timeoutIDs.push(id); //` Push This to Live Timeouts

      _gsap.gsap.to(document.getElementById('media-id'), {
        duration: 0.55,
        scale: size === 'SMALL' ? 0.5 : size === 'MEDIUM' ? 0.8 : size === 'LARGE' ? 1.45 : 0,
        ease: _gsap.Power3.easeOut
      }); //` Reset Cursor Video

    }
  }
}; //$ 9: Set Cursor Hovered Text Reveal Animation


exports.CURSOR_VIDEO = CURSOR_VIDEO;

const CURSOR_REVEAL = (dispatch, status, id, size) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id');

    if (status !== 'END') {
      dispatch({
        type: 'SET_STICKY',
        value: id
      }); //` Dispatch Sticky Area for  Cursor

      setTimeout(() => {
        _gsap.gsap.to(document.getElementById(id), {
          startAt: {
            y: '-100%'
          },
          y: '0%',
          ease: _gsap.Power3.easeOut,
          duration: 0.55
        });
      }, 0);
      cursor.classList.add('-exclusion', size === 'SMALL' ? '-small' : size === 'MEDIUM' ? '-med' : null); //` Add -exclusion and -med class
    } else if (status === 'END') {
      _gsap.gsap.to(document.getElementById(id), {
        startAt: {
          y: '200%',
          skewY: 7.5
        },
        y: '0%',
        skewY: 0,
        ease: _gsap.Power3.easeOut,
        duration: 0.55
      });

      cursor.classList.remove('-exclusion', '-small'); //` Remove -exclusion and -med class

      dispatch({
        type: 'SET_STICKY',
        value: null
      }); //` Cleanup
    }
  }
}; //$ 10: Cursor Hovered Underline Expand Collapse Animation


exports.CURSOR_REVEAL = CURSOR_REVEAL;

const CURSOR_UNDERLINE = (state, id) => {
  if (isDesktop) {
    const doc = document.querySelector(id);

    if (state !== 'END') {
      _gsap.gsap.to(doc, {
        width: '0%',
        duration: 0.75,
        ease: _gsap.Power3.easeOut
      });
    } else if (state === 'END') {
      _gsap.gsap.to(doc, {
        width: '100%',
        duration: 0.75,
        ease: _gsap.Power3.easeOut
      });
    }
  }
};

exports.CURSOR_UNDERLINE = CURSOR_UNDERLINE;