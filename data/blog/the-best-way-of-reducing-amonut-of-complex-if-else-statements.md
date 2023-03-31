---
title: 'The Best Way of Reducing Amount of Complex if-else Statements'
date: '2023-03-31'
tags: ['Improvements', 'JavaScript']
draft: false
summary: 'The article describes a really simple and powerfull way of handling multiple statements without using if-else conditions'
authors: ['default']
images: ['/static/images/the-best-way-of-reducing-amount-of-complex-if-else-statements/cover.jpg']
---

![Post cover](/static/images/the-best-way-of-reducing-amount-of-complex-if-else-statements/cover.jpg)

<p>
  Image by [Christopher Robin Ebbinghaus](https://unsplash.com/@cebbinghaus)
</p>
  
## The problem

Have you ever had a really large `if-else` statement, with many variables, just to cover all cases. Let's say you have some message you want to show to the user, based on many inputs. How would you implement it? Probably, you'll start with `if-else` statement, trying to cover as many cases as possible. It's totally fine, until you have too many inputs.

Every new input will increase the amount of cases progressively. For example, when you have 2 variables, it's just 4 cases, but when it's 3 variables, then you have 8 possible cases.

## Possible situation

Now, imagine we build a website to order food and your restaurant provides delivery or pickup. You go to the website and see "At the moment, we have delivery issues, but you can order pickup instead".

Here's the list of possible input variables:

- do we have delivery?
- is delivery available today?
- is delivery open now?
- can I order for later?

Can you guess how large your `if-else` statement will be? It's huge! And it'll be quite hard to cover everything. What if we have delivery, but pickup is not available for today? What if we have some issues with delivery and pickup will be open in an hour? The amount of possible situations is `2^4=16` and it'll be impossible to maintain when number of inputs grows. But don't worry! The solution will blow your mind! At least that's what happened to me 🤪

## The solution

The idea of that solution is so simple. You need to build a table of truths (all possible variants) and based on that table, each row will have a unique key that you can use as "status code". In the table below, I convert boolean values to 1 (true) and 0 (false). That way for each case we'll have a unique combination of 1 and 0 that will be our unique key, like`1101`, and we could always convert this binary number to decimal number. For example, `1101` becomes `13`, and that's why you'll see normal numbers in the status code column.

| Status code | Do we have delivery? | Is delivery available today? | Is delivery open now? | Can I order for later? |
| ----------- | -------------------- | ---------------------------- | --------------------- | ---------------------- |
| 0           | 0                    | 0                            | 0                     | 0                      |
| 1           | 0                    | 0                            | 0                     | 1                      |
| 2           | 0                    | 0                            | 1                     | 0                      |
| 3           | 0                    | 0                            | 1                     | 1                      |
| 4           | 0                    | 1                            | 0                     | 0                      |
| 5           | 0                    | 1                            | 0                     | 1                      |
| 6           | 0                    | 1                            | 1                     | 0                      |
| 7           | 0                    | 1                            | 1                     | 1                      |
| 8           | 1                    | 0                            | 0                     | 0                      |
| 9           | 1                    | 0                            | 0                     | 1                      |
| 10          | 1                    | 0                            | 1                     | 0                      |
| 11          | 1                    | 0                            | 1                     | 1                      |
| 12          | 1                    | 1                            | 0                     | 0                      |
| 13          | 1                    | 1                            | 0                     | 1                      |
| 14          | 1                    | 1                            | 1                     | 0                      |
| 15          | 1                    | 1                            | 1                     | 1                      |

Now what? That's the beauty of that solution, it's all. You just need to return status code and map this code to any message you want. Check code examples section, to see the implementation.

## Code examples

In this section, I'll provide a code you need to write to do this. It's in JavaScript, but it could be written in any language.

```js
// Restaurant configuration, all our input variables are stored here
const restaurantConfiguration = {
  haveDelivery: true,
  deliveryAvailableToday: true,
  deliveryOpenNow: false,
  canOrderForLater: true,
}

// This function takes configuration and converts all `true` and `false` values to status code
function getStatusCode(restaurantConfiguration) {
  const { haveDelivery, deliveryAvailableToday, deliveryOpenNow, canOrderForLater } =
    restaurantConfiguration

  // Note: don't change the order, or if you need to add more variables,
  // add them to the beginning of the array.
  // That way you won't break old status codes
  const binaryNumberArray = [
    haveDelivery,
    deliveryAvailableToday,
    deliveryOpenNow,
    canOrderForLater,
  ].map((isTrue) => (isTrue ? '1' : '0')) // [true, true, false, true] => ['1', '1', '0', '1']

  const binaryNumber = binaryNumberArray.join('') // '1101'
  const statusCode = parseInt(binaryNumber, 2) // Converts '1101' to 13

  return statusCode
}

// This is your mapping between message and status code
function buildMessagesTable() {
  return {
    0: null,
    // ... cover any status code you need
    13: 'Delivery is available today, but it is not open yet, so you could order for later',
  }
}

function main() {
  // Get status code
  const statusCode = getStatusCode(restaurantConfiguration)

  // Get a table with messages by status code
  const messagesTable = buildMessagesTable()

  // Get message by status code
  const message = messagesTable[statusCode] || null

  if (message) {
    console.log(message)
  }
}

main()
```

## Summary

The only thing I want to mention about this solution is that it works great, especially when you have a bunch of inputs and when you need to cover a new case, you don't need to think about `if-else` statement just to cover your case, you find out the status code and add one line with the message you need. Less code, fewer bugs 💪

Did you like the article? Share it with your friends. I'd appreciate that 🙏
