<div style="font-size: 17px;background: black;padding: 2rem;">

**npm (Node Package Manager)** is a package manager for JavaScript, and it is the default package manager for the `Node.js` runtime environment. `npm` boasts the title of the world's largest software registry. Here, open-source developers come together to share and borrow pre-written code snippets called packages. These packages can be anything from small utility functions to entire frameworks that provide a foundation for building complex web applications.

- <b style="color:DarkSalmon;">public npm registry</b>: The `public npm registry` is a public repository that hosts a vast collection of open-source packages for JavaScript. It is a central place where developers can publish and share their code with the community, as well as discover and integrate third-party packages into their projects.
- <b style="color:DarkSalmon;">package</b>: A package is a file or directory that is described by a `package.json` file. A package must contain this file in order to be published to the npm registry. There are 2 types of packages:

  - <span style="color:HotPink;">public packages</span>: As an npm user or organization member, you can create and publish public packages that anyone can download and use in their own projects. Example: `express`, `lodash`, `react`.
    - <span style="color:Cyan;">Unscoped public packages</span>: They exist in the global public registry namespace and can be referenced in a package.json file with the package name alone: package-name.
    - <span style="color:Cyan;">Scoped public packages</span>: They belong to a user or organization and must be preceded by the user or organization name when included as a dependency in a package.json file:
      - `@username/package-name`
      - `@org-name/package-name`
  - <span style="color:HotPink;">private packages</span>: With npm private packages, you can use the npm registry to host code that is only visible to you and chosen collaborators, allowing you to manage and use private code alongside public code in your projects. **<u>To use it one must have a paid user or organization account.</u>** Private packages always have a scope, and scoped packages are private by default.
    - <span style="color:Cyan;">User-scoped private packages</span>: They can only be accessed by you and collaborators to whom you have granted read or read/write access.
    - <span style="color:Cyan;">Organization-scoped private packages</span>: They can only be accessed by teams that have been granted read or read/write access.

- <b style="color:DarkSalmon;">module</b>: A module is any file or directory in the `node_modules` directory that can be loaded by the `Node.js` `require()` function. To be loaded by the `Node.js` `require()` function, a module must be one of the following:

  - A folder with a `package.json` file containing a `"main"` field.
  - A JavaScript file.
    Note: Since modules are not required to have a package.json file, not all modules are packages. Only modules that have a package.json file are also packages.

  <b style="color:red;">NOTE:</b> Since modules are not required to have a `package.json` file, not all modules are packages. Only modules that have a `package.json` file are also packages.

    <table style="border: 1px solid white;"><thead><tr><th>Scope</th><th>Access level</th><th>Can view and download</th><th>Can write (publish)</th></tr></thead><tbody><tr><td>Org</td><td>Private</td><td>Members of a team in the organization with read access to the package</td><td>Members of a team in the organization with read and write access to the package</td></tr><tr><td>Org</td><td>Public</td><td>Everyone</td><td>Members of a team in the organization with read and write access to the package</td></tr><tr><td>User</td><td>Private</td><td>The package owner and users who have been granted read access to the package</td><td>The package owner and users who have been granted read and write access to the package</td></tr><tr><td>User</td><td>Public</td><td>Everyone</td><td>The package owner and users who have been granted read and write access to the package</td></tr><tr><td>Unscoped</td><td>Public</td><td>Everyone</td><td>The package owner and users who have been granted read and write access to the package</td></tr></tbody></table>

    <br>

- <b style="color:DarkSalmon;">.npmrc file</b>: This file is a configuration file for npm (Node Package Manager). It allows you to set various npm settings and preferences for your project or user environment. These settings can include registry URLs, authentication tokens, package-specific configurations, and more. Example:

  ```ini
  registry=https://registry.npmjs.org/
  ```

# <a href="https://docs.npmjs.com/cli/v10/configuring-npm/package-json">package.json file</a>

