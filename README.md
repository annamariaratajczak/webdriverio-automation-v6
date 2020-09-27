# webdriverio-automation-v6

1. Install gitbash
2. Install nodist https://github.com/nullivex/nodist
3. Install node and npm using nodist

```sh
nodist global 12.18.3
nodist npm global 6.14.8
```

```sh
# Run tests
npm run test

# Generate allure html reports
npm run generate-report

# Open Reports
npm run open-report
```

# Run specific test
npm test -- --spec=test/specs/testName.js