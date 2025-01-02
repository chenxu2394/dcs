# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency manifests
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your code
COPY . .

# Build for production
RUN yarn build

# Expose the port Vite uses by default during preview
EXPOSE 4173

# By default, `yarn preview` binds to localhost only,
# so add --host 0.0.0.0 so the container can accept external traffic
CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "4173"]
