import core = require('@actions/core');
import github = require('@actions/github');
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

async function deliver(url: string, secret: string, payload: string): Promise<AxiosPromise<{}>> {
  const workflow = github.context.workflow;
  const repo = github.context.repo;
  const ref = github.context.ref;
  const sha = github.context.sha;
  const workFlowPaylod = github.context.payload;

  // Log the actual workflow payload for debugging
  core.info(`Workflow payload ${JSON.stringify(workFlowPaylod)}`);

  const headSha = workFlowPaylod?.pull_request?.head?.sha ?? sha;
  const pullRequestUrl = workFlowPaylod?.pull_request?.html_url;
  const sender = workFlowPaylod?.sender?.login;
  // Notify build failures if its copybara-bot merging the changes.
  const notifyOnFailure = sender === 'copybara-service[bot]';

  const additionalPayload = JSON.parse(payload);
  const requestBody = {
    'workflow': workflow,
    'repo': repo,
    'ref': ref,
    'sha': headSha,
    'notifyOnFailure': notifyOnFailure,
    ...additionalPayload
  };

  if (pullRequestUrl) {
    requestBody['pullRequestUrl'] = pullRequestUrl;
  }

  core.info(`Delivering ${JSON.stringify(requestBody)} to ${url}`);

  const requestConfig: AxiosRequestConfig = {
    url: url,
    method: 'POST',
    data: requestBody
  };
  if (secret) {
    requestConfig['headers'] = {
      'X-GitHub-Secret': `${secret}`
    }
  }
  const response = axios(requestConfig);
  return response;
}

(async function () {
  try {
    const url = core.getInput('url');
    const secret = core.getInput('secret');
    const payload = core.getInput('payload');
    core.info(`Making a HTTP POST request to ${url}`);
    const result = await deliver(url, secret, payload);
    core.info(`Result ${result.status}: ${result.statusText}`);
    core.setOutput('status', result.status);
    core.setOutput('statusText', result.statusText);
  } catch (error) {
    core.setFailed(`Unable to deliver Web Hook ${error}`);
  }
})();
