import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import { TextField } from '@material-ui/core/';
import { addPost } from '../actions';
import { connect } from 'react-redux';

class PostNew extends React.Component {

    renderTextArea = (content) => {
        const { meta: { touched, error }, label, required } = content;
        return (
            <div>
                <TextField
                    label={label}
                    fullWidth
                    multiline
                    rowsMax="4"
                    required= {required}
                    {...content.input}
                    error={touched && error}
                />
            </div>
        )
    }

    renderInput = (title) => {
        const { meta: { touched, error }, label, required } = title;
        return (
            <div className="form-group">
                <TextField
                    {...title.input}
                    fullWidth
                    error={touched && error}
                    label={label}
                    required= {required}
                />
            </div>
            
        )
    }

    handleOnSubmit(values){
        addPost(values,() => {this.props.history.push("/")})
    }
    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return(
            <div className="col-lg-6 container mt-5 bg-light border border-light rounded shadow-lg">
            <Link to="/" className="mt-3 float-right">
                <CancelIcon color="secondary" />
            </Link>
            <h1 className="text-muted text-center">New Post</h1>
                <form onSubmit={handleSubmit(this.handleOnSubmit.bind(this))} autoComplete="off" className="m-3">
                    <div className="row">
                        <div className="col">
                            <Field
                                label="Titulo"
                                name="title"
                                component={this.renderInput}
                                required={true}
                            />
                        </div>
                        <div className="col">
                            <Field 
                            label="Categorias"
                            name="categories"
                            component={this.renderInput}
                            required={false}
                            />
                        </div>
                    </div>
                <div className="form-group">
                    <Field name="content" component={this.renderTextArea} label="Contenido" required={true}/>
                </div>
                    <button type="submit" disabled={pristine || submitting} className="btn btn-primary">Guardar</button>
                    <button type="button" disabled={pristine || submitting} className="ml-3 btn btn-secondary" onClick={reset}>Limpiar</button>
                </form>
            </div>
        )
    }
}

function validate (values) {
    const errors = {}

    if (!values.title) {
        errors.title = "Ingrese un titulo"
    }
    if (!values.content) {
        errors.content = "Ingrese contenido"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'postnew'
})(connect (null,{addPost})(PostNew))