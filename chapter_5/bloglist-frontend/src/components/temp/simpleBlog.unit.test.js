import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import 'jest-dom/extend-expect'
//import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

//to run tests once:  CI=true npm test
//to run tests in watch mode: npm test

afterEach(cleanup)

const blog = {
  title: 'Blog title',
  author: 'Some Person',
  likes: 5,
}

test('renders content', () => {

  const sel = id => `[data-testid="${id}"]`

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const title = component.container.querySelector(sel('title'))
  expect(title).toHaveTextContent(
    'Blog title'
  )

  const author =  component.container.querySelector(sel('author'))
  expect(author).toHaveTextContent(
    'Some Person'
  )

  const likesText = component.container.querySelector(sel('likesRow'))
  expect(likesText).toHaveTextContent(
    `blog has ${blog.likes} likes`
  )
})

test('clicking the button calls event handler once', async () => {

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
