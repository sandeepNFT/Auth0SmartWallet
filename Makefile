lint: 
	docker run --rm -t -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet:/data auth0/marketplace-integration-tools npm run lint

test: 
	docker run --rm -t -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet:/data auth0/marketplace-integration-tools npm run test

zip: 
	zip -r integration-action.zip integration media

deploy_init:
	docker run --rm -it -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet:/data -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet/deploy:/data/deploy auth0/marketplace-integration-tools bash deploy-scripts/init.sh

deploy_get_token:
	docker run --rm -t -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet:/data -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet/deploy:/data/deploy auth0/marketplace-integration-tools bash deploy-scripts/get-token.sh

deploy_create:
	docker run --rm -t -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet:/data -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet/deploy:/data/deploy auth0/marketplace-integration-tools bash deploy-scripts/action-create.sh

deploy_get:
	docker run --rm -t -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet:/data -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet/deploy:/data/deploy auth0/marketplace-integration-tools bash deploy-scripts/action-get.sh

deploy_get_all:
	docker run --rm -t -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet:/data -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet/deploy:/data/deploy auth0/marketplace-integration-tools bash deploy-scripts/action-get-all.sh

deploy_update:
	docker run --rm -t -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet:/data -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet/deploy:/data/deploy auth0/marketplace-integration-tools bash deploy-scripts/action-update.sh

deploy_delete:
	docker run --rm -t -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet:/data -v /c/Users/Salim/OneDrive/Desktop/Kmindz/Auth0\ Github/Auth0SmartWallet/deploy:/data/deploy auth0/marketplace-integration-tools bash deploy-scripts/action-delete.sh
