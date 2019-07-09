import React from 'react';

import { connect } from 'react-redux';
import { requestPostsFromApi, changePage, hideAllPosts } from '../redux/index';
import Paging from '../components/Paging';
import SearchBar from '../components/SearchBar';

import { postsSelector } from '../redux/selector';
import { fbind } from 'q';

class Posts extends React.Component {

    state = {
        allPostsShowed: false
    }

    onShare = () => {
        
    }

    onShowAndHideAllPosts = () => {
        const { allPostsShowed } = this.state;
        const { requestPostsFromApi, hideAllPosts, changePage } = this.props;

        if (allPostsShowed) {
            hideAllPosts();
            this.setState({
                allPostsShowed: false
            });

        } else {
            requestPostsFromApi();
            this.setState({
                allPostsShowed: true
            });
        }

        changePage(1);
    }

    onPageChange = (data) => {
        this.props.changePage(data);
    }

    render() {
        const { allPostsShowed } = this.state;
        const { posts, pageNumber, pageSize, isLoading, searchString } = this.props;
        const searchedPost = searchString
            ? posts.filter(post => post.id.toString().includes(searchString)
                || post.userId.toString().includes(searchString)
                || post.body.includes(searchString)
                || post.title.includes(searchString)
            )
            : posts;
        const pagedPost = searchedPost.slice((pageNumber - 1) * pageSize, (pageNumber - 1) * pageSize + pageSize);

        return (
            <div className='container' style={{ marginTop: '80px' }}>
                <button
                    onClick={this.onShowAndHideAllPosts}
                    className="btn btn-primary"
                >
                    {allPostsShowed ? 'Hide all posts' : 'Show all posts'}
                </button>
                <SearchBar />
                <h1 className='text-center' style={{ marginTop: '30px' }}>POSTS</h1>
                <div className='row justify-content-center px-3'>
                    {isLoading ? <div className='spinner-border text-primary text-center'></div> : null}
                    {pagedPost.map((post) => {
                        return (
                            <div key={post.id} className='col-12 card' style={{ marginTop: '20px' }}>
                                <div className='card-body'>
                                    <h5 className='card-title'>Post title: {post.title}</h5>
                                    <h6>User: {post.userId}</h6>
                                    <h6>PostID: {post.id}</h6>
                                    <p>Post body: {post.body}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div className='row justify-content-center' style={{ marginTop: '10px' }}>
                    <Paging
                        onPageChange={this.onPageChange}
                        totalPosts={searchedPost}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ...postsSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
    requestPostsFromApi: () => dispatch(requestPostsFromApi()),
    changePage: (data) => dispatch(changePage(data)),
    hideAllPosts: () => dispatch(hideAllPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);