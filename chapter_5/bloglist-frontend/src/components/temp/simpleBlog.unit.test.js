import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import 'jest-dom/extend-expect'
//import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

const blog = {
  title: 'Blog title',
  author: 'Some Person',
  likes: 5,
}

test('renders content', () => {

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const title = component.container.querySelector('.title')
  expect(title).toHaveTextContent(
    'Blog title'
  )

  const author = component.container.querySelector('.author')
  expect(author).toHaveTextContent(
    'Some Person'
  )

  const likesRow = component.container.querySelector('.likesRow')
  expect(likesRow).toHaveTextContent(
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
