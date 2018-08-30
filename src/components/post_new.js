import React from 'react';
import { Field, reduxForm } from 'redux-form';

//Categories
const caterogies = [
    "Friends",
    "Computers",
    "Games"
]

const PostNew = ({handleSubmit}) => {

    const renderField = (field) => {
        const { meta: { touched, error }, label, type } = field;
        const className = `form-control ${touched && error ? "is-invalid" : ""}`;
        return (
            <div className="form-group">
                <input
                    className={className}
                    type={type}
                    placeholder={label}
                    {...field.input}
                />
                <div className="invalid-feedback">
                {touched ? error : ""}
                </div>
            </div>
        )
    }

    const renderSelect = (field) => {
        const { meta: { touched, error }, label, type } = field;
        return (
            <div className="form-group">
                <select className="form-control">
                    {caterogies.map(c => {
                        return (
                            <option key={c}>{c}</option>
                        )
                    })}
                </select>
            </div>
        )
    }

    return(
        <div className="col-lg-5 container mt-5 bg-light border border-light rounded shadow-lg">
        <h1 className="text-muted text-center">Post</h1>
            <form onSubmit={handleSubmit} autoComplete="off" className="m-3">
                <div className="row">
                    <div className="col">
                    <Field
                        label="Titulo"
                        name="title"
                        type="text"
                        component={renderField}
                    />
                    </div>
                    <div className="col">
                    <Field name="favoriteColor" 
                    component={renderSelect}
                    />
                    </div>
                </div>
            <div className="form-group">
                <Field name="firstName" component="input" type="textarea" className="form-control" placeholder="Test"/>
            </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
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