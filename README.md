# GitHub Workflow Webhook Action

A Github Workflow Webhook that makes a `HTTP POST` request to the given `webhook-url` with a preconfigured `webhook-secret`.

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
  "platform":"macOS"
}
```

## Additional Information

The secret is delivered using an HTTP Header `X-GitHub-Secret`.
