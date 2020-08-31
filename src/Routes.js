import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  UserListF as UserListFView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  Login as LoginView,
  NotFound as NotFoundView,
  Validation as ValidationView,
  ValidationForget as ValidationForgetView,
  Communication as ChatView,
  NewWatchlist as NewWatchlistView,
  ForgetPassword as ForgetPasswordView,
  PasswordReset as PasswordResetView,
  AdminPanel as AdminPanelView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={LoginView}
        layout={MinimalLayout}
        exact
        path="/log-in"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={AdminPanelView}
        exact
        layout={MainLayout}
        path="/admin-page-login-only"
      />
      <RouteWithLayout
        component={UserListFView}
        exact
        layout={MainLayout}
        path="/fusers"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={ChatView}
        exact
        layout={MainLayout}
        path="/chat"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={ForgetPasswordView}
        exact
        layout={MinimalLayout}
        path="/forget-password"
      />
      <RouteWithLayout
        component={PasswordResetView}
        exact
        layout={MinimalLayout}
        path="/password-reset"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={ValidationView}
        exact
        layout={MinimalLayout}
        path="/validation"
      />
      <RouteWithLayout
        component={ValidationForgetView}
        exact
        layout={MinimalLayout}
        path="/validation-forget"
      />
      <RouteWithLayout
        component={NewWatchlistView}
        exact
        layout={MinimalLayout}
        path="/newwatchlist"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
