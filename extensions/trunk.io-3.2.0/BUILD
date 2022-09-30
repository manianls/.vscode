load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

filegroup(
    name = "extension-files",
    srcs = [
        ".vscodeignore",
        ".yarnrc",
        "tsconfig.json",
        "package.json",
    ] + glob(
        ["src/**/*.ts"],
        exclude_directories = 0,
    ),
    visibility = ["//visibility:public"],
)

pkg_tar(
    name = "extension-pkg",
    srcs = [
        ".vscodeignore",
        ".yarnrc",
        "tsconfig.json",
        "package.json",
        "//trunk/vscode/docker_tests/suite",
    ] + glob(
        ["src/**/*.ts"],
    ),
    strip_prefix = ".",
    visibility = ["//visibility:public"],
)
