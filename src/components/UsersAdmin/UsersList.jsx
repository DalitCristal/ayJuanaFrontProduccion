import PropTypes from "prop-types";
import UserCard from "./UserCard";

const UsersList = ({ users, selectedUsers, onSelect }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          isSelected={selectedUsers.includes(user._id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      rol: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default UsersList;

/* import PropTypes from "prop-types";
import UserCard from "./UserCard";

const UsersList = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      rol: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UsersList;
 */
