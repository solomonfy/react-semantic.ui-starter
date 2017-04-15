import React from 'react';
import {Route, Redirect, Switch} from 'react-router';
import {createBrowserHistory} from 'history'
import {App, Inbox, Dashboard, Login} from 'containers';
import {RouteAuth} from 'components'

export const history = getHistory()

export const appRouting = [
    {
        path: '/',
        icon: 'newspaper',
        name: 'Dashboard',
        exact: true,
        sidebarVisible: true,
        tag: RouteAuth,
        component: Dashboard
    }, {
        path: '/inbox',
        name: 'Inbox',
        icon: 'comments outline',
        sidebarVisible: true,
        tag: RouteAuth,
        component: Inbox
    }, {
        external: true,
        path: 'https://github.com/Metnew/react-semantic.ui-starter',
        icon: 'github',
        name: 'Github',
        sidebarVisible: true
    }, {
        path: '/auth',
        name: 'Auth',
        tag: Route,
        component: Login
    }
]

/**
 * Returns application routing with protected by AuthCheck func routes
 * @param {Function} AuthCheck checks is user logged in
 */
export const Routing = (AuthCheck) => {
    // remove components that aren't application routes, (e.g. github link in sidebar)
    let routes = appRouting.filter(a => a.tag || a.component).map(a => {
        let {tag, path, exact, component} = a
        let b = {
            tag,
            path,
            exact,
            component
        }
        return b
    })
    // render components that are inside Switch (main view)
    let routesRendered = routes.map((a, i) => {
        // get tag for Route. is it RouteAuth `protected route` or Route?
        let Tag = a.tag
        let {path, exact, component} = a
        // can visitor access this route?
        let canAccess = AuthCheck(path)
        // select only props that we need
        let b = {path, exact, component, canAccess}
        return (<Tag key={i} {...b}/>)
    })

    return (
        <App>
            <Switch>
                {routesRendered}
                <Redirect from="*" to="/"/>
            </Switch>
        </App>
    )
}

function getHistory() {
    const basename = process.env.BUILD_DEMO
        ? '/react-semantic.ui-starter'
        : ''

    return createBrowserHistory({basename})
}
