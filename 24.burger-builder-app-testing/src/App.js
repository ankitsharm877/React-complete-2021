import React, { Component, Suspense } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

class App extends Component{
  componentDidMount() {
    this.props.onTryAutSignUp();
  }
  render() {
    let routes = (
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/checkout" render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Checkout/>
              </Suspense>
            )}/>
            <Route path="/orders" render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Orders/>
              </Suspense>
            )}/>
            <Route  path="/logout" component={Logout} />
            <Route path="/auth" component={Auth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {/* <BurgerBuilder/>
          <Checkout/> */}
          {/* <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/auth" component={Auth}/>
            <Route  path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch> */}
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
