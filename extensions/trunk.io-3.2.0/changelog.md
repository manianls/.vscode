# Changelog

## [3.2.0] - 2022-09-26

### Added

- Provide support for Trunk Actions

### Fixed

- reduced LSP restart frequency
- fixed bug where incorrect diagnostics were occasionally shown in the tree view
- fixed bug where unspecified status was shown for lint jobs for files in the tree view

## [3.1.1] - 2022-07-19

### Fixed

- Updated LSP client dependency to the version that contains important bug fixes.

## [3.1.0] - 2022-07-18

### Added

- Removed delay between changing file and Trunk linting it.
- Improved visualization of formatting errors.
- Unified naming for Trunk VSCode commands.

### Fixed

- Fixed bug where outdated diagnostics would not be cleared when file is changed.
- Fixed bug where file content could be corrupted during auto-formatting under some conditions.

## [3.0.0] - 2022-05-13

### Added

- `trunk` command is now available in VSCode terminal (may require relaunch).
- Added compatibility with `git-worktree`.
- Trunk init and upgrade commands are now executed with VSCode terminal.
- Improved restart logic when config file has been changed.
- Improved upgrade notifications.
- Trunk utility directories are now hidden by default (`.trunk/out` and `.trunk/dev-out`).

### Fixed

- Fixed problem where reloading VSCode window or workspace may result in memory leaking.
- Fixed problem where changing branch may result in extension failure.
- Fixed problem leading to showing incorrect state in side panel.

## [0.2.1] - 2022-02-01

### Fixed

- Show upgrade notification for CLI < 0.6.0.

## [0.2.0] - 2022-01-24

### Added

- Added ability to pause Trunk linter (requires Trunk CLI >= 0.6.0).
- Added visualization of linter jobs (requires Trunk CLI >= 0.6.0).
- Updated file status icons.

### Fixed

- Fixed bug in sending notification allowing to upgrade Trunk CLI to the most recent version.
- Fixed bug where Trunk could start pushing diagnostics to VSCode before it's ready.
- Fixed bug in decoding URIs.

## [0.1.8] - 2021-12-20

### Added

- Trunk now checks version compatibility and reports if extension has to be upgraded.

### Fixed

- Fixed problem where VSCode extension would crash after upgrading Trunk to `0.4.3-beta`.

## [0.1.7] - 2021-12-14

### Fixed

- Adjusted inline decorators style.
- Configuration keys were updated in a non-backwards compatible way (see Configuration section in
  README for details).

## [0.1.6] - 2021-12-10

### Added

- Added support for inline diagnostics decorations (can be controlled using
  `trunk.trunkInlineDecoratorsDisabled`).
- Added more descriptive information about remote Linux/OSX or WSL support in Trunk extension.

### Fixed

- Fixed bug where diagnostics was not showing up in Output tab.
- Fixed bug where issue with severity `Information` was rendered as `Hint`.
- Fixed bug where extension might hang due to a conflict with `./tools/trunk` or `./trunk` scripts
  in repository.
- Improved retry logic for certain category of transient failures.

## [0.1.5] - 2021-12-01

### Added

- Existing and non-blocking issues now visually differentiated from blocking issues (this will be
  fully enabled in Trunk 0.3.2-beta release).

### Fixed

- Fixed bug where diagnostics from some VSCode extensions may cause failure in LSP-server.
- Improved managing of VSCode resources.
- Improved detection mechanism for changes in configuration files.
- Fixed bug in handling certain type of LSP shutdown events.
- Fixed bug in upgrade command.

## [0.1.4] - 2021-12-01

### Added

- Added feedback panel.

### Fixed

- Fixed bug where files outside of the workspace were not identified as external.
- Improved handling of some edge cases in LSP protocol.
- Fixed bug in gracefully handling LSP-server shutdowns.

## [0.1.3] - 2021-11-30

### Fixed

- Improved flow for upgrading trunk
- Introduced minimum trunk cli version requirement to use the trunk vscode extension (0.3.1-beta for
  now)
- Improved wording for initializing

## [0.1.2] - 2021-11-27

### Fixed

- Documentation has been updated.

## [0.1.1] - 2021-11-26

### Fixed

- Fixed bug that would cause init command to stuck in certain cases.

## [0.1.0] - 2021-11-26

### Added

- New icons!
- Extension now automatically reloads LSP-server when configuration in `.trunk` has changed.
- Extension shows user-friendly instructions when configuration file has errors.
- Notifications about errors caused by LSP-server now contain issue IDs.
- Status item in the bottom right corner now shows version of Trunk.
- Trunk installation flow in VSCode now contains instructions.
- Diagnostic message error code URL support was added to more linters.

### Fixed

- Fixed bug leading to showing "linting in progress.." when Trunk is idle.
- Fixed bug leading to generating incorrect autofix content for some linters.
- Fixed bug leading to detecting incorrect workspace path when VSCode is started not from a root.
- Fixed bug leading to crash when opening empty file.
- When Windows is detected, Trunk now shows correct error message.
- Improved logic that handles LSP server reconnects and restarts.

## [0.0.5] - 2021-11-16

### Added

- Diagnostic messages now contain URLs to linter documentation for error codes.
- Auto-fixes now can be applied using QuickFix overlay in the editor.
- Result of trunk-init command called from the extension is now presented to the user.
- Trunk CLI now can be installed using button in the extension.

### Fixed

- Minimum required version of Trunk is now 0.1.31.
- Fixed bug in displaying issue icons in the side panel.
- Fixed bug where file names for Clippy and other linters were displayed incorrectly.
- Fixed various bugs related to showing incorrect messages in the status bar.
- Retry and timeout logic has been adjusted.

## [0.0.4] - 2021-11-05

### Added

- This CHANGELOG file.
- New-user flow.
- NCC-based release process with minification step.
- Errors now highlighted under the full line.

### Fixed

- Fixed bug where "Format Document" option was presented for every error.
- Fixed bug where formatting issues were not showing linter name.
- Fixed bug where line position was not calculated correctly for some linters.
- Corrected context menu text for diagnostics.
- Bootstrap commands were renamed into "initialize" to match CLI.
