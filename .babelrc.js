let ignore = [`**/dist`]

const presetAbsPath = require(`path`).join(__dirname, 'babel-gatsby-preset.js')

module.exports = {
  sourceMaps: true,
  presets: [presetAbsPath],
  ignore,
}