The package.json file is a fundamental component of any `Node.js` project. It serves as the manifest file, containing metadata about the project, its dependencies, scripts, and various configurations. It must be actual JSON, not just a JavaScript object literal. Here’s a detailed breakdown of all the key fields in `package.json`:

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">name</h3>

It is name of your package. If you plan to publish your package, the most important things in your `package.json` are the <b style="color:Crimson;">name</b> and <b style="color:Crimson;">version</b> fields as they will be required. They together form an identifier that is assumed to be completely unique. Some rules to follow while choosing your package's name:

- The name must be less than or equal to 214 characters.
- The name ends up being part of a URL, an argument on the command line, and a folder name. Therefore, the name can't contain any non-URL-safe characters.
- New packages must not have uppercase letters in the name.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">version</h3>

The version of an npm package refers to a specific release of that software within the npm package manager. Npm packages use a numbering system called <span style="color:Violet;">Semantic Versioning (Semver)</span> to indicate the type of changes made in a release. Changes to the package should come along with changes to the version. If you don't plan to publish your package, the name and version fields are optional.

Semver uses three numbers separated by dots `major.minor.patch` to represent the extent of changes:

- **MAJOR**: This number increases for significant, backwards-incompatible changes to the package.
- **MINOR**: This number increases for new features that are generally backwards-compatible.
- **PATCH**: This number increases for bug fixes and other minor improvements.
- A pre-release version may be denoted by appending a hyphen and a series of dot separated identifiers immediately following the patch version (e.g., `1.0.0-alpha`, `1.0.0-alpha.1`, `1.0.0-beta`, `1.0.0-rc.1`). <span style="color: Cyan;">These versions are considered less stable and may not yet meet the intended final version criteria.</span>

Precedence rules of Semver:

- Compare the major version.
- If major versions are equal, compare the minor version.
- If minor versions are equal, compare the patch version.
- If patch versions are equal, pre-release versions have lower precedence than the associated normal version (e.g., `1.0.0-alpha` precedes `1.0.0`).

In `package.json`, you can specify version ranges to ensure your dependencies are installed in compatible versions:

- **Exact Version:** `"express": "4.17.1"` -> This will install exact version `4.17.1`.
- **Caret (`^`):** `"express": "^4.17.1"` -> This will install the latest `4.x.x` version, but not `5.x.x`. That means it allows to update minor version and patch version but not major version.
- **Tide (`~`):** `"express": "~4.17.1"` -> This will install the latest `4.17.x` version, but not `4.18.x`. It allows updates to the patch version, but not the minor or major version.
- **Relational Operators (`>`, `>=`, `<`, `<=`):** `"express": "<4.17.1"` -> This will install any version less than `4.17.1`.
- **Star (`*`):** `"express": "*"` -> Installs the latest version of that package.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">main</h3>

This field specifies the the entry point of your package. This is the module that will be loaded when your package is required by another application or library. When someone installs your package and requires it in their code, `Node.js` will look at the `main` field to determine which file to load. If the main field is not specified, `Node.js` defaults to loading the `index.js` file in the root directory of the package. If your package's main file is not `index.js` or not in the root directory, you can specify a custom entry point using this field.

```json
{ "main": "src/main.js" }
```

This field could be directory to folder also which contains the entry point. Like this:

```json
{ "main": "src" }
```

Here, `Node.js` will look for `index.js` file in `src` folder by default.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">description</h3>

It is just a string describing about your package in brief. This helps people discover your package, as it's listed in `npm search`.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">keywords</h3>

An array of keywords that describe your package. Useful for searchability on npm. Example: `"keywords": ["utility", "amazing", "tools"]`

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">author</h3>

The author of the package. Can be a string or an object with `name`, `email`, and `url` properties.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">contributors</h3>

An array of contributors, each specified similarly to the `author` field.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">license</h3>

You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it. If you're using a common license such as `BSD-2-Clause` or `MIT`, add a current SPDX license identifier for the license you're using, like this:

```json
{ "license": "BSD-3-Clause" }
```

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">homepage</h3>

