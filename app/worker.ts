import {Rpc} from 'grain-rpc';

const rpc = new Rpc({logger: {}, sendMessage: postMessage as any});
onmessage = (ev) => rpc.receiveMessage(ev.data);

const bank = rpc.getStub<any>('bank');

rpc.registerFunc('runUserCode', async (code: string) => {
  const userFunc = Function('transfer', 'getBalance',
    `return async function() { ${code} }`)(bank.transfer, bank.getBalance);
  await userFunc();
});
