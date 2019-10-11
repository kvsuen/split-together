# Split Together

Split Together easily splits receipts and settles the bill at the snap of the camera. Users take a picture of a receipt and the app then uses image recognition to present an interactive screen where everyone at the table can select their ordered item.

## Contributors
* [Kevin Suen](https://github.com/kvsuen)
* [Declan Wu](https://github.com/declan-wu)
* [Jackson Fung](https://github.com/jacksonf21)

## Final Product

<p align="center">
 <img width="350" alt="split-together" src="https://github.com/declan-wu/split-together/blob/master/public/split-together.gif">
 &nbsp  &nbsp  &nbsp  &nbsp
 <img width="350" alt="dash-board" src="https://github.com/declan-wu/split-together/blob/master/public/dash-board.gif">
</p>

## Getting Started
Note: The [Split Together](https://github.com/kvsuen/split-together-api) API server will also need to be running concurrently.

1. Create the `.env` by using `.env.example`
2. Update the `.env` file with the correct information:
  - Firebase Project API keys
  - URL of the Split Together API server

3. Install the dependencies with `npm install`
4. Run the API server using [Split Together API](https://github.com/kvsuen/split-awesome-api) instructions
5. Run the webpack development server with `npm start`

## Dependencies

- Node 10.x or above
- NPM 6.x or above
- axios: ^0.19.0,
- classnames: ^2.2.6,
- firebase: ^7.0.0,
- material-ui/core: ^4.5.0,
- material-ui/icons: ^4.4.3,
- qrcode.react: ^0.9.3,
- react: ^16.10.1,
- react-dom: ^16.10.1,
- react-html5-camera-photo: ^1.4.3,
- react-qr-reader: ^2.2.1,
- react-router-dom: ^5.1.1,
- react-scripts: 3.1.2,
- react-spring: ^8.0.27,
- react-swipeable-views: ^0.13.3,
- react-transition-group: ^1.2.1,
- react-use-gesture: ^6.0.1,
- react-with-gesture: ^4.0.8,
- socket.io-client: ^2.3.0
