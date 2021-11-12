ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
FIREFOX_PROFILE_DIR:=test-firefox-profile
FIREFOX_PROFILE_PATH:=$(ROOT_DIR)/$(FIREFOX_PROFILE_DIR)

.PHONY: build

run-as-extension:
	FIREFOX_PROFILE_PATH=$(FIREFOX_PROFILE_PATH) \
		npm run dev:extension
	# scripts/clean_up_changes_to_firefox_profile.sh $(FIREFOX_PROFILE_PATH)

run-as-webapp:
	npm run dev:webapp

build:
	find . -type d -wholename "\.\/dist" | xargs rm -rf
	npm run build

build-for-chrome:
	./scripts/build-for-chrome.sh

test:
	@echo "Nothing set yet, you probably need selenium"

lint:
	pre-commit run --show-diff-on-failure --color=always --all-files

install:
	pre-commit install
	npm ci
