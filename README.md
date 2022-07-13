# XataConf

This project contains the XataConf website code and registration system

## Overview

This is a Next.js app that uses [Xata](https://xata.io) as the data store. It is a web application, with a login system and a registration system powered by [next-auth](https://next-auth.js.org/). We use the [next-auth Xata adapter here](https://github.com/nextauthjs/next-auth/pull/4911), and exclusively the [Xata SDK](https://github.com/xataio/client-ts/tree/main/packages/client) to work with data.

This project is bootstrapped with the Xata [CLI](https://github.com/xataio/client-ts/tree/main/cli) and uses code generation.

## Contributing

To contribute to this project, fork it and open a Pull Request. We'll be nice, promise.

To help you get started, here are some things to be aware of:

1. This project uses `yarn`, so please use `yarn` to install dependencies and such.
2. To get started, run `yarn` to install dependencies after cloning this repo.
3. Ask someone for the `.env` values and copy `.env.local.example` to `.env` and fill them in.
4. Get your local development server started with `yarn next dev`.

Made with ❤️.
