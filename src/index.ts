import core = require('@actions/core');
import github = require('@actions/github');
import axios, { AxiosPromise } from 'axios';

async function deliver(url: string, secret: string, payload: string): Promise<AxiosPromise<{}>> {
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

  core.info(`Delivering ${JSON.stringify(requestBody)} to ${url}`);
  const response = axios({
    method: 'POST',
    headers: {
      'X-GitHub-Secret': `${secret}`
    },
    data: requestBody
  });

  return response;
}

(async function () {
  try {
    const url = core.getInput('url', { required: true });
    const secret = core.getInput('secret', { required: true });
    const payload = core.getInput('paylod');
    core.info(`Making a HTTP POST request to ${url}`);
    const result = await deliver(url, secret, payload);
    core.info(`Result ${result.status}: ${result.statusText}`);
    core.setOutput('status', result.status);
    core.setOutput('statusText', result.statusText);
  } catch (error) {
    core.setFailed(`Unable to deliver Web Hook ${error}`);
  }
})();
