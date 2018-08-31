import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import { TextField,Select,MenuItem,Input } from '@material-ui/core/';

//Categories
const caterogies = [
    "Friends",
    "Computers",
    "Games"
]


class PostNew extends React.Component {

    renderInput = (title) => {
        const { meta: { touched, error }, label, type } = title;
        return (
            <div className="form-group">
                <TextField
                    fullWidth
                    errorText={touched && error}
                    label={label}
                />
            </div>
            
        )
    }

    renderSelect = (field) => {
        const { meta: { touched, error }, label, type } = field;
        return(
            <div className="form-group">
                <Select
                    {...field}
                    floatingLabelText={label}
                    fullWidth
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </div>
        )
    }

    handleOnSubmit(){
        console.log("Test");
    }
    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return(
            <div className="col-lg-8 container mt-5 bg-light border border-light rounded shadow-lg">
            <Link to="/" className="mt-3 float-right">
                <CancelIcon color="secondary" />
            </Link>
            <h1 className="text-muted text-center">Post</h1>
                <form onSubmit={handleSubmit(this.handleOnSubmit)} autoComplete="off" className="m-3">
                    <div className="row">
                        <div className="col">
                            <Field
                                label="Titulo"
                                name="title"
                                type="text"
                                component={this.renderInput}
                            />
                        </div>
                        <div className="col">
                            <Field 
                            name="caterogies" 
                            component={this.renderSelect}
                            />
                        </div>
                    </div>
                <div className="form-group">
                    <Field name="firstName" component="textarea" type="textarea" className="form-control" placeholder="Test"/>
                </div>
                    <button type="submit" disabled={pristine || submitting} className="btn btn-primary">Submit</button>
                    <button type="button" disabled={pristine || submitting} className="ml-3 btn btn-secondary" onClick={reset}>Clear Values</button>
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
    return errors;
}

export default reduxForm({
    validate,
    form: 'postnew'
})(PostNew)