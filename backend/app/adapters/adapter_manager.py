from app.adapters.github_adapter import GitHubAdapter
from app.adapters.google_adapter import GoogleAdapter
from app.adapters.slack_adapter import SlackAdapter
from app.adapters.base_adapter import BaseAdapter


class AdapterManager:

    def __init__(self):
        self.adapters = {
            "github": GitHubAdapter(),
            "slack": SlackAdapter(),
            "google": GoogleAdapter(),
        }

    def get_all_adapters(self):
        return self.adapters.values()

    def get_adapter(self, provider: str):
        return self.adapters.get(provider.lower())