
import withPropsPassing from './withPropsPassing';

// build <BRoute> which can pass subRoutes prop on <Route> to Component, help generating series of <Route> with central route config
// 构建出可以将 <Route> 上的 subRoutes 直接向 Component 传递的 <BRoute>，方便通过统一配置生成一系列 <Route>
export default withPropsPassing(['subRoutes']);
