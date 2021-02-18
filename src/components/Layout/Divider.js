import styled, { css } from 'styled-components'

export const DividerStyles = css`
  border: none;
  margin: 6rem;
  content: '. . .';
  text-align: center;
  opacity: 0.5;
  height: 1px;
  box-shadow: 0px -1px 0px 0px rgba(var(--caption-color), 0.5);
`

const Divider = styled.hr`
  ${DividerStyles}
`

export default Divider
