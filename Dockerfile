# syntax=docker/dockerfile:1
FROM ruby:3.1
RUN apt-get update -qq && apt-get install -y nodejs default-mysql-client build-essential
WORKDIR /kakei
COPY Gemfile /kakei/Gemfile
COPY Gemfile.lock /kakei/Gemfile.lock
RUN bundle install
COPY . /kakei

