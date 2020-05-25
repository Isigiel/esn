<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo, twitter_handle, email
-->





<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
<!-- [![Issues][issues-shield]][issues-url] -->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Build Status][build-shield-2]][build-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Isigiel/esn">
    <img src="_github/images/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ESN.WORLD</h3>

  <p align="center">
    A web app to help run esn sections
    <br />
    <a href="https://dev.azure.com/isigiel/tumi/_wiki/wikis/tumi.wiki/1/Home"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/Isigiel/esn">View Demo</a>
    ·
    <a href="https://github.com/Isigiel/esn/issues">Report Bug</a>
    ·
    <a href="https://github.com/Isigiel/esn/issues">Request Feature</a> -->
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents


- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

[![ESN.WORLD Screen Shot][product-screenshot]](https://tumi.esn.world)


### Built With

* [angular](https://angular.io/)
* [nest](https://nestjs.com/)
* [material](https://material.angular.io/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure to have this installed before continuing
* node
* npm
* yarn

Have a mssql database ready and enter the connection details into `server/.env` you can user `server/.env.template` as a reference.

### Installation
 
1. Clone the repo
  ```sh
  git clone https://github.com/Isigiel/esn.git
  ```
2. Install packages
   * For the client
    ```sh
    cd client
    yarn
    ```
   * For the server
    ```sh
    cd server
    npm install
    ```
3. Start dev servers
   * For the client
    ```sh
    cd client
    yarn start
    ```
   * For the server
    ```sh
    cd server
    npm run start dev
    ```
4. Now your local copy should be running at `localhost:4200`



<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->



<!-- ROADMAP -->
## Roadmap

See the [boards](https://dev.azure.com/isigiel/tumi/_boards/board/t/tumi%20Team/Epics) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the GPL3.0 License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

<!-- Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email -->

Project Link: [https://github.com/Isigiel/esn](https://github.com/Isigiel/esn)



<!-- ACKNOWLEDGEMENTS -->
<!-- ## Acknowledgements

* []()
* []()
* []() -->





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Isigiel/esn.svg?style=for-the-badge
[contributors-url]: https://github.com/Isigiel/esn/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Isigiel/esn.svg?style=for-the-badge
[forks-url]: https://github.com/Isigiel/esn/network/members
[stars-shield]: https://img.shields.io/github/stars/Isigiel/esn.svg?style=for-the-badge
[stars-url]: https://github.com/Isigiel/esn/stargazers
[issues-shield]: https://img.shields.io/github/issues/Isigiel/esn.svg?style=for-the-badge
[issues-url]: https://github.com/Isigiel/esn/issues
[license-shield]: https://img.shields.io/github/license/Isigiel/esn.svg?style=for-the-badge
[license-url]: https://github.com/Isigiel/esn/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/heddendorp/
[build-shield]: https://dev.azure.com/isigiel/tumi/_apis/build/status/Isigiel.esn?branchName=master
[build-shield-2]: https://img.shields.io/azure-devops/build/isigiel/tumi/9?style=for-the-badge
[build-url]: https://dev.azure.com/isigiel/tumi/_build/latest?definitionId=9&branchName=master
[product-screenshot]: _github/images/screenshot.jpg