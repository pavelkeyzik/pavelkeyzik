---
title: "How I feel about using GitHub's Design System (aka Primer)"
date: '2021-08-19'
tags: ['Design Systems']
draft: false
summary: 'A short story about my experience of using Primer'
authors: ['default']
---

![Post cover](/static/images/using-primer-design-system/cover.jpg)

<p>
  Image by [GitHub Primer](https://twitter.com/githubprimer)
</p>

Just a little story before...

I've been working as a Front-end Engineer since September 2018 and I've tried several Design Systems. I have hands-on experience with Semantic UI, Material UI, and Ant Design. All of these systems are great but I was spending a lot of time on scrolling docs and trying to figure out **"Which prop should I use?"** or **"How to do this?"**.

To be honest, I love GitHub and I even wanted to join the company but they don't have a relocation package. When I was looking for open job vacancies the first question was - **"What type of work I'd love to do"** and the answer was **"Design Systems"**. There wasn't any open position with the keyword "Design Systems" so I opened Google and tried to find some information about GitHub's Design System. That's how I found [Primer](http://github.com/primer/). I was really happy that it's open-sourced, written in React, and actively developed.

## Easy to build layouts

What do you do when you want to add some spacing before the component? Yes, most of the time it'll be something like this.

```jsx
import { styled } from 'styled-components'
import { Button } from 'design-system'

const CusttomButton = styled(Button)`
  margin-top: 16px;
`
```

But I need some faster way to do this. What if we use style property?

```jsx
function App() {
  return <Button style={{ marginTop: '16px' }}>Click on me</Button>
}
```

That's cool to me but the spacing isn't depending on the Design System itself. So Primer is doing a really good job on that.

```jsx
function App() {
  return <Button sx={{ marginTop: 3 }}>Click on me</Button>
}
```

In this example, 3 is the index of an array of spaces from [Theme reference](https://primer.style/react/theme-reference). So this margin will be converted to 16px. I prefer this way as you can update theme spacings in one place in the future.

## What about responsive?

It's awesome! No, seriously! When I was building this blog I didn't think about mobile devices as for me it's easier to design a desktop version first so when the time to build a mobile version comes I realized that it's too easy to do. I just need to use an array of values instead of values for sizes. Let's see an example.

```jsx
function TopHeader() {
  return (
    <Header
      sx={{
        // PX (paddingX) - is a shorthand for padding-left + padding-right
        px: [0, 1, 2],
      }}
    >
      ...
    </Header>
  )
}
```

If you go to [Theme reference](https://primer.style/react/theme-reference) and look into the breakpoints section you'll realize that in our case:

- If screen size is less than 544px then padding is going to be 0px
- If screen size is less than 768px then padding is going to be 4px
- If screen size is less than 1012px then padding is going to be 8px

Don't forget that we use the space size defined in our theme instead of the value of pixels.

## But Primer doesn't have a lot of components as Material does

Yeap! Primer is kinda small but for my goals is enough. It has everything that I need and helps me to do my job quicker. I needed only one component in Primer that they have in Primer CSS but don't have in Primmer React yet.

## What about the community?

I've reported a few issues and got my answer in less than 4 hours. I've also made Pull Request to add a new component and the reviewer was kind and respectful. In my opinion, they doing a great job.

## Primer inspired me

When I started to learn about Design Systems I wanted to do my own. But when you see how many components Material has you understand that you're alone and it's too hard to do something like this. Using Primer, I realized that I don't need too many components to create a small website. Let's say you want to start blogging (like me). You don't need a lot of stuff at the beginning. You need just Buttons, Links, Typography, Icons, and something to make the layout. That's it! The only thing that people may need is a unique design and the ability to change colors to their own.

## Helpful information for those who use Next.js

I've used Next to build this website which has a component for creating links. So, the idea is to replace Next's Link styles with Primer's style. I've done it by making a Link component that accepts all Primer's props and uses them inside Next's link.

```jsx
import NextLink from 'next/link'
import { Link as PrimerLink, LinkProps } from '@primer/components'

function Link(props: LinkProps) {
  const { href, ...rest } = props

  return (
    <NextLink href={props.href} passHref>
      <PrimerLink {...rest} />
    </NextLink>
  )
}

export { Link }
```
