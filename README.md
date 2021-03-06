
# react-router-kit

Router toolkits for React Router v4, includes:

- Router config supports inexplicit route
- Base Route

## Installation

`npm i -S react-router-kit`

```js
import {
    renderRoutes,
    BRoute
} from 'react-router-kit';
```

## Router config using `renderRoutes`

```js
/**
 * renderRoutes
 *
 * @param {Object} rootConfig root routes config
 * @param {?React.Component=} rootConfig.componnet associate
 * @param {string=} rootConfig.url url of the route
 * @param {string=} rootConfig.path path of the route
 * @param {React.Component=} rootConfig.Route `<Route>` used for the route, useful in custom base Route or auth route in your project
 * @param {Array=} rootConfig.subRoutes sub routes
 * @param {boolean=} rootConfig.isSwitch is wrapped in <Switch>
 * @param {boolean=} rootConfig.isRedirect is include a <Redirect> at the end of routes, default redirect to the first route of same level
 * @param {number=} level level mainly used for `key`
 * @return {React.Component}
 */
function renderRoutes() {}
```

Inside `rootConfig`, you can also include your own attributes, like `title`, which may be used in Sidebar render.

### Usage

#### Without sub routes, generating a series of flat top level routes

```js
const routesConfig = {
    subRoutes: [
        {
            title: 'top1',
            url: `${props.match.url}/top1`,
            path: `${props.match.path}/top1`,
            component: Top1,
            Route: BRoute
        },
        {
            title: 'top2',
            url: `${props.match.url}/top2`,
            path: `${props.match.path}/top2`,
            component: Top2,
            Route: BRoute
        }
    ],
    isSwitch: true,
    isRedirect: true
};
```

Output:

```js
{/* depends on isSwitch */}
<Switch>
    <Route 
        path="/top1"
        component={Top1}
    />
    <Route 
        path="/top2"
        component={Top2}
    />
    {/* depends on isRedirect */}
    <Redirect
        to="/top1"
    />
<Switch>
```


#### With sub routes

##### Including inexplicit route

For inexplicit route, the `component` shoud be `null`.

If the `component === null` route will be treated as inexplicit route.

The corresponding component will be generated by the config of `subRoutes`.

```js
const routesConfig = {
    subRoutes: [
        {
            title: 'top1',
            url: `${props.match.url}/top1`,
            path: `${props.match.path}/top1`,
            Route: BRoute,
            component: null,

            subRoutes: [
                {
                    title: 'top1-sub1',
                    url: `${props.match.url}/top1/sub1`,
                    path: `${props.match.path}/top1/sub1`,
                    component: Sub1,
                    Route: BRoute
                }
            ]
        },
        {
            title: 'top2',
            url: `${props.match.url}/top2`,
            path: `${props.match.path}/top2`,
            Route: BRoute,
            component: Top2
        }
    ],

    isSwitch: true,
    
    isRedirect: true
};
```

Output:

```js
<Switch>
    <Route
        path="/top1"
        {/* generated by the config */}
        component={props => {
            <Switch>
                <Route 
                    path="/top1/sub1"
                    component={Sub1}
                />
                // for inexplicit route, <Redirect> is required
                <Redirect 
                    to="/top1/sub1"
                />
            </Switch>
        }}
    />
    <Route
        component={Top2}
    />
    <Redirect
        to="/top1"
    />
</Switch>
```

##### Without inexplicit route

```js
const routesConfig = {
    subRoutes: [
        {
            title: 'top1',
            url: `${props.match.url}/top1`,
            path: `${props.match.path}/top1`,
            Route: BRoute,
            component: Top1,

            subRoutes: [
                {
                    title: 'top1-sub1',
                    url: `${props.match.url}/top1/sub1`,
                    path: `${props.match.path}/top1/sub1`,
                    component: Sub1,
                    Route: BRoute
                }
            ]
        }
    ],

    isSwitch: true,
    
    isRedirect: true
};
```

Output:

```js
<Switch>
    <Route
        path="/top1"
        component={Top1}
    />
    <Redirect
        to="/top1"
    />
</Switch>
```

In this case, the `subRoutes` of `top1` will be passed to the `<Route>` of `top1` in props.

You should implement the `<Route>` login yourself in `<Top1>` component.

Except that, you should use a custom `<Route>`(for example the `<Broute>` in this projext), in order to pass the `subRoutes` from `<Route>` to `<Top1>`.


# 中文版本

## `renderRoutes`: 用于根据 config 生成 routes

