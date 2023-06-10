import { createGlobalStyle, css } from 'styled-components'

const Colors = createGlobalStyle`
  :root {
    --white-value: 255, 255, 255;
    --leather-value: 8, 34, 41;
    --dark-leather-value: 6, 22, 26;
    --light-sea-green-value: 32, 178, 170;
    --mosque-value: 8, 102, 97;
    --violet-redish-value: 179, 50, 156;
    --buddha-gold-value: 179, 149, 14;
    --raw-umber-value: 102, 86, 13;

    // TLTR Brand Colors
    --tltr-blue-value: 22, 7, 138;
    --tltr-black-value: 2, 5, 23;
    --tltr-awesome-value: 255, 26, 107;
  }
`

export const Pride = css`
  background-image: linear-gradient(
    90deg,
    rgba(191, 95, 255, 1) 0%,
    rgba(83, 156, 255, 1) 20%,
    rgba(111, 255, 89, 1) 30%,
    rgba(255, 247, 46, 1) 40%,
    rgba(255, 168, 96, 1) 50%,
    rgba(255, 94, 94, 1) 70%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default Colors
