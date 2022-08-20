import fs from "fs";
import log4js from "log4js";
import path from "path";

import {
  generateMnemonic,
  keyDerive,
} from "@zondax/filecoin-signing-tools/js";

import {init, ContractManager} from "@zondax/fvm-client-tool";
import { Contract } from "../../build/definition";

jest.setTimeout(300 * 1000);

const URL = process.env["NODE_URL"];
const TOKEN = process.env["NODE_TOKEN"];
const SEED = process.env["SEED"];

const WASM_ACTOR = "../../build/release.wasm";
const ABI_ACTOR = "../../build/abi.json";

const logger = log4js.getLogger();
logger.level = process.env["LOG_LEVEL"] || "TRACE";

let seed;
let account;
let actorCid;
let instanceAddress;

beforeAll(() => {
  init(URL, TOKEN);

  seed = SEED || generateMnemonic();
  logger.trace(`Seed: [${seed}]`);

  account = keyDerive(seed, "m/44'/461'/0/0/1", "");
  logger.trace(`Address: ${account.address}`);
});

test("Install actor", async () => {
  const binaryPath = path.join(__dirname, WASM_ACTOR)
  logger.info(`Installing actor [${binaryPath})}]`);

  const resp = await ContractManager.install(account, binaryPath);
  const { cid, isInstalled } = resp;

  expect(cid).toBeDefined();
  expect(isInstalled).toBeDefined();

  logger.info(`CID: ${cid}`);
  logger.info(`Is installed: ${isInstalled}`);
  actorCid = cid;
});

test("Create actor", async () => {
  if (!actorCid) return;

  logger.info(`Instantiating actor [${actorCid.toString()}]`);

  const ABI = JSON.parse(fs.readFileSync(path.join(__dirname, ABI_ACTOR), "utf-8"));
  const client = ContractManager.create<Contract>(actorCid, ABI);

  await client.new(account, "0");

  instanceAddress = (client as any as ContractManager).getContractAddress();
});

test("Invoke method 2", async () => {
  if (!instanceAddress) return;

  // Create client from pre-existing instance of the contract
  const ABI = JSON.parse(fs.readFileSync(path.join(__dirname, ABI_ACTOR), "utf-8"));
  const clientFromAddress = ContractManager.load<Contract>(instanceAddress, ABI);

  for (let callNum = 1; callNum < 10; callNum++) {
    logger.info(
      `Invoking method 2 from instance [${instanceAddress.toString()}] - Call N: [${callNum}]`
    );

    const message_1 = await clientFromAddress.example_method(account, "0");

    logger.info(`Message: [${JSON.stringify(message_1)}]`);
    expect(message_1).toBe(``);
  }
});