```js
/**
 * renderRoutes
 *
 * @param {Object} rootConfig root routes config
 * @param {?React.Component=} rootConfig.componnet 可选，可为 null，如果没有 component，代表该层级无 route 意义，仅需要考虑是否 needSwitch 和 needRedirect
 * @param {string=} rootConfig.url 可选，如果有 component 时必选，代表该 route 层的 url
 * @param {string=} rootConfig.path 可选，如果有 component 时必选，代表该 route 层的 path
 * @param {React.Component=} rootConfig.Route 可选，如果有 component 时必选，用于渲染该层 route 的 Component
 * @param {Array=} rootConfig.subRoutes 可选，如果有则表示有嵌套 routes
 * @param {boolean=} rootConfig.isSwitch 在 subRoutes 中且 component 为 null 时 无效
 * @param {boolean=} rootConfig.isRedirect 在 subRoutes 中且 component 为 null 时 无效，如果为 true，redirect 到同级的第一个 route
 * @param {number=} level 层级,用于 key
 * @return {React.Component}
 */
function renderRoutes() {}
```

`rootConfig` 中除了以上配置外可以新增自定义字段，比如 `title` 等，用于 Sidebar 等场景的渲染啊。


## 使用

### 无 sub routes 场景，生成一列扁平的 top level route

```js
const routesConfig = {
    subRoutes: [
        {
            title: 'top1',
            url: `${props.match.url}/top1`,
            path: `${props.match.path}/top1`,
            component: Top1,
            Route: BRoute
        },
        {
            title: 'top2',
            url: `${props.match.url}/top2`,
            path: `${props.match.path}/top2`,
            component: Top2,
            Route: BRoute
        }
    ],
    isSwitch: true,
    isRedirect: true
};
```

返回

```js
// 会根据 isSwitch 判断是否在外层加上 <Switch>
<Switch>
    <Route 
        path="/top1"
        component={Top1}
    />
    <Route 
        path="/top2"
        component={Top2}
    />
    // 会根据 isRedirect 判断是否在最后加上 <Redirect>
    <Redirect
        to="/top1"
    />
<Switch>
```


### 有 sub routes 场景

#### 有一级不需要显式展现

如果有不需要显式展现的层级，设定该层级的 `component:null`

对于 `component:null` 的层级，会根据 `subRoutes` 自动生成该层级的 component 用于渲染

```js
const routesConfig = {
    subRoutes: [
        {
            title: 'top1',
            url: `${props.match.url}/top1`,
            path: `${props.match.path}/top1`,
            Route: BRoute,
            component: null,

            isVisitable: false,

            subRoutes: [
                {
                    title: 'top1-sub1',
                    url: `${props.match.url}/top1/sub1`,
                    path: `${props.match.path}/top1/sub1`,
                    component: Sub1,
                    Route: BRoute
                }
            ],

            // 虽然在这种情况下无意义，但建议声明，方便从 config 中了解结果
            isSwitch: true,
            isRedirect: true
        },
        {
            title: 'top2',
            url: `${props.match.url}/top2`,
            path: `${props.match.path}/top2`,
            Route: BRoute,
            component: Top2
        }
    ],

    isSwitch: true,
    
    isRedirect: true
};
```

返回

```js
// 会根据 isSwitch 判断是否在外层加上 <Switch>
<Switch>
    <Route
        path="/top1"
        component={props => {
            // 这里的 Switch 是必须的
            <Switch>
                <Route 
                    path="/top1/sub1"
                    component={Sub1}
                />
                // 因为不需要显式，所以也必须 redirect
                <Redirect 
                    to="/top1/sub1"
                />
            </Switch>
        }}
    />
    <Route
        component={Top2}
    />
    // 会根据 isRedirect 判断是否在最后加上 <Redirect>
    <Redirect
        to="/top1"
    />
</Switch>
```

#### 每个层级都需要展现

只要每层的 component 都不会 null 即可

```js
const routesConfig = {
    subRoutes: [
        {
            title: 'top1',
            url: `${props.match.url}/top1`,
            path: `${props.match.path}/top1`,
            Route: BRoute,
            component: Top1,

            subRoutes: [
                {
                    title: 'top1-sub1',
                    url: `${props.match.url}/top1/sub1`,
                    path: `${props.match.path}/top1/sub1`,
                    component: Sub1,
                    Route: BRoute
                }
            ],

            // 虽然在这种情况下无意义，但建议声明，方便从 config 中了解结果
            isSwitch: true,
            isRedirect: true
        }
    ],

    isSwitch: true,
    
    isRedirect: true
};
```

返回

```js
// 会根据 isSwitch 判断是否在外层加上 <Switch>
<Switch>
    <Route
        path="/top1"
        component={Top1}
    />
    // 会根据 isRedirect 判断是否在最后加上 <Redirect>
    <Redirect
        to="/top1"
    />
</Switch>
```

在这种情况下，top1 的 subRoutes 会作为 `props` 传递给 Top1 的 `<Route>`，用户可以通过自定义 `Route` 来实现向下层 component 传递 subRoutes。

Route 的实现可以参考项目中的 `BRoute`。


## 相比 [react-router-config](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) 的优势

可以支持不需要显式展现的 sub routes
