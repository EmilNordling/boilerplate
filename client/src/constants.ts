import { css } from 'styled-components';

export const colors = {
  main_background_light: '#24292e',
  main_background_dark: '#18191c',
  main_background_input: '#23252b',
  main_color_highlight: '#00d8ff',
};

export const fontFamily = `
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto, Helvetica,
  Arial, sans-serif,
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol"
`;

const sizes = {
  large: 1170,
  medium: 960,
  small: 520,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args: any[]) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});
