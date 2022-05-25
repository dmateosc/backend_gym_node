FROM node:latest


ENV NODE_ENV=production
ENV HOST=localhost
ENV PORT=4000
##MONGO_PORT=
ENV MONGO_USER=gym
ENV MONGO_PPR=2dQbFblLS8ABlvRg
ENV MONGO_BASE=mongodb+srv://
ENV MONGO_URL_GYM=@cluster0.6hzbg.mongodb.net/gym?retryWrites=true&w=majority
ENV SECRET_JWT_SEED=R3p3t1R4*1Es!esto

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production

COPY . .

EXPOSE 4200

CMD ["npm run prod"]