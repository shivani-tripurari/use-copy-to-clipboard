# 📦use-copy-to-clipboard

A lightweight, dependency-free React hook for copying text to the clipboard with full fallback support.
Works on all modern browsers, mobile devices, and even older fallback-only browsers.

## How to install ?
```
npm install use-copy-to-clipboard-hook
```

## Basic example 
```
import { useState } from "react";
import useCopyToClipboard from "use-copy-to-clipboard-hook"

function App() {

  const {copied, copy} = useCopyToClipboard();
  //local states
  const[text, setText] = useState("");

  //local handlers
  const handleOnChange = (e) => {
    setText(e.target.value);
  }

  return (
    <div className="m-24 flex flex-col">
      <h1 className="my-10 font-bold text-3xl">Try to copy using the button</h1>
      <input
        placeholder="Type something to copy..."
        className="p-3 border border-sky-300 rounded"
        value={text}
        onChange={(e)=>handleOnChange(e)}
      />
      <button
        onClick={()=>copy(text)}
        className="p-1 rounded bg-sky-300 text-white"
      >Copy</button>
      {copied && <>Copied!!! {text}</>}
    </div>
  )
}

export default App

```

## Custom Reset Interval

The default reset time is 2000ms (2 seconds).

You can override it:
```
const{copied, copy} = useCopyToClipboard(5000);
//resets to 5 seconds.
```

## 🤝 Contributing

PRs, issues, and suggestions are welcome!

If you'd like to fix a bug or propose a new feature, feel free to open an issue.
