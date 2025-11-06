import type { ReactNode } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Spacings from '@commercetools-uikit/spacings';
import Welcome from './components/welcome';
import ConnectProject from './components/connect-project';
import ConfigWizard from './components/config-wizard';
import { ServiceUrlProvider, useServiceUrl } from './contexts';

type ApplicationRoutesProps = {
  children?: ReactNode;
};

const RoutesContent = () => {
  const match = useRouteMatch();
  const { showConfigWizard } = useServiceUrl();

  /**
   * When using routes, there is a good chance that you might want to
   * restrict the access to a certain route based on the user permissions.
   * You can evaluate user permissions using the `useIsAuthorized` hook.
   * For more information see https://docs.commercetools.com/merchant-center-customizations/development/permissions
   *
   * NOTE that by default the Custom Application implicitly checks for a "View" permission,
   * otherwise it won't render. Therefore, checking for "View" permissions here
   * is redundant and not strictly necessary.
   */

  return (
    <Spacings.Inset scale="l">
      <Switch>
        <Route path={`${match.path}/connect`} exact>
          <ConnectProject />
        </Route>
        <Route>
          {showConfigWizard ? <ConfigWizard /> : <Welcome />}
        </Route>
      </Switch>
    </Spacings.Inset>
  );
};

const ApplicationRoutes = (_props: ApplicationRoutesProps) => {
  return (
    <ServiceUrlProvider>
      <RoutesContent />
    </ServiceUrlProvider>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
