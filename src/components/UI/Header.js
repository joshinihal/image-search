import React from "react";
import classes from "./Header.module.css";
import Input from "./Input";

const Header = (props) => {


  const handleChange = (searchValue) => {
    props.onSearchChangeHandler(searchValue);
  };

  return (
    <React.Fragment>
      <header className={classes["header-container"]}>
        <div className={classes["header-div"]}>
          <div className={classes.logo}>
            <h2>FLICKR SEARCH</h2>
          </div>
          <div>
           <Input onChangeHandler={handleChange} label='SEARCH' id='search'></Input>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
