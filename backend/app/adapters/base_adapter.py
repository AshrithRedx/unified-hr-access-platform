from abc import ABC, abstractmethod


class BaseAdapter(ABC):

    @abstractmethod
    def provision_user(self, employee):
        pass

    @abstractmethod
    def revoke_user(self, employee):
        pass