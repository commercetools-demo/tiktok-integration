import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

const ConfigWizard = () => {
  return (
    <Constraints.Horizontal max={16}>
      <Spacings.Stack scale="xl">
        <Text.Headline as="h1">Configuration Wizard</Text.Headline>
        <Text.Body>
          Configure your TikTok integration settings.
        </Text.Body>
      </Spacings.Stack>
    </Constraints.Horizontal>
  );
};

ConfigWizard.displayName = 'ConfigWizard';

export default ConfigWizard;

