import React from "react"

const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  FINISHED_LOADING: "finished_loading",
  AUTHENTICATED: "authenticated"
}

class LoadingChecker extends React.Component {
  render() {
    return (
      <div className="loading">
        {this.props.status !== STATUS.AUTHENTICATED && (
          <div style={{ position: "absolute" }}>
          </div>
        )}
        <div style={{ position: "absolute" }}>/>
        </div>
      </div>
    )
  }
}

export default LoadingChecker
