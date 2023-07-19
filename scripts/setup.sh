#!/bin/bash

install_nvm() {
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
}

update_nvm() {
  cd "$NVM_DIR" && git fetch origin && git checkout `git describe --abbrev=0 --tags`
}

load_nvm() {
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
}

install_node() {
  nvm install "$1"
}

install_yarn_with_corepack() {
  curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --rc
}

update_node() {
  nvm install node --reinstall-packages-from=node
}

if [ ! -d "$HOME/.nvm" ]; then
  install_nvm
fi

load_nvm

if [ ! -x "$(command -v yarn)" ]; then
  install_yarn_with_corepack
fi

if [ $# -eq 0 ]; then
  update_node
else
  install_node "$1"
fi

yarn install
yarn build
