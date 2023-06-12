install:
	npm install
start:
	npm run dev
docker-install:
	docker build . -t fnuc
docker:
	docker run -it fnuc
