import React, { Component, Fragment } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

const styles = {
  backgroundColor: "pink",
  listStyle: "none",
  margin: "5px",
  color: "gray"
};

class Users extends Component {
  getUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(results => results.json())
      .then(data => {
        console.log(data);
        this.props.setUsers(data);
      });
  };
  render() {
    return (
      <Fragment>
        <div>
          <h3>Press the button to get users and display them below</h3>
          <Button onClick={this.getUsers} variant="contained" color="primary">
            Get Users
          </Button>
        </div>
        <div className="users-block">
          {this.props.users.map(user => (
            <form key={user.id}>
              <ul className="square-box" style={styles}>
                <li>name: {user.name}</li>
                <li>username: {user.username}</li>
                <li>email: {user.email}</li>
                <li>website: {user.website}</li>
              </ul>
            </form>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsers: displayUsers =>
      dispatch({
        type: "SET_USERS",
        value: displayUsers
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
