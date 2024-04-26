import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFundList } from '../actions/fund';

const useFundList = (): void => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getFundList()); }, [dispatch]);
};

export default useFundList;