Specifies the URL of the homepage for your project. Example:

```json
{ "homepage": "http://example.com" }
```

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">bugs</h3>

The URL to your project's issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your package. It should look like this:

```json
{
  "bugs": {
    "url": "https://github.com/owner/project/issues",
    "email": "project@hostname.com"
  }
}
```

You can specify either one or both values. If you want to provide only a URL, you can specify the value for "bugs" as a simple string instead of an object. If a URL is provided, it will be used by the `npm bugs` command.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">funding</h3>

You can specify an object containing a URL that provides up-to-date information about ways to help fund development of your package, a string URL, or an array of objects and string URLs:

```json
{
  "funding": {
    "type": "patreon",
    "url": "https://www.patreon.com/my-account"
  }
}
```

Users can use the `npm fund` subcommand to list the funding URLs of all dependencies of their project, direct and indirect.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">engines</h3>

Specifies the versions of `Node.js` and `npm` that your package is compatible with. Example:

```json
"engines": {
  "node": ">=10.0.0",
  "npm": ">=6.0.0"
}
```

And, like with dependencies, if you don't specify the version (or if you specify "\*" as the version), then any version of node will do.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">os</h3>

You can specify which operating systems your module will run on:

```json
{ "os": ["darwin", "linux"] }
```

You can also block instead of allowing operating systems, just prepend the blocked os with a `'!'`:

```json
{ "os": ["!win32"] }
```

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">browser</h3>

If your module is meant to be used client-side the browser field should be used instead of the main field. This is helpful to hint users that it might rely on primitives that aren't available in Node.js modules. (e.g. `window`)

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">config</h3>

Used to set configuration parameters used in package scripts that persist across upgrades. For instance, if a package had the following:

```json
{
  "name": "foo",
  "config": {
    "port": "8080"
  }
}
```

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">private</h3>

If you set `"private": true` in your `package.json`, then it will not get published on npm. This is a way to prevent accidental publication of private repositories. If you would like to ensure that a given package is only ever published to a specific registry (for example, an internal registry), then use the `publishConfig` dictionary described below to override the registry config param at publish-time.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">publishConfig</h3>

Defines the registry and access settings for publishing the package. Example:

```json
"publishConfig": {
  "registry": "https://registry.npmjs.org/",
  "access": "public"
}
```

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">workspaces</h3>

The optional `workspaces` field is an array of file patterns that describes locations within the local file system that the install client should look up to find each workspace that needs to be symlinked to the top level `node_modules` folder. It can describe either the direct paths of the folders to be used as workspaces or it can define globs that will resolve to these same folders. In the following example, all folders located inside the folder `./packages` will be treated as workspaces as long as they have valid `package.json` files inside them:

```json
{
  "name": "workspace-example",
  "workspaces": ["./packages/*"]
}
```

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">repository</h3>

Specify the place where your code lives. This is helpful for people who want to contribute. If the git repo is on GitHub, then the `npm repo` command will be able to find you. Like this:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/npm/cli.git"
  }
}
```

The URL should be a publicly available (perhaps read-only) URL that can be handed directly to a VCS program without any modification. It should not be a URL to an html project page that you put in your browser. It's for computers.

For GitHub, GitHub gist, Bitbucket, or GitLab repositories you can use the same shortcut syntax you use for npm install:

```json
{ "repository": "gitlab:user/repo" }
```

If the `package.json` for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/npm/cli.git",
    "directory": "workspaces/libnpmpublish"
  }
}
```

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">scripts</h3>

This fiel is used to define command-line scripts that can be run using npm. These scripts can automate various tasks in your project, such as building, testing, and deploying your application. The `scripts` section is a JSON object where keys are script names and values are the command-line commands that should be executed. Example:

```json
{
  "scripts": {
    "start": "node server.js",
    "test": "mocha",
    "build": "webpack --config webpack.config.js",
    "lint": "eslint .",
    "prestart": "npm run build",
    "posttest": "npm run lint"
  }
}
```

