import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'





test('<CreateBlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<CreateBlogForm handleCreateBlog={createBlog} />)

    const inputTitle = screen.getByLabelText('title:')
    const inputAuthor = screen.getByLabelText('author:')
    const inputURL = screen.getByLabelText('url:')
    const createButton = screen.getByRole('button', { name: 'create' })

    await user.type(inputTitle, 'title test 1')
    await user.type(inputAuthor, 'author test 1')
    await user.type(inputURL, 'url test 1')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title test 1')
    expect(createBlog.mock.calls[0][0].author).toBe('author test 1')
    expect(createBlog.mock.calls[0][0].url).toBe('url test 1')

})