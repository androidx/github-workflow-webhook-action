import fs = require('fs');
import core = require('@actions/core');
import github = require('@actions/github');
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

async function deliver(url: string, secret: string, payload: string): Promise<AxiosPromise<{}>> {
  const workflow = github.context.workflow;
  const repo = github.context.repo;
  const owner = github.context.repo.owner;
  const ref = github.context.ref;
  const sha = github.context.sha;
  const workFlowPaylod = github.context.payload;
  const { GITHUB_RUN_ID } = process.env;
  let contextUrl: string | null = null;

  // Log the actual github context for debugging
  core.info(`GitHub Context ${JSON.stringify(github.context)}`);

  if (GITHUB_RUN_ID) {
    contextUrl = `https://github.com/${owner}/${repo}/runs/${GITHUB_RUN_ID}`;
    core.info(`GitHub Context ${contextUrl}`);
  }

  const headSha = workFlowPaylod?.pull_request?.head?.sha ?? sha;
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

  if (contextUrl) {
    requestBody['pullRequestUrl'] = contextUrl;
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
