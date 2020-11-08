# Prosjekt - PROG2053

## Installation notes: 
- Install nodeJs
- Run "npm i" in both the server and client folders of the project.    
- While in the root folder of the project: "docker-compose up -d" - this will take a long time the first time you do it.
- Are you getting an error after doing "docker-compose up -d", saying "[...] Filesharing has been cancelled"? 
-> Go to Docker for Windows app (or similar) -> Settings -> Resources -> File sharing -> Add all your drives (or play around with figuring out what exactly you need).
- Are you getting an error saying "npm ERR! ch() never called"? 
-> Delete "package-lock.json" from the client directory, then build the client again using "docker-compose build client"

Want to reset your containers and volumes fully? 
- "docker system prune -a --volumes"

Want to get in to a container for some reason? 
- "docker-compose exec <containername> bash" 

## Group members:     
- Oddbjørn S. Borge-Jensen
#Odd Hald Bliksås"#   
- Nicholas Bodvin Sellevåg
Wojciech Kurp
## Setup: 
- docker-compose up -d   
---
# Local dependensies
## Server:
- cd til servermappe
- npm install mysql --save //for mysql
- npm install multer --save //Brukes til formdata på serversiden --Odd
- npm install cors --save //Brukes for cors autentisering mot express api --Odd
- npm install fs --save //Brukes for filhåndtering --Odd
- npm install randomstring --save //Brukes for randomisering av filnavn --Odd
- npm install @vaadin/router --save //Brukes til å sette opp ruter --Odd


The project runs on localhost:8080   
