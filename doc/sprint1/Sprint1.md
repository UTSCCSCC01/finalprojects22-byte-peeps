## Sprint 1 Planning Meeting

- Meeting was held Wednesday 1st June 2022
- We decided that due to the nature of the product, we should aim to develop at least one feature from each aspect of the full stack tech (frontend, backend, data pipelines and deployment), so that are able to build on top of this foundation later on in the project.
- Thus we split the user story small stories based on the following categories:

  1. Frontend
  2. Backend
  3. Data Pipeline
  4. Database
  5. Data Analysis and ML libraries
  6. User authentication

- The aim of these categories to segregate the user stories within them to lay a solid foundation for the upcoming sprints

## Sprint goal

To set up a solid foundation for the next sprints by finishing the user current user stories:

- Implement YouTube pipeline (BYT-43)
- Implement Instagram pipeline (BYT-9)
- Research ML libraries and implement one (BYT-28)
- Website design and navigation (BYT-26)
- User sign up, sign in and sign out (BYT-22, BYT-23)
- Implement a simple chart component (BYT-51)
- Research simple statistic analysis template (BYT-37)
- Add additional boiler plate (redux) (BYT-27)
- Design a scalable database implementaiton (BYT-25)

## Team Capacity

Our strategy was to create the user stories for each sprint and assign an estimate to each. We used powers of 2 and assigned a value of 1 to the easist story which was Redux implementation that is expected to be coded with a plethora of tutorials and documentation, hence the easiest task label. Then the rest of the stories were assigned a value with the easitest as a refernce. Each one of us chose the stories that they liked to work on and believed have enough time to finish during this sprint. Our velocity is recoreded as 74. Considering that many of us have previous Full Stack experience in some of the technologies that we are using, we believe that this value makes sense.

## Tasks Breakdown

User Stories:

- Implement YouTube pipeline (BYT-43): Mohammad Qadir
- Implement Instagram pipeline (BYT-9): Juan Camilo Corral
- Research ML libraries and implement one (BYT-28): Mohamed Tayeh
- Website design and navigation (BYT-26): Connie Lin
- User sign up, sign in and sign out (BYT-22, BYT-23): Jiaming Yang
- Implement a simple chart component (BYT-51): Karandeep Lubana
- Research simple statistic analysis template (BYT-37): Mohamed Tayeh
- Add additional boiler plate (redux) (BYT-27): Karandeep Lubana
- Design a scalable database implementaiton (BYT-25): Bassel Ashi

Other:

- CRC Cards: Everyone except Mohamed Tayeh
- sprint1.md, RPM.md: Mohamed Tayeh
- Documentation: Everyone
- Standups: Everyone

---

## Spikes

- Google Maps Reviews: Mohammad Qadir conducted research on how to access the google reviews completed on google maps. Unfortunately after delicate research in documentation and tutorials, it was only possible to retrieve the most recent 5 reviews. It found that there is another API that can be used to pull all the reviews but will be difficult to set up called the Google Business API. Due to unexpected complexity, we discussed and decided that is better to focus on another less complex API, such as the YouTube API.

- ML API Wrapper: a good ML API was found called DatumBox that has a 1,000 call quota per developer, however the NodeJS API wrapper that was difficult to work with and was reliant on deprecated dependencies that had critical vulnerabilties. Thus we decided to create our own API wrapper that also allows for batch requests for sentiment analysis, content classification and subjectivity analysis.

- Deploying using GitHub actions and `nektos/act`: unfortunately, not only are GitHub actions displayed but so is the docker container repository, thus uploading docker containers using locally run GitHub actions is not possible. Thus a new actions file had to be written to be run locally on Mohamed Tayeh's computer to deploy the latest version of the product.

---

## Participants

Mohamed Tayeh, Bassel Ashi, Connie Lin, Mohammad Qadir, Karandeep Lubana, Jiaming Yang, Juan Camilo Corral