Details about running scripts are given in below command line section.

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">dependencies</h3>

These are the packages required for the application to run. They are essential for the code that gets executed in the production environment. Dependencies are specified in a simple object that maps a package name to a version range. The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or git URL. Do not put test harnesses or transpilers or other "development" time tools in your dependencies object. See `devDependencies` section.

```json
{
  "dependencies": {
    "express": "expressjs/express",
    "react": "^18.2.0"
  }
}
```

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">devDependencies</h3>

They are dependencies that are only needed during the development and testing of your project. These are not required for the production build. If someone is planning on downloading and using your module in their program, then they probably don't want or need to download and build the external test or documentation framework that you use.

```json
{
  "devDependencies": {
    "mocha": "^9.0.0",
    "eslint": "^7.32.0"
  }
}
```

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">peerDependencies</h3>

They are used to specify that your package is compatible with a specific version of another package. They indicate which versions of dependencies your package can work with, but they do not install them. Instead, they expect that the user of your package will manually install these dependencies. Users will get a warning if the specified packages are not found in their node modules.

```json
{
  "peerDependencies": {
    "react": "^17.0.2"
  }
}
```

<h3 style="border-bottom: 2px solid DarkKhaki; color: DarkKhaki; padding-bottom: 2px; display: inline-block;">optionalDependencies</h3>

They are dependencies that are optional for your project. If they fail to install, the installation process will not fail. When you run `npm install`, `optionalDependencies` are installed if possible. If they cannot be installed, npm will proceed without them, and it will not cause the installation to fail. These dependencies are useful for packages that can work with additional features if the optional packages are available but can still function without them. For example:

```json
{
  "optionalDependencies": {
    "fsevents": "^2.3.2"
  }
}
```

<br>

# npm CLI

`npm` provides a command-line interface (CLI) that allows you to interact with the registry. Through the CLI, you can perform actions like:

- Installing packages into your project
- Updating existing packages to newer versions
- Uninstalling packages you no longer need
- Managing package dependencies

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">npm init</h3>

This command is used to initialize a new `Node.js` project by creating a `package.json` file in the project's root directory.

- <b style="color:PaleGreen;">npm init</b>: Running this command in your project's root directory will start an interactive prompt that asks you a series of questions to help create the `package.json` file. You will be prompted to fill in various fields like name of package, it's version, description, etc.
- <b style="color:PaleGreen;">npm init -y</b>: If you want to quickly create a `package.json` file with default values, you can use the `-y` or `--yes` flag. This will bypass the interactive prompts and create the file with default values.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">npm install</h3>

This command is used to install `Node.js` packages and manage dependencies in a project. It is one of the most commonly used npm commands and has several important functionalities.

- <b style="color:PaleGreen;">npm install</b>: Installs all the dependencies listed in the `package.json` file.
- <b style="color:PaleGreen;">npm install `<package-1> <package-2> <package-3>....`</b>: Installs mentioned packages and adds them to the `dependencies` section of `package.json`.
- <b style="color:PaleGreen;">npm install `<package-name>@<version>`</b>: Installs a specific version of a package.

A package is a:

- a) Directory of folder containing a program described by a `package.json` file. Useful for local development or testing packages before publishing them.
- b) Gzipped tarball containing (a)
- c) Url that resolves to (b)
- d) `<name>@<version>` that is published on the registry (see registry) with (c)
- e) `<name>@<tag>` (see npm dist-tag) that points to (d)
- f) `<name>` that has a "latest" tag satisfying (e)
- g) `<git remote url>` that resolves to (a)

<br>
<div style="border: 2px solid Violet; padding: 10px;">

When using `npm install <folder>` command, If folder sits inside the root of your project, its dependencies will be installed and may be hoisted to the top-level `node_modules` as they would for other types of dependencies.

