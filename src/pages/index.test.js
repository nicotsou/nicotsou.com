import React from 'react'
import Index from './index'
import { shallow } from 'enzyme'

it('should display a dummy page', () => {
  const wrapper = shallow(<Index />)
  expect(wrapper).toMatchSnapshot()
})
