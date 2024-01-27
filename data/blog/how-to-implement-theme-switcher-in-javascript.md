---
title: 'How to implement Theme Switcher in JavaScript'
date: '2024-01-27'
tags: ['JavaScript']
draft: false
summary: "Have you ever implemented a dark/light/system theme switcher? No? If not, let's do this together"
authors: ['default']
images: ['/static/images/how-to-implement-theme-switcher-in-javascript/cover.jpg']
---

![Theme state toggler](/static/images/how-to-implement-theme-switcher-in-javascript/cover.jpg)

In this article, you'll learn how to build a theme switcher in JavaScript. It should be a pretty easy thing to do, but you might learn something from my code as well. Let's have fun.

## What cases do we need to cover?

One of the most basic scenarios we should address is changing the theme from light to dark and vice versa. The second thing we need to remember is that some people prefer to use the same settings as in the system. It's useful for those who switch between dark and light themes throughout the day. The third thing is saving user preferences; otherwise, if you refresh the page, all the settings will be set to default again.

## Create a theme store

Our initial function will be `createThemeStore()`, which will contain nearly everything. I want to mention that this may not be the optimal approach, but hey, we're coding for fun here.

```js
function createThemeStore(options) {
  // Initial mode
  const initialMode = options.defaultMode || 'system'

  // Initial state
  const state = {
    mode: initialMode,
    systemTheme: getSystemTheme(),
    theme: getThemeByMode(initialMode),
  }
}
```

Here we create a state with only 3 variables:

- `mode`: This represents the selected mode of the theme, with possible values of `dark`, `light`, or `system`. It allows us to determine whether to use the system's theme or not.
- `systemTheme`: This holds the current value of the theme in your OS. Even if we choose a specific theme (`dark` or `light)`, we still update this variable when the OS theme changes to ensure we can adjust the theme correctly when the user switches to `system` mode.
- `theme`: This is the actual theme that the user sees, with possible values of `dark` or `light`.
- `options.defaultMode`: This is used to restore correct theme preferences. For instance, you could save theme changes in `localStorage` and then use it as the default, ensuring that the user's preferences are retained.

## Add subscriptions

When the user changes the theme or the OS theme is updated, we need a way to notify our code. This is where subscriptions come in. We need to allow subscriptions to changes in our `state` object. Here's the code that will help us with it. Remember, for now, we do everything inside `createThemeStore()`.

```js
function createThemeStore(options) {
  // ...

  // Create subscriptions object to be able notify subscribers
  const subscriptions = new Map()
  let subscriptionId = 0 // Just a unique id for every subscriber

  // A place where we send notification to all of our subscribers
  function notifyAboutThemeChange(theme) {
    subscriptions.forEach((notify) => {
      const notificationData = {
        mode: state.mode,
        theme,
      }

      notify(notificationData) // Calls subscribed function (The example how we use it will be later)
    })
  }

  // A function that allows to subscribe to state changes
  function subscribe(callback) {
    subscriptionId++
    subscriptions.set(subscriptionId, callback)

    state.systemTheme = getSystemTheme() // We'll define it later

    if (state.mode === 'system') {
      notifyAboutThemeChange(state.systemTheme)
    } else {
      notifyAboutThemeChange(state.theme)
    }

    return subscriptionId
  }

  // A function that allows to unsubscribe from changes
  function usubscribe(subscriptionId) {
    subscriptions.delete(subscriptionId)
  }

  return {
    subscribe,
    usubscribe,
  }
}
```

Here's how it works from the consumer side.

```js
// Create a theme store
const store = createThemeStore()

// Suscribe to changes
const subscriptionId = store.subscribe((newTheme) => {
  // Here you'll be seeing theme changes
  console.log(newTheme)
})

// When you need to unsubscribe from theme change, you just call
store.usubscribe(subscriptionId)
```

## Detect a system theme preferences

Now that we have our base code structure, let's add something useful. We need to define two helper functions:

- `getSystemTheme()`: This should return the current OS theme dark or light
- `getThemeByMode()`: This should return either dark or light based on our theme mode. For example, if the mode is set to dark, we return dark. However, when the mode is set to system, we check the system theme and respond with either dark or light, depending on the OS preferences.

It's important to note that this code won't be inside our `createThemeStore()` function. We're using `window.matchMedia` with a `prefers-color-scheme` media query, allowing us to determine if the OS system is set to dark or not.

```js
const mediaQuery = '(prefers-color-scheme: dark)'

// Get's current OS system
function getSystemTheme() {
  if (window.matchMedia(mediaQuery).matches) {
    return 'dark'
  }

  return 'light'
}

// Based on user's preferences we return correct theme
function getThemeByMode(mode) {
  if (mode === 'system') {
    return getSystemTheme()
  }

  return mode
}

function createThemeStore(options) {
  // ...
}
```

Now, the only thing we need to do to detect our OS theme changes is to add event listener.

```js
function createThemeStore(options) {
  // ...

  // When the OS preference has changed
  window.matchMedia(mediaQuery).addEventListener('change', (event) => {
    const prefersDarkMode = event.matches

    // We change system theme
    state.systemTheme = prefersDarkMode ? 'dark' : 'light'

    // And if user chose `system` mode we notify about the change
    // in order to be able switch theme when OS settings has changed
    if (state.mode === 'system') {
      notifyAboutThemeChange(state.systemTheme)
    }
  })
}
```

## Add an ability to manually change the theme mode

We've implemented automatic theme updates whenever our OS preferences change. The only part we haven't discussed yet is manual updates of the theme mode. You'll be using this function on your dark, light, and system theme buttons.

```js
function createThemeStore(options) {
  // ...

  function changeThemeMode(mode) {
    const newTheme = getThemeByMode(mode)

    state.mode = mode
    state.theme = newTheme

    if (state.mode === 'system') {
      // If the mode is system, send user a system theme
      notifyAboutThemeChange(state.systemTheme)
    } else {
      // Otherwise use the one that we've selected
      notifyAboutThemeChange(state.theme)
    }
  }

  return {
    subscribe,
    usubscribe,
    changeThemeMode,
  }
}
```

## Usage example

Our code is pure JavaScript, and you can use it anywhere. I'll demonstrate an example in React, but feel free to try it in any framework or library you enjoy.

```js
// Create a theme store from saved theme mode
// or use `system` if user hasn't changed preferences
const store = createThemeStore({
  defaultMode: localStorage.getItem("theme") || "system",
});

function MyComponent() {
  // Initial active theme is `null` here, but you could use the actual value
  const [activeTheme, setActiveTheme] = useState(null)

  useEffect(() => {
    // Subscribe to our store changes
    const subscriptionId = store.subscribe((notification) => {
      // Update theme
      setActiveTheme(notification.theme)

      // Save selected theme mode to localStorage
      localStorage.setItem('theme', notification.mode)
    })

    return () => {
      store.usubscribe(subscriptionId)
    }
  }, [])

  return (
    <>
      <p>
        Active theme: <b>{activeTheme}</b>
      </p>
      <p>Change theme to:</p>
      <button onClick={() => store.changeThemeMode("dark")}>Dark</button>
      <button onClick={() => store.changeThemeMode("light")}>Light</button>
      <button onClick={() => store.changeThemeMode("system")}>System</button>
    <>
  )
}
```

## Thank you!

I appreciate that you joined me on this journey, and if you were able to make it work, I'm proud of you! If something doesn't work for you or if you want to find the entire code, you can locate it [here](https://github.com/pavelkeyzik/plk/tree/main/src/modules/theme-mode).
