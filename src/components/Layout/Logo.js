import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import NtLogo58px from '../../images/nt-logo-58px.svg'
import NtLogo40px from '../../images/nt-logo-40px.svg'

const sizes = {
  small: Symbol(),
  large: Symbol(),
}

const StyledLogo = (props) => css`
  display: block;
  width: ${(props) => (props.size === sizes.small ? '2em' : '3em')};
  height: auto;

  .circle {
    stroke: rgb(var(--text-color));
  }

  .letters {
    fill: rgb(var(--text-color));
  }
`

const StyledNtLogo58px = styled(({ className }) => (
  <NtLogo58px className={className} />
))(StyledLogo)
const StyledNtLogo40px = styled(({ className }) => (
  <NtLogo40px className={className} />
))(StyledLogo)

const Logo = ({ size, className }) => {
  const Compoponent = size === sizes.small ? StyledNtLogo40px : StyledNtLogo58px
  return (
    <>
      <Compoponent className={className} size={size} />
    </>
  )
}

Logo.sizes = sizes

Logo.propTypes = {
  size: PropTypes.symbol,
}

export default Logo
