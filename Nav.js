import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Text } from "gestalt";

import "./Nav.css";

class Nav extends React.Component {
  render() {
    if (
      this.props.location.pathname === "/login" ||
      this.props.location.pathname === "/verify"
    ) {
      return null;
    }
    return (
      <nav className="pinapp-nav">
        {this.props.authenticated && (
          <Link to="/">
            <button>
              <Icon
                accessibilityLabel="Home"
                icon="pinterest"
                size="40"
                color={this.props.location.pathname === "/" ? "red" : "gray"}
              />
            </button>
          </Link>
        )}
        {this.props.authenticated && (
          <Link to="/upload-pin">
            <button>
              <Icon
                accessibilityLabel="Upload a pin"
                icon="add-circle"
                size="40"
                color={
                  this.props.location.pathname === "/upload-pin"
                    ? "darkGray"
                    : "gray"
                }
              />
            </button>
          </Link>
        )}
        {this.props.authenticated && (
          <Link to="/profile">
            <button>
              <Icon
                accessibilityLabel="Profile"
                icon="person"
                size="40"
                color={
                  this.props.location.pathname === "/profile"
                    ? "darkGray"
                    : "gray"
                }
              />
            </button>
          </Link>
        )}
        {!this.props.authenticated && (
          <div className="auth-banner">
            <Text bold size="lg" color="white">
              Authenticate to find more ideas.
            </Text>
            <Link to="/login">
              <button style={{ paddingLeft: 24 }}>
                <Icon
                  accessibilityLabel="Authenticate"
                  icon="arrow-circle-forward"
                  size={36}
                  color="white"
                />
              </button>
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

Nav = withRouter(Nav);

export default Nav;
