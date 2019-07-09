import React from 'react';
import { search } from '../redux/index';
import { connect } from 'react-redux';

class SearchBar extends React.Component {

    onChange = (value) => {
        this.props.search(value);
    }

    render() {
        return (
            <div>
                <input 
                    className='form-control' 
                    onChange={(event) => {this.onChange(event.target.value)}} 
                    placeholder='Search'
                    style={{marginTop: '20px'}}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    search: (data) => dispatch(search(data)),
})

export default connect(null, mapDispatchToProps)(SearchBar);