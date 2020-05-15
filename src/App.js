import React, { Component, lazy, Suspense } from 'react'

const OtherComponent = lazy(() => import('./Other'))

class App extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<div>Loading</div>}>
          <OtherComponent />
        </Suspense>
      </div>
    )
  }
}
export default App
