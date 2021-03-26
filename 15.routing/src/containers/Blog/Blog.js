import React, { Component } from 'react';
import {Route, Link, NavLink, Switch, Redirect} from 'react-router-dom'
import './Blog.css';
import Posts from './Posts/Posts';
import FullPost from './FullPost/FullPost'

import asyncComponent from '../../hoc/asyncComponent';
//import NewPost from './NewPost/NewPost';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component { 
    state =  {
        auth: false
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                           {/*  <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li> */}
                            {/* <li><Link to="/">Home</Link></li>
                            <li><Link to={ location => ({
                                pathname:  location.pathname +'new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            })}>New Page</Link></li> */}
                            <li><NavLink 
                                    to="/" 
                                    activeClassName="my-active" 
                                    activeStyle={{
                                        color: "#fa923f",
                                        textDecoration: "underline"
                                    }}
                                    exact>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Page</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Posts/> */}
                {/* <Route path="/" exact render={() => <h1>Home</h1>}/>
                <Route path="/" render={() => <h1>Home 2</h1>}/> */}
                <Switch>
                   {/*  {this.state.auth ? <Route path="/new-post" component={NewPost}/> : null } */}
                   {/*  <Route path="/new-post" component={NewPost}/> */}
                    <Route path="/new-post" component={AsyncNewPost}/>
                    <Route path="/" exact component={Posts}/>
                    {/* <Redirect from="/" to="/new-post"/> */}
                    <Route path="/pages/:id" exact component={FullPost}/>
                    <Route render={() => <h1>Page Not Found 404!</h1>}/>
                    {/*  <Route component={NotFoundPage} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;