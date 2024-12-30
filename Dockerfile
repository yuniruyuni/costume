FROM oven/bun:latest AS build

WORKDIR /work

ADD package.json /work
ADD bun.lockb /work
RUN bun install --frozen-lockfile

ADD . /work
RUN bun run build

FROM nginx:alpine-slim

COPY favicon.ico /usr/share/nginx/html/favicon.ico
COPY ogp.png /usr/share/nginx/html/ogp.png
COPY ogp.webp /usr/share/nginx/html/ogp.webp
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /work/static/ /usr/share/nginx/html/
