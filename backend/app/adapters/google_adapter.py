from app.adapters.base_adapter import BaseAdapter
from app.schemas.provisioning import ProvisioningResult
from app.core.enums import Provider, ProvisioningStatus


class GoogleAdapter(BaseAdapter):

    def provision_user(self, employee):

        print(f"Provisioning Google account for {employee.email}")

        return ProvisioningResult(
            provider=Provider.GOOGLE,
            status=ProvisioningStatus.SUCCESS,
            message="Google account provisioned successfully",
            external_user_id="google_mock_123"
        )

    def revoke_user(self, employee):

        print(f"Revoking Google access for {employee.email}")

        return ProvisioningResult(
            provider=Provider.GOOGLE,
            status=ProvisioningStatus.SUCCESS,
            message="Google account revoked successfully",
            external_user_id="google_mock_123"
        )