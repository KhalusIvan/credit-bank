import React, { useRef, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams
} from "react-router-dom";
export default function Topics() {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path } = useRouteMatch();
  
    return (
      <div>
          fghfghfghfdh
        <Switch>
          <Route path={`${path}/jsg`}>
            12345
          </Route>
        </Switch>
      </div>
    );
  }
  function Topic() {
    let { topicId } = useParams();
  
    return (
      <div>
        <h3>{topicId}jghjggjjghjghj</h3>
      </div>
    );
  }