import React from 'react'
import { render, screen } from '@testing-library/react'
import Nav from './Nav'

describe('Nav', () => {
  it('renders without issues', () => {
    const { container } = render(<Nav />)
    expect(container).toMatchSnapshot()
  })
})
