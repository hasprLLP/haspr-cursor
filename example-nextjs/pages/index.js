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

export default function Home() {
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
      <div
        style={contStyle}
        onMouseEnter={() => CURSOR_REVEAL(dispatch, 'START', 'imRevealing', 'SMALL')}
        onMouseLeave={() => CURSOR_REVEAL(dispatch, 'END', 'imRevealing')}
      >
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
