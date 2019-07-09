import React from 'react';

import { connect } from 'react-redux';
import { requestPostsFromApi, changePage } from '../redux/index';
import Paging from '../components/Paging';
import SearchBar from '../components/SearchBar';

import { postsSelector } from '../redux/selector';

class Posts extends React.Component {

    onShowAllPosts = () => {
        this.props.requestPostsFromApi();
    }

    onPageChange = (data) => {
        this.props.changePage(data);
    }   

    render() {
        const { posts, pageNumber, pageSize, isLoading, searchString } = this.props;
        const searchedPost = searchString 
                                ? posts.filter(post => post.id.toString().includes(searchString) 
                                                    || post.userId.toString().includes(searchString) 
                                                    || post.body.includes(searchString) 
                                                    || post.title.includes(searchString)
                                                ) 
                                : posts;
        const pagedPost = searchedPost.slice((pageNumber-1)*pageSize, (pageNumber-1)*pageSize + pageSize);
             
        return (
            <div className='container' style={{marginTop: '80px'}}>
                <button onClick={this.onShowAllPosts} className="btn btn-primary">Show all posts</button>
                <SearchBar />
                <h1 className='text-center' style={{marginTop: '30px'}}>POSTS</h1>
                <div className='row justify-content-center px-3'>
                {isLoading ? <div className='spinner-border text-primary text-center'></div> : null}
                {pagedPost.map((post) => {
                    return (
                        <div key={post.id} className='col-12 card' style={{marginTop: '20px'}}>
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
                <div className='row justify-content-center' style={{marginTop: '10px'}}>
                    <Paging 
                        onPageChange={this.onPageChange} 
                        totalPosts={searchedPost} 
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                    >
                    </Paging>
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
    changePage: (data) => dispatch(changePage(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);