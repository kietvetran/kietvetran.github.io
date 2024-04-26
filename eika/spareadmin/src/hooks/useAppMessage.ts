import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getServiceMessage } from '../actions/app';

const useAppMessage = (): void => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getServiceMessage()); }, [dispatch]);
};

export default useAppMessage;