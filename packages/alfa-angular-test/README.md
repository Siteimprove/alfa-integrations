# Alfa Angular tests

This package sets up a very simple (and simplified) Angular "library" project that is used to test Alfa's Angular support. It is not a real library. It should not be published.

While Angular is using Vitest for its tests, like the rest of our packages, it is also doing some deeper setup of test beds, … Therefore it is much easier to run Angular's own test runner rather than trying to redo the setup. In turn, this is easier done by setting up a separate Angular "project" than merging it into an existing package.
