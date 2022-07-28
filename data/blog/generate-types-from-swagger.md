---
title: 'Generate TypeScript types from Swagger (OpenAPI 3)'
date: '2020-08-27'
tags: ['React', 'Testing']
draft: false
summary: "In this article, I'd like to share some code that helped me a lot to work with an API that had been changed often"
authors: ['default']
---

![Post cover](/static/images/generate-types-from-swagger/cover.jpg)

<p>
  Image by [Pavel Keyzik](https://twitter.com/pavelkeyzik)
</p>

Hi! I'd like to share some code that helped me a lot to work with an API that had been changed often.

## Idea

The idea is to generate TypeScript types from Swagger's definition. I found an awesome npm library called [@codegena/oapi3ts-cli](https://www.npmjs.com/package/@codegena/oapi3ts-cli). To use this you need to store JSON file with API schema locally.

Let's move to code...

## Install dependencies

I used `axios` to fetch data. You can use anything you want.

```shell
npm i -D @codegena/oapi3ts-cli axios
```

## Create folders and files that we need

Now let's create the `scripts/` folder in the root of your project and add two files (`fetch-schema.js` and `schema-codegen.js`) inside of the created folder. Also, we need to create `src/typings/` folder where we're gonna save our types and API schema.

```js
// scripts/schema-codegen.js

const cliLib = require('@codegena/oapi3ts-cli')
const cliApp = new cliLib.CliApplication()

cliApp.cliConfig.typingsDirectory = ''
cliApp.createTypings()
```

```js
// scripts/fetch-schema.js

const axios = require('axios')
const https = require('https')
const fs = require('fs')
const path = require('path')

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

/* The code below will create operation names.
Instead of `/api/User/GetList` you'll get `UserGetList` type
that you can use anywhere */

function addOperationIdsToSchema(schema) {
  const data = schema

  Object.keys(data.paths).forEach((endpointPath) => {
    const operations = Object.keys(data.paths[endpointPath])

    operations.forEach((operation) => {
      const oprationName = endpointPath.replace('/api/', '').replace(/\//g, '')
      data.paths[endpointPath][operation].operationId = oprationName
    })
  })

  return data
}

instance
  .get('https://YOUR_ENDPOINT_TO_SWAGGER/swagger.json')
  .then((response) => {
    const updatedSchema = addOperationIdsToSchema(response.data)
    fs.writeFileSync(
      path.resolve(__dirname, '../src/typings/api-schema.json'),
      JSON.stringify(updatedSchema, null, 2)
    )

    console.log('==> Schema fetched successfully...')
  })
  .catch(console.error)
```

## Update package.json

And one of the last things you need to do is add to `package.json` these lines:

```json
{
    ...
    "scripts": {
        ...
        "schema:fetch": "node ./scripts/fetch-schema.js",
        "schema:generate": "node ./scripts/schema-codegen.js --srcPath ./src/typings/api-schema.json --destPath ./src/typings/api --separatedFiles false",
        "schema:codegen": "npm run schema:fetch && npm run schema:generate:api"
    }
}
```

## Now you can generate your API schema with this command:

```shell
npm run schema:codegen
```

This command generated `src/typings/api/` folder with TypeScript definitions.

If you got into some problems, please, let me know to be able to update the article for future readers.
