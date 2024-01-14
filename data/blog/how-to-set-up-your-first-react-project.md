---
title: 'How to Set Up Your First React Project'
date: '2024-01-14'
tags: ['React', 'JavaScript', 'TypeScript']
draft: false
summary: 'Are you starting with React? This article is about a short and easy way to create React application'
authors: ['default']
images: ['/static/images/how-to-set-up-your-first-react-project/cover.jpg']
---

![The screen with some react code](/static/images/how-to-set-up-your-first-react-project/cover.jpg)

<p>
  Image by [Lautaro Andreani](https://unsplash.com/@lautaroandreani)
</p>

## Where to start?

There are too many ways to create the React application, we have a bunch of tools and frameworks that allow us easily set up our app. In this tutorial, I am going to use [Vite](http://vitejs.dev/) as it's the easiest way to set up basic React application that will work on the client side.

> Another popular choice is [Next.js](https://nextjs.org) framework that's built on top of React and adds a lot of useful things you might want to have in the future, but if you are starting to learn React, you might not need them until you understand how React works and what problems you could solve by using [Next.js](https://nextjs.org)

Before you can create an application with Vite, you need to install [Node.js](https://nodejs.org/en) this thing is must in modern web development. Just go to the [Node.js website](https://nodejs.org/en) and download latest version. To make everything installed correctly, run this command in terminal:

```shell
node --version

# You should see some version, for example v21.5.0
```

Another thing you’ll need is code editor. I personally use VSCode, it’s free, open source and probably one of the most popular choice for web development.

## Create the Base Application

Now, let’s open the terminal and go to any folder where you’d like to store your React project and run the command below.

> In the code below, I use the template react-ts; this tells Vite to create a React application with [TypeScript](https://www.typescriptlang.org). If you don’t want using TypeScript, you could replace `react-ts` with `react`.

Checkout [Vite docs](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) for all available templates

```shell
npm create vite@latest my-app-name -- --template react-ts
```

This will create a folder structure and generates all files we need. Now, let’s open the folder, install all dependencies, and finally run our project:

```shell
cd my-app-name
npm install
npm run dev
```

You should now see in terminal a URL to the application. By default, it’s [http://localhost:5173/](http://localhost:5173/), so let’s open it in browser and I hope you see same page as me.

![The expected result in the browser](/static/images/how-to-set-up-your-first-react-project/app-result.png)

Now you should be able to open `src/App.tsx` or (`src/App.jsx` if you decided not to use TypeScript) and you could see change the HTML-like code, save file and it’ll automatically rebuild this code and you’ll see updates in browser. Have fun here ☺️

## What's next?

Now you can go to [Quick Start – React](https://react.dev/learn) and learn more about the React itself. I don’t have any plans to teach React, because React docs are perfect to learn about React. See you in the next article where I’m going to add more configuration to make my development experience a bit better 😄
