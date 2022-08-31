const SwaggerJson = {
  "openapi": "3.0.0",
  "info": {
    "title": "Water Bucket Challenge openApi specifications.",
    "version": "0.0.1"
  },
  "paths": {
    "/water-bucket-challenge": {
      "post": {
        "tags": [
          "WaterBucketChallenge"
        ],
        "summary": "Endpoint to input the data needed for the calculation",
        "description": "Given two bucket sizes (bucketX and bucketY) and an amount wanted (amountWantedZ), this application will calculate, if possible, the best way to measure the desired quantity",
        "requestBody": {},
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    }
  }
}

export default SwaggerJson