import { defaultChainId, chains } from "@anoma/chains";
import { Sdk } from "@anoma/shared";
import { init as initShared } from "@anoma/shared/src/init";
import { IndexedDBKVStore } from "@anoma/storage";
import { fromBase64 } from "@cosmjs/encoding";
import { KVPrefix } from "router";
import {
  INIT_MSG,
  SubmitTransferMessageData,
  TRANSFER_FAILED_MSG,
  TRANSFER_SUCCESSFUL_MSG,
} from "./types";

(async function init() {
  await initShared();
  const sdkStore = new IndexedDBKVStore(KVPrefix.SDK);
  const activeAccountStore = new IndexedDBKVStore(KVPrefix.ActiveAccount);
  const sdk = new Sdk(chains[defaultChainId].rpc);
  await sdk.load_masp_params();

  //TODO: import sdk-store and parent-account-id keys - can't import from the keyring
  const sdkData: Record<string, string> | undefined = await sdkStore.get(
    "sdk-store"
  );
  const activeAccount = await activeAccountStore.get<string>(
    "parent-account-id"
  );

  if (sdkData && activeAccount) {
    const data = new TextEncoder().encode(sdkData[activeAccount]);
    sdk.decode(data);
  }

  addEventListener(
    "message",
    ({ data }: { data: SubmitTransferMessageData }) => {
      sdk
        .submit_transfer(fromBase64(data.txMsg), data.password, data.xsk)
        .then(() => postMessage(TRANSFER_SUCCESSFUL_MSG))
        .catch(() => postMessage(TRANSFER_FAILED_MSG));
    },
    false
  );

  postMessage(INIT_MSG);
})();