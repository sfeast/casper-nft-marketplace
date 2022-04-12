import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { marketSelectors } from 'store/selectors';

import { DEPLOY_STATE } from 'constants/config';
import { usePreviousState } from 'hooks/react';

export const useMint = () => {
    const deployState = useSelector(marketSelectors.selectDeployState);
    const previousDeployState = usePreviousState(deployState);

    const promiseResolveRef = useRef();
    const promiseRejectRef = useRef();

    useEffect(async () => {
        switch (true) {
            case !previousDeployState && deployState === DEPLOY_STATE.MINT: {
                const promise = new Promise((resolve, reject) => {
                    promiseResolveRef.current = resolve;
                    promiseRejectRef.current = reject;
                });
                toast.promise(
                    promise,
                    {
                        pending: 'Minting you NFT 😴',
                        success: 'Minting success 👌',
                        error: 'Minting failed 🤯'
                    },
                    { toastId: Math.random() }
                );
                break;
            }
            case previousDeployState === DEPLOY_STATE.MINT && deployState === DEPLOY_STATE.SUCCESS:
                promiseResolveRef.current?.();
                break;
            case previousDeployState === DEPLOY_STATE.MINT && deployState === DEPLOY_STATE.ERROR:
                promiseRejectRef.current?.();
                break;
            default:
                break;
        }
    }, [deployState]);
};
