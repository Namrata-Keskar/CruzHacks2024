# HomeBase
## Inspiration
**Homelessness is one of the greatest issues of our time.** CA hosts half of the unsheltered population in the United States. In the Bay Area alone, every night 38,000 people sleep on the streets. The city of Santa Cruz, has the highest unhoused population per capita in California. 

We wanted to address the root problems: **lack of centralization of resources and a lack of updated information about these resources.** Currently, people who need help must dig through complicated websites for each and every service online. They will check hours of operation, travel to the location, only to find out that the information is outdated! This is exactly what we're solving with HomeBase. 

## What HomeBase does
**HomeBase is a comprehensive resource tool for community members to access services spanning hot meals, shelter, and medical and mental health help.**

Each service can be located on a **map**, so users can find the nearest service to them. We know that folks may have lack access to transportation, so we prioritized this map view. Furthermore, each service is filtered by date so we can see the present services first in the list view. 

Our most unique and important feature is how the**service providers** (shelters, food pantries, etc) can sign up, log in, post their events, edit them, and update the events live. The days of outdated information are over! 

## How we built HomeBase
We used Firebase for our backend and deployment, ReactJS to build our frontend, and the Google Maps API. 
Our goal is to eventually serve thousands of people, so we focused on **scalability**. We persistently ensured that our data is stored dynamically through implementing a complex and scalable database on Firebase. Instead of hardcoding categories of food, medical, and housing, we have a **dynamic schema** which allows us to easily add hygiene, veteran, and mental health services in the future. Instead of hardcoding our values for each service, our dynamic database allows users to truly update services live. We also harnessed the Google Maps API to present the services on a map on the site. 

## Challenges we ran into
Our team was committed to modularity and efficiency. We created over twenty GitHub branches, so we could work simultaneously. So, we did run into some merge conflicts and complications, and are very grateful to the mentor table's support for helping us debug. Half of our team had to learn Firebase and ReactJS for the first time, so while it was initially very frustrating to learn new skills, our team seamlessly worked together and were able to learn so many new skills while building an impactful product. 

## Accomplishments that we're proud of
We are very proud of our efficient and scalable backend implementation. We were able to allow users to dynamically add and update events, which solves the pertinent root issue of outdated information in the current world. We initially planned to only be present a list view, but we were able to manage our time well enough that we could also implement a map view. We are proud of our persistence and time management skills. 

## What we learned
We learned how to implement Google APIs . Half of our team did not have experience with ReactJS and Firebase. We also learned how to use Figma for the first time which helped properly plan our design. Planning our design and allocating tasks for a complex project in an efficient way was very instrumental to the completion of our project. Our team really bonded over the delirious late night coding and debugging sessions. 

## What's next for HomeBase 
In the next phase of HomeBase, our focus is on scaling geographically and expanding our features. We aim to connect homeless service providers and people in need nationwide and build a strong digital supportive community. We want to expand the database to include more services beyond the food, medical, and housing. We hope HomeBase continues to be a valuable resource in **bridging the gap between those in need and service providers to end homelessness one connection at time.**
