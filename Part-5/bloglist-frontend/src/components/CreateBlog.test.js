import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import CreateBlog from './CreateBlog'

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

test( '', () => {
  const mockCreateNewBlog = jest.fn()
  const component = render(<CreateBlog createNewBlog={mockCreateNewBlog} />)
  //screen.debug()
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const btnSubmit = screen.getByRole('button', { name: /create/i })

  fireEvent.change(titleInput, { target : { value: blogTest.title } })
  fireEvent.change(authorInput, { target:{ value: blogTest.author } })
  fireEvent.change( urlInput, { target: { value: blogTest.url } })
  fireEvent.click(btnSubmit)

  expect(mockCreateNewBlog).toHaveBeenCalledTimes(1)
  expect(mockCreateNewBlog).toHaveBeenCalledWith(blogTest.title, blogTest.author, blogTest.url)
  //console.log(mockCreateNewBlog.mock)
})