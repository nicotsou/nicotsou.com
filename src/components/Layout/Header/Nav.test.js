import React from 'react'
import renderer from 'react-test-renderer'
import Nav from './Nav'

describe('Nav', () => {
  it('renders without issues', () => {
    const tree = renderer.create(<Nav />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
