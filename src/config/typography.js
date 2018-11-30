import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'

const blackLeather = 'rgb(8, 34, 41)';

const typography = new Typography({
  bodyColor: blackLeather,
  baseFontSize: '18px',
  baseLineHeight: 1.722,
  scaleRatio: 2.44,
  headerFontFamily: ['Merriweather', 'serif'],
  headerWeight: 300,
  bodyWeight: 300,
  boldWeight: 400,
  bodyFontFamily: ['Merriweather Sans', 'sans-serif'],
  overrideThemeStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h1: {
      marginBottom: rhythm(2.05),
    },
    'a, a:hover, a:visited, a:active': {
      color: 'inherit',
    },
    blockquote: {
      ...adjustFontSizeTo('19px'),
      fontStyle: 'italic',
      paddingLeft: rhythm(13/16),
      marginLeft: rhythm(-0.9),
      borderLeft: `${rhythm(2/16)} solid ${blackLeather}`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
  }),
  plugins: [
    new CodePlugin(),
  ]
})

export default typography