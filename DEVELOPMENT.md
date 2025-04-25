# Development Guide

GeoDaLib javascript library development is done in the `js` directory.

## Development Workflow

### Building and Testing

```bash
# Build all packages
yarn build

# Run tests across all packages
yarn test

# Run linting with auto-fix
yarn lint
```

### Development Tools

- Node.js version: 22.14.0 (managed by Volta)
- Yarn version: 4.0.0 (managed by Volta)
- TypeScript version: ~5.3.3

### Project Structure

The project uses a monorepo structure with the following tools:

- Lerna: For managing multiple packages
- Turborepo: For build system and task running
- Workspaces: For managing package dependencies

### Available Scripts

- `yarn build`: Builds all packages using Lerna
- `yarn test`: Runs tests across all packages
- `yarn lint`: Runs ESLint with auto-fix across all packages
- `yarn version-prerelease`: Creates a prerelease version
- `yarn version-patch`: Creates a patch version
- `yarn version-minor`: Creates a minor version
- `yarn version-major`: Creates a major version
- `yarn publish-dry-run`: Tests the publishing process
- `yarn publish-preview`: Publishes with preview tag
- `yarn publish-release`: Publishes the latest version

## Versioning and Publishing

To create a new version and trigger the NPM publishing workflow:

1. Create a new version using one of these commands:

```bash
# For patch updates (0.0.X)
yarn run version-patch

# For minor updates (0.X.0)
yarn run version-minor

# For major updates (X.0.0)
yarn run version-major

# For prerelease versions (e.g., 0.0.1-alpha.0)
yarn run version-prerelease
```

Then, you need to commit the changes of version number in all package.json files, especially the lockfile.

```bash
yarn install
git commit -am "chore: update version number to X.Y.Z"
```

2. (Optional)Before pushing the tag, you can test the publishing process:

```bash
# Test publishing without actually publishing
yarn run publish-dry-run

# Or publish to preview tag for testing
yarn run publish-preview
```

The `publish-dry-run` command:

- Simulates the entire publishing process without actually publishing to NPM
- Shows what would be published, including:
  - Package names and versions
  - Files that would be included
  - Dependencies that would be published
- Useful for catching issues before actual publishing
- Example output:

  ```
  lerna notice cli v3.11.0
  lerna info dry-run enabled
  lerna info Publishing packages to NPM
  lerna info - geodalib-core@0.0.1
  lerna info - geodalib-io@0.0.1
  lerna info - geodalib-viz@0.0.1
  lerna info - geodalib@0.0.1
  lerna info dry-run finished
  ```

  You may need to update the gitHead in the package.json files after running the `publish-dry-run` command.

```bash
git add .
git commit -am "chore: update version number to X.Y.Z"
git push
```

~~The `publish-preview` command~~ (Don't run this command, publish will be triggered by the GitHub workflow):

- Publishes packages with the 'preview' tag on NPM
- Useful for testing new features or changes before official release
- Can be installed using: `yarn add geodalib@preview`
- Example:
  ```bash
  # After running publish-preview
  yarn add geodalib@preview  # Installs the preview version
  yarn add geodalib@latest   # Installs the latest stable version
  ```

3. Push the version tag to GitHub:

Create a new version tag:

```bash
git tag -a v0.0.2-alpha.11 -m "chore: update version number to 0.0.2-alpha.11"
git push origin --tags
```

If you want to remove the tag and the version number, you can run the following commands:

```bash
git tag -d v0.0.2-alpha.11
git push origin --delete v0.0.2-alpha.11
```

This will:

- Create a new version tag
- Push the tag to GitHub
- Trigger the GitHub workflow that publishes the package to NPM

Note: All version scripts include the `--no-push` flag by default, which is why you need to manually push the tag. This gives you a chance to review the changes before triggering the publishing workflow.

Additional publishing commands:

- `yarn run publish-dry-run`: Test the publishing process without actually publishing
- `yarn run publish-preview`: Publish with the 'preview' tag (useful for testing)
- `yarn run publish-release`: Publish the latest version to NPM

* NOTE for release

- DCMAKE_BUILD_TYPE=Release
- set(CMAKE_CXX_FLAGS "-O3 -DNDEBUG -s ASSERTIONS=0")

4. Update the version in Examples

```bash
yarn update-examples
cd ../examples/lisa && yarn install
cd ../mapping && yarn install
cd ../node && yarn install
cd ../parcel && yarn install
cd ../regression && yarn install

cd ..
git add .
git commit -m "chore: update examples to version ${GITHUB_REF_NAME}"
git push
```

