import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import {
  Label3,
  Label2Styles,
  Label3Styles,
  Body3Styles,
  Body2,
  Heading3Styles,
} from '../styles/Typography'

const CONVERTKIT_FORM_ID = '3382032'
const CONVERTKIT_PUBLIC_API_KEY = 'enqnB60zz9yHfAppSdBe1g'

const Container = styled.div`
  background-color: rgba(var(--text-color), 0.05);
  border-radius: calc(0.9 * 1rem);
  line-height: 1;
  padding: 0.88rem 1rem;
  margin: 2rem 0;
  position: relative;
  max-width: 100%;

  @media screen and (min-width: 927px) {
    border-radius: calc(1.5 * 1rem);
    padding: 1.2rem 3rem;
    margin: 3rem -3rem;
    max-width: auto;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 780px) {
    flex-direction: row;
    align-items: flex-end;
  }
`

const Field = styled.div`
  background: transparent;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media screen and (min-width: 780px) {
    padding-right: 2rem;
  }
`

const Input = styled.input`
  ${Body3Styles}
  padding-bottom: 0.5rem;
  border: 0;
  border-bottom: 2px solid rgba(var(--text-color), 0.5);
  color: rgb(var(--text-color));
  background: transparent;
  font-weight: 100;
  transition: border 0.25s ease-in;
  border-radius: 0;

  &::placeholder {
    ${Body3Styles}
    color: rgba(var(--text-color), 0.5);
  }

  &:focus-visible {
    outline: 0;
    border-color: rgb(var(--text-color));

    &:has(+ label) {
      color: red;
    }
  }

  &:-webkit-autofill {
    background: transparent;
    border-color: rgb(var(--buddha-gold-value));
    -webkit-box-shadow: 0 0 0 60px rgba(0, 0, 0, 0) inset !important;
    background-color: transparent !important;
    background-clip: content-box !important;
  }
`

const Label = styled.label`
  ${Label3Styles}
  color: rgba(var(--text-color), 1);
  margin-bottom: 0.4rem;
`

const Button = styled.button`
  ${Label2Styles}
  color: rgb(var(--bg-color));
  border: 0;
  transition: background 0.26s ease-in-out;
  background: rgb(var(--text-color));
  display: block;
  width: 100%;
  border-radius: 50px;
  flex-grow: 0;
  margin-top: 1rem;
  height: 2.5rem;
  max-width: 13rem;
  margin-bottom: 1rem;

  &:disabled {
    background: rgba(var(--text-color), 0.3);
  }

  &:focus,
  &:hover {
    background: rgba(var(--text-color), 0.9);
    cursor: pointer;
  }

  &:focus {
    outline: 2px solid white;
    outline-offset: -6px;
  }

  &:active {
    background: rgba(var(--text-color), 0.8);
  }

  @media screen and (min-width: 780px) {
    flex-basis: 10rem;
  }
`

const StyledHeading3 = styled.h3`
  ${Heading3Styles}
  margin: 0 0 0.5rem 0;
`

const SignUp = ({ children }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [response, setResponse] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = email !== '' && name !== ''

    if (isValid) {
      setIsPosting(true)
      const response = fetch(
        `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: CONVERTKIT_PUBLIC_API_KEY,
            email,
            first_name: name,
          }),
        }
      )
      setResponse(response)
    }
  }

  if (response) {
    return (
      <Container>
        <StyledHeading3>Verify your email to continue</StyledHeading3>
        <Body2>
          <p>
            Thank you so much for subscribing! 🙌 It feels great watching this
            community growing day-by-day. I hope you'll find something
            interesting.
          </p>
        </Body2>
      </Container>
    )
  }

  return (
    <Container>
      {children}
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Type your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field>
          <Label>First Name</Label>
          <Input
            type="text"
            placeholder="Type your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Button disabled={isPosting} type="submit">
          Subscribe
        </Button>
      </Form>

      <Label3>No spam. Unsubscribe anytime.</Label3>
    </Container>
  )
}

export default SignUp
