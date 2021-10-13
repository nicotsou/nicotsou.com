import React from 'react'
import { render } from '@testing-library/react'
import Nav from './Nav'

describe('Nav', () => {
  it('renders without issues', () => {
    render(<Nav />)
  })
})
