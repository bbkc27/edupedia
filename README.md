# edupedia
___________________________

### [Live Link](https://edupedia.herokuapp.com/signup)
___________________________

### Project Description

Edupedia is an application built for teachers. Teachers can use the tool to keep track of educational games and resources that already exist. Teachers can sign up using a unique username and password. Once signed up, users have access to 6 educational resources. They can view, favorite, edit, and delete already existing resources. They can also add new resources to the database. 

**Screenshots**
![Home Screen](/images/projectTwoHomeScreen.png)
![Sign Up Form](/images/projectTwoSignUpForm.png)
![All Resources](/images/projectTwoAllResources.png)
![View Resource](/images/projectTwoViewResource.png)
![Edit Resource](/images/projectTwoEditScreen.png)

___________________________

### Languages Used
- HTML5 (browser rendered home page)
- EJS (server rendered state and activity pages)
- CSS3
- JavaScript
- NodeJS
- Mongoose
- ExpressJS
- PassportJS

___________________________

### Original Wireframes

![Home screen, all resources, add new resource page](https://media.git.generalassemb.ly/user/41193/files/605ecf80-b8f4-11ec-88a2-27dec2d53a2c)

___________________________

### Major Hurdles

- Connecting the object key "keywords" to the checkboxes on the edit / new pages to allow users to easily update information about the resources (documents)
- Connecting the object key "favorite" to the favorite button so users can easily favorite resources
- Only allowing logged in users to favorite resources and having favorite resources saved to users. 
- Making the search bar functional (req.query) so the value input into the search bar by a user returns a list of resources that include that keyword 
- Using passport to define user sessions and protecting user passwords through hash 
- Connecting the login collection and the resource collection together

___________________________

### Future Inclusions

- Have the username of the current signed-in user to display instead of the log in button in the header
- Make the design more mobile-friendly 
- Integrate 2-factor authentication