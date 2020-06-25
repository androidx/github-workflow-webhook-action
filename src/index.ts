import core = require('@actions/core');
import github = require('@actions/github');
import { gretch } from 'gretchen';


async function deliver(url: string, secret: string, payload: string) {
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
  core.debug(`Delivering ${JSON.stringify(requestBody)} to ${url}`);
  const response = await gretch(url, {
    method: 'POST',
    headers: {
      'X-GitHub-Secret': `${secret}`
    },
    cache: 'no-cache',
    redirect: 'follow',
    body: JSON.stringify(requestBody)
  }).flush();

  return response;
}

(async function () {
  try {
    const url = core.getInput('webhook-url');
    const secret = core.getInput('webhook-secret');
    const payload = core.getInput('webhook-payload');
    const result = await deliver(url, secret, payload);
    console.log(`Result ${result.status}: ${result.response.status}`);
    core.debug(`Result ${result.status}: ${result.response.statusText}`);
    core.setOutput('status', result.status);
    core.setOutput('statusText', result.response.statusText);
  } catch (error) {
    console.log('Unable to deliver Web Hook', error);
    core.setFailed(`Unable to deliver Web Hook ${error}`);
  }
})();
