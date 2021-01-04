### start the project

 1- install dependencies:
 `yarn install`

2- start the project:`
`yarn start`

3- setup the .env file with the database credentials on the root folder (check env.sample)

4- Open http://localhost:3000

### tests
run unit tests:
`yarn test`

run lint (should not consider template files):
`yarn list`


### Deploy:
This project are deployed on firebase using github actions as CI/CD. Staging and production are different firebase projects.

1- Merge the pull request
2- check pipe line (Github actions)
3- when merged with master it goes directly to staging
4- check changes in staging and trigger the production pipeline passing the desired commit id

### Commit:
This project uses commitzen ([github.com/commitizen/cz-cli](https://github.com/commitizen/cz-cli)) always use it to commit. Running `npx git-cz` is the simplest way.

### Structure
It uses a template https://gogo-react.coloredstrategies.com most of the application code and its frontend logic are inside `src/views/app`.

### Specific patterns to be followed

- Use `ramda` to write code in a functional way wherenver there is some complex logic
- There are some custom hooks and to keep the pattern continue to use `custom hooks` just like the request files
- Check the `unit tests` **during the development**
- **DO NOT** use `formik`, it comes from the template use `react-hooks-form` instead. Example: `.../SourceInformation/index.js`
- **DO NOT** use `redux-saga` the way that it is doing the request is directly into the component with `swr` or `useAsync` hooks


### Business logic

**Authentication**

There are the `src/views/user` folder with all user related authentication pages.
To create a user it does the request to the api and there its created through `firebase-admin`

The authentication happens directly between UI and firebase

All of the api requests are verified by firebase, it happens on a `axios` interceptor on `src/helpers/Request.js`

