import React from "react";

import Container from "./Container";
import Nav from "./Nav";
import PinListPage from "./PinListPage";
import AddPinPage from "./AddPinPage";
import LoginPage from "./LoginPage";
import VerifyPage from "./VerifyPage";
import ProfilePage from "./ProfilePage";

export class App extends React.Component {
  render() {
    return (
      <Container noRouter={this.props.noRouter}>
        <PinListPage pins={this.props.pins} />
        <AddPinPage
          authenticated={this.props.authenticated}
          addPin={this.props.addPin}
        />
        <LoginPage authenticate={this.props.authenticate} />
        <VerifyPage verify={this.props.verify} onToken={this.props.onToken} />
        <ProfilePage
          user={this.props.user}
          authenticated={this.props.authenticated}
          logout={this.props.logout}
        />
        <Nav authenticated={this.props.authenticated} />
      </Container>
    );
  }
}

App.defaultProps = {
  authenticate: () => Promise.resolve({}),
  verify: () => Promise.resolve({}),
  onToken: () => Promise.resolve({}),
  logout: () => Promise.resolve({})
};
