import '../styles/globals.css'
import HasprCursor from 'haspr-cursor' // Import Wrapper
import 'haspr-cursor/dist/cursor.css' // Import Style sheet

function MyApp({ Component, pageProps }) {
  return (
    <HasprCursor>
      <Component {...pageProps} />
    </HasprCursor>
  )
}

export default MyApp
