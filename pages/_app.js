import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AlurakutStyles } from '../src/lib/AluraCommons';

const GlobalStyle = createGlobalStyle`
  // Reset CSS

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-image: url("https://i2.wp.com/wallpapercave.com/wp/r6B7lDh.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #D9E6F6;
    font-family: sans-serif;
  }

  #__next{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'green',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
