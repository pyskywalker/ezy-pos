import React from "react";
import {
  Box,
  TextField as MuiTextField,
  Typography,
  InputAdornment,
} from "@mui/material";

class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();

    this.state = {
      value: props.defaultValue,
      error: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  _onChange(value, validate = true) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.setState({ value }, () => {
      if (validate) {
        this.validate();
      }
    });
  }

  validate() {
    let rules = this.props.rules || [],
      i = 0;
    if (this.props.required) {
      rules.unshift((value) => !!value || "This field is required.");
    }

    for (; i < rules.length; i++) {
      let validate = rules[i](this.state.value);
      if (validate !== true) {
        this.setState({ error: validate });
        return false;
      } else {
        this.setState({ error: undefined });
      }
    }

    return true;
  }

  setValue(value, validate = false) {
    this.input.value = value;
    this._onChange(value, validate);
  }
  _getEndStartIcon() {
    let icons = {};
    if (this.props.endIcon) {
      icons = {
        ...icons,
        endAdornment: (
          <InputAdornment position="end">{this.props.endIcon}</InputAdornment>
        ),
      };
    }
    if (this.props.startIcon) {
      icons = {
        ...icons,
        startAdornment: (
          <InputAdornment position="start">{this.props.endIcon}</InputAdornment>
        ),
      };
    }
    return icons;
  }

  render() {
    const { containerProps, label, required, endIcon, ...rest } = this.props;
    return (
      <Box component="div" {...containerProps}>
        {label ? (
          <Typography
            sx={{
              marginLeft: "4px",
              marginBottom: "4px",
            }}>
            {label}
            {required ? (
              <Box
                component="span"
                color={(theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.error.light
                    : theme.palette.error.dark
                }
                ml="2px">
                *
              </Box>
            ) : null}
          </Typography>
        ) : null}
        <MuiTextField
          inputRef={(ref) => (this.input = ref)}
          variant="outlined"
          size="small"
          margin="none"
          autoComplete="off"
          {...rest}
          error={!!this.state.error}
          InputProps={this._getEndStartIcon()}
          helperText={this.state.error}
          onChange={(event) => this._onChange(event.target.value, true)}
        />
      </Box>
    );
  }
}

export default TextField;
