import React, { Component } from 'react'
//import axios from 'axios';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Link,Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }
    componentDidMount() {
        console.log(this.props);
        axios.get("/posts")
            .then(res => {
                const posts = res.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                //console.log(res);
            })
            .catch(error => {
                console.log(error);
                //this.setState({error: true});
            });
    }
    postSelectedhandler = (id) => {
        //this.setState({selectedPostId: id})
        //this.props.history.push({pathname:'/' + id});
        this.props.history.push('/pages/' + id);
    }
    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                        //<Link to={'/' + post.id} key={post.id}>
                            <Post
                                title={post.title} 
                                author={post.author}
                                key={post.id} 
                            /*  match={this.props.match}
                                {...this.props} */
                                clicked={() => this.postSelectedhandler(post.id)}/>
                        //</Link>
                        );
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* <Route path={this.props.match.url+"pages/:id"} exact component={FullPost}/> */}
               {/*  <Route path="pages/:id" exact component={FullPost}/> */}
            </div>
            
        )
    }
}

export default Posts
