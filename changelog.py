import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
REPO_OWNER = 'bgoonz'
REPO_NAME = 'React2023'
TOKEN = os.getenv('GITHUB_TOKEN')

BASE_URL = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}'
HEADERS = {
    'Authorization': f'token {TOKEN}',
    'Accept': 'application/vnd.github.v3+json'
}


def get_commits():
    page = 1
    all_commits = []

    while True:
        url = f'{BASE_URL}/commits?page={page}&per_page=100'  # Maximum per page is 100
        response = requests.get(url, headers=HEADERS)

        if response.status_code != 200:
            raise ValueError("Error fetching commits from GitHub")

        if not response.json():  # If empty, we've reached the last page
            break

        all_commits.extend(response.json())
        page += 1

    return all_commits


def generate_markdown(commits):
    markdown = "# Changelog\n\n"

    for commit in commits:
        sha = commit['sha']
        message = commit['commit']['message']
        commit_url = commit['html_url']

        markdown += f"- [{message}]({commit_url}) - `{sha[:7]}`\n"

    return markdown


def write_to_file(content):
    with open("Changelog.md", "w") as file:
        file.write(content)


if __name__ == "__main__":
    commits = get_commits()
    markdown = generate_markdown(commits)
    write_to_file(markdown)
    print("Changelog.md has been generated!")
