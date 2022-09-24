import React from 'react'
import styled, { css } from 'styled-components'
import { ProximaFont, TltrFont } from '../../styles/LandingTypography'
import NotifyPrompt from './NotifyPrompt'
import shape1 from '../../images/landing/shape-1.png'
import shape2 from '../../images/landing/shape-2.png'
import shape3 from '../../images/landing/shape-3.png'
import shape4 from '../../images/landing/shape-4.png'
import shape5 from '../../images/landing/shape-5.png'
import shape6 from '../../images/landing/shape-6.png'
import shape7 from '../../images/landing/shape-7.png'
import shape8 from '../../images/landing/shape-8.png'
import shape9 from '../../images/landing/shape-9.png'

const SectionStyles = css`
  margin: 0 auto;
  max-width: 640px;
  padding: 0 1rem;

  @media screen and (min-width: 780px) {
    max-width: 990px;
    box-sizing: border-box;
  }
`

const Container = styled.div`
  ${SectionStyles}
  height: 73vh;
  min-height: 700px;
  width: 100vw;
  padding: 0;
`

const HeroDescription = styled.div`
  margin-top: 3rem;

  @media screen and (min-width: 780px) {
    max-width: 80%;
  }
`

const Title = styled.h1`
  padding-top: calc(180 / 1060 * 100vh);
  margin-left: 3rem;

  @media screen and (min-width: 780px) {
    padding-top: calc(270 / 1060 * 100vh);
    margin-left: 3rem;
  }
`

const Tltr = styled.span`
  ${TltrFont}
  font-size: 1.8rem;
  line-height: 1.8rem;
  font-size: clamp(0.5rem, 8vw, 2.8rem);
  line-height: clamp(0.5rem, 8vw, 2.8rem);
  display: block;
  color: rgb(var(--tltr-awesome-value));
  background: rgb(var(--tltr-awesome-value));
  background: linear-gradient(
    180deg,
    rgba(var(--tltr-awesome-value), 1) 50%,
    rgba(142, 0, 51, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`

const CourseName = styled.span`
  ${ProximaFont}
  font-size: clamp(3rem, 15vw, 7rem);
  line-height: clamp(3rem, 15vw, 7rem);
  color: rgb(var(--white-value));
  background: rgb(var(--text-value));
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 40%,
    rgba(128, 128, 128, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`

const HeroFrame = styled.div`
  background: rgb(var(--tltr-black-value));
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  min-height: 890px;
  top: 0;
  left: 0;
  z-index: -1;
`

const BackgroundCircle = styled.div`
  background: rgb(var(--tltr-blue-value));
  width: 403vw;
  height: 100vh;
  top: 64vh;
  left: -145%;
  border-radius: 100%;
  border-radius: 100%;
  position: absolute;

  @media screen and (min-width: 780px) {
    width: 303vw;
    left: -100%;
    top: 69%;
  }
`

const Shape = css`
  display: block;
  position: absolute;
  top: calc(var(--hero-shape-top) / 1250 * 100%);
  left: calc(var(--hero-shape-left) / 1920 * 100vw);
  width: calc(var(--hero-shape-width) / 1920 * 100vw);
`

const Shape1 = styled.img`
  ${Shape}
  --hero-shape-width: 350;
  --hero-shape-top: 35;
  --hero-shape-left: 1080;
`
const Shape2 = styled.img`
  ${Shape}
  --hero-shape-width: 235;
  --hero-shape-top: 265;
  --hero-shape-left: 1650;
`
const Shape3 = styled.img`
  ${Shape}
  --hero-shape-width: 155;
  --hero-shape-top: 415;
  --hero-shape-left: 1447;
`
const Shape4 = styled.img`
  ${Shape}
  --hero-shape-width: 160;
  --hero-shape-top: 671;
  --hero-shape-left: 1260;
`
const Shape5 = styled.img`
  ${Shape}
  --hero-shape-width: 430;
  --hero-shape-top: 595;
  --hero-shape-left: 1600;
`
const Shape6 = styled.img`
  ${Shape}
  --hero-shape-width: 150;
  --hero-shape-top: 770;
  --hero-shape-left: 590;
`
const Shape7 = styled.img`
  ${Shape}
  --hero-shape-width: 315;
  --hero-shape-top: 730;
  --hero-shape-left: 30;
`
const Shape8 = styled.img`
  ${Shape}
  --hero-shape-width: 300;
  --hero-shape-top: 60;
  --hero-shape-left: 100;
`
const Shape9 = styled.img`
  ${Shape}
  --hero-shape-width: 160;
  --hero-shape-top: 158;
  --hero-shape-left: 770;
`

const Hero = ({ className }) => {
  return (
    <Container className={className}>
      <HeroFrame>
        <BackgroundCircle />
        <Shape1 src={shape1} role="presentation" aria-hidden="true" />
        <Shape2 src={shape2} role="presentation" aria-hidden="true" />
        <Shape3 src={shape3} role="presentation" aria-hidden="true" />
        <Shape4 src={shape4} role="presentation" aria-hidden="true" />
        <Shape5 src={shape5} role="presentation" aria-hidden="true" />
        <Shape6 src={shape6} role="presentation" aria-hidden="true" />
        <Shape7 src={shape7} role="presentation" aria-hidden="true" />
        <Shape8 src={shape8} role="presentation" aria-hidden="true" />
        <Shape9 src={shape9} role="presentation" aria-hidden="true" />
      </HeroFrame>
      <Title>
        <Tltr>TLTR;</Tltr>
        <CourseName>TypeScript</CourseName>
      </Title>
      <HeroDescription>
        <NotifyPrompt />
      </HeroDescription>
    </Container>
  )
}

export default Hero
