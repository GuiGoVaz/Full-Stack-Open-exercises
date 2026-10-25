import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import Blog from './Blog'

const blog = {
    title: "Title test7",
    author: "Author test2",
    url: "url test2",
    likes: "3",
    id: "1",
    user: {
        id: '6acd226126e3c8f99f463fe3',
        username: 'roo',
        name: 'Superuser2',
        passwordHash: '$2b$10$DTa8A5RXZE0PAzgbCbAUO.rRrLP0SXOzlRw1D2MJv.UXnAxL6fiom',

    }
}
const user = {
    id: '6acd226126e3c8f99f463fe3',
    username: 'roo',
    name: 'Superuser2',
    passwordHash: '$2b$10$DTa8A5RXZE0PAzgbCbAUO.rRrLP0SXOzlRw1D2MJv.UXnAxL6fiom',

}
const mockHandler1 = vi.fn()
const mockHandler2 = vi.fn()

describe('<Blog />', () => {
    beforeEach(() => {


        render(<Blog key={blog.id} blog={blog} user={user} handleLike={mockHandler1} handleRemove={mockHandler2} />)
    })

    test('renders title and author but not likes and URL by default', async () => {


        const element = screen.getByText(
            `${blog.title}`, { exact: false }
        )
        const element2 = screen.getByText(
            `${blog.author}`, { exact: false }
        )
        expect(element).toBeDefined()
        expect(element2).toBeDefined()

        const element3 = screen.queryByText(
            `${blog.url}`, { exact: false }
        )
        const element4 = screen.queryByText(
            `${blog.likes}`, { exact: false }
        )
        expect(element3).toBeNull()
        expect(element4).toBeNull()
    })

    test('after clicking the button, URL and likes are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.queryByText(
            `view`, { exact: false }
        )
        await user.click(button)

        const element = screen.getByText(
            `${blog.likes}`, { exact: false }
        )
        const element2 = screen.getByText(
            `${blog.url}`, { exact: false }
        )

        expect(element).toBeDefined()
        expect(element2).toBeDefined()
    })

    test('like button works while pressing twice', async () => {
        const user = userEvent.setup()
        const button = screen.queryByText(
            `view`, { exact: false }
        )

        await user.click(button)
        const likeButton = screen.getByRole('button', { name: 'like' })

        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler1.mock.calls).toHaveLength(2)


    })

})