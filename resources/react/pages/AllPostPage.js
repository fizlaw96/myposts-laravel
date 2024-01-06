import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AllPostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: undefined,
        };
    }

    componentDidMount() {
        this.callAPI();
    }

    callAPI() {
        let url = `/api/posts`;

        axios
            .get(url)
            .then((res) => {
                this.setState({
                    posts: res.data.posts,
                });
            })
            .catch((e) => {});
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="container mt-4">
                <div className="d-flex flex-direction-row justify-content-between align-items-center">
                    <h1 className="mb-4">Post List</h1>
                    <Link className="btn btn-primary" to={"/create"}>
                        Add a new one?
                    </Link>
                </div>
                <hr />
                <div className="row g-4 mt-1">
                    {posts !== undefined && posts.length > 0 ? (
                        posts.map((post, index) => {
                            return (
                                <div
                                    className="col-lg-4"
                                    key={post.id}
                                    id={index}
                                >
                                    <div className="card shadow">
                                        <div className="card-body">
                                            <p className="btn btn-success rounded-pill btn-sm">
                                                {post.category}
                                            </p>
                                            <Link
                                                to={`/posts/${post.id}`}
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <div className="card-title fw-bold text-primary h4">
                                                    {post.title}
                                                </div>
                                            </Link>
                                            <p className="text-secondary">
                                                {`${post.content.substring(
                                                    0,
                                                    30
                                                )}${
                                                    post.content.length > 30
                                                        ? "... "
                                                        : ""
                                                }`}
                                                {post.content.length > 30 && (
                                                    <Link
                                                        to={`/posts/${post.id}`}
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                    >
                                                        Read More
                                                    </Link>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h2 className="text-center text-secondary p-4">
                            No post found in the database!
                        </h2>
                    )}
                </div>
            </div>
        );
    }
}

export default AllPostPage;
