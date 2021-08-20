import classes from "./Autocomplete.module.css";

const Autocomplete = (props) => {
  return (
    <div className={classes["autocomplete-container"]}>
      {props.suggestions.map((el) => {
        return (
          <li
            onClick={() => props.onSuggestionClick(el)}
            value={el}
            key={el}
            className={classes["suggestion"]}
          >
            {el}
          </li>
        );
      })}
    </div>
  );
};

export default Autocomplete;
