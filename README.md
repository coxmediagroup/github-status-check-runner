# GitHub Status Check Runner

CLI utility for updating GitHub status checks.

## Motivation

A status check utility that can be run from a local environment without
having to implement a CI solution.

Could also be used as a single-purpose build-step in a custom CI solution.

## Requirements

* git
* Github User Access Token
* npm

## Quick Start (Development)

```bash
git clone git@github.com:coxmediagroup/github-status-check-runner.git
cd github-status-check-runner
npm install
npm run build
npm install -g
```

## Usage

```bash
ghsc \
  --owner coxmediagroup \
  --repository github-status-check-runner \
  --token $GITHUB_TOKEN \
  --context lint \
  -- \
  npm run --silent lint
```

[Results](https://github.com/coxmediagroup/github-status-check-runner/pull/1)

## Acknowledgments

Inspired by the [test-runner script](https://github.com/coxmediagroup/member-center/blob/28d3fa0d0df175cc98277e0954aeb6a1c10d2412/bin/test-runner.js) written by [willist](https://github.com/willist)
