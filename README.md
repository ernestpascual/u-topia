# U-topia

### Description

Front end access here:
https://u-topia-593s.vercel.app/

Connect only on ETH Sepolia. Address deployed on 0x8464135c8F25Da09e49BC8782676a84730C318bC

### Running contracts

All contracts can be found here:
https://github.com/ernestpascual/contracts-utopia

Make sure to install the latest foundry found [here](https://book.getfoundry.sh/getting-started/installation)

To run tests:
`forge test`

To deploy contract:
`forge forge create src/Donation.sol:Donation -r [rpc url] --private-key [private key]`
you can use `--account` as well.

### Running frontend

1 - run `yarn` to install dependencies
2 - run `yarn dev`

You can check out front end also on the description

Cheers 🚀
