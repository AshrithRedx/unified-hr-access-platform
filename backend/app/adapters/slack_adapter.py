from app.adapters.base_adapter import BaseAdapter
from app.schemas.provisioning import ProvisioningResult
from app.core.enums import Provider, ProvisioningStatus


class SlackAdapter(BaseAdapter):

    def provision_user(self, employee):

        print(f"Provisioning GitHub account for {employee.email}")

        return ProvisioningResult(
            provider=Provider.SLACK,
            status=ProvisioningStatus.SUCCESS,
            message="Slack account provisioned successfully",
            external_user_id="sl_mock_123"
        )

    def revoke_user(self, employee):

        print(f"Revoking Slack access for {employee.email}")

        return ProvisioningResult(
            provider=Provider.SLACK,
            status=ProvisioningStatus.SUCCESS,
            message="Slack account revoked successfully",
            external_user_id="sl_mock_123"
        )