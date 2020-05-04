This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Building for Umbraco

1. Ensure you have the latest changes from master branch (fetch/pull)
2. Run `npm i` to ensure you have the latest node modules installed
3. Run `npm run build` locally
4. Copy the entire build folder to our CDN (cdn/nwmassets/apps/wmn-covid-refund/build/)

   _Ensure to do step 3 before step 4 as the CDN caches older builds. This lets users to continue to see/use the older build until we've updated the links in the Umbraco template._

5. Then copy the entire contents of `index.html` file located at `build/index.html`
6. Log into WMN/NWM Umbraco
7. Navigate to `Settings/Templates/Master WMN/WMN - Apps/WMN - COVID19 Refunds`
8. Then paste the data you copied in step 4
9. Save the file `Settings/Templates/Master WMN/WMN - Apps/WMN - COVID19 Refunds`

   _At this point, the new build should be live._

10. Delete you local `build` folder
11. All done! Continue developing until next build release.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
