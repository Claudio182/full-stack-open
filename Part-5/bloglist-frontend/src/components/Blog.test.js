import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'

describe('<Blog />', () => {
  // eslint-disable-next-line no-unused-vars
  let component
  const blogTest = {
    title: 'Component testing with react-testing-library',
    author: 'Someone',
    url: 'https://react-testing-library.com',
    likes: 10,
    user: {
      name: 'Dan Hall',
      username: 'dan123',
    },
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blogTest}
        likeIncrement={mockUpdateBlog}
        blogRemove={mockDeleteBlog}
        username='dan123'
      />
    )
  })

  afterEach(() => {
    cleanup()
  })

  test('blog component show title and author, but not url or likes', () => {
    const titleAuthor = screen.getByText('Component testing with react-testing-library Someone')

    const url = screen.queryByText('https://react-testing-library.com')

    const likes = screen.queryByText('likes')

    expect(titleAuthor).toBeInTheDocument()
    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()
  })

  test( 'url an likes are showed after click the show button', async () => {
    const showButton = screen.getByText('show')

    fireEvent.click(showButton)

    const url = await screen.findByText(/https:\/\/react-testing-library.com/i)

    const likes = await screen.findByText(/10/i)

    expect( url).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
  })

  test( 'like button is pressed twice, two calls are made to the controlling function', async () => {
    const btnShow = screen.getByText(/show/)
    fireEvent.click(btnShow)
    const btnLike = await screen.findByRole( 'button', { name: /like/ })
    fireEvent.click(btnLike)
    fireEvent.click(btnLike)
    console.log(mockUpdateBlog.calls)
    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
  })

})