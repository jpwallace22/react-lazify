# **React Lazify** <image src="https://raw.githubusercontent.com/jpwallace22/react-lazify/main/src/assets/react-lazy.png" width="50px">

![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/jpwallace22.react-lazify?color=007173)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/jpwallace22.react-lazify?color=007173)
![Visual Studio Marketplace Last Updated](https://img.shields.io/visual-studio-marketplace/last-updated/jpwallace22.react-lazify?color=007173)
![Codecov](https://img.shields.io/codecov/c/github/jpwallace22/react-lazify?color=007173)
![GitHub top language](https://img.shields.io/github/languages/top/jpwallace22/react-lazify?color=007173)

For the sake of being lazy, I will only show the default key commands for Mac in this README. However, if you are using a Windows or Linux machine then note:

| Key   | Mac         | Windows | Linux |
| ----- | ----------- | ------- | ----- |
| `cmd` | Command (⌘) | Windows | Super |

## **Features**

Will change any selected default import into a Lazy import. Supports React lazy imports, Next dynamic imports, and Loadable loadable imports.

To use the extension:

- Select the component you wish to change to a lazy import
  - Supports selections with multiple cursors and highlighting (will ignore non-default imports)
- Use the keyboard shortcut `ctrl+opt+cmd+L` to make it lazy
  - If you hate the keybinding. Feel free to change it to whatever you want.
- You can also use the command palette (`shift+cmd+P`) and select Lazify

<br>

![Demo](https://raw.githubusercontent.com/jpwallace22/react-lazify/main/src/assets/new_demo.gif)

<br>

Since this is all about being **lazy** you can also convert your imports straight from your JSX. Same instructions from above. But in the JSX.

- Select the component you wish to covert
- Supports selections with multiple cursors and highlighting (will STILL ignore non-default imports)
- Use the keyboard shortcut `ctrl+opt+cmd+L` to make it lazy

<br>

![Demo](https://raw.githubusercontent.com/jpwallace22/react-lazify/main/src/assets/jsx_demo.gif)

<br>

## **Extension Settings**

- Default keyboard shortcut — `ctrl+opt+cmd+L`

### Optional Settings

```ts
// settings.json

 /**
 * If true, all imports will use React.lazy() instead of lazy()
 * @default false
 */
"lazify.imports.useDefaultReactImport": boolean;

 /**
 * Lazify will use the lazy import from whichever framework you specify
 * @default 'react'
 */
"lazify.imports.frameworkSource": 'react' | 'next' | 'loadable',
```

## **Requirements**

- Lightweight and dependency free.
- Tested on Linux, Mac, and Windows OS
- Only works in `.jsx` and `.tsx` files. (But I couldn't imagine why you would need it in any other type of file.)

## **Known Issues**

No known issues at this time, though I'm sure there will be plenty to come. If you want to help, **PLEASE** report any issues or feature requests [on Github](https://github.com/jpwallace22/react-lazify/issues)

## **Release Notes**

Check out the [Change Log](CHANGELOG.md)

<br>

# **Contributors**

### Author

<a href="https://github.com/jpwallace22" style="display: inline-block; text-align: center;">
   <img src="https://avatars.githubusercontent.com/u/93415734?v=4" width="150;" style="border-radius: 50%;" alt="jpwallace22"/>
   <br />
   <small><b>Justin Wallace</b></small>
</a>
