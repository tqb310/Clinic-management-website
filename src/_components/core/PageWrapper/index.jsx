import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {Box, IconButton} from '@mui/material';
import {Add, Logout} from '@mui/icons-material';
import {
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';
import SideBar from '_components/core/SideBar';
import Header from '_components/core/Header';
import {Scrollbars} from 'react-custom-scrollbars-2';
import ClinicLogo from '_assets/images/clinic.png';
import './index.scss';

function PageWrapper({routes, currentPath}) {
    const role = '';
    return (
        <Box className="pagewrapper">
            <Box className="pagewrapper__left">
                <img
                    className="pagewrapper__logo"
                    src={ClinicLogo}
                    alt="Clinic logo"
                    width="56"
                    height="56"
                />
                <SideBar routes={routes} />
                <IconButton
                    className="pagewrapper__logout"
                    onClick={() => {}}
                >
                    <Logout
                        sx={{transform: 'rotate(180deg)'}}
                    />
                </IconButton>
            </Box>
            <Box className="pagewrapper__center">
                <Box className="pagewrapper__header">
                    <Header />
                </Box>
                <Box className="pagewrapper__main">
                    <Scrollbars
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        // autoHide
                        // autoHideTimeout={1000}
                        // autoHideDuration={500}
                    >
                        <Suspense
                            fallback={
                                <div>Loading ...</div>
                            }
                        >
                            <Switch>
                                {routes.map(
                                    ({
                                        id,
                                        path: childPath,
                                        exact,
                                        component,
                                    }) => {
                                        return (
                                            <Route
                                                key={id}
                                                path={`${
                                                    currentPath +
                                                    childPath
                                                }`}
                                                exact={
                                                    exact
                                                }
                                                component={
                                                    component
                                                }
                                            />
                                        );
                                    },
                                )}
                                <Route
                                    render={() => (
                                        <Redirect
                                            to={
                                                currentPath +
                                                '/trang-chu'
                                            }
                                        />
                                    )}
                                />
                            </Switch>
                        </Suspense>
                    </Scrollbars>
                </Box>
            </Box>
            <Box className="pagewrapper__right"></Box>
            {
                // role === 1 &&
                <Link to="/tiep-tan/phieu-kham/them-phieu-kham">
                    <div className="pagewrapper__createCard">
                        <Add
                            sx={{
                                fontSize: 32,
                                color: 'white',
                                transition: 'all .3s',
                                '&:hover': {
                                    transform:
                                        'scale(1.2,1.2)',
                                },
                                '&:active': {
                                    transform:
                                        'scale(0.9, 0.9)',
                                },
                            }}
                        />
                    </div>
                </Link>
            }
        </Box>
    );
}

PageWrapper.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string,
            name: PropTypes.string,
            isPublic: PropTypes.bool,
            exact: PropTypes.bool,
            component: PropTypes.object,
            icon: PropTypes.object,
        }),
    ),
    currentPath: PropTypes.string,
};

export default PageWrapper;
