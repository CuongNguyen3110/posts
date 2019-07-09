import React from 'react';
import { connect } from 'react-redux';
import { createPost, changeUrl } from '../redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class PostForm extends React.Component {

    state = {
        userId: '',
        body: '',
        title: '',
        isAlert: false
    }

    onInputChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { userId, title, body } = this.state;
        const { createPost, changeUrl } = this.props;

        if (!userId || !title) {
            this.setState({
                isAlert: true
            })
        } else {
            createPost({
                userId,
                title,
                body
            })
            this.setState({
                isAlert: false
            })
            changeUrl('POSTS');
        }
    }

    render() {
        const { userId, title, body, isAlert } = this.state;

        return (
            <div className='container' style={{ marginTop: '80px' }}>
                <h1 className='text-center' style={{ marginTop: "20px" }}>Form</h1>
                <div className='row justify-content-center'>
                    <form className='col-6' >
                        {isAlert ? <div className='alert alert-danger'>Please input userID and Post title</div> : null}
                        <div className="form-group">
                            {/* <label >UserID<span className='text-danger'>*</span></label> */}
                            <TextField
                                label="User ID"
                                type="text"
                                className="form-control"
                                placeholder="Enter userID"
                                onChange={this.onInputChange('userId')}
                                value={userId} 
                            />
                        </div>
                        <div className="form-group">
                            {/* <label >Post title<span className='text-danger'>*</span></label> */}
                            <TextField
                                type="text"
                                label="Post title"
                                className="form-control"
                                placeholder="Enter Post title"
                                onChange={this.onInputChange('title')} 
                                value={title}
                            />
                        </div>
                        <div className="form-group">
                            {/* <label >Post body</label> */}
                            <TextField
                                type="text"
                                label="Post body"
                                className="form-control"
                                placeholder="Enter Post body"
                                onChange={this.onInputChange('body')}
                                value={body} 
                            />
                        </div>
                        <Button 
                            variant='contained' 
                            color='primary' 
                            className='mx-auto mt-3'
                            onClick={this.onSubmit}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    createPost: (data) => dispatch(createPost(data)),
    changeUrl: (url) => dispatch(changeUrl(url))
})

export default connect(null, mapDispatchToProps)(PostForm);