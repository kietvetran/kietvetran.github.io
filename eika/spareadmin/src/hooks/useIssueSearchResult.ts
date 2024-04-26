import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SparingTilBarnSearchResult } from '../generated-types.d';
import { State as IssueState } from '../containers/Issue/Issue';
import { getIssueSearchResult} from '../actions/issue';
import usePrevious from './usePrevious';

const useIssueSearchResult = (state: IssueState, setState: (f: (s: IssueState) => IssueState) => void): void => {
    const dispatch = useDispatch();
    const previous = usePrevious(state.searchId);

    useEffect(() => { 
        if ( previous === state.searchId ) { return; }

        dispatch(getIssueSearchResult(state.searchConfig, (result: null | SparingTilBarnSearchResult) => {
            if ( !result ) {                
                return setState( (s: IssueState) => {
                    return {...s, view: {...s.view, resultList: null, paging: undefined }}
                });
            }

            const paging = {index: result.currentPage, length: result.totalNumberOfSearchHits, count: result.pageSize };
            const resultList = result.searchHits.map( (d: any) => {
                return {...d, tool: [
                    { id: 'open-detail', name: 'Notat og attest', action: 'open-detail', style: ''},
                ]}
            }); 
            setState( (s: IssueState) => {
                return {...s, view: {...s.view, resultList, paging}};
            });

        })); 
    }, [dispatch, state, previous, setState]);
};

export default useIssueSearchResult;