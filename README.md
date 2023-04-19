<p align="center">
  <img
    src="/.github/logo.svg"
    width="96"
    height="96"
  />
</p>

<h1 align="center">simenandre/pulumi-config</h1>

<p align="center">
  <strong>Update Pulumi configuration with Github Actions</strong>
</p>

\
This [Github Actions][] uses [Pulumi Automation API][] to update your stack configuration.
Useful when you need to automate changes!

[github actions]: https://github.com/features/actions
[pulumi automation api]: https://www.pulumi.com/blog/automation-api/

---

Built to make it easier and safer to update Pulumi configurations with Github
Actions. Pulumi CLI is no longer needed – your workflow gets less cluttered and
easier to read.

- ⚙️ Uses Pulumi to update config.
- 🔒 Supports secrets! (also hidden from log output)
- 📤 Reads configuration as output

## Getting Started

```yaml
jobs:
  bump-tag:
    name: Update tag
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: simenandre/pulumi-config@v2
        with:
          stack-name: dev
          key: unleash.tag
          value: ${{ steps.something.new-tag }}
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

## Configuration

- `stack-name`: Which stack you want to apply to, e.g. `dev`. (Required)
- `key`: Set key value. e.g: `service-name.tag`
- `value`: Value to set
- `work-dir`: Location of your Pulumi files (Default is `./`)
- `secret`: Store the config value as secret and hide it from output (Default is
  `false`)
- `cloud-url`: A cloud URL to log in to.

## Outputs

If `key` is set, the function will return that key as a simple output. That
could look something like this:

```yaml
jobs:
  get-tag:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: simenandre/pulumi-config@v2
        id: config
        with:
          stack-name: dev
          key: unleash.tag
      - run: echo ${{ steps.config.outputs.key }}
```

But you can also get the whole configuration, like this:

```yaml
jobs:
  get-tag:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: simenandre/pulumi-config@v2
        id: config
        with:
          stack-name: dev
          key: unleash.tag
      - run: echo ${{ fromJson(steps.config.outputs.config).unleash.tag }}
```

## Contribute

Feel free to open an issue or pull request. The Todoist Action is still
experimental, help us get is stable! Feedback is much appreciated!
