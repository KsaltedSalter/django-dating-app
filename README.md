# Project 4 - Django Dating App

A three week pair project creating a dating app for those that live in the anime world.

<img width="1425" alt="Screenshot 2022-01-19 at 21 28 13" src="https://user-images.githubusercontent.com/85836801/150216666-0434ff57-11fc-47dd-9abd-32b98a14e41f.png">

[Click to see Ani-mate Dating App](https://ani-mate-django.herokuapp.com/)

## Table of contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Idea & Wireframe](#idea-&-wireframe)
- [Process](#process)
- [Challenges](#challenges)
- [Wins](#wins)
- [Future](#future)

## Technologies

Project is created with:

- React
- Python
- Django
- Restframework
- Balsamiq (for wireframing)
- Webpack
- Babel
- SASS
- JWT
- Bootstrap (for styling)
- Material UI Search Bar
- Postman

## Setup

To run this project, clone it and install it using yarn.

```
$ git clone https://github.com/antonylong/django-dating-app.git
$ cd django-dating-app
$ cd dating-backend
$ pip install
$ python -m pip install django-cors-headers
$ python manage.py runserver
$ cd ..
$ cd client
$ yarn
$ yarn start
```

## Idea & Wireframe

We started off by talking about our individual initial idea. We both touched upon doing a dating app so went forward with this idea. We came up with our concept together and what features we would like to add. A wireframe was created with potential colour schemes and app name

![Screenshot 2021-11-04 at 18 37 18](https://user-images.githubusercontent.com/85836801/140401085-d786827e-93b1-4596-a266-739a6c95a2cf.png)

![Screenshot 2021-11-04 at 18 47 23](https://user-images.githubusercontent.com/85836801/140401252-0b0767b5-d728-455f-a7cb-d708c12faada.png)

## Process

We started off working on the backend creating two different API’s, one for personas or the dating profile itself and one to handle logging in information. We decided to have two api’s to handle account and persona information separately which had its strengths and weaknesses. Once the functionality was checked in Postman, we moved onto the frontend functionality. Implementing registering a user, logging in, creating and editing a dating profile, looking at and searching other profiles and leaving them a ‘wink’. Styling was done at the same time as some of the components as it is difficult to see forms unstyled but a majority of styling was left till last.

## Challenges

- Antony had an issue with JWT, which took a long time. He was having an error "JWT: 'module' object has no attribute 'encode'". This took quite a while to resolve. Required for virtual environments on his local machine to be deleted and reinstalled.
- I had a lot of issues with JWT Authentication. For some reason it would just not work and would not give a token to the user trying to log in. I tried several different ways to fix what I had but found the best way to resolve this was to delete the authentication and start from scratch reading the available documentation to really understand what I was doing.
- Having two separate api’s to handle account and persona information proved to be a bit of a challenge when it came to linking the persoana data to the account information. The easiest fix was to make an api call to the account api to get the user id at the same time as the persona api to store the user id to the persona so that there was a link between the two.

## Wins

- The search function in django was fun to research and relatively easy to implement in a search component
- When creating a profile we wanted to also include a profile picture. This was a fun and interesting functionality that I had not used before. A function that used an external api called Cloudinary was created, which would store the url image
- I am quite proud of how much functionality there is in the dating app. I really enjoyed putting this together and learning so much about django and python as well.


## Future

- To include a chat function so that matches can talk to each other
- The design itself could be a little more dynamic and modern.
- Most dating apps today have a swipe or like feature so this would also be good to include to compete with its peers.
