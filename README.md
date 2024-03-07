# Express typescript mongodb boilerplate

This is a boilerplate code for an express API with mongoose, written in
typescript. Please replace the content with your own after cloning the repo.

## Development

- Make sure node 14 and above is installed.
- Have mongodb running.
- Install project dependencies with `npm i`.
- For development, run
```
$ npm run dev
```
- There is a pre-configured postman collection at [contrib/postman.json](contrib/postman.json)
To use it, please set the postman envs
  - `Host` as `http://localhost:3333`
  - `ApiVersion` as `/api/v01`

## Request flow

```
route --> validate middleware (uses schema) --> controller --> service
```

## Authentication

- The session create endpoint returns an `accessToken` and `refreshToken`.
- By default `accessToken` is valid for 15 minutes and `refreshToken` is valid for
1 year.
- All authenticated requests should contain the `accessToken` as a Bearer Token in
the header and `refreshToken` may be added in the headers with key `x-refresh`.
- If `accessToken` has expired and there is an unexpired `refreshToken`, the backend
will re-issue a new `accessToken` in the response header `x-access-token`.
- All autheticated requests will have this flow baked in.
- Please refer the [postman collection](contrib/postman.json) for how that is setup.
- JWTs are generated with private and public key pairs. Please refer to
[.env.example](.env.example) for how to set one up. With out a key pair, the api
wont start up!

### Notes

- `npx tsc --init` will create a `tsconfig.json` file. This configures the typescript
compiler. In `tsconfig.json`, we specified `"outDir": "build",` to specify that
a folder called `build` in the project folder is the destination for the
typescript compiler i.e `tsc`. Check `package.json` file.

- The `items` module is a test module to see how authenticated CRUD ops are handled.
## Deployment

```
$ npm run build
```

This will create a `build` folder with js files that can be run with vanilla node.
Ship the build folder in our docker image.
