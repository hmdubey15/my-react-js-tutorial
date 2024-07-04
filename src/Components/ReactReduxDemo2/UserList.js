import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "./UserListReducer/userListAction";

const UserList = props => {
  const { usersDataState, fetchUsersList } = props;
  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);
  return usersDataState.loading ? (
    <h2>LOADING...</h2>
  ) : usersDataState.error ? (
    <h2>ERROR: {usersDataState.error}</h2>
  ) : (
    <h2>SUCCESS: {usersDataState.users.length}</h2>
  );
};

const mapStateToProps = (state) => ({
  usersDataState: state.usersList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsersList: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