If folder sits outside the root of your project, npm will not install the package dependencies in the directory folder, but it will create a <b style="color:OrangeRed;">symlink (symbolic link)</b> to folder. This symlink points to the actual directory where the package resides. It is like your project is allowed to use the package as if it were installed from the npm registry, but it actually points to the local directory. This is useful during development when you need to test changes in a local package without publishing it to the npm registry.

<b style="color:red;">NOTE:</b> If you want to install the content of a directory like a package from the registry instead of creating a link, you would need to use the <span style="color: SpringGreen;">--install-links</span> option.

</div>
<br>

**FLAGS AND OPTIONS**

- <span style="color: Yellow;">--save</span>: Before npm version 5, this flag was used to add the package to the dependencies section of `package.json`. As of npm 5, this is the default behavior, so the flag is no longer necessary.
- <span style="color: Yellow;">--save-dev</span> / <span style="color: Yellow;">-D</span>: Adds the package to the `devDependencies` section of `package.json`. This is typically used for packages that are only needed during development, such as testing libraries or build tools.
- <span style="color: Yellow;">--save-optional</span>: Adds the package to the `optionalDependencies` section of `package.json`. These dependencies are not critical for the application to run.
- <span style="color: Yellow;">--no-save</span>: Installs the package but does not add it to the `package.json` file.
- <span style="color: Yellow;">--production</span>: Installs only the dependencies and skips the `devDependencies`. This is useful for production environments where you don’t need development tools.
- <span style="color: Yellow;">--no-optional</span>: Skips installing optional dependencies.
- <span style="color: Yellow;">--global</span> / <span style="color: Yellow;">-g</span>: Installs the package globally, which makes it available to all projects on the system.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">npm uninstall</h3>

This command is used to remove installed packages from a `Node.js` project. It can remove a package from the `node_modules` directory as well as from the` package.json` and `package-lock.json` files, depending on the options used.

- <b style="color:PaleGreen;">npm uninstall `<package-1> <package-2> <package-3>....`</b>: To uninstall packages and remove them from the `node_modules` directory, `package.json`, and `package-lock.json` files.

**FLAGS AND OPTIONS**

- <span style="color: Yellow;">--save-dev</span> / <span style="color: Yellow;">-D</span>: Removes the package from the devDependencies section in `package.json`.
- <span style="color: Yellow;">--no-save</span>: Uninstalls the package from `node_modules` but does not remove it from `package.json`.
- <span style="color: Yellow;">--global</span> / <span style="color: Yellow;">-g</span>: Uninstalls a globally installed package.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">npm ls</h3>

This command is used to list installed packages (and their dependencies too if `--all` flag is used) in a `Node.js` project. This command provides a detailed tree-like structure of the installed packages, allowing developers to understand the dependencies and their versions within the project.

- <b style="color:PaleGreen;">npm ls</b>: This command will print to stdout all the versions of packages that are installed

**FLAGS AND OPTIONS**

- <span style="color: Yellow;">--all</span>: It will print packages along with their dependencies in a tree structure.
- <span style="color: Yellow;">--global</span> / <span style="color: Yellow;">-g</span>: Lists the globally installed packages.
- <span style="color: Yellow;">--depth=`n`</span>: Limits the depth of the dependency tree that is displayed.
  - Default: `Infinity` if `--all` is set, otherwise `1`
  - Type: `null` or a number
- <span style="color: Yellow;">--json</span>: Outputs the dependency tree in JSON format.
- <span style="color: Yellow;">--prod</span>: Lists only the packages in the `dependencies` section.
- <span style="color: Yellow;">--dev</span>: Lists only the packages in the `devDependencies` section.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">npm-run-script</h3>

This command is used to run scripts defined in the `scripts` section of a project's `package.json` file. It is a crucial part of npm's functionality, allowing developers to define and execute custom commands for their `Node.js` projects.

