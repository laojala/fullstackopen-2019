import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import 'jest-dom/extend-expect'
//simport { prettyDOM } from 'dom-testing-library'
import Blog from '../components/Blog'

afterEach(cleanup)

const blog = {
  id: '5a422a851b54a676234d17f7',
  title: 'Making your UI tests resilient to change',
  author: 'Kent C. Dodds',
  url: 'https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change',
  likes: 7,
  user: '12345'
}

const users = [{
  blogs: [
    '5a422a851b54a676234d17f7'
  ],
  username: 'blogger2',
  name: 'Another Blogger',
  id: '12345'
}]

const sel = id => `[data-testid="${id}"]`

const mockHandler = jest.fn()
const mockHandler2 = jest.fn()

test('only name and author are visible when blog is rendered', async () => {

  const component = render(
    <Router>
      <Blog
        blog={blog}
        users={users}
        user={users[0]}
        handleNewLike={mockHandler}
        removeBlog={mockHandler2} />
    </Router>
  )

  const title = component.container.querySelector('[data-testid="always_visible"]')
  const details = component.container.querySelector('[data-testid="toggleable"]')

  expect(title).toBeVisible()
  expect(title).toHaveTextContent('Making your UI tests resilient to change')
  expect(title).toHaveTextContent('Kent C. Dodds')

  expect(details).not.toBeVisible()
})

test('details become visible when title row is clicked', async () => {

  const component = render(
    <Router>
      <Blog
        blog={blog}
        users={users}
        user={users[0]}
        handleNewLike={mockHandler}
        removeBlog={mockHandler2} />
    </Router>
  )

  const title = component.container.querySelector(sel('always_visible'))
  const details = component.container.querySelector(sel('toggleable'))

  expect(details).not.toBeVisible()

  fireEvent.click(title)

  expect(details).toBeVisible()

  expect(details).toHaveTextContent('https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change')
  expect(details).toHaveTextContent('7 likes')
  expect(details).toHaveTextContent('Added by: Another Blogger')

})