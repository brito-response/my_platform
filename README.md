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

- Nestjs, Nextjs e tailwind css

## Designer_basis_for_application

- [figma](https://www.figma.com/design/nxZwWJxp4Zjshgj4WBGJRs/Clothing-Store-App%2FFashion-E-Commerce-App-%7C-App%C2%A0UI%C2%A0Kit-(Community)?node-id=0-1&t=qj4wMnJPPOHwPeJu-1)

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

- Entre nessa pasta  e rode docker compose up -d para criar container do banco.
- Abra terminal na pasta frontend
```
    npm i && npm run dev
```
- Abra terminal na pasta backend
```
    npm i && npm run start:dev
```

- run tests
> [!WARNING]
> Before running the tests, it is important to follow the steps below.



## About_the_Author
- Clodoaldo Neto :call_me_hand:

color base: backgroundColor: '#8B5E3B',
