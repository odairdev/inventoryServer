<h1 align="center">
  Inventory Server
</h1>

<h3 align="center">
  Web Server to manage products in an inventory system </br>
  Made with NodeJS, TypeORM and Typescript
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/badge/typescript-100%25-blue">

  <a href="https://www.linkedin.com/in/odairjcjunior/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/Made%20by-odairdev-blue">
  </a>
  
  <a href="https://github.com/cassiogroh/WeatherHome/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/odairdev/inventoryServer?style=plastic>">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/odairdev/inventoryServer?style=plastic">

</p>

<p align="center">
  <a href="#%EF%B8%8F-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## ✔ About the project

This app provides a server with a database coded with NodeJS, TypeORM and Typescript.

 - You can create new users and use authentication with JWT.

 - It's possible to register new products as well as edit, read and delete them.

 - You can create Inventory Orders (in or out) that will directly affect the amount of that product amount.

 - Restful API

## 💻 Technologies

Technologies used to develop this App
- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Express](https://expressjs.com/pt-br/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [PostgreSQL](https://www.postgresql.org/)
- [Bcrypt-nodejs](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [UUID](https://www.npmjs.com/package/uuid)
- [YUP](https://www.npmjs.com/package/yup)

## 🚀 Getting started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) or any software to create isolated ambients with containers.

**Clone the API project and access the folder**

```bash
$ git clone https://github.com/odairdev/inventoryServer && cd inventoryServer
```

**Follow the steps below**

- Create a .env.local file with a JWT_SECRET constant
- Set a Container for the postgres DB in port: 5632

```bash
# Install the dependencies
$ npm install

# Start the app
$ npm dev

# Well done, project is running!

```


## 🤔 How to contribute

**Fork this repository**

```bash
# Fork using GitHub command line or trhough website

$ gh repo fork odairdev/inventorySystem
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd WeatherHome

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

Made by Odair José Custodio Junior 👍 &nbsp;[See my linkedin](https://www.linkedin.com/in/odairjcjunior/)
