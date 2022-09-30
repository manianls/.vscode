#!/bin/bash
# init dbus
mkdir -p /var/run/dbus &&
  dbus-daemon --config-file=/usr/share/dbus-1/system.conf &&
  # setup git config
  git config --global user.email "horton@whoville.io" &&
  git config --global user.name "Horton" &&
  # install trunk launcher
  mv trunk /usr/bin/trunk &&
  # run the test
  yarn install &&
  yarn test:headless
