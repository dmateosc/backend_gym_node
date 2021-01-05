FROM mongo:latest

# custom label for the docker image
LABEL version="0.1" maintainer="ObjectRocket"

# use 'RUN' to execute commands in the container's bash terminal
CMD [ "service", "mongodb", "start", "-y" ]
# expose MongoDB's default port of 27017
EXPOSE 27017