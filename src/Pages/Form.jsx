import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const regEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


export default function Form() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    role: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm( {
    defaultValues: user,
    mode: "onChange",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ my: "10px" }}>
        Add User
      </Typography>
      <Box
        sx={{
          width: "90%",
          margin: "10px auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
        noValidate
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction="row" spacing={5} sx={{ width: "100%" }}>
          <TextField
            label="First Name"
            variant="filled"
            sx={{ flex: 1 }}
            error={!!errors.firstName}
            helperText={!!errors.firstName && "This field is required & minimum 2 characters"}
            {...register("firstName", {
              required: true,
              pattern: /^[A-Za-z]+$/,
              minLength: 2,
            })}
            onChange={handleChange}
          />

          <TextField
            label="Last Name"
            variant="filled"
            sx={{ flex: 1 }}
            error={!!errors.lastName}
            helperText={!!errors.lastName && "This field is required & minimum 2 characters"}
            {...register("lastName", {
              required: true,
              pattern: /^[A-Za-z]+$/,
              minLength: 2,
            })}
            onChange={handleChange}
          />
        </Stack>

        <Stack direction="column" spacing={3} sx={{ width: "100%", mt: 2 }}>
          <TextField
            label="Email"
            variant="filled"
            error={!!errors.email}
            helperText={ !!errors.email && `${errors.email.message}` }
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: regEmail,
                message: "Invalid email format",
              },
            })}
            onChange={handleChange}
          />

          <TextField
            label="Phone Number"
            variant="filled"
            error={!!errors.phone}
            helperText={!!errors.phone && `${errors.phone.message}`}
            {...register("phone", {
              required: true,
              pattern: phoneRegExp,
              minLength: 11,
            })}
            onChange={handleChange}
          />

          <TextField
            label="Address 1"
            variant="filled"
            error={!!errors.address1}
            helperText={!!errors.address1 && "This field is required"}
            {...register("address1", {
              required: true,
              pattern: /^[A-Za-z0-9 ]+$/,
            })}
            onChange={handleChange}
          />

          <TextField
            label="Address 2"
            variant="filled"
            {...register("address2", {
              pattern: /^[A-Za-z0-9 ]+$/,
            })}
            onChange={handleChange}
          />

          {/* Role with Controller */}
          <InputLabel id="role-label">Role</InputLabel>
          <Controller
            name="role"
            control={control}
            rules={{ required: "This field is required"  }}
            render={({ field }) => (
              <Select
                labelId="role-label"
                variant="filled"
                {...field}
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"User"}>User</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
              </Select>
            )}
          />
        </Stack>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            type="submit"
            sx={{
              backgroundColor: theme.palette.primary.dark,
              p: "7px 20px",
              mt: "20px",
              color: "white",
            }}
          >
            Create User
          </Button>
          <Snackbar
            open={open}
            message="User Created Successfully"
            autoHideDuration={2000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        </div>
      </Box>
    </div>
  );
}
