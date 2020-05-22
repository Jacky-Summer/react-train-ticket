import React from 'react'
import { connect } from 'react-redux'

function App(props) {
  return <div>App</div>
}

const mapStateToProps = state => {}
const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
