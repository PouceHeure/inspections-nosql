# NoSql Project
------

## Structure project
The project uses:
- mongodb for storing the dataset
- react + node js front side
- node js back side

:warning: You have to install (if you hasn't already installed):
- mongodb - more information: [official site](https://www.mongodb.com/)
- node js - more information: [official site](https://nodejs.org/en/)

This project is split in 2 parts:
- back-end side
- front side

:warning: For launching the project, you need to run these 2 parts.

## Getting started

1. Update the database: ```
  mongoimport –db inspections –collection restaurant –drop –file inspectionsRestaurant.json ```
:warning: If you change the database name and table, please change the mongodb-config at [config-mongodb](/back-end/mongodb-config.json)


2. Go (with terminal) in the [api folder](/back-end) ```npm install```

3. Go (with terminal) in the [front folder](/front/inspections-app) ```npm install```

### Installations are finished, we can now launch the project.

1. Open 2 terminals (one for the back-side, an other for the front-side)

2. Launch the api:```node back-end/api.js ```

3. Launch the front:
- move to the folder react: ```cd front/inspections-app/ ```
- execute this command:  ``` npm start ```

:cop: The login administrator:
- login: admin
- password: admin

:information_source: If you want to change login edit this  [file](/front/inspection-app/src/config/login.json)  

:information_source: An API doc is available open this [file](/doc/api/index.html) with your browser  

:warning: Please keep terminal open until you finish

## Results

![Alt text](/screens/screen01.jpeg?raw=true "")

![Alt text](/screens/screen02.jpeg?raw=true "")

![Alt text](/screens/screen03.jpeg?raw=true "")

![Alt text](/screens/screen04.jpeg?raw=true "")

![Alt text](/screens/screen05.jpeg?raw=true "")
