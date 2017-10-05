# Client Side - UBC LFS Dietetics

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Note: Project requires a server to work and XMLHTTP request urls need to change accordingly.

## Local Development

```
git clone https://github.com/UBC-LFS/lfs-dietetics-app-client.git
npm install
npm start
```

## Production 

```
npm run build
```

```
** Modified shell script to build into the following path: ../lfs-dietetics-app-server/public **

To revert to default build path: 

In package.json edit "build": 

"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build ",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }

``` 

## License 

Copyright (c) 2017 UBC Faculty of Land and Food Systems