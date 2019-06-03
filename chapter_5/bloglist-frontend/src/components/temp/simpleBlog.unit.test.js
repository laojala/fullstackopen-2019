import React from 'react'
import { render, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
//import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Blog title',
    author: 'Some Person',
    likes: 5,
  }

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