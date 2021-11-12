## Development set up

Run `make install`

## Development

See `./Makefile`.

## Build and use

Complete [development set up](#development-set-up) steps, and then run `make build-for-chrome`. This should generate the `dist/clic-to-clipboard.crx` extension file.

To load the extension in Chrome:

1. In Chrome, navigate to `chrome://extensions`.
2. On the top right, ensure to have the _Developer mode_ enabled.
3. Click and drag the `dist/clic-to-clipboard.crx` file into the page.
4. Click _Add extension_.
5. Enjoy!