- <b style="color:PaleGreen;">npm run `<script-name>`</b>: Command used to run the `<script-name>` defined in `scripts` section of `package.json`. npm has a few predefined script names -> <u style="color:HotPink;">start</u>, <u style="color:HotPink;">test</u>, <u style="color:HotPink;">stop</u> and <u style="color:HotPink;">restart</u> that can be run without the `run` keyword.
- <b style="color:PaleGreen;">npm run</b>: If we don't pass any script name, list of all available scripts is returned.
  <br>

**SCRIPT CHAINING:**

- You can chain multiple commands to run sequentially using <b style="color:Lime;">&&</b>

  ```json
  {
    "scripts": {
      "build": "npm run lint && npm run webpack"
    }
  }
  ```

- You can run commands in parallel using single <b style="color:Lime;">&</b> (note that this may not work the same way on all platforms).

  ```json
  {
    "scripts": {
      "dev": "npm run watch:js & npm run watch:css"
    }
  }
  ```

**SCRIPT ENVIRONMENT:**

- Scripts have access to the environment variables defined in the shell. You can also define environment variables inline within the script command.

  ```json
  {
    "scripts": {
      "start": "NODE_ENV=production node server.js"
    }
  }
  ```

- To ensure cross-platform compatibility (e.g., between Windows and Unix-based systems), you can use the `cross-env` package to set environment variables.

  ```json
  {
    "scripts": {
      "start": "cross-env NODE_ENV=production node server.js"
    }
  }
  ```

**SCRIPT LIFECYCLE HOOKS:**

npm scripts support lifecycle hooks that allow you to run scripts at specific stages of the npm lifecycle. These hooks are prefixed with <span style="color: Cyan;">pre</span> and <span style="color: Cyan;">post</span>.

- <span style="color: Chartreuse;">pre`<script-name>`</span>: Runs before the script with the given name.

  ```json
  {
    "scripts": {
      "prebuild": "npm run lint",
      "build": "webpack --config webpack.config.js"
    }
  }
  ```

- <span style="color: Chartreuse;">post`<script-name>`</span>: Runs after the script with the given name.

  ```json
  {
    "scripts": {
      "build": "webpack --config webpack.config.js",
      "postbuild": "echo 'Build complete!'"
    }
  }
  ```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">npm publish</h3>

This command is used to publish a package to the npm registry, making it available for others to install. This is a crucial step for sharing your `Node.js` modules with the community or your team.

- <b style="color:PaleGreen;">npm publish</b>: To publish a package, navigate to the directory containing your package's `package.json` file and run this command. Before publishing a package, ensure that:
  - Version of package is incremented appropriately. npm uses <b style="color:Orange;">semantic versioning (semver)</b> to manage package versions.
  - The `package.json` file is correctly configured with all necessary fields like `name`, `version`, `description`, `main`, `scripts`, `keywords`, `author`, `license`, and dependencies.
  - A `README.md` file is present to provide documentation about the package.
  - If there are files or directories you do not want to include in your package, list them in a `.npmignore` file. By default, npm will use `.gitignore` if `.npmignore` is not present.
  - Ensure that your package is well-tested before publishing.
  - Symbolic links are never included in npm packages.

<b style="color:red;">NOTE THE FOLLOWING POINTS:</b>

- By default npm will publish to the public registry. This can be overridden by specifying a different default registry or using a scope in the `name`, combined with a scope-configured registry
- The publish will fail if the package name and version combination already exists in the specified registry.
- Once a package is published with a given name and version, that specific name and version combination can never be used again, even if it is removed with npm unpublish.

**FLAGS AND OPTIONS**

- <span style="color: Yellow;">--access</span>: Specifies the access level of the package. Use <span style="color: Cyan;">public</span> for public packages and <span style="color: Cyan;">restricted</span> for private packages. Unscoped packages can not be set to `restricted`.

  ```json
  npm publish --access public
  ```

- <span style="color: Yellow;">--registry</span>: Publishes the package to a specified registry instead of the default npm registry. Useful for private registries.

  ```
  npm publish --registry https://custom-registry-url
  ```

<br>

# npx

