
import React from 'react';

import {
    Route
} from 'react-router-dom';

import hoistNonReactStatics from 'hoist-non-react-statics';

import getDisplayName from './getDisplayName';


/**
 * The HOC which return new Route with the capability of passing props on <Route> to Component
 * 能够生成将 <Route> 上的（部分） props 传给 <Route> 对应的 Component 的 Route 的 HOC
 *
 * @param {Array} componentPropKeyList keyname list of props need to be passed to component
 * @param {?React.Component} ParentRoute wrappedRoute
 * @return {React.Component} result component
 */
export default (componentPropKeyList, ParentRoute = Route) => {

    const withPropsPassingRoute = ({
        // exclude `component` from props, `component` and `render` should not on the same `<Route>`
        // 单独提出 `component`，`component` 和 `render` 不能同时在一个 `<Route>` 上存在
        component: Component,
        ...restProps
    }) => {

        const componentProps = (() => {
            let result = {};
            componentPropKeyList.forEach(key => {
                if (key in restProps) {
                    result[key] = restProps[key];
                }
            });
            return result;
        })();


        // if no Component specified (render or children may included), pass restProps directly
        // 没有 component 时，直接按照 restProps 的设定，比如 render 来处理 Route
        if (!Component) {
            return (
                <ParentRoute
                    {...{
                        ...restProps
                    }}
                />
            );
        }

        return (
            <ParentRoute
                {...{
                    ...restProps,
                    render: childProps => {
                        return (
                            <Component
                                {...{
                                    ...childProps,
                                    ...componentProps
                                }}
                            />
                        );
                    }
                }}
            />
        );
    };

    withPropsPassingRoute.displayName = `WithPropsPassing(${getDisplayName(ParentRoute)})`;
    withPropsPassingRoute.WrappedComponent = ParentRoute;

    return hoistNonReactStatics(withPropsPassingRoute, ParentRoute);
};
