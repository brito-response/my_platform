<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h4 align="center">A freelancer platform that aims to correct common mistakes made by others..</h4>

<p align="center">
    <img src="badges">
</p>

<p align="center">
    <a href="#Technologies_Used">Technologies Used</a> •
    <a href="#Api_resources">Api resources</a> •
    <a href="#Folder_Architecture">Folder Architecture FrontEnd</a> •
    <a href="#Folder_Architecture">Folder Architecture BackEnd</a> •
    <a href="#Running_Application">Running application</a> •
    <a href="#About_the_Author">About the Author</a> •
    <a href="https://github.com/99neto/b_divulgapotiguar/blob/main/LICENSE">Licensing</a>
</p>

## Technologies_Used

- Nestjs, Nextjs and tailwindcss

## Designer_basis_for_application

- [figma](https://www.figma.com/design/2JBStvf2FLCR542k872sjv/Design-Agency-Landing-Page--Community-?node-id=0-1&m=dev&t=bYwey8RIT9Ur0zMG-1)

## Prerequisites

- Nodejs v 24
> [!IMPORTANT]
> create archive *_.env.local_*  in frontend folder root of project:
> create archive *_.env_* in backend folder root of project:

- Backend .env
``` 
    JWT_SECRET=token32b
    JWT_REFRESH_SECRET=token32b
    
    EMAIL_HOST=example@gmail.com  
    EMAIL_PORT=587
    EMAIL_USER=example@gmail.com  
    EMAIL_PASS=example#
    TOKEN_SECRET=token_secrets

    EFIPAY_URL=https://api.efipay.com.br
    EFIPAY_CLIENT_ID=efipay_client_id
    EFIPAY_CLIENT_SECRET=efipay_client_secret
    EFIPAY_CERTIFICATE_PATH=./certs/efipay_cert.pem
```

- Frontend .env.local
``` 
    NEXT_PUBLIC_URL=http://localhost:3001
    NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
    NEXT_PUBLIC_GITHUB_TOKEN=chico_da_bica
    NEXTAUTH_URL=http://localhost:3001
    NEXTAUTH_SECRET=secret
```

## Running_Application

- Go to the my_platform folder for create database :
```bash
    docker compose up -d
```
- Go to frontend folder:
```bash
    npm i && npm run dev
```
- Open a new terminal and go to backend folder:
```bash
    npm i && npm run start:dev
```

- run tests
> [!WARNING]
> Before running the tests, it is important to follow the steps below.



## About_the_Author
- Clodoaldo Neto :call_me_hand:
