import core = require('@actions/core');
import github = require('@actions/github');

async function deliver(url: string, secret: string, payload: string): Promise<Response> {
  const workflow = github.context.workflow;
  const repo = github.context.repo;
  const ref = github.context.ref;
  const sha = github.context.sha;

  const additionalPayload = JSON.parse(payload);
  const requestBody = {
    'workflow': workflow,
    'repo': repo,
    'ref': ref,
    'sha': sha,
    ...additionalPayload
  };

  console.log(`Delivering ${requestBody} to ${url}`);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-GitHub-Secret': `${secret}`
    },
    cache: 'no-cache',
    redirect: 'follow',
    body: JSON.stringify(requestBody)
  });

  return response;
}

(async function () {
  try {
    const url = core.getInput('webhook-url');
    const secret = core.getInput('webhook-secret');
    const payload = core.getInput('webhook-payload');
    const result = await deliver(url, secret, payload);
    console.log(`Result ${result.status}: ${result.statusText}`);
    core.setOutput('status', result.status);
    core.setOutput('statusText', result.statusText);
  } catch (error) {
    console.log('Unable to deliver Web Hook', error);
  }
})();
