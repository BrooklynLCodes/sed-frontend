import { Button } from '@patternfly/react-core';
import React from 'react';
import { useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import NoAccessPopover from '../NoAccessPopover';
import { Tooltip } from '@patternfly/react-core';

const WriteOnlyButton = (props) => {
  const {
    children,
    enabledTooltip,
    disabledTooltip = 'Disabled',
    ...buttonProps
  } = props;

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const isDisabled = !user?.rbacPermissions.canWriteActivationKeys;

  return (
    <>
      {isDisabled ? (
        <NoAccessPopover
          content={() => (
            <Tooltip
              position="top"
              content={disabledTooltip}
              trigger="mouseenter"
            >
              <Button {...buttonProps} isDisabled>
                {children}
              </Button>
            </Tooltip>
          )}
        />
      ) : (
        <Tooltip position="top" content={enabledTooltip} trigger="mouseenter">
          <Button {...buttonProps}>{children}</Button>
        </Tooltip>
      )}
    </>
  );
};

WriteOnlyButton.propTypes = {
  children: PropTypes.element.isRequired,
  enabledTooltip: PropTypes.string.isRequired,
  disabledTooltip: PropTypes.string,
};

export default WriteOnlyButton;
