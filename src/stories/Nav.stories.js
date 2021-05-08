import React from 'react'
import Nav from '../components/Layout/Header/Nav'

export default {
  title: 'Example/Nav',
  component: Nav,
}

const Template = (args) => <Nav {...args} />

export const Default = Template.bind({})
Default.args = {}
