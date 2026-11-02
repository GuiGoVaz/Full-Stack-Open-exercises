import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
<<<<<<< HEAD
import Togglable from './Togglable'
import Blog from './Blog'

const blog = {
    title: "Title test7",
    author: "Author test2",
    url: "url test2",
    likes: "3",
    id: "1",
=======
import Blog from './Blog'
import { MemoryRouter } from 'react-router-dom';

const blog = {
    title: 'Title test7',
    author: 'Author test2',
    url: 'url test2',
    likes: '3',
    id: '1',
>>>>>>> draft
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
<<<<<<< HEAD
=======
const user2 = { //who didn't make the blog
    id: '6acd226126e3c8f99f463fe4',
    username: 'roo3',
    name: 'Superuser3',
    passwordHash: '$2b$10$DTa8A5RXZE0PAzgbCbAUO.rRrLP0SXOzlRw1D2MJv.UXnAxL6fioy',

}
>>>>>>> draft
const mockHandler1 = vi.fn()
const mockHandler2 = vi.fn()

describe('<Blog />', () => {
<<<<<<< HEAD
    beforeEach(() => {


        render(<Blog key={blog.id} blog={blog} user={user} handleLike={mockHandler1} handleRemove={mockHandler2} />)
    })
=======
    /* beforeEach(() => {
          //render(<Blog key={blog.id} blog={blog} user={user} handleLike={mockHandler1} handleRemove={mockHandler2} />)
          render(<Blog blog={blog} user={user} setBlogs={mockHandler1} />)
      }) */

    test('Blog information and the number of likes are displayed to unauthenticated users, buttons are not displayed', async () => {

        render(
            <MemoryRouter>
                <Blog blog={blog} user={null} setBlogs={mockHandler1} />
            </MemoryRouter>
        );

        const element = screen.getByText(
            `${blog.title}`, { exact: false }
        )
        const element2 = screen.getByText(
            `${blog.author}`, { exact: false }
        )
        const element3 = screen.queryByText(
            `${blog.url}`, { exact: false }
        )
        const element4 = screen.queryByText(
            `${blog.likes}`, { exact: false })
        const element5 = screen.queryByText(
            `${blog.user.name}`, { exact: false })

        expect(element).toBeInTheDocument()
        expect(element2).toBeInTheDocument()
        expect(element3).toBeInTheDocument()
        expect(element4).toBeInTheDocument()
        expect(element5).toBeInTheDocument()

        const likeButton = screen.queryByRole('button', { name: 'like' })
        const removeButton = screen.queryByRole('button', { name: 'remove' })
        expect(likeButton).not.toBeInTheDocument()
        expect(removeButton).not.toBeInTheDocument()


    })
    test('Authenticated users who are not the blog"s creator are shown only the like button', async () => {
        render(
            <MemoryRouter>
                <Blog blog={blog} user={user2} setBlogs={mockHandler1} />
            </MemoryRouter>
        );

        const likeButton = screen.queryByRole('button', { name: 'like' })
        const removeButton = screen.queryByRole('button', { name: 'remove' })
        expect(likeButton).toBeInTheDocument()
        expect(removeButton).not.toBeInTheDocument()

    })
    test('The blog"s creator is also shown the delete button', async () => {
        render(
            <MemoryRouter>
                <Blog blog={blog} user={user} setBlogs={mockHandler1} />
            </MemoryRouter>
        );

        const removeButton = screen.queryByRole('button', { name: 'remove' })
        expect(removeButton).toBeInTheDocument()

    })

    //////////////// tests before router below
>>>>>>> draft

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
<<<<<<< HEAD
            `view`, { exact: false }
=======
            'view', { exact: false }
>>>>>>> draft
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
<<<<<<< HEAD
        const user = userEvent.setup()
        const button = screen.queryByText(
            `view`, { exact: false }
=======
        render(
            <MemoryRouter>
                <Blog blog={blog} user={user2} setBlogs={mockHandler1} />
            </MemoryRouter>
        );

        const likeButton = screen.queryByRole('button', { name: 'like' })
        const removeButton = screen.queryByRole('button', { name: 'remove' })
        expect(likeButton).toBeInTheDocument()




        const user = userEvent.setup()
        const button = screen.queryByText(
            'view', { exact: false }
>>>>>>> draft
        )

        await user.click(button)
        const likeButton = screen.getByRole('button', { name: 'like' })

        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler1.mock.calls).toHaveLength(2)


    })

<<<<<<< HEAD
=======


>>>>>>> draft
})