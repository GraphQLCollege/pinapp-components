import React from "react";
import { Route } from "react-router-dom";
import { Text, Button, Box } from "gestalt";

import "./ProfilePage.css";

class ProfilePage extends React.Component {
  componentDidMount() {
    if (this.props.match && !this.props.authenticated) {
      this.props.history.push("/");
    }
  }
  render() {
    if (!this.props.match || !this.props.authenticated) {
      return null;
    }
    return (
      <div className="profile-page">
        <Box marginBottom={6}>
          <Text bold>{this.props.user ? this.props.user.email : "Oops! We could not find your email"}</Text>
        </Box>
        <Button
          accesibilityLabel="Logout"
          inline
          text="Logout"
          onClick={() => {
            this.props.logout();
            this.props.history.push("/");
          }}
        />
      </div>
    );
  }
}

export default props => (
  <Route exact path="/profile">
    {routerProps => <ProfilePage {...props} {...routerProps} />}
  </Route>
);
