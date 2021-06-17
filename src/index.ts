import fs = require('fs');
import core = require('@actions/core');
import github = require('@actions/github');
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

interface Repo {
  repo: string;
  owner: string;
}

async function deliver(url: string, secret: string, payload: string): Promise<AxiosPromise<{}>> {
  const workflow = github.context.workflow;
  const repo = github.context.repo;
  const ref = github.context.ref;
  const sha = github.context.sha;
  const workFlowPaylod = github.context.payload;
  const { GITHUB_RUN_ID } = process.env;
  let contextUrl: string | null = null;

  // Log the actual github context for debugging
  core.info(`GitHub Context ${JSON.stringify(github.context)}`);

  if (GITHUB_RUN_ID) {
    contextUrl = `https://github.com/${repo.owner}/${repo.repo}/actions/runs/${GITHUB_RUN_ID}`;
    core.info(`GitHub Context ${contextUrl}`);
  }
  // If this workflow is triggered by another workflow, use that run's parameters
  const targetWorkflowRun = workFlowPaylod?.workflow_run
  core.info(`Target workflow run: ${JSON.stringify(targetWorkflowRun)}`)
  const headSha = workFlowPaylod?.pull_request?.head?.sha ?? targetWorkflowRun?.head_sha ?? sha;
  const sender = workFlowPaylod?.sender?.login;
  let refFromTargetWorkflow: string | null = null;
  if (targetWorkflowRun?.head_branch) {
    refFromTargetWorkflow = `refs/heads/${targetWorkflowRun.head_branch}`
  }

  let repoFromTargetWorkflow: Repo | null = null;
  if (targetWorkflowRun?.head_repository?.owner?.login &&
    targetWorkflowRun?.head_repository?.name) {
    repoFromTargetWorkflow = {
      "owner": targetWorkflowRun.head_repository.owner.login,
      "repo": targetWorkflowRun.head_repository.name
    }
  }
  core.info(`ref from workflow target: ${refFromTargetWorkflow}`)
  // Notify build failures if its copybara-bot merging the changes.
  const notifyOnFailure = sender === 'copybara-service[bot]';

  const additionalPayload = JSON.parse(payload);
  const requestBody = {
    'workflow': workflow,
    'repo': repoFromTargetWorkflow ?? repo,
    'ref': refFromTargetWorkflow ?? ref,
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
