import React, { useState, useContext, useEffect } from "react";
import { Route } from "react-router-dom";
// Material UI
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//

import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = props => {
  const classes = useStyles();

  // init context
  const authContext = useContext(AuthContext);

  // Get global states
  const {
    loadUser,
    headers,
    login,
    error,
    clearErrors,
    isAuthenticated
  } = authContext;

  // Our local states here
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  // componentDidMount
  useEffect(() => {
    if (isAuthenticated) {
      // console.log("run");
      // loadUser({ user, headers }); // eslint-disable-next-line react/prop-types
      props.history.push("/");
    }
    if (error === "Invalid Credentials") {
      clearErrors();
    }
    return () => {};
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;

  // set email and pass from input
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      // eslint-disable-next-line no-console
      console.log("Email/Password not filled");
    } else {
      login({ user, headers });
    }
  };

  return (
    <Route>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              // email
              name="email"
              value={email}
              onChange={onChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // password
              name="password"
              value={password}
              onChange={onChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="google.com" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="google.com" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Route>
  );
};

SignIn.propTypes = {};
export default SignIn;
