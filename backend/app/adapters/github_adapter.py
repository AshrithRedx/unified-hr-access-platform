import requests

from app.adapters.base_adapter import BaseAdapter
from app.core.config import settings
from app.core.enums import Provider, ProvisioningStatus
from app.schemas.provisioning import ProvisioningResult


class GitHubAdapter(BaseAdapter):

    BASE_URL = "https://api.github.com"

    def _headers(self):
        return {
            "Authorization": f"Bearer {settings.github_token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }

    def provision_user(self, employee):

        if not employee.github_username:
            return ProvisioningResult(
                provider=Provider.GITHUB,
                status=ProvisioningStatus.FAILED,
                message="Employee does not have a GitHub username.",
                external_user_id=None,
            )

        url = (
            f"{self.BASE_URL}/repos/"
            f"{settings.github_owner}/"
            f"{settings.github_repo}/"
            f"collaborators/{employee.github_username}"
        )

        response = requests.put(
            url,
            headers=self._headers(),
            json={"permission": "push"},
            timeout=15,
        )

        if response.status_code in (201, 204):
            return ProvisioningResult(
                provider=Provider.GITHUB,
                status=ProvisioningStatus.SUCCESS,
                message="GitHub collaborator invited successfully.",
                external_user_id=employee.github_username,
            )

        return ProvisioningResult(
            provider=Provider.GITHUB,
            status=ProvisioningStatus.FAILED,
           message=(
                f"GitHub Error ({response.status_code}): "
                f"{self._error_message(response)}"
            ),
            external_user_id=None,
        )

    def revoke_user(self, employee):

        if not employee.github_username:
            return ProvisioningResult(
                provider=Provider.GITHUB,
                status=ProvisioningStatus.FAILED,
                message="Employee does not have a GitHub username.",
                external_user_id=None,
            )

        url = (
            f"{self.BASE_URL}/repos/"
            f"{settings.github_owner}/"
            f"{settings.github_repo}/"
            f"collaborators/{employee.github_username}"
        )

        response = requests.delete(
            url,
            headers=self._headers(),
            timeout=15,
        )

        if response.status_code == 204:
            return ProvisioningResult(
                provider=Provider.GITHUB,
                status=ProvisioningStatus.SUCCESS,
                message="GitHub collaborator removed successfully.",
                external_user_id=employee.github_username,
            )

        return ProvisioningResult(
            provider=Provider.GITHUB,
            status=ProvisioningStatus.FAILED,
           message=(
                f"GitHub Error ({response.status_code}): "
                f"{self._error_message(response)}"
            ),
            external_user_id=None,
        )
    
    def _error_message(self, response):

        try:
            payload = response.json()
            return payload.get("message", response.text)
        except Exception:
            return response.text