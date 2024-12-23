import Dai from '@/contracts/dai.sol/Dai.json';
import  Vat from '@/contracts/vat.sol/Vat.json';
import DaiJoin from "@/contracts/join.sol/DaiJoin.json";
import GemJoin from "@/contracts/join.sol/GemJoin.json";
import Spot from "@/contracts/spot.sol/Spotter.json";
import Dog from "@/contracts/Dog.sol/Dog.json";
import Clip from "@/contracts/clip.sol/Clipper.json";
import Abacus from "@/contracts/abaci.sol/Abacus.json";
import Flap from "@/contracts/flap.sol/Flapper.json";
import Flop from "@/contracts/flop.sol/Flopper.json";
import Vow from "@/contracts/vow.sol/Vow.json";
import Jug from "@/contracts/jug.sol/Jug.json";
import Gem from "@/contracts/token.sol/DSToken.json";


export const contracts = {
  Dai: {
    address: "0xD34b13a386DC287881503AD1F9D97b34a9eFfd0e",
    abi: Dai.abi
  },
  Gem: {
    address: "0x6077Cb4Bf24127Ea554644c68Cb2eA9e71732653",
    abi: Gem.abi
  },
  Vat: {
    address: "0x1d4EAf34C1530aB17d34Cb9c303edB3caeDE539E",
    abi: Vat.abi
  },
  DaiJoin: {
    address: "0x081304b272127199cdbE2a613903d8D31C7f9994",
    abi: DaiJoin.abi
  },
  GemJoin: {
    address: "0xC94D7Fd0410CD4D7fC4864f84c6c4196Ab8Cd023",
    abi: GemJoin.abi
  },
  Spot: {
    address: "0x77a4d0b04174Fb1792E37b2aF3245CAf117f8972",
    abi: Spot.abi
  },
  Dog: {
    address: "0x91fc27f306bCF456F5836ed08faCd6691A0a1B0C",
    abi: Dog.abi
  },
  Clip: {
    address: "0xbB3052ffdd867F835eED8Fc5F341072D0613D421",
    abi: Clip.abi
  },
  Abacus: {
    address: "0x2C333A56E93cf40208389BD12534091905e2DD24",
    abi: Abacus.abi
  },
  Flap: {
    address: "0xF100c69aFb749E11cB7FFa49C74d405F3082f536",
    abi: Flap.abi
  },
  Flop: {
    address: "0x1e978764e6Bb7A6C24ddD790dEE19731167e4A00",
    abi: Flop.abi
  },
  Vow: {
    address: "0x5F52B2956E15b5F838Fc3782267808c436513469",
    abi: Vow.abi
  },
  Jug: {
    address: "0xfC957eE17A0BaA113c76c02e0540794b6EC68e3D",
    abi: Jug.abi
  },

};