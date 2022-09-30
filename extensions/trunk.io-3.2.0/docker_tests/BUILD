load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")
load("@io_bazel_rules_docker//container:container.bzl", "container_image", "container_layer")
load("//toolchain/bzl:binary_wrapper.bzl", "test_wrapper")
load("//toolchain/docker:run.bzl", "trunk_container_run_and_commit")

trunk_container_run_and_commit(
    name = "base_image",
    commands = [
        "apt-get update",
        "apt-get install -y " + " ".join([
            "curl",
            "gpg",
            "xvfb",
            "libnss3",
            "libatk-bridge2.0-0",
            "libgtk-3.0",
            "libxshmfence-dev",
            "libasound2-dev",
            "apt-transport-https",
            "dbus",
            "libgbm1",
            "software-properties-common",
            "npm",
        ]),
        "npm install n -g",
        "n 16.13.2",
        "hash -r",
        "npm install yarn -g",
    ],
    image = "//trunk/cli/docker_tests/container:trunk_image.tar",
    tags = ["manual"],
)

pkg_tar(
    name = "pkg",
    srcs = [
        "vscode_user_settings",
    ],
    strip_prefix = ".",
)

container_layer(
    name = "cli_layer",
    symlinks = {
        # New launcher
        "/root/.cache/trunk/cli/0.0.0-linux-x86_64/trunk": "/app/trunk/cli/cli",
        # Old launcher
        "/root/.cache/trunk/cli/0.0.0/trunk": "/app/trunk/cli/cli",
    },
    tars = ["//trunk/cli:cli_image"],
)

container_image(
    name = "test_image",
    testonly = True,
    base = ":base_image",
    directory = "test",
    entrypoint = ["/test/entrypoint.sh"],
    env = {
        "DBUS_SESSION_BUS_ADDRESS": "unix:path=/var/run/dbus/system_bus_socket",
        "DBUS_SYSTEM_BUS_ADDRESS": "unix:path=/var/run/dbus/system_bus_socket",
        "RELEASE_TEST": "true",
        "TRUNK_MIXPANEL": "off",
        "TRUNK_SENTRY": "dev",
    },
    files = [
        "entrypoint.sh",
        "//tools:launcher_script",
    ],
    layers = [
        "//trunk/cli/docker_tests/container:user_trunk_layer",
        "//trunk/cli/docker_tests/container:trunk_local_files",
        ":cli_layer",
    ],
    legacy_run_behavior = False,
    tags = [
        "manual",
        "requires-network",
    ],
    tars = [
        "//trunk/vscode:extension-pkg",
        ":pkg",
    ],
    workdir = "/test",
)

test_wrapper(
    name = "image_test",
    size = "enormous",
    tags = [
        "manual",
        "requires-network",
    ],
    target = ":test_image",
)
