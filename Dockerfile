FROM node:16-alpine

WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD [ "npm", "start" ]