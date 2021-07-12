<p align="center">
  <img
    src="/.github/logo.svg"
    width="96"
    height="96"
  />
</p>

<h1 align="center">cobraz/pulumi-config</h1>

<p align="center">
  <strong>Update Pulumi configuration with Github Actions</strong>
</p>

\
This [Github Actions][] uses [Pulumi Automation API][] to update your
stack configuration. Useful when you need to automate changes!

**Warning**: No release yet! We are actively doing development, so expect
things to fail. Development is done publicly on Github, so help is very much
appreciated!

[github actions]: https://github.com/features/actions
[pulumi automation api]: https://www.pulumi.com/blog/automation-api/

---

Built to make it easier and safer to update Pulumi configurations with
Github Actions. Pulumi CLI is no longer needed – your workflow gets less
cluttered and easier to read.

- ⚙️ Uses Pulumi to update config.
- 🔒 Supports secrets! (also hidden from log output)

## Getting Started

```yaml
jobs:
  bump-tag:
    name: Update tag
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: cobraz/pulumi-config@main
        with:
          stack-name: dev
          key: unleash.tag
          value: ${{ steps.something.new-tag }}
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

## Configuration

- `stack-name`: Which stack you want to apply to, e.g. `dev`. (Required)
- `key`: Set key value. e.g: `service-name.tag` (Required)
- `value`: Value to set (Required)
- `work-dir`: Location of your Pulumi files (Default is `./`)
- `secret`: Store the config value as secret and hide it from output (Default is `false`)
- `cloud-url`: A cloud URL to log in to.

## Contribute

Feel free to open an issue or pull request. The Todoist Action is still
experimental, help us get is stable! Feedback is much appreciated!