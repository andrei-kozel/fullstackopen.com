import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test blog',
    author: 'Sarah Edwards',
    url: 'https://www.natravelblog.com/9-highly-cliched-but-still-brilliant-books-for-backpackers/',
    likes: 100,
    userId: '61fd7c943017b5bbaa57ac1f'
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('Test blog')
  expect(component.container).toHaveTextContent('Sarah Edwards')
  expect(component.container).not.toHaveTextContent(
    'https://www.natravelblog.com/9-highly-cliched-but-still-brilliant-books-for-backpackers/'
  )
  expect(component.container).not.toHaveTextContent('100')
})
