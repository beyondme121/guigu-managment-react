import { connect } from 'react-redux'
import Users from '../compnents/users'
import { addUser } from '../redux/actions/user-action'

export default connect(
  state => ({ users: state.users }),
  { addUser }
)(Users)