It is a command-line tool that is bundled with npm (Node Package Manager) starting from npm version 5.2.0, released in July 2017. It stands for "Node Package Execute" and is designed to make it easier to execute `Node.js` packages. Purpose:

- **Execute npm Packages Without Global Install:** npx allows you to run npm packages without needing to install them globally on your machine. This is useful for running one-off commands or scripts that you don't want to install permanently.
- **Convenience in Running Local Binaries:** When you install a package locally (i.e., in your project’s node_modules), you can use npx to run its binaries without specifying the full path.
- **Avoid Version Conflicts:** By using npx, you can ensure that you are running the exact version of a tool that your project needs, which helps to avoid version conflicts that can arise from global installations.

**<u>WORKING</u>**

- **Command Execution:** When you run a command with npx, it first checks if the command exists in the local `node_modules/.bin` directory of your project. If it does, it executes that command. If not, it looks for the command in the global npm registry and installs it temporarily in a cache directory before running it.

- **One-Time Use:** If the package is not installed locally or globally, npx will download and execute it, then discard the package after the command has finished running. This means you don't need to worry about cleaning up packages you only needed to run once.

One of the major use case of npx is running project specific tools like `create-react-app`, `webpack`, `eslint`, etc.

<br>

# <a href="https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json">package-lock.json</a>

This file is an automatically generated file in a Node.js project that is created and updated by npm whenever npm install is run. It provides an exact, stable representation of the entire dependency tree, ensuring consistent installs across different environments and over time.

When you add a new dependency using `npm install <package>`, `package-lock.json` is updated to include the exact version of the new package.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Purpose of this file:</h3>

- **Consistency**: Ensures that the same versions of dependencies are installed every time npm install is run, regardless of updates to the dependencies' latest versions.
- **Speed**: Allows npm to skip repeated resolution of dependencies and fetch exact versions directly.
- **Security**: Locks down the dependency tree to specific versions, which helps in auditing the packages for vulnerabilities.
- **Avoiding team conflicts**: Including this file in your version control system ensures that all team members and environments install the exact same dependency tree, reducing the "it works on my machine" problem.

<br>

# yarn! An alternative of npm

Both npm (Node Package Manager) and Yarn (Yet Another Resource Negotiator) are package managers for JavaScript, primarily used to manage dependencies for Node.js projects. They share many similarities but also have distinct differences.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">npm</h3>

- Developed by `npm, Inc.`, and released in 2010, npm is the default package manager for `Node.js`.
- Installed automatically with `Node.js.`
- Fetches packages from the online npm registry for every ‘install’ command. This makes it slow and devoid of offline support.
- It has very raw output logs. They are nothing but stacks of NPM commands.
- Creates `package-lock.json` file on `npm install`
- Commands (different from yarn): `npm install`, `npm uninstall`
- Commands (common ones): `npm ls`, `npm init`, `npm run`, `npm publish` 

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">yarn</h3>

- Developed by Facebook in collaboration with other companies like Google and Exponent, Yarn was released in 2016 as a response to some of the shortcomings in npm at the time, particularly around performance and reliability.
- Needs to be installed separately. Installation commands vary by system but generally involve using npm:

    ```
    npm install --global yarn
    ```
- This one stores dependencies locally in most cases and fetches packages from a local disk, given that dependency has been installed earlier making it considerably faster and offline supported.
- Output logs are extremely neat and readable. They are brief and given out tree form.
- Creates `yarn.lock` on `yarn install`.
- Commands (different from npm): `yarn add`, `yarn remove`
- Commands (common ones): `yarn ls`, `yarn init`, `yarn run`, `yarn publish` 

<br>

Security becomes an important parameter when we compare YARN and NPM. Initially, Facebook introduced YARN because it covered the security lapses in NPM, but since then, NPM has had strong security updates. If we add or install packages with security vulnerabilities in both the package managers, we are automatically given warnings for the same. YARN does have some extra edge, though. This comes with the feature of licensing. We can use YARN to check the licenses of the various packages installed as:

```
yarn licenses list
```

</div>
