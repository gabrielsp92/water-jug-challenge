const SwaggerJson = {
  "openapi": "3.0.0",
  "info": {
    "title": "Water Bucket Challenge openApi specifications.",
    "version": "0.0.1"
  },
  "servers": [
    {
      "url": "http://localhost:5000/v1",
      "description": "local"
    }
  ],
  "paths": {
    "/water-bucket-challenge": {
      "post": {
        "tags": [
          "WaterBucketChallenge"
        ],
        "summary": "Endpoint to input the data needed for the calculation",
        "description": "Given two bucket sizes (bucketX and bucketY) and an amount wanted (amountWantedZ), this application will calculate, if possible, the best way to measure the desired quantity",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "bucketX": {
                    "type": "number",
                    "description": "Capacity of bucket X",
                    "required": true
                  },
                  "bucketY": {
                    "type": "number",
                    "description": "Capacity of bucket Y",
                    "required": true
                  },
                  "amountWantedZ": {
                    "type": "number",
                    "required": true
                  },
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          },
          "422": {
            "description": "Business Exception"
          },
          "400": {
            "description": "Invalid Contract"
          }
        }
      }
    }
  }
}

export default SwaggerJson