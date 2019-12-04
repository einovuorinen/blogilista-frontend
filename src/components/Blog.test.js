import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' 
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Component testing with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'fllstck.com',
    likes: 0
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Matti Luukkainen'
  )
  expect(component.container).toHaveTextContent(
    '0'
  )
})

test('calls onClick', () => {
	const blog = {
    title: 'Component testing with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'fllstck.com',
    likes: 0
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})