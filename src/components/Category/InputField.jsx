import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

function InputField(props) {
  return (
    <FormControl component='fieldset'>
      <FormControlLabel
        value={props.value}
        control={props.control}
        label={props.label}
      />
    </FormControl>
  );
}
export default InputField;
