# Getting started with Node.js in GCP

## Run project

```terminal
npm install
npm start
```

### Server hot reload

```terminal
nodemon server.js --ignore ./public
```

### Frontend hot reload

```terminal
livereload -e 'html,js' ./public
```

## Deploy project in GCP

### 1. Installing Google Cloud SDK

https://cloud.google.com/sdk/docs/install

### 2. Creating the GCP project

```terminal
gcloud projects create PROJECT_ID
gcloud config set project PROJECT_ID
gcloud config get-value project
```

### 3. Enable billing account on the project

1. Go to the link: https://console.cloud.google.com/billing
2. In My projects tab, locate your project, and then click on the
   `change billing` option in the actions menu.
3. select your billing account, and set account
4. Check in the terminal if the billing was enabled successfully in the project:

```
gcloud beta billing projects describe <PROJECT_ID>
```

### 4. Deploy app

```terminal
gcloud app create
gcloud app deploy
gcloud app browse
```
