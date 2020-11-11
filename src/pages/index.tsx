import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

const IndexPage: FunctionComponent = () => (
  <main>
    <Link to="/search">Search</Link>
    <Link to="/user">User</Link>
  </main>
)

export default IndexPage
