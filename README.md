# **React Lazify** <image src="https://raw.githubusercontent.com/jpwallace22/react-lazify/main/src/assets/react-lazy.png" width="50px">

## **Features**

Will change any selected default import into a React Lazy import. Is this really hard to do? No.. However, I was tired of writing out lazy imports.

To use the extension:

- Select the component you wish to change to a lazy import
  - Supports selections with multiple cursors and highlighting
- Use the keyboard shortcut `ctrl+opt+cmd+L` to make it lazy
  - If you hate the keybinding. Feel free to change it to whatever you want.
- You can also use the command palette (`shift+cmd+P`) and select Lazify

<br>

![Demo](https://raw.githubusercontent.com/jpwallace22/react-lazify/main/src/assets/new_demo.gif)

<br>

## **Extension Settings**

- Default keyboard shortcut — `ctrl+opt+cmd+L`

### Optional Settings

```ts
// settings.json

 // If true, all imports will use React.lazy() instead of lazy()
"lazify.imports.useDefaultReactImport": boolean; // default = false
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
