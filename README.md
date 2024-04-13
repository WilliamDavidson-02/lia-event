<p align="center" ><img src="https://kladdforforandring.vercel.app/images/yrgo-logga.webp" alt="yrgo" width="300px" /></p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Prerequisite](#prerequisite)
- [DD+WU Project 2024](#ddwu-project-2024)
- [Digital Solution Requirements](#digital-solution-requirements)
- [Mapbox](#mapbox)
- [Supabase](#supabase)
  - [Supabase (local development)](#supabase-local-development)
- [Installation](#installation)

## Prerequisite

- Mapbox account
- Supabase account
- Docker desktop

## DD+WU Project 2024

This project is aimed at fostering connections between industry professionals and students studying Web Development and Digital Design at Yrgo. The event scheduled for Wednesday, April 24th, from 15:00 to 17:00, serves as a networking opportunity for students seeking future internship opportunities. Attendees will have the chance to interact with Web Developers and Digital Designers from Yrgo.

The DD+WU project entails the creation of a digital solution for the Branschevent 2024. Winning teams, selected by a jury, will have their solution utilized for the event. The chosen team will also have the opportunity to present their solution and discuss their development process during the event, providing invaluable exposure to visiting companies.

## Digital Solution Requirements

- Mobile-first design
- Accessibility compliant with EN 301 549 (WCAG 2.1 AA)
- Ability for students to search and retrieve information about companies for internships
- Easy input of company information for quick access by students
- Visual design aligned with Yrgo's branding
- GDPR-compliant data handling and privacy measures
- Additional features such as interactive elements or personalization options are encouraged

## Mapbox

Create a new mapbox access token in you [mapbox account page](https://account.mapbox.com/auth/signin/?route-to=%22https://account.mapbox.com/access-tokens/clu3xw9o718np2qk12k7pukyb/%22), select all public scopes and add your URLs to restrict the access token to.

Then add the token to your `.env` file.

```js
VITE_MAPBOX_ACCESS_TOKEN= /* ACCESS TOKEN */
```

## Supabase

Create a new supabase project and copy your project `url` and your public `anon key` in to your `.env` file.

```js
VITE_SUPABASE_URL= /* PUBLIC URL */
VITE_SUPABASE_KEY= /* ANON KEY */
```

### Supabase (local development)

If you want to use supabase on your local development machine, make sure you have `supabase cli` and `docker desktop` installed.

There is a supabase folder with migration and seeder located in the folder `/supabase`.

To start supabase locally run

```bash
supabase start
```

Make sure to include the `url` and `anon key` for the local supabase database in your `.env`.

```js
VITE_SUPABASE_URL= /* API URL */
VITE_SUPABASE_KEY= /* ANON KEY */
```

For more information about developing lcoally with supabase please refer to supabases [documentation](https://supabase.com/docs/guides/cli/local-development)

## Installation

Download to your project directory

```bash
git clone https://github.com/WilliamDavidson-02/lia-event.git

cd lia-event

cp .env.example .env

npm install
```

When every thing is setup correctly run your local server

```bash
npm run dev
```
