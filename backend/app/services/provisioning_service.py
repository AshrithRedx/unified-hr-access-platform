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