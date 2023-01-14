# Flashcard New Tab

> In development to maintain all the features.

## How it works?

Extension replaces a new tab in the browser. Each time you open the browser/new tab, you will see a new random card.

## Features

- No permissions
- No analytics
- No frameworks (pure js)
- Local data storage (IndexedDB)
- Open-Source

## Screenshots

<table>
  <tr>
    <td>
      <a href="https://raw.githubusercontent.com/oleksiikhr/flashcard-new-tab/main/docs/images/home-light.png" title="Home page - light theme">
        <img src="https://raw.githubusercontent.com/oleksiikhr/flashcard-new-tab/main/docs/images/home-light.png" width="250" alt="Home page - Light theme">
      </a>
      <a href="https://raw.githubusercontent.com/oleksiikhr/flashcard-new-tab/main/docs/images/home-dark.png" title="Home page - dark theme">
        <img src="https://raw.githubusercontent.com/oleksiikhr/flashcard-new-tab/main/docs/images/home-dark.png" width="250" alt="Home page - dark theme">
      </a>
    </td>
  </tr>
</table>

## Contribution

**Install via docker**

```shell
# Set up and run the project
$ make up

# Run linters
$ make lint
$ make eslint
$ make prettier
$ make stylelint

# Run tests
$ make tests

# View docker logs
$ make logs

## Stop project
$ make down
```

**Local install**

Install [pnpm](https://pnpm.io/).

```shell
# Install packages
$ pnpm i --frozen-lockfile

# Run project
$ pnpm dev

# Run linters
$ pnpm lint:fix
$ pnpm eslint:fix
$ pnpm prettier:fix
$ pnpm stylelint:fix

# Run tests
$ pnpm test
```

**Install extension**

Load unpacked from path `src/app/public`.

## License

[MIT](https://opensource.org/licenses/MIT)
