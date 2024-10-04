export const formatError = (errorBody) => {
  let statusCode = errorBody.response
    ? parseInt(errorBody.response.status)
    : 500;
  switch (statusCode) {
    case 401: // auth errors
    case 403:
      {
        let data = errorBody.response.data;
        if (data.error) {
          return data.error;
        }
      }
      break;
    case 404:
      return "The requested resource was not found.";
      break;
    case 422:
      {
        // validation errors
        let data = errorBody.response.data;
        if (data.error) {
          return data.error;
        } else {
          let errors = [];
          Object.keys(data).forEach((e, i) => errors.push(data[e][0]));
          return errors.join("\n");
        }
      }
      break;
    default:
      return "Something went wrong.";
      break;
  }
};

export const reportErrors = (alert, errorBody) => {
  let statusCode = errorBody.response
    ? parseInt(errorBody.response.status)
    : 500;
  switch (statusCode) {
    case 401: // auth errors
    case 403:
      {
        let data = errorBody.response.data;
        if (data.error) {
          alert && alert.showError(data.error);
        }
      }
      break;
    case 404:
      alert && alert.showError("The requested resource was not found.");
      break;
    case 422:
      {
        // validation errors
        let data = errorBody.response.data;
        if (data.error) {
          alert && alert.showError(data.error);
        } else {
          let errors = [];
          Object.keys(data).forEach((e, i) => errors.push(data[e][0]));
          alert && alert.showError(errors.join("\n"));
        }
      }
      break;
    default:
      alert && alert.showError("Something went wrong.");
      break;
  }
};

export const numberFormat = (number) => {
  let parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const getValidationRules = () => {
  return {
    required: (value) => {
      if (typeof value === "string") {
        value = value.trim();
      }

      return !!value || "This field is required.";
    },
    startsWithWordChar: (value) => {
      return /^\w+/.test(value) || "Invalid value.";
    },
    integer: (value) => {
      return /^-?\d+$/.test(value) || "Invalid integer.";
    },
    optionalInteger: (value) => {
      return !value || (value && /^-?\d+$/.test(value)) || "Invalid integer.";
    },
    number: (value) => {
      return /^-?\d*\.?\d+$/.test(value) || "Invalid number.";
    },
    optionalNumber: (value) => {
      return (
        !value || (value && /^-?\d*\.?\d+$/.test(value)) || "Invalid number."
      );
    },
    phone: (value) => {
      return /^0\d{9}$/.test(value) || "Invalid phone.";
    },
    optionalPhone: (value) => {
      return !value || (value && /^0\d{9}$/.test(value)) || "Invalid phone.";
    },
  };
};
