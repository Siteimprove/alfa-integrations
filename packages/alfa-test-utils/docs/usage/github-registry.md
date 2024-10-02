# Connecting to the Github registry

To install npm packages from the Github registry, you need to configure the repository to read packages from it; and to configure each developer (and CI/CD) environment to authenticate with the Github registry. The exact steps depend on the package manager you use. See [Github documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package) for more details.

## Using npm

### Configuring the repository

Add 
```
@siteimprove:registry=https://npm.pkg.github.com/siteimprove
``` 
in the repository's `.npmrc` file (and commit it).

### Authenticating with the Github registry

Each developer needs to [create a Github PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) with `read: packages` permissions (enable SSO for it if your organisation uses SSO), and add it to their **personal** `.npmrc` file:
```shell
$ npm config set //npm.pkg.github.com/:_authToken=<your_token_here>
```

If this doesn't work, edit the `.npmrc` file in your home directory (`C:\Users\username`, `~`, `$HOME`, … depending on the OS), and add the line:
```
//npm.pkg.github.com/:_authToken=<your_token_here> 
```

### Authentication within a CI/CD tool

Similarly, CI/CD tools need a Github PAT and need to run
```shell
$ npm config set //npm.pkg.github.com/:_authToken=<your_token_here>
```
before installing Alfa packages. If using Github actions, the `${{ github.token }}` secret can be used as the PAT (this may require to add `packages: read` to [the permission array](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/assigning-permissions-to-jobs) of the action or job).

## Using yarn

### Configuring the repository

Add
```
npmScopes:
    Siteimprove:
    npmRegistryServer: "https://npm.pkg.github.com"
``` 
in the repository's `.yarnrc.yml` file (and commit it).

### Authenticating with the Github registry

Each developer needs to [create a Github PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) with `read: packages` permissions (enable SSO for it if your organisation uses SSO), and add it to their **personal** `.yarnrc.yml` file:
```shell
$ yarn config set npmScopes.siteimprove.npmAuthToken <your_token_here>
```
If this doesn't work, edit the `.yarnrc.yml` file in your home directory (`C:\Users\username`, `~`, `$HOME`, … depending on the OS), and add:
```
npmRegistries: 
  "https://npm.pkg.github.com": 
    npmAuthToken: <your_token_here>
 
npmScopes: 
  Siteimprove: 
    npmAuthToken: <your_token_here> 
```

### Authentication within a CI/CD tool

Similarly, CI/CD tools need a Github PAT and need to run
```shell
$ yarn config set npmScopes.siteimprove.npmAuthToken <your_token_here>
```
before installing Alfa packages. If using Github actions, the `${{ github.token }}` secret can be used as the PAT (this may require to add `packages: read` to [the permission array](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/assigning-permissions-to-jobs) of the action or job).


```bash
