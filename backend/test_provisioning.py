from types import SimpleNamespace

from app.services.provisioning_service import ProvisioningService

employee = SimpleNamespace(
    email="ashrith@example.com"
)

service = ProvisioningService()

results = service.provision_employee(employee)

print(results)