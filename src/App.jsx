import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowNumber) {
      str += "0123456789";
    }
    if (allowChar) {
      str += "@#&(){}.%!$";
    }
    for (let i = 1; i <= length; i++) {
      let pstn = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(pstn);
    }
    setPassword(pass);
  }, [length, allowNumber, allowChar, setPassword]);

  // const copyPasswordtoClipboard = useCallback(() => {
  //   // passwordRef.current?.select()
  //   alert("Password copied to clipboard");
  //   window.navigator.clipboard.writeText(password);
  //   //create a top popup alert to that password copied

  // }, [password]);
  const copyPasswordtoClipboard = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    passwordGenerator();
  }, [length, allowNumber, allowChar, passwordGenerator]);

  return (
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 my-8 text-purple-500 bg-gray-700">
      <h1 className="text-4xl text-center text-white">Password Generator</h1>
      <div className="flex rounded-lg overflow-hidden p-2 gap-1">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 mb-5 rounded-lg"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordtoClipboard()} className="text-white outline-none bg-blue-700 w-20  px-0.3 mb-5 rounded-lg shrink-0">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1 mb-4">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1 mb-4">
          <input
            type="checkbox"
            defaultChecked={allowNumber}
            id="numberInput"
            onChange={() => {
              setAllowNumber((prev) => !prev);
            }}
          />
          <label htmlFor="">Number</label>
        </div>
        <div className="flex items-center gap-x-1 mb-4">
          <input
            type="checkbox"
            defaultChecked={allowChar}
            id="charInput"
            onChange={() => {
              setAllowChar((prev) => !prev);
            }}
          />
          <label htmlFor="">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
