import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SparingTilBarnKommentar } from '../generated-types.d';
import { State as CommentState, Props as CommentProps } from '../containers/Issue/IssueComment';
import { getIssueComment } from '../actions/issue';

export const useIssueComment = (props: CommentProps, state: CommentState, setState: (f: (s: CommentState) => CommentState) => void): void => {
    const dispatch = useDispatch();
    useEffect(() => { 
        dispatch(getIssueComment(props.id, (result: null | SparingTilBarnKommentar[] ) => {
            setState((s: CommentState) => { return {...s, resultList: result}; });
        })); 
    }, [dispatch, props.id, props.parent, setState]);
};

export default useIssueComment;