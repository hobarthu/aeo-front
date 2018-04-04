import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'

@connect((state, props) => ({ config: state.config }))
export default class Header extends Component {
  render() {
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <div className="brand-title">
                <span className="brand-text">AEO</span>
              </div>
            </Link>
          </div>
        </div>
      </header>
    )
  }
}
