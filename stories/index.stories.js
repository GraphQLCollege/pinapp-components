import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { MemoryRouter } from "react-router-dom";

import {
  Container,
  PinListPage,
  AddPinPage,
  LoginPage,
  VerifyPage,
  ProfilePage,
  Nav
} from "../";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      pins: props.pins || [],
      authenticated: props.authenticated || false
    };
  }
  render() {
    return (
      <Container noRouter={this.props.noRouter}>
        <PinListPage pins={this.state.pins} />
        <AddPinPage
          authenticated={this.state.authenticated}
          addPin={pin => {
            this.setState(({ pins }) => ({ pins: pins.concat([pin]) }));
          }}
        />
        <LoginPage authenticate={this.props.authenticate} />
        <VerifyPage
          verify={() =>
            this.props
              .verify()
              .then(token => this.setState({ authenticated: true }))
          }
        />
        <ProfilePage
          user={this.props.user}
          authenticated={this.state.authenticated}
          logout={this.props.logout}
        />
        <Nav authenticated={this.state.authenticated} />
      </Container>
    );
  }
}

const pins = [
  {
    title: "Modern",
    link: "https://pinterest.com/pin/637540890973869441/",
    image:
      "https://i.pinimg.com/564x/5a/22/2c/5a222c93833379f00777671442df7cd2.jpg"
  },
  {
    title: "Broadcast Clean Titles",
    link: "https://pinterest.com/pin/487585097141051238/",
    image:
      "https://i.pinimg.com/564x/85/ce/28/85ce286cba63daf522464a7d680795ba.jpg"
  },
  {
    title: "Drawing",
    link: "https://pinterest.com/pin/618611698790230574/",
    image:
      "https://i.pinimg.com/564x/00/7a/2e/007a2ededa8b0ce87e048c60fa6f847b.jpg"
  }
];

storiesOf("1-Login", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/login"]}>{story()}</MemoryRouter>
  ))
  .add("login", () => <App noRouter />);

storiesOf("2-Verify", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/verify?token=12345"]}>
      {story()}
    </MemoryRouter>
  ))
  .add("success", () => (
    <App noRouter verify={() => wait(1000).then(() => "long-lived-token")} />
  ))
  .add("failure", () => (
    <App noRouter verify={() => wait(1000).then(() => Promise.reject())} />
  ));

storiesOf("3-List pins", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("list pins", () => <App pins={pins} noRouter authenticated />)
  .add("guests list pins", () => <App pins={pins} noRouter />)
  .add("no pins", () => <App noRouter authenticated />)
  .add("guests no pins", () => <App noRouter />);

storiesOf("4-Add pin", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/upload-pin"]}>{story()}</MemoryRouter>
  ))
  .add("add pin", () => <App noRouter authenticated />);

storiesOf("5-Profile", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/profile"]}>{story()}</MemoryRouter>
  ))
  .add("authenticated", () => (
    <App noRouter authenticated user={{ email: "name@example.com" }} />
  ))
  .add("authenticated without email", () => <App noRouter authenticated />)
  .add("guest", () => <App noRouter />);

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}
