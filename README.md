# Customer Feed Aggregation and Analysis (CFAA)

## Motivation and Project Description

- The customer is central in every product or service that is offered, hence obtaining customer feedback is essential to the success of any business small or large.
- This feedback often comes in the form of unstructured data, such as text. In fact, open ended questions are one of the best ways to obtain feedback. In addition, this feedback can come from many sources, such as surveys, client interviews and social media.
- Gathering this data from multiple sources and attempting to extract key information is both time consuming and tiring thus it is an expense to the business.
- There are already existing platforms that provide businesses with a unified source to gather this data, as well as mine information from it. One example is Microsoft Dynamics 365 that has this capability, however it costs $1,500 per user to obtain and understand this feedback - making it an infeasible expense for small businesses, startups and content creators.
- Our platform would provide this audience with a tool that acts as a unified source to obtain this information and make sense of it.

## Tech Stack

- Front End

  - React + Typescript
  - HTML/CSS

- Back End

  - Node.js + TypeScript
  - Express.js
  - PostgreSQL

## Installation

### Cloning

Using github desktop:

1. Click on the repository name on the top left
2. Click add
3. Click clone
4. Click URL
5. Clone `https://github.com/UTSCCSCC01/finalprojects22-byte-peeps`

Using CLI:

`git checkout https://github.com/UTSCCSCC01/finalprojects22-byte-peeps -b <NEW-BRANCH-NAME>`

### Downloading Node and NPM

Instructions are available [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Database setup - need to set up a local DB as well

1. Download PostgreSQL - instructions are available here for [Windows](https://www.youtube.com/watch?v=RAFZleZYxsc) and [MacOS](https://www.youtube.com/watch?v=wTqosS71Dc4)

2. Creating Local DB:

- If you were on MacOS, you need to download Pgadmin [here](https://www.pgadmin.org/download/pgadmin-4-macos/)
- Open Pgadmin
- Click on Local server
  - If you do not see this option on the dashboard, click 'Add New Server'.
  - Under the `Connection` tab fill in 'localhost' for the host name field
  - Ensure port 5432 is the selected port
  - Input your postgres password. If you get a password authentication error and cannot remember your password then [reset it](https://stackoverflow.com/a/67902158)
- Right click databases
- Click create -> database
- name it `c01`

3. Connecting to Production DB:

- Right click on servers
- Click create...
- New server
- Enter a name
- Go to connection tab
- Enter credentials given from one of our fellow developers.

4. Updating of Local DB with Production DB data:

- Right click on the `c01` DB on the production server
- Click back up and save it
- Right click on the development DB
- Click restore
- Select the backup you made
- Click restore

### Backend Setup

Before completing your backend set up, you require a [DatumBox](https://www.datumbox.com/machine-learning-api/) API key. To obtain the key, you require to go register on the DatumBox [website](https://www.datumbox.com/machine-learning-api/): click register, then go back to this [page](https://www.datumbox.com/machine-learning-api/), scroll down to `How to use the API?` on the bottom right and click the text hyperlink `API Key`.

Now you can complete the backend set up.

1. cd into the backend folder then app folder and run the command:

```
npm i --include=dev
```

2. Create a `.env` file in the `backend/app` directory. Paste the following content

```
VIRTUAL_HOST=localhost
PORT=5432
POSTGRES_DB=c01
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<YOUR-POSTGRES-PASSWORD>
DATUMBOX_API_KEY=<YOUR-DATUMBOX-API-KEY>
```

3. To run the dev server:

```
npm run dev
```

### Frontend Setup

1. cd into the frontend folder then the app folder in the frontend and run the command:

```
npm i --include=dev
```

2. Create a `.env` file in the `frontend/app` directory. Paste the following content

```
REACT_APP_BACKEND_ENDPOINT=http://localhost:3000/
PORT=80
```

3. To start the server:

```
npm run start
```

## Contribution

- Do you use Git Flow?

  - Yes, we use a main branch, a development branch and many feature branches.

- What do you name your branches?

  - main: `main` branch that is deployed
  - develop: `develop` latest development branch
  - hotfix: `hot-fix-<issue-name>`
  - feature: `feature-<feature-name>`
  - bug (that is not a hot fix): `bug-<bug-info>`

- Do you use github issues or another ticketing website?

  - We will be using `Jira` as a ticketing platform.

- Creating frontend components:

  - Use the template complement folder under the components directory

- Creating backend files:

  - There must be a new file under each of the controllers, models and routes folder following the same structure as the template file

- Do you use pull requests?

  - Yes each feature, bug and hot fix should have an independent pull request.

- Process:
  1. Clone this repository and create a new branch off the dev branch with the appropriate name.
  2. Implement the feature.
  3. Test your feature and ensure it does not break any existing functionality.
  4. Create and submit a pull request with a detailed description to be reviewed by at least two other contributors.

## Deployment

Due to github actions being displayed, we will be running the github actions locally using [act](https://github.com/nektos/act) to deploy.

Currently, the website is deployed at: https://c01.mohamedtayeh.com/

Deployment instructions coming soon...

## Authors

- [Mohamed Tayeh](https://github.com/mohamed-tayeh)
- [Bassel Ashi](https://github.com/BasselAshi)
- [Connie Lin](https://github.com/connieJ-lin)
- [Mohammad Qadir](https://github.com/DomiVesalius)
- [Karandeep Lubana](https://github.com/KarandeepLubana)
- [Jiaming Yang](https://github.com/Jiaming-Yang-20)
- [Juan Camilo Corral](https://github.com/Wikisaqui)
