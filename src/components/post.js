import React from 'react';
import {connect} from 'react-redux';
import {fetchPostAPI} from '../actions'
import {
    IconButton
} from '@material-ui/core/';
import FastRewind from '@material-ui/icons/FastRewind';


class Post extends React.Component{

    componentDidMount(){
        const {id} = this.props.match.params
        this.props.fetchPostAPI(id)
    }

    goToHome = () => this.props.history.push("/")

    render() {
        const {post} = this.props
        return(
            <div className="col-lg-8 container mt-5">
                <IconButton>
                    <FastRewind onClick={this.goToHome}/>
                </IconButton>
                {post ? 
                    <div className="bg-light border border-light rounded shadow-lg">
                    <h1 className="text-muted text-center mb-5">{post.title}</h1>
                    <div className="row">
                        <div className="col ml-3">
                            <h6 className="text-muted mb-3">Categories:</h6>
                            <p>{post.categories}</p>
                        </div>
                        <div className="col ml-3">
                            <h6 className="text-muted mb-3">Content:</h6>
                            <p>{post.content}</p>
                        </div>
                    </div>
                </div>
                
                :
                <div>Loading...</div> }
               
            </div>            
        )
    }
}

const mapStateToProps = ({posts}, ownProps) => {
    return{ post : posts.entities.find(o => o.id == ownProps.match.params.id) }
}

export default connect(mapStateToProps,{fetchPostAPI})(Post)