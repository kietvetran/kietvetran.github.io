import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBankList } from '../actions/app';

const useBankList = (): void => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getBankList()); }, [dispatch]);
};

export default useBankList;