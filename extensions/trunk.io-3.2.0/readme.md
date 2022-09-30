# Trunk VS Code Extension

![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/trunk.io?logo=visualstudiocode)
![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/trunk.io?logo=visualstudiocode)
[![slack](https://img.shields.io/badge/slack-slack.trunk.io-blue?logo=slack)](https://slack.trunk.io)
[![docs](https://img.shields.io/badge/docs.trunk.io-7f7fcc?label=docs&logo=readthedocs&labelColor=555555&logoColor=ffffff)](https://docs.trunk.io)
![platform](https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20WSL2-lightgrey)

[Trunk](https://docs.trunk.io) is an extensible, fast, meta code checker and formatter with
extraordinary features like caching, preexisting issue detection, a daemon, a language server, and
githook management. It's managed completely via config-as-code, so you can easily pin your repo to
specific versions of your linters, formatters, and static analyzers.

Don't install a dozen different linter and formatting plugins, just use Trunk. Level up your code
quality and consistency today.

![Trunk VSCode Extension](https://static.trunk.io/assets/trunk_vscode.gif)

## Get Started

Before using the Trunk VSCode extension you need to initialize trunk in your repo. The linters
enabled for your repo, their versions, and the version of trunk itself, are all stored in your
repo's `.trunk/trunk.yaml` file.

Press the 'Initialize Trunk' button in the Trunk side panel, to get started

![initialize trunk](https://static.trunk.io/assets/vscode_init_trunk.png)

Or, you can initialize via the command line: Just [install](https://docs.trunk.io) the Trunk CLI and
run `trunk init` in your repo.

- Install Trunk → `curl https://get.trunk.io -fsSL | bash` ([docs](https://docs.trunk.io))
- Setup Trunk in your repo → `trunk init` ([docs](https://docs.trunk.io))
- See and fix issues as you code in VSCode → **You're in the right place 👍**

## Linters / Formatters

We integrate new linters every release. Stop by on [slack](https://slack.trunk.io/) and let us know
what you'd like next!

Official docs: [here](https://docs.trunk.io)

| Language                           | Linters                                                                                                                                                                     |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All                                | `codespell`, `cspell`, `gitleaks`, `git-diff-check`                                                                                                                         |
| Ansible                            | `ansible-lint`                                                                                                                                                              |
| Bash                               | `shellcheck`, `shfmt`                                                                                                                                                       |
| Bazel, Starlark                    | `buildifier`                                                                                                                                                                |
| C, C++, Protobuf                   | `clang-format`, `clang-tidy`, `include-what-you-use`                                                                                                                        |
| Cloudformation                     | `cfnlint`                                                                                                                                                                   |
| CSS, SCSS                          | `stylelint`                                                                                                                                                                 |
| Cue                                | `cue-fmt`                                                                                                                                                                   |
| Docker                             | `hadolint`                                                                                                                                                                  |
| Dotenv                             | `dotenv-linter`                                                                                                                                                             |
| GitHub                             | `actionlint`                                                                                                                                                                |
| Go                                 | `gofmt`, `golangci-lint`, `semgrep`, `goimports`                                                                                                                            |
| HAML                               | `haml-lint`                                                                                                                                                                 |
| Java                               | `semgrep`                                                                                                                                                                   |
| JavaScript, TypeScript, YAML, JSON | `eslint`, `prettier`, `semgrep`                                                                                                                                             |
| Kotlin                             | `detekt`<sup><a href="#note-detekt">1</a></sup>, `detekt-explicit`<sup><a href="#note-detekt">1</a></sup>, `detekt-gradle`<sup><a href="#note-detekt">1</a></sup>, `ktlint` |
| Markdown                           | `markdownlint`                                                                                                                                                              |
| Protobuf                           | `buf-breaking`, `buf-lint`                                                                                                                                                  |
| Python                             | `autopep8`, `bandit`, `black`, `flake8`, `isort`, `mypy`, `pylint`, `semgrep`, `yapf`                                                                                       |
| Ruby                               | `brakeman`, `rubocop`, `rufo`, `semgrep`, `standardrb`                                                                                                                      |
| Rust                               | `clippy`, `rustfmt`                                                                                                                                                         |
| Scala                              | `scalafmt`                                                                                                                                                                  |
| SQL                                | `sql-formatter`, `sqlfluff`                                                                                                                                                 |
| SVG                                | `svgo`                                                                                                                                                                      |
| Terraform                          | `terraform` (`validate` and `fmt`), `tflint`<sup><a href="#note-tflint">2</a></sup>                                                                                         |
| TOML                               | `taplo`                                                                                                                                                                     |
| YAML                               | `prettier`, `semgrep`, `yamllint`                                                                                                                                           |

<sup><ol>

<li><a aria-hidden="true" tabindex="-1" class="customAnchor" id="note-detekt"></a>
Support for Detekt is under active development; see <a href="#detekt">its docs</a> for more
details.
</li>

<li><a aria-hidden="true" tabindex="-1" class="customAnchor" id="note-tflint"></a>
<a href="https://github.com/terraform-linters/tflint/blob/master/docs/user-guide/module-inspection.md">Module inspection</a>, <a href="https://github.com/terraform-linters/tflint-ruleset-aws/blob/master/docs/deep_checking.md">deep Checking</a>, and setting variables are not currently supported.
</li>

</ol></sup>

<br/>

## How it works

Trunk downloads everything it needs to run on demand and caches it in `~/.cache/trunk`. We run
linters in parallel, in the background, and provide a
[language server](https://microsoft.github.io/language-server-protocol) interface to show results
from VSCode via the Trunk VSCode Extension.

## Linting and formatting principles

- Autoformat every file. _Every_ file.
- Every file in your repo should have at least one tool checking its validity
- You should always get the same results locally as on CI

## Features

### Initialization

Trunk manages all configuration as code in your repo's `.trunk/trunk.yaml` file. When you first
start trunk you'll get a button to initialize it. This scans your repo for which linters and
formatters are applicable to you and sets up an initial `.trunk/trunk.yaml` file for you to use. See
the [docs](https://docs.trunk.io) for more details.

![trunk init](https://static.trunk.io/assets/vscode_init_trunk.png)

### Trunk Side Panel

On the side bar to the left you'll the Trunk icon, which you can use to open the side panel to view
issues. By default, issues are populated for every file you open as well as any modified files.

![side panel](https://static.trunk.io/assets/vscode_side_panel.png)

Trunk also shows Trunk Check Issues in a panel in the File Explorer, but you can hide it if you
wish:

![hide explorer panel](https://static.trunk.io/assets/vscode_hide_explorer_panel.jpg)

### Formatting

#### Don't install 15 formatter plugins, just use trunk

Ever hit one of these problems?

- A formatter plugin doesn't actually install the formatter for you
- Devs on your team all get slightly different formatting results because you're running different
  versions of the formatters as vscode plugins
- Your formatting doesn't match what your CI lint job is expecting because you're running a
  different version of a formatter locally
- Your team mostly uses vscode with a committed workspace config w/ formatters, but some people
  don't use it, leaving your codebase inconsistent

That's what formatting via Trunk solves. Everyone on your team only has to install one plugin,
they're guaranteed to get the same results and run the same version of each formatter/linter, and
guaranteed to get the same results as your CI lint job (use the
[Trunk GitHub Action](https://github.com/marketplace/actions/trunk-check)!).

#### Configuration

None required! But, if you have multiple VSCode plugins installed which act as formatters, you can
choose which filetypes to set Trunk as the default formatter for by right clicking and selecting
'Format Document With...'

<img width="200px" src="https://static.trunk.io/assets/vscode_format_document_with.png"/>

Then 'Configure Default Formatter' and select 'Trunk'

<img width="600px" src="https://static.trunk.io/assets/vscode_configure_default_formatter.png"/>

Or, you can configure which formatter to prefer by editing your json settings (either user settings
or workspace settings) with:

```json
"[markdown]": {
  "editor.defaultFormatter": "trunk.io"
},
```

### Issue code documentation links

For many linters we support links to their docs per-issue in the tooltips for each issue:

![linter code docs](https://static.trunk.io/assets/vscode_doc_links.png)

### Ignoring Issues

Trunk supports a special syntax to ignore issues from any linter. See below for the format of
`trunk-ignore` comments.

![trunk-ignore](https://static.trunk.io/assets/vscode_ignore_issue.gif)

## Extras: Trunk CLI & GitHub Action

1. Install Trunk CLI → `curl https://get.trunk.io -fsSL | bash` ([docs](https://docs.trunk.io))
2. Locally check your changes for issues → `trunk check` ([docs](https://docs.trunk.io))
3. Locally format your changes → `trunk fmt` ([docs](https://docs.trunk.io))
4. Protect lint and format issues from leaking into main →
   [Trunk GitHub Action](https://github.com/marketplace/actions/trunk-check)

## Prereqs

None! Trunk manages linters and formatters for you via pinned versions in your repo's
`.trunk/trunk.yaml` file. You don't need to install any linters or configure the extension in any
way. We cache linters, formatters, and runtimes in `~/.cache/trunk`. Using a linter distributed as a
go module but you're not a go user? Don't worry about it, we handle it all 😉.

## How versioning works

After you `trunk init`, `trunk.yaml` will contain a pinned version of Trunk to use for your repo.
When you run trunk, it will automatically detect which version you should be running for a
particular repo and, if needed, download it, then run it. The trunk VSCode extension works the same
way: regardless of what repo you're in, the underlying version of trunk it runs is based on the
pinned version in your `trunk.yaml` file. Config-as-code 👍.

This means that **everyone working in a repo, using the `trunk` cli, the VSCode extension, or when
running on CI, all get the same results** because they're running the same version of trunk and the
same versions of all the linters/formatters. No more "doesn't happen on my machine". When you want
to upgrade to a newer version, just run `trunk upgrade` and commit the updated `trunk.yaml`.

## Suppressing Issues

Sometimes we want to deliberately tell a linter that, yes, I know what I'm doing, and yes, in any
other situation I should _not_ do this, but in this specific case it's fine. Maybe there's a
stand-in private key you're using for a test stack, or fixing the lint issue will actually make your
code less readable: whatever it is, you now need to figure out how to suppress a given lint issue.

`trunk` provides a simple, standardized mechanism to do this, saving you from having to look up the
linter-specific syntax for doing so:

```cpp {3}
struct FooBar {
  // trunk-ignore(clang-tidy/modernize-use-nullptr): this is a load-bearing NULL, see ISSUE-832
  void *ptr = NULL;
};
```

This tells `trunk` that the `clang-tidy` linter found a `modernize-use-nullptr` issue on the
highlighted line and that `trunk` should suppress this linter issue.

Comments are obviously not required:

```cpp {3}
struct FooBar {
  // trunk-ignore(clang-tidy/modernize-use-nullptr)
  void *ptr = NULL;
};
```

You can also omit the name of the check to simply tell `trunk` that all issues from a given linter
on a specific line should be suppressed:

```cpp {3}
struct FooBar {
  // trunk-ignore(clang-tidy)
  void *ptr = NULL;
};
```

`trunk-ignore` directives can also be placed at the end of the line on which they're suppressing
lint issues:

```cpp {2-3}
struct FooBar {
  void *ptr1 = NULL;  // trunk-ignore(clang-tidy/modernize-use-nullptr)
  void *ptr2 = NULL;  // trunk-ignore(clang-tidy)
};
```

If you need to suppress issues from multiple linters, `trunk-ignore` supports that too:

```cpp {4}
struct FooBar {
  // trunk-ignore(clang-tidy): ISSUE-914 explains why the `void *` type is needed
  // trunk-ignore(gitleaks,my-custom-linter/do-not-hardcode-passwords): see ISSUE-915
  void *super_secret_password = (void *)("915dr~S$Pzqod~oR*CrQ$/SQ@hbtQBked:CL@z!y]");
};
```

Supressing all issues in a file:

```cpp {2-5}
// trunk-ignore-all(clang-tidy)
struct FooBar {
  void *ptr1 = NULL;
  void *ptr2 = NULL;
};
```

Supressing all issues in block of code:

```cpp {3-4}
struct FooBar {
  // trunk-ignore-begin(clang-tidy)
  void *ptr1 = NULL;
  void *ptr2 = NULL;
  // trunk-ignore-end(clang-tidy)
};
```

Notice that a `trunk-ignore` directive applies not to the next line, but the next non-`trunk-ignore`
line (this only works for _preceding_ directives, not _trailing_ directives), and that you can use a
single directive for suppressing multiple checks.

### Specification

The syntax of a trunk-ignore directive is as follows:

```text
<trunk-ignore>      ::= "trunk-ignore(" <check-ids> ")" <optional-comment>
<check-ids>         ::= <check-id> <optional-check-id>
<optional-check-id> ::= "," <check-id>
<check-id>          ::= <linter-id> <optional-rule-id>
<optional-rule-id>  ::= "/" <rule-id>
<optional-comment>  ::= ": " <comment>
```

## Configuration

- `trunk.inlineDecorators` – allows to disable inline decorators for diagnostics.
- `trunk.inlineDecoratorsForAllExtensions` – allows to render inline decorators only for diagnostics
  that was generated by Trunk.

## Feature Requests & Bug Reports

Looking for another feature? Hit a bug? 🐛 [Let us know!](https://slack.trunk.io/)

## Development Status

Trunk is currently in beta. We're typically releasing new versions every other week. Expect some
bumps along the way, but give us lots of feedback, and we'll address your bugs and feature requests
swiftly.

For support and feedback, reach out on your company's Trunk slack connect channel, or our
[Trunk Community slack](https://slack.trunk.io). Thanks!

## Feedback

Join the [Trunk Community Slack](https://slack.trunk.io/). ❤️
