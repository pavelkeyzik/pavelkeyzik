---
title: 'How to Improve Development Experience of your React Project'
date: '2024-01-21'
tags: ['React', 'JavaScript', 'TypeScript', 'Linting']
draft: false
summary: "We'll cover how to set up Prettier, ESLint, Stylelint, Commitlint, and Husky to speed up your development and have consistent code styles across the team"
authors: ['default']
images: ['/static/images/how-to-improve-development-experience-of-your-react-project/cover.png']
---

![Example of commit lint error in terminal](/static/images/how-to-improve-development-experience-of-your-react-project/cover.png)

In this article, I'm going to show you how to set up a few small but yet useful tools that can speed up your workflow. The reason why we need them is to have a consistent codebase across the entire team. This makes it much easier to read code or commits from your colleagues. You won't need to spend much time formatting your code because it will be done automatically.

Forget about long discussions on whether to use a semicolon at the end of the line or not, or what the right commit message format is. Configure it once, and focus on the business logic instead.

## Set up Prettier

Let's start with an easy one. [Prettier](https://prettier.io/) helps you automatically format your code to make its style more readable. Here's an example of how the code looks before and after running Prettier.

![Code before & after formatting with Prettier](/static/images/how-to-improve-development-experience-of-your-react-project/prettier-before-after.png)

First, create a `.prettierrc` file. It should contain a list of options to describe how to format our code. For example, `singleQuote` indicates whether we should use single quotes or not. You can find the full list of options [here](https://prettier.io/docs/en/options.html).

```json
{
  "singleQuote": false,
  "endOfLine": "lf",
  "tabWidth": 2,
  "trailingComma": "all"
}
```

The next thing you need to do is tell your IDE to run Prettier automatically every time you save the file (or whenever it works best for you). You can find information specific to your IDE [here](https://prettier.io/docs/en/editors).

## Set up ESLint

The next tool is [ESLint](https://eslint.org/). This tool helps you find issues in your code and highlights errors. You'll find many plugins for ESLint that can help you configure it the way you want, or you can even use shared configs.

In the [previous article](/blog/how-to-set-up-your-first-react-project), we set up the React project with `vite`. By default, it comes with ESLint configuration. Check out the ["Getting Started with ESLint"](https://eslint.org/docs/latest/use/getting-started#quick-start) page for information on how to install the basic configuration of ESLint. In this article, we'll just add a small plugin that I find quite useful.

The plugin is `eslint-plugin-simple-import-sort`. As you might guess from the name, it helps us to sort and group our imports (it works for exports as well). If you're like me, and you enjoy grouping similar things together, you'll love it because you won't need to do this manually anymore.

Let's install our dependency:

```shell
npm install eslint-plugin-simple-import-sort --save-dev
```

Now, all you need to do is add this plugin to your ESLint config and instruct ESLint to highlight errors when there are sorting issues:

```js
{
  plugins: [
    // ...
    'simple-import-sort'
  ],
  rules: {
    // ...
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  }
}
```

Here's the example of how the code would look like before and after running this plugin:

![The result of ESLint import sort plugin work](/static/images/how-to-improve-development-experience-of-your-react-project/eslint-plugin-sort.png)

## Set up Stylelint

[Stylelint](https://stylelint.io/) is similar to ESLint, but its focus is on styling rather than JavaScript. It helps you find errors in style files, such as old syntax or empty classes. We will also incorporate `stylelint-config-clean-order` to sort your style rules and group them consistently across the entire codebase.

Now, let's begin by installing the dependencies we need.

```shell
npm install stylelint stylelint-config-standard stylelint-config-clean-order --save-dev
```

Now create a file `.stylelintrc.json` and add our plugin to:

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-clean-order"]
}
```

Update your `package.json` file with the new `lint:style` script. We're going to use it a bit later when we're going to set up lint job before all our commits.

```json
{
  "scripts": {
    "lint:style": "stylelint \"**/*.css\""
  }
}
```

The last thing we need to do is install an extension for your IDE that will catch Stylelint errors. Check your [Editor integrations](https://stylelint.io/awesome-stylelint/#editor-integrations). For example, if you're using VSCode, you can install `vscode-stylelint`.

## Set up Husky

Now, let's talk about [Husky](https://typicode.github.io/husky). It's a wonderful tool that enables you to run scripts on any Git hooks. We'll add a `pre-commit` hook to run ESLint and Stylelint checks before committing. This ensures that we don't commit code with errors.

The setup is super easy—just run:

```shell
npx husky-init && npm install
```

It'll generate `.husky` folder where you could find `pre-commit` file. You'll need to change default `npm test` with any scripts you want. In our case it'll be:

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run lint:style
```

Now, every time you commit, the `lint` and `lint:style` scripts will run automatically. If either of them throws an error, you won't be able to commit until you fix the issues.

One small improvement we can make here is to run these checks only for the files you're committing.

## Set up lint-staged

The [lint-staged](https://github.com/lint-staged/lint-staged) is a utility that will help us to run lint on, staged files. Staged filed are those that you're going to add to commit.

First, install `lint-staged` dependency.

```shell
npm install lint-staged --save-dev
```

Next, create a `.lintstagedrc` file that will contain a list of file patterns and scripts that need to be run. Note that we also add the `--fix` prefix here. This will automatically fix all errors, but if there's something that can't be fixed as easily as formattings, it will throw an error, preventing you from committing.

```json
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix --no-ignore --report-unused-disable-directives --max-warnings=0"
  ],
  "*.css": ["stylelint --fix --max-warnings=0"]
}
```

Now we need to update our `.husky/pre-commit` file and instead of running two scripts, we'll run just one:

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

And here's what you'll see if something goes wrong:

![The result of lint-staged work in terminal](/static/images/how-to-improve-development-experience-of-your-react-project/running-lint-staged.png)

## Set up Commitlint

We've covered everything about writing well-formatted and structured code without worrying too much about it anymore. The only part we haven't explored yet is linting commit messages. [Commitlint](https://commitlint.js.org) will help us here. It allows you to configure any rules you want for the commit message, but we're going to use the [Conventional Commits](https://www.conventionalcommits.org/) specification, one of the most popular conventions you'll find.

Let's start from installing dependencies we'll need:

```shell
npm install @commitlint/{cli,config-conventional} --save-dev
```

Create a new file `commitlint.config.js` at the root of your project with this content:

```js
export default {
  extends: ['@commitlint/config-conventional'],
}
```

And final step, will be creating a `commit-msg` hook that will run commitlint when you're trying to add new commit.

```shell
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

Now, if you're going to try to commit something like `git commit -m "Some commit Message"` it'll throw an error. You should use `git commit -m "feat: some commit message"` instead. Read more about the conventional commits [here](https://www.conventionalcommits.org/en/v1.0.0/#summary).

The result of commitlint run will explain what's wrong and even provide a link to docs:

![The result of commitlint run](/static/images/how-to-improve-development-experience-of-your-react-project/commitlint-run.png)

## Thank you!

If you've been with me from the beginning, reading and configuring everything, I want to express my gratitude. I hope this serves as a great example of how companies configure their codebases to achieve consistency and better code quality. Moreover, it significantly speeds up your workflow since you no longer need to worry about sorting or formatting..
