
import React from 'react';

import {
    Switch,
    Redirect
} from 'react-router-dom';

/**
 * renderRoutes
 *
 * @param {Object} rootConfig root routes config
 * @param {number} level level
 * @return {React.Component}
 */
const renderRoutes = (
    rootConfig,
    level = 0
) => {

    if (rootConfig.component) {
        return (
            <rootConfig.Route
                {...{
                    ...rootConfig,
                    key: level
                }}
            />
        );
    }

    if (rootConfig.subRoutes) {

        // indicates the route at this level do not need to an explicit route
        // which is the kind of route do not have a corresponding content component to be rendered
        // 如果有 path 但没有 component 的，说明这层是 route，但不需要显式展现
        // all the route need to do is redirecting when matched
        // 对于不需要显式显示的 Route 访问的时候直接 Redirect
        // as for redirecting, <Route> and <Redirect> need to be wrap by <Switch>
        // 所以也一定需要 Switch 包裹
        // generate a component following the above requirement
        // 根据以上逻辑生成 component
        if (rootConfig.path && !rootConfig.component) {
            rootConfig.component = props => {
                return renderRoutes({
                    subRoutes: props.subRoutes,
                    isRedirect: true,
                    isSwitch: true
                });
            };
            return renderRoutes(rootConfig);
        }

        const children = rootConfig.subRoutes.map((routeConfig, index) => {
            return renderRoutes(
                routeConfig,
                `${level}_${index}`
            );
        });

        if (rootConfig.isRedirect) {
            children.push(
                <Redirect
                    to={rootConfig.subRoutes[0].path}
                    key={`${level}_${children.length}`}
                />
            );
        }

        return rootConfig.isSwitch
            ? (
                <Switch
                    key={level}
                >
                    {children}
                </Switch>
            )
            : children;
    }
};

export default renderRoutes;
