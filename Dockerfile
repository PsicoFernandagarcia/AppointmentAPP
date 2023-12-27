# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:20-alpine as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

ARG ENVIRONMENT
ENV ENVIRONMENT $ENVIRONMENT
# Generate the build of the application
RUN npm run build-prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/appointment-app /usr/share/nginx/html

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx



# Expose port 8088 not 80
EXPOSE 8088
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]