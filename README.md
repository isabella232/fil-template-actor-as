# Fil AssemblyScript Template Actor

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GithubActions](https://github.com/Zondax/fil-boilerplate-actor-as/actions/workflows/main.yaml/badge.svg)](https://github.com/Zondax/fil-boilerplate-actor-as/blob/master/.github/workflows/main.yaml)


---

![zondax_light](docs/assets/zondax_light.png#gh-light-mode-only)
![zondax_dark](docs/assets/zondax_dark.png#gh-dark-mode-only)

_Please visit our website at [zondax.ch](https://www.zondax.ch)_

---

This repository is meant to serve as a base starting point for you to create your own smart contracts.
You can fork it and clone it to your PC, or use GitPod to edit it on the web browser. In any case, it has all
basic stuff to start working on your project. 


## Install 
To install all the dependencies required to compile your project, just run `make install_deps`

## Develop
Now you should add all the logic you want your smart contract to do. Please, you should check the documentation on [the offical website](https://docs.zondax.ch).

## Build
To build your project, you just need to run `make build`. The binary will be located inside `build` folder, along with the ABI definition, a Typescript definition
and pre-compiled files with the actual code that got compiled. 

## Test
- Set environmental variables by creating an `.env` file, using the `.env.example` as template
- Create test cases for each method you want to test. Installment and instantiation steps are there for you. Remember you will need to add your arguments in the instantiation
test case if there are any.
- Run them using `make tests`
