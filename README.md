# GitHub Status Check Runner

CLI utility for updating GitHub status checks.

## Acknowledgments

Inspired by the [test-runner script](https://github.com/coxmediagroup/member-center/blob/28d3fa0d0df175cc98277e0954aeb6a1c10d2412/bin/test-runner.js) written by [willist](https://github.com/willist)

## Installation
npm i -g coxmediagroup/github-status-check-runner

## Example

```bash
ghsc \
  --owner coxmediagroup \
  --repository github-status-check-runner \
  --token $GITHUB_TOKEN \
  --'(mock) unit tests'  "echo 'simulating a failure' >&2 && false" \
    '(mock) linting'     "echo 'success...'" \
    '(mock) doc build'   "echo A-OK"
```

[Results](https://github.com/coxmediagroup/github-status-check-runner/pull/1)
