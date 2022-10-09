# Haspr Cursor

<a href="https://www.npmjs.com/package/haspr-cursor"><img src="https://img.shields.io/npm/v/haspr-cursor?color=green" alt="NPM Version"></a>
<a href="LICENCE"><img src="https://img.shields.io/github/license/hasprLLP/haspr-cursor?color=orange" alt="Licence"></a>
<img src="https://img.shields.io/bundlephobia/min/haspr-cursor?color=blue" alt="Bundle file size">
<img src="https://img.shields.io/bundlephobia/minzip/haspr-cursor?color=yellow&label=gzip%20size" alt="Bundle file size (gzip)">
<a href="https://npmcharts.com/compare/haspr-cursor?minimal=true"><img src="https://img.shields.io/npm/dm/haspr-cursor?color=black" alt="NPM Downloads"></a>
<img src="https://img.shields.io/github/workflow/status/hasprLLP/haspr-cursor/Release%20package" alt="GitHub Workflow Status">

The Magnificent Cursor used in [Haspr Website](https://haspr.in)

and only maybe the best cursor Library of all time ? Yes it is 😉

**Author** - Abhay Rohit | Haspr, contact@haspr.in

**License** - _Copyright (c) 2022, Haspr. All rights reserved._

![GIF](https://s5.gifyu.com/images/demo.gif)

## Dependencies

haspr-cursor internally uses GSAP but you don't necessarily need to install it separately.

- [GSAP](https://greensock.com/gsap/)

## INSTALLATION

### NPM

```bash
npm install haspr-cursor
```

### YARN

```bash
yarn add haspr-cursor
```

## Cursor Usage

Works on [ReactJS](https://reactjs.org/) and [NextJS](https://nextjs.org/)

#### Check these points if the cursor is not working

**Note 1 : DO NOT FORGET TO IMPORT THE CURSOR STYLESHEET**

**Note 2 : WRAP YOUR APP WITH THE "HasprCursor" PROVIDER**

**Note 3 : ADD A BACKGROUND COLOR TO YOUR APP**

### 1. Declare and import the cursor

Declare the cursor in your app.js, \_app.js or index.js file

```javascript
import HasprCursor from 'haspr-cursor' // Import Wrapper
import 'haspr-cursor/dist/cursor.css' // Import Style sheet

// Import and Use These at the top level of your project
// Usually in _app.js, app.js or index.js

export default function App() {
  return (
    <>
      <HasprCursor>{/* All Other Code */}</HasprCursor>
    </>
  )
}
```

### 2. Use it anywhere in your app

Import :

```javascript
import { DispatchCursor, CURSOR_SHOW, CURSOR_STICKY } from 'haspr-cursor'
```

In Order to Dispatch Animations use Functions as Follows:

```javascript
const dispatch = DispatchCursor()
```

**Important: Make sure to add "data-magnetism" attribute on div or any other element when using sticky or magnetic cursor**

```javascript
<div data-magnetism id="magnetize-me" onMouseEnter={() => CURSOR_STICKY(dispatch, 'magnetize-me')}>
  I'm some div
</div>
```

## Cursor Actions

### 1. Functions and their usage

Cursor Actions with Parameters :

| Function             |          Parameters           | Description                             |
| :------------------- | :---------------------------: | :-------------------------------------- |
| `CURSOR_SHOW()`      |             `()`              | Displays Cursor                         |
| `CURSOR_HIDE()`      |             `()`              | Hides Cursor                            |
| `CURSOR_COLOR()`     |           `(color)`           | Change the Color of Cursor              |
| `CURSOR_TEXT()`      |   `(dispatch, text, color)`   | Shows Jelly Blob with Text Inside       |
| `CURSOR_EXCLUSION()` |      `(dispatch, state)`      | Shows Jelly Blob with Exclusion Mode    |
| `CURSOR_STICKY()`    |    `(dispatch, id, size)`     | Make Element Stick to Cursor            |
| `CURSOR_MAGNETIC()`  |       `(dispatch, id)`        | Make Cursor Magnetized to Element       |
| `CURSOR_VIDEO()`     |   `(dispatch, video, size)`   | Show Jelly Blob with a Video Inside     |
| `CURSOR_REVEAL()`    | `(dispatch, state, id, size)` | Reveal Text and make it Stick to Cursor |
| `CURSOR_UNDERLINE()` |         `(state, id)`         | Expand Collapse Underline of Text       |

### 2. Parameter Description :

> - **dispatch** - _Cursor Action are dispatched for Execution (Mandatory)_
>
> - **state** - **START** _to begin_ **END** _to end_
>
> - **color** - **Empty or null** _for Black, or Color name in CAPS eg_ **"RED"** or **"GREEN"**
>
> - **id** - **DOM ID** _of Element in Action_ or **END** _to end Action_
>
> - **text** - **Text** _to be Displayed eg "Hi" or "Explore" text, "CLOSE" or "PLAY" as icons_ or **END** _to end Action_
>
> - **video** - _Local Path or URL to_ **VIDEO** _to be Displayed_ or **END** _to end Action_

> - _**Note 1** : When using **Sticky or Magnetic**, include a **data-magnetism** Attribute on Target Element_
>
> - _**Note 2** : Be Sure to Put **END** in state, id, text and video props to Exit Animations_
>
> - _**Note 3** : **CURSOR_REVEAL** requires **state: "END"** as well as **id** when Exiting unlike all others_

### Extra Internal Functionality

| Function                                               |            Values            | Description           |
| :----------------------------------------------------- | :--------------------------: | :-------------------- |
| `dispatch({ type: "SET_THEME", value: "LIGHT_MODE" })` | `("LIGHT_MODE","DARK_MODE")` | Set Website Theme     |
| `dispatch({ type: "SET_SHOWREEL", value: true })`      |       `(true, false)`        | Show or Hide Showreel |

# Complete Usage Demo :

Copy and paste this snipper to test everything

```javascript
import {
  DispatchCursor,
  CURSOR_SHOW,
  CURSOR_HIDE,
  CURSOR_COLOR,
  CURSOR_TEXT,
  CURSOR_EXCLUSION,
  CURSOR_STICKY,
  CURSOR_MAGNETIC,
  CURSOR_VIDEO,
  CURSOR_REVEAL,
  CURSOR_UNDERLINE,
} from 'haspr-cursor'
//$ Importing Our Functions

export default function CursorDemo() {
  //` The Cursor Action Dispatcher initialized
  const dispatch = DispatchCursor()

  //& VIEW
  return (
    <div onMouseEnter={CURSOR_SHOW} onMouseLeave={CURSOR_HIDE} style={baseStyle}>
      {/* Title */}
      <div style={titleStyle}>Haspr Cursor Demo</div>

      {/* Demo 1 : Change Cursor Color */}
      <div style={contStyle} onMouseEnter={() => CURSOR_COLOR('RED')} onMouseLeave={() => CURSOR_COLOR('END')}>
        <div>Change Cursor Color</div>
      </div>

      {/* Demo 2 : Apply Text to Jello-Blob */}
      <div style={contStyle} onMouseEnter={() => CURSOR_TEXT(dispatch, 'hi fam!', 'GREEN')} onMouseLeave={() => CURSOR_TEXT(dispatch, 'END')}>
        <div>Show Green Jelly Blob</div>
      </div>

      {/* Demo 3 : Sticky Cursor */}
      <div style={contStyle} onMouseEnter={() => CURSOR_STICKY(dispatch, 'imSticky', 'SMALL')} onMouseLeave={() => CURSOR_STICKY(dispatch, 'END')}>
        <div id="imSticky" data-magnetism>
          Sticky Cursor
        </div>
      </div>

      {/* Demo 4 : Magnetic Elements */}
      <div style={contStyle} onMouseEnter={() => CURSOR_MAGNETIC(dispatch, 'imMagnetic', 'SMALL')} onMouseLeave={() => CURSOR_MAGNETIC(dispatch, 'END')}>
        <div id="imMagnetic" data-magnetism>
          Magnet Mode
        </div>
      </div>

      {/* Demo 6 : Video On Cursor Jello-Blob */}
      <div
        style={contStyle}
        onMouseEnter={() => {
          CURSOR_VIDEO(dispatch, 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', 'MEDIUM')
        }}
        onMouseLeave={() => {
          CURSOR_VIDEO(dispatch, 'END')
        }}
      >
        <div>Video Blob on Cursor</div>
      </div>

      {/* Demo 7 : Cursor Exclusion Mode */}
      <div style={contStyle} onMouseEnter={() => CURSOR_EXCLUSION(dispatch, 'START', 'LARGE')} onMouseLeave={() => CURSOR_EXCLUSION(dispatch, 'END')}>
        <div data-magnetism id="imExclusion">
          Exclusion Mode
        </div>
      </div>

      {/* Demo 8 : Reveal Texts on Hover */}
      <div style={contStyle} onMouseEnter={() => CURSOR_REVEAL(dispatch, 'START', 'imRevealing', 'SMALL')} onMouseLeave={() => CURSOR_REVEAL(dispatch, 'END')}>
        <div style={{ overflow: 'hidden' }}>
          <div data-magnetism id="imRevealing" style={{ display: 'inline-block', paddingInline: '1.75vw' }}>
            Reveal Titles
          </div>
        </div>
      </div>

      {/* Demo 9 : Animated Underline on Hover */}
      <div style={contStyle} onMouseEnter={() => CURSOR_UNDERLINE('START', '.underline-anim')} onMouseLeave={() => CURSOR_UNDERLINE('END', '.underline-anim')}>
        <div style={{ position: 'relative' }}>
          Underline Animation
          <div className="underline-anim" style={underlineStyle} />
        </div>
      </div>
    </div>
  )
}

//@ Stylesheet
const baseStyle = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  background: 'white',
}

const contStyle = {
  width: '17vw',
  height: '10vw',
  borderRadius: '1.5vw',
  display: 'grid',
  placeItems: 'center',
  padding: '1.5vw',
  margin: '1.5vw',
  textAlign: 'center',
  cursor: 'pointer',
  background: 'lightgray',
}

const titleStyle = {
  width: '90vw',
  height: '5vw',
  background: 'lightgray',
  textAlign: 'center',
  lineHeight: '5vw',
  fontSize: '2vw',
  fontWeight: 'bold',
  borderRadius: '0.75vw',
}

const underlineStyle = {
  position: 'absolute',
  width: '100%',
  height: '1px',
  marginLeft: 'auto',
  marginRight: 'auto',
  left: 0,
  right: 0,
  background: 'black',
  bottom: '0.5px',
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback, please reach out to us at contact@haspr.in

## 🔗 Links

[![portfolio](https://img.shields.io/badge/website-000000?style=for-the-badge&logo=site&logoColor=white)](https://haspr.in/)

[![facebook](https://img.shields.io/badge/facebook-0A66C2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/hasprdesign)

[![instagram](https://img.shields.io/badge/instagram-E1306C?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/hasprdesign/)

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/hasprdesign)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/hasprllp)

[![youtube](https://img.shields.io/badge/youtube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UC0xbdzfePWB65W8Ap-Aj-VA)

[![pinterest](https://img.shields.io/badge/pinterest-E60023?style=for-the-badge&logo=pinterest&logoColor=white)](https://in.pinterest.com/hasprdesign/)

[![behance](https://img.shields.io/badge/behance-053eff?style=for-the-badge&logo=behance&logoColor=white)](https://www.behance.net/haspr/)

[![dribbble](https://img.shields.io/badge/dribbble-ea4c89?style=for-the-badge&logo=dribbble&logoColor=white)](https://dribbble.com/haspr)

[![github](https://img.shields.io/badge/github-171515?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hasprLLP)

![Logo](https://haspr.in/static/svg/brand-logo.svg)
