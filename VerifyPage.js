import React from "react";
import { Route, Link } from "react-router-dom";
import { Text, Box, Button } from "gestalt";
import qs from "query-string";

class VerifyPage extends React.Component {
  state = {
    status: "verifying"
  };
  componentDidMount() {
    if (this.props.match) {
      const query = qs.parse(this.props.location.search);
      this.props
        .verify(query.token)
        .then(() => {
          this.setState({ status: "success" });
          setTimeout(() => this.props.history.push("/"), 1000);
        })
        .catch(() => {
          this.setState({ status: "failure" });
        });
    }
  }
  render() {
    if (!this.props.match) {
      return null;
    }
    return (
      <div className="verify-page">
        <Box
          height="90vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {this.state.status === "verifying" && (
            <Text size="xl">Verifying...</Text>
          )}
          {this.state.status === "success" && <Text size="xl">Success!</Text>}
          {this.state.status === "failure" && (
            <Box>
              <Box marginBottom={4}>
                <Text size="xl">Email verification failed</Text>
              </Box>
              <Link to="/login">
                <Button color="red" text="Login again" />
              </Link>
            </Box>
          )}
        </Box>
      </div>
    );
  }
}

export default props => (
  <Route exact path="/verify">
    {routerProps => <VerifyPage {...props} {...routerProps} />}
  </Route>
);
