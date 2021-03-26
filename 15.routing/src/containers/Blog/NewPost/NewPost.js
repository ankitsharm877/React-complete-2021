import axios from 'axios';
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }
    componentDidMount() {
        console.log(this.props);

        // if unauth => this.props.history.replace("/");

        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            console.log(param); // yields ['start', '5']
        }
        console.log(this.props.location.hash)
    }
    newPostHanlder = () => {
        const newPost = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post("/posts", newPost)
            .then(res => {
                console.log(res);
                //this.setState({submitted: true});
                //this.props.history.push("/");
                this.props.history.replace("/");
            });
    }

    render () {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/"/>;
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.newPostHanlder}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;