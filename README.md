# Node-Api-Modular
Login/Register Api using good modularity and design practices for production

# Routes:
## POST
 
### Host/api/users/login

Request: { 
        
        "email": email, 
        "password": password 

}

Response: {

      "status": true,
      "message": "Login Successfully",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvIiwiaWQiOiI2MjUyMmY4NmZjM2E2MjQ2ZTBkNWM2OTgiLCJleHBpcmF0aW9uIjoxNjUwMTU5MTUwLCJpYXQiOjE2NDk1NTQzNTAsImV4cCI6MTY1MDE1OTE1MH0.Z-jWIIjsp2rtPxhFqZrFpBWETnv-l0h4fmAHSxcNEHU"

}

### Host/api/users/response

Request: { 
        
        "user": username,
        "email": email, 
        "password": password ,
        "confirmPassword": password

}

Response: {

      "status": true,
      "message": "Register Successfully",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvIiwiaWQiOiI2MjUyMmY4NmZjM2E2MjQ2ZTBkNWM2OTgiLCJleHBpcmF0aW9uIjoxNjUwMTU5MTUwLCJpYXQiOjE2NDk1NTQzNTAsImV4cCI6MTY1MDE1OTE1MH0.Z-jWIIjsp2rtPxhFqZrFpBWETnv-l0h4fmAHSxcNEHU"

}

### .env file should be put into .gitingore
 
