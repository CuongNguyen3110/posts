import React from 'react';
import { connect } from 'react-redux';
import { submitPost, alert, changeUrl } from '../redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class PostForm extends React.Component {

    state = {
        userId: '',
        body: '',
        title: ''
    }

    onInputChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { userId, title, body } = this.state;
        const { alert, submitPost, changeUrl } = this.props;

        if (!userId || !title) {
            alert(true);
        } else {
            submitPost({
                userId,
                title,
                body
            })
            alert(false);
            changeUrl('POSTS');
        }
    }

    render() {
        const { userId, title, body } = this.state;

        return (
            <div className='container' style={{ marginTop: '80px' }}>
                <h1 className='text-center' style={{ marginTop: "20px" }}>Form</h1>
                <div className='row justify-content-center'>
                    <form className='col-6' >
                        {this.props.isAlert ? <div className='alert alert-danger'>Please input userID and Post title</div> : null}
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

const mapStateToProps = (state) => {
    const { isAlert } = state;
    return {
        isAlert
    }
}

const mapDispatchToProps = (dispatch) => ({
    submitPost: (data) => dispatch(submitPost(data)),
    alert: (data) => dispatch(alert(data)),
    changeUrl: (url) => dispatch(changeUrl(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);