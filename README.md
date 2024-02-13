# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm i`

Installs dependencies in the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Libraries Used

### `octokit`
- Octokit is a client library for the GitHub API, written in JavaScript. It provides a convenient way to interact with GitHub's RESTful API, allowing developers to programmatically manage repositories, issues, pull requests, users, and more.

- By using Octokit, we can access GitHub's extensive features and data, enabling our app to perform actions such as retrieving repository information, creating issues, commenting on pull requests, and much more.

### `Tailwind`
- Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without having to write custom CSS. It offers a wide range of pre-defined utility classes for common styles such as spacing, typography, colors, and more.

- By leveraging Tailwind's utility classes, we can rapidly prototype, style, and customize our UI components with minimal CSS code.

### `Material-UI`
- Material-UI is a popular React UI framework that implements Google's Material Design principles. It provides a set of reusable and customizable React components, styles, and icons that help developers create beautiful and responsive user interfaces.

- I have utilized a few Icons and Skeleton component as  a placeholder for loading content.

## Github Access Tokens

- Generate a GitHub access token from your GitHub account settings with appropriate permissions (e.g., read access to repositories).

- Add the access token to the variable `auth_token` in the file `env.js` in the `src` directory of your project.
