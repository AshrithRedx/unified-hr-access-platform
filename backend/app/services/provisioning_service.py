from app.adapters.adapter_manager import AdapterManager


class ProvisioningService:

    def __init__(self):
        self.adapter_manager = AdapterManager()

    def provision_employee(self, employee):

        results = []

        for adapter in self.adapter_manager.get_all_adapters():
            result = adapter.provision_user(employee)
            results.append(result)

        return results

    def provision_provider(
        self,
        employee,
        provider,
    ):
        adapter = self.adapter_manager.get_adapter(provider)

        if adapter is None:
            raise ValueError("Invalid provider")

        return adapter.provision_user(employee)
    
    def revoke_provider(
        self,
        employee,
        provider: str,
    ):

        adapter = self.adapter_manager.get_adapter(provider)

        if adapter is None:
            raise ValueError(
                f"Unsupported provider: {provider}"
            )

        return adapter.revoke_user(employee)