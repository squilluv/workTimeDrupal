import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (auth.isLoading) {
                return (
                    <div style={{ width: "100%", height: "100%", top: 0, left: 0, position: "fixed", backgroundColor: "#fff", zIndex: "9999" }}>
                        <img src="https://cdn.dribbble.com/users/829077/screenshots/4634803/flying_clock.gif" className="img-fluid rounded-circle" style={{ position: "absolute", zIndex: "9999", opacity: "1", top: "50%", left: "50%", width: 400, height: 400, margin: "-200px 0 0 -200px" }} />
                    </div>
                );
            } else if (!auth.isAuthenticated) {
                return <Redirect to="/login" />;
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);