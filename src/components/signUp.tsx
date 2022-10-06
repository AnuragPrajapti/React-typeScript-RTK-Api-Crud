import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFromInput } from "./interFace";
import { useGetSignUpUserMutation } from "../services/createSlice";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));

const schema = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required().min(5).max(25),
  password: yup.string().required().min(6).max(12),
});

const SignUpForm = () => {
  const { heading, submitButton } = useStyles();
  const [postData, responseInfo] = useGetSignUpUserMutation();
  const { register, handleSubmit, reset } = useForm<IFromInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFromInput) => {
    postData(data);
    reset();
  };

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Sign Up Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          label="Email"
          fullWidth
          required
          {...register("email")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Full Name"
          fullWidth
          required
          {...register("name")}
        />
        <TextField
          variant="outlined"
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
          Don't Have A Account ..? <NavLink to="/">SignIn</NavLink>{" "}
        </p>
      </form>
    </Container>
  );
};

export default SignUpForm;
