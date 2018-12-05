
import React from 'react';

import {
    Route
} from 'react-router-dom';

export default ({
    component: Component,
    ...restProps
}) => {

    if (restProps.subRoutes) {
        return (
            <Route
                {...{
                    // `component` and `render` should not on the same route
                    ...restProps,
                    render: childProps => {
                        return (
                            <Component
                                {...{
                                    ...childProps,
                                    subRoutes: restProps.subRoutes
                                }}
                            />
                        );
                    }
                }}
            />
        );
    }

    return (
        <Route
            {...{
                ...restProps,
                component: Component
            }}
        />
    );
};
