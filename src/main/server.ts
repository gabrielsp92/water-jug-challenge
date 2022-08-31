import app from './app'
import env from './config/env'

app.listen(env.port, () => console.log(`Server running at PORT: ${env.port}, docs at: http://localhost:${env.port}/api-docs/`))