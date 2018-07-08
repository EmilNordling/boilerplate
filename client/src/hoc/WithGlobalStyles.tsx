import React from 'react';
import { injectGlobal } from 'styled-components';
import { fontFamily, colors } from '../constants';

const style = () => injectGlobal`
  ${preval`
    const fs = require('fs');
    module.exports = fs.readFileSync('node_modules/reset-css/reset.css', 'utf-8');
  `}

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    overscroll-behavior-y: none;
  }

  html {
    box-sizing: border-box;
    font-family: ${fontFamily};
    font-size: 10px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: #000000;
    background-color: #ffffff;
  }

  img {
    display: inline-block;
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }

  ::selection {
    color: #ffffff;
    background-color: ${colors.main_color_highlight};
  }

  a {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
    color: inherit;
    text-decoration: inherit;
  }

  p {
    font-size: 1.6rem;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 2.4rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.8rem;
  }

  #app {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
`

const withGlobalStyles = (Component: React.ComponentClass<any>) => (props: any) => {
  style();

  return <Component {...props} />;
};

export default withGlobalStyles;
