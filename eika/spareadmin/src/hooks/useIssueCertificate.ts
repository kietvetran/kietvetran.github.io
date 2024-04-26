import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SparingTilBarnFodselsattest } from '../generated-types.d';
import { State as CertificateState, Props as CertificateProps } from '../containers/Issue/IssueCertificate';
import { getIssueCertificate } from '../actions/issue';
import { SERVICE_PATH } from '../actions/index';

const useIssueCertificate = (props: CertificateProps, state: CertificateState, setState: (f: (s: CertificateState) => CertificateState) => void ): void => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIssueCertificate(props.id, (result: null | SparingTilBarnFodselsattest ) => {
            if ( !result ) { 
                return setState( (s: CertificateState) => {return {...s, url: null, mineType: ''};});
            }
            setState( (s: CertificateState) => {
                return {...s, mimeType: result.mimeType, url: `${SERVICE_PATH}/saker/fodselsattest/${result.id}/innhold`}
            });
        })); 
    }, [dispatch, props.id, props.parent, setState]);
};

export default useIssueCertificate;