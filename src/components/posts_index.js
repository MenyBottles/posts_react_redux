import React from 'react';
import { connect } from 'react-redux'
import {fetchPosts} from '../actions/index';
import {Link} from 'react-router-dom';

class PostsIndex extends React.Component{

    constructor(props){
        super(props)

        this.state =  {
            searchTerm : '',
            searchTermSubmit : ''
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

    renderPosts()  {
        const { posts } = this.props
        return (
            posts.filter(p => p.title.includes(this.state.searchTermSubmit)).map(p => 
                <li className="list-group-item" key={p.id}>
                        {p.title}
                    </li>
            )
        )
    }

    componentDidMount(){
        this.props.fetchPosts();
    }

    render() {
        return (
            <div className="col-lg-8 container mt-5">
                <Link to="/post/new" className="btn btn-primary mb-3">Agregar Post</Link>
                <div className="bg-light border border-light rounded shadow-lg">
                    <SearchBar onSubmit={this.onSubmitInput} onChange={this.onChangeInput} value={this.state.searchTerm}/>
                    <ul className="list-group m-3">
                        {this.renderPosts()}
                    </ul>
                </div>
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
    return {posts: state.posts}
}
export default connect(mapStateToProps,{fetchPosts})(PostsIndex);