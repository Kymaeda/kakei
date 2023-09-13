# syntax=docker/dockerfile:1
FROM ruby:3.1

# Install Yarn
RUN curl https://deb.nodesource.com/setup_18.x | bash
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y nodejs yarn default-mysql-client build-essential

WORKDIR /kakei
COPY Gemfile /kakei/Gemfile
COPY Gemfile.lock /kakei/Gemfile.lock

RUN bundle install
RUN yarn install

COPY . /kakei

# TODO: docker-compose webコンテナーの起動時に実行しているpidファイルの削除をentrypointで実施するようにする
# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh
# ENTRYPOINT ["entrypoint.sh"]
