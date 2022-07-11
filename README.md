> Due to error on Vercel, i've deployed a new one on Cloud Run, please check https://compfest-screening.abimanyu.co or https://kanjur-web-app-mgvpgwbiba-uc.a.run.app/
>
> It's just an error on Vercel serverless function deployment, it runs fine on local or Docker

## Getting Started

First, move or create new `.env` file referring to `.env.example`

Run the development server with postgres migration on /src/utils/db/init:

```bash
npm install && npm run dev
# or
yarn install && yarn dev
```

or, run with Docker using `docker-compose up`
