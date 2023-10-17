const React = require('react')

module.exports = (props) => {
  return React.createElement('div', props, props.children)
}
