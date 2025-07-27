import { notifications } from "@mantine/notifications";

export const handle_errors = (response) => {
  const first_error = response.data.errors[0];
  const detail = response.type === "validation_error"
    ? handle_validation_error(first_error)
    : first_error.detail;


  notifications.show({
    autoClose: 5000,
    color: 'red',
    title: "Request failed",
    position: "top-right",
    message: detail,
  });
};

export const handle_validation_error = (error) => {
  return `${error.attr}: ${error.detail}`;
};
