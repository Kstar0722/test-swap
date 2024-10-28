# $GOODLE Swap

## Overview

\$GOODLE Swap Goodleswap aims to revolutionize decentralized finance (DeFi) with a cutting-edge AMM built for efficiency and speed. With a lighthearted approach to liquidity pools, it's meme-inspired yet powerful enough to drive serious liquidity across Pivotal's ecosystem.
API documentation is provided via [Swagger](https://swagger.io/).
The project is deployed using [AWS EKS](https://aws.amazon.com/eks/), and continuous integration and deployment (CI/CD) are handled through [Jenkins](https://www.jenkins.io/).

## Features

- **Next-Gen AMM**: Advanced algorithm for efficient and secure trading.
- **Meme-Inspired**: Fun and engaging visuals, designed for a more entertaining user experience.
- **Fast & Reliable**: Built for speed, ensuring seamless transactions and interactions.
- **Central Liquidity Hub**: Designed to provide liquidity to Pivotal's ecosystem.

## Project Links

- **Production URL:** <https://goodleswap.com>
- **Staging URL:** <https://staging.goodleswap.com>
- **Git Repository:** <https://github.com/Pivotal-Research/goodleswap-frontend>

## Technologies

- **Frontend Framework**: [Next.js](https://nextjs.org/) – a React framework for building fast, user-friendly web applications.
- **Deployment**: The application is deployed using [AWS Amplify](https://aws.amazon.com/amplify/), ensuring scalable and secure hosting.

## Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)** version 18 or higher
- **[npm](https://www.npmjs.com/)**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Pivotal-Research/goodleswap-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd goodleswap-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Use Doppler to manage and synchronize environment variables across the development team.

### Doppler Setup

To ensure environment variable synchronization, we use [Doppler](https://www.doppler.com/). Here's how to set it up:

1. Install Doppler CLI:

   Follow the instructions to install Doppler CLI from [here](https://docs.doppler.com/docs/install-cli).

2. Login to Doppler:

   After installation, log in to Doppler using the following command:

   ```bash
   doppler login
   ```

3. Set up Doppler for your project:

   Run the following command inside your project directory to connect Doppler with your local environment:

   ```bash
   doppler setup
   ```

   Select the `goodleswap-frontend` project and the appropriate environment

   | Environemnt | Slug  |
   |-------------|-------|
   | Development | dev   |
   | Staging     | stg   |
   | Production  | prd   |
   | Test        | test  |

4. Start the application using Doppler:

   Use Doppler to inject environment variables when running your application:

   ```bash
   doppler run -- npm run dev
   ```

   This will ensure that the correct environment variables are loaded from Doppler.

### Available Scripts

- Running the Application

   To start the application in development mode:

   ```bash
   npm run dev
   ```

   To start the application in development mode with `Doppler`:

   ```bash
   npm run doppler:dev
   ```

- Building the Application

   To build the application for production:

   ```bash
   npm run build
   ```

- Running in Production

   To run the built application:

   ```bash
   npm run start
   ```

### Testing

   Doppler is configured with `dev`, `stg`, `prd`, and `test` environments. You can run tests with the following commands:

- Run tests:

   ```bash
   npm run test
   ```

   To run tests with `Doppler`:

   ```bash
   npm run doppler:test
   ```

- Watch for changes in tests:

   ```bash
   npm run test:watch
   ```

- Run tests with coverage:

   ```bash
   npm run test:cov
   ```

- Run end-to-end tests:

   ```bash
   npm run test:e2e
   ```

   To run tests with `Doppler`:

   ```bash
   npm run doppler:test
   ```

## Deployment

The deployment is handled through [AWS Amplify](https://aws.amazon.com/amplify/).
## License

This project is licensed by [Bolt Global Inc](https://www.boltos.ai/) - see the LICENSE file for details.
