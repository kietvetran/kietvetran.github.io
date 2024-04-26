import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { State as IssueState } from '../containers/Issue/Issue';
import { getIssueStatusCount } from '../actions/issue';

const useIssueStatusCount = ( state: IssueState ): void => {
    const dispatch = useDispatch();
    useEffect(() => { 
        const data = state.searchConfig.bankregnrFilter || state.searchConfig.foedselsnummerFilter ?  
            {...state.searchConfig, statuses: []} : undefined;
        dispatch(getIssueStatusCount(data));
        // eslint-disable-next-line
    }, [state.id, state.searchConfig.bankregnrFilter, state.searchConfig.foedselsnummerFilter, dispatch]);
};

export default useIssueStatusCount;