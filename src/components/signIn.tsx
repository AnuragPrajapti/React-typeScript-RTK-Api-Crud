import React, { useEffect } from "react";
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { ISignIn, IUserDetails } from "./interFace";
import "./style.css";
import { NavLink } from "react-router-dom";
import { useGetSignInUserMutation } from "../services/createSlice";

export const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));

const SignIn = () => {
  const { heading, submitButton } = useStyles();
  const { register, handleSubmit, reset } = useForm<ISignIn>();
  const [loginData, loginInfo] = useGetSignInUserMutation<IUserDetails>();

  const onSubmit = (data: ISignIn) => {
    loginData(data);
    reset();
  };

  useEffect(() => {
    if (loginInfo?.status === "fulfilled") {
      localStorage.setItem("getToken", JSON.stringify(loginInfo?.data?.token));
    }
  }, [loginInfo]);

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Sign In Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          label="Email"
          fullWidth
          required
          {...register("email")}
        />
        <TextField
          margin="normal"
          label="Password"
          type="password"
          fullWidth
          required
          {...register("password")}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
        >
          Sign Up
        </Button>
        <p>
          Don't Have A Account ..? <NavLink to="/signup">SignUp</NavLink>{" "}
        </p>
        <p>
          user Details ..? <NavLink to="/dashboard">Dashboard</NavLink>{" "}
        </p>
      </form>
    </Container>
  );
};

export default SignIn;