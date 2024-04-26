import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAdvisor } from '../actions/app';

const useAdvisor = (): void => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getAdvisor()); }, [dispatch]);
};

export default useAdvisor;