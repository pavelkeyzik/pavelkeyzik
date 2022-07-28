---
title: 'How to test React application with Jest'
date: '2022-02-11'
tags: ['React', 'Testing']
draft: false
summary: "Have you ever tested your React application using Jest? I think it's awesome and saves you a lot of time"
authors: ['default']
---

![The screen with code of unit tests](/static/images/how-to-test-react-application/cover.jpg)

<p>
  Image by [Ferenc Almasi](https://unsplash.com/@flowforfrank?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
</p>

Have you ever tested React application using Jest? I think it's awesome and saves you a lot of time and if you want to know why. Then continue to read this article.

## Why do we have to write tests

The reason why we have to write tests is the confidence of updating this part of the code in the future. And another cool thing about it is that well-written tests are like documentation. I’m serious! I often read test cases to understand how code is working.

## Do we always need them?

Probably not. If your application is just a pet project to try something or a small application without any complex logic. Then you can ignore them but even if you have a small project it’ll be better to use tests.

Have you ever tried **Test-driven development (TDD)**? You'll feel like it's too long to write tests first. But the reason why **TDD** is awesome it's making you think about API, not the actual implementation. So, you'll get what you need exactly instead of a calling function like `thisIsDoingSomething()` and using it through the entire application because you don't have time to refactor.

## How to write tests?

I'm going to show you the way I write unit tests but you can write however you want. Because JavaScript === Freedom.

### The AAA (Arrange, Act, and Assert) pattern

The **AAA pattern** just tells you the structure of code inside your tests. A basic example is:

```js
// Arange
const x = 2
const y = 4

// Act
const result = sum(x, y)

// Assert
expect(result).toBe(6)
```

### Basic test of functionality

Let's say we have some function that takes coordinates of destinations and you want to test the shortest path to them.

```js
describe('Get Shortest Path', () => {
  it('should return a list of destination in order with shortest path', () => {
    const destinations = [
      { x: 0, y: 0 },
      { x: 100, y: 100 },
      { x: 50, y: 50 },
    ]
    const expectedResult = [
      { x: 0, y: 0 },
      { x: 50, y: 50 },
      { x: 100, y: 100 },
    ]

    const result = getShortestPath(destinations)

    expect(result).toBe(expectedResult)
  })
})
```

### Testing that React component has UI elements

When you build, for example, a`<UsersList />` component, you'd expect to see a list of users, right? Then what about writing tests for this? It's so easy.

Usually, I start to think about edge cases. In our example it can be:

1. We don't have anything
2. We're fetching data and want to show Loading state
3. We have everything that we need and can show `<UsersList />` component

Now, let's have a look at our tests and after that, you'll find all information about used functions down below.

```js
import { render, screen } from '@testing-library/react'
import { UsersList } from 'components/UsersList'

describe('UsersList component', () => {
  // Case 1. We don't have anything
  it('should contain a message about empty list', () => {
    render(<UsersList users={[]} status="loaded" />)

    const result = screen.queryByText('No users')

    expect(result).toBeInTheDocument()
  })

  // Case 2. Shows loading state when fetching something
  it('should contain a message about loading data', () => {
    render(<UsersList users={[]} status="loading" />)

    const result = screen.queryByText('Loading...')

    expect(result).toBeInTheDocument()
  })

  // Case 3. Shows data to the user
  it('should contain a message about loading data', () => {
    const users = [
      { id: 1, name: 'Mark' },
      { id: 2, name: 'Marie' },
    ]
    render(<UsersList users={users} status="loaded" />)

    const result = screen.queryAllByRole('listitem')

    expect(result).toHaveLength(2)
    expect(result[0]).toHaveTextContent('Mark')
    expect(result[1]).toHaveTextContent('Marie')
  })
})
```

- **render()** - takes our component and build a DOM elements
- **screen** - a helper to find elemens in our DOM
- **screen.queryByText()** - find element by text
- **expect.toBeInTheDocument()** - checks that element that we're searching for is in DOM
- **expect.toHaveLength()** - takes `.length` property of array and check this value
- **expect.toHaveTextContent()** - takes DOM element and check `.textContent` property

You can read more about queries in `@testing-library/react` [here](https://testing-library.com/docs/queries/about/#types-of-queries). It's definitely worth it to read this if you don't know what query to use.

And that's how our component may look like:

```jsx
function UsersList({ users, status }) {
  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!users || users.length === 0) {
    return <div>No users</div>
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

## Summary

Tests are great and in most cases, it's not so hard to write them. Just try to write a few of them, and you'll understand them better. I spent a lot of time understanding why and how to write them. And you know what? Practice makes perfect!

## Reading list

- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [About Queries](https://testing-library.com/docs/queries/about)
- [WAI-ARIA Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)
