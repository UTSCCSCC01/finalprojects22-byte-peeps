# Customer Feed Aggregation and Analysis (CFAA)

## Motivation and Project Description

- The customer is central in every product or service that is offered, hence obtaining customer feedback is essential to the success of any business.
- This feedback comes in the form of unstructured data, such as text. In fact, Open ended questions are one of the best ways to obtain feedback. In addition, this feedback can come from many sources, such as surveys, client interviews and social media.
- Gathering this data from multiple sources and attempting to extract key information is both time consuming and tiring thus it is an expense to the business.
- There are few platforms that provide businesses with a unified source to gather this data, as well as mine it for information. One example is Microsoft Dynamics 365 that has this capability, however it costs $1,500 per user to obtain and understand this feedback - making it an infeasible expense for small businesses and startups.
- Our platform would provide small businesses and startups with the tool to obtain this information and make sense of the feedback

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

`git checkout https://github.com/UTSCCSCC01/finalprojects22-byte-peeps -b name_for_new_branch`

### Downloading Node and NPM

Instructions are available [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Database setup

1. Download PgAdmin [here](https://www.pgadmin.org/download/)

2. Connecting to Production DB:

- Right click on servers
- Click create...
- New server
- Enter a name
- Go to connection tab
- Enter credentials given from one of our fellow developers.

### Backend Setup

1. cd into the app folder and run the command:

```
npm i --include=dev
```

2. Create a `.env` file in the `backend/app` directory. Paste in the contents given from one of our fellow developers.

3. To run the dev server:

```
npm run dev
```

### Frontend Setup

1. cd into the app folder in the frontend and run the command:

```
npm i --include=dev
```

2. Create a `.env` file in the `backend/app` directory. Paste in the contents given from one of our fellow developers.

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
  - hotfix: `hot-fix-_issue_`
  - feature: `feature-_feature-name_`
  - bug (that is not a hot fix): `bug-_bug-info_`

- Do you use github issues or another ticketing website?

  - We will be using `Jira` as a ticketing platform.

- Do you use pull requests?

  - Yes each feature, bug and hot fix should have an independent pull request.

- Process:
  1. Clone this repository and create a new branch off the dev branch with the appropriate name.
  2. Implement the feature.
  3. Test your feature and ensure it does not break any existing functionality.
  4. Create and submit a pull request with a detailed description to be reviewed by at least two other contributors.

## Authors

- [Mohamed Tayeh](https://github.com/mohamed-tayeh)
- [Bassel Ashi](https://github.com/BasselAshi)
- [Connie Lin](https://github.com/connieJ-lin)
- [Mohammad Qadir](https://github.com/DomiVesalius)
- [Karandeep Lubana](https://github.com/KarandeepLubana)
- [Jiaming Yang](https://github.com/Jiaming-Yang-20)
- [Juan Camilo Corral](https://github.com/Wikisaqui)
