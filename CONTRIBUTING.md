# Contributing to Serverless Micoservices w/ GraphQL Template

Please [read the Code of Conduct](CODE_OF_CONDUCT.md). By contributing to this repository, you are agreeing to its rules.

Contents

- [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)
- [Code Guidelines](#code-guidelines)

---

## Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

- Search [the repo pull requests](https://github.com/dustinsgoodman/serverless-microservices-graphql-template/pulls) for an open or closed PR that relates to your submission. This will help reduce redundancies.

- Make your changes in your forked repository as a new git branch:

  ```shell
  git checkout -b my-fix-branch main
  ```

- Create your change following the [code](#code-guidelines) and/or [content guidelines](#content-guidelines) as appropriate.

- Commit your changes using a descriptive commit message. This repo does not having any commit linting but attempts to follow [conventional commits guidelines](https://www.conventionalcommits.org/en/v1.0.0/) for consistency.

- Push your branch to GitHub:

  ```shell
  git push origin my-fix-branch
  ```

- In GitHub, send a pull request to `dustinsgoodman/serverless-microservices-graphql-template:main`.

- If suggestions or changes are requested, please make the require updates.

  - If your branch has merge conflicts or is out of sync with upstream, please rebase your branch and resolve the conflicts. This will require a force push.

  - When updating your feature branch with the requested changes, please do not overwrite the commit history, but rather contain the changes in new commits. This is for the sake of a clearer and easier review process.

That's it! Thank you for your contribution!

## Code Guidelines

Consistency is important on a project, where many developers will work on this codebase over long periods of time. Therefore, we expect all developers to adhere to a common set of coding practices and expectations. This section will be updated as the team decides on new standards.

- **Formatting** – Please follow the conventions as outlined in our prettier configuration and eslint settings.
- **Developer Testing** – Developers are responsible for thoroughly testing their code prior to putting it up for review. It is NOT the responsibility of the code reviewer to execute the code and test it (though the reviewer might run the code to aid their review if they want). The repository's test runner expects 100% coverage so your change should include the relevant tests.
- **Minimal Pull Requests** – Do not commit changes to files where there was not a new feature added or an existing feature altered. Files altered only to remove unused imports or change formatting should not be included in pull requests. Code authors are expected to review the files in each pull request and revert files that were only incidentally changed. Please make sure you also update documentation as features get changed.
- **Code Comments** – We're not following a strict code commenting pattern (like js-doc), but developers are encouraged to use comments liberally where it may aid understandability and readability of the code (especially for new contributors). Comments that merely explain what a line of code does are not necessary. Instead, comments should indicate the intent of the author. It could mention assumptions, constraints, intent, algorithm design, etc.
- **Commit/Pull Request Comments** – Code authors are strongly recommended to communicate the reason for the code changes, the nature of the changes, and the intent of the changes in their git commit messages or PR descriptions. Additionally, while not strictly required, we recommend that code authors make comments in their pull requests where useful to help code reviewers understand the background/intent for some less obvious changes.
