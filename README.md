# React Lazify <image src="https://raw.githubusercontent.com/jpwallace22/react-lazify/main/src/assets/react-lazy.png" width="50px">

## Features

Will change any selected default import into a React Lazy import. Is this really hard to do? No.. however I wanted to learn how to make an extension and I was tired of writing out lazy imports.

To use the extension:

- Select the component you wish to change to a lazy import
- Use the keyboard shortcut `ctrl+opt+cmd+L` to make it lazy
  - If you hate the keybinding. Feel free to change it to whatever you want.
- You can also use the command palette (`shift+cmd+P`) and select Lazify

<br>

![Demo](https://raw.githubusercontent.com/jpwallace22/react-lazify/main/src/assets/demo.gif)

<br>

## Extension Settings

Default keyboard shortcut — `ctrl+opt+cmd+L`

All settings can be set in `settings.json`

```json
// If true, all imports will use React.lazy() instead of lazy()
"lazify.imports.useDefaultReactImport": boolean;
```

<br>

## Requirements

Very lightweight and dependency free.

Only works in `.jsx` and `.tsx` files. But I couldn't imagine why you would need it in any other type of file.

<br>

## Known Issues

This is an alpha release.. There will be plenty of issues to come. If you want to help, please report them [here](https://github.com/jpwallace22/react-lazify/issues) on Github

<br>

## Release Notes

Check out the [Change Log](CHANGELOG.md)
