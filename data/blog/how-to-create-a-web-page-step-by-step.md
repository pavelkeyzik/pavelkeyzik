---
title: 'How to Create a Web Page (Step by Step)'
date: '2022-08-29'
tags: ['Career']
draft: false
summary: "In this article we'll create our first website step by step"
authors: ['default']
images: ['/static/images/how-to-create-a-web-page-step-by-step/cover.jpg']
---

![Laptop with wallpaper that says just start](/static/images/how-to-create-a-web-page-step-by-step/cover.jpg)

<p>
  Image by [Dayne Topkin](https://unsplash.com/@dtopkin1)
</p>

Hey 👋 My name's Pavel and I'm a Front End Developer. I started to learn web development in 2012 and I want to share some basic knowledge you'll need to create your website. We'll create a super simple page and publish it, so you'll be able to share the link with anyone. Everything is free and doesn't take a lot of time, so let's get started.

## What You Need to Start

In general, you don't need anything. The way the web works is we have some address where our site lives and `index.html` file that contains the code of our website. You can create `index.html` file in any editor you want. In this tutorial, I'm going to use [VSCode](https://code.visualstudio.com/), it's completely free and open source. You can choose anything from the list below, but some of the tools are not free:

- [VSCode](https://code.visualstudio.com/)
- [Sublime Text](https://www.sublimetext.com/)
- [Notepad++](https://notepad-plus-plus.org/)
- [WebStorm](https://www.jetbrains.com/webstorm/)
- [Atom](https://atom.io/) (GitHub announced on their blog Atom's end-of-life, on December 15, 2022)
- [Brackets](https://brackets.io/)

## Basic Page Structure

I hope you found some editor you like and now we can get started. Create some folder on your computer, for example, `my-personal-website` and open this folder in your code editor. Create `index.html` and let's begin our journey to Front End development.

Let's add this code to our `index.html` file.

```html:index.html
<!DOCTYPE html>
<html>
<head>
  <title>My Personal Website</title>
</head>
<body>
  <p>Hi, my name's Pavel! And I'm going to be a Front End Developer</p>
</body>
</html>
```

When you open this file in the browser you should see this:

![Rendered website with content from body tag](/static/images/how-to-create-a-web-page-step-by-step/basic-html-example.jpg)

Easy, right? Let me explain the code.

At the very top of our file, we have `<!DOCTYPE html>` with this line our browser understands it's the HTML file. Inside the `head` tag, we add some information about the website like title, description, keywords, etc. Everything between `<body>` and `</body>` it's something that users will see on the website. In our case, we use `<p>` tag that means "Let's show paragraph with the message inside". That's what `HTML` language looks like.

Now, all you need is to Google things like "How to add an image in HTML", you'll see some examples like `<img src="..." >`, just copy this and add inside `<body>`. Like this:

```html:index.html {8}
<!DOCTYPE html>
<html>
<head>
  <title>My Personal Website</title>
</head>
<body>
  <p>Hi, my name's Pavel! And I'm going to be a Front End Developer</p>
  <img src="https://images.unsplash.com/photo-1615916605299-21a82ebf0933">
</body>
</html>
```

Now I encourage you to change texts and add anything you want on your website using tags from this [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element). Click on tag you like and you'll get code examples.

## Make Your Page Unique

If you've finished with this little task, then let's make our website even more unique. We're going to talk about `CSS` now. HTML handles only some basic things, like show text, input, image, etc. And to change colors, spacing, position of the elements, we need CSS language.

Let's add `<style>` tag inside `<head>` with this content:

```html:index.html {5-13}
<!DOCTYPE html>
<html>
<head>
  <title>My Personal Website</title>
  <style>
    body {
      background: black;
    }

    p {
      color: white;
    }
  </style>
</head>
<body>
  <p>Hi, my name's Pavel! And I'm going to be a Front End Developer</p>
</body>
</html>
```

The idea of CSS is pretty simple you say "Hey! Can you find a **body** element and set background color to black. Oh... And please, change text color in my **p** tag to white". This is a pretty simple example, but shows you the basic idea of how it works. Now you can refresh the page in the browser and see if your page is changed. You should see white text on black background. I hope everything works and we can move on.

Let's say we have two `<p>` tags but you want to apply different colors for them. The idea is to add a `class` attribute in your HTML with different names, and then, select elements using the **CSS class selector**. Here is what I mean:

```html:index.html {10-16,20-21}
<!DOCTYPE html>
<html>
<head>
  <title>My Personal Website</title>
  <style>
    body {
      background: black;
    }

    .white-text {
      color: white;
    }

    .orange-text {
      color: orange;
    }
  </style>
</head>
<body>
  <p class="white-text">Hi, my name's Pavel!</p>
  <p class="orange-text">I'm going to be a Front End Developer</p>
</body>
</html>
```

We have two CSS selectors here `.white-text` and `.orange-text`, when our selector starts with `.`, CSS will understand it's a class selector. Here is the [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) list made by MDN with a great explanation and examples.

## How to Deploy a Website

Now it's time to publish our website, or as we usually say **deploy** website. The idea of this section is to make our site visible to anyone! Even your parents can take a look and give you some feedback.

There are so many nice and free hosting, but I usually use [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). In this tutorial, I'll show you how to use Netlify.

1. Go to [https://app.netlify.com/](https://app.netlify.com/) and create your account.
2. Now go to the home page, called **Teams Overview**
3. Click **Add new site** > **Deploy Manually**

![Shows where does link is placed on the page](/static/images/how-to-create-a-web-page-step-by-step/deploy-manually-link.png)

Now you should be able to drop our `my-personal-website` folder that contains `index.html` file. After that, you should see the screen below. You'll need to wait a little bit until the status of Production Deploys will change from **Uploading** to **Published**.

![Shows the page with successful build](/static/images/how-to-create-a-web-page-step-by-step/published-on-netlify.png)

Now you have a link to your website, that you can share. In my case it's [https://gleaming-gumdrop-6a0f99.netlify.app/](https://gleaming-gumdrop-6a0f99.netlify.app/).

## Summary

Now you have your website that you can access from anywhere. We wrote some pretty basic HTML and CSS, and you can add more with the given references. I know it doesn't sound like it's all we do in our job as Front End Developers. You should learn more HTML tags, more CSS rules, how to work together, how to improve the speed of your work, and so many other things. I suggest you take some website you love and try to make something similar with HTML and CSS. Because the only way to learn HTML and CSS is by practice.

If you like this article or want to know more about the Front End development, just let me know on [Twitter](https://twitter.com/pavelkeyzik). We can learn together anything.
