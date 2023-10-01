.DEFAULT_GOAL := help

MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(dir $(MKFILE_PATH))


DAPP_CONTAINER := polyplace

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: build-dev
build-dev: ## Makes the static files and adds them to the project
	@docker rmi ${DAPP_CONTAINER} || true
	@docker build -t ${DAPP_CONTAINER} -f Dockerfile .

.PHONY: run-dev
run-dev: clean-dev  ## Cleans, builds and runs the software on the DEVELOPMENT environment 
	@docker-compose -p ${DAPP_CONTAINER} up --build -d

.PHONY: recreate-dev
recreate-dev: clean-dev  ## Cleans & recreates everything on the DEVELOPMENT environment 
	@docker-compose -p ${DAPP_CONTAINER} up --force-recreate -d

.PHONY: clean-dev
clean-dev: ## Cleans the software from the DEVELOPMENT environment
	@docker-compose -p ${DAPP_CONTAINER} down || true

.PHONY: logs-dev
logs-dev: ## Shows the logs of the DEVELOPMENT environment; CTRL+C to exit
	@docker-compose -p ${DAPP_CONTAINER} logs -f

.PHONY: clean-dev
clean-sso-dev: ## Cleans the software from the DEVELOPMENT environment 
	@docker stop ${DAPP_CONTAINER} || true
	@docker rm ${DAPP_CONTAINER} || true

.PHONY: purge
purge: ## WARNING! Use this with care. It will stop and remove all containers, volumes, networks, etc
	@docker stop $(docker ps -aq) || true
	@docker rm $(docker ps -aq) || true
	@docker system prune -f && docker volume prune -f && docker network prune -f
