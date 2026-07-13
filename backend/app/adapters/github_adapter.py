from app.adapters.base_adapter import BaseAdapter
from app.schemas.provisioning import ProvisioningResult
from app.core.enums import Provider, ProvisioningStatus


class GitHubAdapter(BaseAdapter):

    def provision_user(self, employee):

        print(f"Provisioning GitHub account for {employee.email}")

        return ProvisioningResult(
            provider=Provider.GITHUB,
            status=ProvisioningStatus.SUCCESS,
            message="GitHub account provisioned successfully",
            external_user_id="gh_mock_123"
        )

    def revoke_user(self, employee):

        print(f"Revoking GitHub access for {employee.email}")

        return ProvisioningResult(
            provider=Provider.GITHUB,
            status=ProvisioningStatus.SUCCESS,
            message="GitHub account revoked successfully",
            external_user_id="gh_mock_123"
        )