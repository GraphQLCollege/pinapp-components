import React from "react";
import { Route, Link } from "react-router-dom";
import { Icon, Text, Button, TextField, Label, Box } from "gestalt";

import "./LoginPage.css";

class LoginPage extends React.Component {
  state = {
    email: "",
    errorMessage: "",
    done: false,
    loading: false
  };
  render() {
    if (!this.props.match) {
      return null;
    }
    return (
      <div className="login-page">
        <Box
          display="flex"
          direction="column"
          marginBottom={4}
          alignItems="center"
        >
          <Box marginBottom={4}>
            <Link to="/">
              <Icon
                size={120}
                icon="pinterest"
                accessibilityLabel="Pinapp"
                color="red"
              />
            </Link>
          </Box>
          <Text size="xl" bold>
            {this.state.done ? (
              <div>
                <p>{`We sent an email to ${
                  this.state.email
                }. Please check your inbox.`}</p>
                <p>You can close this window now.</p>
              </div>
            ) : (
              "Welcome to Pinapp"
            )}
          </Text>
        </Box>
        {!this.state.done && (
          <form
            onSubmit={event => {
              event.preventDefault();
              if (!this.state.email) {
                this.setState({ errorMessage: "Please enter your email" });
                return;
              }
              this.setState({ loading: true });
              this.props
                .authenticate(this.state.email)
                .then(() => this.setState({ done: true, loading: false }))
                .catch(() => this.setState({ loading: false }));
            }}
          >
            <Box marginBottom={4}>
              <Label htmlFor="email">Email</Label>
              <TextField
                id="email"
                type="email"
                placeholder="Please enter your email"
                value={this.state.email}
                onChange={event => {
                  this.setState({ email: event.value });
                }}
                errorMessage={this.state.errorMessage}
              />
            </Box>
            <Button
              disabled={this.state.loading}
              color="red"
              text="Login"
              type="submit"
            />
          </form>
        )}
      </div>
    );
  }
}

export default props => (
  <Route exact path="/login">
    {routerProps => <LoginPage {...props} {...routerProps} />}
  </Route>
);
