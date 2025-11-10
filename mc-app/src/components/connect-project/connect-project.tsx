import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Card from '@commercetools-uikit/card';
import { useServiceUrl } from '../../contexts';
import { useConnectProject } from '../../hooks/use-service-url';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const ConnectProject = () => {
  const location = useLocation();
  const { serviceUrl } = useServiceUrl();
  const { connectProject, loading } = useConnectProject();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  // Parse query params
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const handleConnect = async () => {
    if (!token) {
      setError('Token is missing');
      return;
    }

    if (!serviceUrl) {
      setError('Service URL is not available');
      return;
    }

    try {
      setError('');
      await connectProject(serviceUrl, token);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to connect project'
      );
    }
  };

  if (!token) {
    return (
      <Constraints.Horizontal max={16}>
        <Spacings.Stack scale="xl">
          <Text.Headline as="h1">Connect Project</Text.Headline>
          <Card theme="light" type="flat">
            <Spacings.Stack scale="m">
              <Text.Body tone="critical">
                Error: Token is missing from URL query parameters
              </Text.Body>
            </Spacings.Stack>
          </Card>
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }

  return (
    <Constraints.Horizontal max={16}>
      <Spacings.Stack scale="xl">
        <Text.Headline as="h1">Connect Project</Text.Headline>

        <Card theme="light" type="raised">
          <Spacings.Stack scale="m">
            <Text.Body fontWeight="bold">Token:</Text.Body>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                fontSize: '14px',
              }}
            >
              {token}
            </div>
          </Spacings.Stack>
        </Card>

        {error && (
          <Card theme="light" type="flat">
            <Text.Body tone="critical">{error}</Text.Body>
          </Card>
        )}

        {success && (
          <Card theme="light" type="flat">
            <Text.Body tone="positive">
              Successfully connected project!
            </Text.Body>
          </Card>
        )}
        <Spacings.Inline scale="m">
          <PrimaryButton
            label="Connect"
            onClick={handleConnect}
            iconRight={loading ? <LoadingSpinner /> : undefined}
            isDisabled={loading || success}
          />
        </Spacings.Inline>
      </Spacings.Stack>
    </Constraints.Horizontal>
  );
};

ConnectProject.displayName = 'ConnectProject';

export default ConnectProject;
