import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

export class Login extends Component {

    state = {
        name: '',
        pass: ''
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.login(this.state.name, this.state.pass)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { name, pass } = this.state
        return (
            <Fragment>
                <div className="container py-5 col-sm-6">
                    <section className="px-md-5 mx-md-5 text-center text-lg-left black-text">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <h1 className="pb-5 text-center">Авторизация</h1>
                                <form onSubmit={this.onSubmit}>
                                    <div className="mx-3">
                                        <div className="md-form mb-5">
                                            <input
                                                className="form-control validate"
                                                type="text"
                                                name="name"
                                                onChange={this.onChange}
                                                value={name}
                                            />
                                            <label data-error="wrong" data-success="right">Логин</label>
                                        </div>

                                        <div className="md-form mb-4">
                                            <input
                                                className="form-control validate"
                                                type="password"
                                                name="pass"
                                                onChange={this.onChange}
                                                value={pass}
                                            />
                                            <label data-error="wrong" data-success="right">Пароль</label>
                                        </div>

                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-dark" type="submit">Войти</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)