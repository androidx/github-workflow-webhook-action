# GitHub Workflow Webhook Action

A Github Workflow Webhook that makes a `HTTP POST` request to the given `url` with a preconfigured `secret`.

## Usage

Use a snippet like this to setup the Webhook step in your `YAML` file.

```yaml
- name: 'WebHook'
  uses: 'tikurahul/github-workflow-webhook-action@master'
  with:
    url: 'https://your-webhook-url'
    secret: 'A secret'
    payload: '{"platform":"macOS"}'
```

Your webhook endpoint will get a payload which looks something like:

```json
{
  "workflow":"workflowName",
  "repo":{"owner":"owner","repo":"repoName"},
  "ref":"refs/heads/branch",
  "sha":"sha",
  "pullRequestUrl": "https://github.com/owner/repo/pulls/number",
  "platform":"macOS"
}
```

## workflow_run targets
When this action is invoked in a `workflow_run` trigger, `repo`, `ref` and `sha` will be from the context of the workflow run that triggered current workflow run.

## Additional Information

The secret is delivered using an HTTP Header `X-GitHub-Secret`.

## Building

Setup: `npm install`
Updating dist: `npm run-script --silent build`
