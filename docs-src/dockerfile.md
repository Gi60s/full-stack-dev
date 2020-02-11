---
title: Dockerfile
toc: 1
---

Below is a sample Dockerfile if you'd like to create your own.

## Sample Dockerfile

```dockerfile
  # Every Dockerfile must start with a "FROM" keyword and you have to specify a base image (local or pull/reference one from dockerhub)
FROM base_image:version

  # Use WORKDIR to specify that all subsequent actions should be taken from the directory
  # (e.g. /usr/src/app) in your image's filesystem (never the host’s filesystem).
WORKDIR /the/workdir/path

  # Use COPY to copy files from your host to the present location (.) in your image 
  # e.g. "COPY package.json ." and the "." would translate to your specified WORKDIR above (/usr/src/app/package.json) 
  # e.g. "COPY . ." copies all of the source code from the host to the image's filesystem.
COPY source dest

  # Commands for this container/image to run
  # e.g.: 
  # RUN apt update && \
  #     apt install curl && \
  #     apt install git
RUN command

  # Use CMD to specify some metadata in the image that describes how to run the container based off of this image. 
  # e.g. ["npm", "start"] would run "npm start"
CMD [ "executable" ]

  # Use the ENV instruction if you want to set the environment variable <key> to the value <value>. 
  # This value will be in the environment for all subsequent instructions in the build stage
  # and can be replaced inline in many as well.
ENV key=value other_key=other_value another_key=another_value

  # Use the ADD instruction if you want to copy new files, directories or remote file URLs from <src>
  # and add them to the filesystem of the image at the path <dest>.
  # The <dest> is an absolute path, or a path relative to WORKDIR, into which the source will be copied inside the destination container.
ADD source dest
```
