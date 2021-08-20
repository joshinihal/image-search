import { useRef, useState, useEffect } from "react";

import classes from "./Input.module.css";
import Autocomplete from "./Autocomplete";

const Input = (props) => {
  const inputRef = useRef();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const existingSuggestions = JSON.parse(localStorage.getItem("suggestions"));
    if (existingSuggestions && existingSuggestions.length) {
      setSuggestions(existingSuggestions);
    }
  }, []);

  // show suggestions only if user enters something
  const handleChange = (event) => {
    props.onChangeHandler(event.target.value);
    if (event.target.value.trim() === "") {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    props.onChangeHandler(suggestion);
    inputRef.current.value = suggestion;
  };

  const handleInputBlur = () => {
    // string to array
    let existingSuggestions = JSON.parse(localStorage.getItem("suggestions"));
    const currentInput = inputRef.current.value.trim().toLowerCase();
    if (currentInput) {
      if (!existingSuggestions) {
        existingSuggestions = [];
      }
      existingSuggestions.push(currentInput);
      // remove duplicates
      const newSuggestions = [...new Set([...existingSuggestions])];
      setSuggestions(newSuggestions);
      // array to string
      localStorage.setItem("suggestions", JSON.stringify(newSuggestions));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // hide suggestions on enter
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes["input-container"]}>
        <label className={classes.label} htmlFor={props.id}>
          {props.label}
        </label>
        <div>
          <input
            onBlur={handleInputBlur}
            ref={inputRef}
            onChange={handleChange}
            className={classes["input-box"]}
            type="text"
            id={props.id}
          />
          {showSuggestions && suggestions && suggestions.length ? (
            <Autocomplete
              onSuggestionClick={handleSuggestionClick}
              suggestions={suggestions}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
};

export default Input;
