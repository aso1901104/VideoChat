import React from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from '../../actions/authen'

const RequireAuthWrapper = WrapperedComponent => {
  const Component = () => class extends React.Component {
    constructor (props) {
      super(props)
    }

    componentWillMount () {
      this.props.currentUser === null && this.props.history.push('/login')
    }

    render () {
      return (
        <WrapperedComponent {...this.props} />
      )
    }
  }
  return connect(mapStateToProps, null)(Component())
}
const mapStateToProps = state => {
  return {
    currentUser: state.authen.currentUser
  }
}
export default RequireAuthWrapper
