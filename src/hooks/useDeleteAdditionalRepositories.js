import { useMutation } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const deleteAdditionalRepositoriesMutation = (token) => async (name) => {
  const response = await fetch(
    `/api/rhsm/v2/activation_keys/${name}/additional_repositories`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${await token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error(
      `Status Code ${response.status}.  Error deleting additional respository: ${response.statusText}.`
    );
  }
};

const useDeleteAdditionalRepositories = () => {
  const chrome = useChrome();

  return useMutation(
    deleteAdditionalRepositoriesMutation(chrome?.auth?.getToken())
  );
};

export { useDeleteAdditionalRepositories as default };