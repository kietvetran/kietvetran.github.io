import { useEffect, useRef } from 'react';

const usePrevious = (value: any): any => {
 	const reference = useRef<any>(null);
 	useEffect(() => {
   		reference.current = value;
  	}, [value]);
  	return reference.current;
};

export default usePrevious;
