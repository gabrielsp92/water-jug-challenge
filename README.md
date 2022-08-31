# Water Bucket Challenge

This project was created for the Water Bucket Riddle challenge.

# Technologies used
- [Typescript](https://www.typescriptlang.org/) - strongly typed programming language that builds on JavaScript
- [Nodejs](https://nodejs.org/en/) - Javascript runtime
- [Jest](https://jestjs.io/) - Test Framework
- [Express](https://www.npmjs.com/package/express) - minimalist web framework for node

# Set up
## Environment variables
By default the server will start at port 5000, to overwrite this setting, you can 
declare a new value as shown in the example bellow
```bash
  EXPORT PORT=<PORT>
```
## Install dependencies
```bash
  npm install
```

## Test application
```bash
  npm run test
```
## Build Project
```bash
  npm run build
```
## Start Server
```bash
  npm run start
```
# Api Docs

after running the server, you can check the openApi specifications at <_localhost_>/api/docs

### <b>POST: <_localhost_>/v1/water-bucket-challenge </b>
### Request Body:
```json
{
	"bucketX": 3, // bucket x capacity
	"bucketY": 5, // bucket y capacity
	"amountWantedZ": 4 // amount to be measured
}
```