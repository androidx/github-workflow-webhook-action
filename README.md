# GitHub Workflow Webhook Action

A Github Workflow Webhook that makes a `HTTP POST` request to the given `webhook-url` with a preconfigured `webhook-secret`.

## Usage

Use a snippet like this to setup the Webhook step in your `YAML` file.

```yaml
- name: 'WebHook'
  uses: 'tikurahul/github-workflow-webhook-action@master'
  with:
    webhookUrl: 'https://your-webhook-url'
    webhookSecret: 'A secret'
    webhookPayload: '{"platform":"macOS"}'
```

## Additional Information

The secret is delivered using an HTTP Header `X-GitHub-Secret`.
