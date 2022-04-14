import {
    CasperClient,
    DeployUtil,
    Signer,
    CLPublicKey,
    Keys,
    CasperServiceByJsonRPC
} from 'casper-js-sdk';
import { SERVER_ADDRESS } from 'constants/config';
import { getData, postData } from 'utils/helpers/xchRequests';

export const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const fromMotes = amt => {
    return amt / 1000000000;
};
// do we want rounding to 2 dec places?
// export const fromMotes = (amt) => { return Math.round(((amt / 1000000000) + Number.EPSILON) * 100) / 100 };
export const toMotes = amt => {
    return amt * 1000000000;
};

export const signDeploy = async (deploy, publicKeyHash) => {
    const deployJSON = DeployUtil.deployToJson(deploy);
    return Signer.sign(deployJSON, publicKeyHash)
        .then(async success => {
            return success;
        })
        .catch(error => {
            console.log(error);
        });
};

export const sendDeploy = async json => {
    return postData(SERVER_ADDRESS + '/sendDeploy', json)
        .then(response => {
            return response;
        })
        .catch(error => {
            alert(error);
            throw Error('Deploy error: ' + error);
        });
};

export const getDeploy = async (deployHash /*string*/) => {
    let i = 300;
    while (i != 0) {
        const [deploy, raw] = await getData(SERVER_ADDRESS + '/getDeploy', { hash: deployHash });
        if (raw.execution_results.length !== 0) {
            if (raw.execution_results[0].result.Success) {
                return raw;
            } else {
                const error = raw.execution_results[0].result.Failure.error_message;
                throw Error('Contract execution: ' + error);
            }
        } else {
            i--;
            await sleep(1000);
            continue;
        }
    }
    throw Error('Timeout after ' + i + "s. Something's wrong");
};
export const extractDeployDetails = deploy => {
    try {
        return {
            token_id: deploy.session.StoredContractByHash.args.find(
                item => item[0] === 'token_ids'
            )[1].parsed[0],
            contract: deploy.session.StoredContractByHash.hash
        };
    } catch (e) {
        console.log('deploy details not found: ', e);
        return null;
    }
    return null;
};
