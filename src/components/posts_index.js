import React from 'react';
import { connect } from 'react-redux'
import {fetchPostsAPI, deletePost} from '../actions/index';
import {Link} from 'react-router-dom';
import {
    Button,ListItem,ListItemText,List,ListItemSecondaryAction,IconButton
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

class PostsIndex extends React.Component{
    constructor(props){
        super(props)

        this.state =  {
            searchTerm : '',
            searchTermSubmit : '',
            open: false,
        }

        this.onSubmitInput = this.onSubmitInput.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onSubmitInput(event){
        const {searchTerm} = this.state;
        this.setState({
            searchTermSubmit : searchTerm
        })
        event.preventDefault()
    }

    onChangeInput(event){
        const {value} = event.target
        this.setState({
            searchTerm : value
        })
    }

    onDeletePost = (id) => {
        deletePost(id, () => this.props.fetchPosts())
    };

    renderPosts()  {
        const { posts } = this.props
        return (
            posts.filter(p => p.title.includes(this.state.searchTermSubmit)).map(p => 
                <ListItem key={p.id} button onClick={() => this.props.history.push(`/posts/${p.id}`)}>
                <ListItemText primary={p.title} />
                <ListItemSecondaryAction>
                    <IconButton>
                        <DeleteForeverRoundedIcon onClick={() => this.onDeletePost(p.id)}/>
                    </IconButton>
                </ListItemSecondaryAction>
                </ListItem>
            )
        )
    }

    componentDidMount(){
        this.props.fetchPostsAPI();
    }

    render() {
        const { isLoading } = this.props
        return (
            <div className="col-lg-8 container mt-5">
                {
                    isLoading ? <div>Loading...</div> :
                        <div>
                            <div className="bg-light border border-light rounded shadow-lg">
                                <SearchBar onSubmit={this.onSubmitInput} onChange={this.onChangeInput} value={this.state.searchTerm}/>
                                <List>
                                    {this.renderPosts()}
                                </List>
                            </div>
                            <Link to="/post/new" className="mt-3 float-right">
                                <Button color="primary" mini>
                                    <AddIcon />
                                </Button>
                            </Link>
                        </div>
                 }   
            </div>

            
        )
    }
}

const SearchBar = ({onSubmit,value,onChange}) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="input-group col-8 mt-3 ml-auto mr-auto">
                <input type="text" className="form-control" placeholder="Buscar por titulo" onChange={onChange} value={value}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-primary" type="submit">Buscar</button>
                </div>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        posts: state.posts.entities,
        isLoading: state.posts.isLoading
    }
}
export default connect(mapStateToProps,{fetchPostsAPI})(PostsIndex);