import React from 'react'
import { connect } from 'react-redux'

function App(props) {
  return <div>Ticket</div>
}

const mapStateToProps = state => {
  return state
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
